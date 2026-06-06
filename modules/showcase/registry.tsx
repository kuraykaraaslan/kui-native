import { useState, type ComponentType } from "react";
import { View } from "react-native";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFont,
  faGripLines,
  faHandPointer,
  faIdCard,
  faInbox,
  faKeyboard,
  faSpinner,
  faSquareCheck,
  faTag,
  faToggleOn,
  faUser,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

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

export type ShowcaseCategory = "Atoms" | "Forms" | "Feedback" | "Overlays";
export const CATEGORY_ORDER: ShowcaseCategory[] = ["Atoms", "Forms", "Feedback", "Overlays"];

export type ShowcaseEntry = {
  id: string;
  title: string;
  category: ShowcaseCategory;
  description: string;
  icon: IconDefinition;
  usage: string;
  /** Small static thumbnail shown on the home card. */
  preview: ComponentType;
  /** Full demos shown on the detail screen. */
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
    icon: faHandPointer,
    description: "Pressable action with variants, sizes, and a loading state.",
    usage: `<Button label="Save" onPress={save} />`,
    preview: () => <Button label="Button" size="sm" />,
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
    icon: faFont,
    description: "Typographic scale (headings → caption) on the shared tokens.",
    usage: `<Text variant="h3">Title</Text>`,
    preview: () => <Text variant="h3">Aa Bb</Text>,
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
    icon: faIdCard,
    description: "Surface container with title, subtitle, and footer slots.",
    usage: `<Card title="Title" subtitle="Subtitle">{children}</Card>`,
    preview: () => (
      <Card variant="outline">
        <Text variant="caption">Card body</Text>
      </Card>
    ),
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
    icon: faUser,
    description: "User image with initials fallback and five sizes.",
    usage: `<Avatar name="Kuray K" src={url} size="md" />`,
    preview: () => <Avatar name="Kuray K" size="lg" />,
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
    icon: faTag,
    description: "Compact status/label pill in semantic colors.",
    usage: `<Badge label="New" variant="success" />`,
    preview: () => (
      <View className="flex-row gap-1.5">
        <Badge label="New" variant="primary" />
        <Badge label="OK" variant="success" />
      </View>
    ),
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
    icon: faKeyboard,
    description: "Labeled text field with hint, error, and focus states.",
    usage: `<TextInput label="Email" value={v} onChangeText={setV} />`,
    preview: () => <TextInput placeholder="Type…" containerClassName="w-44" />,
    variants: [{ title: "With label + hint", Demo: TextInputDemo }],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    category: "Forms",
    icon: faSquareCheck,
    description: "Boolean toggle with indeterminate and disabled states.",
    usage: `<Checkbox checked={c} onChange={setC} label="Agree" />`,
    preview: () => <Checkbox checked onChange={() => {}} label="Done" />,
    variants: [{ title: "Interactive", Demo: CheckboxDemo }],
  },
  {
    id: "switch",
    title: "Switch",
    category: "Forms",
    icon: faToggleOn,
    description: "On/off switch with a themed track.",
    usage: `<Switch value={on} onValueChange={setOn} label="Wifi" />`,
    preview: () => <Switch value onValueChange={() => {}} />,
    variants: [{ title: "Interactive", Demo: SwitchDemo }],
  },
  {
    id: "spinner",
    title: "Spinner",
    category: "Feedback",
    icon: faSpinner,
    description: "Activity indicator in three sizes.",
    usage: `<Spinner size="lg" />`,
    preview: () => <Spinner size="lg" />,
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
    icon: faInbox,
    description: "Placeholder for empty lists with an optional action.",
    usage: `<EmptyState title="Nothing here" actionLabel="Add" onAction={add} />`,
    preview: () => <EmptyState title="Empty" className="py-2" />,
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
    icon: faGripLines,
    description: "Pulsing placeholder shown while content loads.",
    usage: `<SkeletonCard />`,
    preview: () => <SkeletonCard className="w-44" />,
    variants: [{ title: "Loading", Demo: () => <SkeletonCard /> }],
  },
  {
    id: "modal",
    title: "Modal",
    category: "Overlays",
    icon: faWindowMaximize,
    description: "Centered dialog with backdrop and footer actions.",
    usage: `<Modal visible={open} onClose={close} title="Hi">{children}</Modal>`,
    preview: () => <Button label="Open dialog" size="sm" variant="outline" />,
    variants: [{ title: "Confirm", Demo: ModalDemo }],
  },
];

export function getEntry(id: string): ShowcaseEntry | undefined {
  return REGISTRY.find((entry) => entry.id === id);
}
