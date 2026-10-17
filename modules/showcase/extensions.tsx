import { useState } from "react";
import { View } from "react-native";

import {
  Button,
  DataTable,
  DropdownMenu,
  TabGroup,
  Text,
  UnavailableContribution,
  UNAVAILABLE_REASON_IDS,
  type DataTableRowAction,
  type UnavailableContributionSize,
  type UnavailableReason,
} from "@/modules/ui";

// Demos for the extension surfaces (next-boilerplate phase 37): mirror KuiReact's showcase
// variants of UnavailableContribution, TabGroup (isolate + order), DropdownMenu (contributed
// items) and DataTable (rowActions), same titles and copy.

const ACTIONS: Partial<Record<UnavailableReason, { label: string }>> = {
  disabled: { label: "Enable" },
  unentitled: { label: "Upgrade" },
  quarantined: { label: "Retry" },
  failed: { label: "Retry" },
};

export function UnavailableSizesDemo({ size }: { size: UnavailableContributionSize }) {
  const reasons: UnavailableReason[] = size === "inline" ? UNAVAILABLE_REASON_IDS : ["disabled", "unentitled", "quarantined", "failed"];
  return (
    <View className={size === "inline" ? "flex-row flex-wrap gap-3" : "w-full gap-3"}>
      {reasons.map((reason) => (
        <UnavailableContribution
          key={reason}
          reason={reason}
          size={size}
          title={size === "node" ? "Product carousel" : undefined}
          action={size === "inline" ? undefined : ACTIONS[reason]}
        />
      ))}
    </View>
  );
}

export function UnavailableTabDemo() {
  return <UnavailableContribution reason="no-access" size="tab" />;
}

function BrokenCallLog(): React.ReactNode {
  throw new Error("telephony is unreachable");
}

export function IsolatedTabsDemo() {
  const [reports, setReports] = useState<string[]>([]);
  return (
    <View className="w-full gap-2">
      <TabGroup
        label="Contact"
        isolate
        onTabError={(tabId, error) => setReports((r) => [...r, `${tabId}: ${error.message}`])}
        tabs={[
          // Contributed tabs carry an order; the host's own tabs (no order) count as 0 and stay first.
          { id: "calls", label: "Calls", order: 20, lazy: true, content: <BrokenCallLog /> },
          { id: "overview", label: "Overview", content: <Text variant="bodySm">Host tab: contact details.</Text> },
          { id: "tasks", label: "Tasks", order: 10, lazy: true, content: <Text variant="bodySm">Contributed by the tasks module.</Text> },
        ]}
      />
      <Text className="text-xs text-text-disabled">Reported: {reports.length ? reports.join(", ") : "nothing yet (open Calls)"}</Text>
      <Button size="xs" variant="ghost" className="self-start" onPress={() => setReports([])}>
        Clear log
      </Button>
    </View>
  );
}

export function ContributedMenuDemo() {
  return (
    <DropdownMenu
      trigger={<Button variant="outline" size="sm">Contact ▾</Button>}
      items={[
        { id: "delete", label: "Delete", group: "danger", order: 1000, danger: true },
        { id: "edit", label: "Edit", group: "record", order: 10 },
        { id: "call", label: "Call", group: "contact", order: 20 },
        { id: "sign", label: "Send for signature", group: "contact", order: 30, disabled: true, disabledReason: "Add an email address first" },
        { id: "campaign", label: "Add to campaign", group: "contact", order: 40, hidden: true },
      ]}
    />
  );
}

type Company = { id: string; name: string; email: string; status: string; [key: string]: unknown };

const COMPANIES: Company[] = [
  { id: "c1", name: "Northwind Traders", email: "buy@northwind.example", status: "Active" },
  { id: "c2", name: "Contoso Ltd", email: "", status: "Active" },
  { id: "c3", name: "Fabrikam", email: "info@fabrikam.example", status: "Archived" },
];

export function RowActionsDemo() {
  const [log, setLog] = useState("Nothing run yet");
  const actions: DataTableRowAction<Company>[] = [
    { id: "open", label: "Open", onPress: (row) => setLog(`Open ${row.name}`) },
    { id: "call", label: "Call", group: "contact", order: 10, onPress: (row) => setLog(`Call ${row.name}`) },
    {
      id: "sign",
      label: "Send for signature",
      group: "contact",
      order: 20,
      disabled: (row) => !row.email,
      disabledReason: (row) => (row.email ? undefined : "Add an email address first"),
      onPress: (row) => setLog(`Send ${row.name} for signature`),
    },
    { id: "restore", label: "Restore", hidden: (row) => row.status !== "Archived", onPress: (row) => setLog(`Restore ${row.name}`) },
    { id: "delete", label: "Delete", group: "danger", order: 1000, destructive: true, onPress: (row) => setLog(`Delete ${row.name}`) },
  ];
  return (
    <View className="w-full gap-2">
      <DataTable<Company>
        caption="Companies"
        mode="static"
        searchable={false}
        rows={COMPANIES}
        rowActions={actions}
        rowActionsLabel={(row) => `Actions for ${row.name}`}
        columns={[
          { key: "name", header: "Company" },
          { key: "email", header: "Email", render: (r) => r.email || "—" },
          { key: "status", header: "Status" },
        ]}
      />
      <Text className="text-xs text-text-secondary">{log}</Text>
    </View>
  );
}
