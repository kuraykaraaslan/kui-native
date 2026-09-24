import { useCallback, useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, AppState, Easing, Platform, Pressable, View, useWindowDimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faSpinner,
  faTriangleExclamation,
  faXmark,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "../../../libs/theme";
import { cn } from "../../../libs/utils/cn";

import { Text } from "../Text";
import type { ToastItem, ToastVariant } from "./types";
import { getEffectiveDuration } from "./useToastStore";

// Pixel-for-pixel with KuiReact's Toast/parts/ToastItem.tsx.
const variantMap: Record<ToastVariant, { container: string; icon: IconDefinition; iconToken: string; progress: string }> = {
  success: { container: "bg-success-subtle border-success", icon: faCircleCheck, iconToken: "success-fg", progress: "bg-success" },
  warning: { container: "bg-warning-subtle border-warning", icon: faTriangleExclamation, iconToken: "warning", progress: "bg-warning" },
  error: { container: "bg-error-subtle border-error", icon: faCircleXmark, iconToken: "error", progress: "bg-error" },
  info: { container: "bg-info-subtle border-info", icon: faCircleInfo, iconToken: "info", progress: "bg-info" },
  loading: { container: "bg-surface-raised border-border", icon: faSpinner, iconToken: "text-secondary", progress: "bg-primary" },
};

const TICK_MS = 50;
const EXIT_MS = 250;
// KuiReact: "w-80" (320px); stays inside the screen's 16px gutters on phones.
const CARD_WIDTH = 320;

function SpinningIcon({ color }: { color: string }) {
  const spin = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [spin]);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <FontAwesomeIcon icon={faSpinner} size={16} color={color} />
    </Animated.View>
  );
}

export type ToastCardProps = {
  item: ToastItem;
  onRemove: () => void;
  reducedMotion?: boolean;
};

export function ToastCard({ item, onRemove, reducedMotion = false }: ToastCardProps) {
  const t = useThemeTokens();
  const { width: screenWidth } = useWindowDimensions();
  const duration = getEffectiveDuration(item);
  const hasDuration = duration !== null;

  const [progress, setProgress] = useState(100);
  const [paused, setPaused] = useState(false);
  const [exiting, setExiting] = useState(false);
  const remainingRef = useRef(duration ?? 0);
  const lastTickRef = useRef(0);
  const shown = useRef(new Animated.Value(reducedMotion ? 1 : 0)).current;

  // KuiReact: "transition-all duration-250 ease-out", opacity-0 translate-y-3 scale-95 → visible.
  useEffect(() => {
    if (reducedMotion) {
      shown.setValue(exiting ? 0 : 1);
      return;
    }
    Animated.timing(shown, {
      toValue: exiting ? 0 : 1,
      duration: EXIT_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [exiting, reducedMotion, shown]);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(onRemove, reducedMotion ? 0 : EXIT_MS);
  }, [onRemove, reducedMotion]);

  // Countdown tick (KuiReact: 50ms interval).
  useEffect(() => {
    if (!hasDuration || paused || exiting) return;
    lastTickRef.current = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - lastTickRef.current;
      lastTickRef.current = Date.now();
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      setProgress((remainingRef.current / (duration as number)) * 100);
      if (remainingRef.current <= 0) {
        clearInterval(id);
        dismiss();
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [hasDuration, paused, exiting, duration, dismiss]);

  // KuiReact pauses when the browser tab is hidden; the native equivalent is
  // the app leaving the foreground.
  useEffect(() => {
    if (!hasDuration) return;
    const sub = AppState.addEventListener("change", (state) => setPaused(state !== "active"));
    return () => sub.remove();
  }, [hasDuration]);

  // Re-sync when the duration changes (loading → success via promise()).
  useEffect(() => {
    remainingRef.current = duration ?? 0;
    setProgress(100);
    setExiting(false);
  }, [duration]);

  // KuiReact's live region re-announces on each variant/message change.
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(item.title ? `${item.title}. ${item.message}` : item.message);
  }, [item.variant, item.title, item.message]);

  const v = variantMap[item.variant];
  const iconColor = t[v.iconToken];
  const showClose = item.closeButton !== false;
  const assertive = item.variant === "warning" || item.variant === "error";

  const translateY = shown.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
  const scale = shown.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] });

  return (
    <Animated.View
      style={[
        { width: Math.min(CARD_WIDTH, screenWidth - 32), opacity: shown, transform: [{ translateY }, { scale }] },
        Platform.OS === "android" ? { elevation: 8 } : null,
      ]}
      pointerEvents="box-none"
    >
      {/* Hover-to-pause in KuiReact becomes press-and-hold to pause on touch. */}
      <Pressable
        onPressIn={() => hasDuration && setPaused(true)}
        onPressOut={() => hasDuration && setPaused(false)}
        accessible={false}
        testID={`toast-${item.id}`}
        className={cn("relative w-full overflow-hidden rounded-xl border shadow-lg", v.container)}
      >
        {/* Body: "flex items-start gap-3 px-4 pt-4 pb-3" */}
        <View className="flex-row items-start gap-3 px-4 pb-3 pt-4">
          <View className="mt-0.5" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {item.icon ??
              (item.variant === "loading" ? (
                <SpinningIcon color={iconColor} />
              ) : (
                <FontAwesomeIcon icon={v.icon} size={16} color={iconColor} />
              ))}
          </View>

          <View className="min-w-0 flex-1">
            <View
              accessible
              accessibilityRole={assertive ? "alert" : "summary"}
              accessibilityLiveRegion={assertive ? "assertive" : "polite"}
            >
              {item.title ? (
                <Text className="text-sm font-semibold leading-snug text-text-primary">{item.title}</Text>
              ) : null}
              <Text className={cn("text-sm leading-snug text-text-secondary", item.title && "mt-0.5")}>{item.message}</Text>
            </View>

            {item.actions && item.actions.length > 0 ? (
              <View className="mt-2.5 flex-row flex-wrap gap-x-3 gap-y-1">
                {item.actions.map((action) => (
                  <Pressable
                    key={action.label}
                    onPress={() => action.onPress(dismiss)}
                    accessibilityRole="button"
                    className="rounded active:opacity-70"
                  >
                    <Text
                      className={cn(
                        "text-xs font-semibold",
                        action.variant === "danger" ? "text-error" : "text-text-primary underline",
                      )}
                    >
                      {action.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>

          {showClose ? (
            <Pressable
              onPress={dismiss}
              accessibilityRole="button"
              accessibilityLabel="Dismiss"
              hitSlop={12}
              className="mt-0.5 shrink-0 rounded"
            >
              <FontAwesomeIcon icon={faXmark} size={14} color={t["text-secondary"]} />
            </Pressable>
          ) : null}
        </View>

        {/* KuiReact ProgressBar: "absolute bottom-0 left-0 right-0 h-0.5 bg-black/5", fill at 50% opacity. */}
        {hasDuration ? (
          <View className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
            <View
              testID="toast-progress"
              className={cn("h-full rounded-full", v.progress)}
              style={{ width: `${progress}%`, opacity: 0.5 }}
            />
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}
