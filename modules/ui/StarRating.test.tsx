import { fireEvent, render, screen } from "@testing-library/react-native";

import { StarRating } from "./StarRating";

describe("StarRating", () => {
  it("readonly: one image labelled with the value, with full/half/empty stars", async () => {
    await render(<StarRating value={3.5} />);
    expect(screen.getByLabelText("3.5 out of 5 stars")).toBeTruthy();
    expect(screen.getAllByTestId("star-full", { hidden: true } as never)).toHaveLength(3);
    expect(screen.getAllByTestId("star-half", { hidden: true } as never)).toHaveLength(1);
    expect(screen.getAllByTestId("star-empty", { hidden: true } as never)).toHaveLength(1);
  });

  it("clamps out-of-range values and honours an aria-label override", async () => {
    await render(<StarRating value={9} aria-label="Top rated" />);
    expect(screen.getByLabelText("Top rated")).toBeTruthy();
    expect(screen.getAllByTestId("star-full", { hidden: true } as never)).toHaveLength(5);
  });

  it("renders the caption", async () => {
    await render(<StarRating value={4.7} caption="(312 reviews)" />);
    expect(screen.getByText("(312 reviews)")).toBeTruthy();
  });

  it("interactive: a radio per star; pressing one calls onChange with its value", async () => {
    const onChange = jest.fn();
    await render(<StarRating value={2} readonly={false} onChange={onChange} aria-label="Pick a rating" />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(5);
    expect(screen.getByRole("radio", { name: "2 stars" }).props.accessibilityState.checked).toBe(true);
    await fireEvent.press(screen.getByRole("radio", { name: "4 stars" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("stays presentational when readonly is false but onChange is missing", async () => {
    await render(<StarRating value={2} readonly={false} />);
    expect(screen.queryAllByRole("radio")).toHaveLength(0);
  });
});
