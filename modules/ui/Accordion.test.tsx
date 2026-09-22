import { fireEvent, render, screen } from "@testing-library/react-native";

import { Accordion, type AccordionItem } from "./Accordion";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const ITEMS: AccordionItem[] = [
  { id: "shipping", title: "Shipping", content: "Orders ship within 2 business days via standard carrier." },
  { id: "returns", title: "Returns", content: "Free returns within 30 days of delivery, unworn and with tags." },
  { id: "warranty", title: "Warranty", content: "Covered by a 1-year limited manufacturer warranty.", disabled: true },
];

const header = (name: string) => screen.getByRole("button", { name });

describe("Accordion", () => {
  it("renders every header and only the default-open panel", async () => {
    await render(<Accordion items={ITEMS} defaultOpenIds={["shipping"]} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByText(/Orders ship/)).toBeTruthy();
    expect(screen.queryByText(/Free returns/)).toBeNull();
    expect(header("Shipping").props.accessibilityState.expanded).toBe(true);
    expect(header("Returns").props.accessibilityState.expanded).toBe(false);
  });

  it("single-open: opening one panel closes the other", async () => {
    await render(<Accordion items={ITEMS} defaultOpenIds={["shipping"]} />);
    await fireEvent.press(header("Returns"));
    expect(screen.getByText(/Free returns/)).toBeTruthy();
    expect(screen.queryByText(/Orders ship/)).toBeNull();
  });

  it("pressing an open header closes it", async () => {
    await render(<Accordion items={ITEMS} defaultOpenIds={["shipping"]} />);
    await fireEvent.press(header("Shipping"));
    expect(screen.queryByText(/Orders ship/)).toBeNull();
  });

  it("allowMultiple keeps panels open independently", async () => {
    await render(<Accordion items={ITEMS} allowMultiple defaultOpenIds={["shipping"]} />);
    await fireEvent.press(header("Returns"));
    expect(screen.getByText(/Orders ship/)).toBeTruthy();
    expect(screen.getByText(/Free returns/)).toBeTruthy();
  });

  it("disabled headers do not toggle", async () => {
    const onChange = jest.fn();
    await render(<Accordion items={ITEMS} onChange={onChange} />);
    expect(classNameOf(header("Warranty"))).toContain("opacity-50");
    await fireEvent.press(header("Warranty"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByText(/1-year/)).toBeNull();
  });

  it("controlled: follows openIds and reports the next ids via onChange", async () => {
    const onChange = jest.fn();
    const r = await render(<Accordion items={ITEMS} openIds={[]} onChange={onChange} />);
    await fireEvent.press(header("Returns"));
    expect(onChange).toHaveBeenCalledWith(["returns"]);
    expect(screen.queryByText(/Free returns/)).toBeNull();
    await r.rerender(<Accordion items={ITEMS} openIds={["returns"]} onChange={onChange} />);
    expect(screen.getByText(/Free returns/)).toBeTruthy();
  });

  it("uses KuiReact's container, header and panel classes", async () => {
    const { toJSON } = await render(<Accordion items={ITEMS} defaultOpenIds={["shipping"]} className="w-full" />);
    const root = toJSON() as unknown as { props: { className?: string } };
    for (const c of ["rounded-lg", "border-border", "bg-surface-base", "w-full"]) {
      expect(classNameOf(root as never)).toContain(c);
    }
    expect(classNameOf(header("Shipping"))).toContain("px-4 py-3");
    expect(classNameOf(screen.getByText("Shipping"))).toContain("font-medium");
    expect(classNameOf(screen.getByText(/Orders ship/))).toContain("text-text-secondary");
  });
});
