import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  View,
  findNodeHandle,
  type Text as RNText,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type ModalSize = "sm" | "md" | "lg";

// KuiReact: max-w-sm / max-w-md / max-w-lg (24 / 28 / 32 rem).
const maxWidth: Record<ModalSize, number> = { sm: 384, md: 448, lg: 512 };

// KuiReact's usePresence keeps the panel mounted for the exit animation.
const DURATION_MS = 200;

export type ModalProps = {
  /** KuiReact's name for the visibility prop. */
  open?: boolean;
  /** @deprecated Use `open` (KuiReact's name). Kept for existing call sites. */
  visible?: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  fullscreen?: boolean;
  /** Scroll the body when its content is taller than the screen. */
  scrollable?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Modal (modules/ui/Overlays/Modal): a
 * `surface-raised`, `rounded-xl`, `shadow-xl` panel split into a header
 * (title, description, close button, bottom border), a body and a footer
 * (top border, right-aligned actions), all `px-6 py-4`; black/50 backdrop;
 * fade + scale 95%→100% over 200ms.
 *
 * The backdrop is a sibling of the panel, not its parent — the previous
 * version wrapped the panel in the backdrop Pressable (and made the panel a
 * Pressable too), which iOS VoiceOver collapses into a single element.
 */
export function Modal({
  open,
  visible,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  fullscreen = false,
  scrollable = false,
  closeOnBackdropClick = true,
  className,
}: ModalProps) {
  const isOpen = open ?? visible ?? false;
  const t = useThemeTokens();
  const [mounted, setMounted] = useState(isOpen);
  const progress = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const titleRef = useRef<RNText>(null);

  useEffect(() => {
    let cancelled = false;
    if (isOpen) setMounted(true);
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduce) => {
        if (cancelled) return;
        Animated.timing(progress, {
          toValue: isOpen ? 1 : 0,
          duration: reduce ? 0 : DURATION_MS,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (!finished || cancelled) return;
          if (!isOpen) setMounted(false);
          else {
            // Move screen-reader focus into the dialog (KuiReact's focus trap
            // focuses the panel on open).
            const node = titleRef.current ? findNodeHandle(titleRef.current) : null;
            if (node) AccessibilityInfo.setAccessibilityFocus(node);
          }
        });
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, progress]);

  if (!mounted) return null;

  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] });

  return (
    <RNModal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.fill}>
        <View className={cn("flex-1 p-4", fullscreen ? "items-stretch justify-center" : "items-center justify-center")}>
          {/* Backdrop — rgba is the documented exception for raw color (KuiReact: bg-black/50). */}
          <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: progress }]}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={closeOnBackdropClick ? onClose : undefined}
              // KuiReact marks the backdrop aria-hidden; the × button is the
              // accessible way out.
              accessible={false}
              importantForAccessibility="no"
            />
          </Animated.View>

          <Animated.View
            accessibilityViewIsModal
            style={[
              { opacity: progress, transform: [{ scale }], width: "100%" },
              fullscreen ? styles.fill : { maxWidth: maxWidth[size], maxHeight: "100%" },
            ]}
          >
            <View
              className={cn(
                "w-full border border-border bg-surface-raised shadow-xl",
                fullscreen ? "flex-1 rounded-none" : "max-h-full rounded-xl",
                className,
              )}
              style={Platform.OS === "android" ? styles.elevation : undefined}
            >
              <View className="flex-row items-start justify-between gap-3 border-b border-border px-6 py-4">
                <View className="flex-1">
                  <Text ref={titleRef} variant="title">
                    {title}
                  </Text>
                  {description ? (
                    <Text variant="bodySm" className="mt-0.5">
                      {description}
                    </Text>
                  ) : null}
                </View>
                <Pressable
                  onPress={onClose}
                  accessibilityRole="button"
                  accessibilityLabel="Close dialog"
                  hitSlop={12}
                  className="rounded"
                >
                  <FontAwesomeIcon icon={faXmark} size={16} color={t["text-disabled"]} />
                </Pressable>
              </View>

              {children ? (
                // KuiReact: "px-6 py-4 flex-1" (+ overflow-y-auto when scrollable).
                scrollable ? (
                  <ScrollView className={cn("shrink", fullscreen && "flex-1")} contentContainerClassName="px-6 py-4">
                    {children}
                  </ScrollView>
                ) : (
                  <View className={cn("shrink px-6 py-4", fullscreen && "flex-1")}>{children}</View>
                )
              ) : null}

              {footer ? (
                <View className="flex-row justify-end gap-2 border-t border-border px-6 py-4">{footer}</View>
              ) : null}
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  backdrop: { backgroundColor: "rgba(0,0,0,0.5)" },
  // NativeWind's shadow-xl sets iOS shadow props only; Android needs elevation.
  elevation: { elevation: 12 },
});
