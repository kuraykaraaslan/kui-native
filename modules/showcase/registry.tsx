import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { TextInput, View } from "react-native";
import { countries, getEmojiFlag, type TCountryCode } from "countries-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFolder,
  faMagnifyingGlass,
  faRocket,
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
  SkeletonTableRow,
  SkeletonText,
  SkipLink,
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
  BulkActionTable,
  AdvancedDataTable,
  DiffViewer,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  DonutChart,
  SparkLine,
  MapView,
  VideoPlayer,
  type MapMarker,
  type MapRoute,
  type MapZone,
  type Series,
  type DataTableFetchArgs,
  type DataTableFetchResult,
  type ScoreRule,
  type ViewOrientation,
  LiveRegion,
} from "@/modules/ui";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { useThemeTokens } from "@/libs/theme";

function LiveRegionDemo() {
  const [msg, setMsg] = useState("");
  const [count, setCount] = useState(0);
  const announce = () => {
    const n = count + 1;
    setCount(n);
    setMsg("");
    setTimeout(() => setMsg(`Announcement #${n} sent`), 50);
  };
  return (
    <View className="gap-3">
      <View className="flex-row">
        <Button label="Send announcement" variant="outline" size="sm" onPress={announce} />
      </View>
      {msg ? <Text className="text-xs text-text-secondary">(screen reader hears: &ldquo;{msg}&rdquo;)</Text> : null}
      <LiveRegion message={msg} />
    </View>
  );
}

/**
 * The live demos behind each KuiReact showcase page, keyed by KuiReact's page
 * id and variant title. Everything else on the page — navigation, name,
 * category, description, code panes, variant order — comes from KuiReact via
 * data/showcase.generated.ts; the variant titles here must match it.
 */
export type ShowcaseEntry = {
  id: string;
  variants: { title: string; Demo: ComponentType }[];
};

