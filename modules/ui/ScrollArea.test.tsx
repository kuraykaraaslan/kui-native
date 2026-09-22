import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders a vertical scroller by default and a horizontal one on request", async () => {
    const v = await render(<ScrollArea testID="sa"><Text>Item</Text></ScrollArea>);
    expect(v.getByTestId("sa").props.horizontal).toBeFalsy();
    const h = await render(<ScrollArea testID="sa" orientation="horizontal"><Text>Item</Text></ScrollArea>);
    expect(h.getByTestId("sa").props.horizontal).toBe(true);
  });
});
