import { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import { configureTheme, themes, useResolvedScheme, useThemeTokens } from "@/libs/theme";
import { configureFonts, fontStyle, type FontConfig } from "@/libs/utils/typography";
import { Badge, Button, Drawer, Modal, Text } from "@/modules/ui";

/**
 * Live demos for the KuiNative-only "Foundations" pages (theme + typography).
 * They have no KuiReact counterpart, so their variant titles / code panes are
 * declared in scripts/sync-kui-react-showcase.mjs (NATIVE_ONLY). Every demo
 * restores the library defaults on reset and on unmount.
 */

/** The sample brand override of the demo — the only raw colors in the showcase. */
const BRAND = {
  light: { primary: "#f4511e", "primary-hover": "#d84315", "primary-subtle": "#fbe9e7", "border-focus": "#f4511e" },
  dark: { primary: "#ff7043", "primary-hover": "#ff8a65", "primary-subtle": "#3e1d12", "border-focus": "#ff7043" },
} as const;

/**
 * Applies `configureTheme(BRAND)` while `active`, restoring the defaults when
 * it is switched off and on unmount. Returns a counter that changes on every
 * apply so the caller re-renders (configureTheme does not re-render anyone).
 */
function useBrandOverride(active: boolean) {
  const [, setTick] = useState(0);
  useEffect(() => {
    configureTheme(active ? BRAND : {});
    setTick((n) => n + 1);
    return () => configureTheme();
  }, [active]);
}

/** A themed scope: re-applies the (possibly overridden) NativeWind vars, as the app root does. */
function ThemeScope({ children }: { children: React.ReactNode }) {
  const scheme = useResolvedScheme();
  return (
    <View style={themes[scheme]} className="gap-3 rounded-md border border-border bg-surface-base p-3">
      {children}
    </View>
  );
}

const SWATCHES = ["primary", "primary-hover", "primary-subtle", "border-focus", "secondary", "success", "warning", "error", "info"] as const;
const SWATCH_CLASS: Record<(typeof SWATCHES)[number], string> = {
  primary: "bg-primary",
  "primary-hover": "bg-primary-hover",
  "primary-subtle": "bg-primary-subtle",
  "border-focus": "bg-border-focus",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
};

function Swatches() {
  const t = useThemeTokens();
  return (
    <View className="flex-row flex-wrap gap-2">
      {SWATCHES.map((name) => (
        <View key={name} className="w-24 gap-1">
          <View className={`h-8 rounded-md border border-border ${SWATCH_CLASS[name]}`} />
          <Text variant="caption">{name}</Text>
          <Text variant="caption" style={fontStyle("regular", "mono")}>
            {t[name]}
          </Text>
        </View>
      ))}
    </View>
  );
}

function Samples() {
  return (
    <View className="gap-3">
      <View className="flex-row flex-wrap gap-2">
        <Button label="Primary" variant="primary" />
        <Button label="Outline" variant="outline" />
        <Button label="Ghost" variant="ghost" />
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="neutral">Neutral</Badge>
      </View>
    </View>
  );
}

export function ThemeBrandOverrideDemo() {
  const [brand, setBrand] = useState(false);
  useBrandOverride(brand);
  return (
    <View className="w-full gap-3">
      <View className="flex-row flex-wrap gap-2">
        <Button label="Apply brand override" size="sm" variant="primary" onPress={() => setBrand(true)} disabled={brand} />
        <Button label="Reset" size="sm" variant="outline" onPress={() => setBrand(false)} disabled={!brand} />
      </View>
      <ThemeScope>
        <Text variant="caption">{brand ? "configureTheme({ light, dark }) applied" : "Library defaults"}</Text>
        <Swatches />
        <Samples />
      </ThemeScope>
    </View>
  );
}

export function ThemeTokenSwatchesDemo() {
  return (
    <View className="w-full">
      <ThemeScope>
        <Swatches />
      </ThemeScope>
    </View>
  );
}

export function ThemeOverlaysDemo() {
  const [open, setOpen] = useState<"modal" | "drawer" | null>(null);
  useBrandOverride(true);
  const close = () => setOpen(null);
  return (
    <View className="w-full gap-3">
      <Text variant="bodySm">
        Modal, Drawer and AnchoredPanel render in a separate native portal; they re-apply the active theme variables, so the override reaches them.
      </Text>
      <View className="flex-row flex-wrap gap-2">
        <Button label="Open Modal" variant="primary" onPress={() => setOpen("modal")} />
        <Button label="Open Drawer" variant="outline" onPress={() => setOpen("drawer")} />
      </View>
      <Modal
        open={open === "modal"}
        onClose={close}
        title="Themed modal"
        description="This dialog uses the brand override."
        footer={<Button label="Close" variant="primary" onPress={close} />}
      >
        <Badge variant="primary">Primary badge</Badge>
      </Modal>
      <Drawer open={open === "drawer"} onClose={close} title="Themed drawer" side="right">
        <View className="gap-3">
          <Samples />
        </View>
      </Drawer>
    </View>
  );
}

/** A deterministic serif so the effect shows on every platform without font assets. */
const SERIF = Platform.select({ ios: "Georgia", android: "serif", default: "Georgia, 'Times New Roman', serif" });
const MONO_ALT = Platform.select({ ios: "Courier", android: "serif", default: "'Courier New', Courier, monospace" });

function TypeSample() {
  return (
    <View className="gap-1">
      <Text variant="h2">Heading two</Text>
      <Text variant="h4">Heading four</Text>
      <Text variant="body">Body text in the configured sans family.</Text>
      <Text variant="label">Label (medium)</Text>
      <Text variant="caption">Caption text</Text>
      <Text variant="bodySm" style={fontStyle("regular", "mono")}>
        Monospace sample 0123456789
      </Text>
    </View>
  );
}

function FontsDemo({ config }: { config: FontConfig }) {
  const [on, setOn] = useState(false);
  // configureFonts is read while rendering, so remount the sample on change.
  const [version, setVersion] = useState(0);
  useEffect(() => {
    configureFonts(on ? config : {});
    setVersion((n) => n + 1);
    return () => configureFonts();
  }, [on, config]);
  return (
    <View className="w-full gap-3">
      <View className="flex-row flex-wrap gap-2">
        <Button label="Apply configureFonts" size="sm" variant="primary" onPress={() => setOn(true)} disabled={on} />
        <Button label="Reset" size="sm" variant="outline" onPress={() => setOn(false)} disabled={!on} />
      </View>
      <View key={version} className="rounded-md border border-border bg-surface-base p-3">
        <TypeSample />
      </View>
    </View>
  );
}

const SANS_CONFIG: FontConfig = { sans: SERIF };
const MONO_CONFIG: FontConfig = { mono: MONO_ALT };

export function TypographyDefaultDemo() {
  return (
    <View className="w-full rounded-md border border-border bg-surface-base p-3">
      <TypeSample />
    </View>
  );
}
export function TypographySansDemo() {
  return <FontsDemo config={SANS_CONFIG} />;
}
export function TypographyMonoDemo() {
  return <FontsDemo config={MONO_CONFIG} />;
}
export function TypographyFontStyleDemo() {
  const rows = (["regular", "medium", "semiBold", "bold"] as const).map((w) => ({ w, s: fontStyle(w) }));
  return (
    <View className="w-full gap-1 rounded-md border border-border bg-surface-base p-3">
      {rows.map(({ w, s }) => (
        <Text key={w} variant="bodySm" style={s}>
          {`fontStyle("${w}") → ${s.fontFamily ?? ""}${s.fontWeight ? " / " + s.fontWeight : ""}`}
        </Text>
      ))}
    </View>
  );
}
