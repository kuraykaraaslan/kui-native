import { useState, type ComponentType } from "react";
import { View } from "react-native";
import { countries, getEmojiFlag, type TCountryCode } from "countries-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleDot,
  faCircleExclamation,
  faFolder,
  faFont,
  faGripLines,
  faGripLinesVertical,
  faHandPointer,
  faIdBadge,
  faIdCard,
  faInbox,
  faKeyboard,
  faEllipsisVertical,
  faMessage,
  faCommentDots,
  faMagnifyingGlass,
  faBell,
  faListUl,
  faTableColumns,
  faBarsProgress,
  faAlignLeft,
  faArrowTrendUp,
  faChartBar,
  faFolderOpen,
  faRocket,
  faSpinner,
  faSquareCheck,
  faTag,
  faToggleOn,
  faUser,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

import {
  AlertBanner,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Checkbox,
  Drawer,
  DropdownMenu,
  EmptyState,
  Input,
  Label,
  Modal,
  Popover,
  Progress,
  RadioGroup,
  Select,
  Separator,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonLine,
  SkeletonText,
  Spinner,
  TabGroup,
  Text,
  Textarea,
  toast,
  Toggle,
  Tooltip,
} from "@/modules/ui";
import { useThemeTokens } from "@/libs/theme";

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
function ToggleSizesDemo() {
  const [enabled, setEnabled] = useState(true);
  return (
    <View className="gap-3">
      <Toggle checked={enabled} onChange={setEnabled} label="Enable notifications" size="sm" />
      <Toggle checked={enabled} onChange={setEnabled} label="Enable notifications" size="md" />
      <Toggle checked={enabled} onChange={setEnabled} label="Enable notifications" size="lg" />
    </View>
  );
}
function ToggleDescriptionDemo() {
  const [value, setValue] = useState(false);
  return (
    <Toggle checked={value} onChange={setValue} label="Marketing emails" description="Receive weekly updates." />
  );
}
function RocketIcon() {
  const t = useThemeTokens();
  return <FontAwesomeIcon icon={faRocket} size={16} color={t["info-fg"]} />;
}
function TabIcon({ icon, active }: { icon: IconDefinition; active?: boolean }) {
  const t = useThemeTokens();
  return <FontAwesomeIcon icon={icon} size={14} color={active ? t.primary : t["text-secondary"]} />;
}
const SETTINGS_ROWS = [
  { key: "notifications", label: "Push notifications", desc: "Alerts for new activity" },
  { key: "marketing", label: "Marketing emails", desc: "Product news and offers" },
] as const;
function ToggleSettingsListDemo() {
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
          <Toggle ariaLabel={label} checked={s[key]} onChange={() => setS((p) => ({ ...p, [key]: !p[key] }))} />
        </View>
      ))}
    </View>
  );
}
// Mirrors KuiReact's RadioGroup showcase variants 1:1 (same titles and copy).
const NOTIFY_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "none", label: "None" },
];
function RadioDefaultDemo() {
  const [v, setV] = useState<string>();
  return <RadioGroup name="notify" legend="Notification preference" options={NOTIFY_OPTIONS} value={v} onChange={setV} />;
}
function RadioCardDemo() {
  const [v, setV] = useState("pro");
  const plans = [
    { value: "free", label: "Free", hint: "$0/mo · 3 projects" },
    { value: "pro", label: "Pro", hint: "$12/mo · Unlimited" },
    { value: "team", label: "Team", hint: "$49/mo · 10 seats" },
  ];
  // KuiReact's demo hand-rolls "gap-3 px-4 py-3" option rows; optionClassName
  // reproduces that spacing on top of the card variant.
  return (
    <RadioGroup
      name="plan"
      legend="Choose plan"
      options={plans}
      value={v}
      onChange={setV}
      variant="card"
      optionClassName="gap-3 px-4 py-3"
    />
  );
}
// Mirrors KuiReact's Textarea "Character counter" demo verbatim.
function TextareaCounterDemo() {
  const MAX = 200;
  const [v, setV] = useState("");
  return (
    <View className="gap-1">
      <Textarea label="Bio" value={v} maxLength={MAX} rows={3} onChangeText={setV} />
      <Text className={`text-right text-xs ${MAX - v.length < 20 ? "text-error" : "text-text-secondary"}`}>
        {MAX - v.length} characters remaining
      </Text>
    </View>
  );
}
// Mirrors KuiReact's Select showcase variants 1:1 (same titles, data and copy).
const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];
const PLANS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
];
const COUNTRY_OPTIONS = Object.entries(countries)
  .map(([code, data]) => ({ value: code, label: `${getEmojiFlag(code as TCountryCode)} ${data.name}` }))
  .sort((a, b) => a.label.localeCompare(b.label));
