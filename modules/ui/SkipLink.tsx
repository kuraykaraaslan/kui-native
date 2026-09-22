import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Platform, Text as RNText, View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type SkipLinkProps = {
  /** Anchor of the main content (KuiReact: `#main-content`). */
  href?: string;
  label?: string;
  className?: string;
};

/**
 * KuiReact's SkipLink: a `sr-only` link that appears (`focus:not-sr-only
 * fixed top-4 left-4`, `px-4 py-2 rounded-md bg-primary`) when keyboard
 * focus reaches it and jumps to the main content. On the web
 * (react-native-web) it renders the same anchor. Native apps have no
 * skip-navigation concept — VoiceOver / TalkBack move by headings and
 * landmarks instead — so it renders nothing there.
 */
export function SkipLink({ href = "#main-content", label = "Skip to main content", className }: SkipLinkProps) {
  const [focused, setFocused] = useState(false);
  if (Platform.OS !== "web") return null;
  // react-native-web renders a Text with `href` as an <a>.
  const webProps = { href, onFocus: () => setFocused(true), onBlur: () => setFocused(false) } as Record<string, unknown>;
  return (
    <RNText
      {...webProps}
      testID="skip-link"
      accessibilityRole="link"
      className={cn("rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-fg", className)}
      style={
        focused
          ? { position: "absolute", top: 16, left: 16, zIndex: 100 }
          : { position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0 }
      }
    >
      {label}
    </RNText>
  );
}

export type LiveRegionProps = {
  message?: string;
  politeness?: "polite" | "assertive";
  className?: string;
};

/**
 * KuiReact's LiveRegion (`role="status" aria-live aria-atomic`, visually
 * hidden). On native the message is announced with
 * `AccessibilityInfo.announceForAccessibility` whenever it changes
 * (assertive messages interrupt the queue), and the hidden node also
 * carries Android's `accessibilityLiveRegion`; on the web the same node is
 * a live region.
 */
export function LiveRegion({ message, politeness = "polite", className }: LiveRegionProps) {
  const last = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!message || message === last.current) return;
    last.current = message;
    if (Platform.OS === "web") return; // the live region below speaks on the web
    if (politeness === "assertive" && AccessibilityInfo.announceForAccessibilityWithOptions) {
      AccessibilityInfo.announceForAccessibilityWithOptions(message, { queue: false });
    } else {
      AccessibilityInfo.announceForAccessibility(message);
    }
  }, [message, politeness]);

  return (
    <View
      testID="live-region"
      role="status"
      aria-live={politeness}
      accessibilityLiveRegion={politeness}
      pointerEvents="none"
      className={cn(className)}
      style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0 }}
    >
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}

/** KuiReact's Announcer — a LiveRegion for a single message. */
export function Announcer({ message, politeness = "polite" }: { message: string; politeness?: "polite" | "assertive" }) {
  return <LiveRegion message={message} politeness={politeness} />;
}
