import type * as React from "react";
import { useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

export type Tab = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  content: React.ReactNode;
};

export type TabGroupProps = {
  tabs: Tab[];
  defaultTab?: string;
  /** Accessible name of the tab list (KuiReact default "Tabs"). */
  label?: string;
  /** Render a panel only once it has been activated. */
  lazy?: boolean;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's TabGroup (modules/ui/TabGroup.tsx).
 * KuiReact's ArrowLeft/Right/Home/End handling is a desktop keyboard
 * pattern; on native, screen readers move between the `tab` items by swipe.
 */
export function TabGroup({ tabs, defaultTab, label = "Tabs", lazy = false, className }: TabGroupProps) {
  const initial = defaultTab ?? tabs[0]?.id ?? "";
  const [active, setActive] = useState(initial);
  const activated = useRef<Set<string>>(new Set([initial]));

  function activate(id: string) {
    activated.current.add(id);
    setActive(id);
  }

  return (
    <View className={cn("w-full", className)}>
      {/* KuiReact: role="tablist" "flex border-b border-border pb-3". A
          horizontal ScrollView keeps long tab rows usable on phones; when
          the tabs fit it renders identically to KuiReact's flex row. */}
      <View accessibilityRole="tablist" accessibilityLabel={label} className="border-b border-border pb-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="flex-row">
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <Pressable
                key={tab.id}
                testID={`tab-btn-${tab.id}`}
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isActive, disabled: Boolean(tab.disabled) }}
                disabled={tab.disabled}
                onPress={() => activate(tab.id)}
                className={cn(
                  "flex-row items-center gap-1.5 border-b-2 px-4 py-2.5",
                  isActive ? "border-primary" : "border-transparent",
                  tab.disabled && "opacity-40",
                )}
              >
                {tab.icon ? (
                  <View className="shrink-0" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                    {tab.icon}
                  </View>
                ) : null}
                <Text className={cn("text-sm font-medium", isActive ? "text-primary" : "text-text-secondary")}>
                  {tab.label}
                </Text>
                {tab.badge ? <View className="shrink-0">{tab.badge}</View> : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const shouldRender = !lazy || activated.current.has(tab.id);
        return (
          // KuiReact: role="tabpanel" "py-4", hidden when inactive.
          <View
            key={tab.id}
            testID={`tabpanel-${tab.id}`}
            className="py-4"
            style={isActive ? undefined : { display: "none" }}
          >
            {shouldRender ? tab.content : null}
          </View>
        );
      })}
    </View>
  );
}
