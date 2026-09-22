import { act, fireEvent, render, screen } from "@testing-library/react-native";
import * as Clipboard from "expo-clipboard";

import { parseColor } from "./color/parse";
import { formatRgbaAs } from "./hooks/useColorState";
import { ColorPicker, normalizeHex } from "./index";
import { hueToHex } from "./parts/HueStrip";

jest.mock("expo-clipboard", () => ({ setStringAsync: jest.fn().mockResolvedValue(true) }));

const trigger = () => screen.getByTestId("cp");
const open = () => fireEvent.press(trigger());

describe("colour maths (ported from KuiReact)", () => {
  it("normalizes hex shorthands", () => {
    expect(normalizeHex("abc")).toBe("#aabbcc");
    expect(normalizeHex("#3B82F6")).toBe("#3b82f6");
    expect(normalizeHex("nope")).toBeNull();
  });

  it("round-trips a colour through every format", () => {
    const blue = parseColor("#3b82f6")!;
    expect(formatRgbaAs(blue, "hex")).toBe("#3b82f6");
    for (const f of ["rgba", "hsla", "hwb", "oklch"] as const) {
      expect(formatRgbaAs(parseColor(formatRgbaAs(blue, f))!, "hex")).toBe("#3b82f6");
    }
  });

  it("maps hues to fully saturated colours", () => {
    expect(hueToHex(0)).toBe("#ff0000");
    expect(hueToHex(120)).toBe("#00ff00");
    expect(hueToHex(240)).toBe("#0000ff");
  });
});

describe("ColorPicker", () => {
  it("shows the current value on the trigger", async () => {
    const r = await render(<ColorPicker id="cp" value="#3b82f6" onChange={() => {}} />);
    expect(screen.getByText("#3b82f6")).toBeTruthy();
    await r.rerender(<ColorPicker id="cp" value={null} onChange={() => {}} />);
    expect(screen.getByText("none")).toBeTruthy();
  });

  it("picking a swatch emits it and closes the popover", async () => {
    const onChange = jest.fn();
    await render(<ColorPicker id="cp" value="#3b82f6" onChange={onChange} />);
    await open();
    expect(screen.getByRole("button", { name: "Color #3b82f6" }).props.accessibilityState.selected).toBe(true);
    await fireEvent.press(screen.getByRole("button", { name: "Color #ef4444" }));
    expect(onChange).toHaveBeenCalledWith("#ef4444");
    expect(screen.queryByTestId("color-picker-panel")).toBeNull();
  });

  it("the hex field commits a normalized value", async () => {
    const onChange = jest.fn();
    await render(<ColorPicker id="cp" value="#000000" onChange={onChange} />);
    await open();
    await fireEvent.changeText(screen.getByLabelText("Hex color"), "0f0");
    await fireEvent(screen.getByLabelText("Hex color"), "submitEditing");
    expect(onChange).toHaveBeenCalledWith("#00ff00");
  });

  it("no-colour emits null", async () => {
    const onChange = jest.fn();
    await render(<ColorPicker id="cp" value="#3b82f6" onChange={onChange} showNoColor />);
    await open();
    await fireEvent.press(screen.getByRole("button", { name: "No color" }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("the native-picker button toggles the hue strip", async () => {
    await render(<ColorPicker id="cp" value="#3b82f6" onChange={() => {}} />);
    await open();
    expect(screen.queryByTestId("color-hue-strip")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Native color picker" }));
    expect(screen.getByTestId("color-hue-strip")).toBeTruthy();
  });

  it("format switcher re-emits the colour in the new format and copies it", async () => {
    const onChange = jest.fn();
    await render(<ColorPicker id="cp" value="#3b82f6" onChange={onChange} showFormatSwitcher />);
    await open();
    await fireEvent.press(screen.getByRole("tab", { name: "RGBA" }));
    expect(onChange).toHaveBeenLastCalledWith(formatRgbaAs(parseColor("#3b82f6")!, "rgba"));
    await act(async () => {
      fireEvent.press(screen.getByRole("button", { name: "Copy value" }));
    });
    expect(Clipboard.setStringAsync).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Copied" })).toBeTruthy();
  });

  it("disabled does not open", async () => {
    await render(<ColorPicker id="cp" value="#3b82f6" onChange={() => {}} disabled />);
    await open();
    expect(screen.queryByTestId("color-picker-panel")).toBeNull();
  });
});
