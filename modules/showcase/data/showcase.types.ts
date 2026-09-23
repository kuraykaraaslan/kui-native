/** KuiReact's `ShowcaseComponent['category']`, restricted to the ui layer. */
export type ShowcasePageCategory = "Atom" | "Molecule" | "Organism";

/** A KuiReact showcase variant: title, code pane and `layout`. */
export type ShowcaseVariantMeta = {
  title: string;
  /** KuiReact's code-pane snippet; null → the preview takes the full width. */
  code: string | null;
  /** KuiReact's `layout: 'stack'` (honoured in the grid layout). */
  stack: boolean;
  /** Sizing classes of KuiReact's preview wrapper `<div>` (e.g. `w-full max-w-sm`). */
  wrap: string | null;
};

/** One `/<slug>` page, as KuiReact's ShowcaseDetail renders it. */
export type ShowcasePage = {
  name: string;
  category: ShowcasePageCategory;
  description: string;
  filePath: string;
  variants: ShowcaseVariantMeta[];
};

export type ShowcaseNavItem = { id: string; title: string; abbr: string };
export type ShowcaseNavGroup = { label: string; items: ShowcaseNavItem[] };
