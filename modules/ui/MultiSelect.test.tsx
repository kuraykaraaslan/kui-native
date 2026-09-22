import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { MultiSelect } from "./MultiSelect";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
];

const trigger = () => screen.getByTestId("multiselect-ms");
const open = () => fireEvent.press(trigger());

describe("MultiSelect", () => {
  it("shows the placeholder and is closed by default", async () => {
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} placeholder="Pick frameworks…" />);
    expect(screen.getByText("Pick frameworks…")).toBeTruthy();
    expect(screen.queryByRole("checkbox")).toBeNull();
    expect(trigger().props.accessibilityState.expanded).toBe(false);
  });

  it("opens the option list on press", async () => {
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} />);
    await open();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    expect(trigger().props.accessibilityState.expanded).toBe(true);
  });

  it("uncontrolled: toggling options adds chips and keeps the panel open", async () => {
    const onChange = jest.fn();
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} onChange={onChange} />);
    await open();
    await fireEvent.press(screen.getByRole("checkbox", { name: "React" }));
    await fireEvent.press(screen.getByRole("checkbox", { name: "Vue" }));
    expect(onChange).toHaveBeenLastCalledWith(["react", "vue"]);
    expect(screen.getByRole("button", { name: "Remove React" })).toBeTruthy();
    expect(screen.getByRole("checkbox", { name: "Vue" }).props.accessibilityState.checked).toBe(true);
  });

  it("chip remove buttons deselect the value", async () => {
    const onChange = jest.fn();
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} value={["react", "vue"]} onChange={onChange} />);
    await fireEvent.press(screen.getByRole("button", { name: "Remove React" }));
    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("disabled options are not selectable", async () => {
    const onChange = jest.fn();
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} onChange={onChange} />);
    await open();
    await fireEvent.press(screen.getByRole("checkbox", { name: "Svelte" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("a disabled MultiSelect does not open", async () => {
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} disabled />);
    await open();
    expect(screen.queryByRole("checkbox")).toBeNull();
    expect(classNameOf(trigger())).toContain("opacity-50");
  });

  it("searchable filters the options locally", async () => {
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} searchable />);
    await open();
    await fireEvent.changeText(screen.getByLabelText("Search Frameworks"), "vu");
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
    await fireEvent.changeText(screen.getByLabelText("Search Frameworks"), "zzz");
    expect(screen.getByText("No results found.")).toBeTruthy();
  });

  it("tapping outside closes the panel", async () => {
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} />);
    await open();
    await fireEvent.press(screen.getByTestId("anchored-panel-outside", { hidden: true } as never));
    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  it("shows hint, or error instead of hint", async () => {
    const r = await render(<MultiSelect id="ms" label="Tags" options={OPTIONS} hint="Pick some." />);
    expect(screen.getByText("Pick some.")).toBeTruthy();
    await r.rerender(<MultiSelect id="ms" label="Tags" options={OPTIONS} hint="Pick some." error="Please select at least one tag." />);
    expect(screen.queryByText("Pick some.")).toBeNull();
    expect(screen.getByRole("alert")).toHaveTextContent("Please select at least one tag.");
    expect(classNameOf(trigger())).toContain("border-error");
  });

  describe("async search", () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it("debounces onSearch, shows skeletons while loading, then the results", async () => {
      const onSearch = jest.fn(async (q: string) => [{ value: "x", label: `Result ${q}` }]);
      await render(<MultiSelect id="ms" label="Users" options={[]} onSearch={onSearch} debounceMs={300} />);
      await open();
      expect(screen.getAllByTestId("multiselect-skeleton")).toHaveLength(3);
      expect(onSearch).not.toHaveBeenCalled();
      await act(async () => {
        jest.advanceTimersByTime(300);
      });
      expect(onSearch).toHaveBeenCalledWith("", expect.anything());
      expect(screen.getByRole("checkbox", { name: "Result " })).toBeTruthy();
    });
  });

  it("uses KuiReact's trigger, chip and panel classes", async () => {
    await render(<MultiSelect id="ms" label="Frameworks" options={OPTIONS} value={["react"]} />);
    for (const c of ["min-h-10", "rounded-md", "border-border", "px-3", "py-1.5"]) expect(classNameOf(trigger())).toContain(c);
    expect(classNameOf(screen.getByText("React"))).toContain("text-xs font-medium text-primary");
    await open();
    const panel = classNameOf(screen.getByTestId("multiselect-panel"));
    for (const c of ["rounded-md", "border-border", "bg-surface-raised", "shadow-lg"]) expect(panel).toContain(c);
  });
});
