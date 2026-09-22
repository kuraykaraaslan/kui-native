import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { filterOptions } from "./hooks/useFilter";
import { ComboBox, type ComboBoxOption } from "./index";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const OPTIONS: ComboBoxOption[] = [
  { value: "nextjs", label: "Next.js", description: "App Router framework" },
  { value: "react", label: "React", description: "UI library for components" },
  { value: "tailwind", label: "Tailwind CSS", description: "Utility-first CSS toolkit", disabled: true },
];

const input = () => screen.getByTestId("combobox-cb-input");
const option = (label: string) => screen.getByRole("button", { name: new RegExp(`^${label}`) });

describe("filterOptions (shared with MultiSelect)", () => {
  it("matches label or description, case-insensitively", () => {
    expect(filterOptions(OPTIONS, "ROUTER").map((o) => o.value)).toEqual(["nextjs"]);
    expect(filterOptions(OPTIONS, "  ")).toHaveLength(3);
  });
});

describe("ComboBox", () => {
  it("shows the selected option's label and opens the list on focus", async () => {
    await render(<ComboBox id="cb" label="Framework" options={OPTIONS} value="react" />);
    expect(input().props.value).toBe("React");
    expect(screen.queryByTestId("combobox-cb-listbox")).toBeNull();
    await fireEvent(input(), "focus");
    expect(screen.getByTestId("combobox-cb-listbox")).toBeTruthy();
    expect(option("React").props.accessibilityState.selected).toBe(true);
  });

  it("typing filters the options locally", async () => {
    await render(<ComboBox id="cb" label="Framework" options={OPTIONS} />);
    await fireEvent(input(), "focus");
    await fireEvent.changeText(input(), "utility");
    expect(screen.getAllByRole("button", { name: /Tailwind/ })).toHaveLength(1);
    expect(screen.queryByRole("button", { name: /^React/ })).toBeNull();
    await fireEvent.changeText(input(), "zzz");
    expect(screen.getByText("No results found.")).toBeTruthy();
  });

  it("selecting an option commits it and closes the list", async () => {
    const onChange = jest.fn();
    await render(<ComboBox id="cb" label="Framework" options={OPTIONS} onChange={onChange} />);
    await fireEvent(input(), "focus");
    await fireEvent.press(option("Next.js"));
    expect(onChange).toHaveBeenCalledWith("nextjs");
    expect(screen.queryByTestId("combobox-cb-listbox")).toBeNull();
    expect(input().props.value).toBe("Next.js");
  });

  it("disabled options cannot be selected", async () => {
    const onChange = jest.fn();
    await render(<ComboBox id="cb" label="Framework" options={OPTIONS} onChange={onChange} />);
    await fireEvent(input(), "focus");
    await fireEvent.press(option("Tailwind CSS"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("the clear button resets the selection", async () => {
    const onChange = jest.fn();
    await render(<ComboBox id="cb" label="Framework" options={OPTIONS} value="react" onChange={onChange} />);
    await fireEvent.press(screen.getByRole("button", { name: "Clear selection" }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("clearable={false} hides the clear button", async () => {
    await render(<ComboBox id="cb" label="Framework" options={OPTIONS} value="react" clearable={false} />);
    expect(screen.queryByRole("button", { name: "Clear selection" })).toBeNull();
  });

  describe("with timers", () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it("blurring (tapping outside) closes the list after a short delay", async () => {
      await render(<ComboBox id="cb" label="Framework" options={OPTIONS} />);
      await fireEvent(input(), "focus");
      await fireEvent(input(), "blur");
      expect(screen.getByTestId("combobox-cb-listbox")).toBeTruthy();
      await act(async () => {
        jest.advanceTimersByTime(200);
      });
      expect(screen.queryByTestId("combobox-cb-listbox")).toBeNull();
    });

    it("async: debounces onSearch and shows its results", async () => {
      const onSearch = jest.fn(async (q: string) => OPTIONS.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())));
      await render(<ComboBox id="cb" label="Framework" options={[]} onSearch={onSearch} debounceMs={300} />);
      await fireEvent(input(), "focus");
      await fireEvent.changeText(input(), "rea");
      expect(screen.getAllByTestId("combobox-skeleton")).toHaveLength(3);
      await act(async () => {
        jest.advanceTimersByTime(300);
      });
      expect(onSearch).toHaveBeenLastCalledWith("rea", expect.anything());
      expect(option("React")).toBeTruthy();
    });
  });

  it("windowing renders only the rows in view past the threshold", async () => {
    const many = Array.from({ length: 200 }, (_, i) => ({ value: `v${i}`, label: `Item ${i}` }));
    await render(<ComboBox id="cb" label="Items" options={many} />);
    await fireEvent(input(), "focus");
    const rendered = screen.getAllByRole("button", { name: /^Item / });
    expect(rendered.length).toBeLessThan(30);
  });

  it("error: alert text, error border and ring", async () => {
    await render(<ComboBox id="cb" label="Framework" options={OPTIONS} error="Pick one." />);
    expect(screen.getByRole("alert")).toHaveTextContent("Pick one.");
    expect(classNameOf(screen.getByTestId("combobox-cb"))).toContain("border-error");
    expect(StyleSheet.flatten(screen.getByTestId("combobox-cb").props.style).outlineWidth).toBe(1);
  });
});
