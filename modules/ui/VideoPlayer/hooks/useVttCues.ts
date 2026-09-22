// RN replacement for KuiReact's useSubtitleCues: the browser parses
// <track> WebVTT files and fires `cuechange`; RN has no text tracks, so the
// selected .vtt file is fetched (or decoded, for `data:` URIs — KuiReact's
// demos build Blob URLs, which RN can't load), parsed, and the cue text for the current
// playback time is derived here. Tags are stripped, as in KuiReact.

import { useEffect, useMemo, useState } from "react";

import type { SubtitleTrack } from "../types";

export type Cue = { start: number; end: number; text: string };

function toSeconds(ts: string): number {
  const parts = ts.trim().replace(",", ".").split(":").map(Number);
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

/** Minimal WebVTT parser: `start --> end` lines followed by cue text. */
export function parseVtt(text: string): Cue[] {
  const cues: Cue[] = [];
  const blocks = text.replace(/\r/g, "").split(/\n\n+/);
  for (const block of blocks) {
    const lines = block.split("\n");
    const i = lines.findIndex((l) => l.includes("-->"));
    if (i === -1) continue;
    const [start, end] = lines[i].split("-->").map((s) => s.trim().split(/\s+/)[0]);
    const body = lines
      .slice(i + 1)
      .join("\n")
      .replace(/<[^>]+>/g, "")
      .trim();
    if (body) cues.push({ start: toSeconds(start), end: toSeconds(end), text: body });
  }
  return cues;
}

export function cueAt(cues: Cue[], time: number): string | null {
  const active = cues.filter((c) => time >= c.start && time <= c.end);
  return active.length ? active.map((c) => c.text).join("\n") : null;
}

/** Decode a `data:` URI (URL-encoded or base64) without a network round-trip. */
export function decodeDataUri(uri: string): string {
  const comma = uri.indexOf(",");
  const meta = uri.slice(5, comma);
  const body = uri.slice(comma + 1);
  return meta.endsWith(";base64") ? atob(body) : decodeURIComponent(body);
}

export function useVttCues(subtitles: SubtitleTrack[] | undefined, selected: number | null, currentTime: number): string | null {
  const [cues, setCues] = useState<Cue[]>([]);
  const src = selected !== null ? subtitles?.[selected]?.src : undefined;

  useEffect(() => {
    setCues([]);
    if (!src) return;
    if (src.startsWith("data:")) {
      setCues(parseVtt(decodeDataUri(src)));
      return;
    }
    let alive = true;
    fetch(src)
      .then((r) => r.text())
      .then((t) => {
        if (alive) setCues(parseVtt(t));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);

  return useMemo(() => (src ? cueAt(cues, currentTime) : null), [src, cues, currentTime]);
}