function StatusDot({ color }: { color: string }) {
  return <Text className={color}>●</Text>;
}
const STATUSES = [
  { value: "active", label: "Active", icon: <StatusDot color="text-success" /> },
  { value: "inactive", label: "Inactive", icon: <StatusDot color="text-text-disabled" /> },
  { value: "pending", label: "Pending", icon: <StatusDot color="text-warning" /> },
];
function SelectControlledDemo() {
  const [role, setRole] = useState("editor");
  return <Select id="role" label="Role" options={ROLES} value={role} onChange={setRole} />;
}
function SelectIconsDemo() {
  const [status, setStatus] = useState("active");
  return <Select id="status" label="Status" options={STATUSES} value={status} onChange={setStatus} />;
}
function SelectCountriesDemo() {
  const [val, setVal] = useState<string>();
  return (
    <Select
      id="country"
      label="Country"
      placeholder="Select a country…"
      options={COUNTRY_OPTIONS}
      value={val}
      onChange={setVal}
      hint="Powered by countries-list."
    />
  );
}
function SelectSearchableDemo() {
  const [val, setVal] = useState<string>();
  return (
    <Select
      id="country"
      label="Country"
      placeholder="Select a country…"
      searchable
      options={COUNTRY_OPTIONS}
      value={val}
      onChange={setVal}
      hint="Type to filter the list."
    />
  );
}
function BadgeDismissibleDemo() {
  const [tags, setTags] = useState(["React"]);
  return (
    <View className="flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="primary" dismissible onDismiss={() => setTags(tags.filter((t) => t !== tag))}>
          {tag}
        </Badge>
      ))}
      {tags.length === 0 ? <Button variant="ghost" size="xs" onPress={() => setTags(["React"])}>Reset</Button> : null}
    </View>
  );
}
// Mirrors KuiReact's Input showcase variants 1:1 (same titles and copy).
function SearchIcon() {
  const t = useThemeTokens();
  return <FontAwesomeIcon icon={faMagnifyingGlass} size={14} color={t["text-disabled"]} />;
}
function InputClearableDemo() {
  const [v, setV] = useState("");
  return <Input label="Label" value={v} onChangeText={setV} clearable onClear={() => setV("")} />;
}
function InputCounterDemo() {
  const [v, setV] = useState("");
  return <Input label="Bio" value={v} onChangeText={setV} maxLength={50} showCount />;
}
function InputPasswordDemo() {
  const [v, setV] = useState("");
  return <Input label="Password" type="password" value={v} onChangeText={setV} />;
}
function InputStepperDemo() {
  const [v, setV] = useState("1");
  return <Input label="Quantity" type="number" value={v} onChangeText={setV} min={0} max={99} />;
}
function InputLoadingDemo() {
  const [v, setV] = useState("johndoe");
  return (
    <Input label="Username" value={v} onChangeText={setV} suffixIcon={<Spinner size="xs" />} hint="Checking availability…" />
  );
}
// Mirrors KuiReact's Toast showcase variants 1:1 (same titles and copy — KuiReact's
// Toast demos are written in Turkish, so the strings are kept verbatim).
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchData = () => wait(1500).then(() => ({ name: "Rapor" }));
const fetchUser = () => wait(1500).then(() => ({ name: "Kuray", id: 42 }));
const fetchBroken = () =>
  wait(1500).then(() => {
    throw new Error("503 Service Unavailable");
  });
