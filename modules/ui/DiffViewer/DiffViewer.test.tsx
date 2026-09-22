import { fireEvent, render, renderHook, screen } from "@testing-library/react-native";

import { DiffViewer, pairChanges, partitionHunk, useDiff } from "./index";

const OLD = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].join("\n");
const NEW = ["a", "b", "c", "d", "E", "f", "g", "h", "i", "j", "k"].join("\n");

describe("useDiff (KuiReact LCS engine)", () => {
  it("returns no hunks for identical input", async () => {
    const { result } = await renderHook(() => useDiff("x\ny", "x\ny", 3));
    expect(result.current).toEqual([]);
  });

  it("builds hunks with @@ coordinates and context windows", async () => {
    const { result } = await renderHook(() => useDiff(OLD, NEW, 1));
    expect(result.current).toHaveLength(2);
    const [first] = result.current;
    expect(first).toMatchObject({ oldStart: 4, oldLines: 3, newStart: 4, newLines: 3 });
    expect(first.changes.map((c) => c.type)).toEqual(["context", "add", "remove", "context"]);
  });

  it("merges changes closer than 2 × context into one hunk", async () => {
    // The changes sit 6 lines apart: split at context 2 (6 > 5), merged at 3 (6 ≤ 7).
    const { result } = await renderHook(() => useDiff(OLD, NEW, 2));
    expect(result.current).toHaveLength(2);
    const { result: wide } = await renderHook(() => useDiff(OLD, NEW, 3));
    expect(wide.current).toHaveLength(1);
  });
});

describe("DiffViewer helpers", () => {
  it("pairs removes with adds and pads lone lines", () => {
    const pairs = pairChanges([
      { type: "remove", oldLine: 1, newLine: null, content: "x" },
      { type: "remove", oldLine: 2, newLine: null, content: "y" },
      { type: "add", oldLine: null, newLine: 1, content: "z" },
    ]);
    expect(pairs.map((p) => [p.left?.content ?? null, p.right?.content ?? null])).toEqual([["x", "z"], ["y", null]]);
  });

  it("partitions a hunk into lead / middle / trail", () => {
    const ctx = (n: number) => ({ type: "context" as const, oldLine: n, newLine: n, content: `c${n}` });
    const { lead, middle, trail } = partitionHunk([ctx(1), { type: "add", oldLine: null, newLine: 2, content: "+" }, ctx(3), ctx(4)]);
    expect([lead.length, middle.length, trail.length]).toEqual([1, 1, 2]);
  });
});

describe("DiffViewer", () => {
  it("shows 'No changes.' for identical text", async () => {
    await render(<DiffViewer oldText="same" newText="same" />);
    expect(screen.getByText("No changes.")).toBeTruthy();
  });

  it("unified: hunk headers, both gutters and tinted add/remove rows", async () => {
    await render(<DiffViewer oldText={OLD} newText={NEW} context={1} />);
    expect(screen.getByText("@@ -4,3 +4,3 @@")).toBeTruthy();
    expect(screen.getAllByTestId("diff-line-remove")).toHaveLength(1);
    expect(screen.getAllByTestId("diff-line-add")).toHaveLength(2);
    expect(screen.getByLabelText("Removed, old line 5: e")).toBeTruthy();
    expect(screen.getByLabelText("Added, new line 5: E")).toBeTruthy();
  });

  it("collapsible folds unchanged runs behind 'Show N more lines'", async () => {
    await render(<DiffViewer oldText={OLD} newText={NEW} context={2} collapsible />);
    const show = screen.getAllByRole("button", { name: /^Show 2 more lines$/ });
    expect(show.length).toBeGreaterThan(0);
    const before = screen.queryAllByTestId("diff-line-context").length;
    await fireEvent.press(show[0]);
    expect(screen.getAllByTestId("diff-line-context").length).toBe(before + 2);
  });

  it("split: two panes with phantom rows keeping them aligned", async () => {
    await render(<DiffViewer oldText={"a\nb"} newText={"a\nb\nc"} mode="split" />);
    expect(screen.getAllByText("@@ -1,2 +1,3 @@")).toHaveLength(2);
    expect(screen.getAllByTestId("diff-empty-line", { hidden: true } as never)).toHaveLength(1);
    expect(screen.getByLabelText("Added, new line 3: c")).toBeTruthy();
  });
});
