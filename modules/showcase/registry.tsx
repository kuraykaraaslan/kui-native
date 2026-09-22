import { useState, type ComponentType } from "react";
import { View } from "react-native";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFolder,
  faFont,
  faGripLines,
  faGripLinesVertical,
  faHandPointer,
  faIdBadge,
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
  Label,
  Modal,
  Separator,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonLine,
  SkeletonText,
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
// Mirrors KuiReact's Checkbox showcase variants 1:1 (same titles and copy).
function CheckboxDefaultDemo() {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={setChecked} label="I agree to the Terms of Service" />;
}
function CheckboxSelectAllDemo() {
  const [items, setItems] = useState([true, false, false]);
  const all = items.every(Boolean);
  const some = items.some(Boolean) && !all;
  return (
    <View className="gap-2">
      <Checkbox
        checked={all}
        indeterminate={some}
        onChange={() => setItems(items.map(() => !all))}
        label="Select all"
      />
      <View className="gap-2 pl-7">
        {items.map((value, i) => (
          <Checkbox
            key={i}
            checked={value}
            onChange={(next) => setItems(items.map((v, j) => (j === i ? next : v)))}
            label={`Item ${i + 1}`}
          />
        ))}
      </View>
    </View>
  );
}
// Mirrors KuiReact's Toggle showcase variants 1:1 (same titles and copy).
function SwitchSizesDemo() {
  const [enabled, setEnabled] = useState(true);
  return (
    <View className="gap-3">
      <Switch value={enabled} onValueChange={setEnabled} label="Enable notifications" size="sm" />
      <Switch value={enabled} onValueChange={setEnabled} label="Enable notifications" size="md" />
      <Switch value={enabled} onValueChange={setEnabled} label="Enable notifications" size="lg" />
    </View>
  );
}
function SwitchDescriptionDemo() {
  const [value, setValue] = useState(false);
  return (
    <Switch value={value} onValueChange={setValue} label="Marketing emails" description="Receive weekly updates." />
  );
}
const SETTINGS_ROWS = [
  { key: "notifications", label: "Push notifications", desc: "Alerts for new activity" },
  { key: "marketing", label: "Marketing emails", desc: "Product news and offers" },
] as const;
function SwitchSettingsListDemo() {
  const [s, setS] = useState<Record<string, boolean>>({ notifications: true, marketing: false });
  return (
    // KuiReact: "divide-y border rounded-lg" with "px-4 py-3" rows.
    <View className="rounded-lg border border-border">
      {SETTINGS_ROWS.map(({ key, label, desc }, i) => (
        <View
          key={key}
          className={`flex-row items-center justify-between px-4 py-3${i > 0 ? " border-t border-border" : ""}`}
        >
          <View>
            <Text variant="label" className="font-medium">
              {label}
            </Text>
            <Text variant="caption">{desc}</Text>
          </View>
          <Switch
            accessibilityLabel={label}
            value={s[key]}
            onValueChange={() => setS((p) => ({ ...p, [key]: !p[key] }))}
          />
        </View>
      ))}
    </View>
  );
}
function TextInputDemo() {
  const [value, setValue] = useState("");
  return (
    <TextInput
      label="Email"
      hint="We'll never share your email."
      value={value}
      onChangeText={setValue}
      placeholder="you@example.com"
      keyboardType="email-address"
      autoCapitalize="none"
    />
  );
}
// Mirrors KuiReact's Modal showcase variants 1:1 (same titles and copy).
function ModalConfirmDemo() {
  const [open, setOpen] = useState(false);
  return (
    <View className="items-start">
      <Button label="Open Modal" variant="primary" onPress={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
        description="Are you sure you want to proceed?"
        footer={
          <>
            <Button label="Cancel" variant="outline" onPress={() => setOpen(false)} />
            <Button label="Delete" variant="destructive" onPress={() => setOpen(false)} />
          </>
        }
      >
        <Text variant="bodySm">This will permanently delete all selected items.</Text>
      </Modal>
    </View>
  );
}
function ModalSizesDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | null>(null);
  const titles = { sm: "Small", md: "Medium", lg: "Large" } as const;
  return (
    <View className="flex-row gap-2">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Button key={s} label={titles[s]} variant="outline" size="sm" onPress={() => setSize(s)} />
      ))}
      <Modal open={size !== null} onClose={() => setSize(null)} title={size ? titles[size] : ""} size={size ?? "md"}>
        <Text variant="bodySm">…</Text>
      </Modal>
    </View>
  );
}
function ModalScrollableDemo() {
  const [open, setOpen] = useState(false);
  return (
    <View className="items-start">
      <Button label="Long Content" variant="outline" size="sm" onPress={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Long Content"
        scrollable
        footer={<Button label="OK" onPress={() => setOpen(false)} />}
      >
        <View className="gap-3">
          {Array.from({ length: 30 }).map((_, i) => (
            <Text key={i} variant="bodySm">
              Paragraph {i + 1} — long content scrolls inside the modal body.
            </Text>
          ))}
        </View>
      </Modal>
    </View>
  );
}
function ModalFullscreenDemo() {
  const [open, setOpen] = useState(false);
  return (
    <View className="items-start">
      <Button label="Fullscreen Dialog" variant="outline" size="sm" onPress={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)} title="Fullscreen Dialog" fullscreen>
        <Text variant="bodySm">…</Text>
      </Modal>
    </View>
  );
}
function ModalNestedDemo() {
  const [outer, setOuter] = useState(false);
  const [inner, setInner] = useState(false);
  return (
    <View className="items-start">
      <Button label="Open Outer" variant="outline" size="sm" onPress={() => setOuter(true)} />
      <Modal open={outer} onClose={() => setOuter(false)} title="Outer">
        <Button label="Open Nested" onPress={() => setInner(true)} />
        {/* Nested inside the outer Modal's tree so Android back / backdrop
            dismiss only the inner one first (KuiReact: layer-aware Escape). */}
        <Modal open={inner} onClose={() => setInner(false)} title="Nested" size="sm">
          <Text variant="bodySm">…</Text>
        </Modal>
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
    // Mirrors KuiReact's Button showcase variants 1:1 (same titles and copy).
    // KuiReact's `danger` variant is still `destructive` here, and "Icon
    // left / right" shows only the left icon — iconRight, "Icon only" and
    // "Selected / active state" need props not yet ported (R-button, Wave 1).
    variants: [
      { title: "Primary", Demo: () => <Button label="Primary" variant="primary" /> },
      { title: "Secondary", Demo: () => <Button label="Secondary" variant="secondary" /> },
      { title: "Ghost", Demo: () => <Button label="Ghost" variant="ghost" /> },
      { title: "Danger", Demo: () => <Button label="Danger" variant="destructive" /> },
      { title: "Outline", Demo: () => <Button label="Outline" variant="outline" /> },
      { title: "Disabled", Demo: () => <Button label="Disabled" variant="primary" disabled /> },
      {
        title: "Sizes",
        Demo: () => (
          <View className="flex-row flex-wrap items-center gap-2">
            <Button label="XS" size="xs" />
            <Button label="SM" size="sm" />
            <Button label="MD" size="md" />
            <Button label="LG" size="lg" />
            <Button label="XL" size="xl" />
          </View>
        ),
      },
      {
        title: "Icon left / right",
        Demo: () => <Button label="Download" iconLeft={<Text className="text-primary-fg">⬇</Text>} />,
      },
      { title: "Full width", Demo: () => <Button label="Full-width" fullWidth /> },
      { title: "Loading state", Demo: () => <Button label="Saving…" variant="primary" loading /> },
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
        // KuiReact showcase (Card.showcase): title + subtitle + headerRight badge
        title: "Raised",
        Demo: () => (
          <Card title="User profile" subtitle="Manage your account" headerRight={<Badge label="Active" variant="success" />}>
            <Text variant="bodySm">Card body content goes here.</Text>
          </Card>
        ),
      },
      {
        // KuiReact showcase: outline "Cancel" + danger "Delete" in the footer
        title: "With footer",
        Demo: () => (
          <Card
            title="Confirm deletion"
            footer={
              <View className="flex-row gap-2">
                <Button label="Cancel" variant="outline" size="sm" />
                <Button label="Delete" variant="destructive" size="sm" />
              </View>
            }
          >
            <Text variant="bodySm">This action is irreversible.</Text>
          </Card>
        ),
      },
      {
        title: "Flat",
        Demo: () => (
          <Card variant="flat" title="Flat card">
            <Text variant="bodySm">No shadow, uses page background color.</Text>
          </Card>
        ),
      },
      {
        title: "Outline",
        Demo: () => (
          <Card variant="outline" title="Outline card">
            <Text variant="bodySm">Transparent background, border only.</Text>
          </Card>
        ),
      },
      // KuiReact's "Clickable / hoverable" (onClick/hoverable) and "Loading
      // skeleton" (loading) variants need new Card props not yet ported —
      // tracked as the remaining scope of R-card (Wave 2).
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
        // KuiReact showcase (Avatar.showcase): Jane Doe at every size
        title: "Initials (sizes)",
        Demo: () => (
          <AvatarGroup className="gap-2 items-center">
            <Avatar name="Jane Doe" size="xs" />
            <Avatar name="Jane Doe" size="sm" />
            <Avatar name="Jane Doe" size="md" />
            <Avatar name="Jane Doe" size="lg" />
            <Avatar name="Jane Doe" size="xl" />
          </AvatarGroup>
        ),
      },
      {
        // KuiReact showcase: avatar + name/email pair
        title: "With label",
        Demo: () => (
          <View className="flex-row items-center gap-3">
            <Avatar name="John Smith" size="md" />
            <View>
              <Text variant="label">John Smith</Text>
              <Text variant="caption">john@example.com</Text>
            </View>
          </View>
        ),
      },
      {
        title: "Image source",
        Demo: () => <Avatar src="https://i.pravatar.cc/128" name="Jane Doe" />,
      },
      {
        // KuiReact showcase: Alice/Bob/Carol/Dave, one per status
        title: "Status dot",
        Demo: () => (
          <AvatarGroup className="gap-4 items-center">
            <Avatar name="Alice" status="online" />
            <Avatar name="Bob" status="away" />
            <Avatar name="Carol" status="busy" />
            <Avatar name="Dave" status="offline" />
          </AvatarGroup>
        ),
      },
      // KuiReact's "AvatarGroup" variant (data-driven `avatars`/`max` props
      // with overlap + a "+N" overflow chip) is not reproduced here —
      // KuiNative's AvatarGroup is still children-based and tracked as a
      // REQUIRES_REWRITE item (docs/audits/kui-react-parity/phase-3-parity-review/rewrite-candidates.md).
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
    id: "separator",
    title: "Separator",
    category: "Atoms",
    icon: faGripLinesVertical,
    description: "Thin dividing rule, with an optional centered label.",
    usage: `<Separator />`,
    preview: () => <Separator className="w-16" />,
    variants: [
      {
        // KuiReact showcase (Separator.showcase): "Section one content" / "Section two content"
        title: "Horizontal",
        Demo: () => (
          <View className="gap-3">
            <Text variant="bodySm">Section one content</Text>
            <Separator />
            <Text variant="bodySm">Section two content</Text>
          </View>
        ),
      },
      {
        // KuiReact showcase: "Profile" / "Settings" side by side, plus a
        // separately labeled "OR" rule underneath — one variant, two rules.
        title: "Vertical + labeled",
        Demo: () => (
          <View className="gap-3">
            <View className="h-10 flex-row items-center gap-3">
              <Text variant="bodySm">Profile</Text>
              <Separator orientation="vertical" />
              <Text variant="bodySm">Settings</Text>
            </View>
            <Separator label="OR" />
          </View>
        ),
      },
    ],
  },
  {
    id: "label",
    title: "Label",
    category: "Forms",
    icon: faIdBadge,
    description: "Form-field label with a required-field marker.",
    usage: `<Label required>Email</Label>`,
    preview: () => <Label>Email</Label>,
    variants: [
      {
        // KuiReact showcase (Label.showcase): "Full name" + "Email address" (required)
        title: "Basic + required",
        Demo: () => (
          <View className="gap-2">
            <Label>Full name</Label>
            <Label required>Email address</Label>
          </View>
        ),
      },
      {
        // KuiReact showcase pairs Label with a control via htmlFor; RN has no
        // htmlFor, so onPress on the Label focuses the paired field instead —
        // same "label describes/activates a field" relationship KuiReact
        // demonstrates, adapted to the platform.
        title: "Paired with a custom control",
        Demo: () => (
          <View className="gap-3">
            <View>
              <Label>Bio</Label>
              <TextInput multiline numberOfLines={2} />
            </View>
            <View>
              <Label disabled>Handle (disabled)</Label>
              <TextInput editable={false} placeholder="@handle" />
            </View>
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
    // Mirrors KuiReact's Input showcase variants that KuiNative can render
    // today (same titles and copy). Prefix/suffix icon, Clearable, Success
    // state, Read only, Character counter, Password toggle, Number stepper,
    // Prefix/suffix text and Loading state need Input props not yet ported
    // (tracked as R-input, Wave 1).
    variants: [
      { title: "Default", Demo: TextInputDemo },
      {
        title: "Error",
        Demo: () => (
          <TextInput label="Email" keyboardType="email-address" error="A valid email address is required." />
        ),
      },
      {
        title: "Disabled",
        Demo: () => <TextInput label="Email" placeholder="you@example.com" editable={false} />,
      },
    ],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    category: "Forms",
    icon: faSquareCheck,
    description: "Boolean toggle with indeterminate and disabled states.",
    usage: `<Checkbox checked={c} onChange={setC} label="Agree" />`,
    preview: () => <Checkbox checked onChange={() => {}} label="Done" />,
    variants: [
      { title: "Default", Demo: CheckboxDefaultDemo },
      {
        title: "Disabled",
        Demo: () => <Checkbox checked disabled label="Checked and disabled" />,
      },
      { title: "Indeterminate (select all)", Demo: CheckboxSelectAllDemo },
      // KuiReact's "With hint" and "Error" variants need the `hint`/`error`
      // props, not yet ported (tracked as R-checkbox, Wave 2).
    ],
  },
  {
    id: "switch",
    title: "Switch",
    category: "Forms",
    icon: faToggleOn,
    description: "On/off switch with a themed track.",
    usage: `<Switch value={on} onValueChange={setOn} label="Wifi" />`,
    preview: () => <Switch value onValueChange={() => {}} />,
    variants: [
      { title: "Sizes", Demo: SwitchSizesDemo },
      { title: "With description", Demo: SwitchDescriptionDemo },
      { title: "Disabled", Demo: () => <Switch value disabled label="Disabled" /> },
      { title: "Settings list (controlled)", Demo: SwitchSettingsListDemo },
    ],
  },
  {
    id: "spinner",
    title: "Spinner",
    category: "Feedback",
    icon: faSpinner,
    description: "Activity indicator in five sizes (xs–xl), mirrors KuiReact's Spinner.",
    usage: `<Spinner size="lg" />`,
    preview: () => <Spinner size="lg" />,
    variants: [
      {
        title: "Sizes",
        Demo: () => (
          <View className="flex-row gap-4 items-center">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </View>
        ),
      },
      {
        title: "In a Button",
        Demo: () => <Button label="Saving…" loading />,
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
    preview: () => <EmptyState icon={faInbox} title="Empty" className="py-2" />,
    // Mirrors KuiReact's EmptyState showcase variants 1:1 (same titles and copy;
    // KuiReact's 📁 emoji icon → Font Awesome's folder, per ADR 0004's FA-only rule).
    variants: [
      {
        title: "With action",
        Demo: () => (
          <EmptyState
            icon={faFolder}
            title="No projects yet"
            description="Create your first project to get started."
            actionLabel="New project"
            onAction={() => {}}
          />
        ),
      },
      {
        title: "Minimal",
        Demo: () => <EmptyState title="No results found" description="Try adjusting your search or filters." />,
      },
    ],
  },
  {
    id: "skeleton",
    title: "Skeleton",
    category: "Feedback",
    icon: faGripLines,
    description: "Pulsing placeholders shown while content loads — lines, text blocks, avatars, cards.",
    usage: `<SkeletonCard />`,
    preview: () => <SkeletonCard className="w-44" />,
    // Mirrors KuiReact's Skeleton showcase variants 1:1 (same titles and markup).
    variants: [
      {
        title: "Lines",
        Demo: () => (
          <View className="gap-2">
            <SkeletonLine width="w-full" />
            <SkeletonLine width="w-3/4" />
            <SkeletonLine width="w-1/2" />
          </View>
        ),
      },
      { title: "Text block", Demo: () => <SkeletonText lines={4} /> },
      { title: "Card", Demo: () => <SkeletonCard /> },
      {
        title: "Article layout",
        Demo: () => (
          <View className="gap-4">
            <SkeletonLine width="w-1/4" />
            <SkeletonLine width="w-full" className="h-6" />
            <SkeletonLine width="w-3/4" className="h-6" />
            <View className="flex-row items-center gap-3">
              <SkeletonAvatar size="sm" />
              <SkeletonLine width="w-24" />
            </View>
            <SkeletonLine className="h-40 rounded-xl" />
            <SkeletonText lines={4} />
          </View>
        ),
      },
      // KuiReact's "Table rows" and "Dashboard layout" variants use
      // SkeletonTableRow, which is not ported (KuiNative has no Table yet).
    ],
  },
  {
    id: "modal",
    title: "Modal",
    category: "Overlays",
    icon: faWindowMaximize,
    description: "Centered dialog with backdrop and footer actions.",
    usage: `<Modal open={open} onClose={close} title="Confirm action">{children}</Modal>`,
    preview: () => <Button label="Open dialog" size="sm" variant="outline" />,
    variants: [
      { title: "Confirmation dialog", Demo: ModalConfirmDemo },
      { title: "Sizes (sm / md / lg)", Demo: ModalSizesDemo },
      { title: "Scrollable body", Demo: ModalScrollableDemo },
      { title: "Fullscreen", Demo: ModalFullscreenDemo },
      { title: "Nested modals (layer-aware Escape)", Demo: ModalNestedDemo },
    ],
  },
];

export function getEntry(id: string): ShowcaseEntry | undefined {
  return REGISTRY.find((entry) => entry.id === id);
}
