import type * as React from "react";
import { useState } from "react";
import { Platform, View } from "react-native";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Button } from "./Button";
import { AnchoredPanel, useAnchor, type Placement } from "./Overlays/shared";
import { Trigger } from "./Overlays/shared/useTrigger";
import { Text } from "./Text";

export type PopconfirmProps = {
  trigger: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  placement?: Placement;
  onConfirm: () => void;
  onCancel?: () => void;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Popconfirm: a `w-72 rounded-lg border
 * border-border bg-surface-raised p-4 shadow-xl` "are you sure?" panel 8px
 * from the trigger, with a question icon (warning, or error when `danger`),
 * title / description and ghost Cancel + primary/danger Confirm buttons.
 * Tap outside or Android back dismisses it without confirming (KuiReact:
 * outside click / Escape).
 */
export function Popconfirm({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  placement = "bottom",
  onConfirm,
  onCancel,
  className,
}: PopconfirmProps) {
  const t = useThemeTokens();
  const [open, setOpen] = useState(false);
  const { ref, rect, measure } = useAnchor<View>();

  function toggle() {
    if (!open) measure();
    setOpen((o) => !o);
  }
  function handleCancel() {
    setOpen(false);
    onCancel?.();
  }
  function handleConfirm() {
    setOpen(false);
    onConfirm();
  }

  return (
    <>
      <Trigger anchorRef={ref} trigger={trigger} onToggle={toggle} extraProps={{ accessibilityState: { expanded: open } }} />
      <AnchoredPanel open={open} onClose={() => setOpen(false)} anchor={rect} placement={placement} align="start" gap={8}>
        <View
          testID="popconfirm-panel"
          role="alertdialog"
          aria-label={typeof title === "string" ? title : "Confirm action"}
          accessibilityViewIsModal
          className={cn("w-72 rounded-lg border border-border bg-surface-raised p-4 shadow-xl", className)}
          style={Platform.OS === "android" ? { elevation: 12 } : undefined}
        >
          <View className="flex-row gap-2.5">
            <View className="mt-0.5 shrink-0" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              <FontAwesomeIcon icon={faCircleQuestion} size={16} color={danger ? t.error : t.warning} />
            </View>
            <View className="min-w-0 flex-1">
              {typeof title === "string" ? <Text className="text-sm font-medium text-text-primary">{title}</Text> : title}
              {description ? (
                typeof description === "string" ? (
                  <Text className="mt-1 text-xs text-text-secondary">{description}</Text>
                ) : (
                  description
                )
              ) : null}
            </View>
          </View>
          <View className="mt-3 flex-row justify-end gap-2">
            <Button variant="ghost" size="sm" onPress={handleCancel}>
              {cancelLabel}
            </Button>
            <Button variant={danger ? "danger" : "primary"} size="sm" onPress={handleConfirm}>
              {confirmLabel}
            </Button>
          </View>
        </View>
      </AnchoredPanel>
    </>
  );
}
