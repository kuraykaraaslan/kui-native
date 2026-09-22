import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated } from "react-native";

/**
 * Enter/exit lifecycle for overlays — the RN counterpart of KuiReact's
 * `Overlays/shared/usePresence`. Keeps the overlay mounted while its exit
 * animation plays, and drives a 0 → 1 `progress` value callers map onto
 * opacity / scale / translate.
 *
 * KuiReact animates over 200ms (`duration-200`); Reduce Motion skips the
 * animation (KuiReact's `reducedMotion` prop is still a TODO there).
 */
export function usePresence(open: boolean, { duration = 200, onOpened }: { duration?: number; onOpened?: () => void } = {}) {
  const [mounted, setMounted] = useState(open);
  const progress = useRef(new Animated.Value(open ? 1 : 0)).current;
  const onOpenedRef = useRef(onOpened);
  onOpenedRef.current = onOpened;

  useEffect(() => {
    let cancelled = false;
    if (open) setMounted(true);
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduce) => {
        if (cancelled) return;
        Animated.timing(progress, {
          toValue: open ? 1 : 0,
          duration: reduce ? 0 : duration,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (!finished || cancelled) return;
          if (open) onOpenedRef.current?.();
          else setMounted(false);
        });
      });
    return () => {
      cancelled = true;
    };
  }, [open, progress, duration]);

  return { mounted, progress };
}
