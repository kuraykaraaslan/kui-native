import type * as React from "react";
import { Linking, View, type ViewProps } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBan,
  faBoxArchive,
  faGavel,
  faGem,
  faLock,
  faPowerOff,
  faPuzzlePiece,
  faShieldHalved,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { useThemeTokens, type TokenName } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Badge } from "./Badge";
import { Button } from "./Button";
import { Text } from "./Text";

/** Why a contribution cannot be shown. */
export type UnavailableReason =
  | "disabled"
  | "unentitled"
  | "blocked"
  | "retired"
  | "banned"
  | "quarantined"
  | "failed"
  | "missing"
  | "no-access";

/** Where the placeholder sits: a line in a bar or menu, a card body, a tab panel, an editor node or block. */
export type UnavailableContributionSize = "inline" | "card" | "tab" | "node";

/** Same names as the `Badge` variants it uses. */
export type UnavailableTone = "neutral" | "primary" | "info" | "warning" | "error";

export type UnavailableContributionAction = {
  label: string;
  /** KuiReact's `onClick`. */
  onPress?: () => void;
  /** Opened with `Linking.openURL` after `onPress` (an absolute URL or an app deep link). */
  href?: string;
  icon?: React.ReactNode;
};

export type UnavailableReasonMeta = {
  icon: IconDefinition;
  tone: UnavailableTone;
  /** Short text, shown as the heading or in the reason badge. */
  label: string;
  /** One sentence explaining the reason. */
  detail: string;
};

/** Default icon, tone and English texts per reason (KuiReact's UNAVAILABLE_REASONS). Hosts override the texts per instance. */
export const UNAVAILABLE_REASONS: Record<UnavailableReason, UnavailableReasonMeta> = {
  disabled:    { icon: faPowerOff,            tone: "neutral", label: "Disabled",       detail: "The module that provides this is turned off." },
  unentitled:  { icon: faGem,                 tone: "primary", label: "Not in plan",    detail: "Your current plan does not include this." },
  blocked:     { icon: faBan,                 tone: "warning", label: "Blocked",        detail: "An administrator has blocked this." },
  retired:     { icon: faBoxArchive,          tone: "neutral", label: "Retired",        detail: "This is no longer offered." },
  banned:      { icon: faGavel,               tone: "error",   label: "Banned",         detail: "This was banned and can no longer run." },
  quarantined: { icon: faShieldHalved,        tone: "warning", label: "Quarantined",    detail: "Paused automatically after repeated errors." },
  failed:      { icon: faTriangleExclamation, tone: "error",   label: "Failed to load", detail: "Something went wrong while showing this." },
  missing:     { icon: faPuzzlePiece,         tone: "neutral", label: "Missing",        detail: "What provided this is not installed." },
  "no-access": { icon: faLock,                tone: "neutral", label: "No access",      detail: "You do not have permission to see this." },
};

export const UNAVAILABLE_REASON_IDS = Object.keys(UNAVAILABLE_REASONS) as UnavailableReason[];

/** The content of a placeholder, without where it sits. */
export type UnavailableContributionContent = {
  reason: UnavailableReason;
  /** What is unavailable (e.g. the contribution's name). The reason then shows as a badge. */
  title?: string;
  /** Overrides the reason's short text. */
  label?: string;
  /** Overrides the reason's explanation; `null` hides it. */
  detail?: string | null;
  /** Overrides the reason's icon. */
  icon?: React.ReactNode;
  /** Overrides the reason's tone. */
  tone?: UnavailableTone;
  /** What the viewer can do about it: enable, upgrade, retry, remove the reference. */
  action?: UnavailableContributionAction;
};

export type UnavailableContributionProps = UnavailableContributionContent &
  Omit<ViewProps, "children"> & {
    size?: UnavailableContributionSize;
    /** Draw the dashed placeholder frame (`card` and `node`). Turn off inside a host that has its own frame. */
    framed?: boolean;
    className?: string;
  };

// KuiReact's icon colour classes (text-text-secondary, text-primary, …) and the Badge text colour per tone.
const TONE_TOKEN: Record<UnavailableTone, TokenName> = {
  neutral: "text-secondary",
  primary: "primary",
  info: "info",
  warning: "warning",
  error: "error",
};
const BADGE_TEXT: Record<UnavailableTone, string> = {
  neutral: "text-text-secondary",
  primary: "text-primary",
  info: "text-info-fg",
  warning: "text-warning-fg",
  error: "text-error-fg",
};
const BADGE_TOKEN: Record<UnavailableTone, TokenName> = {
  neutral: "text-secondary",
  primary: "primary",
  info: "info-fg",
  warning: "warning-fg",
  error: "error-fg",
};
// KuiReact: h-3 / h-3.5 / h-4 / h-5 icons.
const ICON_PX: Record<UnavailableContributionSize, number> = { inline: 12, node: 14, card: 16, tab: 20 };

