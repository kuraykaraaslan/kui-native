import { render, screen } from "@testing-library/react-native";

import { ContentScoreBar, type ScoreRule } from "./ContentScoreBar";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const makeRules = (pass: number, total: number): ScoreRule[] =>
  Array.from({ length: total }, (_, i) => ({ label: `Rule ${i + 1}`, check: () => i < pass, points: 1 }));

describe("ContentScoreBar", () => {
  it("scores weighted rules and shows the pass count", async () => {
    const rules: ScoreRule[] = [
      { label: "Min 8 chars", check: (v) => v.length >= 8, points: 25 },
      { label: "Uppercase", check: (v) => /[A-Z]/.test(v), points: 25 },
      { label: "Number", check: (v) => /\d/.test(v), points: 50 },
    ];
    await render(<ContentScoreBar value="Hello1" rules={rules} label="Password strength" />);
    expect(screen.getByText("75%")).toBeTruthy();
    expect(screen.getByText("2 / 3 rules passed")).toBeTruthy();
    expect(screen.getByRole("progressbar").props.accessibilityValue.now).toBe(75);
  });

  it("maps scores to Good / Fair / Poor tiers", async () => {
    const good = await render(<ContentScoreBar value="" rules={makeRules(5, 5)} />);
    expect(good.getByText("Good")).toBeTruthy();
    expect(classNameOf(good.getByTestId("content-score-bar"))).toContain("bg-success-subtle");
    const fair = await render(<ContentScoreBar value="" rules={makeRules(3, 5)} />);
    expect(fair.getByText("Fair")).toBeTruthy();
    const poor = await render(<ContentScoreBar value="" rules={makeRules(1, 5)} />);
    expect(poor.getByText("Poor")).toBeTruthy();
    expect(poor.getByTestId("content-score-fill").props.style).toEqual({ width: "20%" });
  });

  it("scores 0 with no rules", async () => {
    await render(<ContentScoreBar value="x" rules={[]} />);
    expect(screen.getByText("0%")).toBeTruthy();
  });
});