function ToastButtons({ items }: { items: { label: string; run: () => void }[] }) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {items.map((i) => (
        <Button key={i.label} label={i.label} variant="outline" size="sm" onPress={i.run} />
      ))}
    </View>
  );
}
// Mirrors KuiReact's Drawer showcase variants 1:1 (same titles and copy).
function DrawerRightDemo() {
  const [open, setOpen] = useState(false);
  return (
    <View className="items-start">
      <Button label="Open Drawer" variant="outline" onPress={() => setOpen(true)} />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Settings"
        side="right"
        footer={
          <>
            <Button label="Cancel" variant="outline" onPress={() => setOpen(false)} />
            <Button label="Save" variant="primary" onPress={() => setOpen(false)} />
          </>
        }
      >
        <Text variant="bodySm">Drawer content goes here.</Text>
      </Drawer>
    </View>
  );
}
function DrawerLeftDemo() {
  const [open, setOpen] = useState(false);
  return (
    <View className="items-start">
      <Button label="Open Drawer" variant="outline" onPress={() => setOpen(true)} />
      <Drawer open={open} onClose={() => setOpen(false)} title="Navigation" side="left">
        <Text variant="bodySm">…</Text>
      </Drawer>
    </View>
  );
}
function DrawerRouteAwareDemo() {
  const [open, setOpen] = useState(false);
  // closeOnRouteChange is accepted for parity and is a no-op, as in KuiReact (its M6 stub).
  return (
    <View className="items-start">
      <Button label="Open Drawer" variant="outline" onPress={() => setOpen(true)} />
      <Drawer open={open} onClose={() => setOpen(false)} title="Route-aware drawer" side="right" closeOnRouteChange>
        <Text variant="bodySm">…</Text>
      </Drawer>
    </View>
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
            <Button label="Delete" variant="danger" onPress={() => setOpen(false)} />
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
    usage: `<Button onPress={save}>Save</Button>`,
    preview: () => <Button label="Button" size="sm" />,
    // Mirrors KuiReact's Button showcase variants 1:1 (same titles and copy).
    // KuiReact's text-glyph icons (⬇ → ✕) are kept as-is, as in its demos.
    variants: [
      { title: "Primary", Demo: () => <Button variant="primary">Primary</Button> },
      { title: "Secondary", Demo: () => <Button variant="secondary">Secondary</Button> },
      { title: "Ghost", Demo: () => <Button variant="ghost">Ghost</Button> },
      { title: "Danger", Demo: () => <Button variant="danger">Danger</Button> },
      { title: "Outline", Demo: () => <Button variant="outline">Outline</Button> },
      {
        title: "Disabled",
        Demo: () => (
          <Button variant="primary" disabled>
            Disabled
          </Button>
        ),
      },
      {
        title: "Sizes",
        Demo: () => (
          <View className="flex-row flex-wrap items-center gap-2">
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
            <Button size="xl">XL</Button>
          </View>
        ),
      },
      {
        title: "Icon left / right",
        Demo: () => (
          <View className="flex-row flex-wrap items-center gap-2">
            <Button iconLeft={<Text className="text-primary-fg">⬇</Text>}>Download</Button>
            <Button variant="outline" iconRight={<Text className="text-text-primary">→</Text>}>
              Next
            </Button>
          </View>
        ),
      },
      {
        title: "Icon only",
        Demo: () => (
          <View className="flex-row">
            <Button iconOnly accessibilityLabel="Delete item">
              <Text className="text-sm text-primary-fg">✕</Text>
            </Button>
          </View>
        ),
      },
      { title: "Full width", Demo: () => <Button fullWidth>Full-width</Button> },
      {
        title: "Selected / active state",
        Demo: () => (
          <View className="flex-row">
            <Button variant="outline" selected>
              Selected
            </Button>
          </View>
        ),
      },
      {
        title: "Loading state",
        Demo: () => (
          <Button variant="primary" loading>
            Saving…
          </Button>
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
        // KuiReact showcase (Card.showcase): title + subtitle + headerRight badge
        title: "Raised",
        Demo: () => (
          <Card title="User profile" subtitle="Manage your account" headerRight={<Badge variant="success">Active</Badge>}>
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
                <Button label="Delete" variant="danger" size="sm" />
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
      {
        title: "Clickable / hoverable",
        Demo: () => (
          <View className="gap-3">
            <Card title="Clickable" onPress={() => toast.info("Card pressed")}>
              <Text variant="bodySm">…</Text>
            </Card>
            <Card title="Hoverable" hoverable>
              <Text variant="bodySm">…</Text>
            </Card>
          </View>
        ),
      },
      { title: "Loading skeleton", Demo: () => <Card loading /> },
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
      {
        // KuiReact: avatars={[{ name: 'Alice' }, { name: 'Bob' }, ...]} max={4}
        title: "AvatarGroup",
        Demo: () => (
          <AvatarGroup
            avatars={[
              { name: "Alice" },
              { name: "Bob" },
              { name: "Carol" },
              { name: "Dave" },
              { name: "Eve" },
              { name: "Frank" },
            ]}
            max={4}
          />
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
    usage: `<Badge variant="success">Active</Badge>`,
    preview: () => (
      <View className="flex-row gap-1.5">
        <Badge variant="primary">New</Badge>
        <Badge variant="success">OK</Badge>
      </View>
    ),
    // Mirrors KuiReact's Badge showcase variants 1:1 (same titles and copy).
    variants: [
      { title: "Success", Demo: () => <Badge variant="success">Active</Badge> },
      { title: "Error", Demo: () => <Badge variant="error">Inactive</Badge> },
      { title: "Warning", Demo: () => <Badge variant="warning">Pending</Badge> },
      { title: "Info", Demo: () => <Badge variant="info">New</Badge> },
      { title: "Neutral", Demo: () => <Badge variant="neutral">Design</Badge> },
      { title: "Primary", Demo: () => <Badge variant="primary">Frontend</Badge> },
      {
        title: "Sizes",
        Demo: () => (
          <View className="flex-row flex-wrap items-center gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </View>
        ),
      },
      {
        title: "Dot badge",
        Demo: () => (
          <View className="flex-row flex-wrap items-center gap-2">
            <Badge variant="success" dot>
              Online
            </Badge>
            <Badge variant="warning" dot>
              Away
            </Badge>
          </View>
        ),
      },
      { title: "Dismissible", Demo: BadgeDismissibleDemo },
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
              <Input multiline numberOfLines={2} />
            </View>
            <View>
              <Label disabled>Handle (disabled)</Label>
              <Input disabled placeholder="@handle" />
            </View>
          </View>
        ),
      },
    ],
  },
  {
    id: "input",
    title: "Input",
    category: "Forms",
    icon: faKeyboard,
    description: "Labelled text field with hint, error, success, icons, clear, counter, password and number modes.",
    usage: `<Input label="Email" value={v} onChangeText={setV} />`,
    preview: () => <Input placeholder="Type…" className="w-44" />,
    variants: [
      {
        title: "Default",
        Demo: () => <Input label="Email" type="email" placeholder="you@example.com" hint="We'll never share your email." />,
      },
      {
        title: "Error",
        Demo: () => <Input label="Email" type="email" error="A valid email address is required." required />,
      },
      { title: "Disabled", Demo: () => <Input label="Email" type="email" placeholder="you@example.com" disabled /> },
      {
        title: "Prefix / suffix icon",
        Demo: () => (
          <View className="gap-4">
            <Input label="Search" prefixIcon={<SearchIcon />} placeholder="Search…" />
            <Input label="Amount" suffixIcon={<Text className="text-text-disabled">$</Text>} type="number" />
          </View>
        ),
      },
      { title: "Clearable", Demo: InputClearableDemo },
      { title: "Success state", Demo: () => <Input label="Username" value="johndoe" success="Username is available!" /> },
      { title: "Read only", Demo: () => <Input label="API Key" value="sk-abc123xyz" readOnly /> },
      { title: "Character counter", Demo: InputCounterDemo },
      { title: "Password with eye toggle", Demo: InputPasswordDemo },
      { title: "Number stepper", Demo: InputStepperDemo },
      {
        title: "Prefix / suffix text",
        Demo: () => (
          <View className="gap-4">
            <Input
              label="Website"
              prefixIcon={<Text className="font-mono text-xs text-text-secondary">https://</Text>}
              placeholder="yoursite.com"
            />
            <Input label="Twitter handle" prefixIcon={<Text className="text-text-secondary">@</Text>} placeholder="username" />
            <Input label="Price" suffixIcon={<Text className="text-text-secondary">USD</Text>} type="number" />
          </View>
        ),
      },
      { title: "Loading state", Demo: InputLoadingDemo },
    ],
  },
  {
    id: "select",
    title: "Select",
    category: "Forms",
    icon: faListUl,
    description: "Single-select field with icons, search, placeholder, validation and disabled states.",
    usage: `<Select id="role" label="Role" options={ROLES} value={role} onChange={setRole} />`,
    preview: () => <Select id="p" label="Role" options={ROLES} value="editor" className="w-44" />,
    variants: [
      { title: "Controlled", Demo: SelectControlledDemo },
      { title: "With icons", Demo: SelectIconsDemo },
      {
        title: "Validation states",
        Demo: () => (
          <View className="gap-4">
            <Select id="plan" label="Plan" placeholder="Select a plan" required error="Please select a plan." options={PLANS} />
            <Select id="plan" label="Plan" disabled options={PLANS} value="pro" />
          </View>
        ),
      },
      { title: "With countries", Demo: SelectCountriesDemo },
      { title: "Searchable", Demo: SelectSearchableDemo },
    ],
  },
  {
    id: "textarea",
    title: "Textarea",
    category: "Forms",
    icon: faAlignLeft,
    description: "Multi-line text field with label, hint, error and required marker.",
    usage: `<Textarea label="Message" placeholder="Write your message…" hint="Max 500 characters." />`,
    preview: () => <Textarea label="Message" rows={2} className="w-44" />,
    // Mirrors KuiReact's Textarea showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: () => <Textarea label="Message" placeholder="Write your message…" hint="Max 500 characters." />,
      },
      { title: "Error", Demo: () => <Textarea label="Message" error="Message is required." required /> },
      { title: "Disabled", Demo: () => <Textarea label="Message" placeholder="Not editable" disabled /> },
      { title: "Character counter", Demo: TextareaCounterDemo },
    ],
  },
  {
    id: "radio-group",
    title: "RadioGroup",
    category: "Forms",
    icon: faCircleDot,
    description: "Mutually-exclusive choice with a legend, hints, card style and error state.",
    usage: `<RadioGroup name="notify" legend="Notification preference" options={options} value={v} onChange={setV} />`,
    preview: () => <RadioGroup name="p" legend="Plan" options={NOTIFY_OPTIONS.slice(0, 2)} value="email" />,
    variants: [
      { title: "Default", Demo: RadioDefaultDemo },
      {
        title: "Disabled",
        Demo: () => (
          <RadioGroup name="notify" legend="Notification preference" options={NOTIFY_OPTIONS} value="email" disabled />
        ),
      },
      { title: "Card style", Demo: RadioCardDemo },
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
        title: "With hint",
        Demo: () => <Checkbox label="Subscribe to newsletter" hint="We send weekly updates, no spam." />,
      },
      {
        title: "Error",
        Demo: () => <Checkbox label="I agree to the Terms of Service" error="You must accept the terms." />,
      },
      {
        title: "Disabled",
        Demo: () => <Checkbox defaultChecked disabled label="Checked and disabled" />,
      },
      { title: "Indeterminate (select all)", Demo: CheckboxSelectAllDemo },
    ],
  },
  {
    id: "toggle",
    title: "Toggle",
    category: "Forms",
    icon: faToggleOn,
    description: "On/off switch with a themed track.",
    usage: `<Toggle checked={on} onChange={setOn} label="Enable notifications" />`,
    preview: () => <Toggle checked onChange={() => {}} />,
    variants: [
      { title: "Sizes", Demo: ToggleSizesDemo },
      { title: "With description", Demo: ToggleDescriptionDemo },
      { title: "Disabled", Demo: () => <Toggle checked disabled label="Disabled" onChange={() => {}} /> },
      { title: "Settings list (controlled)", Demo: ToggleSettingsListDemo },
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
    id: "toast",
    title: "Toast",
    category: "Feedback",
    icon: faBell,
    description: "Imperative toast() notifications with variants, actions, loading and promise flows.",
    usage: `toast.success("Kaydedildi.")`,
    preview: () => <Button label="toast.success()" size="sm" variant="outline" />,
    variants: [
      {
        title: "Variants",
        Demo: () => (
          <ToastButtons
            items={[
              { label: "success", run: () => toast.success("Kaydedildi.") },
              { label: "info", run: () => toast.info("Güncelleme mevcut.") },
              { label: "warning", run: () => toast.warning("Oturum sona eriyor.") },
              { label: "error", run: () => toast.error("Sunucu hatası.") },
            ]}
          />
        ),
      },
      {
        title: "Title + Message",
        Demo: () => (
          <ToastButtons
            items={[
              { label: "success", run: () => toast.success("Dosya yüklendi.", { title: "Yükleme tamamlandı" }) },
              { label: "error", run: () => toast.error("Sunucuya bağlanılamadı.", { title: "Bağlantı hatası" }) },
            ]}
          />
        ),
      },
      {
        title: "Actions",
        Demo: () => (
          <ToastButtons
            items={[
              {
                label: "info + actions",
                run: () =>
                  toast.info("Öğe silindi.", {
                    title: "Silindi",
                    actions: [
                      { label: "Geri Al", onPress: (dismiss) => dismiss() },
                      { label: "Kalıcı sil", onPress: (d) => d(), variant: "danger" },
                    ],
                  }),
              },
            ]}
          />
        ),
      },
      {
        title: "Loading & Promise",
        Demo: () => (
          <ToastButtons
            items={[
              { label: "loading", run: () => toast.loading("İşleniyor...") },
              {
                label: "promise",
                run: () =>
                  toast.promise(fetchData(), {
                    loading: "Yükleniyor...",
                    success: (data) => `${data.name} hazır.`,
                    error: "Yüklenemedi.",
                  }),
              },
            ]}
          />
        ),
      },
      {
        title: "toast.promise() API",
        Demo: () => (
          <ToastButtons
            items={[
              {
                label: "success path",
                run: () =>
                  toast.promise(fetchUser(), {
                    loading: "Kullanıcı yükleniyor...",
                    success: (u) => `${u.name} (#${u.id}) yüklendi.`,
                    error: (e) => `Hata: ${(e as Error).message}`,
                  }),
              },
              {
                label: "error path",
                run: () =>
                  toast.promise(fetchBroken(), {
                    loading: "İstek gönderiliyor...",
                    success: "Tamamlandı!",
                    error: (e) => `Başarısız: ${(e as Error).message}`,
                  }),
              },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "progress",
    title: "Progress",
    category: "Feedback",
    icon: faBarsProgress,
    description: "Determinate progress as a bar or a circle, in four colours and three sizes.",
    usage: `<Progress value={62} variant="warning" showLabel />`,
    preview: () => <Progress value={62} className="w-44" />,
    // Mirrors KuiReact's Progress showcase variants 1:1 (same titles and values).
    variants: [
      {
        title: "Bar",
        Demo: () => (
          <View className="gap-4">
            <Progress value={30} />
            <Progress value={62} variant="warning" showLabel />
            <Progress value={90} variant="success" size="lg" showLabel />
          </View>
        ),
      },
      {
        title: "Circle",
        Demo: () => (
          <View className="flex-row items-center gap-6">
            <Progress value={40} shape="circle" showLabel />
            <Progress value={75} shape="circle" variant="success" size="lg" showLabel />
          </View>
        ),
      },
    ],
  },
  {
    id: "alert-banner",
    title: "AlertBanner",
    category: "Feedback",
    icon: faCircleExclamation,
    description: "Inline semantic alert with optional title, action and dismiss.",
    usage: `<AlertBanner variant="success" message="Profile updated successfully." dismissible />`,
    preview: () => <AlertBanner variant="info" message="Heads up" className="w-44" />,
    // Mirrors KuiReact's AlertBanner showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Info",
        Demo: () => <AlertBanner variant="info" title="System update" message="A new version is available." dismissible />,
      },
      {
        title: "Success",
        Demo: () => <AlertBanner variant="success" message="Profile updated successfully." dismissible />,
      },
      {
        title: "Warning",
        Demo: () => (
          <AlertBanner variant="warning" title="Maintenance window" message="The service will be unavailable from 2–4 AM UTC." />
        ),
      },
      {
        title: "Error",
        Demo: () => (
          <AlertBanner variant="error" title="Something went wrong" message="Unable to load the resource. Please try again." />
        ),
      },
      {
        title: "With CTA action",
        Demo: () => (
          <AlertBanner
            variant="warning"
            title="Your plan is expiring"
            message="Upgrade before your trial ends."
            action={{ label: "Upgrade now", onPress: () => {} }}
            dismissible
          />
        ),
      },
      {
        title: "Link CTA (action.href)",
        Demo: () => (
          <AlertBanner
            variant="info"
            title="Documentation updated"
            message="New guides are available."
            action={{ label: "Read docs", href: "https://next-js-components.kuray.dev" }}
          />
        ),
      },
      {
        title: "Custom icon",
        Demo: () => <AlertBanner variant="info" message="Custom icon override." icon={<RocketIcon />} />,
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
            action={<Button label="New project" variant="primary" size="sm" />}
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
    id: "tab-group",
    title: "TabGroup",
    category: "Atoms",
    icon: faFolderOpen,
    description: "In-screen tabs with icons, badges, disabled tabs and lazy panels.",
    usage: `<TabGroup label="Account settings" tabs={[{ id: "profile", label: "Profile", content: <Profile /> }]} />`,
    preview: () => (
      <TabGroup
        tabs={[
          { id: "a", label: "Profile", content: null },
          { id: "b", label: "Security", content: null },
        ]}
      />
    ),
    // Mirrors KuiReact's TabGroup showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: () => (
          <TabGroup
            label="Account settings"
            tabs={[
              { id: "profile", label: "Profile", content: <Text variant="bodySm">Profile settings</Text> },
              { id: "security", label: "Security", content: <Text variant="bodySm">Security settings</Text> },
              { id: "billing", label: "Billing", content: <Text variant="bodySm">Billing settings</Text> },
            ]}
          />
        ),
      },
      {
        title: "Icons + badge + disabled",
        Demo: () => (
          <TabGroup
            tabs={[
              { id: "overview", label: "Overview", icon: <TabIcon icon={faChartBar} />, content: <Text variant="bodySm">Overview</Text> },
              {
                id: "analytics",
                label: "Analytics",
                icon: <TabIcon icon={faArrowTrendUp} />,
                badge: <Badge>New</Badge>,
                content: <Text variant="bodySm">Analytics</Text>,
              },
              { id: "settings", label: "Settings", disabled: true, content: <Text variant="bodySm">Settings</Text> },
            ]}
          />
        ),
      },
      {
        title: "Lazy panels",
        Demo: () => (
          <TabGroup
            lazy
            tabs={[
              { id: "light", label: "Light", content: <Text variant="bodySm">Rendered immediately.</Text> },
              { id: "heavy", label: "Heavy", content: <Text variant="bodySm">Rendered on first activation.</Text> },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "drawer",
    title: "Drawer",
    category: "Overlays",
    icon: faTableColumns,
    description: "Full-height side panel with header, scrolling body and footer.",
    usage: `<Drawer open={open} onClose={close} title="Settings" side="right">{children}</Drawer>`,
    preview: () => <Button label="Open drawer" size="sm" variant="outline" />,
    variants: [
      { title: "Right drawer", Demo: DrawerRightDemo },
      { title: "Left drawer", Demo: DrawerLeftDemo },
      { title: "Route-aware close (M6 stub)", Demo: DrawerRouteAwareDemo },
    ],
  },
  {
    id: "popover",
    title: "Popover",
    category: "Overlays",
    icon: faCommentDots,
    description: "Anchored panel toggled by its trigger; tap outside or Android back to close.",
    usage: `<Popover trigger={<Button variant="outline">Open</Button>}>{content}</Popover>`,
    preview: () => <Button variant="outline" size="sm">Open</Button>,
    // Mirrors KuiReact's Popover showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Bottom (default)",
        Demo: () => (
          <Popover trigger={<Button variant="outline">Open</Button>} placement="bottom">
            <View className="p-4">
              <Text className="text-sm font-semibold text-text-primary">Title</Text>
              <Text className="text-xs text-text-secondary">Content goes here.</Text>
            </View>
          </Popover>
        ),
      },
      {
        title: "Placements",
        Demo: () => (
          <View className="flex-row flex-wrap gap-2">
            <Popover placement="top" trigger={<Button>Top</Button>}>
              <View className="p-4">
                <Text variant="bodySm">…</Text>
              </View>
            </Popover>
            <Popover placement="right" trigger={<Button>Right</Button>}>
              <View className="p-4">
                <Text variant="bodySm">…</Text>
              </View>
            </Popover>
          </View>
        ),
      },
      {
        title: "Focus trap inside Popover",
        Demo: () => (
          <Popover focusTrap placement="bottom" trigger={<Button>Quick edit</Button>}>
            <View className="w-64 gap-3 p-4">
              <Input placeholder="Title" />
              <Input placeholder="Tag" />
              <Button>Save</Button>
            </View>
          </Popover>
        ),
      },
    ],
  },
  {
    id: "dropdown-menu",
    title: "DropdownMenu",
    category: "Overlays",
    icon: faEllipsisVertical,
    description: "Action menu with icons, separators, danger and disabled items.",
    usage: `<DropdownMenu trigger={<Button variant="outline" size="sm">Actions ▾</Button>} items={items} />`,
    preview: () => <Button variant="outline" size="sm">Actions ▾</Button>,
    // Mirrors KuiReact's DropdownMenu showcase variants 1:1 (same titles, glyphs and copy).
    variants: [
      {
        title: "Default",
        Demo: () => (
          <DropdownMenu
            trigger={<Button variant="outline" size="sm">Actions ▾</Button>}
            items={[
              { label: "Edit", icon: "✏" },
              { label: "Duplicate", icon: "⧉" },
              { type: "separator" },
              { label: "Delete", icon: "🗑", danger: true },
            ]}
          />
        ),
      },
      {
        title: "Right-aligned",
        Demo: () => (
          <View className="items-end">
            <DropdownMenu
              align="right"
              trigger={<Button variant="ghost" size="sm">⋮</Button>}
              items={[{ label: "View details" }, { label: "Remove", danger: true }]}
            />
          </View>
        ),
      },
    ],
  },
  {
    id: "tooltip",
    title: "Tooltip",
    category: "Overlays",
    icon: faMessage,
    description: "Short hint shown on long-press (hover/focus on web), with themes, arrow and delay.",
    usage: `<Tooltip content="Help text"><Button variant="outline" size="sm">Hover me</Button></Tooltip>`,
    preview: () => <Button variant="outline" size="sm">Hover me</Button>,
    // Mirrors KuiReact's Tooltip showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Placements",
        Demo: () => (
          <View className="pt-8">
            <Tooltip content="Help text" placement="top">
              <Button variant="outline" size="sm">Hover me</Button>
            </Tooltip>
          </View>
        ),
      },
      {
        title: "Themes",
        Demo: () => (
          <View className="pt-8">
            <Tooltip content="Dark theme" theme="dark">
              <Button>Dark</Button>
            </Tooltip>
          </View>
        ),
      },
      {
        title: "Arrow + Delay",
        Demo: () => (
          <View className="flex-row gap-2 pt-8">
            <Tooltip content="With arrow" arrow placement="top">
              <Button>Arrow</Button>
            </Tooltip>
            <Tooltip content="500ms delay" delay={500}>
              <Button>Delayed</Button>
            </Tooltip>
          </View>
        ),
      },
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
