// modules/ui/Chart/charts/_time.ts
//
// Date text for chart labels, ported 1:1 from KuiReact's charts/_time.ts:
// `toTime` (a date-only string is a calendar day, not UTC midnight), the
// 24 h `clockText`, the short `dayMonthText` ("6 Oct") and the span-aware
// `formatTick` / `formatFull`. KuiReact's time axis itself (drag-zoom, time
// ticks) has no KuiNative counterpart yet; the cartesian charts use these to
// shorten ISO date categories on the band axis.

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const DAY = 24 * 60 * MINUTE;

/** A series x value as epoch milliseconds: a number is taken as ms, a string must be a parsable date. */
export function toTime(x: string | number): number | null {
  if (typeof x === "number") return Number.isFinite(x) ? x : null;
  // A date-only string ("2026-10-06") is a calendar DAY, not an instant: Date.parse reads it as
  // UTC midnight, which a viewer west of UTC would see labelled as the previous day.
  const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(x);
  if (day) return new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3])).getTime();
  const t = Date.parse(x);
  return Number.isNaN(t) ? null : t;
}

/** `HH:mm` (24 h), with seconds when asked. */
export function clockText(ms: number, locale?: string, timeZone?: string, seconds = false): string {
  return new Date(ms).toLocaleTimeString(locale, {
    hour: "2-digit", minute: "2-digit", ...(seconds ? { second: "2-digit" } : {}), hourCycle: "h23", ...(timeZone ? { timeZone } : {}),
  });
}

/** `d MMM` (6 Oct), with the year (`d MMM yyyy`) when asked; the month name follows the locale. */
export function dayMonthText(ms: number, locale?: string, timeZone?: string, year = false): string {
  try {
    const parts = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", ...(year ? { year: "numeric" } : {}), ...(timeZone ? { timeZone } : {}) })
      .formatToParts(new Date(ms));
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    return [get("day"), get("month").replace(/\.$/, ""), year ? get("year") : ""].filter(Boolean).join(" ");
  } catch {
    return new Date(ms).toDateString();
  }
}

/** Compact tick label for the visible span (`HH:mm`, `d MMM`, `MMM yy`), in `timeZone` when given. */
export function formatTick(ms: number, span: number, locale?: string, timeZone?: string): string {
  const d = new Date(ms);
  const z = timeZone ? { timeZone } : {};
  if (span <= 10 * MINUTE) return clockText(ms, locale, timeZone, true);
  if (span <= 2 * DAY) return clockText(ms, locale, timeZone);
  if (span <= 7 * DAY) return `${dayMonthText(ms, locale, timeZone)} ${clockText(ms, locale, timeZone)}`;
  if (span <= 400 * DAY) return dayMonthText(ms, locale, timeZone);
  return d.toLocaleDateString(locale, { year: "2-digit", month: "short", ...z });
}

/** Full label for the tooltip header (`d MMM yyyy`, or `d MMM HH:mm`), in `timeZone` when given. */
export function formatFull(ms: number, span: number, locale?: string, timeZone?: string): string {
  return span > 2 * DAY
    ? dayMonthText(ms, locale, timeZone, true)
    : `${dayMonthText(ms, locale, timeZone)} ${clockText(ms, locale, timeZone, span <= 10 * MINUTE)}`;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

/**
 * KuiNative only (it has no time axis): when every category is an ISO date or date-time, the band
 * axis tick text and tooltip heading KuiReact's time axis prints (`6 Oct`, `15:30`, `6 Oct 2026`);
 * otherwise null and the categories print as given.
 */
export function dateCategoryLabels(categories: string[], locale?: string, timeZone?: string): { ticks: string[]; full: string[] } | null {
  if (categories.length === 0 || !categories.every((c) => ISO_DATE.test(c))) return null;
  const times = categories.map((c) => toTime(c));
  if (times.some((t) => t === null)) return null;
  const ms = times as number[];
  // Calendar days carry no clock time: `6 Oct` / `6 Oct 2026`, whatever the span.
  if (categories.every((c) => c.length === 10)) {
    return { ticks: ms.map((t) => dayMonthText(t, locale, timeZone)), full: ms.map((t) => dayMonthText(t, locale, timeZone, true)) };
  }
  const span = Math.max(...ms) - Math.min(...ms);
  return { ticks: ms.map((t) => formatTick(t, span, locale, timeZone)), full: ms.map((t) => formatFull(t, span, locale, timeZone)) };
}
