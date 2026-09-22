// Single diff row (KuiReact: DiffViewer/parts/DiffLine.tsx): line-number
// gutter(s), a `+` / `-` / ` ` sign column and the content, tinted
// success / error for adds / removes with a 2px left border. KuiReact's
// `grid-cols-[3rem_3rem_1rem_1fr]` becomes fixed-width flex cells.

import { View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "../../Text";
import type { Change } from "../types";

export type DiffLineVariant = "unified" | "split-old" | "split-new";

const ROW_BG: Record<Change["type"], string> = { add: "bg-success-subtle", remove: "bg-error-subtle", context: "bg-surface-base" };
const BORDER: Record<Change["type"], string> = { add: "border-l-success", remove: "border-l-error", context: "border-l-transparent" };
const SIGN: Record<Change["type"], string> = { add: "+", remove: "-", context: " " };
const SIGN_FG: Record<Change["type"], string> = { add: "text-success", remove: "text-error", context: "text-text-disabled" };

const MONO = "font-mono text-xs leading-5";
const GUTTER = "w-12 border-r border-border pr-2 text-right text-text-disabled";

/** KuiReact's phantom row keeping split columns aligned. */
export function EmptyLine() {
  return (
    <View testID="diff-empty-line" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" className="flex-row border-l border-border bg-surface-overlay">
      <Text className={cn(MONO, "w-12")}> </Text>
    </View>
  );
}

export function DiffLine({ change, variant = "unified" }: { change: Change; variant?: DiffLineVariant }) {
  const isSplitOld = variant === "split-old";
  const isSplitNew = variant === "split-new";
  if ((isSplitOld && change.type === "add") || (isSplitNew && change.type === "remove")) return <EmptyLine />;

  const showOld = variant === "unified" || isSplitOld;
  const showNew = variant === "unified" || isSplitNew;
  const label = `${change.type === "add" ? "Added" : change.type === "remove" ? "Removed" : "Unchanged"}${
    showOld && change.oldLine != null ? `, old line ${change.oldLine}` : ""
  }${showNew && change.newLine != null ? `, new line ${change.newLine}` : ""}: ${change.content}`;

  return (
    <View testID={`diff-line-${change.type}`} accessible accessibilityLabel={label} className={cn("flex-row border-l-2", ROW_BG[change.type], BORDER[change.type])}>
      {showOld ? <Text className={cn(MONO, GUTTER)}>{change.oldLine ?? ""}</Text> : null}
      {showNew ? <Text className={cn(MONO, GUTTER)}>{change.newLine ?? ""}</Text> : null}
      <Text className={cn(MONO, "w-4 text-center", SIGN_FG[change.type])}>{SIGN[change.type]}</Text>
      <Text className={cn(MONO, "pl-2 pr-3 text-text-primary")}>{change.content || " "}</Text>
    </View>
  );
}
