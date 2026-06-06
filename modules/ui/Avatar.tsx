import { useState } from "react";
import type * as React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeCls: Record<AvatarSize, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

const sizePx: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };

const textSize: Record<AvatarSize, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
  xl: "text-2xl",
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export type AvatarProps = {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
};

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={name}
      className={cn(
        "items-center justify-center overflow-hidden rounded-full bg-primary-subtle",
        sizeCls[size],
        className,
      )}
    >
      {showImage ? (
        <Image
          source={{ uri: src }}
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
}

export function AvatarGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <View className={cn("flex-row", className)}>{children}</View>;
}
