import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { releaseStep, Slider } from "./Slider";

const SLIDES = [<Text key="a">Slide A</Text>, <Text key="b">Slide B</Text>, <Text key="c">Slide C</Text>];
const activeDot = () => screen.getAllByRole("tab").findIndex((d) => d.props.accessibilityState.selected);

describe("releaseStep (KuiReact useDrag release logic)", () => {
  it("snaps back below the threshold without a flick", () => {
    expect(releaseStep(-30, -0.1, 50)).toBe(0);
  });
  it("moves one slide past the threshold, in the drag direction", () => {
    expect(releaseStep(-80, -0.2, 50)).toBe(1);
    expect(releaseStep(80, 0.2, 50)).toBe(-1);
  });
  it("adds a slide per 0.5 px/ms of flick velocity", () => {
    expect(releaseStep(-80, -1.1, 50)).toBe(3);
  });
  it("a strong flick alone moves", () => {
    expect(releaseStep(-20, -0.6, 50)).toBe(1);
  });
});

describe("Slider", () => {
  it("renders nothing without slides", async () => {
    const { toJSON } = await render(<Slider slides={[]} />);
    expect(toJSON()).toBeNull();
  });

  it("renders slides, arrows and dots, first slide active", async () => {
    await render(<Slider slides={SLIDES} />);
    expect(screen.getByLabelText("Content slider")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeTruthy();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(activeDot()).toBe(0);
  });

  it("arrows and dots navigate; loop wraps around", async () => {
    jest.useFakeTimers();
    await render(<Slider slides={SLIDES} />);
    await fireEvent.press(screen.getByRole("button", { name: "Next slide" }));
    expect(activeDot()).toBe(1);
    await act(async () => {
      jest.advanceTimersByTime(400);
    });
    await fireEvent.press(screen.getByRole("tab", { name: "Go to slide 3" }));
    expect(activeDot()).toBe(2);
    await act(async () => {
      jest.advanceTimersByTime(400);
    });
    await fireEvent.press(screen.getByRole("button", { name: "Next slide" }));
    expect(activeDot()).toBe(0);
    jest.useRealTimers();
  });

  it("without loop, the arrows hide at the ends", async () => {
    await render(<Slider slides={SLIDES} loop={false} />);
    expect(screen.queryByRole("button", { name: "Previous slide" })).toBeNull();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeTruthy();
  });

  it("showArrows / showDots can be turned off", async () => {
    await render(<Slider slides={SLIDES} showArrows={false} showDots={false} />);
    expect(screen.queryByRole("button", { name: "Next slide" })).toBeNull();
    expect(screen.queryAllByRole("tab")).toHaveLength(0);
  });

  it("autoPlay advances on the interval", async () => {
    jest.useFakeTimers();
    await render(<Slider slides={SLIDES} autoPlay autoPlayInterval={1000} />);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(activeDot()).toBe(1);
    jest.useRealTimers();
  });

  it("hides inactive slides from screen readers", async () => {
    await render(<Slider slides={SLIDES} />);
    expect(screen.getByLabelText("Slide 2 of 3", { hidden: true } as never).props.accessibilityElementsHidden).toBe(true);
    expect(screen.getByLabelText("Slide 1 of 3").props.accessibilityElementsHidden).toBe(false);
  });
});