/* Stateful demos (need hooks → real components, not inline render fns). */
// Mirrors KuiReact's Checkbox showcase variants 1:1 (same titles and copy).
function CheckboxDefaultDemo() {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={setChecked} label="I agree to the Terms of Service" />;
}
function CheckboxSelectAllDemo() {
  // KuiReact: "space-y-2" > Select all + "ml-6 space-y-1" > Option A/B/C (A and C checked).
  const [items, setItems] = useState([true, false, true]);
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
      <View className="ml-6 gap-1">
        {items.map((value, i) => (
          <Checkbox
            key={i}
            checked={value}
            onChange={(next) => setItems(items.map((v, j) => (j === i ? next : v)))}
            label={`Option ${"ABC"[i]}`}
          />
        ))}
      </View>
    </View>
  );
}
// Mirrors KuiReact's Toggle showcase variants 1:1 (same titles and copy).
function ToggleSizesDemo() {
  // KuiReact: "space-y-3" of checked sm / md / lg toggles labelled "Toggle SM" etc.
  return (
    <View className="gap-3">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Toggle key={s} checked onChange={() => {}} label={`Toggle ${s.toUpperCase()}`} size={s} />
      ))}
    </View>
  );
}
function ToggleDescriptionDemo() {
  // KuiReact: "space-y-3" of a checked and an unchecked toggle with descriptions.
  return (
    <View className="gap-3">
      <Toggle checked onChange={() => {}} label="Marketing emails" description="Receive weekly updates and promotions." />
      <Toggle
        checked={false}
        onChange={() => {}}
        label="Security alerts"
        description="Get notified about account activity."
      />
    </View>
  );
}
const AVATAR_DEMO_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="64" fill="#3b82f6"/><text x="64" y="74" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="white">JD</text></svg>`,
)}`;
function RocketIcon() {
  const t = useThemeTokens();
  return <FontAwesomeIcon icon={faRocket} size={16} color={t["info-fg"]} />;
}
const SETTINGS_ROWS = [
  { key: "notifications", label: "Push notifications", desc: "Alerts for new activity" },
  { key: "marketing", label: "Marketing emails", desc: "Weekly updates and offers" },
  { key: "darkMode", label: "Dark mode", desc: "Switch to dark theme" },
] as const;
function ToggleSettingsListDemo() {
  const [s, setS] = useState<Record<string, boolean>>({ notifications: true, marketing: false, darkMode: false });
  return (
    // KuiReact: "w-full max-w-xs divide-y divide-border border border-border rounded-lg
    // overflow-hidden" with "bg-surface-base px-4 py-3" rows.
    <View className="w-full max-w-xs overflow-hidden rounded-lg border border-border">
      {SETTINGS_ROWS.map(({ key, label, desc }, i) => (
        <View
          key={key}
          className={`flex-row items-center justify-between bg-surface-base px-4 py-3${i > 0 ? " border-t border-border" : ""}`}
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
  { value: "email", label: "Email", hint: "Sent to your primary email" },
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
// KuiReact's DiffViewer sample sources (verbatim).
const DIFF_SAMPLE_OLD = `function greet(name) {
  console.log("Hello, " + name);
}

greet("world");
`;

const DIFF_SAMPLE_NEW = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("world");
greet("kui");
`;

const DIFF_LONG_OLD = `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
`;

const DIFF_LONG_NEW = `import { useState, useCallback } from 'react';

export function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  const handleReset = () => setCount(initial);
  return (
    <div className="flex gap-2">
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
`;

// KuiReact's Chart demo data (verbatim).
const chartLineSeries: Series[] = [
  { id: "active", name: "Active users", data: [{ x: "Mon", y: 1200 }, { x: "Tue", y: 1900 }, { x: "Wed", y: 1500 }, { x: "Thu", y: 2300 }, { x: "Fri", y: 2100 }, { x: "Sat", y: 2800 }, { x: "Sun", y: 1700 }] },
  { id: "signups", name: "New signups", data: [{ x: "Mon", y: 300 }, { x: "Tue", y: 480 }, { x: "Wed", y: 220 }, { x: "Thu", y: 560 }, { x: "Fri", y: 410 }, { x: "Sat", y: 690 }, { x: "Sun", y: 320 }] },
];
const chartBarSeries: Series[] = [
  { id: "revenue", name: "Revenue", data: [{ x: "Jan", y: 4200 }, { x: "Feb", y: 5800 }, { x: "Mar", y: 4900 }, { x: "Apr", y: 7100 }, { x: "May", y: 6300 }, { x: "Jun", y: 8400 }] },
  { id: "expenses", name: "Expenses", data: [{ x: "Jan", y: 2800 }, { x: "Feb", y: 3200 }, { x: "Mar", y: 3600 }, { x: "Apr", y: 4100 }, { x: "May", y: 3900 }, { x: "Jun", y: 4700 }] },
];
const chartPieSeries: Series[] = [
  { id: "category-share", name: "Category share", data: [{ x: "Electronics", y: 35 }, { x: "Clothing", y: 25 }, { x: "Food", y: 20 }, { x: "Books", y: 12 }, { x: "Other", y: 8 }] },
];
const chartSparkValues = [12, 14, 11, 17, 19, 16, 22, 21, 24, 27, 23, 29];
// KuiReact's preview card so each variant is visually comparable.
function ChartFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="w-full rounded-xl border border-border bg-surface-raised p-4 shadow-sm">
      <Text className="mb-2 text-xs font-medium text-text-secondary">{title}</Text>
      {children}
    </View>
  );
}

// KuiReact's MapView sample data (verbatim).
const MAP_ISTANBUL_CENTER: [number, number] = [41.015, 28.979];

const MAP_CITIES: MapMarker[] = [
  {
    id: 'istanbul',
    position: [41.015, 28.979],
    variant: 'primary',
    tooltip: {
      title: 'İstanbul',
      description: 'Türkiye\'nin en kalabalık şehri',
      fields: [
        { label: 'Nüfus', value: '15.8 M' },
        { label: 'Alan',  value: '5.461 km²' },
      ],
    },
  },
  {
    id: 'ankara',
    position: [39.925, 32.836],
    variant: 'success',
    tooltip: {
      title: 'Ankara',
      description: 'Türkiye\'nin başkenti',
      fields: [
        { label: 'Nüfus', value: '5.6 M' },
        { label: 'İl',    value: 'Ankara' },
      ],
    },
  },
  {
    id: 'izmir',
    position: [38.423, 27.143],
    variant: 'info',
    tooltip: {
      title: 'İzmir',
      description: 'Ege\'nin incisi',
      fields: [
        { label: 'Nüfus', value: '4.4 M' },
        { label: 'Liman', value: 'Alsancak' },
      ],
    },
  },
  {
    id: 'bursa',
    position: [40.182, 29.067],
    variant: 'warning',
    tooltip: {
      title: 'Bursa',
      description: 'Yeşil Bursa',
      fields: [
        { label: 'Nüfus', value: '3.1 M' },
      ],
    },
  },
];

const MAP_ZONES: MapZone[] = [
  {
    id: 'marmara',
    label: 'Marmara Bölgesi',
    variant: 'primary',
    positions: [
      [41.8, 26.3],
      [41.5, 30.8],
      [40.0, 31.0],
      [39.8, 26.5],
    ],
    fillOpacity: 0.15,
  },
  {
    id: 'ege',
    label: 'Ege Bölgesi',
    variant: 'info',
    positions: [
      [39.8, 26.5],
      [40.0, 31.0],
      [37.5, 30.5],
      [37.2, 26.3],
    ],
    fillOpacity: 0.15,
  },
];

const MAP_ROUTES: MapRoute[] = [
  {
    id: 'route-ist-ank',
    label: 'İstanbul → Ankara (TEM)',
    positions: [
      [41.015, 28.979],
      [40.85, 29.9],
      [40.78, 31.2],
      [40.5, 32.0],
      [39.925, 32.836],
    ],
    color: '#3b82f6',
    weight: 3,
  },
  {
    id: 'route-ist-izm',
    label: 'İstanbul → İzmir (E87)',
    positions: [
      [41.015, 28.979],
      [40.5, 27.9],
      [39.9, 27.5],
      [38.9, 27.2],
      [38.423, 27.143],
    ],
    color: '#06b6d4',
    weight: 3,
    dashed: true,
  },
];

// KuiReact's VideoPlayer demo media (verbatim). KuiReact turns the VTT text
// into Blob URLs; RN can't load those, so they become data: URIs.
const VIDEO_PLACEHOLDER = "https://placeholdervideo.dev/1920x1080";
const VIDEO_EN_VTT = `WEBVTT

00:00:01.000 --> 00:00:04.500
Welcome to the custom HTML5 video player.

00:00:05.000 --> 00:00:09.000
Press the gear icon to open settings.

00:00:09.500 --> 00:00:13.500
You can change quality, speed, language,
and subtitle font size.

00:00:14.000 --> 00:00:18.000
Keyboard shortcuts: Space=play, ←→=seek,
↑↓=volume, M=mute, F=fullscreen.
`;

const VIDEO_TR_VTT = `WEBVTT

00:00:01.000 --> 00:00:04.500
Özel HTML5 video oynatıcıya hoş geldiniz.

00:00:05.000 --> 00:00:09.000
Ayarlar menüsünü açmak için dişli simgesine basın.

00:00:09.500 --> 00:00:13.500
Kalite, hız, dil ve altyazı boyutunu
ayarlayabilirsiniz.

00:00:14.000 --> 00:00:18.000
Klavye kısayolları: Boşluk=oynat, ←→=ileri/geri,
↑↓=ses, M=sessiz, F=tam ekran.
`;
const vttUri = (content: string) => `data:text/vtt,${encodeURIComponent(content)}`;
const VIDEO_SUBTITLES = [
  { label: "English", srclang: "en", src: vttUri(VIDEO_EN_VTT) },
  { label: "Türkçe", srclang: "tr", src: vttUri(VIDEO_TR_VTT) },
];

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
  return (
    <View className="w-full max-w-xs">
      <Input
        label="Password"
        type="password"
        value={v}
        onChangeText={setV}
        placeholder="Enter your password"
        hint="Min. 8 characters"
      />
    </View>
  );
}
function InputStepperDemo() {
  const [v, setV] = useState("5");
  return (
    <View className="w-full max-w-xs">
      <Input label="Quantity" type="number" value={v} onChangeText={setV} min={0} max={99} />
    </View>
  );
}
function InputLoadingDemo() {
  const [v, setV] = useState("johndoe");
  return (
    <View className="w-full max-w-xs">
      <Input label="Username" value={v} onChangeText={setV} suffixIcon={<Spinner size="xs" />} hint="Checking availability…" />
    </View>
  );
}
// Mirrors KuiReact's Toast showcase variants 1:1 (same titles and copy — KuiReact's
// Toast demos are written in Turkish, so the strings are kept verbatim).
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchUser = () => wait(2000).then(() => ({ name: "Ada Lovelace", id: 42 }));
const fetchBroken = () =>
  wait(1800).then((): { name: string; id: number } => {
    throw new Error("500 Server Error");
  });
type ToastButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
/** KuiReact's toast demos: a wrapping row of `size="sm"` buttons ending in a ghost "Temizle" (clear). */
function ToastButtons({ items }: { items: { label: string; variant: ToastButtonVariant; run: () => void }[] }) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {items.map((i) => (
        <Button key={i.label} variant={i.variant} size="sm" onPress={i.run}>
          {i.label}
        </Button>
      ))}
      <Button variant="ghost" size="sm" onPress={() => toast.clear()}>
        Temizle
      </Button>
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
// KuiReact's TabGroup "Lazy panels" demo: lazy tabs log their first mount.
function LazyTabContent({ label, onMount }: { label: string; onMount: () => void }) {
  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Text variant="bodySm">{label} mounted on first activation.</Text>;
}
function TabGroupLazyDemo() {
  const [log, setLog] = useState<string[]>(["Tab 1 mounted"]);
  const addLog = (entry: string) => setLog((l) => (l.includes(entry) ? l : [...l, entry]));
  return (
    <View className="w-full gap-2">
      <TabGroup
        label="Lazy tabs"
        lazy
        tabs={[
          { id: "t1", label: "Tab 1", content: <Text variant="bodySm">Always mounted (initial).</Text> },
          { id: "t2", label: "Tab 2", content: <LazyTabContent label="Tab 2" onMount={() => addLog("Tab 2 mounted")} /> },
          { id: "t3", label: "Tab 3", content: <LazyTabContent label="Tab 3" onMount={() => addLog("Tab 3 mounted")} /> },
        ]}
      />
      <Text className="text-xs text-text-disabled">Mount log: {log.join(" → ")}</Text>
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
        description="Are you sure you want to proceed? This action cannot be undone."
        footer={
          <>
            <Button label="Cancel" variant="outline" onPress={() => setOpen(false)} />
            <Button label="Delete" variant="danger" onPress={() => setOpen(false)} />
          </>
        }
      >
        <Text variant="bodySm">This will permanently delete all selected items and their associated data.</Text>
      </Modal>
    </View>
  );
}
function ModalSizesDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | null>(null);
  const maxWidth = { sm: "384px", md: "448px", lg: "512px" } as const;
  return (
    <View className="flex-row flex-wrap gap-2">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Button key={s} label={`Open ${s.toUpperCase()}`} variant="outline" size="sm" onPress={() => setSize(s)} />
      ))}
      <Modal
        open={size !== null}
        onClose={() => setSize(null)}
        title={size ? `Modal — ${size.toUpperCase()}` : ""}
        size={size ?? "md"}
        description="This demo shows the three available size variants."
        footer={<Button label="Close" variant="primary" onPress={() => setSize(null)} />}
      >
        <Text variant="bodySm">Max-width: {size ? maxWidth[size] : ""}.</Text>
      </Modal>
    </View>
  );
}
function ModalScrollableDemo() {
  const [open, setOpen] = useState(false);
  return (
    <View className="items-start">
      <Button label="Scrollable Modal" variant="outline" onPress={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Long Content"
        scrollable
        footer={
          <>
            <Button label="Cancel" variant="outline" onPress={() => setOpen(false)} />
            <Button label="OK" onPress={() => setOpen(false)} />
          </>
        }
      >
        <View className="gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Text key={i} variant="bodySm">
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
      <Button label="Fullscreen Modal" variant="ghost" onPress={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Fullscreen Dialog"
        fullscreen
        footer={<Button label="Close" onPress={() => setOpen(false)} />}
      >
        <Text variant="bodySm">This modal takes the full viewport.</Text>
      </Modal>
    </View>
  );
}
function ModalNestedDemo() {
  const [outer, setOuter] = useState(false);
  const [inner, setInner] = useState(false);
  return (
    <View className="items-start">
      <Button label="Open Outer Modal" variant="outline" onPress={() => setOuter(true)} />
      <Modal
        open={outer}
        onClose={() => setOuter(false)}
        title="Outer dialog"
        description="Escape closes only the topmost overlay — try opening the nested one."
        footer={<Button label="Close outer" onPress={() => setOuter(false)} />}
      >
        <View className="gap-3">
          <Text variant="bodySm">
            Layered focus trap demo: pressing Escape with the nested modal open only dismisses the nested one, leaving this outer modal intact.
          </Text>
          <Button label="Open Nested Modal" variant="primary" onPress={() => setInner(true)} />
        </View>
        {/* Nested inside the outer Modal's tree so Android back / backdrop
            dismiss only the inner one first (KuiReact: layer-aware Escape). */}
        <Modal
          open={inner}
          onClose={() => setInner(false)}
          title="Nested dialog"
          size="sm"
          footer={<Button label="Close nested" onPress={() => setInner(false)} />}
        >
          <Text variant="bodySm">This nested modal owns the top focus layer. Tab cycles only within this panel.</Text>
        </Modal>
      </Modal>
    </View>
  );
}

export const REGISTRY: ShowcaseEntry[] = [
  {
    id: "button",
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
            <Button variant="primary" iconLeft="⬇">
              Download
            </Button>
            <Button variant="outline" iconRight="→">
              Next
            </Button>
            <Button variant="secondary" iconLeft="✉" iconRight="↗">
              Send
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
      {
        title: "Full width",
        Demo: () => (
          <View className="w-full gap-2">
            <Button variant="primary" fullWidth>
              Full-width primary
            </Button>
            <Button variant="outline" fullWidth>
              Full-width outline
            </Button>
          </View>
        ),
      },
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
          <View className="flex-row flex-wrap items-center gap-2">
            <Button variant="primary" loading>
              Saving…
            </Button>
            <Button variant="outline" loading>
              Loading details
            </Button>
          </View>
        ),
      },
    ],
  },
  {
    id: "card",
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
            <Card title="Clickable card" subtitle="Tap to navigate" onPress={() => toast.info("Card pressed")}>
              <Text variant="bodySm">This card is a button element with hover + focus ring.</Text>
            </Card>
            <Card title="Hoverable only" subtitle="Hover for shadow" hoverable>
              <Text variant="bodySm">Not clickable, just visually responsive.</Text>
            </Card>
          </View>
        ),
      },
      { title: "Loading skeleton", Demo: () => <Card loading /> },
    ],
  },
  {
    id: "avatar",
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
        // KuiReact's AvatarImageDemo: an inline SVG "JD" image, twice (plain +
        // online status), then a two-line caption.
        Demo: () => (
          <View className="flex-row items-center gap-4">
            <Avatar src={AVATAR_DEMO_SRC} name="Jane Doe" size="md" />
            <Avatar src={AVATAR_DEMO_SRC} name="Jane Doe" size="md" status="online" />
            <View>
              <Text className="text-sm font-medium text-text-primary">Image source</Text>
              <Text className="text-xs text-text-secondary">Uses the same sizing and status rules</Text>
            </View>
          </View>
        ),
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
    variants: [
      {
        // KuiReact showcase (Label.showcase): "Full name" + "Email address" (required)
        title: "Basic + required",
        Demo: () => (
          <View className="gap-3">
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
        Demo: function LabelPairedDemo() {
          const t = useThemeTokens();
          return (
            // KuiReact: "space-y-1.5" over a raw rows={2} <textarea> and a disabled <input>.
            <View className="gap-1.5">
              <Label>Bio</Label>
              {/* rows={2}: 2 × 20px + py-2 + border = 58px. The web <textarea> is inline-block
                  (baseline = bottom edge), so the line strut adds ~7px beneath it. */}
              <TextInput
                multiline
                numberOfLines={2}
                textAlignVertical="top"
                placeholder="Tell us about yourself"
                placeholderTextColor={t["text-disabled"]}
                className="mb-[7px] w-full rounded-md border border-border bg-surface-base px-3 py-2 text-sm text-text-primary"
                style={{ height: 58, lineHeight: 20 }}
              />
              <Label disabled>Handle (disabled)</Label>
              <TextInput
                editable={false}
                placeholder="@handle"
                placeholderTextColor={t["text-disabled"]}
                className="w-full rounded-md border border-border bg-surface-sunken px-3 py-2 text-sm text-text-disabled"
                style={{ height: 38, lineHeight: 20 }}
              />
            </View>
          );
        },
      },
    ],
  },
  {
    id: "input",
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
          <View className="gap-3">
            <Input label="Search" prefixIcon={<SearchIcon />} placeholder="Search…" />
            <Input label="Amount" suffixIcon={<Text className="text-text-disabled">$</Text>} placeholder="0.00" type="number" />
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
    // Mirrors KuiReact's FileInput showcase variants 1:1 (same titles and
    // copy). `enablePaste` is accepted for parity; RN has no clipboard file paste.
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
        title: "Paste from clipboard",
        Demo: () => (
          <FileInput
            id="fi-paste"
            label="Screenshot drop"
            multiple
            enablePaste
            accept="image/*"
            maxFiles={4}
            maxSizeBytes={4 * 1024 * 1024}
            hint="Drop, browse, or paste a screenshot from your clipboard (Cmd/Ctrl + V while this card is focused)."
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
    variants: [
      { title: "Controlled", Demo: SelectControlledDemo },
      { title: "With icons", Demo: SelectIconsDemo },
      {
        title: "Validation states",
        Demo: () => (
          <View className="gap-3">
            <Select id="plan" label="Plan" placeholder="Select a plan" required error="Please select a plan." options={PLANS} />
            <Select id="plan" label="Plan" disabled options={[{ value: "pro", label: "Pro" }]} value="pro" />
          </View>
        ),
      },
      { title: "With countries", Demo: SelectCountriesDemo },
      { title: "Searchable", Demo: SelectSearchableDemo },
    ],
  },
  {
    id: "textarea",
    // Mirrors KuiReact's Textarea showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: () => <Textarea label="Message" placeholder="Write your message…" hint="Max 500 characters." rows={3} />,
      },
      { title: "Error", Demo: () => <Textarea label="Message" error="Message is required." required rows={3} /> },
      { title: "Disabled", Demo: () => <Textarea label="Message" placeholder="Not editable" disabled rows={3} /> },
      { title: "Character counter", Demo: TextareaCounterDemo },
    ],
  },
  {
    id: "radio-group",
    variants: [
      { title: "Default", Demo: RadioDefaultDemo },
      {
        title: "Disabled",
        Demo: () => (
          <RadioGroup name="notify" legend="Notification preference" options={[{ value: "email", label: "Email" }, { value: "sms", label: "SMS" }]} value="email" disabled />
        ),
      },
      { title: "Card style", Demo: RadioCardDemo },
    ],
  },
  {
    id: "checkbox",
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
    variants: [
      { title: "Sizes", Demo: ToggleSizesDemo },
      { title: "With description", Demo: ToggleDescriptionDemo },
      {
        title: "Disabled",
        Demo: () => (
          <View className="gap-2">
            <Toggle checked disabled label="Disabled on" onChange={() => {}} />
            <Toggle checked={false} disabled label="Disabled off" onChange={() => {}} />
          </View>
        ),
      },
      { title: "Settings list (controlled)", Demo: ToggleSettingsListDemo },
    ],
  },
  {
    id: "spinner",
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
        Demo: () => (
          <Button variant="primary" loading>
            Loading…
          </Button>
        ),
      },
    ],
  },
  {
    id: "skip-link",
    variants: [
      {
        title: "SkipLink (focus to reveal)",
        // Web only: native apps have no skip-navigation concept (VoiceOver / TalkBack
        // navigate by headings), so SkipLink renders nothing on iOS / Android.
        Demo: () => (
          <View className="gap-2">
            <Text className="text-xs text-text-secondary">Tab into the area below to reveal the skip link:</Text>
            <View className="gap-2 rounded-md border border-dashed border-border p-4">
              <SkipLink href="#demo-main" />
              <Text nativeID="demo-main" className="text-sm text-text-primary">
                Main content area
              </Text>
            </View>
          </View>
        ),
      },
      {
        title: "LiveRegion",
        Demo: () => <LiveRegionDemo />,
      },
    ],
  },
  {
    id: "toast",
    variants: [
      {
        title: "Variants",
        Demo: () => (
          <ToastButtons
            items={[
              { label: "Success", variant: "primary", run: () => toast.success("Değişiklikler kaydedildi.") },
              { label: "Info", variant: "outline", run: () => toast.info("Yeni bir güncelleme mevcut.") },
              { label: "Warning", variant: "secondary", run: () => toast.warning("Oturum 5 dk sonra sona erecek.") },
              { label: "Error", variant: "danger", run: () => toast.error("Kaydetme başarısız oldu.") },
            ]}
          />
        ),
      },
      {
        title: "Title + Message",
        Demo: () => (
          <ToastButtons
            items={[
              {
                label: "Title + Message",
                variant: "primary",
                run: () => toast.success("Dosya yüklendi.", { title: "Yükleme tamamlandı" }),
              },
              {
                label: "Title + Error",
                variant: "danger",
                run: () => toast.error("Sunucuya bağlanılamadı. Ağ bağlantınızı kontrol edin.", { title: "Bağlantı hatası" }),
              },
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
                label: "İki action",
                variant: "outline",
                run: () =>
                  toast.info("Öğe çöp kutusuna taşındı.", {
                    title: "Silindi",
                    actions: [
                      { label: "Geri Al", onPress: (dismiss) => dismiss() },
                      { label: "Kalıcı sil", onPress: (d) => d(), variant: "danger" },
                    ],
                  }),
              },
              {
                label: "Tek action",
                variant: "outline",
                run: () =>
                  toast.success("Rapor oluşturuldu.", {
                    actions: [{ label: "İndir", onPress: (dismiss) => dismiss() }],
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
              {
                label: "promise() → success",
                variant: "primary",
                run: () =>
                  toast.promise(
                    wait(2500).then(() => "rapor.pdf"),
                    {
                      loading: "Rapor oluşturuluyor...",
                      success: (file) => `${file} başarıyla oluşturuldu.`,
                      error: "Rapor oluşturulamadı.",
                    },
                  ),
              },
              {
                label: "promise() → error",
                variant: "danger",
                run: () =>
                  toast.promise(
                    wait(2000).then(() => {
                      throw new Error("Timeout");
                    }),
                    { loading: "Veri gönderiliyor...", success: "Gönderildi!", error: "Gönderme başarısız oldu." },
                  ),
              },
              { label: "loading()", variant: "outline", run: () => toast.loading("İşleniyor...") },
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
                label: "promise() happy path",
                variant: "primary",
                run: () =>
                  toast.promise(fetchUser(), {
                    loading: "Kullanıcı yükleniyor...",
                    success: (u) => `${u.name} (#${u.id}) yüklendi.`,
                    error: (e) => `Hata: ${(e as Error).message}`,
                  }),
              },
              {
                label: "promise() error path",
                variant: "danger",
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
    // Mirrors KuiReact's Progress showcase variants 1:1 (same titles and values).
    variants: [
      {
        title: "Bar",
        Demo: () => (
          <View className="gap-3">
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
            <Progress value={15} shape="circle" variant="error" size="sm" />
          </View>
        ),
      },
    ],
  },
  {
    id: "alert-banner",
    // Mirrors KuiReact's AlertBanner showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Info",
        Demo: () => <AlertBanner variant="info" title="System update" message="A new version is available. Please refresh the page." dismissible />,
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
            message="Upgrade before your trial ends to keep access."
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
            message="New guides are available for the latest API changes."
            action={{ label: "Read docs", href: "https://next-js-components.kuray.dev" }}
          />
        ),
      },
      {
        title: "Custom icon",
        Demo: () => <AlertBanner variant="info" message="Custom icon override example." icon={<RocketIcon />} />,
      },
    ],
  },
  {
    id: "empty-state",
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
        title: "Table rows",
        Demo: () => (
          <View className="w-full overflow-hidden rounded-lg border border-border">
            <SkeletonTableRow cols={4} />
            <SkeletonTableRow cols={4} />
            <SkeletonTableRow cols={4} />
          </View>
        ),
      },
      {
        title: "Dashboard layout",
        Demo: () => (
          <View className="w-full gap-4" accessibilityState={{ busy: true }}>
            <View className="flex-row gap-3">
              {[0, 1, 2].map((i) => (
                <View key={i} className="flex-1 gap-2 rounded-lg border border-border p-4">
                  <SkeletonLine width="w-1/2" />
                  <SkeletonLine width="w-3/4" className="h-5" />
                  <SkeletonLine width="w-1/3" />
                </View>
              ))}
            </View>
            <View className="overflow-hidden rounded-lg border border-border">
              {[0, 1, 2].map((i) => (
                <SkeletonTableRow key={i} cols={4} />
              ))}
            </View>
          </View>
        ),
      },
      {
        title: "Article layout",
        Demo: () => (
          <View className="gap-4">
            <SkeletonLine width="w-1/4" />
            <View className="gap-2">
              <SkeletonLine width="w-full" className="h-6" />
              <SkeletonLine width="w-3/4" className="h-6" />
            </View>
            <View className="flex-row items-center gap-3">
              <SkeletonAvatar size="sm" />
              <SkeletonLine width="w-24" />
            </View>
            <SkeletonLine className="h-40 rounded-xl" />
            <SkeletonText lines={4} />
          </View>
        ),
      },
    ],
  },
  {
    id: "accordion",
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
    // Mirrors KuiReact's StatCard showcase variant 1:1 (KuiReact's grid-cols-2
    // is a wrapping row of half-width cards).
    variants: [
      {
        title: "Variants",
        Demo: () => (
          // KuiReact: "grid grid-cols-2 sm:grid-cols-4 gap-3" — the showcase
          // viewport is past `sm`, so four equal columns.
          <View className="flex-row gap-3">
            <StatCard className="min-w-0 flex-1" label="Total Users" value={1284} />
            <StatCard className="min-w-0 flex-1" label="Active" value={947} accent="text-success" />
            <StatCard className="min-w-0 flex-1" label="Transferred" value={38} accent="text-info" />
            <StatCard className="min-w-0 flex-1" label="Cancelled" value={12} accent="text-error" />
          </View>
        ),
      },
    ],
  },
  {
    id: "statistic",
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
    // Mirrors KuiReact's Table showcase variants 1:1 (same titles and data).
    variants: [
      {
        title: "With data",
        Demo: () => (
          <Table
            caption="Users table"
            // Widths = the web table's auto-layout widths in this preview.
            columns={[
              { key: "name", header: "Name", width: 81 },
              { key: "email", header: "Email", width: 157 },
              { key: "role", header: "Role", width: 83 },
              { key: "status", header: "Status", width: 95, render: (row) => <Badge variant={row.status === "Active" ? "success" : "neutral"}>{String(row.status)}</Badge> },
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
            // Widths = the web table's auto-layout widths in this preview.
            columns={[
              { key: "name", header: "Name", sortable: true, width: 128 },
              { key: "email", header: "Email", sortable: true, width: 187 },
              { key: "role", header: "Role", sortable: true, width: 101 },
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
              {/* KuiReact uses a bare <input type="password"> here (no reveal toggle). */}
              <TextInput
                secureTextEntry
                value={pwd}
                onChangeText={setPwd}
                placeholder="Enter password…"
                accessibilityLabel="Password"
                className="w-full rounded-md border border-border bg-surface-base px-3 py-2 text-sm leading-5 text-text-primary"
              />
              <ContentScoreBar value={pwd} rules={PWD_RULES} label="Password strength" />
            </View>
          );
        },
      },
    ],
  },
  {
    id: "view-toggle",
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
                // Widths = the min-content widths the web table's auto layout
                // settles on in this narrow preview (names wrap onto two lines).
                columns={[
                  { key: "name", header: "Name", width: 90 },
                  { key: "email", header: "Email", width: 163 },
                  { key: "role", header: "Role", width: 83 },
                  { key: "status", header: "Status", width: 94, render: (row) => <Badge variant={row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "neutral"}>{row.status}</Badge> },
                  { key: "joined", header: "Joined", width: 90 },
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
                // Widths = the web table's auto-layout (min-content) widths here.
                { key: "name", header: "Name", sortable: true, width: 89 },
                { key: "email", header: "Email", sortable: true, width: 165, filter: { kind: "text", placeholder: "Contains…" } },
                {
                  key: "team",
                  header: "Team",
                  width: 118,
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
                { key: "joined", header: "Joined", sortable: true, width: 101 },
              ]}
            />
          </View>
        ),
      },
    ],
  },
  {
    id: "bulk-action-table",
    // Mirrors KuiReact's BulkActionTable showcase variants 1:1 (same titles and data).
    variants: [
      {
        title: "Selection and actions",
        Demo: function Demo() {
          type Row = { id: string; company: string; country: string; stage: string; [key: string]: unknown };
          const ROWS: Row[] = [
            { id: "c1", company: "Northwind Traders", country: "DE", stage: "new" },
            { id: "c2", company: "Contoso Ltd", country: "GB", stage: "contacted" },
            { id: "c3", company: "Fabrikam", country: "NL", stage: "replied" },
            { id: "c4", company: "Adventure Works", country: "TR", stage: "new" },
          ];
          const [selected, setSelected] = useState<string[]>(["c1"]);
          return (
            <View className="w-full">
              <BulkActionTable<Row, string>
                rows={ROWS}
                rowId={(r) => r.id}
                selected={selected}
                onSelectedChange={setSelected}
                // Widths = the web table's auto-layout widths in this preview.
                columns={[
                  { key: "company", header: "Company", width: 160 },
                  { key: "country", header: "Country", width: 104 },
                  { key: "stage", header: "Stage", width: 104 },
                ]}
                actions={[
                  { key: "enrich", label: "Enrich", onAction: () => undefined },
                  { key: "remove", label: "Remove", destructive: true, onAction: () => setSelected([]) },
                ]}
              />
            </View>
          );
        },
      },
      {
        title: "Unselectable rows, and select-all-matching",
        Demo: function Demo() {
          type Row = { id: string; company: string; reason: string; [key: string]: unknown };
          const ROWS: Row[] = [
            { id: "c1", company: "Northwind Traders", reason: "" },
            { id: "c2", company: "Contoso Ltd", reason: "Suppressed \u2014 replied \"stop\"" },
            { id: "c3", company: "Fabrikam", reason: "" },
          ];
          const [selected, setSelected] = useState<string[]>([]);
          return (
            <View className="w-full">
              <BulkActionTable<Row, string>
                rows={ROWS}
                rowId={(r) => r.id}
                selected={selected}
                onSelectedChange={setSelected}
                isRowSelectable={(r) => (r.reason ? r.reason : true)}
                totalMatching={1240}
                onSelectAllMatching={() => undefined}
                // Widths = the web table's auto-layout widths in this preview.
                columns={[
                  { key: "company", header: "Company", width: 151 },
                  { key: "reason", header: "Why not selectable", width: 217 },
                ]}
                actions={[{ key: "email", label: "Email", onAction: () => undefined }]}
              />
            </View>
          );
        },
      },
    ],
  },
  {
    id: "advanced-data-table",
    // Mirrors KuiReact's AdvancedDataTable showcase variants 1:1 (same titles and data).
    variants: [
      {
        title: "Selectable + Expandable",
        Demo: () => {
          const rows = [
            { name: "Alice", role: "Admin", status: "Active", _expanded: <Text className="text-sm text-text-secondary">Joined 2023-01-15 · Last active 2 days ago</Text> },
            { name: "Bob", role: "Editor", status: "Inactive", _expanded: <Text className="text-sm text-text-secondary">Joined 2022-06-10 · Last active 30 days ago</Text> },
            { name: "Carol", role: "Viewer", status: "Active" },
            { name: "Dave", role: "Editor", status: "Active", _expanded: <Text className="text-sm text-text-secondary">Joined 2024-03-01 · Last active today</Text> },
          ];
          return (
            <View className="w-full">
              <AdvancedDataTable
                // Widths = the web table's auto-layout widths in this preview.
                columns={[
                  { key: "name", header: "Name", width: 96 },
                  { key: "role", header: "Role", width: 104 },
                  { key: "status", header: "Status", width: 118 },
                ]}
                rows={rows}
                selectable
                caption="Team members"
              />
            </View>
          );
        },
      },
      {
        title: "Sticky Header",
        Demo: () => (
          <View className="w-full">
            <AdvancedDataTable
              // Widths = the web table's auto-layout widths in this preview.
              columns={[{ key: "n", header: "Name", width: 217 }, { key: "v", header: "Value", width: 199 }]}
              rows={Array.from({ length: 10 }, (_, i) => ({ n: `Row ${i + 1}`, v: i * 10 }))}
              stickyHeader
              caption="Sticky header table"
            />
          </View>
        ),
      },
    ],
  },
  {
    id: "diff-viewer",
    // Mirrors KuiReact's DiffViewer showcase variants 1:1 (same titles and samples).
    variants: [
      { title: "Unified (default)", Demo: () => <DiffViewer oldText={DIFF_SAMPLE_OLD} newText={DIFF_SAMPLE_NEW} /> },
      { title: "Split (yan yana)", Demo: () => <DiffViewer oldText={DIFF_SAMPLE_OLD} newText={DIFF_SAMPLE_NEW} mode="split" /> },
      { title: "With context=1", Demo: () => <DiffViewer oldText={DIFF_LONG_OLD} newText={DIFF_LONG_NEW} context={1} /> },
      { title: "Collapsible unchanged context", Demo: () => <DiffViewer oldText={DIFF_LONG_OLD} newText={DIFF_LONG_NEW} context={3} collapsible /> },
    ],
  },
  {
    id: "chart",
    // Mirrors KuiReact's Chart showcase variants 1:1 (same titles, data and frame copy).
    variants: [
      {
        title: "LineChart",
        Demo: () => (
          <ChartFrame title="Daily active users vs new signups">
            <LineChart series={chartLineSeries} height={220} />
          </ChartFrame>
        ),
      },
      {
        title: "BarChart",
        Demo: () => (
          <ChartFrame title="Revenue vs expenses (monthly)">
            <BarChart series={chartBarSeries} height={220} />
          </ChartFrame>
        ),
      },
      {
        title: "AreaChart",
        Demo: () => (
          <ChartFrame title="Engagement over the week (smoothed)">
            <AreaChart series={chartLineSeries} height={220} fillOpacity={0.18} />
          </ChartFrame>
        ),
      },
      {
        title: "PieChart",
        Demo: () => (
          <ChartFrame title="Sales by category">
            <PieChart series={chartPieSeries} height={220} />
          </ChartFrame>
        ),
      },
      {
        title: "DonutChart",
        Demo: () => (
          <ChartFrame title="Sales by category (donut)">
            <DonutChart series={chartPieSeries} height={220} innerRadius={0.62} />
          </ChartFrame>
        ),
      },
      {
        title: "SparkLine",
        Demo: () => (
          <ChartFrame title="Inline sparklines">
            <View className="flex-row items-center gap-4">
              <Text className="text-sm text-text-primary">MRR</Text>
              <SparkLine values={chartSparkValues} width={120} height={28} filled />
              <Text className="ml-2 text-sm font-medium text-success">+24%</Text>
            </View>
            <View className="mt-3 flex-row items-center gap-4">
              <Text className="text-sm text-text-primary">DAU</Text>
              <SparkLine values={[5, 7, 6, 9, 8, 11, 10, 13]} width={120} height={28} />
              <Text className="ml-2 text-sm font-medium text-success">+8%</Text>
            </View>
          </ChartFrame>
        ),
      },
    ],
  },
  {
    id: "map-view",
    // Mirrors KuiReact's MapView showcase variants 1:1 (same titles, data and Turkish copy).
    variants: [
      {
        title: "Tam özellik — işaretçi + zone + rota",
        Demo: function FullDemo() {
          const [log, setLog] = useState("—");
          return (
            <View className="w-full gap-2">
              <MapView center={MAP_ISTANBUL_CENTER} zoom={6} markers={MAP_CITIES} zones={MAP_ZONES} routes={MAP_ROUTES} onMarkerClick={(id) => setLog(`Tıklanan: ${id}`)} height={420} />
              <Text className="text-xs text-text-secondary">
                <Text className="text-xs font-semibold text-text-primary">Son event:</Text> {log}
              </Text>
            </View>
          );
        },
      },
      {
        title: "Tıkla-ekle işaretçi modu",
        Demo: function AddMarkerDemo() {
          const [markers, setMarkers] = useState<MapMarker[]>([
            { id: "default", position: [41.015, 28.979], variant: "success", tooltip: { title: "Varsayılan işaretçi", description: "\"İşaretçi Ekle\" butonuna tıklayın" } },
          ]);
          return (
            <View className="w-full gap-2">
              <MapView
                center={[39.5, 35.0]}
                zoom={5}
                markers={markers}
                height={380}
                onMarkerAdd={(pos) =>
                  setMarkers((prev) => [
                    ...prev,
                    {
                      id: `m-${Date.now()}`,
                      position: pos,
                      variant: "warning",
                      tooltip: { title: "Yeni İşaretçi", fields: [{ label: "Enlem", value: pos[0].toFixed(5) }, { label: "Boylam", value: pos[1].toFixed(5) }] },
                    },
                  ])
                }
              />
              <Text className="text-xs text-text-secondary">
                Toplam işaretçi: <Text className="text-xs font-semibold text-text-primary">{markers.length}</Text>
              </Text>
            </View>
          );
        },
      },
      {
        title: "Yalnız zone ve rota",
        Demo: () => <MapView center={[39.5, 35.0]} zoom={5} zones={MAP_ZONES} routes={MAP_ROUTES} height={380} />,
      },
    ],
  },
  {
    id: "video-player",
    // Mirrors KuiReact's VideoPlayer showcase variants 1:1 (same titles, media and copy).
    variants: [
      {
        title: "Full featured (kalite + altyazı + dil)",
        Demo: function FullFeaturedDemo() {
          const [log, setLog] = useState("—");
          return (
            <View className="w-full max-w-2xl gap-3">
              <VideoPlayer
                src={VIDEO_PLACEHOLDER}
                title="Placeholder Video — Full Features Demo"
                qualities={[
                  { label: "1080p HD", value: "1080" },
                  { label: "720p", value: "720" },
                  { label: "480p", value: "480" },
                  { label: "360p", value: "360" },
                  { label: "Auto", value: "auto" },
                ]}
                defaultQuality="auto"
                subtitles={VIDEO_SUBTITLES}
                audioTracks={[
                  { label: "English", language: "en" },
                  { label: "Türkçe", language: "tr" },
                  { label: "Français", language: "fr" },
                ]}
                onQualityChange={(v) => setLog(`Quality → ${v}`)}
                onAudioTrackChange={(i) => setLog(`Audio track → ${i}`)}
              />
              <Text className="text-xs text-text-secondary">
                <Text className="text-xs font-semibold text-text-primary">Son callback:</Text> {log}
              </Text>
            </View>
          );
        },
      },
      {
        title: "Subtitle + Font Boyutu",
        Demo: () => (
          <View className="w-full max-w-xl">
            <VideoPlayer src={VIDEO_PLACEHOLDER} title="Placeholder Video — Subtitle Demo" subtitles={VIDEO_SUBTITLES} />
          </View>
        ),
      },
      {
        title: "Minimal (sadece oynatma hızı)",
        Demo: () => (
          <View className="w-full max-w-lg">
            <VideoPlayer src={VIDEO_PLACEHOLDER} />
          </View>
        ),
      },
    ],
  },
  {
    id: "tab-group",
    // Mirrors KuiReact's TabGroup showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Default",
        Demo: () => (
          <TabGroup
            label="Account settings"
            tabs={[
              { id: "profile", label: "Profile", content: <Text variant="bodySm">Profile settings content.</Text> },
              { id: "security", label: "Security", content: <Text variant="bodySm">Security settings content.</Text> },
              { id: "billing", label: "Billing", content: <Text variant="bodySm">Billing settings content.</Text> },
            ]}
          />
        ),
      },
      {
        title: "Icons + badge + disabled",
        Demo: () => (
          <TabGroup
            label="Dashboard sections"
            tabs={[
              { id: "overview", label: "Overview", icon: <Text className="text-sm">📊</Text>, content: <Text variant="bodySm">Overview content.</Text> },
              {
                id: "analytics",
                label: "Analytics",
                icon: <Text className="text-sm">📈</Text>,
                badge: <Badge variant="primary" size="sm">New</Badge>,
                content: <Text variant="bodySm">Analytics content.</Text>,
              },
              { id: "reports", label: "Reports", icon: <Text className="text-sm">📄</Text>, content: <Text variant="bodySm">Reports content.</Text> },
              { id: "settings", label: "Settings", icon: <Text className="text-sm">⚙</Text>, disabled: true, content: <Text>Settings disabled.</Text> },
            ]}
          />
        ),
      },
      {
        title: "Lazy panels",
        Demo: TabGroupLazyDemo,
      },
    ],
  },
  {
    id: "drawer",
    variants: [
      { title: "Right drawer", Demo: DrawerRightDemo },
      { title: "Left drawer", Demo: DrawerLeftDemo },
      { title: "Route-aware close (M6 stub)", Demo: DrawerRouteAwareDemo },
    ],
  },
  {
    id: "popover",
    // Mirrors KuiReact's Popover showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Bottom (default)",
        Demo: () => (
          <Popover trigger={<Button variant="outline">Open Popover</Button>} placement="bottom">
            <View className="gap-2 p-4">
              <Text className="text-sm font-semibold text-text-primary">Popover title</Text>
              <Text className="text-xs text-text-secondary">Contextual content appears here.</Text>
              <Button size="sm" variant="ghost" className="w-full">Action</Button>
            </View>
          </Popover>
        ),
      },
      {
        title: "Placements",
        Demo: () => (
          <View className="flex-row flex-wrap items-center justify-center gap-3 py-8">
            {(["top", "bottom", "left", "right"] as const).map((p) => (
              <Popover key={p} placement={p} trigger={<Button variant="outline" size="sm">{p}</Button>}>
                <View className="p-3">
                  <Text className="text-xs text-text-secondary">Popover on {p}</Text>
                </View>
              </Popover>
            ))}
          </View>
        ),
      },
      {
        title: "Focus trap inside Popover",
        Demo: () => (
          <Popover focusTrap placement="bottom" trigger={<Button variant="outline">Focus-trapped Popover</Button>}>
            <View className="w-64 gap-3 p-4">
              <Text className="text-sm font-semibold text-text-primary">Quick edit</Text>
              <Input placeholder="Title" />
              <Input placeholder="Tag" />
              <View className="flex-row justify-end gap-2 pt-1">
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
              </View>
            </View>
          </Popover>
        ),
      },
    ],
  },
  {
    id: "dropdown-menu",
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
    // Mirrors KuiReact's Tooltip showcase variants 1:1 (same titles and copy).
    variants: [
      {
        title: "Placements",
        Demo: () => (
          <View className="flex-row flex-wrap items-center justify-center gap-6 py-4">
            {(["top", "bottom", "left", "right"] as const).map((p) => (
              <Tooltip key={p} content={`Tooltip ${p}`} placement={p}>
                <Button variant="outline" size="sm">{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
              </Tooltip>
            ))}
          </View>
        ),
      },
      {
        title: "Themes",
        Demo: () => (
          <View className="flex-row flex-wrap items-center justify-center gap-4 py-4">
            <Tooltip content="Default theme" theme="default">
              <Button variant="outline" size="sm">Default</Button>
            </Tooltip>
            <Tooltip content="Dark theme" theme="dark">
              <Button variant="outline" size="sm">Dark</Button>
            </Tooltip>
            <Tooltip content="Light theme" theme="light">
              <Button variant="outline" size="sm">Light</Button>
            </Tooltip>
          </View>
        ),
      },
      {
        title: "Arrow + Delay",
        Demo: () => (
          <View className="flex-row flex-wrap items-center justify-center gap-4 py-4">
            <Tooltip content="With arrow" arrow placement="top">
              <Button variant="outline" size="sm">Arrow</Button>
            </Tooltip>
            <Tooltip content="500ms delay" delay={500} placement="bottom">
              <Button variant="outline" size="sm">Delayed</Button>
            </Tooltip>
            <Tooltip content="Arrow + dark + delay" arrow theme="dark" delay={300} placement="right">
              <Button variant="outline" size="sm">Combined</Button>
            </Tooltip>
          </View>
        ),
      },
    ],
  },
  {
    id: "popconfirm",
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
