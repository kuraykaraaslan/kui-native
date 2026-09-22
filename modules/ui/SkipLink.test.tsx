import { render, screen } from "@testing-library/react-native";
import { AccessibilityInfo, Platform } from "react-native";

import { Announcer, LiveRegion, SkipLink } from "./SkipLink";

describe("LiveRegion", () => {
  let announce: jest.SpyInstance;
  let announceWithOptions: jest.SpyInstance;
  beforeEach(() => {
    announce = jest.spyOn(AccessibilityInfo, "announceForAccessibility").mockImplementation(() => {});
    announceWithOptions = jest.spyOn(AccessibilityInfo, "announceForAccessibilityWithOptions").mockImplementation(() => {});
    // jest-expo's AccessibilityInfo methods are already mocks, so spyOn reuses them.
    announce.mockClear();
    announceWithOptions.mockClear();
  });
  afterEach(() => jest.restoreAllMocks());

  it("announces each new message once", async () => {
    const r = await render(<LiveRegion message="3 results" />);
    expect(announce).toHaveBeenCalledWith("3 results");
    await r.rerender(<LiveRegion message="3 results" />);
    expect(announce).toHaveBeenCalledTimes(1);
    await r.rerender(<LiveRegion message="5 results" />);
    expect(announce).toHaveBeenLastCalledWith("5 results");
  });

  it("assertive messages interrupt the queue", async () => {
    await render(<LiveRegion message="Saved" politeness="assertive" />);
    expect(announceWithOptions).toHaveBeenCalledWith("Saved", { queue: false });
  });

  it("exposes a visually hidden live region with the message", async () => {
    await render(<Announcer message="Upload complete" />);
    const region = screen.getByTestId("live-region");
    expect(region.props.accessibilityLiveRegion).toBe("polite");
    expect(screen.getByText("Upload complete")).toBeTruthy();
  });

  it("stays silent without a message", async () => {
    await render(<LiveRegion />);
    expect(announce).not.toHaveBeenCalled();
  });
});

describe("SkipLink", () => {
  it("renders nothing on native (no skip-navigation concept)", async () => {
    const { toJSON } = await render(<SkipLink />);
    expect(toJSON()).toBeNull();
  });

  it("renders the anchor on the web", async () => {
    const original = Platform.OS;
    Object.defineProperty(Platform, "OS", { value: "web", configurable: true });
    try {
      await render(<SkipLink label="Skip to content" />);
      const link = screen.getByTestId("skip-link");
      expect(link.props.href).toBe("#main-content");
      expect(screen.getByText("Skip to content")).toBeTruthy();
    } finally {
      Object.defineProperty(Platform, "OS", { value: original, configurable: true });
    }
  });
});
