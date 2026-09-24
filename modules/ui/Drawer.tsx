import type * as React from "react";
import { useContext } from "react";
import { Animated, Platform, Pressable, Modal as RNModal, ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Backdrop, useFocusOnOpen, usePresence } from "./Overlays/shared";
import { Text } from "./Text";

// KuiReact: "w-80 max-w-full" (320px, never wider than the screen).
const PANEL_WIDTH = 320;

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "left" | "right";
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Accepted for API parity; a no-op, as it is in KuiReact (its "M6 stub"). */
  closeOnRouteChange?: boolean;
  /** Accepted for API parity (a TODO in KuiReact); the OS Reduce Motion setting is always honoured. */
  reducedMotion?: boolean;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Drawer (modules/ui/Overlays/Drawer): a
 * full-height 320px `surface-raised` panel with `shadow-xl` and a border on
 * its inner edge, sliding in from the chosen side over a black/50 backdrop
 * in 200ms; header (`px-4 py-4`, title, close button, divider), scrolling
 * body (`px-4 py-4`), optional footer (`px-4 py-4`, divider).
 */
export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  children,
  footer,
  className,
}: DrawerProps) {
  const t = useThemeTokens();
  const { width: screenWidth } = useWindowDimensions();
  // Fall back to zero insets outside a SafeAreaProvider (e.g. in tests).
  const insets = useContext(SafeAreaInsetsContext) ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const { focusRef, onOpened } = useFocusOnOpen();
  const { mounted, progress } = usePresence(open, { onOpened });

  if (!mounted) return null;

  const width = Math.min(PANEL_WIDTH, screenWidth);
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [side === "right" ? width : -width, 0],
  });

  return (
    <RNModal visible transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.fill} className={cn("flex-row", side === "right" ? "justify-end" : "justify-start")}>
        <Backdrop progress={progress} onPress={onClose} />
        <Animated.View
          accessibilityViewIsModal
          accessibilityLabel={title}
          style={[{ width, transform: [{ translateX }] }, styles.fillHeight]}
        >
          <View
            testID="drawer-panel"
            className={cn(
              "h-full w-full border-border bg-surface-raised shadow-xl",
              side === "right" ? "border-l" : "border-r",
              className,
            )}
            style={[
              { paddingTop: insets.top, paddingBottom: insets.bottom },
              Platform.OS === "android" ? styles.elevation : null,
            ]}
          >
            <View className="flex-row items-center justify-between gap-3 border-b border-border px-4 py-4">
              <Text ref={focusRef} variant="title">
                {title}
              </Text>
              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close drawer"
                hitSlop={12}
                className="rounded"
              >
                <FontAwesomeIcon icon={faXmark} size={16} color={t["text-disabled"]} />
              </Pressable>
            </View>
            <ScrollView className="min-h-0 flex-1" contentContainerClassName="px-4 py-4">
              {children}
            </ScrollView>
            {footer ? (
              // KuiReact's footer is a plain block whose buttons sit inline
              // side by side with no gap; flex-row reproduces that.
              <View className="flex-row items-center border-t border-border px-4 py-4">{footer}</View>
            ) : null}
          </View>
        </Animated.View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  fillHeight: { height: "100%" },
  // NativeWind's shadow-xl sets iOS shadow props only; Android needs elevation.
  elevation: { elevation: 16 },
});
