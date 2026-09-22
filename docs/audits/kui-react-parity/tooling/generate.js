// Generates the data-driven parts of docs/audits/kui-react-parity/ from
// facts.json (source-derived) + curated.js (reviewer judgement).
// Hand-written analytical reports live alongside and are not touched here.
const fs = require("fs");
const path = require("path");

const OUT = "C:/Users/kuray/Documents/Projects/KUInative/docs/audits/kui-react-parity";
const { facts, knFacts, knMeta, SHARED, knLight, knDark, registryGeneratedAt, registryVersion } = require("./facts.json");
const { rows, domainPolicy, domainOverrides } = require("./curated.js");
const AUDIT_DATE = "2026-09-22";

const write = (rel, content) => {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.replace(/\n{3,}/g, "\n\n"));
};
const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const code = (s) => "`" + String(s).replace(/`/g, "'") + "`";
const trunc = (s, n = 90) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s || "");
const table = (head, body) => [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...body.map((r) => `| ${r.map(esc).join(" | ")} |`)].join("\n");
const byId = Object.fromEntries(facts.map((f) => [f.id, f]));
const knComponentFiles = new Set(knFacts.map((k) => k.file)).size;

// ---------------------------------------------------------------- classification
const SHARED_CATEGORY = { button: "Foundation", badge: "Data Display", avatar: "Data Display", spinner: "Feedback", skeleton: "Feedback", input: "Forms", checkbox: "Forms", toggle: "Forms", card: "Layout", "empty-state": "Feedback", modal: "Overlay", label: "Typography", separator: "Layout", "alert-banner": "Feedback", "radio-group": "Forms", textarea: "Forms", "tab-group": "Navigation", progress: "Feedback", select: "Forms", drawer: "Overlay", toast: "Feedback", popover: "Overlay", "dropdown-menu": "Overlay", tooltip: "Overlay", accordion: "Data Display", "button-group": "Forms", "checkbox-group": "Forms", "search-bar": "Forms", pagination: "Navigation", stepper: "Navigation", breadcrumb: "Navigation", "page-header": "Layout", "multi-select": "Forms", "range-slider": "Forms", "date-picker": "Forms", "date-range-picker": "Forms", "time-picker": "Forms", "brand-logo": "Foundation", popconfirm: "Overlay", "star-rating": "Forms", "stat-card": "Data Display", statistic: "Data Display", "tab-button": "Navigation", timeline: "Data Display", "tag-input": "Forms", "combo-box": "Forms", "file-input": "Forms", table: "Tables", slider: "Media", "content-score-bar": "Data Display", "view-toggle": "Forms", "scroll-area": "Layout" };
const cur = Object.fromEntries(rows.map(([id, category, priority, complexity, wave, fit, reason, rnNotes, rnDeps]) => [id, { category, priority, complexity, wave, fit, reason, rnNotes, rnDeps }]));
const VERT = { common: "Common", blog: "Blog", event: "Event", "api-doc": "API Doc", landing: "Landing", jobs: "Jobs", fintech: "Fintech", commerce: "Commerce", media: "Media", forum: "Forum", "real-estate": "Real Estate", food: "Food", travel: "Travel", ai: "AI", social: "Social", iot: "IoT", nft: "NFT", reviews: "Reviews" };

function complexityFromLoc(loc) { return loc < 70 ? "Small" : loc < 200 ? "Medium" : loc < 600 ? "Large" : "Very Large"; }
const IN_SCOPE = (f) => f.layer === "ui" && ["Atom", "Molecule", "Organism"].includes(f.regCategory);

function meta(f) {
  if (SHARED[f.id]) return { category: SHARED_CATEGORY[f.id], shared: true };
  if (!IN_SCOPE(f)) {
    const why = f.layer === "domain"
      ? `Domain vertical (${VERT[f.vertical] || f.vertical}) — out of scope. KuiNative development is scoped to core ui-layer atoms, molecules and organisms only; domain verticals and theme demos are not covered by this audit or roadmap.`
      : f.layer === "app"
      ? "App-layer component (app shell, navigation chrome, forms/flows, providers) — out of scope. KuiNative development is scoped to core ui-layer atoms, molecules and organisms only."
      : f.layer === "library"
      ? "External npm package (kui-viewer) featured in the showcase; not a first-party component."
      : f.layer === "hook"
      ? "Supporting hook, not a component — out of scope for the atoms/molecules/organisms backlog; referenced only as a dependency note where relevant."
      : `ui-layer component in category "${f.regCategory}" (not Atom/Molecule/Organism) — out of scope.`;
    return { category: f.layer === "domain" ? `Domain — ${VERT[f.vertical] || f.vertical} (out of scope)` : f.layer === "app" ? "App layer (out of scope)" : f.layer === "hook" ? "Hook (out of scope)" : "Other (out of scope)", priority: "—", complexity: "—", wave: null, fit: "web-only", reason: why, excluded: true, outOfScope: true };
  }
  if (cur[f.id]) return cur[f.id];
  throw new Error("no curation for " + f.id);
}
for (const f of facts) f.meta = meta(f);

const missing = facts.filter((f) => !f.meta.shared && !f.meta.excluded);
const missingCore = missing.filter((f) => !f.vertical);
const missingDomain = missing.filter((f) => f.vertical);
const PRI = ["Critical", "High", "Medium", "Low"];
const CPX = ["Small", "Medium", "Large", "Very Large"];
const EFFORT = { Small: [0.5, 1], Medium: [2, 3], Large: [5, 8], "Very Large": [10, 20] };
const priRank = (p) => PRI.indexOf(p);
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[\s_+]+/g, "-").toLowerCase();

function backlogPath(f) { return f.vertical ? `component-backlog/domains/${f.vertical}/${f.id}.md` : `component-backlog/${f.id}.md`; }
function linkFrom(fromRel, f) { return path.posix.relative(path.posix.dirname(fromRel), backlogPath(f)); }

// Native presence for a KuiReact id
function nativeStatus(id) {
  if (SHARED[id]) return `exists as ${SHARED[id].map((n) => code(n)).join(" + ")}`;
  const f = byId[id];
  if (f && f.meta.excluded) return "excluded";
  return "missing";
}

// ---------------------------------------------------------------- remediation (shared components + infra)
const REMEDIATION = [
  { id: "R-infra-test", title: "Test harness: Jest + @testing-library/react-native + CI", priority: "Critical", complexity: "Medium", wave: 1, deps: [], why: "At audit time KuiNative had zero tests; KuiReact has 18 unit-test files + 739 visual snapshots. Every later item's acceptance criteria require tests." },
  { id: "R-infra-package", title: "Make KuiNative a consumable library (exports map, build, peer deps, NativeWind preset)", priority: "Critical", complexity: "Large", wave: 1, deps: [], why: "`package.json` is `private: true` with `main: expo-router/entry`; the library cannot be installed. KuiReact ships `@kuraykaraaslan/kui-react` with `./ui`, `./app`, `./common` entries." },
  { id: "R-theme-provider", title: "Export a `KuiProvider` (token `vars()` + scheme resolution) from the library", priority: "Critical", complexity: "Small", wave: 1, deps: ["R-infra-package"], why: "Theme wiring lives in the showcase `app/_layout.tsx`; a consumer gets unthemed components." },
  { id: "R-typography", title: "Fix `Text` weights/fonts (Geist, real bold/semibold) and align scale to KuiReact usage", priority: "Critical", complexity: "Small", wave: 1, deps: [], why: "Heading variants set `fontFamily: 'System'` with no `fontWeight`, so h1–h4 render regular-weight on iOS/web; README claims Inter while KuiReact uses Geist." },
  { id: "R-overlay-core", title: "Overlay core (presence/animation, backdrop, host, a11y) mirroring `Overlays/shared`", priority: "Critical", complexity: "Medium", wave: 1, deps: [], why: "KuiReact Modal/Drawer/Popover share presence, focus-trap, scroll-lock, portal and positioning hooks. KuiNative has no shared overlay layer, so every overlay would re-invent it." },
  { id: "R-modal", title: "Modal rewrite (see rewrite-candidates.md)", priority: "Critical", complexity: "Medium", wave: 1, deps: ["R-overlay-core"], why: "Merged accessibility tree, no close button, no scroll, no sizes, `visible` vs `open`." },
  { id: "R-field-shell", title: "Extract FieldShell (Label, hint, error, success, count) shared by all form controls", priority: "Critical", complexity: "Small", wave: 1, deps: ["label"], why: "KuiReact Input/Textarea/Select/Checkbox share one label/hint/error convention; KuiNative re-implements a subset per component." },
  { id: "R-input", title: "Input parity (rename to `Input`, success, required, prefix/suffix, clearable, password toggle, count, readOnly, typed ref)", priority: "Critical", complexity: "Medium", wave: 1, deps: ["R-field-shell"], why: "8 KuiReact features missing; name differs." },
  { id: "R-button", title: "Button parity (children, `danger`, xs/xl, iconRight, iconOnly, selected, rest/ref, pressed tokens)", priority: "Critical", complexity: "Small", wave: 1, deps: [], why: "Most-imported KuiReact component (137 production imports) and the one a KuiReact developer tries first." },
  { id: "R-badge", title: "Badge parity (children, `neutral`, sizes, dot, dismissible)", priority: "High", complexity: "Small", wave: 2, deps: [], why: "Second most-imported KuiReact component (109 production imports); 60+ domain status badges wrap it." },
  { id: "R-card", title: "Card parity (flat variant, headerRight, onPress, loading, section layout, shadow)", priority: "High", complexity: "Small", wave: 2, deps: ["R-shadow"], why: "Layout differs (single padded box vs header/body/footer sections)." },
  { id: "R-avatar", title: "Avatar parity (status dot, lg/xl sizes, `?` fallback) + AvatarGroup rewrite", priority: "High", complexity: "Small", wave: 2, deps: [], why: "AvatarGroup uses a children API; KuiReact uses data-driven `avatars/max/size` with overflow chip." },
  { id: "R-checkbox", title: "Checkbox parity (hint, error, uncontrolled `defaultChecked`)", priority: "High", complexity: "Small", wave: 2, deps: ["R-field-shell"], why: "Error/hint states missing." },
  { id: "R-toggle", title: "Switch → Toggle parity (name, checked/onChange, description, size, label press)", priority: "High", complexity: "Small", wave: 2, deps: [], why: "Different name and prop names; label is not pressable." },
  { id: "R-skeleton", title: "Skeleton family (Line, Avatar, Text, TableRow) + SkeletonCard layout + reduced motion", priority: "High", complexity: "Small", wave: 2, deps: [], why: "4 of 5 KuiReact skeleton exports missing." },
  { id: "R-spinner", title: "Spinner parity (xs–xl, two-tone ring, md ≠ sm)", priority: "Medium", complexity: "Small", wave: 2, deps: [], why: "`sm` and `md` render identically; xs/xl missing." },
  { id: "R-empty-state", title: "EmptyState parity (`action: ReactNode`, optional icon, KuiReact spacing)", priority: "Medium", complexity: "Small", wave: 2, deps: [], why: "`actionLabel/onAction` cannot express KuiReact's arbitrary action node." },
  { id: "R-shadow", title: "Shadow/elevation token strategy (shadow-sm/md/xl → iOS shadow + Android elevation)", priority: "Medium", complexity: "Small", wave: 2, deps: [], why: "No KuiNative component renders a shadow; KuiReact Card/Modal/Toggle do." },
  { id: "R-fa-version", title: "Align Font Awesome to v7 (KuiReact peer range `>=7`)", priority: "High", complexity: "Small", wave: 1, deps: [], why: "ADR 0003 requires same icon-set version; KuiNative pins `^6.7.2`." },
  { id: "R-infra-lint", title: "ESLint (expo + a11y), token/raw-hex audit, convention rules", priority: "High", complexity: "Small", wave: 1, deps: [], why: "`expo lint` script exists but no config; KuiReact enforces cn(), no default export, token-only styling via custom rules + audits." },
  { id: "R-infra-parity", title: "Parity contract: `parity.exceptions.json`, generated parity matrix, component registry", priority: "High", complexity: "Medium", wave: 2, deps: ["R-infra-test"], why: "Makes this audit repeatable and CI-enforced (mirrors KuiReact ADR 0003)." },
];
const remById = Object.fromEntries(REMEDIATION.map((r) => [r.id, r]));
// Progress on remediation items since the audit (see PROGRESS.md). "partial" keeps the item open.
const REM_STATUS = {
  "R-infra-test": ["partial", "Jest + RNTL harness since `4ebda43`; CI still missing"],
  "R-button": ["done", "`2866e66`"], "R-input": ["done", "`92af9a3`"], "R-overlay-core": ["done", "`27def3b`, anchored panels `68ce86d`"],
  "R-modal": ["done", "`27def3b`"], "R-badge": ["done", "`3e48fad`"], "R-card": ["done", "`dbdbdbd`"], "R-avatar": ["done", "`599c8a1`"],
  "R-checkbox": ["done", "`75edb0c`"], "R-toggle": ["done", "`5f484a8`"], "R-empty-state": ["done", "`7ca2284`"], "R-shadow": ["done", "`048ebed`: shadow classes + Android elevation"],
  "R-skeleton": ["partial", "Line / Avatar / Text since `048ebed`; Table primitive landed (`b83d87f`) but SkeletonTableRow is still missing"],
  "R-spinner": ["partial", "sizes fixed in `4ebda43`; two-tone ring still missing"],
  "R-typography": ["partial", "weights fixed (`048ebed`, `2866e66`); Geist not bundled"],
};
const isDone = (it) => it.kind === "remediation" && REM_STATUS[it.id] && REM_STATUS[it.id][0] === "done";
const remMark = (id) => REM_STATUS[id] ? (REM_STATUS[id][0] === "done" ? ` — ✓ done (${REM_STATUS[id][1]})` : ` — partial: ${REM_STATUS[id][1]}`) : "";