function ActionButton({ action, size, variant, className }: { action: UnavailableContributionAction; size: "xs" | "sm"; variant: "ghost" | "outline"; className?: string }) {
  return (
    <Button
      variant={variant}
      size={size}
      iconLeft={action.icon}
      className={className}
      onPress={() => {
        action.onPress?.();
        if (action.href) void Linking.openURL(action.href);
      }}
    >
      {action.label}
    </Button>
  );
}

/**
 * Pixel-for-pixel with KuiReact's UnavailableContribution: what an admin or
 * editor sees where a contribution cannot be shown — the reason (icon, tone,
 * short text), an explanation and an optional action. End users should see
 * nothing instead; the host decides who gets the placeholder. KuiReact's
 * `title` tooltip and sr-only detail on the inline size become the
 * accessibility hint.
 */
export function UnavailableContribution({
  reason,
  size = "card",
  title,
  label,
  detail,
  icon,
  tone,
  action,
  framed,
  className,
  testID,
  ...rest
}: UnavailableContributionProps) {
  const t = useThemeTokens();
  const meta = UNAVAILABLE_REASONS[reason] ?? UNAVAILABLE_REASONS.missing;
  const toneKey = tone ?? meta.tone;
  const text = label ?? meta.label;
  const description = detail === undefined ? meta.detail : detail;
  const heading = title ?? text;
  const common = { testID: testID ?? `unavailable-${reason}`, ...rest };

  if (size === "inline") {
    return (
      <View
        {...common}
        accessibilityHint={description || undefined}
        className={cn("max-w-full flex-row items-center gap-2 self-start", className)}
      >
        <Badge variant={toneKey} size="md" className="shrink-0">
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {icon ?? <FontAwesomeIcon icon={meta.icon} size={ICON_PX.inline} color={t[BADGE_TOKEN[toneKey]]} />}
          </View>
          <Text className={cn("text-xs font-medium", BADGE_TEXT[toneKey])}>{text}</Text>
        </Badge>
        {title ? (
          <Text numberOfLines={1} className="min-w-0 shrink text-xs font-medium text-text-primary">
            {title}
          </Text>
        ) : null}
        {action ? <ActionButton action={action} size="xs" variant="ghost" /> : null}
      </View>
    );
  }

  const iconTile = (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={cn(
        "shrink-0 items-center justify-center rounded-full bg-surface-sunken",
        size === "node" ? "h-8 w-8" : size === "tab" ? "mb-4 h-12 w-12" : "mb-3 h-10 w-10",
      )}
    >
      {icon ?? <FontAwesomeIcon icon={meta.icon} size={ICON_PX[size]} color={t[TONE_TOKEN[toneKey]]} />}
    </View>
  );
  const reasonBadge = title ? (
    <Badge variant={toneKey} size="sm">
      {text}
    </Badge>
  ) : null;

  if (size === "node") {
    return (
      <View
        {...common}
        className={cn(
          "w-full min-w-0 flex-row items-start gap-3 p-3",
          framed !== false && "rounded-lg border border-dashed border-border bg-surface-raised",
          className,
        )}
      >
        {iconTile}
        <View className="min-w-0 flex-1">
          <View className="min-w-0 flex-row flex-wrap items-center gap-1.5">
            <Text numberOfLines={1} className="text-sm font-semibold text-text-primary">
              {heading}
            </Text>
            {reasonBadge}
          </View>
          {description ? <Text className="mt-0.5 text-xs text-text-secondary">{description}</Text> : null}
        </View>
        {action ? <ActionButton action={action} size="xs" variant="outline" className="shrink-0" /> : null}
      </View>
    );
  }

  const isTab = size === "tab";
  return (
    <View
      {...common}
      className={cn(
        "w-full items-center justify-center",
        isTab ? "px-6 py-16" : "h-full min-h-32 px-4 py-6",
        !isTab && framed !== false && "rounded-xl border border-dashed border-border bg-surface-raised",
        className,
      )}
    >
      {iconTile}
      <Text className="text-center text-sm font-semibold text-text-primary">{heading}</Text>
      {reasonBadge ? <View className="mt-1.5">{reasonBadge}</View> : null}
      {description ? (
        <Text className={cn("mt-1 max-w-xs text-center text-text-secondary", isTab ? "text-sm" : "text-xs")}>{description}</Text>
      ) : null}
      {action ? (
        <View className={isTab ? "mt-4" : "mt-3"}>
          <ActionButton action={action} size={isTab ? "sm" : "xs"} variant="outline" />
        </View>
      ) : null}
    </View>
  );
}
