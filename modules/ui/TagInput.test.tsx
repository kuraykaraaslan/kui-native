import { fireEvent, render, screen } from "@testing-library/react-native";

import { TagInput } from "./TagInput";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const input = () => screen.getByTestId("taginput-t-input");

describe("TagInput", () => {
  it("renders chips for the value and the placeholder only when empty", async () => {
    const r = await render(<TagInput id="t" label="Tags" value={[]} onChange={() => {}} />);
    expect(input().props.placeholder).toBe("Type and press Enter or comma…");
    await r.rerender(<TagInput id="t" label="Tags" value={["react"]} onChange={() => {}} />);
    expect(screen.getByText("react")).toBeTruthy();
    expect(input().props.placeholder).toBeUndefined();
  });

  it("submitting adds a trimmed tag and clears the input", async () => {
    const onChange = jest.fn();
    await render(<TagInput id="t" label="Tags" value={["react"]} onChange={onChange} />);
    await fireEvent.changeText(input(), "  expo ");
    await fireEvent(input(), "submitEditing");
    expect(onChange).toHaveBeenCalledWith(["react", "expo"]);
    expect(input().props.value).toBe("");
  });

  it("a comma adds the completed tags and keeps the remainder", async () => {
    const onChange = jest.fn();
    await render(<TagInput id="t" label="Tags" value={[]} onChange={onChange} />);
    await fireEvent.changeText(input(), "a, b,c");
    expect(onChange).toHaveBeenCalledWith(["a", "b"]);
    expect(input().props.value).toBe("c");
  });

  it("ignores duplicates", async () => {
    const onChange = jest.fn();
    await render(<TagInput id="t" label="Tags" value={["react"]} onChange={onChange} />);
    await fireEvent.changeText(input(), "react");
    await fireEvent(input(), "submitEditing");
    expect(onChange).toHaveBeenCalledWith(["react"]);
  });

  it("Backspace on an empty input removes the last tag", async () => {
    const onChange = jest.fn();
    await render(<TagInput id="t" label="Tags" value={["a", "b"]} onChange={onChange} />);
    await fireEvent(input(), "keyPress", { nativeEvent: { key: "Backspace" } });
    expect(onChange).toHaveBeenCalledWith(["a"]);
  });

  it("the chip remove button removes that tag", async () => {
    const onChange = jest.fn();
    await render(<TagInput id="t" label="Tags" value={["a", "b"]} onChange={onChange} />);
    await fireEvent.press(screen.getByRole("button", { name: "Remove a" }));
    expect(onChange).toHaveBeenCalledWith(["b"]);
  });

  it("long-press edits a chip in place", async () => {
    const onChange = jest.fn();
    await render(<TagInput id="t" label="Tags" value={["a", "b"]} onChange={onChange} />);
    await fireEvent(screen.getByLabelText("a"), "longPress");
    await fireEvent.changeText(screen.getByLabelText("Edit a"), "alpha");
    await fireEvent(screen.getByLabelText("Edit a"), "submitEditing");
    expect(onChange).toHaveBeenCalledWith(["alpha", "b"]);
  });

  it("double-tap edits a chip (KuiReact: double-click)", async () => {
    await render(<TagInput id="t" label="Tags" value={["a"]} onChange={() => {}} />);
    await fireEvent.press(screen.getByLabelText("a"));
    await fireEvent.press(screen.getByLabelText("a"));
    expect(screen.getByLabelText("Edit a")).toBeTruthy();
  });

  it("shows the edit tip only without hint/error, and the error as an alert", async () => {
    const r = await render(<TagInput id="t" label="Tags" value={["a"]} onChange={() => {}} />);
    expect(screen.getByText("Double-click a tag to edit it")).toBeTruthy();
    await r.rerender(<TagInput id="t" label="Tags" value={[]} onChange={() => {}} error="At least one tag is required." />);
    expect(screen.getByRole("alert")).toHaveTextContent("At least one tag is required.");
    expect(classNameOf(screen.getByTestId("taginput-t"))).toContain("border-error");
  });

  it("disabled: no input and no remove buttons", async () => {
    await render(<TagInput id="t" label="Tags" value={["a"]} onChange={() => {}} disabled />);
    expect(screen.queryByTestId("taginput-t-input")).toBeNull();
    expect(screen.queryByRole("button", { name: "Remove a" })).toBeNull();
  });
});
