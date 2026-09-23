import { useEffect, useRef, useState } from "react";
import type * as React from "react";
import { useLocalSearchParams } from "expo-router";
import {
  Modal as RNModal,
  PanResponder,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCompress, faExpand, faHouse } from "@fortawesome/free-solid-svg-icons";
import Svg, { Circle, Defs, Pattern, Rect } from "react-native-svg";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";
import { FONTS } from "@/libs/utils/typography";
import { PAGES, SOURCES } from "@/modules/showcase/data/showcase.generated";
import type { ShowcasePageCategory, ShowcaseVariantMeta } from "@/modules/showcase/data/showcase.types";
import { getEntry } from "@/modules/showcase/registry";
import { useDrawer, type VariantLayout } from "@/modules/showcase/ui/drawer.store";
import { SiteHead } from "@/modules/showcase/ui/SiteHead";
import { Text } from "@/modules/ui";

/** Tailwind's `sm` (640px) and `xl` (1280px) breakpoints. */
const SM = 640;
const XL = 1280;

// Pre-render one HTML page per showcase page for the static web export.
export function generateStaticParams(): { slug: string }[] {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

/** KuiReact's ShowcaseDetail `categoryStyles`. */
const CATEGORY_STYLES: Record<ShowcasePageCategory, { bg: string; text: string }> = {
  Atom: { bg: "bg-info-subtle", text: "text-info-fg" },
  Molecule: { bg: "bg-primary-subtle", text: "text-primary" },
  Organism: { bg: "bg-success-subtle", text: "text-success-fg" },
};

/** `text-sm font-mono text-text-primary leading-relaxed` (14px / 22.75px). */
const CODE_TEXT = { fontFamily: FONTS.mono, fontSize: 14, lineHeight: 22.75 };

/** The shared `px-2.5 py-1 text-xs rounded-md font-medium` chrome button. */
function ChromeButton({
  onPress,
  label,
  tone = "default",
  children,
}: {
  onPress: () => void;
  label: string;
  tone?: "default" | "success";
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className={cn(
        "items-center justify-center rounded-md px-2.5 py-1",
        tone === "success" ? "bg-success-subtle" : "bg-surface-overlay active:bg-surface-sunken",
      )}
    >
      {children}
    </Pressable>
  );
}

/** KuiReact's CopyButton: "Copy" → "Copied!" (success tint) for 2s. */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);
  return (
    <ChromeButton
      label="Copy code"
      tone={copied ? "success" : "default"}
      onPress={async () => {
        await Clipboard.setStringAsync(code);
        setCopied(true);
      }}
    >
      <Text className={cn("text-xs font-medium", copied ? "text-success-fg" : "text-text-secondary")}>
        {copied ? "Copied!" : "Copy"}
      </Text>
    </ChromeButton>
  );
}

/** KuiReact's Widget header: `px-4 py-3 border-b bg-surface-overlay`, grip + `text-sm font-semibold` title, actions right. */
function WidgetHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <View className="shrink-0 flex-row items-center justify-between gap-3 border-b border-border bg-surface-overlay px-4 py-3">
      <View className="min-w-0 flex-1 flex-row items-center gap-2">
        <Text className="shrink-0 text-xs leading-none text-text-disabled" aria-hidden>
          ⠿
        </Text>
        <Text numberOfLines={1} className="shrink text-sm font-semibold text-text-primary">
          {title}
        </Text>
      </View>
      {right ? <View className="shrink-0 flex-row items-center gap-2">{right}</View> : null}
    </View>
  );
}

/** The `px-3 py-1.5 border-b bg-surface-overlay` PREVIEW / CODE pane label. */
function PaneLabel({ children }: { children: string }) {
  return (
    <View className="border-b border-border bg-surface-overlay px-3 py-1.5">
      {/* The inline span sits on its block's 24px line box (text-base leading-normal). */}
      <Text className="text-xs font-medium uppercase leading-6 tracking-wider text-text-secondary">{children}</Text>
    </View>
  );
}

/** KuiReact's preview background: `radial-gradient(circle, var(--border) 1px, transparent 1px)` on a 16px grid. */
function DotGrid() {
  const t = useThemeTokens();
  return (
    <View pointerEvents="none" className="absolute inset-0">
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id="showcase-dots" width={16} height={16} patternUnits="userSpaceOnUse">
            <Circle cx={8} cy={8} r={1} fill={t.border} />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#showcase-dots)" />
      </Svg>
    </View>
  );
}

const MIN_PREVIEW_PCT = 20;
const MAX_PREVIEW_PCT = 80;
const DEFAULT_PREVIEW_PCT = 40;

