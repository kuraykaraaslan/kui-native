// modules/ui/TreeView/index.tsx
//
// TreeView, ported from KuiReact's modules/ui/TreeView/index.tsx (M1: core
// nav + selection). `useTreeState` is KuiReact's hook unchanged.
//
// RN adaptations: KuiReact's arrow-key roving focus (useKeyboardNav) is
// hardware-keyboard behaviour and isn't ported. Modifier clicks map to
// touch: in multi-select mode a tap toggles a row (Ctrl/Cmd+click) and a
// long-press selects the range from the last anchor (Shift+click).

import { useMemo, useRef } from "react";
import { Pressable, View } from "react-native";
import { faAngleDoubleDown, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "@/libs/theme";
import { cn } from "@/libs/utils/cn";

import { Text } from "../Text";
import { useTreeState } from "./hooks/useTreeState";
import { TreeNodeRow } from "./parts/Node";
import { DEFAULT_TREE_MESSAGES, type NodeId, type TreeViewMessages, type TreeViewProps } from "./types";

export type { NodeId, TreeNode, TreeViewProps, SelectionMode, TreeViewMessages } from "./types";

export function TreeView({
  nodes,
  selectedId,
  selectedIds,
  expandedIds,
  defaultExpandedIds,
  focusId: initialFocusId,
  selectionMode = "single",
  onSelect,
  onSelectionChange,
  onExpand,
  onActivate,
  label,
  className,
  hideToolbar = false,
  messages,
}: TreeViewProps) {
  const t = useThemeTokens();
  const msgs: TreeViewMessages = useMemo(() => ({ ...DEFAULT_TREE_MESSAGES, ...messages }), [messages]);
  const anchorRef = useRef<NodeId | null>(null);

  const state = useTreeState({
    nodes,
    selectionMode,
    selectedIds,
    selectedId,
    expandedIds,
    defaultExpandedIds,
    initialFocusId,
    onSelectionChange,
    onSelect,
    onExpand,
  });
  const { visibleRows, selected, toggleExpanded, expandAll, collapseAll, selectSingle, toggleSelection, selectRange, setFocusId } = state;

  function handleActivate(id: NodeId) {
    const row = state.findRow(id);
    if (!row) return;
    setFocusId(id);
    if (selectionMode === "multi") {
      if (row.hasChildren) toggleExpanded(id);
      toggleSelection(id);
      anchorRef.current = id;
      return;
    }
    // KuiReact's plain click: a parent toggles (and still selects), a leaf selects.
    if (row.hasChildren) toggleExpanded(id);
    selectSingle(id);
    anchorRef.current = id;
    onActivate?.(id);
  }

  function handleLongPress(id: NodeId) {
    if (selectionMode === "multi") selectRange(anchorRef.current ?? id, id);
    else onActivate?.(id);
  }

  const showToolbar = !hideToolbar && visibleRows.some((r) => r.hasChildren);
  const toolbarButton = (text: string, icon: typeof faAngleDoubleDown, onPress: () => void) => (
    <Pressable accessibilityRole="button" onPress={onPress} className="flex-row items-center gap-1 rounded-md px-2 py-1 active:bg-surface-overlay">
      <FontAwesomeIcon icon={icon} size={12} color={t["text-secondary"]} />
      <Text className="text-xs text-text-secondary">{text}</Text>
    </Pressable>
  );

  return (
    <View className={cn("flex-col gap-1", className)}>
      {showToolbar ? (
        <View className="flex-row items-center gap-1 px-1 pb-1">
          {toolbarButton(msgs.expandAll, faAngleDoubleDown, expandAll)}
          {toolbarButton(msgs.collapseAll, faAngleDoubleUp, collapseAll)}
        </View>
      ) : null}

      <View role="list" aria-label={label ?? msgs.tree} className="gap-0.5">
        {visibleRows.map((row) => (
          <TreeNodeRow
            key={row.node.id}
            row={row}
            isSelected={selected.has(row.node.id)}
            onActivate={handleActivate}
            onLongPress={handleLongPress}
            onToggle={toggleExpanded}
          />
        ))}
      </View>
    </View>
  );
}
