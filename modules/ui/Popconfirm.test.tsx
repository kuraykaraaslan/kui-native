import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "./Button";
import { Popconfirm } from "./Popconfirm";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const panel = () => screen.queryByTestId("popconfirm-panel");

// Ports KuiReact's Popconfirm tests (modules/ui/Popconfirm.test.tsx). Focus
// moves are desktop keyboard behaviour; Escape → Android back, outside click
// → outside tap.
describe("Popconfirm", () => {
  it("is closed by default", async () => {
    await render(<Popconfirm trigger={<Button>Delete</Button>} title="Delete this item?" onConfirm={() => {}} />);
    expect(panel()).toBeNull();
  });

  it("opens on trigger press as a modal alert dialog", async () => {
    await render(<Popconfirm trigger={<Button>Delete</Button>} title="Delete this item?" onConfirm={() => {}} />);
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    expect(panel()?.props.role).toBe("alertdialog");
    expect(panel()?.props.accessibilityViewIsModal).toBe(true);
    expect(screen.getByText("Delete this item?")).toBeTruthy();
  });

  it("Android back closes the panel (KuiReact: Escape)", async () => {
    await render(<Popconfirm trigger={<Button>Delete</Button>} title="Delete this item?" onConfirm={() => {}} />);
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    const modal = screen.container.queryAll((n) => typeof n.props.onRequestClose === "function")[0];
    await fireEvent(modal, "requestClose");
    expect(panel()).toBeNull();
  });

  it("tapping outside the panel closes it without confirming", async () => {
    const onConfirm = jest.fn();
    await render(<Popconfirm trigger={<Button>Delete</Button>} title="Delete this item?" onConfirm={onConfirm} />);
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    await fireEvent.press(screen.getByTestId("anchored-panel-outside", { hidden: true } as never));
    expect(panel()).toBeNull();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("pressing Confirm calls onConfirm and closes", async () => {
    const onConfirm = jest.fn();
    await render(<Popconfirm trigger={<Button>Delete</Button>} title="Delete this item?" onConfirm={onConfirm} />);
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(panel()).toBeNull();
  });

  it("pressing Cancel calls onCancel and closes without confirming", async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    await render(<Popconfirm trigger={<Button>Delete</Button>} title="Delete this item?" onConfirm={onConfirm} onCancel={onCancel} />);
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
    expect(panel()).toBeNull();
  });

  it("danger: custom confirm label, description, and KuiReact's panel classes", async () => {
    await render(
      <Popconfirm
        trigger={<Button>Delete project</Button>}
        title="Delete this project?"
        description="This action cannot be undone."
        danger
        confirmLabel="Delete"
        onConfirm={() => {}}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Delete project" }));
    expect(screen.getByText("This action cannot be undone.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete" })).toBeTruthy();
    for (const c of ["w-72", "rounded-lg", "bg-surface-raised", "p-4", "shadow-xl"]) expect(classNameOf(panel() as never)).toContain(c);
  });
});
