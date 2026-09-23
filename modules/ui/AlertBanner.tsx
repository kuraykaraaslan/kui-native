import type * as React from "react";
import { useState } from "react";
import { Linking, Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type AlertVariant = "success" | "warning" | "error" | "info";

// Pixel-for-pixel with KuiReact's AlertBanner (modules/ui/AlertBanner.tsx).
const variantMap: Record<AlertVariant, { container: string; text: string; icon: IconDefinition }> = {
  success: { container: "bg-success-subtle border-success", text: "text-success-fg", icon: faCircleCheck },
  warning: { container: "bg-warning-subtle border-warning", text: "text-warning-fg", icon: faTriangleExclamation },
  error: { container: "bg-error-subtle border-error", text: "text-error-fg", icon: faCircleXmark },
  info: { container: "bg-info-subtle border-info", text: "text-info-fg", icon: faCircleInfo },
};

export type AlertAction = {
  label: string;
  /** Opened with `Linking.openURL` (KuiReact renders an `<a href>`). */
  href?: string;
  /** KuiReact's `onClick`. */
  onPress?: () => void;
};

export type AlertBannerProps = {
  variant?: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  action?: AlertAction;
  /** Replaces the variant's default icon (KuiReact: `icon?: ReactNode`). */
  icon?: React.ReactNode;
  className?: string;
};

export function AlertBanner({
  variant = "info",
  title,
  message,
  dismissible = false,
  action,
  icon,
  className,
}: AlertBannerProps) {
  const t = useThemeTokens();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const { container, text, icon: defaultIcon } = variantMap[variant];
  // FontAwesome needs a raw colour; KuiReact's icons inherit the variant's
  // `text-*-fg` colour, so read the same token.
  const fg = t[`${variant}-fg`];

  return (
    // KuiReact: "flex items-start gap-3 rounded-lg border p-4"
    <View className={cn("flex-row items-start gap-3 rounded-lg border p-4", container, className)}>
      {/* KuiReact's icon <span> is a 24px line box (16px × 1.5) with the inline
          SVG sitting 3px down — so the row is 26px tall, not 20. */}
      <View
        className="mt-0.5 min-h-6 shrink-0 justify-center"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {icon ?? (
          // FA's web box: a 1em-tall glyph in a 1.25em-wide (20x16) svg. RN's icon fits
          // the glyph into a size x size square, so it's drawn at 18 to match.
          <View className="h-4 w-5 items-center justify-center" style={{ marginTop: 3, marginBottom: 5 }}>
            <FontAwesomeIcon icon={defaultIcon} size={18} color={fg} />
          </View>
        )}
      </View>

      <View className="min-w-0 flex-1">
        {/* KuiReact puts role="alert" on the whole box. On RN an `accessible`
            container would swallow the action/dismiss buttons into a single
            element, so the alert role sits on the text block instead. */}
        <View accessible accessibilityRole="alert" accessibilityLiveRegion="polite">
          {title ? <Text className={cn("text-sm font-semibold", text)}>{title}</Text> : null}
          <Text className={cn("text-sm", text, title && "mt-0.5")}>{message}</Text>
        </View>
        {action ? (
          <View className="mt-2 flex-row">
            <Pressable
              onPress={action.href ? () => Linking.openURL(action.href as string) : action.onPress}
              accessibilityRole={action.href ? "link" : "button"}
              className="rounded active:opacity-70"
            >
              {/* Inline in a text-sm (20px) line box on the web. */}
              <Text className={cn("text-xs leading-5 font-semibold underline", text)}>{action.label}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      {dismissible ? (
        <Pressable
          onPress={() => setDismissed(true)}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={12}
          // KuiReact's <button> is a 24px line box with the SVG 3px down.
          className="h-6 shrink-0 rounded active:opacity-70"
        >
          <View className="h-4 w-5 items-center justify-center" style={{ marginTop: 3 }}>
            <FontAwesomeIcon icon={faXmark} size={18} color={fg} />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}
