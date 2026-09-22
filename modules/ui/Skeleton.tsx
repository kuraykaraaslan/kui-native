import type * as React from "react";
import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, Easing, View } from "react-native";

import { cn } from "@/libs/utils/cn";

/**
 * Tailwind's `animate-pulse` (KuiReact's skeleton animation):
 *   @keyframes pulse { 50% { opacity: .5 } }
 *   animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
 * i.e. opacity 1 → 0.5 → 1 over 2s. The previous KuiNative SkeletonCard
 * pulsed 0.3 ↔ 1 over 1.4s — deeper and faster than KuiReact. Skipped when
 * the OS "reduce motion" setting is on.
 */
function usePulse(enabled: boolean) {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!enabled) return;
    let loop: Animated.CompositeAnimation | undefined;
    let cancelled = false;
    const easing = Easing.bezier(0.4, 0, 0.6, 1);
    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduce) => {
        if (cancelled || reduce) return;
        loop = Animated.loop(
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.5, duration: 1000, easing, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 1000, easing, useNativeDriver: true }),
          ]),
        );
        loop.start();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      loop?.stop();
    };
  }, [enabled, opacity]);
  return opacity;
}

/** Animated opacity wrapper; the styled child is a plain View so NativeWind
 * classes apply without an Animated interop. */
function Pulse({ animated, children }: { animated: boolean; children: React.ReactNode }) {
  const opacity = usePulse(animated);
  if (!animated) return <>{children}</>;
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}

const base = "bg-surface-sunken";

type PulseControl = {
  /** Internal: a parent skeleton (e.g. SkeletonCard) animates its whole
   * content once instead of every bar running its own loop. */
  animated?: boolean;
};

/** KuiReact: `h-3 rounded` bar; `width` is a Tailwind width class (default `w-full`). */
export function SkeletonLine({
  width = "w-full",
  className,
  animated = true,
}: { width?: string; className?: string } & PulseControl) {
  return (
    <Pulse animated={animated}>
      <View className={cn(base, "h-3 rounded", width, className)} />
    </Pulse>
  );
}

/** KuiReact: circle of sm 32 / md 40 / lg 48 px. */
export function SkeletonAvatar({
  size = "md",
  className,
  animated = true,
}: { size?: "sm" | "md" | "lg"; className?: string } & PulseControl) {
  const s = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" }[size];
  return (
    <Pulse animated={animated}>
      <View className={cn(base, "rounded-full shrink-0", s, className)} />
    </Pulse>
  );
}

/** KuiReact: `lines` bars with `space-y-2`; the last one is `w-4/5`. */
export function SkeletonText({
  lines = 3,
  className,
  animated = true,
}: { lines?: number; className?: string } & PulseControl) {
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading content"
      accessibilityState={{ busy: true }}
      className={className}
    >
      <Pulse animated={animated}>
        <View className="gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <SkeletonLine key={i} animated={false} width={i === lines - 1 ? "w-4/5" : "w-full"} />
          ))}
        </View>
      </Pulse>
    </View>
  );
}

export type SkeletonCardProps = {
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's SkeletonCard (modules/ui/Skeleton.tsx):
 * p-6 card with an avatar + two-line header, a three-line text block and two
 * footer chips, `space-y-4` between sections. Only the bars pulse; the card
 * surface and border stay static, as in KuiReact.
 */
export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <View
      // `accessible` is required for the progressbar role to register with
      // assistive tech — the previous version set the role without it.
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading content"
      accessibilityState={{ busy: true }}
      className={cn("rounded-xl border border-border bg-surface-raised p-6", className)}
    >
      <Pulse animated>
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <SkeletonAvatar animated={false} />
            <View className="flex-1 gap-2">
              <SkeletonLine animated={false} width="w-2/3" />
              <SkeletonLine animated={false} width="w-1/2" />
            </View>
          </View>
          <View className="gap-2">
            {[0, 1, 2].map((i) => (
              <SkeletonLine key={i} animated={false} width={i === 2 ? "w-4/5" : "w-full"} />
            ))}
          </View>
          <View className="flex-row justify-between">
            <View className={cn(base, "h-6 w-16 rounded")} />
            <View className={cn(base, "h-6 w-20 rounded")} />
          </View>
        </View>
      </Pulse>
    </View>
  );
}
