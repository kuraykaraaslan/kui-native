import { useMemo, useState } from "react";
import type * as React from "react";
import { router, usePathname } from "expo-router";
import { Pressable, ScrollView, TextInput, View, type ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronLeft, faHouse, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";
import { FONTS } from "@/libs/utils/typography";
import { Text } from "@/modules/ui";

import { NAV_GROUPS } from "../data/showcase.generated";
import { BrandMark } from "./BrandMark";
import { useDrawer } from "./drawer.store";

/**
 * The showcase navigation, 1:1 with kui-react (ShowcaseShell + AppSidebar +
 * SidebarBrand) and kui-ejs (views/showcase/partials/sidebar.ejs) — every
 * class below is the web class of the same element there. Change all three
 * together.
 */

// Web text below 12px inherits line-height 1.5 from its parent (15px at
// 10px); RN has no inheritance, so those lines set leading-[15px] explicitly.

/** FontAwesome's web box: `.svg-inline--fa` renders 1.25em x 1em (20x16 at
 *  16px) and wins over the w-3/w-4 utilities in KuiReact, so every chrome
 *  icon there is a 16px glyph centred in a 20x16 box. */
function FaBox({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={style} className="h-4 w-5 items-center justify-center">
      {children}
    </View>
  );
}

/** Icon slot: KuiReact's `shrink-0 w-5` span. The 24px abbr badge inside it
 *  overflows 4px into the gap on the web, so the label starts 30px in. */
function IconSlot({ children }: { children: React.ReactNode }) {
  return <View className="w-5 shrink-0 items-start justify-center overflow-visible">{children}</View>;
}

function NavRow({
  active,
  label,
  icon,
  onPress,
  collapsed = false,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  /** Desktop icon rail: KuiReact's `justify-center px-2 py-2` with the label hidden. */
  collapsed?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      className={cn(
        "w-full flex-row items-center gap-2.5 rounded-lg",
        collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
        active ? "bg-primary-subtle" : "active:bg-surface-overlay",
      )}
    >
      <IconSlot>{icon}</IconSlot>
      {!collapsed ? (
        <Text numberOfLines={1} className={cn("flex-1 text-sm", active ? "font-medium text-primary" : "font-normal text-text-secondary")}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

/** KuiReact's SidebarBrand: mark + name + "Component library". */
function SidebarBrand() {
  return (
    <View className="min-w-0 flex-1 flex-row items-center gap-2.5">
      <BrandMark size={28} />
      <View className="min-w-0 flex-1">
        <Text numberOfLines={1} className="text-sm font-semibold text-text-primary">
          KUInative
        </Text>
        <Text numberOfLines={1} className="text-xs font-normal text-text-secondary">
          Component library
        </Text>
      </View>
    </View>
  );
}

/**
 * `variant="drawer"` is the mobile drawer body (KuiReact's AppShell Drawer
 * with SidebarBrand in its h-14 header). `variant="desktop"` is the `lg:`
 * aside: the h-14 logo bar, then AppSidebar's collapse row, search, groups
 * and footer; 224px wide (`lg:w-56`), or a 56px icon rail (`lg:w-14`) when
 * collapsed.
 */
export function Sidebar({ variant = "drawer" }: { variant?: "drawer" | "desktop" }) {
  const t = useThemeTokens();
  const pathname = usePathname();
  const close = useDrawer((s) => s.close);
  const railCollapsed = useDrawer((s) => s.collapsed);
  const setRailCollapsed = useDrawer((s) => s.setCollapsed);
  const desktop = variant === "desktop";
  const rail = desktop && railCollapsed;
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());

  const activeId = pathname !== "/" ? pathname.replace(/^\//, "") : null;
  const homeActive = pathname === "/";

  // KuiReact's AppSidebar filters on the item label only — Home included —
  // and drops groups left empty.
  const q = query.trim().toLowerCase();
  const showHome = !q || "home".includes(q);
  const groups = useMemo(
    () =>
      q
        ? NAV_GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => i.title.toLowerCase().includes(q)) })).filter(
            (g) => g.items.length > 0,
          )
        : NAV_GROUPS,
    [q],
  );

  const toggle = (label: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  const go = (path: Parameters<typeof router.navigate>[0]) => {
    close();
    router.navigate(path);
  };

  return (
    <SafeAreaView
      edges={desktop ? ["top", "bottom", "left"] : ["top", "bottom"]}
      className={cn("bg-surface-raised", desktop ? "h-full shrink-0 border-r border-border" : "flex-1")}
      // KuiReact: lg:w-56 (224px) / lg:w-14 (56px) plus the aside's 1px border-r.
      style={desktop ? { width: (rail ? 56 : 224) + 1 } : undefined}
    >
      {desktop ? (
        // KuiReact: the aside's h-14 logo bar (the compact mark, centred, when collapsed).
        <View className={cn("h-14 flex-row items-center overflow-hidden border-b border-border", rail ? "justify-center px-2" : "px-4")}>
          {rail ? <BrandMark size={28} /> : <SidebarBrand />}
        </View>
      ) : (
      <View className="h-14 flex-row items-center gap-3 border-b border-border px-4">
        <SidebarBrand />
        <Pressable
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Close drawer"
          hitSlop={6}
          className="rounded p-1.5 active:bg-surface-overlay"
        >
          {/* KuiReact's inline svg sits 1px above the bar's centre (baseline + vertical-align). */}
          <FaBox style={{ transform: [{ translateY: -1 }] }}>
            <FontAwesomeIcon icon={faXmark} size={16} color={t["text-secondary"]} />
          </FaBox>
        </Pressable>
      </View>
      )}

      {desktop ? (
        // KuiReact AppSidebar: `hidden lg:flex items-center px-2 py-2 border-b` collapse toggle.
        <View className={cn("flex-row items-center border-b border-border px-2 py-2", rail ? "justify-center" : "justify-end")}>
          <Pressable
            onPress={() => setRailCollapsed(!railCollapsed)}
            accessibilityRole="button"
            accessibilityLabel={railCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="rounded p-1.5 active:bg-surface-overlay"
          >
            {/* The web button's 24px line box (text-base leading-normal) around the 16px glyph. */}
            <View className="h-6 w-5 items-center justify-center" style={{ transform: [{ rotate: railCollapsed ? "180deg" : "0deg" }] }}>
              <FontAwesomeIcon icon={faChevronLeft} size={16} color={t["text-secondary"]} />
            </View>
          </Pressable>
        </View>
      ) : null}

      {/* Search (hidden on the collapsed rail) */}
      {!rail ? (
      <View className="border-b border-border px-3 py-2">
        <View className="relative justify-center">
          <View pointerEvents="none" className="absolute left-2.5 z-10">
            <FaBox>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={16} color={t["text-disabled"]} />
            </FaBox>
          </View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Escape") setQuery("");
            }}
            placeholder="Search…"
            placeholderTextColor={t["text-disabled"]}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Search navigation"
            style={{ fontFamily: FONTS.sans }}
            className="w-full rounded-md border border-border bg-surface-base py-1.5 pl-7 pr-3 text-xs text-text-primary"
          />
        </View>
      </View>
      ) : null}

      <ScrollView
        // KuiReact's `sidebar-scrollbar-hover` (stable thin gutter, thumb on hover) — global.css.
        {...({ dataSet: { sidebarScrollbarHover: true } } as object)}
        className="flex-1"
        contentContainerClassName="px-2 py-3 gap-4"
        keyboardShouldPersistTaps="handled"
      >
        {/* Home — the label-less first group */}
        {showHome ? (
        <NavRow
          collapsed={rail}
          active={homeActive}
          label="Home"
          onPress={() => go("/")}
          icon={
            <View className="w-5 items-center">
              <FontAwesomeIcon icon={faHouse} size={17} color={homeActive ? t.primary : t["text-secondary"]} />
            </View>
          }
        />
        ) : null}

        {groups.map((group) => {
          // KuiReact: groups are always expanded (and their headers hidden) on the collapsed rail.
          const expanded = rail || !collapsed.has(group.label);
          const hasActive = group.items.some((e) => e.id === activeId);
          return (
            <View key={group.label}>
              {!rail ? (
              <Pressable
                onPress={() => toggle(group.label)}
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                className="mb-1 w-full flex-row items-center justify-between rounded-md px-3 py-1"
              >
                <Text
                  className={`text-[10px] leading-[15px] font-semibold uppercase tracking-widest ${
                    hasActive ? "text-text-primary" : "text-text-disabled"
                  }`}
                >
                  {group.label}
                </Text>
                <FaBox style={{ transform: [{ rotate: expanded ? "0deg" : "-90deg" }] }}>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size={16}
                    color={hasActive ? t["text-primary"] : t["text-disabled"]}
                  />
                </FaBox>
              </Pressable>
              ) : null}
              {expanded ? (
                <View className="gap-0.5">
                  {group.items.map((item) => (
                    <NavRow
                      collapsed={rail}
                      key={item.id}
                      active={item.id === activeId}
                      label={item.title}
                      onPress={() => go({ pathname: "/[slug]", params: { slug: item.id } })}
                      icon={
                        <View className="h-6 w-6 items-center justify-center rounded bg-surface-sunken">
                          <Text className="text-[11px] font-bold text-text-secondary">{item.abbr}</Text>
                        </View>
                      }
                    />
                  ))}
                </View>
              ) : null}
            </View>
          );
        })}

      </ScrollView>

      {/* Footer (KuiReact: avatar only, centred, on the collapsed rail) */}
      <View className={cn("border-t border-border", rail && "items-center px-2 py-3")}>
        <View className={cn("flex-row items-center p-3", rail ? "justify-center" : "gap-2")}>
          <View className="h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-subtle">
            <Text className="text-xs font-bold text-primary">D</Text>
          </View>
          {!rail ? (
          <View className="min-w-0">
            <Text numberOfLines={1} className="text-xs font-semibold text-text-primary">
              Developer
            </Text>
            <Text numberOfLines={1} className="text-[10px] leading-[15px] font-normal text-text-secondary">
              Component Library
            </Text>
          </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
