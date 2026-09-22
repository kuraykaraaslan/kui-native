// Source-fact extraction for the KuiReact ↔ KuiNative parity audit.
// Produces facts.json consumed by generate.js. Everything here is derived from
// source code; nothing is hand-entered except the shared-component mapping.
const fs = require("fs");
const path = require("path");

const KR = "//wsl.localhost/Ubuntu/home/kuray/kui-react";
const KN = "C:/Users/kuray/Documents/Projects/KUInative";

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
const reg = JSON.parse(read(path.join(KR, "public/registry/components.json")));

// ---------------------------------------------------------------- helpers
function walk(dir, filter, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    if (f === "node_modules" || f.startsWith(".")) continue;
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p, filter, out);
    else if (filter(p)) out.push(p);
  }
  return out;
}
const isSrc = (p) => /\.(tsx?|jsx?)$/.test(p) && !/\.(test|spec)\./.test(p) && !/\.d\.ts$/.test(p);
const rel = (root, p) => path.relative(root, p).split(path.sep).join("/");

function resolveModule(fromFile, spec, root) {
  let base;
  if (spec.startsWith("@/")) base = path.join(root, spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(fromFile), spec);
  else return null;
  const cands = [base, base + ".tsx", base + ".ts", path.join(base, "index.tsx"), path.join(base, "index.ts")];
  for (const c of cands) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  return null;
}

