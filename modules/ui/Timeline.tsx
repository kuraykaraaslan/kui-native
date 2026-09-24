import { Fragment, type ReactNode } from "react";
import { View } from "react-native";

import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

/**
 * A chronological activity feed, ported from KuiReact's Timeline.
 *
 * Grouping is by the viewer's local day: the key comes from
 * `Intl.DateTimeFormat` in the given `timeZone` (the viewer's own by
 * default), so an event at 23:50 UTC lands under the day the viewer
 * expects.
 *
 * RN adaptations: the day headings are plain rows (RN has no CSS
 * `position: sticky`), and the connector stops at the last event — the
 * behaviour KuiReact's comment describes (its `last:hidden` never matches,
 * so its line runs past the final item).
 */

export type TimelineItem = {
  /** Stable identity. Never the array index. */
  id: string;
  /** When it happened. A Date, or anything `new Date()` accepts. */
  at: Date | string | number;
  /** Short label — the verb. */
  title: ReactNode;
  /** The detail, if there is any worth showing inline. */
  body?: ReactNode;
  /** Small leading marker: an icon, an avatar, a coloured dot. */
  icon?: ReactNode;
  tone?: "default" | "success" | "warning" | "error" | "info";
  /** Rendered at the right of the header row — a status chip, a menu. */
  meta?: ReactNode;
};

export type TimelineProps = {
  items: TimelineItem[];
  /** IANA zone used for day grouping and time display. Defaults to the viewer's own. */
  timeZone?: string;
  /** BCP 47 tag for the date and time formatting. */
  locale?: string;
  /** Show day headings (default true). */
  groupByDay?: boolean;
  emptyMessage?: string;
  className?: string;
};

const TONE_CLASS: Record<NonNullable<TimelineItem["tone"]>, string> = {
  default: "bg-surface-sunken",
  success: "bg-success-subtle",
  warning: "bg-warning-subtle",
  error: "bg-error-subtle",
  info: "bg-info-subtle",
};

function toDate(value: Date | string | number): Date {
  return value instanceof Date ? value : new Date(value);
}

const textNode = (node: ReactNode, className: string) =>
  typeof node === "string" || typeof node === "number" ? <Text className={className}>{node}</Text> : node;

export function Timeline({ items, timeZone, locale, groupByDay = true, emptyMessage = "Nothing here yet.", className }: TimelineProps) {
  if (items.length === 0) {
    return <Text className={cn("py-8 text-center text-sm text-text-secondary", className)}>{emptyMessage}</Text>;
  }

  const dayFormat = new Intl.DateTimeFormat(locale, { timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric" });
  // `hourCycle` rather than `hour12: false`: the latter renders midnight as
  // hour "24" on some ICU builds.
  const timeFormat = new Intl.DateTimeFormat(locale, { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

  // Grouping is computed before rendering (not by mutating a closure
  // variable inside the map), so a restarted concurrent render can't put
  // the day headings in the wrong places.
  const sorted = [...items]
    .sort((a, b) => toDate(b.at).getTime() - toDate(a.at).getTime())
    .map((item) => ({ item, at: toDate(item.at) }));
  const rendered = sorted.map((entry, index) => {
    const day = dayFormat.format(entry.at);
    const previousDay = index === 0 ? null : dayFormat.format(sorted[index - 1].at);
    return { ...entry, day, showDay: groupByDay && day !== previousDay, isLast: index === sorted.length - 1 };
  });

  return (
    <View role="list" className={cn("flex-col", className)}>
      {rendered.map(({ item, at, day, showDay, isLast }) => (
        <Fragment key={item.id}>
          {showDay ? (
            <Text accessibilityRole="header" className="bg-surface-base py-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
              {day}
            </Text>
          ) : null}

          <View role="listitem" className="relative flex-row gap-3 pb-5 pl-1">
            {!isLast ? <View testID="timeline-connector" className="absolute bottom-0 left-[1.0625rem] top-8 w-px bg-border" /> : null}

            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              className={cn("z-[1] h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full", TONE_CLASS[item.tone ?? "default"])}
            >
              {item.icon}
            </View>

            <View className="min-w-0 flex-1 pt-1.5">
              <View className="flex-row flex-wrap items-baseline gap-x-2 gap-y-1">
                {textNode(item.title, "text-sm text-text-primary")}
                <Text className="text-xs text-text-secondary" style={{ fontVariant: ["tabular-nums"] }}>
                  {timeFormat.format(at)}
                </Text>
                {item.meta ? <View className="ml-auto">{item.meta}</View> : null}
              </View>
              {item.body ? <View className="mt-1">{textNode(item.body, "text-sm text-text-secondary")}</View> : null}
            </View>
          </View>
        </Fragment>
      ))}
    </View>
  );
}
