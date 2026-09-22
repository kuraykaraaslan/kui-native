import { render, screen } from "@testing-library/react-native";

import { Stepper, type StepItem } from "./Stepper";

function classNameOf(el: { props: { className?: string | string[] } }) {
  const c = el.props.className;
  return Array.isArray(c) ? c.join(" ") : c ?? "";
}

const STEPS: StepItem[] = [
  { label: "Account", description: "Personal info", state: "complete" },
  { label: "Billing", description: "Payment method", state: "active" },
  { label: "Review", state: "error" },
  { label: "Confirm" },
];

describe("Stepper", () => {
  it("labels every step circle with its number, label and state", async () => {
    await render(<Stepper steps={STEPS} />);
    expect(screen.getByLabelText("Step 1: Account — complete")).toBeTruthy();
    expect(screen.getByLabelText("Step 2: Billing — active")).toBeTruthy();
    expect(screen.getByLabelText("Step 3: Review — error")).toBeTruthy();
    expect(screen.getByLabelText("Step 4: Confirm — pending")).toBeTruthy();
  });

  it("shows numbers for active and pending steps (icons for complete and error)", async () => {
    await render(<Stepper steps={STEPS} />);
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("4")).toBeTruthy();
    expect(screen.queryByText("1")).toBeNull();
    expect(screen.queryByText("3")).toBeNull();
  });

  it("renders labels and descriptions", async () => {
    await render(<Stepper steps={STEPS} />);
    expect(screen.getByText("Billing")).toBeTruthy();
    expect(screen.getByText("Payment method")).toBeTruthy();
  });

  it("uses KuiReact's state classes", async () => {
    await render(<Stepper steps={STEPS} />);
    expect(classNameOf(screen.getByLabelText("Step 1: Account — complete"))).toContain("bg-success");
    expect(classNameOf(screen.getByLabelText("Step 2: Billing — active"))).toContain("bg-primary");
    expect(classNameOf(screen.getByLabelText("Step 3: Review — error"))).toContain("bg-error");
    expect(classNameOf(screen.getByLabelText("Step 4: Confirm — pending"))).toContain("border-border");
    expect(classNameOf(screen.getByText("Billing"))).toContain("font-semibold");
    expect(classNameOf(screen.getByText("Review"))).toContain("text-error-fg");
  });

  it("horizontal: one connector between each pair; green after a complete step", async () => {
    await render(<Stepper steps={STEPS} />);
    const connectors = screen.getAllByTestId("stepper-connector");
    expect(connectors).toHaveLength(3);
    expect(classNameOf(connectors[0])).toContain("bg-success");
    expect(classNameOf(connectors[1])).toContain("bg-border");
  });

  it("vertical: renders every step with its description", async () => {
    await render(
      <Stepper
        orientation="vertical"
        steps={[
          { label: "Create account", description: "Enter your email and password", state: "complete" },
          { label: "Verify email", state: "error" },
        ]}
      />,
    );
    expect(screen.getByText("Enter your email and password")).toBeTruthy();
    expect(classNameOf(screen.getByText("Create account"))).toContain("text-sm");
  });
});
