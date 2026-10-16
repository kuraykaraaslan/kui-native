// Shared marks of the cartesian charts, ported from KuiReact's charts/_marks.tsx: point shapes
// (circle, square, diamond, triangle) and value labels with the kit's text style. KuiReact's
// entrance animation (Web Animations API) has no native counterpart here.

import type * as React from "react";
import { Circle, G, Path, Text as SvgText } from "react-native-svg";

import { axisTextProps, svgFont, useChartColor } from "../primitives";
import type { AxisTextStyle, PointShape } from "../types";
import { pointPath } from "./_helpers";
import { fontWeightName } from "../../../../libs/utils/typography";

type MarkProps = {
  shape?: PointShape;
  x: number;
  y: number;
  r: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  opacity?: number;
  testID?: string;
  onPress?: () => void;
};

/** One point mark. A circle is a `<Circle>`; the other shapes are paths. */
export function PointMark({ shape = "circle", x, y, r, ...rest }: MarkProps) {
  if (shape === "circle") return <Circle cx={x} cy={y} r={r} {...rest} />;
  return <Path d={pointPath(shape, x, y, r)} {...rest} />;
}

/**
 * A value label: the axis text look, with a halo so it reads over grid and marks (RN SVG has no
 * `paint-order`, so the halo is a stroked copy underneath). On a filled mark (`onFill`) the text
 * takes the surface colour and no halo: white on the saturated light-theme palette, dark on the
 * lighter dark-theme one.
 */
export function ValueLabel({
  x,
  y,
  anchor = "middle",
  style,
  onFill = false,
  testID = "chart-value-label",
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  style?: AxisTextStyle;
  onFill?: boolean;
  testID?: string;
  children: React.ReactNode;
}) {
  const c = useChartColor();
  const base = axisTextProps(style, c);
  const props = {
    ...base,
    ...(style?.fontWeight === undefined ? svgFont("medium") : svgFont(fontWeightName(style.fontWeight) ?? "medium")),
    fontSize: style?.fontSize ?? 11,
    x,
    y,
    textAnchor: anchor,
  };
  const fill = c(style?.color ?? (onFill ? "var(--surface-base)" : "var(--text-primary)"));
  if (onFill) {
    return (
      <SvgText testID={testID} {...props} fill={fill}>
        {children}
      </SvgText>
    );
  }
  return (
    <G pointerEvents="none">
      <SvgText {...props} fill={c("var(--surface-raised)")} stroke={c("var(--surface-raised)")} strokeWidth={3} strokeLinejoin="round">
        {children}
      </SvgText>
      <SvgText testID={testID} {...props} fill={fill}>
        {children}
      </SvgText>
    </G>
  );
}
