import Svg, { Path, Rect } from "react-native-svg";

import { ARMS, GRID, STEM, STROKE_WIDTH, TILE_RADIUS, VIEW_BOX, armPath } from "@/libs/brand/geometry";
import { useThemeTokens } from "@/libs/theme";

/**
 * The kui-native mark, drawn from `libs/brand/geometry.ts` — the same source
 * `brand/build.mjs` writes the favicon, app icon and OG card from.
 *
 * Colors come from theme tokens only (`primary`, `brand-native`, `brand-tile`)
 * so the mark tracks light/dark with the chrome; a hex literal here is a
 * defect, and `libs/brand/geometry.test.ts` fails on one.
 */
export function BrandMark({ size = 28 }: { size?: number }) {
  const t = useThemeTokens();

  return (
    <Svg width={size} height={size} viewBox={VIEW_BOX} accessibilityLabel="kui native">
      <Rect width={GRID} height={GRID} rx={TILE_RADIUS} fill={t["brand-tile"]} />
      <Rect
        x={STEM.x}
        y={STEM.y}
        width={STEM.width}
        height={STEM.height}
        rx={STEM.radius}
        fill={t.primary}
      />
      {ARMS.map((_, i) => (
        <Path
          key={i}
          d={armPath(i as 0 | 1)}
          stroke={i === 0 ? t.primary : t["brand-native"]}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </Svg>
  );
}