// Balanced scan from an opening bracket index; returns index of matching close.
function matchClose(s, i) {
  const open = s[i];
  const pairs = { "(": ")", "{": "}", "[": "]", "<": ">" };
  const stack = [pairs[open]];
  let str = null;
  for (let j = i + 1; j < s.length; j++) {
    const c = s[j];
    if (str) {
      if (c === "\\") { j++; continue; }
      if (c === str) str = null;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") { str = c; continue; }
    if (c === "/" && s[j + 1] === "/") { j = s.indexOf("\n", j); if (j < 0) return -1; continue; }
    if (c === "/" && s[j + 1] === "*") { j = s.indexOf("*/", j) + 1; continue; }
    if (c === "=" && s[j + 1] === ">") { j++; continue; } // arrow, not a closing angle
    if ("({[".includes(c) || (c === "<" && open === "<")) stack.push(pairs[c]);
    else if (c === stack[stack.length - 1]) {
      stack.pop();
      if (!stack.length) return j;
    }
  }
  return -1;
}

// Split at top-level separators, respecting brackets/strings/comments.
function splitTop(s, seps, opts = {}) {
  const out = [];
  let depth = 0, str = null, cur = "";
  for (let j = 0; j < s.length; j++) {
    const c = s[j];
    if (str) { cur += c; if (c === "\\") { cur += s[++j]; continue; } if (c === str) str = null; continue; }
    if (c === "'" || c === '"' || c === "`") { str = c; cur += c; continue; }
    if (c === "/" && s[j + 1] === "/") { const e = s.indexOf("\n", j); const end = e < 0 ? s.length : e; cur += s.slice(j, end); j = end - 1; continue; }
    if (c === "/" && s[j + 1] === "*") { const e = s.indexOf("*/", j) + 2; cur += s.slice(j, e); j = e - 1; continue; }
    if (c === "=" && s[j + 1] === ">") { cur += "=>"; j++; continue; }
    if ("({[<".includes(c)) depth++;
    if (")}]>".includes(c)) depth--;
    if (depth === 0 && seps.includes(c)) {
      if (c === "\n" && opts.smartNewline) {
        const rest = s.slice(j + 1).trimStart();
        const t = cur.trim();
        if (!t || /[:|&=(,]$/.test(t) || rest.startsWith("|") || rest.startsWith("&") || !/:/.test(t.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ""))) { cur += c; continue; }
      }
      out.push(cur); cur = ""; continue;
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}
function docOf(seg) {
  const m = seg.match(/\/\*\*([\s\S]*?)\*\//);
  if (m) return m[1].replace(/^\s*\*\s?/gm, "").replace(/\s+/g, " ").trim();
  const l = seg.match(/\/\/\s?(.*)$/m);
  return l ? l[1].trim() : "";
}

function parseMembers(body) {
  const members = [];
  for (const seg of splitTop(body, [";", ",", "\n"], { smartNewline: true })) {
    const doc = docOf(seg);
    const t = stripComments(seg).trim();
    if (!t) continue;
    if (t.startsWith("[")) { members.push({ name: "[key]", type: t.replace(/^\[[^\]]*\]\s*:\s*/, "").trim(), optional: true, doc: "index signature (arbitrary extra props)" }); continue; }
    if (t.startsWith("...")) continue;
    let m = t.match(/^(?:readonly\s+)?(['"]?)([\w$-]+)\1(\?)?\s*:\s*([\s\S]+)$/);
    if (m) { members.push({ name: m[2], optional: !!m[3], type: m[4].replace(/\s+/g, " ").trim(), doc }); continue; }
    m = t.match(/^([\w$]+)(\?)?\s*\(([\s\S]*)\)\s*:\s*([\s\S]+)$/);
    if (m) members.push({ name: m[1], optional: !!m[2], type: `(${m[3].replace(/\s+/g, " ")}) => ${m[4].trim()}`, doc });
  }
  return members;
}

function findTypeDecl(src, ident) {
  let m = new RegExp(`(?:export\\s+)?type\\s+${ident}\\b\\s*(<[^=]*>)?\\s*=`).exec(src);
  if (m) {
    let i = m.index + m[0].length;
    // scan until top-level ';' or blank line
    let depth = 0, str = null, j = i;
    for (; j < src.length; j++) {
      const c = src[j];
      if (str) { if (c === "\\") { j++; continue; } if (c === str) str = null; continue; }
      if (c === "'" || c === '"' || c === "`") { str = c; continue; }
      if (c === "/" && src[j + 1] === "/") { j = src.indexOf("\n", j); continue; }
      if (c === "/" && src[j + 1] === "*") { j = src.indexOf("*/", j) + 1; continue; }
      if (c === "=" && src[j + 1] === ">") { j++; continue; }
      if ("({[<".includes(c)) depth++;
      if (")}]>".includes(c)) depth--;
      if (depth === 0 && (c === ";" || (c === "\n" && src[j + 1] === "\n"))) break;
      if (depth === 0 && c === "\n" && /^(export|type|const|function|interface|import)\b/.test(src.slice(j + 1))) break;
    }
    return { kind: "type", text: src.slice(i, j).trim() };
  }
  m = new RegExp(`(?:export\\s+)?interface\\s+${ident}\\b\\s*(<[^{]*>)?\\s*(extends\\s+([^{]+))?\\{`).exec(src);
  if (m) {
    const open = m.index + m[0].length - 1;
    const close = matchClose(src, open);
    return { kind: "interface", text: src.slice(open + 1, close), extends: m[3] ? m[3].trim() : null };
  }
  return null;
}

function importedFrom(src, ident, file, root) {
  const re = /import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src))) {
    const names = m[1].split(",").map((x) => x.trim().replace(/^type\s+/, "").split(/\s+as\s+/));
    for (const [orig, alias] of names) if ((alias || orig) === ident) return resolveModule(file, m[2], root);
  }
  return null;
}

// Resolve a type expression into { members, extends[], notes[] }
function resolveType(typeText, src, file, root, depth = 0) {
  const res = { members: [], extends: [], notes: [] };
  if (!typeText || depth > 4) return res;
  typeText = stripComments(typeText).trim();
  for (let part of splitTop(typeText, ["&"])) {
    part = part.trim();
    if (!part) continue;
    if (part.startsWith("(") && part.endsWith(")")) part = part.slice(1, -1).trim();
    if (part.startsWith("{")) {
      const close = matchClose(part, 0);
      res.members.push(...parseMembers(part.slice(1, close)));
      continue;
    }
    let m = part.match(/^Omit<\s*([\s\S]+?)\s*,\s*([\s\S]+)>$/);
    if (m) {
      const inner = resolveType(m[1], src, file, root, depth + 1);
      const omit = (m[2].match(/['"]([^'"]+)['"]/g) || []).map((x) => x.slice(1, -1));
      inner.members = inner.members.filter((x) => !omit.includes(x.name));
      inner.extends = inner.extends.map((e) => `${e} (omitting ${omit.join(", ")})`);
      res.members.push(...inner.members); res.extends.push(...inner.extends); res.notes.push(...inner.notes);
      continue;
    }
    m = part.match(/^Partial<\s*([\s\S]+)>$/);
    if (m) { const inner = resolveType(m[1], src, file, root, depth + 1); inner.members.forEach((x) => (x.optional = true)); res.members.push(...inner.members); res.extends.push(...inner.extends); continue; }
    m = part.match(/^PolymorphicProps<\s*\w+\s*,\s*([\s\S]+)>$/);
    if (m) { res.notes.push("polymorphic `as` prop (renders any element; forwards that element's props)"); const inner = resolveType(m[1], src, file, root, depth + 1); res.members.push(...inner.members); res.extends.push(...inner.extends); continue; }
    if (/^(React\.)?[A-Za-z]*HTMLAttributes|^(React\.)?ComponentProps|^Record</.test(part)) { res.extends.push(part); continue; }
    m = part.match(/^([A-Z][\w$]*)(<[\s\S]*>)?$/);
    if (m) {
      let decl = findTypeDecl(src, m[1]);
      let dsrc = src, dfile = file;
      if (!decl) {
        const f = importedFrom(src, m[1], file, root);
        if (f) { dsrc = read(f); dfile = f; decl = findTypeDecl(dsrc, m[1]); }
      }
      if (!decl) { res.extends.push(part); continue; }
      if (decl.kind === "interface") {
        res.members.push(...parseMembers(decl.text));
        if (decl.extends) for (const e of splitTop(decl.extends, [","])) { const inner = resolveType(e.trim(), dsrc, dfile, root, depth + 1); res.members.push(...inner.members); res.extends.push(...inner.extends); }
      } else {
        const inner = resolveType(decl.text, dsrc, dfile, root, depth + 1);
        res.members.push(...inner.members); res.extends.push(...inner.extends); res.notes.push(...inner.notes);
      }
      continue;
    }
    res.extends.push(part);
  }
  return res;
}

function parseDefaults(destructure) {
  const d = {};
  for (let seg of splitTop(destructure, [","])) {
    seg = stripComments(seg).trim();
    if (!seg || seg.startsWith("...")) continue;
    const eq = splitTop(seg, ["="]);
    let key = eq[0].trim();
    // "'data-testid': testId" or "reducedMotion: _x"
    const km = key.match(/^['"]?([\w$-]+)['"]?\s*(?::.*)?$/);
    if (!km) continue;
    if (eq.length > 1) d[km[1]] = eq.slice(1).join("=").trim();
  }
  return d;
}

// Locate the exported component and its props.
function extractComponent(file, name, root, depth = 0) {
  const src = read(file);
  if (!src || depth > 3) return null;
  const pats = [
    new RegExp(`export\\s+(?:default\\s+)?function\\s+${name}\\s*(<[^(]*>)?\\s*\\(`),
    new RegExp(`export\\s+const\\s+${name}\\s*=\\s*(?:React\\.)?(?:forwardRef|memo)\\s*(<[\\s\\S]*?>)?\\s*\\(\\s*(?:function\\s*[\\w$]*\\s*)?\\(`),
    new RegExp(`export\\s+const\\s+${name}\\s*(?::[^=]+)?=\\s*(?:<[^>]*>)?\\s*\\(`),
    new RegExp(`(?<!\\w)function\\s+${name}\\s*(<[^(]*>)?\\s*\\(`),
  ];
  let m, pi;
  for (pi = 0; pi < pats.length; pi++) if ((m = pats[pi].exec(src))) break;
  if (!m) {
    const re = new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*['"]([^'"]+)['"]`);
    const r = re.exec(src);
    if (r) { const f = resolveModule(file, r[1], root); if (f) return extractComponent(f, name, root, depth + 1); }
    const star = [...src.matchAll(/export\s*\*\s*from\s*['"]([^'"]+)['"]/g)];
    for (const s of star) { const f = resolveModule(file, s[1], root); if (f) { const x = extractComponent(f, name, root, depth + 1); if (x) return x; } }
    return null;
  }
  const open = m.index + m[0].length - 1;
  const close = matchClose(src, open);
  const params = src.slice(open + 1, close).trim();
  let destructure = "", typeText = "";
  if (params.startsWith("{")) {
    const dc = matchClose(params, 0);
    destructure = params.slice(1, dc);
    const after = params.slice(dc + 1).trim();
    if (after.startsWith(":")) typeText = splitTop(after.slice(1), [","])[0];
  } else if (params) {
    const pm = params.match(/^[\w$]+\s*:\s*([\s\S]+)$/);
    if (pm) typeText = splitTop(pm[1], [","])[0];
  }
  if (!typeText && pi === 1 && m[1]) {
    const g = splitTop(m[1].slice(1, -1), [","]);
    if (g[1]) typeText = g[1];
  }
  const t = resolveType(typeText, src, file, root);
  const defaults = parseDefaults(destructure);
  for (const mem of t.members) if (defaults[mem.name] !== undefined) mem.default = defaults[mem.name];
  // de-dupe
  const seen = new Set();
  t.members = t.members.filter((x) => (seen.has(x.name) ? false : seen.add(x.name)));
  return { file: rel(root, file), forwardRef: pi === 1, typeText: typeText.trim().slice(0, 200), ...t, defaults };
}

// ---------------------------------------------------------------- entries
const extras = [
  { id: "server-data-table", name: "ServerDataTable", layer: "ui", filePath: "modules/ui/Table/index.tsx", description: "Server-driven data table (deprecated shim → `<DataTable mode=\"server\">`). Exported from the ui barrel but absent from the registry." },
  { id: "step-flow", name: "StepFlow", layer: "app", filePath: "modules/app/StepFlow.tsx", description: "Multi-step wizard with visual step indicator. Exported from the app barrel but absent from the registry." },
  { id: "form-field", name: "FormField", layer: "app", filePath: "modules/app/FormField.tsx", description: "Render-prop wrapper wiring react-hook-form to accessible label/hint/error markup. Exported, not in registry." },
  { id: "no-access-state", name: "NoAccessState", layer: "app", filePath: "modules/app/EmptyErrorState.tsx", description: "Permission-denied page state. Exported, not in registry." },
  { id: "notification-system", name: "NotificationProvider", layer: "app", filePath: "modules/app/NotificationSystem.tsx", description: "App-level notification provider + `notify` / `toast` API. Exported, not in registry." },
  { id: "accessibility-kit", name: "FocusTrap", layer: "app", filePath: "modules/app/AccessibilityKit.tsx", description: "Accessibility kit: FocusTrap, Announcer, AnnouncerOutlet, LiveRegion, SkipLink, Tooltip, useAnnounce. Exported, not in registry." },
  { id: "app-drawer", name: "AppDrawer", layer: "app", filePath: "modules/app/AppDrawer.tsx", description: "Slide-in drawer shell used inside AppShell mobile mode. Exported, not in registry." },
  { id: "use-breakpoint", name: "useBreakpoint", layer: "hook", filePath: "libs/hooks/useBreakpoint.ts", description: "Responsive breakpoint hook." },
  { id: "use-focus-trap", name: "useFocusTrap", layer: "hook", filePath: "libs/hooks/useFocusTrap.ts", description: "DOM focus-trap hook used by overlays." },
  { id: "use-a11y-check", name: "useA11yCheck", layer: "hook", filePath: "libs/hooks/useA11yCheck.ts", description: "Dev-time accessibility check hook." },
];

// KuiReact id → KuiNative export
const SHARED = {
  button: ["Button"], card: ["Card"], avatar: ["Avatar", "AvatarGroup"], badge: ["Badge"],
  input: ["TextInput"], checkbox: ["Checkbox"], toggle: ["Switch"], spinner: ["Spinner"],
  "empty-state": ["EmptyState"], skeleton: ["SkeletonCard"], modal: ["Modal"],
};

const entries = reg.components.map((c) => ({ ...c, source: undefined, registry: true }));
for (const e of extras) entries.push({ ...e, category: e.layer === "hook" ? "Hook" : "App", registry: false, variants: [], usedBy: [], designTokens: null });

// ---------------------------------------------------------------- barrels / public status
function barrelNames(file) {
  const src = read(path.join(KR, file)) || "";
  const names = new Set();
  for (const m of src.matchAll(/export\s+(?!type)\{([^}]*)\}/g))
    for (const n of m[1].split(",")) { const t = n.trim().split(/\s+as\s+/).pop().trim(); if (t && !t.startsWith("type ")) names.add(t); }
  for (const m of src.matchAll(/export\s+(?:function|const)\s+([\w$]+)/g)) names.add(m[1]);
  return names;
}
const uiBarrel = barrelNames("modules/ui/index.ts");
const appBarrel = barrelNames("modules/app/index.ts");
const rootBarrel = barrelNames("index.ts");
const commonBarrel = barrelNames("modules/domains/common/index.ts");
const verticalBarrels = {};
for (const v of fs.readdirSync(path.join(KR, "modules/domains"))) {
  const p = `modules/domains/${v}/index.ts`;
  if (fs.existsSync(path.join(KR, p))) verticalBarrels[v] = barrelNames(p);
}

function publicStatus(e) {
  const names = e.name.split(/\s*\+\s*/);
  const n = names[0];
  if (e.layer === "hook") return { status: "internal (libs/, not in package exports)", path: `@/${e.filePath.replace(/\.tsx?$/, "")}` };
  if (e.layer === "library") return { status: "external npm package (showcased only)", path: "@kuraykaraaslan/kui-viewer" };
  if (uiBarrel.has(n)) return { status: "public (npm: root + /ui)", path: "@kuraykaraaslan/kui-react/ui" };
  if (appBarrel.has(n)) return { status: "public (npm: root + /app)", path: "@kuraykaraaslan/kui-react/app" };
  if (e.layer === "domain" || e.filePath.includes("/domains/")) {
    const v = e.filePath.split("/")[2];
    if (v === "common" && commonBarrel.has(n)) return { status: rootBarrel.has(n) ? "public (npm: root + /common)" : "public (npm: /common)", path: "@kuraykaraaslan/kui-react/common" };
    if (verticalBarrels[v] && verticalBarrels[v].has(n)) return { status: "source-public (vertical barrel; not in npm package)", path: `@/modules/domains/${v}` };
    return { status: "source-only (not exported from a barrel)", path: `@/${e.filePath.replace(/\.tsx?$/, "")}` };
  }
  return { status: "source-only (not exported from a barrel)", path: `@/${e.filePath.replace(/\.tsx?$/, "")}` };
}

// ---------------------------------------------------------------- import frequency (usage indicator)
const allKR = walk(path.join(KR, "modules"), isSrc).concat(walk(path.join(KR, "app"), isSrc));
const nameIndex = {}; // exported name → entry id
for (const e of entries) for (const n of e.name.split(/\s*\+\s*/)) {
  const key = n.trim();
  if (!nameIndex[key] || (e.layer === "ui" || e.layer === "app")) nameIndex[key] = nameIndex[key] && (entries.find((x) => x.id === nameIndex[key]).layer === "ui") ? nameIndex[key] : e.id;
}
const usage = {}; // id → {prod:Set, showcase:Set}
const importsByFile = {};
for (const f of allKR) {
  const src = read(f);
  const r = rel(KR, f);
  const imps = [];
  for (const m of src.matchAll(/import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    if (/^import\s+type/.test(m[0])) continue;
    const target = resolveModule(f, m[2], KR);
    if (!target) continue;
    const t = rel(KR, target);
    if (!/^modules\/(ui|app|domains)\//.test(t)) continue;
    for (const n of m[1].split(",")) {
      const nm = n.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim();
      if (!nm || n.trim().startsWith("type ")) continue;
      const id = nameIndex[nm];
      if (id) imps.push(id);
    }
  }
  importsByFile[r] = [...new Set(imps)];
  for (const id of importsByFile[r]) {
    usage[id] = usage[id] || { prod: new Set(), showcase: new Set() };
    (r.startsWith("modules/showcase") || r.startsWith("app/") && !r.startsWith("app/theme") ? usage[id].showcase : usage[id].prod).add(r);
  }
}

// ---------------------------------------------------------------- per-entry facts
const knTheme = read(path.join(KN, "libs/theme.ts"));
const knLight = {}; const knDark = {};
{
  const lm = knTheme.match(/const light: TokenMap = \{([\s\S]*?)\};/)[1];
  const dm = knTheme.match(/const dark: TokenMap = \{([\s\S]*?)\};/)[1];
  for (const m of lm.matchAll(/"?([\w-]+)"?:\s*"(#[0-9a-f]+)"/g)) knLight[m[1]] = m[2];
  for (const m of dm.matchAll(/"?([\w-]+)"?:\s*"(#[0-9a-f]+)"/g)) knDark[m[1]] = m[2];
}
const tokenNames = Object.keys(knLight).sort((a, b) => b.length - a.length);

function filesOf(e) {
  const abs = path.join(KR, e.filePath);
  if (/index\.tsx?$/.test(e.filePath)) return walk(path.dirname(abs), isSrc);
  // include sibling dir with same basename if exists (e.g. ColorPicker.tsx + ColorPicker/)
  const out = [abs];
  const sib = abs.replace(/\.tsx?$/, "");
  if (fs.existsSync(sib) && fs.statSync(sib).isDirectory()) out.push(...walk(sib, isSrc));
  return out.filter((p) => fs.existsSync(p));
}

const A11Y_RN = {
  "aria-label": "`accessibilityLabel` (or `aria-label`, RN ≥0.71)",
  "aria-labelledby": "`accessibilityLabelledBy` (Android) / `aria-labelledby`; otherwise compose the label text",
  "aria-describedby": "`accessibilityHint` (iOS/Android read it after the label)",
  "aria-invalid": "no RN prop — announce the error (`AccessibilityInfo.announceForAccessibility`) and include it in `accessibilityHint`",
  "aria-busy": "`accessibilityState.busy`",
  "aria-disabled": "`accessibilityState.disabled`",
  "aria-checked": "`accessibilityState.checked` (`'mixed'` for indeterminate)",
  "aria-selected": "`accessibilityState.selected`",
  "aria-pressed": "`accessibilityState.selected` on a `button` (RN has no pressed state)",
  "aria-expanded": "`accessibilityState.expanded`",
  "aria-hidden": "`accessibilityElementsHidden` (iOS) + `importantForAccessibility=\"no-hide-descendants\"` (Android)",
  "aria-live": "`accessibilityLiveRegion` (Android) + `AccessibilityInfo.announceForAccessibility` (iOS)",
  "aria-atomic": "n/a — announce the full message string",
  "aria-modal": "`accessibilityViewIsModal` (iOS) on the dialog container",
  "aria-valuenow": "`accessibilityValue={{ now }}`",
  "aria-valuemin": "`accessibilityValue={{ min }}`",
  "aria-valuemax": "`accessibilityValue={{ max }}`",
  "aria-valuetext": "`accessibilityValue={{ text }}`",
  "aria-current": "`accessibilityState.selected` + label suffix (e.g. \"current page\")",
  "aria-controls": "n/a on native — keep for react-native-web only",
  "aria-haspopup": "`accessibilityHint` (\"opens menu\")",
  "aria-orientation": "n/a — convey via layout/hint",
  "aria-sort": "`accessibilityValue={{ text: 'sorted ascending' }}`",
  "aria-required": "append \"required\" to `accessibilityLabel`",
  "aria-activedescendant": "n/a — move accessibility focus with `AccessibilityInfo.setAccessibilityFocus`",
  "aria-autocomplete": "n/a",
  "aria-multiselectable": "n/a — expose `selected` per item",
  "aria-level": "`accessibilityRole=\"header\"` (levels not exposed on native)",
  "aria-posinset": "label suffix \"n of m\"",
  "aria-setsize": "label suffix \"n of m\"",
  "aria-roledescription": "`accessibilityHint`",
  "aria-errormessage": "include the message in `accessibilityHint` + announce",
  "aria-keyshortcuts": "n/a on touch; keep for react-native-web",
  "aria-placeholder": "n/a",
  "aria-readonly": "`editable={false}` + label suffix",
};
const ROLE_RN = {
  button: "button", link: "link", dialog: "— (`accessibilityViewIsModal`)", alertdialog: "— (`accessibilityViewIsModal`)", alert: "alert", status: "summary / live region",
  checkbox: "checkbox", switch: "switch", radio: "radio", radiogroup: "radiogroup", tab: "tab", tablist: "tablist", tabpanel: "— (plain View)",
  menu: "menu", menuitem: "menuitem", menubar: "menubar", menuitemcheckbox: "menuitem + checked", menuitemradio: "menuitem + checked", listbox: "list", option: "— (button + selected)", combobox: "combobox",
  slider: "adjustable", progressbar: "progressbar", spinbutton: "spinbutton", img: "image", heading: "header", grid: "grid", table: "grid (closest)", row: "— (View)", cell: "— (View)",
  columnheader: "header (closest)", rowheader: "header (closest)", gridcell: "— (View)", tree: "list (closest)", treeitem: "button + expanded", list: "list", listitem: "— (View)",
  navigation: "— (no landmark roles on native)", region: "— (no landmark roles)", search: "search", separator: "— (hidden)", toolbar: "toolbar", timer: "timer", log: "— (live region)",
  presentation: "none", none: "none", group: "— (`accessible` grouping)", banner: "— (no landmarks)", contentinfo: "— (no landmarks)", main: "— (no landmarks)", complementary: "— (no landmarks)", tooltip: "— (hint)", feed: "list", article: "— (View)", form: "— (View)", figure: "image", application: "—", document: "—", math: "—", note: "summary", marquee: "—", scrollbar: "scrollbar", searchbox: "search", textbox: "— (TextInput is implicit)", definition: "—", term: "—", directory: "list", meter: "progressbar", mark: "—", caption: "—",
};

const THIRD_RN = {
  "react-dom": "RN has no DOM portals — render overlays in a root-level host or RN `Modal`",
  "next/link": "expo-router `Link` / `router.push`",
  "next/image": "`expo-image`",
  "next/navigation": "`expo-router` hooks (`useRouter`, `usePathname`)",
  "next/dynamic": "not needed on RN (use `React.lazy` sparingly)",
  "next/script": "n/a on RN",
  "chart.js": "canvas unavailable — `victory-native` / `react-native-gifted-charts`",
  "react-chartjs-2": "see chart.js",
  quill: "DOM-only — WebView-based editor (e.g. TenTap)",
  leaflet: "`react-native-maps`",
  "react-leaflet": "`react-native-maps`",
  zustand: "works unchanged on RN",
  zod: "works unchanged on RN",
  "react-hook-form": "works on RN (use `Controller`)",
  "@fortawesome/react-fontawesome": "`@fortawesome/react-native-fontawesome` (+ react-native-svg)",
  "countries-list": "works unchanged",
  "country-flag-icons": "SVG flags need `react-native-svg` / emoji flags",
  "iso-639-1": "works unchanged",
};

function analyse(e) {
  const files = filesOf(e);
  const text = files.map(read).join("\n");
  const loc = text.split("\n").length;
  const names = e.name.split(/\s*\+\s*/).map((s) => s.trim());
  let props = null;
  const mainFile = path.join(KR, e.filePath);
  for (const n of names) {
    const x = extractComponent(mainFile, n, KR);
    if (x) { if (!props) props = { ...x, parts: [n] }; else { props.members.push(...x.members.map((m) => ({ ...m, doc: `(${n}) ${m.doc || ""}`.trim() }))); props.parts.push(n); } }
  }
  if (!props) {
    // fall back to the first exported function in the file
    const src = read(mainFile) || "";
    const fm = src.match(/export\s+function\s+([A-Z][\w$]*)/);
    if (fm) { const x = extractComponent(mainFile, fm[1], KR); if (x) props = { ...x, parts: [fm[1]], fallback: true }; }
  }
  const aria = [...new Set([...text.matchAll(/\baria-[a-z]+/g)].map((m) => m[0]))].sort();
  const roles = [...new Set([...text.matchAll(/\brole=["'{]+([a-z]+)/g)].map((m) => m[1]))].sort();
  const flags = {
    keyboard: /onKeyDown|onKeyUp|useFocusTrap|tabIndex/.test(text),
    focusRing: /focus-visible:ring/.test(text),
    srOnly: /sr-only/.test(text),
    reducedMotion: /prefers-reduced-motion|motion-reduce|reducedMotion/.test(text),
    portal: /createPortal|usePortal/.test(text),
    animated: /animate-|transition-|duration-/.test(text),
    hover: /hover:/.test(text),
    rawHex: (text.match(/#[0-9a-fA-F]{6}\b/g) || []).length,
  };
  const third = [...new Set([...text.matchAll(/from\s+['"]([^'".@][^'"]*|@[^'"/]+\/[^'"/]+)(?:\/[^'"]*)?['"]/g)].map((m) => m[1]))]
    .filter((p) => !["react", "react/jsx-runtime", "clsx", "tailwind-merge"].includes(p));
  const nextImports = [...new Set([...text.matchAll(/from\s+['"](next\/[\w-]+)['"]/g)].map((m) => m[1]))];
  const thirdAll = [...new Set([...third, ...nextImports])].filter((p) => !p.startsWith("@/") && p !== "next");
  // composes: ids imported by this component's files
  const composes = new Set();
  for (const f of files) for (const id of importsByFile[rel(KR, f)] || []) if (id !== e.id) composes.add(id);
  // tokens
  let tokens = e.designTokens && e.designTokens.length ? e.designTokens.map((t) => t.replace(/^--/, "")) : null;
  if (!tokens) {
    const found = new Set();
    for (const m of text.matchAll(/\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|outline|shadow|placeholder|accent|caret|decoration|border-[trblxy])-([a-z-]+)/g)) {
      const t = tokenNames.find((n) => m[1] === n || m[1].startsWith(n + "/"));
      if (t) found.add(t);
    }
    tokens = [...found].sort();
  }
  // tests
  const testFiles = walk(path.join(KR, path.dirname(e.filePath)), (p) => /\.test\.tsx?$/.test(p))
    .filter((p) => names.some((n) => path.basename(p).startsWith(n + ".")) || (/index\.tsx?$/.test(e.filePath) && path.basename(p).startsWith(path.basename(path.dirname(e.filePath)))));
  const testCases = [];
  for (const tf of testFiles) for (const m of read(tf).matchAll(/\bit\(\s*(['"`])([\s\S]*?)\1/g)) testCases.push(m[2]);
  const u = usage[e.id] || { prod: new Set(), showcase: new Set() };
  return {
    id: e.id, name: e.name, layer: e.layer, regCategory: e.category, filePath: e.filePath, registry: e.registry,
    description: e.description, status: e.status, since: e.since,
    variants: (e.variants || []).map((v) => ({ title: v.title, code: v.code })),
    usedBy: e.usedBy || [], composes: [...composes].sort(),
    loc, files: files.map((f) => rel(KR, f)), props, aria, roles, flags, third: thirdAll, tokens,
    tests: testFiles.map((f) => rel(KR, f)), testCases,
    importsProd: u.prod.size, importsShowcase: u.showcase.size,
    public: publicStatus(e),
    vertical: e.filePath.includes("/domains/") ? e.filePath.split("/")[2] : null,
  };
}

const facts = entries.map(analyse);

// ---------------------------------------------------------------- KuiNative side
const knBarrel = read(path.join(KN, "modules/ui/index.ts"));
const knExports = [...knBarrel.matchAll(/export\s+\{([^}]*)\}\s*from\s*["']\.\/(\w+)["']/g)].flatMap((m) => m[1].split(",").map((n) => ({ name: n.trim(), file: `modules/ui/${m[2]}.tsx` })));
const knFacts = knExports.map((x) => {
  const p = extractComponent(path.join(KN, x.file), x.name, KN);
  const text = read(path.join(KN, x.file));
  const internalUsers = walk(path.join(KN, "modules"), isSrc).concat(walk(path.join(KN, "app"), isSrc))
    .filter((f) => f !== path.join(KN, x.file) && new RegExp(`\\b${x.name}\\b`).test(read(f)) && /from\s+["'](\.\/|@\/modules\/ui)/.test(read(f)))
    .map((f) => rel(KN, f));
  const sharedWith = Object.entries(SHARED).find(([, v]) => v.includes(x.name));
  return {
    name: x.name, file: x.file, loc: text.split("\n").length, props: p,
    a11y: [...new Set([...text.matchAll(/\baccessibility\w+|\baria-\w+|\brole=/g)].map((m) => m[0]))].sort(),
    rawColors: (text.match(/#[0-9a-fA-F]{3,6}\b|rgba?\(/g) || []).length,
    usesThemeTokens: /useThemeTokens/.test(text),
    krCounterpart: sharedWith ? sharedWith[0] : null,
    users: internalUsers,
  };
});

// token comparison
const krCss = read(path.join(KR, "app/globals.css"));
const krLight = {}, krDark = {};
{
  const rootBlock = krCss.match(/:root\s*\{([\s\S]*?)\}/)[1];
  const darkBlock = krCss.match(/\.dark\s*\{([\s\S]*?)\}/)[1];
  for (const m of rootBlock.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]+)/g)) krLight[m[1]] = m[2].toLowerCase();
  for (const m of darkBlock.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]+)/g)) krDark[m[1]] = m[2].toLowerCase();
}
const tokenDiff = [];
for (const k of new Set([...Object.keys(krLight), ...Object.keys(knLight)])) {
  tokenDiff.push({ token: k, krLight: krLight[k] || null, knLight: knLight[k] || null, krDark: krDark[k] || null, knDark: knDark[k] || null });
}

fs.writeFileSync(path.join(__dirname, "facts.json"), JSON.stringify({ facts, knFacts, tokenDiff, SHARED, knLight, knDark, generatedAt: new Date().toISOString(), registryGeneratedAt: reg.generatedAt, registryVersion: reg.version }, null, 1));

// summary to stdout
const miss = facts.filter((f) => !SHARED[f.id] && f.layer !== "library");
console.log("entries", facts.length, "missing", miss.length);
console.log("props extracted", facts.filter((f) => f.props && f.props.members.length).length, "/", facts.length);
console.log("no props:", facts.filter((f) => !f.props || !f.props.members.length).map((f) => f.id).join(", "));
console.log("tokenDiff mismatches:", tokenDiff.filter((t) => t.krLight !== t.knLight || t.krDark !== t.knDark).map((t) => t.token).join(", ") || "none");
console.log("knFacts:", knFacts.map((k) => `${k.name}:${k.props ? k.props.members.length : "x"}:${k.krCounterpart}`).join(" "));
for (const id of ["button", "input", "modal", "card", "toggle", "badge", "select", "toast", "drawer", "chart"]) {
  const f = facts.find((x) => x.id === id);
  console.log(id, "props:", f.props ? f.props.members.map((m) => m.name + (m.optional ? "?" : "") + (m.default ? "=" + m.default : "")).join(",") : "NONE", "| ext:", f.props && f.props.extends.join(";"), "| composes:", f.composes.join(","), "| imports", f.importsProd, f.importsShowcase, "| tests", f.testCases.length);
}
