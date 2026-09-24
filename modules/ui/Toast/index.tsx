// Public surface for the Toast suite — mirrors KuiReact's modules/ui/Toast/index.tsx.
//
//   <Toaster>       — root region container (mount once, near the app root)
//   <ToastProvider> — legacy alias kept for back-compat
//   toast()         — imperative API (success/error/warning/info/loading/promise)
//   useToast()      — declarative hook (same API + live queue)
import type * as React from "react";
import { useContext, useEffect, useMemo } from "react";
import { View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

import { cn } from "../../../libs/utils/cn";

import { ToastCard } from "./ToastCard";
import type { ToastApi, ToastItem, ToastMessages, ToastOptions, ToastPosition } from "./types";
import { getEffectiveDuration, useToastStore } from "./useToastStore";

export type {
  ToastAction,
  ToastApi,
  ToastItem,
  ToastItemAction,
  ToastMessages,
  ToastOptions,
  ToastPosition,
  ToastVariant,
} from "./types";
export { getEffectiveDuration, useToastStore } from "./useToastStore";

// ─── Imperative API ─────────────────────────────────────────────────────────

function _add(item: Omit<ToastItem, "id">): string {
  return useToastStore.getState().add(item);
}

function _base(message: string, opts?: ToastOptions): string {
  return _add({ variant: "info", message, ...opts });
}

const _toast = _base as ToastApi;
_toast.success = (message, opts) => _add({ variant: "success", message, ...opts });
_toast.error = (message, opts) => _add({ variant: "error", message, ...opts });
_toast.warning = (message, opts) => _add({ variant: "warning", message, ...opts });
_toast.info = (message, opts) => _add({ variant: "info", message, ...opts });
_toast.loading = (message, opts) => _add({ variant: "loading", message, ...opts });
_toast.update = (id, patch) => useToastStore.getState().update(id, patch);
_toast.dismiss = (id) => useToastStore.getState().remove(id);
_toast.clear = () => useToastStore.getState().clear();
_toast.promise = <T,>(
  promise: Promise<T>,
  messages: { loading: string; success: string | ((data: T) => string); error: string | ((err: unknown) => string) },
  opts?: ToastOptions,
): string => {
  const id = _add({ variant: "loading", message: messages.loading, ...opts });
  promise
    .then((data) =>
      useToastStore.getState().update(id, {
        variant: "success",
        message: typeof messages.success === "function" ? messages.success(data) : messages.success,
        duration: undefined,
      }),
    )
    .catch((err) =>
      useToastStore.getState().update(id, {
        variant: "error",
        message: typeof messages.error === "function" ? messages.error(err) : messages.error,
        duration: undefined,
      }),
    );
  return id;
};

export const toast: ToastApi = _toast;

// ─── Declarative hook ───────────────────────────────────────────────────────

/** The imperative API plus reactive access to the toast queue. */
export function useToast() {
  const toasts = useToastStore((s) => s.toasts);
  const api = useMemo(() => toast, []);
  return { ...api, toasts };
}

// ─── Regions ────────────────────────────────────────────────────────────────

// KuiReact: "fixed top-4 right-4 items-end" etc. Insets add the safe area.
const alignMap: Record<ToastPosition, string> = {
  "top-right": "items-end",
  "top-left": "items-start",
  "top-center": "items-center",
  "bottom-right": "items-end",
  "bottom-left": "items-start",
  "bottom-center": "items-center",
};

function Region({
  position,
  items,
  gap,
  reducedMotion,
  onRemove,
}: {
  position: ToastPosition;
  items: ToastItem[];
  gap: number;
  reducedMotion?: boolean;
  onRemove: (id: string) => void;
}) {
  const insets = useContext(SafeAreaInsetsContext) ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const bottom = position.startsWith("bottom");
  // KuiReact: bottom regions reverse so the newest toast sits nearest the edge.
  const ordered = bottom ? [...items].reverse() : items;
  return (
    <View
      testID={`toast-region-${position}`}
      pointerEvents="box-none"
      className={cn("absolute left-4 right-4", alignMap[position])}
      style={[bottom ? { bottom: 16 + insets.bottom } : { top: 16 + insets.top }, { gap: gap * 4 }]}
    >
      {ordered.map((item) => (
        <ToastCard key={item.id} item={item} reducedMotion={reducedMotion} onRemove={() => onRemove(item.id)} />
      ))}
    </View>
  );
}

export type ToasterProps = {
  /** Default position for toasts that don't specify their own. */
  position?: ToastPosition;
  /** Maximum concurrent toasts (default 5). Older toasts dismiss FIFO. */
  max?: number;
  /** Tailwind gap unit between stacked toasts (default 2 = 8px). */
  gap?: number;
  /** Skip enter/exit animation. */
  reducedMotion?: boolean;
  /** Localisable copy (accepted for parity with KuiReact). */
  messages?: ToastMessages;
};

/**
 * Mount once near the app root, inside the themed root view, as the last
 * child so toasts draw above screen content. Toasts do not draw above an
 * open RN `Modal` (separate native window).
 */
export function Toaster({ position = "top-right", max = 5, gap = 2, reducedMotion = false }: ToasterProps = {}) {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);
  const setMax = useToastStore((s) => s.setMax);

  useEffect(() => {
    setMax(max);
  }, [max, setMax]);

  const buckets = new Map<ToastPosition, ToastItem[]>();
  for (const t of toasts) {
    const pos = t.position ?? position;
    const bucket = buckets.get(pos);
    if (bucket) bucket.push(t);
    else buckets.set(pos, [t]);
  }
  if (!buckets.has(position)) buckets.set(position, []);

  return (
    <View pointerEvents="box-none" className="absolute inset-0">
      {Array.from(buckets.entries()).map(([pos, items]) => (
        <Region key={pos} position={pos} items={items} gap={gap} reducedMotion={reducedMotion} onRemove={remove} />
      ))}
    </View>
  );
}

// ─── Back-compat aliases (as in KuiReact) ───────────────────────────────────

/** @deprecated Use `<Toaster />`. */
export const ToastProvider = Toaster;

/** @deprecated Use `<Toaster />`. Static region shell for hand-rendered cards. */
export function ToastRegion({
  children,
  position = "top-right",
  className,
}: {
  children?: React.ReactNode;
  position?: ToastPosition;
  className?: string;
}) {
  const bottom = position.startsWith("bottom");
  return (
    <View
      pointerEvents="box-none"
      className={cn("absolute left-4 right-4 gap-2", bottom ? "bottom-4" : "top-4", alignMap[position], className)}
    >
      {children}
    </View>
  );
}

/** @deprecated Mount `<Toaster />` and call `toast.success(...)` instead. */
export function Toast({
  variant = "info",
  message,
  duration,
  onDismiss,
  action,
}: {
  variant?: ToastItem["variant"];
  message: string;
  duration?: number;
  onDismiss?: () => void;
  action?: { label: string; onPress: () => void };
}) {
  useEffect(() => {
    useToastStore.getState().add({
      variant,
      message,
      duration,
      actions: action
        ? [
            {
              label: action.label,
              onPress: (d) => {
                action.onPress();
                d();
              },
            },
          ]
        : undefined,
    });
    if (!onDismiss) return;
    const eff = getEffectiveDuration({ variant, duration });
    if (eff === null) return;
    const timer = setTimeout(onDismiss, eff);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
