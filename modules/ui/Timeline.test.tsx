import { render, screen } from "@testing-library/react-native";

import { Timeline, type TimelineItem } from "./Timeline";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const ITEMS: TimelineItem[] = [
  { id: "1", at: "2026-08-25T09:12:00Z", title: "Email sent", body: "Re: shipping integration", tone: "info" },
  { id: "2", at: "2026-08-25T14:40:00Z", title: "Reply received", tone: "success" },
  { id: "3", at: "2026-08-24T16:05:00Z", title: "Call completed" },
];

describe("Timeline", () => {
  it("shows the empty message when there are no items", async () => {
    await render(<Timeline items={[]} emptyMessage="No activity on this company yet." />);
    expect(screen.getByText("No activity on this company yet.")).toBeTruthy();
  });

  it("sorts newest first and groups under one heading per local day", async () => {
    await render(<Timeline items={ITEMS} timeZone="UTC" locale="en-US" />);
    const headings = screen.getAllByRole("header");
    expect(headings.map((h) => h.props.children)).toEqual(["Tuesday, August 25, 2026", "Monday, August 24, 2026"]);
    const titles = ["Reply received", "Email sent", "Call completed"].map((t) => screen.getByText(t));
    expect(titles).toHaveLength(3);
  });

  it("groups by the given time zone, not the raw ISO date", async () => {
    // 23:30 UTC on the 24th is already the 25th in Istanbul (UTC+3).
    await render(<Timeline items={[{ id: "x", at: "2026-08-24T23:30:00Z", title: "Late" }]} timeZone="Europe/Istanbul" locale="en-US" />);
    expect(screen.getByRole("header").props.children).toBe("Tuesday, August 25, 2026");
    expect(screen.getByText("02:30")).toBeTruthy();
  });

  it("groupByDay={false} hides the headings", async () => {
    await render(<Timeline items={ITEMS} groupByDay={false} timeZone="UTC" />);
    expect(screen.queryAllByRole("header")).toHaveLength(0);
  });

  it("draws a connector between events but not after the last one", async () => {
    await render(<Timeline items={ITEMS} timeZone="UTC" />);
    expect(screen.getAllByTestId("timeline-connector")).toHaveLength(2);
  });

  it("uses KuiReact's tone and text classes", async () => {
    await render(<Timeline items={ITEMS} timeZone="UTC" />);
    expect(classNameOf(screen.getByText("Email sent"))).toContain("text-sm text-text-primary");
    expect(classNameOf(screen.getByText("Re: shipping integration"))).toContain("text-text-secondary");
  });
});
