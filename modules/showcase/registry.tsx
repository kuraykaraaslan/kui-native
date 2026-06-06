import { useState, type ComponentType } from "react";
import { View } from "react-native";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Checkbox,
  EmptyState,
  Modal,
  SkeletonCard,
  Spinner,
  Switch,
  Text,
  TextInput,
} from "@/modules/ui";

export type ShowcaseEntry = {
  id: string;
  title: string;
  category: "Atoms" | "Forms" | "Feedback" | "Overlays";
  variants: { title: string; Demo: ComponentType }[];
};

/* Stateful demos (need hooks → real components, not inline render fns). */
function CheckboxDemo() {
  const [checked, setChecked] = useState(true);
  return <Checkbox checked={checked} onChange={setChecked} label="Accept terms" />;
}
function SwitchDemo() {
  const [on, setOn] = useState(false);
  return <Switch value={on} onValueChange={setOn} label="Notifications" />;
}
function TextInputDemo() {
  const [value, setValue] = useState("");
  return (
    <TextInput
      label="Email"
      hint="We never share it"
      value={value}
      onChangeText={setValue}
      placeholder="you@example.com"
      keyboardType="email-address"
      autoCapitalize="none"
    />
  );
}
function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Button label="Open modal" onPress={() => setOpen(true)} />
      <Modal
        visible={open}
        onClose={() => setOpen(false)}
        title="Delete project?"
        footer={
          <>
            <Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} />
            <Button label="Delete" variant="destructive" onPress={() => setOpen(false)} />
          </>
        }
      >
        <Text variant="bodySm">This action cannot be undone.</Text>
      </Modal>
    </View>
  );
}

export const REGISTRY: ShowcaseEntry[] = [
  {
    id: "button",
    title: "Button",
    category: "Atoms",
    variants: [
      {
        title: "Variants",
        Demo: () => (
          <View className="gap-2 items-start">
            <Button label="Primary" />
            <Button label="Secondary" variant="secondary" />
            <Button label="Outline" variant="outline" />
            <Button label="Ghost" variant="ghost" />
            <Button label="Destructive" variant="destructive" />
          </View>
        ),
      },
      {
        title: "Sizes",
        Demo: () => (
          <View className="gap-2 items-start">
            <Button label="Small" size="sm" />
            <Button label="Medium" size="md" />
            <Button label="Large" size="lg" />
          </View>
        ),
      },
      {
        title: "Loading / disabled",
        Demo: () => (
          <View className="gap-2 items-start">
            <Button label="Loading" loading />
            <Button label="Disabled" disabled />
          </View>
        ),
      },
    ],
  },
  {
    id: "text",
    title: "Text",
    category: "Atoms",
    variants: [
      {
        title: "Scale",
        Demo: () => (
          <View className="gap-1">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="body">Body text</Text>
            <Text variant="caption">Caption</Text>
          </View>
        ),
      },
    ],
  },
  {
    id: "card",
    title: "Card",
    category: "Atoms",
    variants: [
      {
        title: "Raised",
        Demo: () => (
          <Card title="Card title" subtitle="Subtitle">
            <Text variant="bodySm">Card body content.</Text>
          </Card>
        ),
      },
      {
        title: "Outline",
        Demo: () => (
          <Card variant="outline" title="Outline card">
            <Text variant="bodySm">No fill.</Text>
          </Card>
        ),
      },
    ],
  },
  {
    id: "avatar",
    title: "Avatar",
    category: "Atoms",
    variants: [
      {
        title: "Sizes",
        Demo: () => (
          <AvatarGroup className="gap-2 items-center">
            <Avatar name="Kuray K" size="xs" />
            <Avatar name="Kuray K" size="sm" />
            <Avatar name="Kuray K" size="md" />
            <Avatar name="Kuray K" size="lg" />
          </AvatarGroup>
        ),
      },
    ],
  },
  {
    id: "badge",
    title: "Badge",
    category: "Atoms",
    variants: [
      {
        title: "Variants",
        Demo: () => (
          <View className="flex-row flex-wrap gap-2">
            <Badge label="Default" />
            <Badge label="Primary" variant="primary" />
            <Badge label="Success" variant="success" />
            <Badge label="Warning" variant="warning" />
            <Badge label="Error" variant="error" />
            <Badge label="Info" variant="info" />
          </View>
        ),
      },
    ],
  },
  {
    id: "text-input",
    title: "TextInput",
    category: "Forms",
    variants: [{ title: "With label + hint", Demo: TextInputDemo }],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    category: "Forms",
    variants: [{ title: "Interactive", Demo: CheckboxDemo }],
  },
  {
    id: "switch",
    title: "Switch",
    category: "Forms",
    variants: [{ title: "Interactive", Demo: SwitchDemo }],
  },
  {
    id: "spinner",
    title: "Spinner",
    category: "Feedback",
    variants: [
      {
        title: "Sizes",
        Demo: () => (
          <View className="flex-row gap-4 items-center">
            <Spinner size="sm" />
            <Spinner size="lg" />
          </View>
        ),
      },
    ],
  },
  {
    id: "empty-state",
    title: "EmptyState",
    category: "Feedback",
    variants: [
      {
        title: "With action",
        Demo: () => (
          <EmptyState
            title="No items yet"
            description="Create your first item to get started."
            actionLabel="Create"
            onAction={() => {}}
          />
        ),
      },
    ],
  },
  {
    id: "skeleton-card",
    title: "SkeletonCard",
    category: "Feedback",
    variants: [{ title: "Loading", Demo: () => <SkeletonCard /> }],
  },
  {
    id: "modal",
    title: "Modal",
    category: "Overlays",
    variants: [{ title: "Confirm", Demo: ModalDemo }],
  },
];

export function getEntry(id: string): ShowcaseEntry | undefined {
  return REGISTRY.find((entry) => entry.id === id);
}
