import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, Animated, PanResponder, Pressable, View, type LayoutChangeEvent } from "react-native";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { cn } from "../../libs/utils/cn";

export type Slide = React.ReactNode | { id: string; content: React.ReactNode };

export type SliderProps = {
  /** Slides to render. Plain nodes (key auto) or objects with explicit id. */
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  /** Minimum horizontal travel (px) that counts as a swipe; shorter drags snap back. Default 50. */
  dragThreshold?: number;
  className?: string;
  slideClassName?: string;
  ariaLabel?: string;
};

const TRANSITION_MS = 350;
/** Each 0.5 px/ms of release velocity adds one extra slide to the step. */
const VELOCITY_PER_EXTRA_SLIDE = 0.5;
/** Drag dampening past the first/last slide when `loop` is false. */
const EDGE_RESISTANCE = 0.4;

/**
 * KuiReact's release logic (Slider/hooks/useDrag.ts): past `dragThreshold`
 * move one slide; every 0.5 px/ms of flick velocity adds another slide in
 * the flick direction; a strong enough flick alone also moves. Returns the
 * signed number of slides to move (positive = next).
 */
export function releaseStep(totalDelta: number, velocity: number, dragThreshold: number): number {
  const distance = Math.abs(totalDelta);
  if (distance < dragThreshold && Math.abs(velocity) < VELOCITY_PER_EXTRA_SLIDE) return 0;
  const direction = totalDelta < 0 ? 1 : -1;
  const step = distance >= dragThreshold ? 1 : 0;
  const flickDir = velocity < 0 ? 1 : -1;
  const flickStep = Math.floor(Math.abs(velocity) / VELOCITY_PER_EXTRA_SLIDE);
  if (flickStep > 0 && flickDir === direction) return direction * (step + flickStep);
  if (flickStep > 0 && step === 0) return flickDir * flickStep;
  return direction * step;
}

const isSlideObject = (s: Slide): s is { id: string; content: React.ReactNode } =>
  s !== null && typeof s === "object" && "content" in (s as object);

/**
 * Pixel-for-pixel with KuiReact's Slider (carousel): a `rounded-xl
 * overflow-hidden` track that swipes between full-width slides (350ms snap,
 * velocity momentum, ×0.4 edge resistance without `loop`), round
 * `bg-black/40` arrow buttons and a white dot strip whose active dot widens
 * to `w-5`. Only horizontal-dominant drags are claimed, so vertical page
 * scrolls pass through (KuiReact: `touch-pan-y`). Autoplay skips ticks while
 * dragging.
 */
export function Slider({
  slides,
  autoPlay = false,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  loop = true,
  dragThreshold = 50,
  className,
  slideClassName,
  ariaLabel = "Content slider",
}: SliderProps) {
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(0);
  const x = useRef(new Animated.Value(0)).current;
  const dragging = useRef(false);
  const transitioning = useRef(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then((v) => {
        reduceMotion.current = v;
      })
      .catch(() => {});
  }, []);

  // Snap the track to the current slide whenever it (or the width) changes.
  useEffect(() => {
    const to = -current * width;
    if (reduceMotion.current || width === 0) {
      x.setValue(to);
      return;
    }
    Animated.timing(x, { toValue: to, duration: TRANSITION_MS, useNativeDriver: true }).start();
  }, [current, width, x]);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning.current || total === 0) return;
      const target = loop ? ((index % total) + total) % total : Math.max(0, Math.min(index, total - 1));
      if (target === current) {
        // Snap back from a partial drag.
        Animated.timing(x, { toValue: -current * width, duration: TRANSITION_MS, useNativeDriver: true }).start();
        return;
      }
      transitioning.current = true;
      setCurrent(target);
      setTimeout(() => {
        transitioning.current = false;
      }, TRANSITION_MS);
    },
    [current, loop, total, width, x],
  );

  // The responder is created once; the latest values are read through a ref.
  const latest = useRef({ current, total, loop, width, dragThreshold, goTo });
  latest.current = { current, total, loop, width, dragThreshold, goTo };

  const pan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => latest.current.total > 1 && Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          dragging.current = true;
        },
        onPanResponderMove: (_, g) => {
          const { current: cur, total: n, loop: lp, width: w } = latest.current;
          let delta = g.dx;
          if (!lp && ((cur === 0 && delta > 0) || (cur === n - 1 && delta < 0))) delta *= EDGE_RESISTANCE;
          x.setValue(-cur * w + delta);
        },
        onPanResponderRelease: (_, g) => {
          dragging.current = false;
          const { current: cur, dragThreshold: th, goTo: go } = latest.current;
          go(cur + releaseStep(g.dx, g.vx, th));
        },
        onPanResponderTerminate: () => {
          dragging.current = false;
          latest.current.goTo(latest.current.current);
        },
      }),
    [x],
  );

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const id = setInterval(() => {
      if (dragging.current) return;
      setCurrent((c) => (c + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, total]);

  if (total === 0) return null;

  const canPrev = loop || current > 0;
  const canNext = loop || current < total - 1;

  return (
    <View
      role="region"
      aria-label={ariaLabel}
      className={cn("relative overflow-hidden rounded-xl", className)}
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        {...pan.panHandlers}
        testID="slider-track"
        // Inline, not `flex-row`: NativeWind classes don't reach an Animated.View.
        style={{ flexDirection: "row", transform: [{ translateX: x }] }}
      >
        {slides.map((slide, i) => {
          const active = i === current;
          return (
            <View
              key={isSlideObject(slide) ? slide.id : i}
              accessibilityLabel={`Slide ${i + 1} of ${total}`}
              accessibilityElementsHidden={!active}
              importantForAccessibility={active ? "auto" : "no-hide-descendants"}
              className={cn("shrink-0", slideClassName)}
              style={{ width: width || undefined }}
            >
              {isSlideObject(slide) ? slide.content : slide}
            </View>
          );
        })}
      </Animated.View>

      {showArrows && total > 1 ? (
        <>
          {canPrev ? (
            <Pressable
              onPress={() => goTo(current - 1)}
              accessibilityRole="button"
              accessibilityLabel="Previous slide"
              className="absolute left-3 top-1/2 z-10 -mt-[18px] h-9 w-9 items-center justify-center rounded-full"
              style={({ pressed }) => ({ backgroundColor: pressed ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)" })}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={12} color="#ffffff" />
            </Pressable>
          ) : null}
          {canNext ? (
            <Pressable
              onPress={() => goTo(current + 1)}
              accessibilityRole="button"
              accessibilityLabel="Next slide"
              className="absolute right-3 top-1/2 z-10 -mt-[18px] h-9 w-9 items-center justify-center rounded-full"
              style={({ pressed }) => ({ backgroundColor: pressed ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)" })}
            >
              <FontAwesomeIcon icon={faChevronRight} size={12} color="#ffffff" />
            </Pressable>
          ) : null}
        </>
      ) : null}

      {showDots && total > 1 ? (
        <View role="tablist" aria-label="Slide indicators" className="absolute bottom-3 left-0 right-0 z-10 flex-row justify-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <Pressable
              key={i}
              role="tab"
              accessibilityLabel={`Go to slide ${i + 1}`}
              accessibilityState={{ selected: i === current }}
              onPress={() => goTo(i)}
              hitSlop={6}
              className={cn("h-2 rounded-full", i === current ? "w-5 bg-white" : "w-2")}
              style={i === current ? undefined : ({ pressed }) => ({ backgroundColor: pressed ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" })}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
