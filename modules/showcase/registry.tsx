import { useRef, useState, type ComponentType } from "react";
import { View } from "react-native";
import { countries, getEmojiFlag, type TCountryCode } from "countries-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faTableCellsColumnLock,
  faClock,
  faPalette,
  faSitemap,
  faGauge,
  faScroll,
  faTableCells,
  faImages,
  faTable,
  faFileArrowUp,
  faListUl as faComboBox,
  faHashtag as faTagsInput,
  faTimeline,
  faStar,
  faChartSimple,
  faHashtag,
  faTableList,
  faCube,
  faCircleQuestion,
  faCalendarDays,
  faCalendarWeek,
  faSliders,
  faTags,
  faHeading,
  faShoePrints,
  faListOl,
  faAnglesRight,
  faListCheck,
  faTableCellsLarge,
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
  Accordion,
  ButtonGroup,
  CheckboxGroup,
  SearchBar,
  Pagination,
  Breadcrumb,
  Stepper,
  PageHeader,
  MultiSelect,
  RangeSlider,
  DatePicker,
  DateRangePicker,
  type DateRange,
  BrandLogo,
  Popconfirm,
  StarRating,
  StatCard,
  Statistic,
  TabButton,
  Timeline,
  TagInput,
  ComboBox,
  type ComboBoxOption,
  FileInput,
  Table,
  TimePicker,
  Slider,
  ContentScoreBar,
  ScrollArea,
  ViewToggle,
  TreeView,
  ColorPicker,
  DataTable,
  type DataTableFetchArgs,
  type DataTableFetchResult,
  type ScoreRule,
  type ViewOrientation,
} from "@/modules/ui";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
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
// KuiReact's "bg-gradient-to-br from-X to-Y" slide tiles (NativeWind can't draw gradients).
function GradientTile({ from, to, label }: { from: string; to: string; label: string }) {
  const t = useThemeTokens();
  const id = `g-${from}-${to}`;
  return (
    <View className="h-40 items-center justify-center overflow-hidden rounded-xl">
      <Svg width="100%" height="100%" style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={t[from]} />
            <Stop offset="1" stopColor={t[to]} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
      <Text className="text-lg font-semibold text-white">{label}</Text>
    </View>
  );
}
type ServerUser = { id: string; name: string; email: string; team: string; joined: string; [key: string]: unknown };
const SERVER_USERS: ServerUser[] = Array.from({ length: 32 }, (_, i) => ({
  id: `u-${i + 1}`,
  name: ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank", "Grace", "Hank"][i % 8] + ` #${i + 1}`,
  email: `user${i + 1}@example.com`,
  team: ["Platform", "Growth", "Ops", "Design"][i % 4],
  joined: `2024-${String((i % 12) + 1).padStart(2, "0")}-15`,
}));
function serverFetchPage(args: DataTableFetchArgs): Promise<DataTableFetchResult<ServerUser>> {
  return new Promise((resolve) => {
    // Simulate latency.
    setTimeout(() => {
      let filtered = SERVER_USERS;
      const q = args.search.trim().toLowerCase();
      if (q) filtered = filtered.filter((u) => [u.name, u.email, u.team, u.joined].some((v) => v.toLowerCase().includes(q)));
      if (args.sort.length) {
        filtered = [...filtered].sort((a, b) => {
          for (const s of args.sort) {
            const cmp = String(a[s.key] ?? "").localeCompare(String(b[s.key] ?? ""), undefined, { numeric: true });
            if (cmp !== 0) return s.dir === "asc" ? cmp : -cmp;
          }
          return 0;
        });
      }
      const start = (args.page - 1) * args.pageSize;
      resolve({ rows: filtered.slice(start, start + args.pageSize), total: filtered.length });
    }, 200);
  });
}
const COMBO_OPTIONS: ComboBoxOption[] = [
  { value: "nextjs", label: "Next.js", description: "App Router framework" },
  { value: "react", label: "React", description: "UI library for components" },
  { value: "typescript", label: "TypeScript", description: "Typed JavaScript" },
  { value: "tailwind", label: "Tailwind CSS", description: "Utility-first CSS toolkit" },
  { value: "storybook", label: "Storybook", description: "Component documentation workspace" },
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
    id: "search-bar",
    title: "SearchBar",
    category: "Forms",
    icon: faMagnifyingGlass,
    description: "Searchbox with search icon and clear button. Works in controlled and uncontrolled modes.",
    usage: `<SearchBar placeholder="Search components…" value={q} onChange={setQ} />`,
    preview: () => <SearchBar className="w-full" placeholder="Search components…" />,
    // Mirrors KuiReact's SearchBar showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: () => (
          <View className="w-full max-w-xs">
            <SearchBar placeholder="Search components…" />
          </View>
        ),
      },
      {
        title: "With value",
        Demo: () => (
          <View className="w-full max-w-xs">
            <SearchBar value="Button" onChange={() => {}} />
          </View>
        ),
      },
      {
        title: "Loading state",
        Demo: function SearchLoadingDemo() {
          const [q, setQ] = useState("react");
          const [loading, setLoading] = useState(false);
          const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
          function handleChange(v: string) {
            setQ(v);
            setLoading(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setLoading(false), 800);
          }
          return (
            <View className="w-full max-w-xs gap-2">
              <SearchBar value={q} onChange={handleChange} placeholder="Search…" />
              {loading ? (
                <View className="flex-row items-center gap-1.5">
                  <Spinner size="xs" />
                  <Text className="text-xs text-text-secondary">Searching…</Text>
                </View>
              ) : q ? (
                <Text className="text-xs text-text-secondary">Found 24 results for “{q}”</Text>
              ) : null}
            </View>
          );
        },
      },
      {
        title: "With results count",
        Demo: function ResultsSearchDemo() {
          const ITEMS = ["Button", "Badge", "Avatar", "Card", "Input", "Select", "Textarea", "Tooltip", "Modal", "Drawer"];
          const [q, setQ] = useState("");
          const filtered = q ? ITEMS.filter((n) => n.toLowerCase().includes(q.toLowerCase())) : ITEMS;
          return (
            <View className="w-full max-w-xs gap-2">
              <SearchBar value={q} onChange={setQ} placeholder="Filter components…" />
              <Text className="text-xs text-text-secondary">
                {filtered.length} of {ITEMS.length} components
              </Text>
              <View className="gap-1">
                {filtered.slice(0, 4).map((name) => (
                  <Text key={name} className="rounded px-2 py-1 text-sm text-text-primary">
                    {name}
                  </Text>
                ))}
                {filtered.length > 4 ? (
                  <Text className="px-2 text-xs text-text-secondary">+{filtered.length - 4} more…</Text>
                ) : null}
              </View>
            </View>
          );
        },
      },
    ],
  },
  {
    id: "multi-select",
    title: "MultiSelect",
    category: "Forms",
    icon: faTags,
    description: "Chip-based multi-select popover with searchable filter and disabled-option support.",
    usage: `<MultiSelect id="tags" label="Tags" options={options} value={v} onChange={setV} />`,
    preview: () => <MultiSelect id="ms-preview" label="Frameworks" options={[{ value: "react", label: "React" }]} value={["react"]} />,
    // Mirrors KuiReact's MultiSelect showcase variants 1:1 (same titles and
    // copy; country flags are emoji, as in KuiReact's own code sample).
    variants: [
      {
        title: "Controlled",
        Demo: function MultiSelectDemo() {
          const [v, setV] = useState<string[]>([]);
          return (
            <MultiSelect
              id="ms-demo"
              label="Frameworks"
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "svelte", label: "Svelte" },
                { value: "angular", label: "Angular" },
              ]}
              value={v}
              onChange={setV}
              placeholder="Pick frameworks…"
            />
          );
        },
      },
      {
        title: "With error",
        Demo: () => (
          <MultiSelect
            id="ms-err"
            label="Tags"
            options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]}
            error="Please select at least one tag."
          />
        ),
      },
      {
        title: "With countries",
        Demo: function CountryMultiSelectDemo() {
          const [v, setV] = useState<string[]>([]);
          return (
            <View className="w-full max-w-sm gap-1">
              <MultiSelect
                id="cms-demo"
                label="Countries"
                options={COUNTRY_OPTIONS}
                placeholder="Select countries…"
                value={v}
                onChange={setV}
                hint="Select one or more countries."
              />
              {v.length > 0 ? <Text className="text-xs text-text-secondary">Selected: {v.join(", ")}</Text> : null}
            </View>
          );
        },
      },
      {
        title: "Searchable",
        Demo: function SearchableMultiSelectDemo() {
          const [v, setV] = useState<string[]>([]);
          return (
            <MultiSelect
              id="ms-search"
              label="Countries"
              searchable
              options={COUNTRY_OPTIONS}
              placeholder="Search and select…"
              value={v}
              onChange={setV}
              hint="Type to filter the list."
            />
          );
        },
      },
    ],
  },
  {
    id: "range-slider",
    title: "RangeSlider",
    category: "Forms",
    icon: faSliders,
    description: "Numeric range input. Single-handle by default, or `range` for a dual-handle min/max selector.",
    usage: `<RangeSlider label="Volume" value={v} onChange={setV} />`,
    preview: () => <RangeSlider className="w-full" value={40} onChange={() => {}} showValue={false} />,
    // Mirrors KuiReact's RangeSlider showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Single value",
        Demo: function RangeSliderSingleDemo() {
          const [v, setV] = useState(40);
          return <RangeSlider label="Volume" value={v} onChange={setV} className="w-full max-w-xs" />;
        },
      },
      {
        title: "Dual handle (range)",
        Demo: function RangeSliderDualDemo() {
          const [v, setV] = useState<[number, number]>([20, 70]);
          return <RangeSlider range label="Price range" value={v} onChange={setV} min={0} max={100} className="w-full max-w-xs" />;
        },
      },
    ],
  },
  {
    id: "date-picker",
    title: "DatePicker",
    category: "Forms",
    icon: faCalendarDays,
    description: "Popover date picker with a locale-aware calendar grid (TR / EN), quick month / year jump from the header, and min / max / disabledDates support.",
    usage: `<DatePicker id="date" label="Appointment date" hint="Select a future date." value={date} onChange={setDate} />`,
    preview: () => <DatePicker id="dp-preview" value={null} onChange={() => {}} locale="en" />,
    // Mirrors KuiReact's DatePicker showcase variants 1:1 (same titles, copy and dates).
    variants: [
      {
        title: "Default",
        Demo: function DatePickerDefaultDemo() {
          const [d, setD] = useState<Date | null>(null);
          return (
            <View className="w-full max-w-xs">
              <DatePicker id="sc-dp-default" label="Appointment date" hint="Select a future date." value={d} onChange={setD} />
            </View>
          );
        },
      },
      {
        title: "With value",
        Demo: function DatePickerValueDemo() {
          const [d, setD] = useState<Date | null>(new Date("2026-06-15"));
          return (
            <View className="w-full max-w-xs">
              <DatePicker id="sc-dp-val" label="Start date" value={d} onChange={setD} />
            </View>
          );
        },
      },
      {
        title: "Error / Disabled",
        Demo: function DatePickerErrorDemo() {
          const [a, setA] = useState<Date | null>(null);
          const [b, setB] = useState<Date | null>(new Date("2026-01-01"));
          return (
            <View className="w-full max-w-xs gap-3">
              <DatePicker id="sc-dp-err" label="Due date" error="Please select a date." required value={a} onChange={setA} />
              <DatePicker id="sc-dp-dis" label="Locked date" value={b} onChange={setB} disabled />
            </View>
          );
        },
      },
      {
        title: "Locale: Türkçe + custom messages",
        Demo: function DatePickerTrDemo() {
          const [d, setD] = useState<Date | null>(new Date("2026-05-26"));
          return (
            <View className="w-full max-w-xs">
              <DatePicker
                id="sc-dp-tr"
                label="Randevu tarihi"
                hint="Lütfen ileri bir tarih seçin."
                locale="tr"
                value={d}
                onChange={setD}
                messages={{ today: "Bugün seç", clear: "Temizle" }}
              />
            </View>
          );
        },
      },
    ],
  },
  {
    id: "date-range-picker",
    title: "DateRangePicker",
    category: "Forms",
    icon: faCalendarWeek,
    description: "Two-month popover for picking a start → end date range. Shares the same Calendar core as DatePicker; locale-aware, with min/max/disabledDates.",
    usage: `<DateRangePicker id="range" label="Select date range" value={range} onChange={setRange} />`,
    preview: () => <DateRangePicker id="dr-preview" value={null} onChange={() => {}} locale="en" />,
    // Mirrors KuiReact's DateRangePicker showcase variants 1:1 (same titles,
    // copy and dates), including its "Time picker" variant.
    variants: [
      {
        title: "Date range",
        Demo: function DateRangeDemo() {
          const [range, setRange] = useState<DateRange>({ start: null, end: null });
          return <DateRangePicker id="dr-demo" label="Select date range" value={range} onChange={setRange} />;
        },
      },
      {
        title: "With value (EN locale)",
        Demo: function DateRangeValueDemo() {
          const [range, setRange] = useState<DateRange>({ start: new Date("2026-06-01"), end: new Date("2026-06-15") });
          return <DateRangePicker id="dr-val" label="Booking window" value={range} onChange={setRange} locale="en" />;
        },
      },
      {
        title: "Time picker",
        Demo: function TimePickerDemo() {
          const [t, setT] = useState("09:00");
          return <TimePicker id="tp-demo" label="Meeting time" value={t} onChange={setT} hint="24-hour format" />;
        },
      },
    ],
  },
  {
    id: "tag-input",
    title: "TagInput",
    category: "Forms",
    icon: faTagsInput,
    description: "Free-text input that creates chips. Add tags with Enter or comma, double-tap to edit, Backspace to delete. Duplicates are ignored.",
    usage: `<TagInput id="tags" label="Tags" value={tags} onChange={setTags} hint="Press Enter or comma to add." />`,
    preview: () => <TagInput id="ti-preview" label="Tags" value={["react"]} onChange={() => {}} hint=" " />,
    // Mirrors KuiReact's TagInput showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: function TagInputDemo() {
          const [tags, setTags] = useState<string[]>(["next.js", "react"]);
          return (
            <View className="w-full max-w-sm">
              <TagInput id="sc-ti-default" label="Tags" value={tags} onChange={setTags} hint="Press Enter or comma to add. Double-click to edit." />
            </View>
          );
        },
      },
      {
        title: "Empty / Error",
        Demo: function TagInputErrorDemo() {
          const [tags, setTags] = useState<string[]>([]);
          return (
            <View className="w-full max-w-sm">
              <TagInput id="sc-ti-err" label="Required tags" value={tags} onChange={setTags} error="At least one tag is required." />
            </View>
          );
        },
      },
    ],
  },
  {
    id: "combo-box",
    title: "ComboBox",
    category: "Forms",
    icon: faComboBox,
    description: "Searchable autocomplete single-select with described options and a clearable button.",
    usage: `<ComboBox id="framework" label="Framework" options={options} value={value} onChange={setValue} />`,
    preview: () => <ComboBox id="cb-preview" label="Framework" options={COMBO_OPTIONS} value="nextjs" />,
    // Mirrors KuiReact's ComboBox showcase variants 1:1 (same titles, data and
    // copy). Hermes has no DOMException, so the debounced demo rejects with
    // an Error named "AbortError" (which useAsync treats the same way).
    variants: [
      {
        title: "Controlled selection",
        Demo: function ComboBoxDemo() {
          const [value, setValue] = useState("nextjs");
          return (
            <View className="w-full max-w-sm gap-1">
              <ComboBox id="cb-demo" label="Framework" options={COMBO_OPTIONS} value={value} onChange={setValue} hint="Search or pick from the list." />
              <Text className="text-xs text-text-secondary">Selected: {value || "none"}</Text>
            </View>
          );
        },
      },
      {
        title: "Async search",
        Demo: function AsyncComboBoxDemo() {
          const [value, setValue] = useState("");
          async function search(query: string) {
            const normalized = query.trim().toLowerCase();
            await new Promise((resolve) => setTimeout(resolve, 250));
            if (!normalized) return COMBO_OPTIONS;
            return COMBO_OPTIONS.filter((opt) => opt.label.toLowerCase().includes(normalized) || opt.description?.toLowerCase().includes(normalized));
          }
          return (
            <View className="w-full max-w-sm gap-1">
              <ComboBox id="cb-async" label="Async search" options={COMBO_OPTIONS} value={value} onChange={setValue} onSearch={search} placeholder="Type to search..." />
              <Text className="text-xs text-text-secondary">Selected: {value || "none"}</Text>
            </View>
          );
        },
      },
      {
        title: "Debounced async suggestions",
        Demo: function DebouncedAsyncComboBoxDemo() {
          const [value, setValue] = useState("");
          const POOL: ComboBoxOption[] = [
            { value: "react", label: "React", description: "UI library" },
            { value: "react-dom", label: "React DOM", description: "DOM renderer" },
            { value: "react-native", label: "React Native", description: "Mobile bindings" },
            { value: "react-router", label: "React Router", description: "Client routing" },
            { value: "next", label: "Next.js", description: "React framework" },
            { value: "remix", label: "Remix", description: "Full-stack React" },
            { value: "redwood", label: "RedwoodJS", description: "Full-stack JS" },
            { value: "astro", label: "Astro", description: "Content sites" },
            { value: "svelte", label: "Svelte", description: "Compiler-driven UI" },
            { value: "solid", label: "SolidJS", description: "Fine-grained reactivity" },
          ];
          async function suggest(query: string, signal?: AbortSignal): Promise<ComboBoxOption[]> {
            const q = query.trim().toLowerCase();
            await new Promise((resolve, reject) => {
              const t = setTimeout(resolve, 350);
              signal?.addEventListener("abort", () => {
                clearTimeout(t);
                reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
              });
            });
            if (!q) return POOL.slice(0, 5);
            return POOL.filter((p) => p.label.toLowerCase().includes(q));
          }
          return (
            <View className="w-full max-w-sm gap-1">
              <ComboBox
                id="cb-async-debounced"
                label="Debounced suggestions"
                options={[]}
                value={value}
                onChange={setValue}
                onSearch={suggest}
                debounceMs={300}
                placeholder="Try typing 'react'…"
                hint="Debounced 300ms, AbortController cancels in-flight, 5-min cache."
              />
              <Text className="text-xs text-text-secondary">Selected: {value || "none"}</Text>
            </View>
          );
        },
      },
    ],
  },
  {
    id: "file-input",
    title: "FileInput",
    category: "Forms",
    icon: faFileArrowUp,
    description: "File picker with MIME / extension validation, size and count limits, a selected-files list and an optional upload action.",
    usage: `<FileInput id="photo" label="Profile photo" accept="image/*" maxSizeBytes={2 * 1024 * 1024} />`,
    preview: () => <FileInput id="fi-preview" />,
    // Mirrors KuiReact's FileInput showcase variants 1:1 (same titles and
    // copy). KuiReact's "Paste from clipboard" variant needs clipboard file
    // paste, which has no RN equivalent, so it isn't reproduced.
    variants: [
      {
        title: "Single file",
        Demo: () => <FileInput id="fi-single" label="Profile photo" hint="PNG or JPG, max 2 MB" accept="image/*" maxSizeBytes={2 * 1024 * 1024} />,
      },
      {
        title: "Multiple files",
        Demo: () => <FileInput id="fi-multi" label="Attachments" multiple hint="Up to 5 MB each" maxSizeBytes={5 * 1024 * 1024} />,
      },
      {
        title: "With upload action",
        Demo: () => (
          <FileInput
            id="fi-upload"
            label="Project attachments"
            multiple
            hint="Up to 5 MB each"
            maxSizeBytes={5 * 1024 * 1024}
            onUpload={async () => {
              await new Promise((res) => setTimeout(res, 800));
            }}
            uploadLabel="Upload"
          />
        ),
      },
      {
        title: "Disabled",
        Demo: () => <FileInput id="fi-disabled" label="Disabled upload" disabled />,
      },
    ],
  },
  {
    id: "color-picker",
    title: "ColorPicker",
    category: "Forms",
    icon: faPalette,
    description: "Popover colour picker: swatch grid, hex field, a native-style hue picker, a no-colour option and an optional HEX/RGBA/HSLA/HWB/OKLCH format switcher.",
    usage: `<ColorPicker label="Brand color" value={c} onChange={setC} showNoColor />`,
    preview: () => <ColorPicker value="#3b82f6" onChange={() => {}} />,
    // Mirrors KuiReact's ColorPicker showcase variants 1:1 (same titles and
    // props). The native picker (<input type="color">) is a hue strip on RN.
    variants: [
      {
        title: "Default",
        Demo: function ColorPickerDemo() {
          const [c, setC] = useState<string | null>("#3b82f6");
          return <ColorPicker label="Brand color" value={c} onChange={setC} showNoColor />;
        },
      },
      {
        title: "Compact (swatches only)",
        Demo: function ColorPickerCompactDemo() {
          const [c, setC] = useState<string | null>("#22c55e");
          return <ColorPicker value={c} onChange={setC} showHexInput={false} showNativePicker={false} />;
        },
      },
      {
        title: "Hex + native picker only (no swatches)",
        Demo: function ColorPickerNativeDemo() {
          const [c, setC] = useState<string | null>(null);
          return <ColorPicker label="Background" value={c} onChange={setC} showNoColor showHexInput showNativePicker swatches={[]} />;
        },
      },
      {
        title: "Format switcher — HEX / RGBA / HSLA / HWB / OKLCH (M1)",
        Demo: function ColorPickerFormatSwitcherDemo() {
          const [c, setC] = useState<string | null>("#3b82f6");
          return <ColorPicker label="Theme color" value={c} onChange={setC} showFormatSwitcher defaultFormat="hex" showHexInput={false} showNativePicker />;
        },
      },
    ],
  },
  {
    id: "time-picker",
    title: "TimePicker",
    category: "Forms",
    icon: faClock,
    description: "Time field with label/hint/error slots, matching the Input/DatePicker pattern. Hour/minute only.",
    usage: `<TimePicker id="time" label="Meeting time" value={t} onChange={setT} hint="24-hour format" />`,
    preview: () => <TimePicker id="tp-preview" label="Time" value="09:00" onChange={() => {}} />,
    // Mirrors KuiReact's TimePicker showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: function TimePickerDemo() {
          const [t, setT] = useState("09:00");
          return <TimePicker id="tp-standalone" label="Meeting time" value={t} onChange={setT} hint="24-hour format" />;
        },
      },
      {
        title: "Required / error",
        Demo: function TimePickerErrorDemo() {
          const [t, setT] = useState("");
          return <TimePicker id="tp-error" label="Pickup time" required error="Pickup time is required." value={t} onChange={setT} />;
        },
      },
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
    id: "checkbox-group",
    title: "CheckboxGroup",
    category: "Forms",
    icon: faListCheck,
    description: "Chip-style multi-select group. Selected chips use bg-primary-subtle / border-primary tokens.",
    usage: `<CheckboxGroup legend="Tech stack" options={options} selected={sel} onChange={setSel} />`,
    preview: () => (
      <CheckboxGroup legend="Tech stack" options={[{ value: "react", label: "React" }, { value: "vue", label: "Vue" }]} selected={["react"]} onChange={() => {}} />
    ),
    // Mirrors KuiReact's CheckboxGroup showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: function CheckboxGroupDemo() {
          const [sel, setSel] = useState<string[]>(["react", "typescript"]);
          return (
            <CheckboxGroup
              legend="Tech stack"
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "angular", label: "Angular" },
                { value: "typescript", label: "TypeScript" },
                { value: "javascript", label: "JavaScript" },
                { value: "nodejs", label: "Node.js" },
              ]}
              selected={sel}
              onChange={setSel}
            />
          );
        },
      },
      {
        title: "Disabled",
        Demo: () => (
          <CheckboxGroup
            legend="Permissions"
            options={[{ value: "read", label: "Read" }, { value: "write", label: "Write" }, { value: "delete", label: "Delete" }]}
            selected={["read"]}
            onChange={() => {}}
            disabled
          />
        ),
      },
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
    id: "accordion",
    title: "Accordion",
    category: "Atoms",
    icon: faBars,
    description: "Vertically stacked, collapsible content panels. Single-open by default, or `allowMultiple` for independent panels.",
    usage: `<Accordion items={[{ id: "shipping", title: "Shipping", content: "..." }]} defaultOpenIds={["shipping"]} />`,
    preview: () => (
      <Accordion className="w-full" items={[{ id: "a", title: "Shipping", content: "" }, { id: "b", title: "Returns", content: "" }]} />
    ),
    // Mirrors KuiReact's Accordion showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Single open (default)",
        Demo: () => (
          <Accordion
            className="w-full max-w-md"
            items={[
              { id: "shipping", title: "Shipping", content: "Orders ship within 2 business days via standard carrier." },
              { id: "returns", title: "Returns", content: "Free returns within 30 days of delivery, unworn and with tags." },
              { id: "warranty", title: "Warranty", content: "Covered by a 1-year limited manufacturer warranty.", disabled: true },
            ]}
            defaultOpenIds={["shipping"]}
          />
        ),
      },
      {
        title: "Allow multiple open",
        Demo: () => (
          <Accordion
            className="w-full max-w-md"
            allowMultiple
            items={[
              { id: "a", title: "Section A", content: "Content for section A." },
              { id: "b", title: "Section B", content: "Content for section B." },
            ]}
            defaultOpenIds={["a", "b"]}
          />
        ),
      },
    ],
  },
  {
    id: "button-group",
    title: "ButtonGroup",
    category: "Atoms",
    icon: faTableCellsLarge,
    description: "Segmented button group for mutually-exclusive options. Supports 4 variants, 4 sizes and disabled items.",
    usage: `<ButtonGroup value={v} onChange={setV} items={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }]} />`,
    preview: () => (
      <ButtonGroup value="week" onChange={() => {}} size="sm" items={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }]} />
    ),
    // Mirrors KuiReact's ButtonGroup showcase variants 1:1 (same titles, glyphs and copy).
    variants: [
      {
        title: "Outline (default)",
        Demo: function ButtonGroupDemo() {
          const [v, setV] = useState("week");
          return (
            <ButtonGroup
              value={v}
              onChange={setV}
              items={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]}
            />
          );
        },
      },
      {
        title: "Sizes",
        Demo: () => (
          <View className="flex-row flex-wrap items-center gap-4">
            {(["xs", "sm", "md", "lg"] as const).map((s) => (
              <ButtonGroup
                key={s}
                value="a"
                onChange={() => {}}
                size={s}
                items={[{ value: "a", label: "A" }, { value: "b", label: "B" }, { value: "c", label: "C" }]}
              />
            ))}
          </View>
        ),
      },
      {
        title: "Primary / secondary / ghost",
        Demo: () => (
          <View className="gap-3">
            {(["primary", "secondary", "ghost"] as const).map((variant) => (
              <View key={variant} className="gap-1.5">
                <Text className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {variant[0].toUpperCase() + variant.slice(1)}
                </Text>
                <ButtonGroup
                  value="week"
                  onChange={() => {}}
                  variant={variant}
                  items={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]}
                />
              </View>
            ))}
          </View>
        ),
      },
      {
        title: "With disabled item",
        Demo: () => (
          <ButtonGroup
            value="week"
            onChange={() => {}}
            items={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month", disabled: true },
            ]}
          />
        ),
      },
      {
        title: "Icon-style labels",
        Demo: () => (
          <View className="flex-row flex-wrap items-center gap-4">
            <ButtonGroup
              value="grid"
              onChange={() => {}}
              items={[{ value: "list", label: "☰" }, { value: "grid", label: "⊞" }, { value: "map", label: "◫" }]}
            />
            <ButtonGroup
              value="center"
              onChange={() => {}}
              variant="secondary"
              items={[{ value: "left", label: "⇤" }, { value: "center", label: "↔" }, { value: "right", label: "⇥" }]}
            />
          </View>
        ),
      },
    ],
  },
  {
    id: "pagination",
    title: "Pagination",
    category: "Atoms",
    icon: faAnglesRight,
    description: "Page navigation control. Collapses large page counts with ellipsis; the current page is announced as selected.",
    usage: `<Pagination page={page} totalPages={10} onPageChange={setPage} />`,
    preview: () => <Pagination page={2} totalPages={5} onPageChange={() => {}} size="sm" />,
    // Mirrors KuiReact's Pagination showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: function PaginationDemo() {
          const [page, setPage] = useState(1);
          return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
        },
      },
      {
        title: "Sizes",
        Demo: function SizesDemo() {
          const [p, setP] = useState(3);
          return (
            <View className="gap-3">
              {(["sm", "md", "lg"] as const).map((s) => (
                <Pagination key={s} page={p} totalPages={10} onPageChange={setP} size={s} />
              ))}
            </View>
          );
        },
      },
      {
        title: "First / Last + Jump to page",
        Demo: function FullDemo() {
          const [p, setP] = useState(5);
          return <Pagination page={p} totalPages={20} onPageChange={setP} showFirstLast showJumpTo />;
        },
      },
    ],
  },
  {
    id: "stepper",
    title: "Stepper",
    category: "Atoms",
    icon: faListOl,
    description: "Multi-step progress indicator with complete, active, error, and pending states. Supports horizontal and vertical orientations.",
    usage: `<Stepper steps={[{ label: "Account", state: "complete" }, { label: "Billing", state: "active" }]} />`,
    preview: () => (
      <Stepper className="w-full" steps={[{ label: "Account", state: "complete" }, { label: "Billing", state: "active" }, { label: "Review" }]} />
    ),
    // Mirrors KuiReact's Stepper showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Horizontal",
        Demo: () => (
          <View className="w-full">
            <Stepper
              steps={[
                { label: "Account", description: "Personal info", state: "complete" },
                { label: "Billing", description: "Payment method", state: "active" },
                { label: "Review", state: "pending" },
                { label: "Confirm", state: "pending" },
              ]}
            />
          </View>
        ),
      },
      {
        title: "Vertical",
        Demo: () => (
          <Stepper
            orientation="vertical"
            steps={[
              { label: "Create account", description: "Enter your email and password", state: "complete" },
              { label: "Verify email", description: "Check your inbox", state: "error" },
              { label: "Set up profile", state: "pending" },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    category: "Atoms",
    icon: faShoePrints,
    description: "Hierarchical navigation trail. The last item is the current page; separators are hidden from screen readers.",
    usage: `<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Breadcrumb" }]} />`,
    preview: () => <Breadcrumb items={[{ label: "Home" }, { label: "Components" }, { label: "Breadcrumb" }]} />,
    // Mirrors KuiReact's Breadcrumb showcase variants 1:1 (same titles, copy
    // and hrefs — most of those routes don't exist in this app, so pressing
    // them lands on expo-router's not-found screen).
    variants: [
      {
        title: "Default",
        Demo: () => <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Components", href: "/components" }, { label: "Breadcrumb" }]} />,
      },
      {
        title: "Long path",
        Demo: () => (
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Users", href: "/users" },
              { label: "Settings", href: "/users/settings" },
              { label: "Permissions" },
            ]}
          />
        ),
      },
      {
        title: "Custom separator",
        Demo: () => (
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Post title" }]}
            separator={<Text className="text-sm text-text-disabled">/</Text>}
          />
        ),
      },
      {
        title: "Overflow / ellipsis",
        Demo: () => (
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Electronics", href: "/products/electronics" },
              { label: "Computers", href: "/products/electronics/computers" },
              { label: "Laptops", href: "/products/electronics/computers/laptops" },
              { label: 'MacBook Pro 16"' },
            ]}
            maxItems={3}
          />
        ),
      },
    ],
  },
  {
    id: "page-header",
    title: "PageHeader",
    category: "Atoms",
    icon: faHeading,
    description: "Page title + subtitle + optional badge + action buttons. Supports 5 button variants (primary/secondary/outline/danger/ghost); href actions navigate.",
    usage: `<PageHeader title="Users" subtitle="Manage your team." actions={[{ label: "Export", variant: "outline" }]} />`,
    preview: () => <PageHeader className="w-full" title="Users" actions={[{ label: "Invite" }]} />,
    // Mirrors KuiReact's PageHeader showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "With actions",
        Demo: () => (
          <View className="w-full">
            <PageHeader
              title="Users"
              subtitle="Manage your team members and their permissions."
              badge={<Badge variant="info">48 members</Badge>}
              actions={[
                { label: "Export", variant: "outline" },
                { label: "+ Invite user", variant: "primary" },
              ]}
            />
          </View>
        ),
      },
      {
        title: "Danger action",
        Demo: () => (
          <View className="w-full">
            <PageHeader
              title="Danger Zone"
              subtitle="Irreversible actions. Proceed with caution."
              actions={[
                { label: "Archive", variant: "outline" },
                { label: "Delete project", variant: "danger" },
              ]}
            />
          </View>
        ),
      },
      {
        title: "Minimal",
        Demo: () => (
          <View className="w-full">
            <PageHeader title="Settings" subtitle="Configure your workspace preferences." />
          </View>
        ),
      },
    ],
  },
  {
    id: "brand-logo",
    title: "BrandLogo",
    category: "Atoms",
    icon: faCube,
    description: "Square brand mark with rounded corners. Renders a single letter or short token on a primary-coloured tile. 5 sizes (sm → 2xl).",
    usage: `<BrandLogo size="md">B</BrandLogo>`,
    preview: () => <BrandLogo size="sm">K</BrandLogo>,
    // Mirrors KuiReact's BrandLogo showcase variants 1:1 (same titles and content).
    variants: [
      {
        title: "Default sizes",
        Demo: () => (
          <View className="flex-row items-end gap-3">
            <BrandLogo size="sm">A</BrandLogo>
            <BrandLogo size="md">B</BrandLogo>
            <BrandLogo size="lg">C</BrandLogo>
            <BrandLogo size="xl">D</BrandLogo>
            <BrandLogo size="2xl">E</BrandLogo>
          </View>
        ),
      },
      {
        title: "Custom content",
        Demo: () => (
          <View className="flex-row items-center gap-3">
            <BrandLogo size="lg">KU</BrandLogo>
            <BrandLogo size="lg" className="bg-secondary">
              N
            </BrandLogo>
            <BrandLogo size="lg" className="bg-success">
              ✓
            </BrandLogo>
          </View>
        ),
      },
    ],
  },
  {
    id: "star-rating",
    title: "StarRating",
    category: "Atoms",
    icon: faStar,
    description: "Five-star rating indicator. Read-only by default with decimal/half-star rendering; pass `readonly={false}` + `onChange` for interactive whole-star selection.",
    usage: `<StarRating value={4.5} caption="(312 reviews)" />`,
    preview: () => <StarRating value={4.5} size="sm" />,
    // Mirrors KuiReact's StarRating showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Readonly with decimals",
        Demo: () => (
          <View className="flex-col gap-2">
            <StarRating value={4.7} size="sm" caption="(312 reviews)" />
            <StarRating value={3.5} size="md" />
            <StarRating value={2.2} size="lg" />
          </View>
        ),
      },
      {
        title: "Interactive",
        Demo: function InteractiveDemo() {
          const [value, setValue] = useState(0);
          return (
            <View className="flex-col items-start gap-2">
              <StarRating value={value} readonly={false} size="lg" onChange={setValue} aria-label="Pick a rating" />
              <Text className="text-xs text-text-secondary">
                Selected: <Text className="text-xs font-semibold text-text-primary">{value || "–"}</Text>
              </Text>
            </View>
          );
        },
      },
    ],
  },
  {
    id: "stat-card",
    title: "StatCard",
    category: "Atoms",
    icon: faChartSimple,
    description: "Compact metric display card with value, label, and optional accent color.",
    usage: `<StatCard label="Active" value={947} accent="text-success" />`,
    preview: () => <StatCard label="Total Users" value={1284} />,
    // Mirrors KuiReact's StatCard showcase variant 1:1 (KuiReact's grid-cols-2
    // is a wrapping row of half-width cards).
    variants: [
      {
        title: "Variants",
        Demo: () => (
          <View className="flex-row flex-wrap gap-3">
            <StatCard className="min-w-[40%] flex-1" label="Total Users" value={1284} />
            <StatCard className="min-w-[40%] flex-1" label="Active" value={947} accent="text-success" />
            <StatCard className="min-w-[40%] flex-1" label="Transferred" value={38} accent="text-info" />
            <StatCard className="min-w-[40%] flex-1" label="Cancelled" value={12} accent="text-error" />
          </View>
        ),
      },
    ],
  },
  {
    id: "statistic",
    title: "Statistic",
    category: "Atoms",
    icon: faHashtag,
    description: "Bare numeric/text figure with a label, optional prefix/suffix, trend indicator, and loading skeleton — no card chrome (compose with Card for a bordered KPI tile).",
    usage: `<Statistic label="Revenue" value={82400} prefix="$" trend="up" trendValue="+12.4%" />`,
    preview: () => <Statistic label="Active users" value={1284} />,
    // Mirrors KuiReact's Statistic showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Basic",
        Demo: () => (
          <View className="flex-row flex-wrap gap-8">
            <Statistic label="Active users" value={1284} />
            <Statistic label="Open tickets" value={12} />
          </View>
        ),
      },
      {
        title: "Prefix / suffix / trend",
        Demo: () => (
          <View className="flex-row flex-wrap gap-8">
            <Statistic label="Revenue" value={82400} prefix="$" trend="up" trendValue="+12.4%" />
            <Statistic label="Conversion rate" value={4.2} precision={1} suffix="%" trend="down" trendValue="-0.6%" />
            <Statistic label="Loading example" value={0} loading />
          </View>
        ),
      },
    ],
  },
  {
    id: "tab-button",
    title: "TabButton",
    category: "Atoms",
    icon: faTableList,
    description: "Pill-style tab button with active/inactive coloring and an optional count badge.",
    usage: `<TabButton active={tab === "all"} onPress={() => setTab("all")} count={42}>All</TabButton>`,
    preview: () => (
      <TabButton active onPress={() => {}} count={42}>
        All
      </TabButton>
    ),
    // Mirrors KuiReact's TabButton showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Interactive",
        Demo: function TabButtonDemo() {
          const [tab, setTab] = useState<"all" | "active" | "archived">("all");
          return (
            <View className="flex-row flex-wrap items-center gap-1">
              <TabButton active={tab === "all"} onPress={() => setTab("all")} count={42}>
                All
              </TabButton>
              <TabButton active={tab === "active"} onPress={() => setTab("active")} count={18}>
                Active
              </TabButton>
              <TabButton active={tab === "archived"} onPress={() => setTab("archived")} count={24}>
                Archived
              </TabButton>
            </View>
          );
        },
      },
      {
        title: "Without count",
        Demo: () => (
          <View className="flex-row items-center gap-1">
            <TabButton active onPress={() => {}}>
              Selected
            </TabButton>
            <TabButton active={false} onPress={() => {}}>
              Default
            </TabButton>
          </View>
        ),
      },
    ],
  },
  {
    id: "timeline",
    title: "Timeline",
    category: "Atoms",
    icon: faTimeline,
    description: "Chronological activity feed grouped by the viewer's local day, with tone-coloured markers, inline detail and optional meta.",
    usage: `<Timeline items={[{ id: "1", at: "2026-08-25T09:12:00Z", title: "Email sent", tone: "info" }]} />`,
    preview: () => <Timeline groupByDay={false} items={[{ id: "1", at: "2026-08-25T09:12:00Z", title: "Email sent", tone: "info" }]} />,
    // Mirrors KuiReact's Timeline showcase variants 1:1 (same titles, copy and timestamps).
    variants: [
      {
        title: "Grouped by day",
        Demo: () => (
          <View className="w-full max-w-lg">
            <Timeline
              items={[
                { id: "1", at: "2026-08-25T09:12:00Z", title: "Email sent", body: "Re: shipping integration", tone: "info" },
                { id: "2", at: "2026-08-25T14:40:00Z", title: "Reply received", body: "“Interesting — can you send details?”", tone: "success" },
                { id: "3", at: "2026-08-24T16:05:00Z", title: "Call completed", body: "4m 12s · reached the right person", tone: "default" },
                { id: "4", at: "2026-08-24T10:00:00Z", title: "Enriched", body: "18 employees · logistics software", tone: "default" },
              ]}
            />
          </View>
        ),
      },
      {
        title: "Empty, and ungrouped",
        Demo: () => (
          <View className="w-full max-w-lg flex-col gap-6">
            <Timeline items={[]} emptyMessage="No activity on this company yet." />
            <Timeline
              groupByDay={false}
              items={[
                { id: "1", at: "2026-08-25T09:12:00Z", title: "Bounced", tone: "error" },
                { id: "2", at: "2026-08-25T08:00:00Z", title: "Queued", tone: "warning" },
              ]}
            />
          </View>
        ),
      },
    ],
  },
  {
    id: "table",
    title: "Table",
    category: "Atoms",
    icon: faTable,
    description: "Responsive table with column headers, an empty-state message, custom cell render support and sortable columns.",
    usage: `<Table caption="Users" columns={[{ key: "name", header: "Name" }]} rows={rows} />`,
    preview: () => <Table columns={[{ key: "name", header: "Name" }]} rows={[{ name: "Jane Doe" }]} />,
    // Mirrors KuiReact's Table showcase variants 1:1 (same titles and data).
    variants: [
      {
        title: "With data",
        Demo: () => (
          <Table
            caption="Users table"
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
              { key: "role", header: "Role" },
              { key: "status", header: "Status", render: (row) => <Badge variant={row.status === "Active" ? "success" : "neutral"}>{String(row.status)}</Badge> },
            ]}
            rows={[
              { name: "Jane Doe", email: "jane@example.com", role: "Admin", status: "Active" },
              { name: "John Smith", email: "john@example.com", role: "Member", status: "Inactive" },
            ]}
          />
        ),
      },
      {
        title: "Empty state",
        Demo: () => (
          <Table
            caption="Empty table"
            columns={[{ key: "name", header: "Name" }, { key: "email", header: "Email" }]}
            rows={[]}
            emptyMessage="No users found. Invite your team to get started."
          />
        ),
      },
      {
        title: "Sortable columns",
        Demo: () => (
          <Table
            caption="Sortable users table"
            columns={[
              { key: "name", header: "Name", sortable: true },
              { key: "email", header: "Email", sortable: true },
              { key: "role", header: "Role", sortable: true },
            ]}
            rows={[
              { name: "Zara Kim", email: "zara@example.com", role: "Admin" },
              { name: "Alice Brown", email: "alice@example.com", role: "Member" },
              { name: "Bob Lee", email: "bob@example.com", role: "Viewer" },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "slider",
    title: "Slider",
    category: "Atoms",
    icon: faImages,
    description: "Swipeable carousel with per-slide labels, autoplay, arrows and dot navigation, velocity momentum and edge resistance.",
    usage: `<Slider slides={[<Card key="a" />, <Card key="b" />]} autoPlay />`,
    preview: () => <Slider className="w-full" showArrows={false} slides={[<View key="a" className="h-16 rounded-xl bg-primary-subtle" />, <View key="b" className="h-16 rounded-xl bg-success-subtle" />]} />,
    // Mirrors KuiReact's Slider showcase variants 1:1 (same titles and copy;
    // gradient tiles are drawn with react-native-svg).
    variants: [
      {
        title: "Default",
        Demo: () => (
          <View className="w-full max-w-md">
            <Slider
              slides={[
                <View key="a" className="h-40 items-center justify-center rounded-xl bg-primary-subtle"><Text className="text-lg font-semibold text-primary">Slide 1</Text></View>,
                <View key="b" className="h-40 items-center justify-center rounded-xl bg-success-subtle"><Text className="text-lg font-semibold text-success-fg">Slide 2</Text></View>,
                <View key="c" className="h-40 items-center justify-center rounded-xl bg-warning-subtle"><Text className="text-lg font-semibold text-warning">Slide 3</Text></View>,
              ]}
            />
          </View>
        ),
      },
      {
        title: "Auto-play",
        Demo: () => (
          <View className="w-full max-w-md">
            <Slider
              autoPlay
              autoPlayInterval={2000}
              slides={[
                <View key="a" className="h-36 items-center justify-center rounded-xl bg-primary"><Text className="text-base font-semibold text-white">Auto A</Text></View>,
                <View key="b" className="h-36 items-center justify-center rounded-xl bg-secondary"><Text className="text-base font-semibold text-white">Auto B</Text></View>,
                <View key="c" className="h-36 items-center justify-center rounded-xl bg-error"><Text className="text-base font-semibold text-white">Auto C</Text></View>,
              ]}
            />
          </View>
        ),
      },
      {
        title: "Touch swipe + momentum",
        // A drag past dragThreshold (50px) advances one slide; every 0.5 px/ms
        // of release velocity adds another. Without loop the track
        // rubber-bands (×0.4) at the first and last slide.
        Demo: () => (
          <View className="w-full max-w-md">
            <Slider
              loop={false}
              dragThreshold={50}
              slides={[
                <GradientTile key="a" from="primary" to="secondary" label="Swipe me" />,
                <GradientTile key="b" from="success" to="info" label="Flick fast" />,
                <GradientTile key="c" from="warning" to="error" label="Multi-skip" />,
                <GradientTile key="d" from="info" to="primary" label="Edge bounce" />,
              ]}
            />
          </View>
        ),
      },
      {
        title: "No arrows / no loop",
        Demo: () => (
          <View className="w-full max-w-md">
            <Slider
              loop={false}
              showArrows={false}
              slides={[
                <View key="a" className="h-32 items-center justify-center rounded-xl bg-surface-sunken"><Text className="text-sm text-text-secondary">Slide 1 — dots only, no loop</Text></View>,
                <View key="b" className="h-32 items-center justify-center rounded-xl bg-surface-sunken"><Text className="text-sm text-text-secondary">Slide 2</Text></View>,
                <View key="c" className="h-32 items-center justify-center rounded-xl bg-surface-sunken"><Text className="text-sm text-text-secondary">Slide 3</Text></View>,
              ]}
            />
          </View>
        ),
      },
    ],
  },
  {
    id: "content-score-bar",
    title: "ContentScoreBar",
    category: "Feedback",
    icon: faGauge,
    description: "Rule-based content quality score with Good ≥70 / Fair ≥40 / Poor <40 tiers. Each rule shows as a chip with a passed/total count.",
    usage: `<ContentScoreBar value={text} rules={rules} label="Quality score" />`,
    preview: () => <ContentScoreBar className="w-full" value="" rules={[{ label: "Rule", check: () => true, points: 1 }]} />,
    // Mirrors KuiReact's ContentScoreBar showcase variants 1:1 (same titles, rules and copy).
    variants: [
      {
        title: "Live evaluation",
        Demo: function Demo() {
          const RULES: ScoreRule[] = [
            { label: "Min 20 chars", check: (v) => v.length >= 20, points: 20 },
            { label: "Has number", check: (v) => /\d/.test(v), points: 20 },
            { label: "Has uppercase", check: (v) => /[A-Z]/.test(v), points: 20 },
            { label: "Has keyword", check: (v) => /next|react|typescript/i.test(v), points: 20, hint: "Include \"Next\", \"React\", or \"TypeScript\"" },
            { label: "Min 5 words", check: (v) => v.trim().split(/\s+/).filter(Boolean).length >= 5, points: 20 },
          ];
          const [text, setText] = useState("Build with Next.js and TypeScript");
          return (
            <View className="w-full max-w-sm gap-2">
              <Textarea label="Content" rows={2} value={text} onChangeText={setText} placeholder="Type your content…" />
              <ContentScoreBar value={text} rules={RULES} label="Quality score" />
            </View>
          );
        },
      },
      {
        title: "All tiers",
        Demo: () => {
          const makeRules = (pass: number, total: number): ScoreRule[] =>
            Array.from({ length: total }, (_, i) => ({ label: `Rule ${i + 1}`, check: () => i < pass, points: 1 }));
          return (
            <View className="w-full max-w-sm gap-3">
              <ContentScoreBar value="" rules={makeRules(5, 5)} label="Good (100%)" />
              <ContentScoreBar value="" rules={makeRules(3, 5)} label="Fair (60%)" />
              <ContentScoreBar value="" rules={makeRules(1, 5)} label="Poor (20%)" />
            </View>
          );
        },
      },
      {
        title: "Password strength",
        Demo: function PwdDemo() {
          const PWD_RULES: ScoreRule[] = [
            { label: "Min 8 chars", check: (v) => v.length >= 8, points: 25 },
            { label: "Uppercase", check: (v) => /[A-Z]/.test(v), points: 25 },
            { label: "Number", check: (v) => /\d/.test(v), points: 25 },
            { label: "Special char", check: (v) => /[^A-Za-z0-9]/.test(v), points: 25 },
          ];
          const [pwd, setPwd] = useState("Hello1");
          return (
            <View className="w-full max-w-sm gap-2">
              <Input type="password" value={pwd} onChangeText={setPwd} placeholder="Enter password…" accessibilityLabel="Password" />
              <ContentScoreBar value={pwd} rules={PWD_RULES} label="Password strength" />
            </View>
          );
        },
      },
    ],
  },
  {
    id: "view-toggle",
    title: "ViewToggle",
    category: "Atoms",
    icon: faTableCells,
    description: "Horizontal / vertical view toggle control; two-state icon selector.",
    usage: `<ViewToggle value={view} onChange={setView} />`,
    preview: () => <ViewToggle value="horizontal" onChange={() => {}} />,
    // Mirrors KuiReact's ViewToggle showcase variants 1:1 (same titles and labels).
    variants: [
      {
        title: "Default (EN labels)",
        Demo: function ViewToggleDemo() {
          const [view, setView] = useState<ViewOrientation>("horizontal");
          return <ViewToggle value={view} onChange={setView} />;
        },
      },
      {
        title: "Custom labels",
        Demo: function ViewToggleCustomDemo() {
          const [view, setView] = useState<ViewOrientation>("vertical");
          return <ViewToggle value={view} onChange={setView} labels={{ horizontal: "Yatay", vertical: "Dikey" }} />;
        },
      },
    ],
  },
  {
    id: "scroll-area",
    title: "ScrollArea",
    category: "Atoms",
    icon: faScroll,
    description: "Scrollable container for vertical, horizontal, or both-axis scrolling.",
    usage: `<ScrollArea className="h-40">{items}</ScrollArea>`,
    preview: () => (
      <ScrollArea className="h-16 w-full rounded-md border border-border p-2">
        <Text className="text-sm text-text-primary">Item 1</Text>
      </ScrollArea>
    ),
    // Mirrors KuiReact's ScrollArea showcase variants 1:1 (same titles and content).
    variants: [
      {
        title: "Vertical list",
        Demo: () => (
          <ScrollArea className="h-40 w-64 rounded-md border border-border p-3">
            <View className="gap-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <Text key={i} className="rounded-md bg-surface-raised px-3 py-2 text-sm text-text-primary">
                  Item {i + 1}
                </Text>
              ))}
            </View>
          </ScrollArea>
        ),
      },
      {
        title: "Horizontal",
        Demo: () => (
          <ScrollArea orientation="horizontal" className="w-full rounded-md border border-border p-3">
            <View className="flex-row gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <View key={i} className="h-16 w-24 shrink-0 items-center justify-center rounded-md bg-surface-raised">
                  <Text className="text-sm text-text-primary">Card {i + 1}</Text>
                </View>
              ))}
            </View>
          </ScrollArea>
        ),
      },
    ],
  },
  {
    id: "tree-view",
    title: "TreeView",
    category: "Atoms",
    icon: faSitemap,
    description: "Collapsible tree with selection (single or multi), expand/collapse-all toolbar and level/position announcements.",
    usage: `<TreeView label="File tree" nodes={nodes} selectedId={sel} onSelect={setSel} />`,
    preview: () => <TreeView hideToolbar nodes={[{ id: "src", label: "src", children: [{ id: "a", label: "App.tsx" }] }]} />,
    // Mirrors KuiReact's TreeView showcase variants 1:1 (same titles and data).
    // "type-ahead" in the last title is a hardware-keyboard feature that isn't
    // ported; multi-select works with taps (toggle) and long-press (range).
    variants: [
      {
        title: "File tree",
        Demo: function TreeViewDemo() {
          const [sel, setSel] = useState<string | undefined>();
          return (
            <TreeView
              label="File tree"
              selectedId={sel}
              onSelect={setSel}
              nodes={[
                { id: "src", label: "src", children: [
                  { id: "components", label: "components", children: [
                    { id: "Button", label: "Button.tsx" },
                    { id: "Input", label: "Input.tsx" },
                  ] },
                  { id: "utils", label: "utils", children: [{ id: "cn", label: "cn.ts" }] },
                ] },
                { id: "public", label: "public", children: [{ id: "logo", label: "logo.svg" }] },
                { id: "pkg", label: "package.json" },
              ]}
            />
          );
        },
      },
      {
        title: "Navigation menu",
        Demo: function TreeViewNavDemo() {
          const [sel, setSel] = useState<string | undefined>();
          return (
            <TreeView
              label="Settings navigation"
              selectedId={sel}
              onSelect={setSel}
              nodes={[
                { id: "account", label: "Account", children: [
                  { id: "profile", label: "Profile" },
                  { id: "password", label: "Password" },
                  { id: "notifications", label: "Notifications" },
                ] },
                { id: "workspace", label: "Workspace", children: [
                  { id: "general", label: "General" },
                  { id: "members", label: "Members" },
                  { id: "billing", label: "Billing" },
                ] },
                { id: "integrations", label: "Integrations" },
              ]}
            />
          );
        },
      },
      {
        title: "Flat list",
        Demo: function TreeViewFlatDemo() {
          const [sel, setSel] = useState<string>("ts");
          return (
            <TreeView
              label="Language selector"
              selectedId={sel}
              onSelect={setSel}
              nodes={[
                { id: "ts", label: "TypeScript" },
                { id: "js", label: "JavaScript" },
                { id: "py", label: "Python" },
                { id: "go", label: "Go" },
                { id: "rs", label: "Rust" },
              ]}
            />
          );
        },
      },
      {
        title: "Multi-select + type-ahead",
        Demo: function TreeViewMultiSelectDemo() {
          const [ids, setIds] = useState<string[]>(["Card"]);
          return (
            <TreeView
              label="Project files (multi-select + type-ahead)"
              selectionMode="multi"
              selectedIds={ids}
              onSelectionChange={setIds}
              nodes={[
                { id: "docs", label: "Documents", children: [
                  { id: "spec", label: "spec.md" },
                  { id: "roadmap", label: "roadmap.md" },
                ] },
                { id: "src", label: "src", children: [
                  { id: "Button", label: "Button.tsx" },
                  { id: "Card", label: "Card.tsx" },
                  { id: "Drawer", label: "Drawer.tsx" },
                  { id: "TreeView", label: "TreeView.tsx" },
                ] },
                { id: "tests", label: "tests", children: [
                  { id: "unit", label: "unit" },
                  { id: "e2e", label: "e2e" },
                ] },
              ]}
            />
          );
        },
      },
    ],
  },
  {
    id: "data-table",
    title: "DataTable",
    category: "Atoms",
    icon: faTableCellsColumnLock,
    description: "Unified table with `mode=\"static\" | \"paginated\" | \"server\"`. Multi-column sort (long-press), global search, per-column filter (text + select), pagination, and unified loading/empty/error state.",
    usage: `<DataTable caption="Users" rows={rows} columns={columns} pageSize={5} />`,
    preview: () => <DataTable mode="static" searchable={false} columns={[{ key: "name", header: "Name" }]} rows={[{ name: "Alice Martin" }]} />,
    // Mirrors KuiReact's DataTable showcase variants 1:1 (same titles and data).
    variants: [
      {
        title: "Full example",
        Demo: () => {
          type User = { name: string; email: string; role: string; status: string; joined: string };
          const USERS: User[] = [
            { name: "Alice Martin", email: "alice@example.com", role: "Admin", status: "Active", joined: "2024-01-15" },
            { name: "Bob Johnson", email: "bob@example.com", role: "Member", status: "Active", joined: "2024-02-20" },
            { name: "Carol Williams", email: "carol@example.com", role: "Editor", status: "Inactive", joined: "2024-03-10" },
            { name: "David Brown", email: "david@example.com", role: "Member", status: "Active", joined: "2024-04-05" },
            { name: "Eve Davis", email: "eve@example.com", role: "Admin", status: "Active", joined: "2024-05-18" },
            { name: "Frank Wilson", email: "frank@example.com", role: "Member", status: "Pending", joined: "2024-06-22" },
            { name: "Grace Moore", email: "grace@example.com", role: "Editor", status: "Active", joined: "2024-07-01" },
            { name: "Hank Taylor", email: "hank@example.com", role: "Member", status: "Inactive", joined: "2024-08-14" },
          ];
          return (
            <View className="w-full">
              <DataTable<User>
                caption="Users"
                searchPlaceholder="Search users…"
                pageSize={5}
                rows={USERS}
                columns={[
                  { key: "name", header: "Name" },
                  { key: "email", header: "Email" },
                  { key: "role", header: "Role" },
                  { key: "status", header: "Status", render: (row) => <Badge variant={row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "neutral"}>{row.status}</Badge> },
                  { key: "joined", header: "Joined" },
                ]}
              />
            </View>
          );
        },
      },
      {
        title: "Sortable columns",
        Demo: () => {
          type Product = { name: string; category: string; price: string; stock: string };
          const PRODUCTS: Product[] = [
            { name: "Widget A", category: "Tools", price: "29.99", stock: "150" },
            { name: "Gadget B", category: "Electronics", price: "99.00", stock: "42" },
            { name: "Part C", category: "Tools", price: "9.50", stock: "500" },
            { name: "Device D", category: "Electronics", price: "249.00", stock: "18" },
            { name: "Item E", category: "Misc", price: "14.75", stock: "200" },
          ];
          return (
            <View className="w-full">
              <DataTable<Product>
                caption="Products"
                pageSize={5}
                rows={PRODUCTS}
                columns={[
                  { key: "name", header: "Product", sortable: true },
                  { key: "category", header: "Category", sortable: true },
                  { key: "price", header: "Price", sortable: true, align: "right" },
                  { key: "stock", header: "Stock", sortable: true, align: "right" },
                ]}
              />
            </View>
          );
        },
      },
      {
        title: 'Server mode (mode="server")',
        Demo: () => (
          <View className="w-full">
            <DataTable<ServerUser>
              mode="server"
              fetchPage={serverFetchPage}
              caption="Server-paged users"
              pageSize={5}
              searchPlaceholder="Search users…"
              columns={[
                { key: "name", header: "Name", sortable: true },
                { key: "email", header: "Email", sortable: true, filter: { kind: "text", placeholder: "Contains…" } },
                {
                  key: "team",
                  header: "Team",
                  sortable: true,
                  filter: {
                    kind: "select",
                    options: [
                      { label: "Platform", value: "platform" },
                      { label: "Growth", value: "growth" },
                      { label: "Ops", value: "ops" },
                      { label: "Design", value: "design" },
                    ],
                  },
                },
                { key: "joined", header: "Joined", sortable: true },
              ]}
            />
          </View>
        ),
      },
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
    id: "popconfirm",
    title: "Popconfirm",
    category: "Overlays",
    icon: faCircleQuestion,
    description: "Inline \"are you sure?\" confirmation popover for destructive or consequential actions — lighter-weight than a full Modal.",
    usage: `<Popconfirm trigger={<Button variant="outline">Log out</Button>} title="Log out of your account?" onConfirm={logOut} />`,
    preview: () => <Button variant="danger" size="sm">Delete</Button>,
    // Mirrors KuiReact's Popconfirm showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: () => <Popconfirm trigger={<Button variant="outline">Log out</Button>} title="Log out of your account?" onConfirm={() => {}} />,
      },
      {
        title: "Danger + description",
        Demo: () => (
          <Popconfirm
            trigger={<Button variant="danger">Delete project</Button>}
            title="Delete this project?"
            description="This action cannot be undone. All data will be permanently removed."
            danger
            confirmLabel="Delete"
            onConfirm={() => {}}
          />
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