// Items (missing + remediation) with dependencies for ordering
const OVERLAY_USERS = new Set(["drawer", "popover", "select", "multi-select", "combo-box", "dropdown-menu", "date-picker", "date-range-picker", "time-picker", "popconfirm", "tooltip", "context-menu", "share-dialog"]);
const FIELD_USERS = new Set(["textarea", "select", "multi-select", "combo-box", "search-bar", "tag-input", "date-picker", "date-range-picker", "time-picker", "checkbox-group", "radio-group", "file-input"]);
function itemDeps(f) {
  const d = new Set();
  for (const c of f.composes) if (c === "use-focus-trap") d.add("R-overlay-core"); else if (byId[c] && !byId[c].meta.shared && !byId[c].meta.excluded && byId[c].id !== f.id) d.add(c);
  for (const c of f.composes) if (SHARED[c]) d.add({ button: "R-button", badge: "R-badge", avatar: "R-avatar", input: "R-input", checkbox: "R-checkbox", toggle: "R-toggle", card: "R-card", modal: "R-modal", spinner: "R-spinner", skeleton: "R-skeleton", "empty-state": "R-empty-state" }[c]);
  for (const r of (f.meta.rnDeps || [])) if (byId[r] && !byId[r].meta.shared) d.add(r);
  if (OVERLAY_USERS.has(f.id)) d.add("R-overlay-core");
  if (FIELD_USERS.has(f.id)) d.add("R-field-shell");
  if (f.id === "theme-switcher") d.add("R-theme-provider");
  d.delete(undefined);
  return [...d];
}
const coreItems = [
  ...REMEDIATION.map((r) => ({ id: r.id, title: r.title, priority: r.priority, complexity: r.complexity, wave: r.wave, deps: r.deps, kind: "remediation", why: r.why })),
  ...missingCore.map((f) => ({ id: f.id, title: `${f.name} (new)`, priority: f.meta.priority, complexity: f.meta.complexity, wave: f.meta.wave, deps: itemDeps(f), kind: "missing", why: f.meta.reason, f })),
];
const itemById = Object.fromEntries(coreItems.map((i) => [i.id, i]));
// A dependency can never land in a later wave than its dependant — pull deps forward.
let changed = true;
while (changed) {
  changed = false;
  for (const it of coreItems) for (const d of it.deps) {
    const dep = itemById[d];
    if (dep && dep.wave > it.wave) { dep.wave = it.wave; dep.pulledForward = (dep.pulledForward || []).concat(it.id); changed = true; }
  }
}
// Topological order: waves, then priority, then dependency.
function topo(items) {
  const set = new Set(items.map((i) => i.id));
  const done = new Set(); const out = [];
  const infra = (i) => (i.id.startsWith("R-infra") ? 0 : 1);
  const sorted = [...items].sort((a, b) => a.wave - b.wave || infra(a) - infra(b) || priRank(a.priority) - priRank(b.priority) || CPX.indexOf(a.complexity) - CPX.indexOf(b.complexity) || a.id.localeCompare(b.id));
  function visit(it, stack = []) {
    if (done.has(it.id) || stack.includes(it.id)) return;
    for (const d of it.deps) if (set.has(d)) visit(itemById[d], [...stack, it.id]);
    done.add(it.id); out.push(it);
  }
  for (const it of sorted) visit(it);
  return out;
}
const ordered = topo(coreItems);
ordered.forEach((it, i) => (it.order = i + 1));

// ---------------------------------------------------------------- text helpers
const header = (title, sub) => `# ${title}\n\n> KuiReact ↔ KuiNative parity audit · ${AUDIT_DATE} · generated from source (KuiReact registry v${registryVersion}, snapshot ${registryGeneratedAt.slice(0, 10)}).${sub ? "\n> " + sub : ""}\n`;
const effortStr = (c) => (EFFORT[c] ? `${EFFORT[c][0]}–${EFFORT[c][1]} d` : "—");
const sumEffort = (items) => items.reduce((a, i) => [a[0] + (EFFORT[i.complexity] || [0, 0])[0], a[1] + (EFFORT[i.complexity] || [0, 0])[1]], [0, 0]);

// =====================================================================
// PHASE 1 — inventory
// =====================================================================
const CAT_ORDER = ["Foundation", "Typography", "Layout", "Navigation", "Forms", "Feedback", "Overlay", "Data Display", "Tables", "Charts", "Media", "Advanced Components", "Providers", "Hooks", "Theme", "Utility", "Other (external library)"];
const catKey = (c) => { const i = CAT_ORDER.indexOf(c); return i < 0 ? 100 + c.localeCompare("") : i; };
const cats = [...new Set(facts.map((f) => f.meta.category))].sort((a, b) => {
  const da = a.startsWith("Domain"), db = b.startsWith("Domain");
  if (da !== db) return da ? 1 : -1;
  if (da) return a === "Domain — Common" ? -1 : b === "Domain — Common" ? 1 : a.localeCompare(b);
  return catKey(a) - catKey(b);
});

function krRow(f, fromRel) {
  const kn = SHARED[f.id] ? `✓ ${SHARED[f.id].join(" + ")}` : f.meta.excluded ? "n/a" : `✗ [backlog](${linkFrom(fromRel, f)})`;
  return [f.name, code(f.id), f.layer, code(f.public.path), f.public.status, f.loc, f.composes.length ? f.composes.join(", ") : "—", f.usedBy.length, `${f.importsProd} / ${f.importsShowcase}`, f.tests.length ? `✓ (${f.testCases.length})` : "—", kn];
}
{
  const rel = "phase-1-inventory/kui-react-components.md";
  const parts = [header("KuiReact component inventory", "Every registry entry plus every barrel export missing from the registry. One row per component.")];
  parts.push(`## Method

- **Source of truth:** \`kui-react/public/registry/components.json\` (${facts.filter((f) => f.registry).length} entries: layers ui/app/domain/library) plus the explicit barrels \`modules/ui/index.ts\`, \`modules/app/index.ts\`, \`index.ts\`, \`modules/domains/*/index.ts\` and \`libs/hooks\`, \`libs/a11y\`.
- **Barrel exports not in the registry** were added by hand-verified path (${facts.filter((f) => !f.registry).length}): ${facts.filter((f) => !f.registry).map((f) => code(f.name)).join(", ")}. The registry claims to be the canonical catalog (KuiReact ADR 0002); these are catalog gaps in KuiReact itself.
- **Export path / public status** come from barrel parsing and \`tsup.config.ts\` entries (\`index\`, \`ui\`, \`app\`, \`common\`). Domain verticals other than \`common\` are *not* in the npm package; they are copy-from-source components.
- **LOC** counts the component file (or its whole directory for directory modules), excluding tests.
- **Composes** = KuiReact components imported by the component's own files (first-party dependency edges, parsed from \`import\` statements).
- **Used by** = registry \`usedBy[]\` count. **Imports (prod / showcase)** = number of distinct source files importing the component, split into production code (\`modules/**\`, \`app/theme/**\`) and showcase/docs code — the usage-frequency indicator.
- **Tests** = co-located \`*.test.tsx\` and number of \`it()\` cases.
- **KuiNative** = ✓ with the native export name when a counterpart exists; ✗ links to the backlog file.
`);
  for (const c of cats) {
    const list = facts.filter((f) => f.meta.category === c).sort((a, b) => b.importsProd - a.importsProd || a.name.localeCompare(b.name));
    parts.push(`## ${c} (${list.length})\n\n` + table(["Component", "id", "Layer", "Export path", "Public status", "LOC", "Composes", "Used by", "Imports (prod / showcase)", "Tests", "KuiNative"], list.map((f) => krRow(f, rel))));
  }
  write(rel, parts.join("\n\n"));
}

