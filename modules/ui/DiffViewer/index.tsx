// DiffViewer — line-based text diff with unified and split modes, ported
// from KuiReact's modules/ui/DiffViewer (M1). The LCS diff engine
// (hooks/useDiff) and its types are KuiReact's, unchanged: `@@` hunk
// headers, old/new line numbers, `context` lines around each change and
// `collapsible` folding of unchanged runs.
//
// RN adaptations: rows are fixed-width flex cells inside horizontal scroll
// views (long lines scroll instead of wrapping, as with KuiReact's
// `whitespace-pre`); the split panes keep their horizontal scroll in sync
// (KuiReact: useScrollSync).

import { useRef, useState } from "react";
import { Pressable, ScrollView, View, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../../libs/theme";
import { cn } from "../../../libs/utils/cn";

import { Text } from "../Text";
import { useDiff } from "./hooks/useDiff";
import { DiffLine, EmptyLine } from "./parts/DiffLine";
import type { Change, DiffViewerProps, Hunk } from "./types";

export type { DiffViewerProps, DiffMode, Hunk, Change, ChangeType } from "./types";
export { useDiff } from "./hooks/useDiff";

function HunkHeader({ hunk }: { hunk: Hunk }) {
  return (
    <Text accessibilityLabel={`Hunk at line ${hunk.oldStart}`} className="border-y border-border bg-surface-overlay px-3 py-1 font-mono text-xs text-text-secondary">
      {`@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`}
    </Text>
  );
}

function NoChanges() {
  return <Text className="px-3 py-2 font-mono text-xs text-text-secondary">No changes.</Text>;
}

/** Leading unchanged run, the changed middle and the trailing unchanged run of a hunk. */
export function partitionHunk(changes: Change[]): { lead: Change[]; middle: Change[]; trail: Change[] } {
  let first = -1;
  let last = -1;
  changes.forEach((c, i) => {
    if (c.type !== "context") {
      if (first === -1) first = i;
      last = i;
    }
  });
  if (first === -1) return { lead: changes, middle: [], trail: [] };
  return { lead: changes.slice(0, first), middle: changes.slice(first, last + 1), trail: changes.slice(last + 1) };
}

function CollapsibleRun({ run }: { run: Change[] }) {
  const t = useThemeTokens();
  const [open, setOpen] = useState(false);
  if (run.length === 0) return null;
  if (open) return <>{run.map((c, i) => <DiffLine key={`ctx-${i}-${c.oldLine ?? "x"}-${c.newLine ?? "x"}`} change={c} />)}</>;
  const label = `Show ${run.length} more line${run.length === 1 ? "" : "s"}`;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ expanded: false }}
      onPress={() => setOpen(true)}
      className="w-full flex-row items-center gap-2 border-y border-border bg-surface-overlay px-3 py-1 active:bg-surface-sunken"
    >
      {/* KuiReact's `w-3 h-3` loses to FontAwesome's CSS: a 1.25em × 1em box. */}
      <View className="h-3 w-[15px] items-center justify-center">
        <FontAwesomeIcon icon={faPlus} size={12} color={t["text-secondary"]} />
      </View>
      <Text className="font-mono text-xs text-text-secondary">{label}</Text>
    </Pressable>
  );
}

function UnifiedView({ hunks, collapsible }: { hunks: Hunk[]; collapsible: boolean }) {
  if (hunks.length === 0) return <NoChanges />;
  return (
    <ScrollView horizontal nestedScrollEnabled accessibilityLabel="Unified diff" contentContainerStyle={{ minWidth: "100%" }}>
      <View style={{ minWidth: "100%" }}>
        {hunks.map((hunk, hi) => {
          const { lead, middle, trail } = collapsible ? partitionHunk(hunk.changes) : { lead: [], middle: hunk.changes, trail: [] };
          return (
            <View key={`hunk-${hi}-${hunk.oldStart}-${hunk.newStart}`}>
              <HunkHeader hunk={hunk} />
              {collapsible ? <CollapsibleRun run={lead} /> : null}
              {middle.map((c, i) => (
                <DiffLine key={`row-${hi}-${i}-${c.oldLine ?? "x"}-${c.newLine ?? "x"}`} change={c} />
              ))}
              {collapsible ? <CollapsibleRun run={trail} /> : null}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

/** KuiReact's pairing: removes line up with adds as substitutions; lone lines face a phantom row. */
export function pairChanges(changes: Change[]): { left: Change | null; right: Change | null }[] {
  const out: { left: Change | null; right: Change | null }[] = [];
  let i = 0;
  while (i < changes.length) {
    const c = changes[i];
    if (c.type === "context") {
      out.push({ left: c, right: c });
      i++;
      continue;
    }
    const removes: Change[] = [];
    const adds: Change[] = [];
    while (i < changes.length && changes[i].type === "remove") removes.push(changes[i++]);
    while (i < changes.length && changes[i].type === "add") adds.push(changes[i++]);
    for (let k = 0; k < Math.max(removes.length, adds.length); k++) out.push({ left: removes[k] ?? null, right: adds[k] ?? null });
  }
  return out;
}

function SplitView({ hunks }: { hunks: Hunk[] }) {
  const left = useRef<ScrollView>(null);
  const right = useRef<ScrollView>(null);
  const driving = useRef<"left" | "right" | null>(null);

  if (hunks.length === 0) return <NoChanges />;

  const sync = (from: "left" | "right") => (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (driving.current && driving.current !== from) return;
    driving.current = from;
    (from === "left" ? right : left).current?.scrollTo({ x: e.nativeEvent.contentOffset.x, animated: false });
  };
  const release = () => {
    driving.current = null;
  };

  const pane = (side: "left" | "right") => (
    <ScrollView
      ref={side === "left" ? left : right}
      horizontal
      nestedScrollEnabled
      scrollEventThrottle={16}
      onScroll={sync(side)}
      onScrollEndDrag={release}
      onMomentumScrollEnd={release}
      contentContainerStyle={{ minWidth: "100%" }}
      className={cn("flex-1", side === "left" && "border-r border-border")}
    >
      <View style={{ minWidth: "100%" }}>
        {hunks.map((hunk, hi) => (
          <View key={`${side}-${hi}-${hunk.oldStart}`}>
            <HunkHeader hunk={hunk} />
            {pairChanges(hunk.changes).map((p, i) => {
              const c = side === "left" ? p.left : p.right;
              return c ? <DiffLine key={`${side}-${hi}-${i}`} change={c} variant={side === "left" ? "split-old" : "split-new"} /> : <EmptyLine key={`${side}-${hi}-${i}-empty`} />;
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View accessibilityLabel="Split diff" className="flex-row">
      {pane("left")}
      {pane("right")}
    </View>
  );
}

export function DiffViewer({ oldText = "", newText = "", mode = "unified", context = 3, collapsible = false, className }: DiffViewerProps) {
  const hunks = useDiff(oldText, newText, context);
  return (
    <View testID="diff-viewer" className={cn("w-full overflow-hidden rounded-md border border-border bg-surface-base", className)}>
      {mode === "split" ? <SplitView hunks={hunks} /> : <UnifiedView hunks={hunks} collapsible={collapsible} />}
    </View>
  );
}
