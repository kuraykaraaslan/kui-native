import { useState } from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

type PaginationSize = "sm" | "md" | "lg";

// KuiReact's sizeMap, split into the pressable box and its label.
const sizeMap: Record<PaginationSize, { page: string; nav: string; text: string }> = {
  sm: { page: "w-7 h-7", nav: "px-2 py-1", text: "text-xs" },
  md: { page: "w-9 h-9", nav: "px-3 py-1.5", text: "text-sm" },
  lg: { page: "w-10 h-10", nav: "px-4 py-2", text: "text-base" },
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: PaginationSize;
  showFirstLast?: boolean;
  showJumpTo?: boolean;
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Pagination (modules/ui/Pagination.tsx):
 * ‹ › (and optional « ») nav buttons around the page numbers, collapsed to
 * first / last / current ±1 with ellipses. The current page is `bg-primary
 * text-primary-fg border-primary`. `showJumpTo` adds KuiReact's "Go to"
 * field; the keyboard's submit key works like its form submit. Hover
 * backgrounds become the pressed state.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  size = "md",
  showFirstLast = false,
  showJumpTo = false,
  className,
}: PaginationProps) {
  const t = useThemeTokens();
  const [jumpValue, setJumpValue] = useState("");
  const s = sizeMap[size];

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);
  const withEllipsis: (number | "ellipsis")[] = [];
  let prev: number | null = null;
  for (const p of visiblePages) {
    if (prev !== null && p - prev > 1) withEllipsis.push("ellipsis");
    withEllipsis.push(p);
    prev = p;
  }

  function handleJump() {
    const n = parseInt(jumpValue, 10);
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      onPageChange(n);
      setJumpValue("");
    }
  }

  function navButton(label: string, glyph: string, target: number, disabled: boolean) {
    return (
      <Pressable
        key={label}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={() => onPageChange(target)}
        className={cn(
          "items-center justify-center rounded-md border border-border",
          s.nav,
          disabled ? "opacity-50" : "active:bg-surface-overlay",
        )}
      >
        <Text className={cn("font-medium", s.text, disabled ? "text-text-disabled" : "text-text-secondary")}>{glyph}</Text>
      </Pressable>
    );
  }

  return (
    <View
      role="navigation"
      aria-label="Pagination"
      className={cn("flex-row flex-wrap items-center gap-1", className)}
    >
      {showFirstLast ? navButton("First page", "«", 1, page <= 1) : null}
      {navButton("Previous page", "‹", page - 1, page <= 1)}

      {withEllipsis.map((item, i) =>
        item === "ellipsis" ? (
          <View key={`e-${i}`} className={s.nav}>
            <Text className={cn("text-text-disabled", s.text)}>…</Text>
          </View>
        ) : (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityLabel={`Page ${item}`}
            accessibilityState={{ selected: item === page }}
            aria-current={item === page ? "page" : undefined}
            onPress={() => onPageChange(item)}
            className={cn(
              "items-center justify-center rounded-md border",
              s.page,
              item === page ? "border-primary bg-primary" : "border-border active:bg-surface-overlay",
            )}
          >
            <Text className={cn("font-medium", s.text, item === page ? "text-primary-fg" : "text-text-secondary")}>{item}</Text>
          </Pressable>
        ),
      )}

      {navButton("Next page", "›", page + 1, page >= totalPages)}
      {showFirstLast ? navButton("Last page", "»", totalPages, page >= totalPages) : null}

      {showJumpTo ? (
        <View className="ml-2 flex-row items-center gap-1.5">
          <Text className="text-xs text-text-secondary">Go to</Text>
          <RNTextInput
            testID="pagination-jump"
            keyboardType="number-pad"
            returnKeyType="go"
            value={jumpValue}
            onChangeText={setJumpValue}
            onSubmitEditing={handleJump}
            accessibilityLabel={`Jump to page, 1–${totalPages}`}
            placeholderTextColor={t["text-disabled"]}
            className="w-14 rounded-md border border-border bg-surface-base px-1 py-1 text-center text-sm text-text-primary"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go"
            onPress={handleJump}
            className="rounded-md border border-border px-2 py-1 active:bg-surface-overlay"
          >
            <Text className="text-sm font-medium text-text-secondary">Go</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
