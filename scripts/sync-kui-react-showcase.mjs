/**
 * Regenerates modules/showcase/data/showcase.generated.ts from KuiReact, the
 * showcase's source of truth: navigation groups, order, titles and abbrs
 * (showcase.menu.ts), each page's name, category, description and variant
 * titles / code (public/registry/components.json), and each variant's
 * `layout` (the section files — the registry doesn't carry it).
 *
 * Only KuiReact's ui-layer groups (Atoms, Molecules, Organisms) are synced;
 * the domain / app / theme / library pages have no KuiNative counterpart.
 * Pages without a native demo entry in modules/showcase/registry.tsx are
 * left out of the navigation and reported.
 *
 * The Source block shows KuiNative's own file for each page, so the source
 * text is read from this repo; showcase.generated.test.ts fails when it
 * drifts from the component files.
 *
 *   KUI_REACT=/path/to/kui-react npm run showcase:sync
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REACT = process.env.KUI_REACT ?? "//wsl.localhost/Ubuntu/home/kuray/kui-react";
const OUT = path.join(ROOT, "modules/showcase/data/showcase.generated.ts");
const UI_GROUPS = ["Atoms", "Molecules", "Organisms"];

/** KuiReact paths that don't exist here, mapped to the KuiNative file. */
const NATIVE_FILE = {
  "file-input": "modules/ui/FileInput.tsx",
  "time-picker": "modules/ui/TimePicker.tsx",
  modal: "modules/ui/Modal.tsx",
  drawer: "modules/ui/Drawer.tsx",
  popover: "modules/ui/Popover.tsx",
  slider: "modules/ui/Slider.tsx",
};

function parse(file) {
  return ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}
function prop(obj, name) {
  return obj.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText() === name)?.initializer;
}
function str(node) {
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}
function walk(node, fn) {
  fn(node);
  ts.forEachChild(node, (c) => walk(c, fn));
}

// 1. Navigation (showcase.menu.ts → NAV_GROUPS).
const menuSrc = parse(path.join(REACT, "modules/showcase/data/showcase.menu.ts"));
const groups = [];
walk(menuSrc, (n) => {
  if (!ts.isObjectLiteralExpression(n)) return;
  const label = str(prop(n, "label"));
  const items = prop(n, "items");
  if (!label || !items || !ts.isArrayLiteralExpression(items)) return;
  groups.push({
    label,
    items: items.elements.filter(ts.isObjectLiteralExpression).map((o) => ({
      id: str(prop(o, "id")),
      title: str(prop(o, "title")),
      abbr: str(prop(o, "abbr")),
    })),
  });
});
const uiGroups = groups.filter((g) => UI_GROUPS.includes(g.label));

/**
 * Sizing classes on a preview's root `<div>` (e.g. `w-full max-w-sm`): the
 * frame KuiReact gives each demo inside the centred flex-wrap canvas. Only
 * sizing transfers — the native demo lays out its own children.
 */
const SIZING = /^(w-|min-w-|max-w-|h-|min-h-|max-h-|self-|mx-auto$|flex-1$|shrink-0$)/;
function previewWrap(node) {
  let e = node;
  while (e && ts.isParenthesizedExpression(e)) e = e.expression;
  const open = e && (ts.isJsxElement(e) ? e.openingElement : ts.isJsxSelfClosingElement(e) ? e : null);
  if (!open || open.tagName.getText() !== "div") return null;
  const attr = open.attributes.properties.find((a) => a.name?.getText() === "className");
  const value = attr?.initializer && ts.isStringLiteral(attr.initializer) ? attr.initializer.text : "";
  const cls = value.split(/\s+/).filter((c) => SIZING.test(c));
  return cls.length ? cls.join(" ") : null;
}