// KuiNative inventory
const knShowcasePrivate = [
  ["Sidebar", "modules/showcase/ui/Sidebar.tsx", "Navigation", "app-sidebar"],
  ["AppDrawer", "modules/showcase/ui/AppDrawer.tsx", "Navigation", "app-drawer"],
  ["Header", "modules/showcase/ui/Header.tsx", "Navigation", "app-top-bar"],
  ["ThemeToggle", "modules/showcase/ui/ThemeToggle.tsx", "Theme", "theme-switcher"],
  ["CodeBlock", "modules/showcase/ui/CodeBlock.tsx", "Data Display", "—"],
  ["useDrawer (zustand store)", "modules/showcase/ui/drawer.store.ts", "Hooks", "—"],
];
const KN_CATEGORY = { Button: "Foundation", Text: "Typography", Card: "Layout", Avatar: "Data Display", AvatarGroup: "Data Display", Badge: "Data Display", TextInput: "Forms", Input: "Forms", Toggle: "Forms", Checkbox: "Forms", Switch: "Forms", Spinner: "Feedback", EmptyState: "Feedback", SkeletonCard: "Feedback", Modal: "Overlay", Label: "Typography", Separator: "Layout", AlertBanner: "Feedback", RadioGroup: "Forms", Textarea: "Forms", TabGroup: "Navigation", Progress: "Feedback", SkeletonLine: "Feedback", SkeletonAvatar: "Feedback", SkeletonText: "Feedback", Select: "Forms", Drawer: "Overlay", Toaster: "Feedback", Toast: "Feedback", ToastProvider: "Feedback", ToastRegion: "Feedback", toast: "Feedback", useToast: "Hooks", useToastStore: "Hooks", getEffectiveDuration: "Feedback", Popover: "Overlay", DropdownMenu: "Overlay", Tooltip: "Overlay", Accordion: "Data Display", ButtonGroup: "Forms", CheckboxGroup: "Forms", SearchBar: "Forms", Pagination: "Navigation", Stepper: "Navigation", Breadcrumb: "Navigation", PageHeader: "Layout", MultiSelect: "Forms", RangeSlider: "Forms", BrandLogo: "Foundation", ComboBox: "Forms", DatePicker: "Forms", DateRangePicker: "Forms", DateTimePicker: "Forms", FileInput: "Forms", Popconfirm: "Overlay", Slider: "Media", releaseStep: "Media", TabButton: "Navigation", Table: "Tables", TagInput: "Forms", StarRating: "Forms", StatCard: "Data Display", Statistic: "Data Display", Timeline: "Data Display", TimePicker: "Forms", ContentScoreBar: "Data Display", ViewToggle: "Forms", ScrollArea: "Layout" };
{
  const rel = "phase-1-inventory/kui-native-components.md";
  const deps = (k) => { const src = fs.readFileSync(path.join("C:/Users/kuray/Documents/Projects/KUInative", k.file), "utf8"); return [...src.matchAll(/from\s+["']\.\/(\w+)["']/g)].map((m) => m[1]).join(", ") || "—"; };
  const parts = [header("KuiNative component inventory", "Every export of `modules/ui/index.ts`, every theme utility, and showcase-private components that shadow KuiReact library components.")];
  parts.push(`## Package status

| Aspect | Value | Evidence |
| --- | --- | --- |
| Package name | \`kui-native\` 0.1.0 | \`package.json\` |
| Publishable | **No** — \`"private": true\`, \`"main": "expo-router/entry"\`, no \`exports\`, no build script | \`package.json\` |
| Public import path | \`@/modules/ui\` (repo-internal alias only) | \`modules/ui/index.ts\`, \`babel.config.js\` |
| Library components | ${knFacts.length} exports from ${new Set(knFacts.map((k) => k.file)).size} files | \`modules/ui/index.ts\` |
| Type exports | ${knMeta.typeExports} (\`export type\` names) | \`modules/ui/index.ts\` |
| Hooks exported from library | ${knFacts.filter((k) => /^use[A-Z]/.test(k.name)).map((k) => code(k.name)).join(", ")} (theme hooks live in \`libs/theme.ts\`, not in the barrel) | \`modules/ui/index.ts\` |
| Providers exported | \`ToastProvider\`, \`Toaster\` | \`modules/ui/Toast\` |
| Tests | ${knMeta.testFiles.length} files, ${knMeta.testCases} static \`it\` / \`test\` blocks (Jest \`jest-expo\` + \`@testing-library/react-native\`) | \`git ls-tree ${knMeta.rev}\` |

"Public" below therefore means *exported from the \`@/modules/ui\` barrel*; nothing is installable by a consumer today.

## Library components (${knFacts.length})

` + table(["Component", "Category", "File", "Export path", "Public status", "LOC", "Props", "Depends on", "Used by (repo)", "a11y props used", "Raw colors", "KuiReact counterpart"],
    knFacts.map((k) => [k.name, KN_CATEGORY[k.name], code(k.file), code("@/modules/ui"), "barrel export", k.loc, k.props ? k.props.members.length + (k.props.extends.length ? " + " + k.props.extends.map((e) => e.replace(/^RN/, "")).join(", ") : "") : "?", deps(k), k.users.length, k.a11y.join(", ") || "—", k.rawColors, k.krCounterpart ? `${byId[k.krCounterpart].name} (${code(k.krCounterpart)})` : "none (native-only)"])));
  parts.push(`## Props per component (parsed)

` + knFacts.map((k) => `### ${k.name}\n\n` + (k.props && k.props.members.length ? table(["Prop", "Type", "Required", "Default"], k.props.members.map((m) => [m.name, code(trunc(m.type, 70)), m.optional ? "no" : "**yes**", m.default ? code(m.default) : "—"])) + (k.props.extends.length ? `\n\nExtends: ${k.props.extends.map(code).join(", ")}` : "") : "_no props parsed_")).join("\n\n"));
  parts.push(`## Theme & foundation utilities

| Export | File | Kind | KuiReact equivalent |
| --- | --- | --- | --- |
| \`themes\` (light/dark NativeWind \`vars()\`) | \`libs/theme.ts\` | Theme | \`:root\` / \`.dark\` blocks in \`app/globals.css\` |
| \`tokenMaps\` (raw hex per scheme) | \`libs/theme.ts\` | Theme | none (CSS variables are readable at runtime on web) |
| \`useThemeMode\` (zustand: system/light/dark + \`cycle\`) | \`libs/theme.ts\` | Hook / store | \`ThemeSwitcher\` internal state (\`modules/app/ThemeSwitcher.tsx\`) |
| \`useResolvedScheme\` | \`libs/theme.ts\` | Hook | none |
| \`useThemeTokens\` | \`libs/theme.ts\` | Hook | none |
| \`cn\` | \`libs/utils/cn.ts\` | Utility | \`libs/utils/cn.ts\` (identical implementation) |
| \`colors\` (tailwind token map) | \`libs/utils/tailwind-tokens.js\` | Theme | \`@theme inline\` block in \`globals.css\` |
| \`FONTS\` | \`libs/utils/typography.ts\` | Foundation | \`Geist\` / \`Geist_Mono\` via \`next/font\` (\`app/layout.tsx\`) |

## Showcase-private components that shadow KuiReact library components

These live under \`modules/showcase/ui/\`, are **not** exported from the library, and several share a name or role with a public KuiReact component. A consumer cannot use them.

` + table(["Component", "File", "Category", "KuiReact library counterpart"], knShowcasePrivate.map(([n, f, c, k]) => [n, code(f), c, k === "—" ? "—" : `${byId[k].name} (${code(k)}) — missing from KuiNative library`])));
  write(rel, parts.join("\n\n"));
}

// public exports
{
  const rel = "phase-1-inventory/public-exports.md";
  const barrel = (file) => { const src = fs.readFileSync(path.join("//wsl.localhost/Ubuntu/home/kuray/kui-react", file), "utf8"); const v = [], t = []; for (const m of src.matchAll(/export\s+(type\s+)?\{([^}]*)\}/g)) for (const n of m[2].split(",")) { const nm = n.trim().split(/\s+as\s+/).pop().replace(/^type\s+/, "").trim(); if (!nm) continue; (m[1] || n.trim().startsWith("type ") ? t : v).push(nm); } for (const m of src.matchAll(/export\s+(?:function|const)\s+([\w$]+)/g)) v.push(m[1]); for (const m of src.matchAll(/export\s+\*\s+as\s+(\w+)/g)) v.push(m[1] + " (namespace)"); return { v, t }; };
  const knNames = new Set(knFacts.map((k) => k.name));
  const equiv = { Input: "TextInput", Toggle: "Switch", SkeletonCard: "SkeletonCard" };
  const mark = (n) => knNames.has(n) ? "✓ same name" : equiv[n] && knNames.has(equiv[n]) ? `≈ ${equiv[n]}` : "✗";
  const ui = barrel("modules/ui/index.ts"), app = barrel("modules/app/index.ts"), root = barrel("index.ts"), common = barrel("modules/domains/common/index.ts");
  const parts = [header("Public exports", "Barrel-level comparison. ✓ = same export name in KuiNative, ≈ = counterpart under a different name, ✗ = absent.")];
  parts.push(`## Summary

| Surface | KuiReact | KuiNative |
| --- | --- | --- |
| npm package | \`@kuraykaraaslan/kui-react\` 1.0.1 (ESM + CJS + d.ts via tsup) | none (\`private: true\`) |
| Entry points | \`.\`, \`./ui\`, \`./app\`, \`./common\`, \`./styles\` | \`@/modules/ui\` (repo alias) |
| ui barrel value exports | ${ui.v.length} | ${knFacts.length} |
| ui barrel type exports | ${ui.t.length} | ${knMeta.typeExports} |
| app barrel value exports | ${app.v.length} | 0 |
| common barrel value exports | ${common.v.length} | 0 |
| Hooks (public) | \`useToastStore\`, \`useAnnounce\`, \`useDirection\` (+ internal \`useBreakpoint\`, \`useFocusTrap\`, \`useA11yCheck\`) | 0 in barrel (\`useThemeMode\`, \`useResolvedScheme\`, \`useThemeTokens\` in \`libs/theme.ts\`) |
| Providers (public) | \`ToastProvider\`, \`NotificationProvider\`, \`DirectionProvider\` | 0 |
| Imperative APIs | \`toast()\`, \`notify\`, \`getEffectiveDuration\` | 0 |
| Styles export | \`./styles\` (tokens CSS) | \`global.css\` + \`libs/theme.ts\` (not exported) |

Type-export parity note: KuiNative exports a \`*Props\` type for every component; KuiReact's ui barrel mostly does **not** export props types (it exports data types such as \`SelectOption\`, \`Tab\`, \`TableColumn\`). This is one of the few areas where KuiNative's DX is ahead.

## KuiReact \`modules/ui/index.ts\` — value exports (${ui.v.length})

` + table(["Export", "KuiNative"], ui.v.map((n) => [n, mark(n)])) + `

## KuiReact \`modules/ui/index.ts\` — type exports (${ui.t.length})

` + table(["Type", "KuiNative"], ui.t.map((n) => [n, "✗"])) + `

## KuiReact \`modules/app/index.ts\` — value exports (${app.v.length})

` + table(["Export", "KuiNative"], app.v.map((n) => [n, mark(n)])) + `

## KuiReact root \`index.ts\` — common-domain re-exports (${root.v.filter((n) => !n.includes("namespace")).length})

${root.v.map(code).join(", ")}

All ✗ in KuiNative.

## KuiNative \`modules/ui/index.ts\` (${knFacts.length} values, ${knMeta.typeExports} types)

` + table(["Export", "Props type exported", "KuiReact export"], knFacts.map((k) => [k.name, (knMeta.typeNames || []).includes(`${k.name}Props`) ? `✓ ${k.name}Props` : "✗", k.krCounterpart ? (byId[k.krCounterpart].name === k.name || (k.name === "SkeletonCard") ? `✓ ${k.name}` : `≈ ${byId[k.krCounterpart].name}`) : "✗ (no KuiReact Text component)"])));
  write(rel, parts.join("\n\n"));
}

// inventory summary + 01/02
const catCounts = cats.map((c) => { const l = facts.filter((f) => f.meta.category === c); return [c, l.length, l.filter((f) => f.meta.shared).length, l.filter((f) => !f.meta.shared && !f.meta.excluded).length]; });
const coreFacts = facts.filter((f) => !f.vertical && !f.meta.excluded);
const topUsed = facts.filter((f) => IN_SCOPE(f) || f.meta.shared).sort((a, b) => b.importsProd - a.importsProd).slice(0, 25);
const summaryTable = table(["Category", "KuiReact", "Shared with KuiNative", "Missing in KuiNative"], catCounts);
{
  const rel = "phase-1-inventory/inventory-summary.md";
  write(rel, `${header("Inventory summary")}
## Headline numbers

| Metric | Value |
| --- | --- |
| KuiReact catalogued components (registry) | ${facts.filter((f) => f.registry).length} (ui ${facts.filter((f) => f.registry && f.layer === "ui").length}, app ${facts.filter((f) => f.registry && f.layer === "app").length}, domain ${facts.filter((f) => f.layer === "domain").length}, external library 1) |
| KuiReact barrel exports missing from its own registry | ${facts.filter((f) => !f.registry && f.layer !== "hook").length} components + 3 internal hooks |
| KuiReact audited entries (total) | ${facts.length} |
| KuiReact in-scope (ui-layer Atom/Molecule/Organism) | ${coreFacts.length} |
| KuiReact out of scope (app layer, domains, hooks, external library, other ui categories) | ${facts.length - coreFacts.length} |
| KuiNative library exports | ${knFacts.length} from ${knComponentFiles} component modules (the \`toast()\` API and its hooks count as exports) |
| Shared components (counterpart exists) | ${Object.keys(SHARED).length} KuiReact ids ↔ ${Object.values(SHARED).flat().length} KuiNative exports |
| KuiNative-only components | 1 (\`Text\`) |
| Missing from KuiNative (in scope) | ${missing.length} |
| In-scope coverage | ${Object.keys(SHARED).length} / ${coreFacts.length} = **${(100 * Object.keys(SHARED).length / coreFacts.length).toFixed(1)} %** |
| Color tokens | 33 / 33 names and light+dark values identical |

## By category

${summaryTable}

## Most-used KuiReact components (production imports) and KuiNative status

Usage frequency = distinct files under \`modules/**\` and \`app/theme/**\` importing the component.

${table(["#", "Component", "Prod imports", "Showcase imports", "KuiNative"], topUsed.map((f, i) => [i + 1, f.name, f.importsProd, f.importsShowcase, SHARED[f.id] ? `✓ ${SHARED[f.id].join(" + ")}` : "✗"]))}

Of the 25 most-used KuiReact components, KuiNative has ${topUsed.filter((f) => SHARED[f.id]).length}. The missing heavy-hitters (${topUsed.filter((f) => !SHARED[f.id]).slice(0, 6).map((f) => f.name).join(", ")}, …) block any port of KuiReact's domain and app layers.

## Hooks, providers, theme utilities

| Kind | KuiReact | KuiNative |
| --- | --- | --- |
| Hooks | \`useToastStore\`, \`useToast\`, \`useAnnounce\`, \`useDirection\`, \`useBreakpoint\`, \`useFocusTrap\`, \`useA11yCheck\`, overlay hooks (\`usePresence\`, \`useDismiss\`, \`useScrollLock\`, \`usePortal\`, \`useRouteClose\`) | \`useThemeMode\`, \`useResolvedScheme\`, \`useThemeTokens\` (theme only) |
| Providers | \`ToastProvider\`/\`Toaster\`, \`NotificationProvider\`, \`DirectionProvider\` | none |
| Theme | CSS variables (\`globals.css\`), \`ThemeSwitcher\`, \`./styles\` export | \`themes\`/\`tokenMaps\` + \`vars()\` at app root (showcase), \`ThemeToggle\` (showcase-private) |
| Utilities | \`cn\`, \`polymorphic\`, \`announce\`, \`DocumentTitle\`, \`isBrowser\` | \`cn\` (identical), \`FONTS\` |
`);
  write("01-kui-react-inventory.md", `${header("01 · KuiReact inventory")}
Full per-component table: [phase-1-inventory/kui-react-components.md](phase-1-inventory/kui-react-components.md) · exports: [phase-1-inventory/public-exports.md](phase-1-inventory/public-exports.md) · summary: [phase-1-inventory/inventory-summary.md](phase-1-inventory/inventory-summary.md)

## Shape of KuiReact

- **Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · Font Awesome 7 · zustand · zod · react-hook-form. Published as \`@kuraykaraaslan/kui-react\` 1.0.1 (tsup, ESM+CJS+d.ts).
- **Layers:** \`modules/ui\` (atoms/molecules/organisms), \`modules/app\` (app patterns, providers), \`modules/domains/<vertical>\` (18 industry verticals), \`app/theme/<vertical>\` (18 demo themes).
- **Catalog:** ${facts.filter((f) => f.registry).length} registry entries + ${facts.filter((f) => !f.registry).length} barrel exports/hooks missing from the registry = **${facts.length} audited entries**.
- **Quality infrastructure:** 18 unit-test files (vitest + Testing Library), 739 Playwright visual snapshots, 3 CI workflows, 4 custom ESLint rules, token/spacing/convention audit scripts, machine-readable registry (JSON + JSON Schema + per-component markdown + MCP server + llms.txt), 4 ADRs.

## By category

${summaryTable}

## Top 25 by usage

${table(["Component", "Prod imports", "KuiNative"], topUsed.map((f) => [f.name, f.importsProd, SHARED[f.id] ? "✓" : "✗"]))}
`);
  write("02-kui-native-inventory.md", `${header("02 · KuiNative inventory")}
Full table: [phase-1-inventory/kui-native-components.md](phase-1-inventory/kui-native-components.md)

## Shape of KuiNative

- **Stack:** Expo SDK 56 (\`expo ^56.0.9\`, README still says SDK 55) · React Native 0.85 · React 19.2 · NativeWind 4 + Tailwind 3.4 · Font Awesome **6.7.2** · zustand · expo-image · reanimated 4 (installed, unused by the library).
- **Layers:** \`modules/ui\` only. No app layer, no domains, no providers.
- **Catalog:** ${knFacts.length} exports from ${knComponentFiles} component modules (${knFacts.filter((k) => /^[A-Z]/.test(k.name)).map((k) => k.name).join(", ")}, plus the \`toast()\` API and its hooks) + theme utilities in \`libs/theme.ts\`.
- **Quality infrastructure:** a Jest (\`jest-expo\`) + \`@testing-library/react-native\` harness (\`jest.config.js\`, \`npm test\`) with ${knMeta.testFiles.length} test files (${knMeta.testCases} static \`it\` / \`test\` blocks) at commit \`${knMeta.rev}\`; still no ESLint config, no CI, no registry, no ADRs. A showcase app (Expo Router) with ${knMeta.showcaseEntries} entries, 1:1 with KuiReact showcase variants, is the only documentation besides the README.
- **Packaging:** not publishable (\`private: true\`, \`main: expo-router/entry\`).

## Components

${table(["Component", "Category", "LOC", "KuiReact counterpart"], knFacts.map((k) => [k.name, KN_CATEGORY[k.name], k.loc, k.krCounterpart ? byId[k.krCounterpart].name : "— (native-only)"]))}

Total library source: ${knFacts.filter((k, i, a) => a.findIndex((x) => x.file === k.file) === i).reduce((a, k) => a + k.loc, 0)} lines across ${knComponentFiles} entry files (KuiReact's ${Object.keys(SHARED).length} shared components: ${Object.keys(SHARED).reduce((a, id) => a + byId[id].loc, 0)} lines in their entry files).
`);
}

// =====================================================================
// PHASE 2 — gap analysis
// =====================================================================
const missRow = (f, fromRel) => [`[${f.name}](${linkFrom(fromRel, f)})`, f.meta.category, f.meta.priority, f.meta.complexity, f.meta.reason];
const missRowX = (f, fromRel) => [...missRow(f, fromRel).slice(0, 4), `W${f.meta.wave}`, f.meta.fit, f.meta.reason];
{
  const rel = "phase-2-gap-analysis/missing-components.md";
  const core = [...missingCore].sort((a, b) => priRank(a.meta.priority) - priRank(b.meta.priority) || catKey(a.meta.category) - catKey(b.meta.category) || a.name.localeCompare(b.name));
  const parts = [header("Missing components", `${missing.length} in-scope KuiReact ui-layer components (Atom/Molecule/Organism) have no KuiNative counterpart.`)];
  parts.push(`## Scope

KuiNative development is scoped to KuiReact's core **ui-layer atoms, molecules and organisms** (the registry's own ${code("Atom")}/${code("Molecule")}/${code("Organism")} categories, all under ${code("modules/ui/")}). **App-layer components** (${code("modules/app/")}, e.g. AppShell, Toast's provider chrome, Form, Calendar, RichTextEditor), **domain verticals** (${code("modules/domains/*")}, 217 components across 18 industries) and **theme demos** (${code("app/theme/*")}) are out of scope for this backlog and roadmap. They remain listed for reference in [01-kui-react-inventory.md](../01-kui-react-inventory.md) and [phase-1-inventory/kui-react-components.md](../phase-1-inventory/kui-react-components.md), marked out of scope, but have no backlog file and do not count toward coverage.

| Scope | KuiReact components |
| --- | --- |
| In scope (ui-layer Atom/Molecule/Organism) | ${facts.filter((f) => IN_SCOPE(f)).length} |
| Out of scope: app layer | ${facts.filter((f) => f.layer === "app").length} |
| Out of scope: domain verticals | ${facts.filter((f) => f.layer === "domain").length} |
| Out of scope: hooks | ${facts.filter((f) => f.layer === "hook").length} |
| Out of scope: external library | ${facts.filter((f) => f.layer === "library").length} |
| Out of scope: other ui-layer categories | ${facts.filter((f) => f.layer === "ui" && !IN_SCOPE(f)).length} |`);
  parts.push(`## Priority and complexity definitions

- **Critical** — required before any production mobile app can be built on KuiNative (baseline form, feedback, overlay, navigation primitives) or a dependency root for many others.
- **High** — required for strong parity; frequently used in KuiReact or blocking several other components.
- **Medium** — common but not blocking; or a platform adaptation with moderate demand.
- **Low** — niche, desktop-web oriented, or a domain-vertical demo component.
- **Complexity** — Small (<1 d), Medium (2–3 d), Large (5–8 d), Very Large (10–20 d) for a parity-quality port incl. tests + showcase entry. Informed by KuiReact LOC and RN platform gaps.
- **Fit** — \`direct\` mechanical port · \`adapt\` needs a platform-idiomatic redesign (sheet instead of popover, etc.) · \`web-only\` recommended parity exception.
- **Wave** — roadmap wave (see [08-roadmap.md](../08-roadmap.md)).

## Core components (ui-layer Atom/Molecule/Organism) — ${missingCore.length}

` + table(["Component", "Category", "Priority", "Complexity", "Wave", "Fit", "Reason"], core.map((f) => missRowX(f, rel))));
  write(rel, parts.join("\n\n"));

  // priority matrix
  const pm = [header("Priority matrix", "Priority × complexity for the in-scope missing set (ui-layer Atom/Molecule/Organism).")];
  pm.push(`## Core (${missingCore.length})\n\n| Priority \\ Complexity | ${CPX.join(" | ")} | Total |\n| --- | ${CPX.map(() => "---").join(" | ")} | --- |\n` +
    PRI.map((p) => `| **${p}** | ${CPX.map((c) => missingCore.filter((f) => f.meta.priority === p && f.meta.complexity === c).map((f) => f.name).join(", ") || "—").join(" | ")} | ${missingCore.filter((f) => f.meta.priority === p).length} |`).join("\n"));
  pm.push(`## Quick wins (Critical/High × Small)\n\n${missingCore.filter((f) => ["Critical", "High"].includes(f.meta.priority) && f.meta.complexity === "Small").map((f) => `- ${f.name} — ${f.meta.reason}`).join("\n")}`);
  pm.push(`## Expensive and important (Critical/High × Large/Very Large)\n\n${missingCore.filter((f) => ["Critical", "High"].includes(f.meta.priority) && ["Large", "Very Large"].includes(f.meta.complexity)).map((f) => `- ${f.name} (${f.meta.complexity}) — ${f.meta.reason}`).join("\n") || "- none"}`);
  pm.push(`## Recommended parity exceptions (fit = web-only)\n\n${missing.filter((f) => f.meta.fit === "web-only").map((f) => `- ${f.name} — ${f.meta.reason}`).join("\n")}`);
  write("phase-2-gap-analysis/priority-matrix.md", pm.join("\n\n"));

  // dependency analysis
  const fanIn = {};
  for (const f of facts) for (const c of f.composes) { fanIn[c] = fanIn[c] || { total: 0, domain: 0, core: 0 }; fanIn[c].total++; f.vertical ? fanIn[c].domain++ : fanIn[c].core++; }
  const fanRows = Object.entries(fanIn).filter(([id]) => byId[id] && !byId[id].vertical).sort((a, b) => b[1].total - a[1].total).slice(0, 40);
  const dep = [header("Dependency analysis", "First-party dependency edges parsed from KuiReact `import` statements; RN-specific dependencies added from the curated porting notes.")];
  dep.push(`## Fan-in: which KuiReact primitives unblock the most other components

Counts are KuiReact components whose source imports the primitive. A missing primitive with high fan-in blocks every dependant.

` + table(["Primitive", "Depended on by (total)", "core", "domain", "KuiNative"], fanRows.map(([id, v]) => [byId[id].name, v.total, v.core, v.domain, nativeStatus(id)])));
  dep.push(`## Shared-but-incomplete primitives are dependency roots too

Components that exist in KuiNative but lack parity still block ports: a domain component written against KuiReact's \`<Badge variant="neutral" dot>\` or \`<Button variant="danger" iconRight>\` cannot be ported mechanically until the shared component's API matches. Fan-in of shared ids: ${Object.keys(SHARED).map((id) => `${byId[id].name} ${fanIn[id] ? fanIn[id].total : 0}`).join(", ")}.`);
  dep.push(`## Core missing components — dependencies

"Blocked by" lists items that must land first (missing components, shared-component remediation \`R-*\`, and shared infrastructure). "Unblocks" is the inverse.

` + table(["Component", "Priority", "KuiReact composes", "Blocked by", "Unblocks", "RN libraries"], [...missingCore].sort((a, b) => priRank(a.meta.priority) - priRank(b.meta.priority) || a.name.localeCompare(b.name)).map((f) => {
    const it = itemById[f.id];
    const unblocks = coreItems.filter((x) => x.deps.includes(f.id)).map((x) => x.id);
    return [`[${f.name}](${linkFrom("phase-2-gap-analysis/dependency-analysis.md", f)})`, f.meta.priority, f.composes.map((c) => `${byId[c] ? byId[c].name : c}${SHARED[c] ? " ✓" : ""}`).join(", ") || "—", it.deps.join(", ") || "—", unblocks.join(", ") || "—", (f.meta.rnDeps || []).filter((d) => !byId[d]).join(", ") || "—"];
  })));
  dep.push(`## Remediation items referenced above

` + table(["id", "Item", "Priority", "Blocked by", "Status"], REMEDIATION.map((r) => [r.id, r.title, r.priority, r.deps.join(", ") || "—", remMark(r.id).replace(/^ — /, "") || "open"])));
  dep.push(`## Third-party dependencies KuiReact relies on and their RN story

` + (() => { const m = {}; for (const f of facts) for (const t of f.third) (m[t] = m[t] || []).push(f.name); return table(["Package", "Used by (count)", "Examples", "RN strategy"], Object.entries(m).sort((a, b) => b[1].length - a[1].length).map(([p, l]) => [p, l.length, trunc(l.slice(0, 5).join(", "), 60), ({ "react-dom": "no DOM portals — root host or RN Modal", "@fortawesome/react-fontawesome": "@fortawesome/react-native-fontawesome (already used)", "@fortawesome/free-solid-svg-icons": "same package (align to v7)", "@fortawesome/fontawesome-svg-core": "same package (align to v7)", "@fortawesome/free-brands-svg-icons": "same package", "@fortawesome/free-regular-svg-icons": "same package", "next/link": "expo-router Link", "next/image": "expo-image", "next/navigation": "expo-router hooks", "next/dynamic": "not needed", "chart.js": "victory-native / gifted-charts", "react-chartjs-2": "victory-native / gifted-charts", quill: "WebView editor", leaflet: "react-native-maps", "react-leaflet": "react-native-maps", zustand: "unchanged", zod: "unchanged", "react-hook-form": "unchanged (Controller)", "countries-list": "unchanged", "iso-639-1": "unchanged", "country-flag-icons": "react-native-svg or emoji" })[p] || "evaluate"])); })());
  write("phase-2-gap-analysis/dependency-analysis.md", dep.join("\n\n"));

  // implementation order (phase 2 view — dependency-driven)
  const io = [header("Implementation order (dependency-driven)", "Topologically sorted by wave → priority → dependency. Domain components follow once their primitives exist and are not listed individually.")];
  io.push(table(["#", "Item", "Kind", "Priority", "Complexity", "Wave", "Blocked by"], ordered.map((it) => [it.order, it.kind === "missing" ? `[${it.f.name}](${linkFrom("phase-2-gap-analysis/implementation-order.md", it.f)})` : `${it.id}: ${it.title}${remMark(it.id)}`, it.kind === "missing" ? "new component" : "remediation", it.priority, it.complexity, `W${it.wave}${it.pulledForward ? " (pulled forward)" : ""}`, it.deps.join(", ") || "—"])));
  write("phase-2-gap-analysis/implementation-order.md", io.join("\n\n"));

  // 03
  const crit = missingCore.filter((f) => f.meta.priority === "Critical");
  const high = missingCore.filter((f) => f.meta.priority === "High");
  write("03-missing-components.md", `${header("03 · Missing components")}
**${missing.length}** in-scope KuiReact ui-layer components (Atom/Molecule/Organism) have no KuiNative counterpart. Every one has a backlog file under [component-backlog/](component-backlog/README.md). App-layer components, domain verticals and theme demos are out of scope (see [missing-components.md](phase-2-gap-analysis/missing-components.md#scope)).

Details: [missing-components.md](phase-2-gap-analysis/missing-components.md) · [priority-matrix.md](phase-2-gap-analysis/priority-matrix.md) · [dependency-analysis.md](phase-2-gap-analysis/dependency-analysis.md) · [implementation-order.md](phase-2-gap-analysis/implementation-order.md)

## Counts

| Priority | Count |
| --- | --- |
${PRI.map((p) => `| ${p} | ${missingCore.filter((f) => f.meta.priority === p).length} |`).join("\n")}
| **Total** | **${missingCore.length}** |

| Fit | Count |
| --- | --- |
| direct port | ${missing.filter((f) => f.meta.fit === "direct").length} |
| platform adaptation | ${missing.filter((f) => f.meta.fit === "adapt").length} |
| recommended exception (web-only) | ${missing.filter((f) => f.meta.fit === "web-only").length} |

## Critical (${crit.length})

${table(["Component", "Category", "Priority", "Complexity", "Reason"], crit.map((f) => missRow(f, "03-missing-components.md")))}

## High (${high.length})

${table(["Component", "Category", "Priority", "Complexity", "Reason"], high.map((f) => missRow(f, "03-missing-components.md")))}

## Medium / Low core

${[...missingCore].filter((f) => ["Medium", "Low"].includes(f.meta.priority)).sort((a, b) => priRank(a.meta.priority) - priRank(b.meta.priority) || a.name.localeCompare(b.name)).map((f) => `[${f.name}](${backlogPath(f)}) (${f.meta.priority[0]}/${f.meta.complexity})`).join(" · ")}

## Out of scope

${facts.filter((f) => f.layer === "domain").length} domain-vertical components, ${facts.filter((f) => f.layer === "app").length} app-layer components, ${facts.filter((f) => f.layer === "hook").length} hooks and ${facts.filter((f) => f.layer === "library").length} external-library entry are excluded from this backlog by scope decision (ui-layer atoms/molecules/organisms only). See [missing-components.md](phase-2-gap-analysis/missing-components.md#scope).
`);
}

// =====================================================================
// Backlog files
// =====================================================================
function rnPropNote(m) {
  const n = m.name, t = m.type || "";
  if (/^on(Click|MouseDown|MouseUp)$/.test(n)) return "→ `onPress`";
  if (/^onMouse|^onPointer|onDrag|onDrop/.test(n)) return "web-only; map to gesture-handler or drop";
  if (n === "onKeyDown" || n === "onKeyUp") return "web-only (keep for react-native-web)";
  if (n === "className") return "keep (NativeWind)";
  if (n === "id") return "→ `nativeID` / `testID` (RN needs no id for label wiring)";
  if (n === "data-testid") return "→ `testID`";
  if (n === "href") return "→ `onPress` + expo-router `Link`";
  if (n === "as") return "n/a (no polymorphic DOM tag); consider `asChild` for Link";
  if (n === "type" && /submit|reset/.test(t)) return "n/a (no native forms)";
  if (/ChangeEvent|MouseEvent|KeyboardEvent|FormEvent/.test(t)) return "use value-based callback (RN has no DOM events)";
  if (/HTML\w*Element/.test(t)) return "ref type → RN host component (`View`/`TextInput`)";
  if (n === "portalTarget") return "n/a (use root overlay host)";
  if (n === "closeOnRouteChange") return "→ expo-router focus/blur listener";
  if (n === "reducedMotion") return "→ `useReducedMotion()` (Reanimated)";
  if (n === "ariaLabel" || n === "aria-label") return "→ `accessibilityLabel`";
  if (/^(style)$/.test(n)) return "RN `StyleProp`";
  if (n === "children") return "keep (strings must be wrapped in `Text`)";
  if (n === "rows" && /number/.test(t)) return "→ `numberOfLines` / min height";
  return "same";
}
const statePatterns = [
  ["loading", /^(loading|isLoading|busy|pending)$/, "shows progress; interaction blocked", "`accessibilityState.busy`; Spinner/Skeleton; disable press"],
  ["disabled", /^(disabled|isDisabled)$/, "opacity-50, not interactive", "`disabled` on Pressable + `accessibilityState.disabled` + `opacity-50`"],
  ["error", /^(error|errors|invalid|hasError)$/, "error tokens, message with role=alert", "error tokens + message announced (live region / announceForAccessibility)"],
  ["success", /^success$/, "success tokens + message", "success tokens + message"],
  ["read-only", /^(readOnly|readonly)$/, "sunken background, not editable", "`editable={false}` + sunken bg + label suffix"],
  ["required", /^required$/, "asterisk + sr-only (required)", "asterisk + \"required\" in accessibilityLabel"],
  ["selected / active", /^(selected|active|isActive|current|value|activeTab|currentStep)$/, "highlighted", "`accessibilityState.selected`"],
  ["checked / indeterminate", /^(checked|indeterminate|defaultChecked)$/, "checked/mixed", "`accessibilityState.checked` (true/false/'mixed')"],
  ["open / expanded", /^(open|isOpen|expanded|openIds|defaultOpen|collapsed)$/, "visible/expanded", "`accessibilityState.expanded` / modal visibility"],
  ["empty", /^(empty|emptyText|emptyMessage|emptyState)$/, "empty placeholder", "EmptyState"],
  ["hover", /^(hoverable)$/, "hover elevation", "pressed feedback (`active:` / Pressable `pressed`)"],
];
function statesOf(f) {
  const out = [];
  const names = f.props ? f.props.members.map((m) => m.name) : [];
  for (const [label, re, web, rn] of statePatterns) { const p = names.find((n) => re.test(n)); if (p) out.push([label, code(p), web, rn]); }
  if (f.flags.hover && !out.find((o) => o[0] === "hover")) out.push(["hover", "`hover:` classes", "hover colour/elevation", "pressed state instead (`active:` classes / Pressable `pressed`)"]);
  if (f.flags.focusRing) out.push(["focus", "`focus-visible:ring-2`", "focus ring on keyboard focus", "focus style for react-native-web / Android TV / hardware keyboard (`onFocus`/`onBlur` state)"]);
  return out;
}
function a11yRows(f) {
  const rowsA = f.aria.map((a) => [code(a), A11Y[a] || "review manually"]);
  const rowsR = f.roles.map((r) => [code(`role="${r}"`), ROLE[r] ? `\`accessibilityRole="${ROLE[r]}"\`` : "review manually"]);
  return [...rowsR, ...rowsA];
}
const A11Y = {
  "aria-label": "`accessibilityLabel`", "aria-labelledby": "`accessibilityLabelledBy` (Android) / `aria-labelledby` / compose label", "aria-describedby": "`accessibilityHint`", "aria-invalid": "announce error; include in hint", "aria-busy": "`accessibilityState.busy`", "aria-disabled": "`accessibilityState.disabled`", "aria-checked": "`accessibilityState.checked`", "aria-selected": "`accessibilityState.selected`", "aria-pressed": "`accessibilityState.selected`", "aria-expanded": "`accessibilityState.expanded`", "aria-hidden": "`accessibilityElementsHidden` + `importantForAccessibility=\"no-hide-descendants\"`", "aria-live": "`accessibilityLiveRegion` + `AccessibilityInfo.announceForAccessibility`", "aria-atomic": "announce full message", "aria-modal": "`accessibilityViewIsModal`", "aria-valuenow": "`accessibilityValue.now`", "aria-valuemin": "`accessibilityValue.min`", "aria-valuemax": "`accessibilityValue.max`", "aria-valuetext": "`accessibilityValue.text`", "aria-current": "`accessibilityState.selected` + label suffix", "aria-controls": "n/a on native", "aria-haspopup": "`accessibilityHint`", "aria-orientation": "n/a", "aria-sort": "`accessibilityValue.text`", "aria-required": "label suffix \"required\"", "aria-activedescendant": "`AccessibilityInfo.setAccessibilityFocus`", "aria-autocomplete": "n/a", "aria-multiselectable": "per-item `selected`", "aria-level": "`accessibilityRole=\"header\"`", "aria-posinset": "label suffix \"n of m\"", "aria-setsize": "label suffix \"n of m\"", "aria-roledescription": "`accessibilityHint`", "aria-errormessage": "hint + announce", "aria-keyshortcuts": "n/a on touch", "aria-readonly": "`editable={false}`",
};
const ROLE = { button: "button", link: "link", alert: "alert", checkbox: "checkbox", switch: "switch", radio: "radio", radiogroup: "radiogroup", tab: "tab", tablist: "tablist", menu: "menu", menuitem: "menuitem", menubar: "menubar", menuitemcheckbox: "menuitem", menuitemradio: "menuitem", listbox: "list", combobox: "combobox", slider: "adjustable", progressbar: "progressbar", spinbutton: "spinbutton", img: "image", heading: "header", grid: "grid", table: "grid", list: "list", search: "search", toolbar: "toolbar", timer: "timer", scrollbar: "scrollbar", searchbox: "search", none: "none", presentation: "none", meter: "progressbar", status: "summary", note: "summary", feed: "list", figure: "image", dialog: "none` + `accessibilityViewIsModal", alertdialog: "alert` + `accessibilityViewIsModal", columnheader: "header", rowheader: "header", treeitem: "button", tree: "list" };

function backlogFile(f) {
  const rel = backlogPath(f);
  const m = f.meta;
  const L = [];
  L.push(`# ${f.name}`);
  L.push(`> Backlog item · KuiReact id ${code(f.id)} · layer \`${f.layer}\` · **${m.category}** · Priority **${m.priority}** · Complexity **${m.complexity}** · Wave ${m.wave} · Fit \`${m.fit}\` · est. ${effortStr(m.complexity)}\n> Generated ${AUDIT_DATE} from KuiReact source; props/tokens/deps are parsed, not hand-copied. [Back to backlog index](${path.posix.relative(path.posix.dirname(rel), "component-backlog/README.md")})`);
  L.push(`## Overview\n\n${f.description || "_No registry description._"}\n\n**Why it matters for KuiNative:** ${m.reason}${m.fit === "web-only" ? "\n\n> **Recommendation: parity exception.** Record this component in `parity.exceptions.json` with the reason above instead of implementing it, unless a product need appears." : ""}`);
  const vtitles = f.variants.map((v) => v.title);
  L.push(`## KuiReact Reference

| | |
| --- | --- |
| Source | \`kui-react/${f.filePath}\` (${f.files.length} file${f.files.length > 1 ? "s" : ""}, ${f.loc} LOC) |
| Public export | ${code(f.public.path)} — ${f.public.status} |
| Registry | ${f.registry ? `yes · status \`${f.status || "—"}\` · since ${f.since || "—"}` : "**no** (barrel export missing from KuiReact's registry)"} |
| Showcase variants | ${vtitles.length ? vtitles.join(", ") : "—"} |
| Composes | ${f.composes.length ? f.composes.map((c) => `${byId[c] ? byId[c].name : c} (${nativeStatus(c)})`).join(", ") : "—"} |
| Used by (registry) | ${f.usedBy.length ? f.usedBy.join(", ") : "—"} |
| Usage frequency | imported by ${f.importsProd} production file(s), ${f.importsShowcase} showcase file(s) |
| Third-party imports | ${f.third.length ? f.third.map(code).join(", ") : "—"} |
| Unit tests | ${f.tests.length ? f.tests.map((t) => code(t)).join(", ") + ` (${f.testCases.length} cases)` : "none"} |
| Interaction flags | ${Object.entries({ keyboard: "keyboard handling", focusRing: "focus-visible ring", srOnly: "sr-only text", reducedMotion: "reduced-motion aware", portal: "portal", animated: "animated/transitions", hover: "hover styles" }).filter(([k]) => f.flags[k]).map(([, v]) => v).join(", ") || "—"}${f.flags.rawHex ? ` · ${f.flags.rawHex} raw hex literal(s) in source` : ""} |`);
  // props
  if (f.props && f.props.members.length) {
    L.push(`## Required Props\n\nParsed from ${code(f.props.file)}${f.props.fallback ? ` (fallback: first exported function \`${f.props.parts[0]}\`; registry name did not match an export)` : f.props.parts.length > 1 ? ` (${f.props.parts.join(" + ")})` : ""}.${f.props.forwardRef ? " Uses `forwardRef` — KuiNative must forward a typed ref." : ""}${f.props.notes.length ? " " + f.props.notes.join("; ") + "." : ""} **Required** = not optional in KuiReact's type. The KuiNative API must keep these names and defaults unless the RN column says otherwise.\n\n` +
      table(["Prop", "Type", "Required", "Default", "Notes", "RN mapping"], f.props.members.map((p) => [code(p.name), code(trunc(p.type, 80)), p.optional ? "no" : "**yes**", p.default ? code(trunc(p.default, 30)) : "—", trunc(p.doc, 100) || "", rnPropNote(p)])) +
      (f.props.extends.length ? `\n\n**Also accepts:** ${f.props.extends.map((e) => code(trunc(e, 90))).join(", ")} — on RN, spread the equivalent host props (\`ViewProps\`, \`PressableProps\`, \`TextInputProps\`) instead.` : ""));
  } else {
    L.push(`## Required Props\n\n_Props could not be extracted statically (${f.layer === "hook" ? "hook — see signature in source" : "component is a barrel/re-export or uses a non-standard signature"}). Read \`kui-react/${f.filePath}\` and fill this section before implementation._`);
  }
  // variants
  L.push(`## Variants\n\n` + (f.variants.length ? f.variants.map((v) => `### ${v.title}\n\n\`\`\`tsx\n${v.code.split("\n").slice(0, 14).join("\n")}${v.code.split("\n").length > 14 ? "\n// …" : ""}\n\`\`\``).join("\n\n") + `\n\nEvery variant above must have an equivalent demo in \`modules/showcase/registry.tsx\` with the same title.` : "_No showcase variants recorded in the KuiReact registry._") + (() => { const u = f.props ? f.props.members.filter((p) => /^['"][^'"]+['"](\s*\|\s*['"][^'"]+['"])+$/.test(p.type)) : []; return u.length ? `\n\n**Enumerated props:**\n\n${u.map((p) => `- ${code(p.name)}: ${p.type.split("|").map((s) => s.trim()).join(" · ")}${p.default ? ` (default ${p.default})` : ""}`).join("\n")}` : ""; })());
  // states
  const st = statesOf(f);
  L.push(`## States\n\n` + (st.length ? table(["State", "KuiReact signal", "KuiReact behaviour", "KuiNative requirement"], st) : "_No interactive states detected from props; verify in source._") + `\n\nPlus, for every component: light + dark scheme, font scaling (\`allowFontScaling\` respected, layout survives 200 % text), and RTL (\`I18nManager.isRTL\`).`);
  // a11y
  const ar = a11yRows(f);
  L.push(`## Accessibility Requirements\n\n` + (ar.length ? `KuiReact uses the following; each needs its React Native equivalent:\n\n` + table(["KuiReact", "React Native"], ar) : "KuiReact source uses no explicit ARIA attributes or roles for this component.") +
    `\n\nPlatform requirements (all components):\n\n- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) — use \`hitSlop\` when the visual is smaller.\n- Every interactive element has \`accessibilityRole\` and an accessible name; decorative icons are hidden from the accessibility tree.\n- Do not nest multiple interactive elements inside one accessible \`Pressable\` (iOS merges them into a single element).\n${f.flags.animated ? "- Animations respect Reduce Motion (`useReducedMotion()` from Reanimated or `AccessibilityInfo.isReduceMotionEnabled`).\n" : ""}${f.flags.keyboard ? "- KuiReact handles keyboard input; provide the same on react-native-web and with hardware keyboards (focusable, `onKeyPress`), and a touch/screen-reader alternative (accessibilityActions) on native.\n" : ""}`);
  // tokens
  L.push(`## Design Tokens\n\n` + (f.tokens.length ? table(["Token", "Light", "Dark", "In KuiNative theme"], f.tokens.map((t) => [code(t), knLight[t] || "—", knDark[t] || "—", knLight[t] ? "✓" : "✗ **missing**"])) : "_No semantic color tokens detected._") + `\n\nUse NativeWind classes (\`bg-${f.tokens[0] || "primary"}\`, …); only props that cannot take \`className\` (icon \`color\`, \`placeholderTextColor\`, \`trackColor\`, SVG \`fill\`) may read \`useThemeTokens()\`. No raw hex.`);
  // deps
  const knDeps = f.composes.map((c) => `- ${byId[c] ? byId[c].name : c} — ${nativeStatus(c)}${byId[c] && !SHARED[c] && !byId[c].meta.excluded ? ` → [backlog](${path.posix.relative(path.posix.dirname(rel), backlogPath(byId[c]))})` : ""}`);
  const itm = itemById[f.id];
  L.push(`## Dependencies\n\n**KuiReact components it composes:**\n\n${knDeps.length ? knDeps.join("\n") : "- none"}\n\n**Blocked by (roadmap):** ${itm && itm.deps.length ? itm.deps.map(code).join(", ") : f.vertical ? "the primitives above reaching parity" : "nothing"}\n\n**Third-party:** ${f.third.length ? f.third.map((t) => `${code(t)}${({ "react-dom": " → root overlay host / RN Modal", "next/link": " → expo-router Link", "next/image": " → expo-image", "next/navigation": " → expo-router hooks", "chart.js": " → victory-native / gifted-charts", "react-chartjs-2": " → victory-native", quill: " → WebView editor", leaflet: " → react-native-maps", "react-leaflet": " → react-native-maps", "@fortawesome/react-fontawesome": " → @fortawesome/react-native-fontawesome" })[t] || ""}`).join(", ") : "none"}${m.rnDeps && m.rnDeps.length ? `\n\n**Suggested RN libraries:** ${m.rnDeps.map(code).join(", ")}` : ""}`);
  // impl notes
  const loc = f.vertical ? `modules/domains/${f.vertical}/${f.name.replace(/\s.*$/, "")}.tsx` : f.layer === "hook" ? `libs/hooks/${f.name}.ts` : f.layer === "app" ? `modules/app/${f.name.replace(/\s.*$/, "")}.tsx` : `modules/ui/${f.name.replace(/\s.*$/, "")}.tsx`;
  L.push(`## Implementation Notes\n\n${m.rnNotes ? m.rnNotes + "\n\n" : ""}- Location: \`${loc}\`, named export \`${f.name.split(/\s*\+\s*/)[0]}\` (same name as KuiReact), re-exported from the layer barrel.\n- Styling via \`cn()\` + semantic token classes; variant/size maps as \`Record<Variant, string>\` like the existing KuiNative components.\n- Props: keep KuiReact names/defaults; spread remaining host props (\`...rest\`) and forward \`ref\` so \`testID\`, \`accessibilityHint\`, \`hitSlop\` etc. pass through (current KuiNative components mostly do not).\n- Export the \`${f.name.split(/\s*\+\s*/)[0]}Props\` type.\n- Add a showcase entry (\`modules/showcase/registry.tsx\`) with one demo per KuiReact variant.${f.vertical ? `\n- Domain component: create \`modules/domains/${f.vertical}/\` with a barrel; do not import across verticals (KuiReact enforces this with \`check:cross-vertical\`).` : ""}`);
  // acceptance
  const ac = [];
  ac.push(`Exported as \`${f.name.split(/\s*\+\s*/)[0]}\` from the ${f.vertical ? `\`modules/domains/${f.vertical}\`` : f.layer === "hook" ? "hooks" : `\`modules/${f.layer === "app" ? "app" : "ui"}\``} barrel with its props type`);
  if (f.props && f.props.members.length) ac.push(`All ${f.props.members.length} KuiReact props present with identical names and defaults, or each deviation recorded in \`parity.exceptions.json\` (RN mappings above are pre-approved deviations)`);
  if (f.variants.length) ac.push(`Showcase demos for all ${f.variants.length} KuiReact variants (${f.variants.map((v) => v.title).join(", ")})`);
  for (const s of st) ac.push(`State **${s[0]}** implemented: ${s[3]}`);
  if (ar.length) ac.push(`Accessibility mappings in the table above implemented and verified with VoiceOver and TalkBack`);
  ac.push(`Uses only semantic tokens${f.tokens.length ? ` (${f.tokens.slice(0, 8).map(code).join(", ")}${f.tokens.length > 8 ? ", …" : ""})` : ""}; renders correctly in light and dark`);
  ac.push(`Unit tests (Jest + @testing-library/react-native) cover render, every variant/size, every state, callbacks and accessibility props`);
  if (f.testCases.length) ac.push(`Mirrors KuiReact's test cases where applicable:\n${f.testCases.map((t) => `  - [ ] ${t}`).join("\n")}`);
  ac.push(`Prop table + usage snippet documented in the showcase entry`);
  L.push(`## Acceptance Criteria\n\n${ac.map((a) => `- [ ] ${a}`).join("\n")}`);
  write(rel, L.join("\n\n") + "\n");
}
for (const f of missing) backlogFile(f);