function VariantBlock({
  variant,
  Demo,
  stack,
  index,
}: {
  variant: ShowcaseVariantMeta;
  Demo: React.ComponentType;
  stack: boolean;
  index: number;
}) {
  const t = useThemeTokens();
  const wide = useWindowDimensions().width >= SM;
  const [previewPct, setPreviewPct] = useState(DEFAULT_PREVIEW_PCT);
  const [fullscreen, setFullscreen] = useState(false);
  const rowWidth = useRef(0);
  const dragStartPct = useRef(DEFAULT_PREVIEW_PCT);
  const previewPctRef = useRef(previewPct);
  useEffect(() => {
    previewPctRef.current = previewPct;
  }, [previewPct]);

  const hasCode = !!variant.code;
  const canResize = hasCode && !stack && wide && !fullscreen;
  const showCodePane = hasCode && !fullscreen;

  // KuiReact's pointer-drag separator between the preview and code panes.
  // The refs are read in the gesture callbacks, not during render.
  // eslint-disable-next-line react-hooks/refs
  const [pan] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragStartPct.current = previewPctRef.current;
      },
      onPanResponderMove: (_, g) => {
        if (!rowWidth.current) return;
        const pct = dragStartPct.current + (g.dx / rowWidth.current) * 100;
        setPreviewPct(Math.min(MAX_PREVIEW_PCT, Math.max(MIN_PREVIEW_PCT, pct)));
      },
    }),
  );

  const block = (
    <View
      // KuiReact's `data-variant-index` (react-native-web renders `dataSet` as data-*).
      {...({ dataSet: { variantIndex: index } } as object)}
      className={cn(
        "overflow-hidden bg-surface-raised",
        fullscreen ? "flex-1" : "rounded-xl border border-border",
      )}
    >
      <WidgetHeader
        title={variant.title}
        right={
          <>
            {hasCode ? <CopyButton code={variant.code!} /> : null}
            <ChromeButton label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"} onPress={() => setFullscreen((v) => !v)}>
              <View className="h-3 w-[15px] items-center justify-center">
                <FontAwesomeIcon icon={fullscreen ? faCompress : faExpand} size={12} color={t["text-secondary"]} />
              </View>
            </ChromeButton>
          </>
        }
      />
      <View
        onLayout={(e: LayoutChangeEvent) => {
          rowWidth.current = e.nativeEvent.layout.width;
        }}
        className={cn(stack || !wide ? "flex-col" : "flex-row", fullscreen && "min-h-0 flex-1")}
      >
        <View
          className={cn(
            "flex-col",
            showCodePane && !stack && !wide && "border-b border-border",
            !showCodePane && "w-full",
            fullscreen && "min-h-0 flex-1",
          )}
          style={canResize ? { width: `${previewPct}%` } : undefined}
        >
          <PaneLabel>Preview</PaneLabel>
          <View
            className={cn(
              "flex-row items-start justify-center px-6 py-8",
              stack ? "min-h-40" : "min-h-28 flex-1",
              fullscreen && "min-h-0 flex-1",
            )}
          >
            <DotGrid />
            <View
              // The preview row's children shrink like CSS flex items (global.css).
              {...({ dataSet: { previewRow: true } } as object)}
              className={cn("w-full", !stack && "flex-row flex-wrap items-center justify-center gap-2")}
            >
              {/* KuiReact's preview-root frame (e.g. `w-full max-w-sm`) when its root is a sized <div>;
                  otherwise the demo itself is the flex item, as the React preview element is. */}
              {variant.wrap ? (
                <View className={variant.wrap}>
                  <Demo />
                </View>
              ) : (
                <Demo />
              )}
            </View>
          </View>
        </View>

        {showCodePane && !stack && wide ? (
          <View
            {...pan.panHandlers}
            accessibilityRole="adjustable"
            accessibilityLabel="Resize preview and code panes"
            accessibilityValue={{ min: MIN_PREVIEW_PCT, max: MAX_PREVIEW_PCT, now: Math.round(previewPct) }}
            className="relative w-1.5 shrink-0"
            style={{ cursor: "col-resize" } as object}
          >
            <View className="absolute bottom-0 top-0 w-px bg-border" style={{ left: 2.5 }} />
          </View>
        ) : null}

        {showCodePane ? (
          <View className={cn("flex-col bg-surface-sunken", !stack && wide && "min-w-0 flex-1")}>
            <PaneLabel>Code</PaneLabel>
            <Text selectable className={cn("px-4 py-5 text-text-primary", !stack && wide && "flex-1")} style={CODE_TEXT}>
              {variant.code}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (!fullscreen) return block;
  // KuiReact: `fixed inset-0 z-50 rounded-none border-0`; Escape exits.
  return (
    <RNModal visible animationType="none" onRequestClose={() => setFullscreen(false)}>
      <View className="flex-1 bg-surface-raised">{block}</View>
    </RNModal>
  );
}

/** KuiReact's SourceBlock: a collapsed `mt-6` card with the file path, Copy and Expand. */
function SourceBlock({ filePath, sourceCode }: { filePath: string; sourceCode: string }) {
  const [open, setOpen] = useState(false);
  return (
    <View className="mt-6 overflow-hidden rounded-xl border border-border bg-surface-raised">
      <View className="flex-row items-center justify-between gap-3 border-b border-border bg-surface-overlay px-4 py-3">
        <View className="min-w-0 flex-1 flex-row items-center gap-2">
          <Text className="shrink-0 text-xs text-text-disabled" aria-hidden>
            ⠿
          </Text>
          <Text className="text-sm font-semibold text-text-primary">Source</Text>
          <View className="min-w-0 shrink rounded bg-surface-sunken px-2 py-0.5">
            <Text numberOfLines={1} className="text-xs text-text-secondary" style={{ fontFamily: FONTS.mono }}>
              {filePath}
            </Text>
          </View>
        </View>
        <View className="shrink-0 flex-row items-center gap-2">
          <CopyButton code={sourceCode} />
          <ChromeButton label={open ? "Collapse source" : "Expand source"} onPress={() => setOpen((v) => !v)}>
            <Text className="text-xs font-medium text-text-secondary">{open ? "Collapse" : "Expand"}</Text>
          </ChromeButton>
        </View>
      </View>
      {open ? (
        <ScrollView horizontal className="bg-surface-sunken">
          <Text selectable className="px-5 py-5 text-text-primary" style={CODE_TEXT}>
            {sourceCode}
          </Text>
        </ScrollView>
      ) : null}
    </View>
  );
}

/** KuiReact's ShowcaseDetail: title + category pill, description, the variants grid, the Source block. */
export default function ShowcaseDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const t = useThemeTokens();
  const page = PAGES[slug];
  const entry = getEntry(slug);
  const variantLayout = useDrawer((s) => s.variantLayout);
  const xl = useWindowDimensions().width >= XL;
  const [gridWidth, setGridWidth] = useState(0);

  if (!page || !entry) {
    return (
      <ScrollView className="flex-1" contentContainerClassName="p-4 sm:p-6">
        <SiteHead title="404 — Not Found" absolute />
        <View className="items-center justify-center py-24">
          <View className="mb-4">
            <FontAwesomeIcon icon={faHouse} size={36} color={t["text-disabled"]} />
          </View>
          <Text className="mb-1 text-xl font-semibold text-text-primary">Showcase coming soon</Text>
          <Text className="text-sm text-text-secondary">No preview has been added for this component yet.</Text>
        </View>
      </ScrollView>
    );
  }

  const style = CATEGORY_STYLES[page.category];
  const grid = variantLayout === "grid" && xl;
  // KuiReact: `grid-cols-1 xl:grid-cols-2 gap-4`; a stack variant spans both columns.
  const half = gridWidth ? (gridWidth - 16) / 2 : undefined;
  const layoutOf = (v: ShowcaseVariantMeta, mode: VariantLayout) => (mode === "grid" ? v.stack : mode === "stack");

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 sm:p-6" keyboardShouldPersistTaps="handled">
      <SiteHead title={page.name} description={page.description} path={`/${slug}`} />
      <View className="mb-2">
        <View className="mb-1 flex-row flex-wrap items-center gap-3">
          <Text className="text-2xl font-bold leading-[30px] text-text-primary">{page.name}</Text>
          <View className={cn("rounded-full px-2.5 py-1", style.bg)}>
            <Text className={cn("text-xs font-medium", style.text)}>{page.category}</Text>
          </View>
        </View>
        <Text className="max-w-2xl text-sm text-text-secondary">{page.description}</Text>
      </View>

      <View
        onLayout={(e) => setGridWidth(e.nativeEvent.layout.width)}
        className={cn("gap-4", grid && "flex-row flex-wrap")}
      >
        {page.variants.map((variant, index) => {
          const demo = entry.variants.find((v) => v.title === variant.title);
          if (!demo) return null;
          const stack = layoutOf(variant, variantLayout);
          return (
            <View key={variant.title} style={grid ? { width: stack ? "100%" : half } : undefined}>
              <VariantBlock index={index} variant={variant} Demo={demo.Demo} stack={stack} />
            </View>
          );
        })}
      </View>

      <SourceBlock filePath={page.filePath} sourceCode={SOURCES[page.filePath] ?? ""} />
    </ScrollView>
  );
}
