// useLoadMore — scroll-position load-more for ComboBox + MultiSelect lists.
// KuiReact observes a sentinel <li> with IntersectionObserver (40px
// rootMargin); RN has no IntersectionObserver, so the list's onScroll
// reports when the viewport is within 40px of the end instead. Fires
// onLoadMore once per approach while not already loading. Errors are
// swallowed silently, as in KuiReact.

import { useCallback, useRef, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import type { ComboBoxOption, LoadMoreFn } from "../types";

const THRESHOLD = 40;

export function useLoadMore(open: boolean, onLoadMore: LoadMoreFn | undefined, onAppend: (next: ComboBoxOption[]) => void) {
  const [loadingMore, setLoadingMore] = useState(false);
  const inFlightRef = useRef(false);

  const loadMore = useCallback(() => {
    if (!open || !onLoadMore || inFlightRef.current) return;
    inFlightRef.current = true;
    setLoadingMore(true);
    Promise.resolve(onLoadMore())
      .then((next) => {
        if (next && next.length > 0) onAppend(next);
      })
      .catch(() => {
        /* swallow — see header */
      })
      .finally(() => {
        inFlightRef.current = false;
        setLoadingMore(false);
      });
  }, [open, onLoadMore, onAppend]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
      if (layoutMeasurement.height + contentOffset.y >= contentSize.height - THRESHOLD) loadMore();
    },
    [loadMore],
  );

  return { loadingMore, onScroll, loadMore };
}
