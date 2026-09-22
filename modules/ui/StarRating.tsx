import type * as React from "react";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

type StarRatingSize = "sm" | "md" | "lg";

// KuiReact: w-3.5 / w-5 / w-7 stars with gap-0.5 / gap-1 / gap-1.5.
const starSize: Record<StarRatingSize, number> = { sm: 14, md: 20, lg: 28 };
const gapClasses: Record<StarRatingSize, string> = { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5" };

const TOTAL_STARS = 5;

export type StarRatingProps = {
  /** Current rating value (0–5, decimals supported when readonly). */
  value: number;
  size?: StarRatingSize;
  /** When true (default) the component is purely presentational; when false, supply `onChange`. */
  readonly?: boolean;
  /** Called with the new (whole-star) value when interactive. */
  onChange?: (value: number) => void;
  /** Accessible label override (default e.g. "4.5 out of 5 stars"). */
  "aria-label"?: string;
  /** Optional caption shown next to the stars (e.g. "(312 reviews)"). */
  caption?: React.ReactNode;
  className?: string;
};

function clampValue(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(TOTAL_STARS, Math.max(0, value));
}

/**
 * Pixel-for-pixel with KuiReact's StarRating: five warning-coloured stars
 * (solid, half, or outlined in text-disabled) with an optional caption.
 * Read-only by default (announced as one image, "4.5 out of 5 stars");
 * with `readonly={false}` + `onChange` it becomes a radio group of whole
 * stars. KuiReact's hover preview is shown while a star is pressed (and on
 * hover with react-native-web).
 */
export function StarRating({ value, size = "md", readonly = true, onChange, "aria-label": ariaLabel, caption, className }: StarRatingProps) {
  const t = useThemeTokens();
  const safeValue = clampValue(value);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const isInteractive = !readonly && typeof onChange === "function";
  const displayValue = isInteractive && hoverValue !== null ? hoverValue : safeValue;
  const px = starSize[size];

  const captionNode = caption ? (
    typeof caption === "string" ? <Text className="ml-2 text-sm text-text-secondary">{caption}</Text> : <View className="ml-2">{caption}</View>
  ) : null;

  if (!isInteractive) {
    return (
      <View
        accessible
        role="img"
        aria-label={ariaLabel ?? `${safeValue.toFixed(1)} out of ${TOTAL_STARS} stars`}
        className={cn("flex-row items-center self-start", gapClasses[size], className)}
      >
        {Array.from({ length: TOTAL_STARS }, (_, i) => {
          const starIndex = i + 1;
          const filled = displayValue >= starIndex;
          const half = !filled && displayValue >= starIndex - 0.5;
          return (
            <View key={starIndex} testID={filled ? "star-full" : half ? "star-half" : "star-empty"}>
              <FontAwesomeIcon icon={filled ? faStar : half ? faStarHalfStroke : faStarRegular} size={px} color={filled || half ? t.warning : t["text-disabled"]} />
            </View>
          );
        })}
        {captionNode}
      </View>
    );
  }

  return (
    <View role="radiogroup" aria-label={ariaLabel ?? "Rating"} className={cn("flex-row items-center self-start", gapClasses[size], className)}>
      {Array.from({ length: TOTAL_STARS }, (_, i) => {
        const starIndex = i + 1;
        const filled = displayValue >= starIndex;
        return (
          <Pressable
            key={starIndex}
            role="radio"
            accessibilityState={{ checked: safeValue === starIndex }}
            accessibilityLabel={`${starIndex} ${starIndex === 1 ? "star" : "stars"}`}
            onPress={() => onChange?.(starIndex)}
            onPressIn={() => setHoverValue(starIndex)}
            onPressOut={() => setHoverValue(null)}
            onHoverIn={() => setHoverValue(starIndex)}
            onHoverOut={() => setHoverValue(null)}
            className="rounded-sm p-0.5"
          >
            <FontAwesomeIcon icon={filled ? faStar : faStarRegular} size={px} color={filled ? t.warning : t["text-disabled"]} />
          </Pressable>
        );
      })}
      {captionNode}
    </View>
  );
}
