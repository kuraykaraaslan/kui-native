import { fireEvent, render, screen } from "@testing-library/react-native";

import { Pagination } from "./Pagination";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const btn = (name: string) => screen.getByRole("button", { name });
const disabled = (name: string) => Boolean(btn(name).props.accessibilityState?.disabled);

// Ports KuiReact's Pagination tests (modules/ui/Pagination.test.tsx).
describe("Pagination", () => {
  it('marks the current page (KuiReact: aria-current="page")', async () => {
    await render(<Pagination page={3} totalPages={5} onPageChange={() => {}} />);
    expect(btn("Page 3").props["aria-current"]).toBe("page");
    expect(btn("Page 3").props.accessibilityState.selected).toBe(true);
    expect(btn("Page 2").props["aria-current"]).toBeUndefined();
  });

  it("renders all pages without ellipsis when the range is small", async () => {
    await render(<Pagination page={2} totalPages={4} onPageChange={() => {}} />);
    for (const n of [1, 2, 3, 4]) expect(btn(`Page ${n}`)).toBeTruthy();
    expect(screen.queryByText("…")).toBeNull();
  });

  it("collapses a large page range into first/last + neighbors + ellipsis", async () => {
    await render(<Pagination page={10} totalPages={20} onPageChange={() => {}} />);
    for (const n of [1, 20, 9, 11]) expect(btn(`Page ${n}`)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Page 5" })).toBeNull();
    expect(screen.getAllByText("…").length).toBeGreaterThan(0);
  });

  it("Previous is disabled on the first page, Next on the last page", async () => {
    const r = await render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(disabled("Previous page")).toBe(true);
    expect(disabled("Next page")).toBe(false);
    await r.rerender(<Pagination page={5} totalPages={5} onPageChange={() => {}} />);
    expect(disabled("Next page")).toBe(true);
    expect(disabled("Previous page")).toBe(false);
  });

  it("pressing a page number calls onPageChange with that page", async () => {
    const onPageChange = jest.fn();
    await render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    await fireEvent.press(btn("Page 2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("pressing Next/Previous moves by one page", async () => {
    const onPageChange = jest.fn();
    await render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    await fireEvent.press(btn("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(4);
    await fireEvent.press(btn("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("showFirstLast renders First/Last buttons that jump to the edges", async () => {
    const onPageChange = jest.fn();
    await render(<Pagination page={5} totalPages={10} onPageChange={onPageChange} showFirstLast />);
    await fireEvent.press(btn("First page"));
    expect(onPageChange).toHaveBeenCalledWith(1);
    await fireEvent.press(btn("Last page"));
    expect(onPageChange).toHaveBeenCalledWith(10);
  });

  it("showJumpTo submits a valid page number and clears the field", async () => {
    const onPageChange = jest.fn();
    await render(<Pagination page={1} totalPages={20} onPageChange={onPageChange} showJumpTo />);
    const input = screen.getByLabelText(/Jump to page/);
    await fireEvent.changeText(input, "7");
    await fireEvent.press(btn("Go"));
    expect(onPageChange).toHaveBeenCalledWith(7);
    expect(screen.getByLabelText(/Jump to page/).props.value).toBe("");
  });

  it("showJumpTo ignores an out-of-range page number", async () => {
    const onPageChange = jest.fn();
    await render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} showJumpTo />);
    await fireEvent.changeText(screen.getByLabelText(/Jump to page/), "999");
    await fireEvent(screen.getByLabelText(/Jump to page/), "submitEditing");
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("uses KuiReact's size and current-page classes", async () => {
    await render(<Pagination page={2} totalPages={3} onPageChange={() => {}} size="sm" />);
    expect(classNameOf(btn("Page 2"))).toContain("bg-primary");
    expect(classNameOf(btn("Page 1"))).toContain("w-7 h-7");
    expect(classNameOf(btn("Next page"))).toContain("px-2 py-1");
    expect(classNameOf(screen.getByText("2"))).toContain("text-primary-fg");
  });
});
