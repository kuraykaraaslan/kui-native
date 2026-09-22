import type * as React from "react";
import { ScrollView, type ScrollViewProps } from "react-native";

import { cn } from "@/libs/utils/cn";

type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export type ScrollAreaProps = {
  orientation?: ScrollAreaOrientation;
  className?: string;
  children?: React.ReactNode;
} & Omit<ScrollViewProps, "horizontal" | "children">;

/**
 * KuiReact's ScrollArea: a `relative rounded-md` container scrolling
 * vertically, horizontally or on both axes. RN scroll views already draw a
 * thin, auto-hiding platform indicator, so KuiReact's themed scrollbar CSS
 * has no counterpart; `both` nests a horizontal scroller inside the
 * vertical one.
 */
export function ScrollArea({ orientation = "vertical", className, children, ...rest }: ScrollAreaProps) {
  const outer = cn("relative rounded-md", className);
  if (orientation === "horizontal") {
    return (
      <ScrollView horizontal nestedScrollEnabled className={outer} {...rest}>
        {children}
      </ScrollView>
    );
  }
  if (orientation === "both") {
    return (
      <ScrollView nestedScrollEnabled className={outer} {...rest}>
        <ScrollView horizontal nestedScrollEnabled>
          {children}
        </ScrollView>
      </ScrollView>
    );
  }
  return (
    <ScrollView nestedScrollEnabled className={outer} {...rest}>
      {children}
    </ScrollView>
  );
}
