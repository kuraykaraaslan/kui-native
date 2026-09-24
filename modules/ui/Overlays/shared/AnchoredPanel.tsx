import type * as React from "react";
import { useCallback, useRef, useState } from "react";
import { Pressable, Modal as RNModal, StyleSheet, View, useWindowDimensions, type LayoutChangeEvent } from "react-native";

import { useThemeVars } from "../../../../libs/theme";

export type Placement = "top" | "bottom" | "left" | "right";
export type Align = "start" | "center" | "end";
export type Rect = { x: number; y: number; width: number; height: number };

const ZERO: Rect = { x: 0, y: 0, width: 0, height: 0 };
const SCREEN_MARGIN = 8;

/**
 * Measures an anchor (trigger) in window coordinates. KuiReact positions
 * overlays with absolute classes inside a `relative` wrapper; on RN that
 * would be clipped by any `overflow-hidden` ancestor and couldn't catch
 * outside taps, so the panel is rendered in a transparent window at the
 * anchor's measured position instead.
 */
export function useAnchor<T extends View>() {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<Rect>(ZERO);
  const measure = useCallback(() => {
    // Test renderers don't implement measureInWindow's callback; ZERO keeps
    // the panel renderable there.
    setRect(ZERO);
    ref.current?.measureInWindow?.((x, y, width, height) => setRect({ x, y, width, height }));
  }, []);
  return { ref, rect, measure };
}

/**
 * KuiReact's placement table (Overlays/shared/positioning.ts and the
 * per-component variants): the panel sits `gap` px beyond the anchor on the
 * chosen side, aligned to the anchor's start, centre or end. Unlike
 * KuiReact, the panel is kept inside the screen horizontally — on a phone an
 * overflowing panel would otherwise be unreachable.
 */
export function computePosition(anchor: Rect, panel: { width: number; height: number }, placement: Placement, align: Align, gap: number, screenWidth: number) {
  let left = 0;
  let top = 0;
  if (placement === "bottom" || placement === "top") {
    top = placement === "bottom" ? anchor.y + anchor.height + gap : anchor.y - panel.height - gap;
    left = align === "start" ? anchor.x : align === "end" ? anchor.x + anchor.width - panel.width : anchor.x + anchor.width / 2 - panel.width / 2;
  } else {
    left = placement === "right" ? anchor.x + anchor.width + gap : anchor.x - panel.width - gap;
    top = align === "start" ? anchor.y : align === "end" ? anchor.y + anchor.height - panel.height : anchor.y + anchor.height / 2 - panel.height / 2;
  }
  const maxLeft = Math.max(SCREEN_MARGIN, screenWidth - panel.width - SCREEN_MARGIN);
  return { left: Math.min(Math.max(left, SCREEN_MARGIN), maxLeft), top };
}

export type AnchoredPanelProps = {
  open: boolean;
  onClose: () => void;
  anchor: Rect;
  placement?: Placement;
  align?: Align;
  gap?: number;
  /** Tap outside closes (KuiReact: outside click). Tooltips pass false. */
  dismissOnOutsidePress?: boolean;
  /** Pass-through for tooltips: the panel ignores touches. */
  passThrough?: boolean;
  /** Fires once the panel's window is shown — the moment to move screen-reader focus into it. */
  onShow?: () => void;
  children: React.ReactNode;
};

export function AnchoredPanel({
  open,
  onClose,
  anchor,
  placement = "bottom",
  align = "start",
  gap = 8,
  dismissOnOutsidePress = true,
  passThrough = false,
  onShow,
  children,
}: AnchoredPanelProps) {
  const { width: screenWidth } = useWindowDimensions();
  const themeVars = useThemeVars();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.width || height !== size.height) setSize({ width, height });
  };
  if (!open) return null;
  const { left, top } = computePosition(anchor, size, placement, align, gap, screenWidth);

  return (
    <RNModal visible transparent animationType="none" statusBarTranslucent onRequestClose={onClose} onShow={onShow}>
      <View style={[themeVars, StyleSheet.absoluteFill]} pointerEvents={passThrough ? "none" : "box-none"}>
        {dismissOnOutsidePress ? (
          <Pressable
            testID="anchored-panel-outside"
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessible={false}
            importantForAccessibility="no"
          />
        ) : null}
        <View style={{ position: "absolute", left, top }} onLayout={onLayout} pointerEvents={passThrough ? "none" : "auto"}>
          {children}
        </View>
      </View>
    </RNModal>
  );
}
