import { useState } from "react";
import type * as React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarStatus = "online" | "offline" | "away" | "busy";

// Pixel-for-pixel with KuiReact's Avatar (modules/ui/Avatar.tsx). A prior
// pass here used lg=56px/xl=80px and lg/xl text sizes one step too large —
// KuiReact's lg is 48px and xl is 64px.
const sizeCls: Record<AvatarSize, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const sizePx: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

const textSize: Record<AvatarSize, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const statusColorCls: Record<AvatarStatus, string> = {
  online: "bg-success",
  offline: "bg-text-disabled",
  away: "bg-warning",
  busy: "bg-error",
};

const statusDotCls: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-4 w-4",
};

function initials(name: string): string {
  const value = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  // KuiReact falls back to "?" for an empty/blank name; a prior pass here
  // rendered an empty circle instead.
  return value || "?";
}

export type AvatarProps = {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
};

export function Avatar({ name, src, size = "md", status, className }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  const avatar = (
    <View
      // `accessible` is required for a plain View's accessibilityRole to be
      // exposed to assistive tech at all (RN treats a View with a role but
      // no `accessible` as invisible to VoiceOver/TalkBack and to role-based
      // queries) — see docs/audits/kui-react-parity, same defect fixed on Spinner.
      accessible
      accessibilityRole="image"
      accessibilityLabel={name}
      className={cn(
        "items-center justify-center overflow-hidden rounded-full shrink-0",
        // KuiReact borders the image with `border-border` and the initials
        // fallback with `border-primary-subtle` (a border the same color as
        // its own fill, giving a subtle ring rather than a visible edge).
        showImage ? "border border-border" : "bg-primary-subtle border border-primary-subtle",
        sizeCls[size],
        className,
      )}
    >
      {showImage ? (
        <Image
          source={{ uri: src ?? undefined }}
          style={{ width: sizePx[size], height: sizePx[size] }}
          contentFit="cover"
          transition={150}
          onError={() => setErrored(true)}
        />
      ) : (
        <Text className={cn("font-semibold text-primary", textSize[size])}>{initials(name)}</Text>
      )}
    </View>
  );

  if (!status) return avatar;

  return (
    <View className="relative shrink-0">
      {avatar}
      <View
        accessibilityLabel={status}
        className={cn("absolute bottom-0 right-0 rounded-full border-2 border-surface-base", statusColorCls[status], statusDotCls[size])}
      />
    </View>
  );
}

export type AvatarGroupProps = {
  /** People to show (KuiReact's API). */
  avatars?: { src?: string | null; name: string }[];
  /** How many avatars to show before the "+N" chip (default 4). */
  max?: number;
  size?: AvatarSize;
  /** @deprecated Pass `avatars` (KuiReact's API). Children render as a plain row. */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's AvatarGroup: avatars overlap by 8px
 * ("-space-x-2") with a 2px surface-coloured ring ("ring-2 ring-surface-base"),
 * and anything past `max` collapses into a "+N" chip.
 */
export function AvatarGroup({ avatars, max = 4, size = "md", children, className }: AvatarGroupProps) {
  const t = useThemeTokens();
  if (!avatars) return <View className={cn("flex-row", className)}>{children}</View>;

  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  // KuiReact's ring is an outline outside the avatar; RN draws it with outline props.
  const ring = { outlineWidth: 2, outlineColor: t["surface-base"], outlineStyle: "solid" as const, borderRadius: 9999 };

  return (
    <View accessible accessibilityLabel={`${avatars.length} users`} className={cn("flex-row", className)}>
      {visible.map((a, i) => (
        <View key={`${a.name}-${i}`} style={[ring, i > 0 ? { marginLeft: -8 } : null]}>
          <Avatar name={a.name} src={a.src} size={size} />
        </View>
      ))}
      {overflow > 0 ? (
        <View
          accessibilityLabel={`${overflow} more`}
          style={[ring, { marginLeft: -8 }]}
          // KuiReact: "rounded-full bg-surface-sunken text-text-secondary font-semibold text-xs … border border-border"
          className={cn("items-center justify-center rounded-full border border-border bg-surface-sunken", sizeCls[size])}
        >
          <Text className="text-xs font-semibold text-text-secondary">+{overflow}</Text>
        </View>
      ) : null}
    </View>
  );
}