// 2. Variant layouts from the section files: id → [{ title, stack, wrap }].
const layouts = new Map();
const sectionDir = path.join(REACT, "modules/showcase/data/sections");
for (const f of fs.readdirSync(sectionDir).filter((f) => f.startsWith("ui-"))) {
  walk(parse(path.join(sectionDir, f)), (n) => {
    if (!ts.isObjectLiteralExpression(n)) return;
    const id = str(prop(n, "id"));
    const variants = prop(n, "variants");
    if (!id || !variants || !ts.isArrayLiteralExpression(variants)) return;
    layouts.set(
      id,
      variants.elements.filter(ts.isObjectLiteralExpression).map((v) => ({
        title: str(prop(v, "title")),
        stack: prop(v, "layout")?.getText().includes("stack") ?? false,
        wrap: previewWrap(prop(v, "preview")),
      })),
    );
  });
}

// 3. Native demo ids and titles (registry.tsx).
const nativeDemos = new Map();
walk(parse(path.join(ROOT, "modules/showcase/registry.tsx")), (n) => {
  if (!ts.isObjectLiteralExpression(n)) return;
  const id = str(prop(n, "id"));
  const variants = prop(n, "variants");
  if (!id || !variants || !ts.isArrayLiteralExpression(variants)) return;
  nativeDemos.set(id, variants.elements.filter(ts.isObjectLiteralExpression).map((v) => str(prop(v, "title"))));
});

// 4. Assemble.
const registry = JSON.parse(fs.readFileSync(path.join(REACT, "public/registry/components.json"), "utf8"));
const report = [];
const pages = {};
const nav = uiGroups.map((g) => ({
  label: g.label,
  items: g.items.filter((item) => {
    if (!nativeDemos.has(item.id)) {
      report.push(`missing page: ${item.id} (no native demos)`);
      return false;
    }
    const c = registry.components.find((x) => x.id === item.id);
    const lay = layouts.get(item.id) ?? [];
    const filePath = NATIVE_FILE[item.id] ?? c.filePath;
    if (!fs.existsSync(path.join(ROOT, filePath))) throw new Error(`${item.id}: ${filePath} not found`);
    pages[item.id] = {
      name: c.name,
      category: c.category,
      description: c.description,
      filePath,
      variants: c.variants.map((v) => ({
        title: v.title,
        code: v.code ?? null,
        stack: lay.find((l) => l.title === v.title)?.stack ?? false,
        wrap: lay.find((l) => l.title === v.title)?.wrap ?? null,
      })),
    };
    const want = c.variants.map((v) => v.title);
    const have = nativeDemos.get(item.id);
    for (const t of want) if (!have.includes(t)) report.push(`missing demo: ${item.id} → "${t}"`);
    for (const t of have) if (!want.includes(t)) report.push(`extra demo: ${item.id} → "${t}"`);
    return true;
  }),
}));
for (const id of nativeDemos.keys()) {
  if (!pages[id]) report.push(`extra page: ${id} (not in KuiReact's ui groups)`);
}

const sources = Object.fromEntries(
  [...new Set(Object.values(pages).map((p) => p.filePath))].map((f) => [f, fs.readFileSync(path.join(ROOT, f), "utf8")]),
);

const header = `// GENERATED by scripts/sync-kui-react-showcase.mjs from KuiReact — do not edit.
// Re-run \`npm run showcase:sync\` after changing KuiReact's showcase or a KuiNative component.
/* eslint-disable */
`;
fs.writeFileSync(
  OUT,
  `${header}
import type { ShowcaseNavGroup, ShowcasePage } from "./showcase.types";

export const NAV_GROUPS: ShowcaseNavGroup[] = ${JSON.stringify(nav, null, 2)};

export const PAGES: Record<string, ShowcasePage> = ${JSON.stringify(pages, null, 2)};

/** KuiNative source for each page's Source block, keyed by file path. */
export const SOURCES: Record<string, string> = ${JSON.stringify(sources, null, 2)};
`,
);
const wraps = Object.values(pages).flatMap((p) => p.variants.filter((v) => v.wrap).map((v) => v.wrap));
console.log(`wrote ${path.relative(ROOT, OUT)}: ${Object.keys(pages).length} pages, ${wraps.length} preview frames`);
console.log([...new Set(wraps.join(" ").split(" "))].sort().join(" "));
if (report.length) console.log(report.join("\n"));
