/*
 * Semantic color tokens for NativeWind/Tailwind — each maps to a CSS variable
 * defined in global.css. Required by tailwind.config.js. Mirrors the KUIREACT
 * token names so `bg-primary`, `text-text-primary`, `border-border`, etc. behave
 * identically to the web library. Dark values swap via @media in global.css.
 */
const colors = {
  primary: "var(--color-primary)",
  "primary-hover": "var(--color-primary-hover)",
  "primary-active": "var(--color-primary-active)",
  "primary-subtle": "var(--color-primary-subtle)",
  "primary-fg": "var(--color-primary-fg)",

  secondary: "var(--color-secondary)",
  "secondary-hover": "var(--color-secondary-hover)",
  "secondary-active": "var(--color-secondary-active)",
  "secondary-subtle": "var(--color-secondary-subtle)",
  "secondary-fg": "var(--color-secondary-fg)",

  "surface-base": "var(--color-surface-base)",
  "surface-raised": "var(--color-surface-raised)",
  "surface-overlay": "var(--color-surface-overlay)",
  "surface-sunken": "var(--color-surface-sunken)",

  "text-primary": "var(--color-text-primary)",
  "text-secondary": "var(--color-text-secondary)",
  "text-disabled": "var(--color-text-disabled)",
  "text-inverse": "var(--color-text-inverse)",

  border: "var(--color-border)",
  "border-strong": "var(--color-border-strong)",
  "border-focus": "var(--color-border-focus)",

  success: "var(--color-success)",
  "success-subtle": "var(--color-success-subtle)",
  "success-fg": "var(--color-success-fg)",

  warning: "var(--color-warning)",
  "warning-subtle": "var(--color-warning-subtle)",
  "warning-fg": "var(--color-warning-fg)",

  error: "var(--color-error)",
  "error-subtle": "var(--color-error-subtle)",
  "error-fg": "var(--color-error-fg)",

  info: "var(--color-info)",
  "info-subtle": "var(--color-info-subtle)",
  "info-fg": "var(--color-info-fg)",
};

module.exports = { colors };
