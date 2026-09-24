import { View } from "react-native";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Text } from "./Text";

type StepState = "complete" | "active" | "error" | "pending";

export type StepItem = {
  label: string;
  description?: string;
  state?: StepState;
};

// KuiReact's stateStyles (modules/ui/Stepper.tsx); the circle is split into
// its box and its number/icon colour.
const stateStyles: Record<StepState, { circle: string; circleText: string; icon: string; text: string; line: string }> = {
  complete: { circle: "bg-success border-success", circleText: "text-text-inverse", icon: "text-inverse", text: "text-text-primary", line: "bg-success" },
  active: { circle: "bg-primary border-primary", circleText: "text-primary-fg", icon: "primary-fg", text: "text-text-primary font-semibold", line: "bg-border" },
  error: { circle: "bg-error border-error", circleText: "text-text-inverse", icon: "text-inverse", text: "text-error-fg", line: "bg-border" },
  pending: { circle: "bg-surface-base border-border", circleText: "text-text-disabled", icon: "text-disabled", text: "text-text-disabled", line: "bg-border" },
};

function StepCircle({ state, index, label }: { state: StepState; index: number; label: string }) {
  const t = useThemeTokens();
  const s = stateStyles[state];
  return (
    <View
      accessible
      accessibilityLabel={`Step ${index + 1}: ${label} — ${state}`}
      className={cn("h-8 w-8 shrink-0 items-center justify-center rounded-full border-2", s.circle)}
    >
      {state === "complete" || state === "error" ? (
        <FontAwesomeIcon icon={state === "complete" ? faCheck : faXmark} size={14} color={t[s.icon]} />
      ) : (
        <Text className={cn("text-xs font-bold", s.circleText)}>{index + 1}</Text>
      )}
    </View>
  );
}

export type StepperProps = {
  steps: StepItem[];
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/**
 * Pixel-for-pixel with KuiReact's Stepper: 32px `border-2` circles
 * (complete = success + check, active = primary, error = error + ×,
 * pending = outlined number) joined by 2px connectors. A connector turns
 * green after a completed step. Horizontal puts labels under the circles;
 * vertical puts them beside the circles with a `min-h-[2rem]` rail.
 */
export function Stepper({ steps, orientation = "horizontal", className }: StepperProps) {
  if (orientation === "vertical") {
    return (
      <View role="list" className={cn("flex-col gap-0", className)}>
        {steps.map((step, i) => {
          const state: StepState = step.state ?? "pending";
          const s = stateStyles[state];
          const isLast = i === steps.length - 1;
          return (
            <View key={i} role="listitem" className="flex-row items-stretch gap-3">
              <View className="shrink-0 items-center">
                <StepCircle state={state} index={i} label={step.label} />
                {!isLast ? <View className={cn("mt-1 min-h-8 w-0.5 flex-1", s.line)} /> : null}
              </View>
              <View className={cn("flex-1 pb-6", isLast && "pb-0")}>
                <Text className={cn("text-sm", s.text)}>{step.label}</Text>
                {step.description ? <Text className="mt-0.5 text-xs text-text-secondary">{step.description}</Text> : null}
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View role="list" className={cn("flex-row items-center", className)}>
      {steps.map((step, i) => {
        const state: StepState = step.state ?? "pending";
        const s = stateStyles[state];
        const isLast = i === steps.length - 1;
        return (
          <View key={i} role="listitem" className={cn("flex-row items-center", !isLast && "flex-1")}>
            <View className="shrink-0 items-center gap-1">
              <StepCircle state={state} index={i} label={step.label} />
              <View className="items-center">
                <Text numberOfLines={1} className={cn("text-center text-xs", s.text)}>
                  {step.label}
                </Text>
                {step.description ? <Text className="text-center text-xs text-text-secondary">{step.description}</Text> : null}
              </View>
            </View>
            {/* KuiReact: "h-0.5 flex-1 mx-2 mt-[-1.25rem]" (-1.25rem = -mt-5). */}
            {!isLast ? <View testID="stepper-connector" className={cn("mx-2 -mt-5 h-0.5 flex-1", s.line)} /> : null}
          </View>
        );
      })}
    </View>
  );
}