// backlog index
{
  const rel = "component-backlog/README.md";
  write(rel, `${header("Component backlog", `${missing.length} backlog files — one per in-scope KuiReact ui-layer component (Atom/Molecule/Organism) missing from KuiNative.`)}
Each file contains: Overview · KuiReact Reference · Required Props (parsed from source) · Variants (KuiReact showcase code) · States · Accessibility Requirements (ARIA → RN mapping) · Design Tokens (with light/dark values) · Dependencies · Implementation Notes · Acceptance Criteria.

Shared components that exist but lack parity are **not** here — see [feature-matrix/](../feature-matrix/) and [phase-3-parity-review/](../phase-3-parity-review/component-status-matrix.md). App-layer components, domain verticals and theme demos are out of scope by decision (see [missing-components.md](../phase-2-gap-analysis/missing-components.md#scope)) and have no backlog file.

## Core (${missingCore.length})

${table(["Component", "Category", "Priority", "Complexity", "Wave", "Fit"], [...missingCore].sort((a, b) => priRank(a.meta.priority) - priRank(b.meta.priority) || a.name.localeCompare(b.name)).map((f) => [`[${f.name}](${linkFrom(rel, f)})`, f.meta.category, f.meta.priority, f.meta.complexity, f.meta.wave, f.meta.fit]))}
`);
}

