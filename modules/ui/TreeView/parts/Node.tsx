// modules/ui/TreeView/parts/Node.tsx
//
// Single tree row (KuiReact: modules/ui/TreeView/parts/Node.tsx). Renders
// the chevron / leaf spacer + label and forwards press intents to the
// parent. Stateless — all state lives in `useTreeState`.

import { Pressable, View } from "react-native";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "../../Text";
import type { NodeId, VisibleRow } from "../types";

// KuiReact indents by `depth * 1.25rem`.
const INDENT = 20;

export type TreeNodeRowProps = {
  row: VisibleRow;
  isSelected: boolean;
  onActivate: (id: NodeId) => void;
  onLongPress: (id: NodeId) => void;
  onToggle: (id: NodeId) => void;
};

export function TreeNodeRow({ row, isSelected, onActivate, onLongPress, onToggle }: TreeNodeRowProps) {
  const t = useThemeTokens();
  const { node, depth, hasChildren, expanded, level, posInSet, setSize } = row;

  return (
    <Pressable
      testID={`tree-node-${node.id}`}
      accessibilityRole="button"
      accessibilityLabel={node.label}
      accessibilityHint={`Level ${level}, ${posInSet} of ${setSize}`}
      accessibilityState={{ selected: isSelected, expanded: hasChildren ? expanded : undefined }}
      onPress={() => onActivate(node.id)}
      onLongPress={() => onLongPress(node.id)}
      style={{ paddingLeft: 8 + depth * INDENT }}
      className={cn("flex-row items-center gap-1.5 rounded-md py-1.5 pr-2 active:bg-surface-overlay", isSelected && "bg-primary-subtle")}
    >
      {hasChildren ? (
        <Pressable
          testID={`tree-chevron-${node.id}`}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          hitSlop={8}
          // Chevron only toggles expand — never selects.
          onPress={() => onToggle(node.id)}
          className="w-3 shrink-0 items-center justify-center"
        >
          <FontAwesomeIcon icon={expanded ? faChevronDown : faChevronRight} size={10} color={t["text-disabled"]} />
        </Pressable>
      ) : (
        <View className="w-3 shrink-0" />
      )}
      <Text className={cn("text-sm", isSelected ? "font-medium text-primary" : "text-text-primary")}>{node.label}</Text>
    </Pressable>
  );
}
