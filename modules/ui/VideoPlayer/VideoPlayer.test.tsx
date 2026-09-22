import { fireEvent, render, screen } from "@testing-library/react-native";

import { decodeDataUri } from "./hooks/useVttCues";
import { cueAt, formatTime, parseVtt, VideoPlayer } from "./index";

// expo-video is native; a fake player records what the controls ask of it.
type FakePlayer = { playing: boolean; muted: boolean; volume: number; playbackRate: number; currentTime: number; duration: number; status: string; loop: boolean; timeUpdateEventInterval: number; play: jest.Mock; pause: jest.Mock; seekBy: jest.Mock };
const fake: { player: FakePlayer } = { player: null as unknown as FakePlayer };
jest.mock("expo-video", () => {
  const React = jest.requireActual("react");
  const { View } = jest.requireActual("react-native");
  return {
    useVideoPlayer: (_src: unknown, setup?: (p: unknown) => void) => {
      const ref = React.useRef(null);
      if (!ref.current) {
        ref.current = fake.player = { playing: false, muted: false, volume: 1, playbackRate: 1, currentTime: 0, duration: 120, status: "readyToPlay", loop: false, timeUpdateEventInterval: 1, play: jest.fn(), pause: jest.fn(), seekBy: jest.fn() };
        setup?.(ref.current);
      }
      return ref.current;
    },
    VideoView: React.forwardRef((props: Record<string, unknown>, _ref: unknown) => React.createElement(View, props)),
  };
});
jest.mock("expo", () => ({ useEvent: (_p: unknown, _name: string, initial: unknown) => initial }));

describe("VideoPlayer helpers", () => {
  it("formats times like KuiReact", () => {
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(75)).toBe("1:15");
    expect(formatTime(3725)).toBe("1:02:05");
    expect(formatTime(NaN)).toBe("0:00");
  });

  it("parses WebVTT cues and finds the active one", () => {
    const cues = parseVtt("WEBVTT\n\n00:00:01.000 --> 00:00:03.000\n<b>Hello</b> there\n\n00:00:04.000 --> 00:00:06.500 align:start\nSecond line\n");
    expect(cues).toEqual([
      { start: 1, end: 3, text: "Hello there" },
      { start: 4, end: 6.5, text: "Second line" },
    ]);
    expect(cueAt(cues, 2)).toBe("Hello there");
    expect(cueAt(cues, 3.5)).toBeNull();
  });

  it("decodes data: URIs (the RN stand-in for KuiReact's Blob URLs)", () => {
    const content = "WEBVTT\n\nçğ";
    expect(decodeDataUri(`data:text/vtt,${encodeURIComponent(content)}`)).toBe(content);
    expect(decodeDataUri("data:text/vtt;base64,V0VCVlRU")).toBe("WEBVTT");
  });
});

describe("VideoPlayer", () => {
  it("applies autoPlay / loop / startMuted to the player and shows the title", async () => {
    await render(<VideoPlayer src="https://example.com/v.mp4" title="Big Buck Bunny" autoPlay loop startMuted />);
    expect(fake.player.play).toHaveBeenCalled();
    expect(fake.player.loop).toBe(true);
    expect(fake.player.muted).toBe(true);
    expect(screen.getByText("Big Buck Bunny")).toBeTruthy();
    expect(screen.getByLabelText("Video: Big Buck Bunny")).toBeTruthy();
  });

  it("transport buttons drive the player", async () => {
    await render(<VideoPlayer src="https://example.com/v.mp4" />);
    await fireEvent.press(screen.getAllByRole("button", { name: "Play" }).at(-1)!);
    expect(fake.player.play).toHaveBeenCalled();
    await fireEvent.press(screen.getByRole("button", { name: "Forward 10 seconds" }));
    expect(fake.player.seekBy).toHaveBeenCalledWith(10);
    await fireEvent.press(screen.getByRole("button", { name: "Rewind 10 seconds" }));
    expect(fake.player.seekBy).toHaveBeenCalledWith(-10);
    await fireEvent.press(screen.getByRole("button", { name: "Mute" }));
    expect(fake.player.muted).toBe(true);
    expect(screen.getByRole("button", { name: "Unmute" })).toBeTruthy();
  });

  it("shows the duration and seeks via the seek bar's accessibility actions", async () => {
    await render(<VideoPlayer src="https://example.com/v.mp4" />);
    expect(screen.getByText(/0:00 \/ 2:00/)).toBeTruthy();
    await fireEvent(screen.getByTestId("video-seek"), "accessibilityAction", { nativeEvent: { actionName: "increment" } });
    expect(fake.player.currentTime).toBeCloseTo(6);
  });

  it("settings: speed sets the playback rate; quality and audio report changes", async () => {
    const onQualityChange = jest.fn();
    const onAudioTrackChange = jest.fn();
    await render(
      <VideoPlayer
        src="https://example.com/v.mp4"
        qualities={[{ label: "1080p", value: "1080" }, { label: "720p", value: "720" }]}
        audioTracks={[{ label: "Türkçe", language: "tr" }, { label: "English", language: "en" }]}
        onQualityChange={onQualityChange}
        onAudioTrackChange={onAudioTrackChange}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByText("Ayarlar")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Oynatma Hızı, Normal" }));
    await fireEvent.press(screen.getByRole("button", { name: "1.5×" }));
    expect(fake.player.playbackRate).toBe(1.5);
    expect(screen.queryByTestId("video-settings")).toBeNull();

    await fireEvent.press(screen.getByRole("button", { name: "Settings" }));
    await fireEvent.press(screen.getByRole("button", { name: "Kalite, 1080p" }));
    await fireEvent.press(screen.getByRole("button", { name: "720p" }));
    expect(onQualityChange).toHaveBeenCalledWith("720");

    await fireEvent.press(screen.getByRole("button", { name: "Settings" }));
    await fireEvent.press(screen.getByRole("button", { name: "Ses Dili, Türkçe" }));
    await fireEvent.press(screen.getByRole("button", { name: "English" }));
    expect(onAudioTrackChange).toHaveBeenCalledWith(1);
  });

  it("settings sub-menus have a back button", async () => {
    await render(<VideoPlayer src="https://example.com/v.mp4" subtitles={[{ label: "Türkçe", src: "https://example.com/tr.vtt" }]} />);
    await fireEvent.press(screen.getByRole("button", { name: "Settings" }));
    await fireEvent.press(screen.getByRole("button", { name: "Altyazı Boyutu, Orta" }));
    expect(screen.getByRole("button", { name: "Çok Büyük" })).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Back, Altyazı Boyutu" }));
    expect(screen.getByText("Ayarlar")).toBeTruthy();
  });

  it("controlsVisible={false} hides the overlay", async () => {
    await render(<VideoPlayer src="https://example.com/v.mp4" controlsVisible={false} />);
    expect(screen.queryByRole("button", { name: "Settings" })).toBeNull();
  });

  it("long-press on the volume button reveals the volume slider", async () => {
    await render(<VideoPlayer src="https://example.com/v.mp4" />);
    expect(screen.queryByTestId("volume-slider")).toBeNull();
    await fireEvent(screen.getByRole("button", { name: "Mute" }), "longPress");
    expect(screen.getByTestId("volume-slider")).toBeTruthy();
  });
});
