import type * as React from "react";
import { View, type ViewProps } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type CardVariant = "raised" | "outline";

const variantCls: Record<CardVariant, string> = {
  raised: "bg-surface-raised border border-border",
  outline: "bg-transparent border border-border",
};

export type CardProps = ViewProps & {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  children?: React.ReactNode;
};

export function Card({
  title,
  subtitle,
  footer,
  variant = "raised",
  className,
  children,
  ...rest
}: CardProps) {
  const hasHeader = Boolean(title || subtitle);
  return (
    <View className={cn("rounded-xl p-4", variantCls[variant], className)} {...rest}>
      {title ? <Text variant="h4">{title}</Text> : null}
      {subtitle ? (
        <Text variant="bodySm" className="mt-0.5">
          {subtitle}
        </Text>
      ) : null}
      {children ? <View className={cn(hasHeader && "mt-3")}>{children}</View> : null}
      {footer ? <View className="mt-3 border-t border-border pt-3">{footer}</View> : null}
    </View>
  );
}