// =====================================================================
// PHASE 5 — roadmap (waves are data-driven)
// =====================================================================
const itemLink = (it, fromRel) => it.kind === "missing" ? `[${it.f.name}](${linkFrom(fromRel, it.f)})` : `**${it.id}** ${it.title}${remMark(it.id)}`;
function waveDoc(w, title, intro, rel) {
  const items = ordered.filter((it) => it.wave === w);
  const [lo, hi] = sumEffort(items);
  const parts = [header(title), intro];
  parts.push(`## Totals\n\n| | |\n| --- | --- |\n| Items | ${items.length} (${items.filter((i) => i.kind === "remediation").length} remediation of shared components/infra, ${items.filter((i) => i.kind === "missing").length} new components) |\n| Estimated effort | ${lo}–${hi} engineer-days (${(lo / 5).toFixed(1)}–${(hi / 5).toFixed(1)} engineer-weeks) |\n| Remaining (excluding done items) | ${items.filter((i) => !isDone(i)).length} items, ${sumEffort(items.filter((i) => !isDone(i))).join("–")} engineer-days |\n| By priority | ${PRI.map((p) => `${p} ${items.filter((i) => i.priority === p).length}`).join(" · ")} |`);
  parts.push(`## Items in recommended order\n\n` + table(["Order", "Item", "Priority", "Complexity", "Dependencies", "Estimated effort", "Why"], items.map((it) => [it.order, itemLink(it, rel), it.priority, it.complexity, it.deps.join(", ") || "—", effortStr(it.complexity), trunc(it.why, 140) + (it.pulledForward ? ` _(pulled into this wave because ${it.pulledForward.join(", ")} depends on it)_` : "")])));
  return parts.join("\n\n");
}
write("phase-5-roadmap/wave-1-critical.md", waveDoc(1, "Wave 1 — Critical", `Required before serious production adoption. Wave 1 fixes the foundations (packaging, theme provider, typography, tests), brings the three most-used shared components (Button, Input, Modal) to parity, and adds the primitives no app can ship without (Select, Textarea, RadioGroup, Toast, Drawer/sheet, TabGroup, AlertBanner, Progress, Label, Separator, loading/error states).

**Exit criteria:** KuiNative installs as a package; a consumer can build a themed, accessible login + settings + list screen without reaching for another UI library; every Wave 1 component has tests and a showcase entry.`, "phase-5-roadmap/wave-1-critical.md"));
write("phase-5-roadmap/wave-2-core-completion.md", waveDoc(2, "Wave 2 — Core completion", `Required for strong parity. Finishes the remaining shared-component remediation (Badge, Card, Avatar/AvatarGroup, Checkbox, Toggle, Skeleton, Spinner, EmptyState, shadows), adds the parity contract tooling, and ports the remaining commonly-used ui-layer primitives. Those primitives have all landed (the last of them in \`08c1c32\`, so they have left this list); what remains is remediation and tooling.

**Exit criteria:** every shared component is PARITY_COMPLETE; every KuiReact ui-layer component with fit \`direct\`/\`adapt\` and priority ≥ Medium exists; \`parity.exceptions.json\` lists every deliberate gap and CI fails on an unexplained one.`, "phase-5-roadmap/wave-2-core-completion.md"));
write("phase-5-roadmap/wave-3-advanced.md", waveDoc(3, "Wave 3 — Advanced", `Nice-to-have: heavy organisms (tables, charts, calendar, media), desktop-web patterns and recommended exceptions. Items with fit \`web-only\` should be closed by adding an exception entry, not by implementation.

App-layer components, domain verticals (${facts.filter((f) => f.layer === "domain").length} components) and theme demos are out of scope for this roadmap by decision — see [missing-components.md](../phase-2-gap-analysis/missing-components.md#scope).`, "phase-5-roadmap/wave-3-advanced.md"));
write("phase-5-roadmap/implementation-order.md", `${header("Implementation order")}
Single ordered list across all waves (dependencies always precede dependants; a dependency is pulled into an earlier wave when needed).

${table(["#", "Wave", "Item", "Priority", "Complexity", "Blocked by", "Effort"], ordered.map((it) => [it.order, it.wave, itemLink(it, "phase-5-roadmap/implementation-order.md"), it.priority, it.complexity, it.deps.join(", ") || "—", effortStr(it.complexity)]))}

After #${ordered.length}: domain verticals per [wave-3-advanced.md](wave-3-advanced.md).
`);
const waveTotals = [1, 2, 3].map((w) => { const it = ordered.filter((i) => i.wave === w); const rest = it.filter((i) => !isDone(i)); return [w, it.length, ...sumEffort(it), rest.length, ...sumEffort(rest)]; });
write("08-roadmap.md", `${header("08 · Roadmap")}
Detail: [wave-1-critical.md](phase-5-roadmap/wave-1-critical.md) · [wave-2-core-completion.md](phase-5-roadmap/wave-2-core-completion.md) · [wave-3-advanced.md](phase-5-roadmap/wave-3-advanced.md) · [implementation-order.md](phase-5-roadmap/implementation-order.md)

## Summary

| Wave | Goal | Items | Effort (engineer-days) | Remaining items | Remaining effort |
| --- | --- | --- | --- | --- | --- |
| 1 — Critical | Installable, themed, tested library; Button/Input/Modal at parity; baseline form, feedback, overlay and navigation primitives | ${waveTotals[0][1]} | ${waveTotals[0][2]}–${waveTotals[0][3]} | ${waveTotals[0][4]} | ${waveTotals[0][5]}–${waveTotals[0][6]} |
| 2 — Core completion | All shared components at parity; parity contract in CI; remaining ui-layer primitives | ${waveTotals[1][1]} | ${waveTotals[1][2]}–${waveTotals[1][3]} | ${waveTotals[1][4]} | ${waveTotals[1][5]}–${waveTotals[1][6]} |
| 3 — Advanced | Heavy organisms, desktop-web patterns (mostly exceptions) | ${waveTotals[2][1]} | ${waveTotals[2][2]}–${waveTotals[2][3]} | ${waveTotals[2][4]} | ${waveTotals[2][5]}–${waveTotals[2][6]} |

New components leave the roadmap once they land (their backlog file is deleted); remediation items stay listed and are marked ✓ done or partial.

Estimates assume one engineer familiar with both codebases, Small 0.5–1 d · Medium 2–3 d · Large 5–8 d · Very Large 10–20 d, including tests and a showcase entry. Scope is KuiReact's ui-layer atoms, molecules and organisms only — app-layer components, domain verticals and theme demos are excluded by decision (see [missing-components.md](phase-2-gap-analysis/missing-components.md#scope)).

## Wave 1 in order

${ordered.filter((i) => i.wave === 1).map((it) => `${it.order}. ${it.kind === "missing" ? `[${it.f.name}](${backlogPath(it.f)})` : `**${it.id}** — ${it.title}${remMark(it.id)}`} (${it.priority}, ${it.complexity}${it.deps.length ? `; after ${it.deps.join(", ")}` : ""})`).join("\n")}

## Wave 2 in order

${ordered.filter((i) => i.wave === 2).map((it) => `${it.order}. ${it.kind === "missing" ? `[${it.f.name}](${backlogPath(it.f)})` : `**${it.id}** — ${it.title}${remMark(it.id)}`} (${it.priority}, ${it.complexity})`).join("\n")}

## Wave 3

${ordered.filter((i) => i.wave === 3).map((it) => it.kind === "missing" ? `[${it.f.name}](${backlogPath(it.f)})${it.f.meta.fit === "web-only" ? " _(exception)_" : ""}` : it.id).join(" · ")}
`);

// stats for hand-written docs
const stats = {
  missing: missing.length, missingCore: missingCore.length, missingDomain: missingDomain.length, core: coreFacts.length, total: facts.length,
  byPri: Object.fromEntries(PRI.map((p) => [p, missingCore.filter((f) => f.meta.priority === p).length])),
  waveTotals, webOnly: missing.filter((f) => f.meta.fit === "web-only").map((f) => f.id),
  domainEffort: sumEffort(missingDomain.map((f) => ({ complexity: f.meta.complexity }))),
  top25shared: topUsed.filter((f) => SHARED[f.id]).length,
  sharedKRLoc: Object.keys(SHARED).reduce((a, id) => a + byId[id].loc, 0),
  sharedKRTests: Object.keys(SHARED).reduce((a, id) => a + byId[id].testCases.length, 0),
  sharedKRVariants: Object.keys(SHARED).reduce((a, id) => a + byId[id].variants.length, 0),
  wave1: ordered.filter((i) => i.wave === 1).map((i) => i.id),
};
fs.writeFileSync(path.join(__dirname, "stats.json"), JSON.stringify(stats, null, 1));
console.log(JSON.stringify(stats, null, 1));
