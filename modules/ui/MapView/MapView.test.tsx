import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { combinedFill, MapView, zoomToDelta } from "./index";

// react-native-maps is native-only; render its pieces as plain host views.
jest.mock("react-native-maps", () => {
  const React = jest.requireActual("react");
  const { View } = jest.requireActual("react-native");
  const host = (name: string) => {
    const C = React.forwardRef((props: Record<string, unknown>, ref: unknown) => {
      React.useImperativeHandle(ref, () => ({ fitToCoordinates: (globalThis as { __fit?: jest.Mock }).__fit }));
      return React.createElement(View, { ...props, testID: props.testID ?? name });
    });
    C.displayName = name;
    return C;
  };
  return { __esModule: true, default: host("Maps"), Marker: host("Marker"), Callout: host("Callout"), Polygon: host("Polygon"), Polyline: host("Polyline"), UrlTile: host("UrlTile") };
});

const MARKERS = [
  { id: "ank", position: [39.93, 32.86] as [number, number], variant: "success" as const, tooltip: { title: "Ankara", fields: [{ label: "Nüfus", value: "5.7M" }] } },
  { id: "ist", position: [41.01, 28.97] as [number, number], label: "İstanbul" },
];
const ZONE = { id: "z1", positions: [[40, 32], [40, 33], [39, 33]] as [number, number][], label: "Bölge", variant: "warning" as const };
const ROUTE = { id: "r1", positions: [[39.93, 32.86], [41.01, 28.97]] as [number, number][], dashed: true };

beforeEach(() => {
  (globalThis as { __fit?: jest.Mock }).__fit = jest.fn();
});

describe("MapView helpers", () => {
  it("converts zoom to a region span and combines fill alphas", () => {
    expect(zoomToDelta(0)).toBe(360);
    expect(zoomToDelta(6)).toBeCloseTo(5.625);
    // KuiReact: #3b82f620 (alpha 0x20) × fillOpacity 0.25 → ~0x08.
    expect(combinedFill("#3b82f620", 0.25)).toBe("#3b82f608");
  });
});

describe("MapView", () => {
  it("renders markers, zones and routes with KuiReact's styling", async () => {
    await render(<MapView markers={MARKERS} zones={[ZONE]} routes={[ROUTE]} />);
    expect(screen.getByTestId("map-marker-ank").props.accessibilityLabel).toBe("Ankara");
    expect(screen.getByTestId("map-marker-ist").props.accessibilityLabel).toBe("İstanbul");
    expect(screen.getByTestId("map-zone-z1").props.strokeColor).toBe("#f59e0b");
    expect(screen.getByTestId("map-route-r1").props.lineDashPattern).toEqual([8, 6]);
    expect(screen.getByText("Nüfus")).toBeTruthy();
  });

  it("zone and route toggles hide their layers", async () => {
    await render(<MapView markers={MARKERS} zones={[ZONE]} routes={[ROUTE]} />);
    await fireEvent.press(screen.getByRole("button", { name: "Bölgeler" }));
    expect(screen.queryByTestId("map-zone-z1")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Rotalar" }));
    expect(screen.queryByTestId("map-route-r1")).toBeNull();
  });

  it("hides layer toggles when there are no zones or routes", async () => {
    await render(<MapView markers={MARKERS} />);
    expect(screen.queryByRole("button", { name: "Bölgeler" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Rotalar" })).toBeNull();
  });

  it("add mode: a map tap adds an auto marker with coordinates, then exits add mode", async () => {
    await render(<MapView />);
    await fireEvent(screen.getByTestId("map-view"), "press", { nativeEvent: { coordinate: { latitude: 40, longitude: 30 } } });
    expect(screen.queryByTestId("map-marker-auto-1")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "İşaretçi Ekle" }));
    expect(screen.getByText("Haritaya dokunarak işaretçi ekleyin")).toBeTruthy();
    await fireEvent(screen.getByTestId("map-view"), "press", { nativeEvent: { coordinate: { latitude: 40, longitude: 30 } } });
    expect(screen.getByTestId("map-marker-auto-1").props.accessibilityLabel).toBe("İşaretçi 1");
    expect(screen.getByText("40.00000")).toBeTruthy();
    expect(screen.getByRole("button", { name: "İşaretçi Ekle" })).toBeTruthy();
  });

  it("onMarkerAdd receives the position instead of adding a marker", async () => {
    const onMarkerAdd = jest.fn();
    await render(<MapView onMarkerAdd={onMarkerAdd} />);
    await fireEvent.press(screen.getByRole("button", { name: "İşaretçi Ekle" }));
    await fireEvent(screen.getByTestId("map-view"), "press", { nativeEvent: { coordinate: { latitude: 1, longitude: 2 } } });
    expect(onMarkerAdd).toHaveBeenCalledWith([1, 2]);
    expect(screen.queryByTestId("map-marker-auto-1")).toBeNull();
  });

  it("onMarkerClick receives the marker id; fitBoundsPadding fits to the markers", async () => {
    const onMarkerClick = jest.fn();
    await render(<MapView markers={MARKERS} onMarkerClick={onMarkerClick} fitBoundsPadding={40} />);
    await fireEvent.press(screen.getByTestId("map-marker-ist"));
    expect(onMarkerClick).toHaveBeenCalledWith("ist");
    await act(async () => {});
    expect((globalThis as { __fit?: jest.Mock }).__fit).toHaveBeenCalledWith(
      [{ latitude: 39.93, longitude: 32.86 }, { latitude: 41.01, longitude: 28.97 }],
      expect.objectContaining({ edgePadding: { top: 40, right: 40, bottom: 40, left: 40 } }),
    );
  });
});

