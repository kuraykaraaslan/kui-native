import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { Toaster, getEffectiveDuration, toast, useToastStore } from "./index";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

beforeEach(() => {
  useToastStore.getState().clear();
  useToastStore.getState().setMax(5);
});

describe("toast store (ported from KuiReact)", () => {
  it("getEffectiveDuration: 0 = persistent, explicit wins, else the variant default", () => {
    expect(getEffectiveDuration({ variant: "success", duration: 0 })).toBeNull();
    expect(getEffectiveDuration({ variant: "success", duration: 1234 })).toBe(1234);
    expect(getEffectiveDuration({ variant: "success" })).toBe(5000);
    expect(getEffectiveDuration({ variant: "info" })).toBe(5000);
    expect(getEffectiveDuration({ variant: "warning" })).toBe(5000);
    expect(getEffectiveDuration({ variant: "error" })).toBeNull();
    expect(getEffectiveDuration({ variant: "loading" })).toBeNull();
  });

  it("toast() defaults to info; helpers set their variant; the close button defaults on", () => {
    toast("plain");
    toast.success("ok");
    toast.error("bad");
    const [a, b, c] = useToastStore.getState().toasts;
    expect(a.variant).toBe("info");
    expect(b.variant).toBe("success");
    expect(c.variant).toBe("error");
    expect(a.closeButton).toBe(true);
  });

  it("drops the oldest toast past `max` (FIFO)", () => {
    useToastStore.getState().setMax(2);
    toast("1");
    toast("2");
    toast("3");
    expect(useToastStore.getState().toasts.map((t) => t.message)).toEqual(["2", "3"]);
  });

  it("update / dismiss / clear", () => {
    const id = toast.loading("working");
    toast.update(id, { variant: "success", message: "done" });
    expect(useToastStore.getState().toasts[0]).toMatchObject({ variant: "success", message: "done" });
    toast.dismiss(id);
    expect(useToastStore.getState().toasts).toHaveLength(0);
    toast("a");
    toast("b");
    toast.clear();
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it("promise() moves one toast loading → success (value-aware message)", async () => {
    const id = toast.promise(Promise.resolve({ name: "Report" }), {
      loading: "Loading…",
      success: (d) => `${d.name} ready.`,
      error: "Failed.",
    });
    expect(useToastStore.getState().toasts[0]).toMatchObject({ id, variant: "loading", message: "Loading…" });
    await Promise.resolve();
    await Promise.resolve();
    expect(useToastStore.getState().toasts[0]).toMatchObject({ variant: "success", message: "Report ready." });
  });

  it("promise() moves to error on rejection", async () => {
    toast.promise(Promise.reject(new Error("boom")), {
      loading: "Loading…",
      success: "ok",
      error: (e) => `Failed: ${(e as Error).message}`,
    });
    await Promise.resolve();
    await Promise.resolve();
    expect(useToastStore.getState().toasts[0]).toMatchObject({ variant: "error", message: "Failed: boom" });
  });
});

describe("<Toaster />", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("renders queued toasts with title and message", async () => {
    await render(<Toaster reducedMotion />);
    await act(async () => {
      toast.success("File uploaded.", { title: "Upload complete" });
    });
    expect(screen.getByText("Upload complete")).toBeTruthy();
    expect(screen.getByText("File uploaded.")).toBeTruthy();
  });

  it("uses KuiReact's card classes and variant tokens", async () => {
    await render(<Toaster reducedMotion />);
    let id = "";
    await act(async () => {
      id = toast.warning("Session expiring.");
    });
    const card = classNameOf(screen.getByTestId(`toast-${id}`));
    for (const c of ["rounded-xl", "border", "shadow-lg", "bg-warning-subtle", "border-warning"]) expect(card).toContain(c);
  });

  it("warning/error are alerts; success/info/loading are polite status summaries", async () => {
    await render(<Toaster reducedMotion />);
    await act(async () => {
      toast.error("Server error.");
      toast.info("Update available.");
    });
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByRole("summary")).toBeTruthy();
  });

  it("auto-dismisses after the variant duration, with a countdown bar", async () => {
    await render(<Toaster reducedMotion />);
    await act(async () => {
      toast.success("Saved.");
    });
    expect(screen.getByTestId("toast-progress")).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(5200);
    });
    expect(screen.queryByText("Saved.")).toBeNull();
  });

  it("errors are persistent (no countdown bar, no auto-dismiss)", async () => {
    await render(<Toaster reducedMotion />);
    await act(async () => {
      toast.error("Server error.");
    });
    expect(screen.queryByTestId("toast-progress")).toBeNull();
    await act(async () => {
      jest.advanceTimersByTime(20000);
    });
    expect(screen.getByText("Server error.")).toBeTruthy();
  });

  it("the Dismiss button removes the toast", async () => {
    await render(<Toaster reducedMotion />);
    await act(async () => {
      toast.error("Server error.");
    });
    await fireEvent.press(screen.getByRole("button", { name: "Dismiss" }));
    await act(async () => {
      jest.advanceTimersByTime(10);
    });
    expect(screen.queryByText("Server error.")).toBeNull();
  });

  it("closeButton: false hides the Dismiss button", async () => {
    await render(<Toaster reducedMotion />);
    await act(async () => {
      toast.error("x", { closeButton: false });
    });
    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
  });

  it("actions receive a dismiss callback; danger actions use text-error", async () => {
    const undo = jest.fn((dismiss: () => void) => dismiss());
    await render(<Toaster reducedMotion />);
    await act(async () => {
      toast.info("Item deleted.", {
        actions: [
          { label: "Undo", onPress: undo },
          { label: "Delete forever", onPress: () => {}, variant: "danger" },
        ],
      });
    });
    expect(classNameOf(screen.getByText("Delete forever"))).toContain("text-error");
    expect(classNameOf(screen.getByText("Undo"))).toContain("underline");
    await fireEvent.press(screen.getByRole("button", { name: "Undo" }));
    expect(undo).toHaveBeenCalledTimes(1);
    await act(async () => {
      jest.advanceTimersByTime(10);
    });
    expect(screen.queryByText("Item deleted.")).toBeNull();
  });

  it("per-toast position renders in its own region", async () => {
    await render(<Toaster reducedMotion />);
    await act(async () => {
      toast("bottom one", { position: "bottom-center" });
    });
    expect(screen.getByTestId("toast-region-bottom-center")).toBeTruthy();
    expect(screen.getByTestId("toast-region-top-right")).toBeTruthy();
  });
});
