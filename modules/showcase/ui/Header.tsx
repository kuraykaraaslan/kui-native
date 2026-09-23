import { Linking, Pressable, View, useWindowDimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightFromBracket,
  faBars,
  faBorderAll,
  faChevronDown,
  faDisplay,
  faGear,
  faMoon,
  faSun,
  faTableColumns,
  faTableList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { SITE } from "@/libs/config/site";
import { useThemeMode, useThemeTokens, type ThemeMode } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";
import { Avatar, Button, DropdownMenu, Text } from "@/modules/ui";

import { useDrawer, useIsDesktop, type VariantLayout } from "./drawer.store";

/** FontAwesome's web `.svg-inline--fa` box (1.25em x 1em), which wins over
 *  KuiReact's `w-3 h-3` / `w-4 h-4`: every chrome glyph here is 14px tall
 *  (the buttons' `text-sm`) in a 17.5px-wide box. */
function FaGlyph({ icon, color }: { icon: IconDefinition; color: string }) {
  return (
    <View className="h-3.5 w-[17.5px] items-center justify-center">
      <FontAwesomeIcon icon={icon} size={14} color={color} />
    </View>
  );
}

/** Tailwind's `sm` breakpoint (640px). */
const SM = 640;

const LAYOUTS: { value: VariantLayout; icon: IconDefinition; title: string }[] = [
  { value: "side", icon: faTableColumns, title: "Side layout" },
  { value: "stack", icon: faTableList, title: "Stack layout" },
  { value: "grid", icon: faBorderAll, title: "Grid layout" },
];

/** KuiReact's LayoutSwitcher: `mr-2 border rounded-md p-0.5` group of `w-7 h-7` buttons. */
function LayoutSwitcher() {
  const t = useThemeTokens();
  const value = useDrawer((s) => s.variantLayout);
  const onChange = useDrawer((s) => s.setVariantLayout);
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel="Layout" className="mr-2 flex-row items-center gap-0.5 rounded-md border border-border p-0.5">
      {LAYOUTS.map((opt) => {
        const active = value === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            accessibilityRole="button"
            accessibilityLabel={opt.title}
            accessibilityState={{ selected: active }}
            className={cn("h-7 w-7 items-center justify-center rounded", active ? "bg-primary" : "active:bg-surface-overlay")}
          >
            <FontAwesomeIcon icon={opt.icon} size={12} color={active ? t["primary-fg"] : t["text-secondary"]} />
          </Pressable>
        );
      })}
    </View>
  );
}

/** KuiReact's GithubButton: an outline `sm` Button with only the GitHub mark. */
export function GithubButton() {
  const t = useThemeTokens();
  return (
    <Button
      variant="outline"
      size="sm"
      accessibilityLabel="GitHub"
      onPress={() => Linking.openURL(SITE.github)}
      // The web icon: a `1.25em`-wide inline svg on the `text-sm` 20px line.
      iconLeft={
        <View className="h-5 w-[17.5px] items-center justify-center">
          <FontAwesomeIcon icon={faGithub} size={14} color={t["text-primary"]} />
        </View>
      }
    />
  );
}

const THEME_ICON: Record<ThemeMode, IconDefinition> = { light: faSun, dark: faMoon, system: faDisplay };

/** KuiReact's ThemeSwitcher: outline `sm` trigger (icon, `min-w-[3.5rem]` label, chevron) + Light / Dark / System menu. */
function ThemeSwitcher() {
  const t = useThemeTokens();
  const mode = useThemeMode((s) => s.mode);
  const setMode = useThemeMode((s) => s.setMode);
  const label = mode.charAt(0).toUpperCase() + mode.slice(1);
  const icon = (i: IconDefinition) => <FontAwesomeIcon icon={i} size={14} color={t["text-primary"]} />;
  return (
    <DropdownMenu
      // DropdownMenu is `self-start`; the header row centres its items.
      className="self-center"
      trigger={
        <Button variant="outline" size="sm" accessibilityLabel={`Theme: ${label}`}>
          <View className="h-3.5 w-4 shrink-0 items-center justify-center">
            <FontAwesomeIcon icon={THEME_ICON[mode]} size={14} color={t["text-primary"]} />
          </View>
          <Text className="min-w-[56px] text-left text-sm font-medium text-text-primary">{label}</Text>
          <FaGlyph icon={faChevronDown} color={t["text-disabled"]} />
        </Button>
      }
      items={[
        { label: "Light", icon: icon(faSun), onPress: () => setMode("light") },
        { label: "Dark", icon: icon(faMoon), onPress: () => setMode("dark") },
        { label: "System", icon: icon(faDisplay), onPress: () => setMode("system") },
      ]}
    />
  );
}

/** KuiReact's UserMenu `onlyAvatar` with the showcase's demo admin user. */
function UserMenu() {
  const t = useThemeTokens();
  const wide = useWindowDimensions().width >= SM;
  const name = "Jane Doe";
  const icon = (i: IconDefinition, color = t["text-primary"]) => <FontAwesomeIcon icon={i} size={14} color={color} />;
  return (
    <DropdownMenu
      className="self-center"
      align="right"
      trigger={
        <Button variant="ghost" size="sm" accessibilityLabel={`User menu for ${name}`} className="gap-2 px-2">
          <Avatar name={name} size="sm" />
          {wide ? <FaGlyph icon={faChevronDown} color={t["text-disabled"]} /> : null}
        </Button>
      }
      header={
        <View className="px-3 py-2.5">
          <Text numberOfLines={1} className="text-sm font-semibold text-text-primary">
            {name}
          </Text>
          <Text numberOfLines={1} className="text-xs text-text-secondary">
            admin@acme.com
          </Text>
        </View>
      }
      items={[
        { label: "Profile", icon: icon(faUser) },
        { label: "Settings", icon: icon(faGear) },
        { type: "separator" },
        { label: "Sign out", icon: icon(faArrowRightFromBracket, t.error), danger: true },
      ]}
    />
  );
}

/**
 * KuiReact's AppShell header with ShowcaseShell's AppTopBar: `h-14 px-4
 * border-b bg-surface-raised/90`, the `lg:hidden` sidebar button, then the
 * `ml-auto gap-1` cluster — LayoutSwitcher, GithubButton, ThemeSwitcher,
 * UserMenu. It spans the content column above every page.
 */
export function Header() {
  const t = useThemeTokens();
  const setOpen = useDrawer((s) => s.setOpen);
  const desktop = useIsDesktop();

  return (
    <SafeAreaView
      edges={["top"]}
      className="z-30 border-b border-border"
      // `bg-surface-raised/90`: the tokens are `var()` colors, which take no
      // alpha modifier, so the 90 % fill is composed from the hex here.
      style={{ backgroundColor: `${t["surface-raised"]}e6` }}
    >
      {/* `h-14` is border-box on the web: 55px plus the 1px border-b. */}
      <View className="h-[55px] flex-row items-center px-4">
        {!desktop ? (
          <Pressable
            onPress={() => setOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Open sidebar"
            className="h-9 w-9 items-center justify-center rounded-md active:bg-surface-overlay"
          >
            <FontAwesomeIcon icon={faBars} size={16} color={t["text-secondary"]} />
          </Pressable>
        ) : null}
        <View className="min-w-0 flex-1 flex-row items-center gap-3">
          <View className="ml-auto flex-row items-center gap-1">
            <LayoutSwitcher />
            <GithubButton />
            <ThemeSwitcher />
            <UserMenu />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
