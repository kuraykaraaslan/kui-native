import { Component, Suspense, useMemo, useRef, useState, type ErrorInfo, type ReactNode } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { cn } from "../../libs/utils/cn";
import { sortByOrder } from "../../libs/utils/orderItems";

import { Spinner } from "./Spinner";
import { Text } from "./Text";
import { UnavailableContribution } from "./UnavailableContribution";

export type Tab = {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  content: ReactNode;
  /** Position among the tabs, like CSS `order`: missing counts as 0, ties keep array order. */
  order?: number;
  /** Overrides the group's `isolate` for this tab (e.g. `true` for a tab another module contributes). */
  isolate?: boolean;
  /** Overrides the group's `lazy` for this tab. */
  lazy?: boolean;
};

export type TabErrorContext = {
  tab: Tab;
  error: Error;
  reset: () => void;
};

export type TabGroupProps = {
  tabs: Tab[];
  defaultTab?: string;
  /** Accessible name of the tab list (KuiReact default "Tabs"). */
  label?: string;
  /** Render a panel only once it has been activated. */
  lazy?: boolean;
  /**
   * Wrap each tab panel in an error boundary and a Suspense boundary, so one tab that throws
   * or suspends cannot take the others down. Per tab, `tab.isolate` overrides it.
   */
  isolate?: boolean;
  /** What an isolated tab shows after it throws. Defaults to a "failed" placeholder with a retry. */
  renderError?: (context: TabErrorContext) => ReactNode;
  /** What an isolated tab shows while it suspends. Defaults to a spinner. */
  loadingFallback?: ReactNode;
  /** Called when an isolated tab throws, for reporting. */
  onTabError?: (tabId: string, error: Error, info: ErrorInfo) => void;
  /** Label of the default error fallback's retry button. */
  retryLabel?: string;
  className?: string;
};

type BoundaryProps = {
  children?: ReactNode;
  fallback: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
};

/**
 * KuiReact isolates a tab with its exported ContributionBoundary; KUInative keeps the same
 * boundary private to TabGroup until a native host needs one of its own.
 */
class TabBoundary extends Component<BoundaryProps, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    try {
      this.props.onError?.(error instanceof Error ? error : new Error(String(error)), info);
    } catch (reportError) {
      console.error("TabGroup: onTabError threw", reportError);
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    return this.state.error ? this.props.fallback(this.state.error, this.reset) : this.props.children;
  }
}

/**
 * Pixel-for-pixel with KuiReact's TabGroup (modules/ui/TabGroup.tsx).
 * KuiReact's ArrowLeft/Right/Home/End handling is a desktop keyboard
 * pattern; on native, screen readers move between the `tab` items by swipe.
 */
export function TabGroup({
  tabs,
  defaultTab,
  label = "Tabs",
  lazy = false,
  isolate = false,
  renderError,
  loadingFallback,
  onTabError,
  retryLabel = "Retry",
  className,
}: TabGroupProps) {
  const ordered = useMemo(() => sortByOrder(tabs), [tabs]);
  const firstId = ordered[0]?.id ?? "";
  const initial = defaultTab ?? firstId;
  const [active, setActive] = useState(initial);
  const activated = useRef<Set<string>>(new Set([initial]));
  // A tab that went away (a contributed tab that was removed) hands over to the first one.
  const current = ordered.some((t) => t.id === active) ? active : firstId;

  function activate(id: string) {
    activated.current.add(id);
    setActive(id);
  }

  function panelContent(tab: Tab): ReactNode {
    if (!(tab.isolate ?? isolate)) return tab.content;
    return (
      <TabBoundary
        onError={onTabError ? (error, info) => onTabError(tab.id, error, info) : undefined}
        fallback={(error, reset) =>
          renderError ? (
            renderError({ tab, error, reset })
          ) : (
            <UnavailableContribution reason="failed" size="tab" action={{ label: retryLabel, onPress: reset }} />
          )
        }
      >
        <Suspense
          fallback={
            loadingFallback ?? (
              <View className="items-center py-8">
                <Spinner size="md" />
              </View>
            )
          }
        >
          {tab.content}
        </Suspense>
      </TabBoundary>
    );
  }

  return (
    <View className={cn("w-full", className)}>
      {/* KuiReact: role="tablist" "flex border-b border-border pb-3". A
          horizontal ScrollView keeps long tab rows usable on phones; when
          the tabs fit it renders identically to KuiReact's flex row. */}
      <View accessibilityRole="tablist" accessibilityLabel={label} className="border-b border-border pb-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="flex-row">
          {ordered.map((tab) => {
            const isActive = tab.id === current;
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

      {ordered.map((tab) => {
        const isActive = tab.id === current;
        const shouldRender = !(tab.lazy ?? lazy) || isActive || activated.current.has(tab.id);
        return (
          // KuiReact: role="tabpanel" "py-4", hidden when inactive.
          <View
            key={tab.id}
            testID={`tabpanel-${tab.id}`}
            className="py-4"
            style={isActive ? undefined : { display: "none" }}
          >
            {shouldRender ? panelContent(tab) : null}
          </View>
        );
      })}
    </View>
  );
}
