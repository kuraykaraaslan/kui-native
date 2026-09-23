import fs from "node:fs";
import path from "node:path";

import { REGISTRY } from "../registry";
import { NAV_GROUPS, PAGES, SOURCES } from "./showcase.generated";

// The registry imports every demo; stub the native-only modules they pull in.
jest.mock("expo-router", () => ({ router: {} }));
jest.mock("react-native-maps", () => ({ __esModule: true, default: () => null, Marker: () => null, Polygon: () => null, Polyline: () => null, UrlTile: () => null }));
jest.mock("expo-video", () => ({ useVideoPlayer: () => ({}), VideoView: () => null }));

const ROOT = path.resolve(__dirname, "../../..");

describe("showcase.generated (KuiReact parity contract)", () => {
  it("has a native demo entry for every navigation item, and nothing extra", () => {
    const navIds = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id)).sort();
    expect(REGISTRY.map((e) => e.id).sort()).toEqual(navIds);
    expect(Object.keys(PAGES).sort()).toEqual(navIds);
  });

  it.each(Object.keys(PAGES))("%s: native demos match KuiReact's variant titles", (id) => {
    const demos = REGISTRY.find((e) => e.id === id)!.variants.map((v) => v.title);
    expect(demos).toEqual(PAGES[id].variants.map((v) => v.title));
  });

  // The Source block shows each component's file; re-run `npm run showcase:sync` after editing one.
  it.each(Object.keys(SOURCES))("%s: Source block is current", (file) => {
    expect(SOURCES[file]).toBe(fs.readFileSync(path.join(ROOT, file), "utf8"));
  });
});
