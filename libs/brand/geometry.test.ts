import fs from "fs";
import path from "path";

import { ARMS, COLORS, FORK, GRID, STEM, STROKE_WIDTH, TILE_RADIUS, armPath } from "./geometry";

const ROOT = path.resolve(__dirname, "../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

describe("brand geometry (Brand_Positioning_Rules/logo-system.md)", () => {
  it("forks both arms at exactly 45 degrees (dx === dy)", () => {
    for (const tip of ARMS) {
      expect(Math.abs(tip.x - FORK.x)).toBe(Math.abs(tip.y - FORK.y));
    }
  });

  it("forks from the stem's vertical midpoint", () => {
    expect(FORK.y).toBe(STEM.y + STEM.height / 2);
  });

  // The family ships rx 14 on 64 (21.9%), which the ruleset rounds to "22%".
  it("keeps the family's stroke (10.5-11%) and tile radius (~22%)", () => {
    expect(STROKE_WIDTH / GRID).toBeGreaterThanOrEqual(0.105);
    expect(STROKE_WIDTH / GRID).toBeLessThanOrEqual(0.11);
    expect(TILE_RADIUS / GRID).toBeGreaterThanOrEqual(0.21);
    expect(TILE_RADIUS / GRID).toBeLessThanOrEqual(0.23);
  });

  it("uses the family's first tone and tile", () => {
    expect(COLORS.toneOne).toBe("#3b82f6");
    expect(COLORS.tile).toBe("#0f172a");
  });
});

describe("committed brand assets match the geometry", () => {
  // A geometry change without `npm run brand` leaves the favicon on the old
  // shape — the failure nobody notices for months.
  it.each(["public/favicon.svg", "brand/mark.svg"])("%s is current", (file) => {
    const svg = read(file);
    expect(svg).toContain(`d="${armPath(0)}"`);
    expect(svg).toContain(`d="${armPath(1)}"`);
    expect(svg).toContain(`stroke-width="${STROKE_WIDTH}"`);
    expect(svg).toContain(`rx="${TILE_RADIUS}"`);
    expect(svg).toContain(`fill="${COLORS.tile}"`);
    expect(svg).toContain(`stroke="${COLORS.toneTwo}"`);
  });

  it("the in-app mark colors from theme tokens, never hex", () => {
    const source = read("modules/showcase/ui/BrandMark.tsx");
    expect(source).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(source).not.toContain("COLORS");
  });
});
