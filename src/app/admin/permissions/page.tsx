"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "module", label: "Module" },
    { key: "action", label: "Action" },
    {
        key: "admin", label: "Super Admin", render: (v: string | number) => (
            <span className={`badge badge-${v === "✓" ? "green" : "red"}`}>{v}</span>
        )
    },
    {
        key: "prodMgr", label: "Prod. Manager", render: (v: string | number) => (
            <span className={`badge badge-${v === "✓" ? "green" : "gray"}`}>{v}</span>
        )
    },
    {
        key: "salesExec", label: "Sales Exec", render: (v: string | number) => (
            <span className={`badge badge-${v === "✓" ? "green" : "gray"}`}>{v}</span>
        )
    },
    {
        key: "operator", label: "Operator", render: (v: string | number) => (
            <span className={`badge badge-${v === "✓" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    {
        key: "module", label: "System Module", type: "select" as const,
        options: ["Dashboard", "Sales & Orders", "Production Planning", "Inventory", "Production Execution", "Quality Control", "Packing & Dispatch", "Printing", "Finance", "Masters", "Admin"],
        required: true
    },
    { key: "action", label: "Restricted Action", placeholder: "e.g. Delete Record", required: true },
    { key: "admin", label: "Super Admin Access", type: "select" as const, options: ["✓", "✗"], required: true },
    { key: "prodMgr", label: "Prod. Manager Access", type: "select" as const, options: ["✓", "✗"], required: true },
    { key: "salesExec", label: "Sales Exec Access", type: "select" as const, options: ["✓", "✗"], required: true },
    { key: "operator", label: "Operator Access", type: "select" as const, options: ["✓", "✗"], required: true },
];

const initialRows = [
    { module: "Sales & Orders", action: "View", admin: "✓", prodMgr: "✓", salesExec: "✓", operator: "✗" },
    { module: "Sales & Orders", action: "Create / Edit", admin: "✓", prodMgr: "✗", salesExec: "✓", operator: "✗" },
    { module: "Sales & Orders", action: "Delete", admin: "✓", prodMgr: "✗", salesExec: "✗", operator: "✗" },
    { module: "Production Execution", action: "View", admin: "✓", prodMgr: "✓", salesExec: "✗", operator: "✓" },
    { module: "Production Execution", action: "Create Entry", admin: "✓", prodMgr: "✓", salesExec: "✗", operator: "✓" },
    { module: "Finance", action: "View", admin: "✓", prodMgr: "✗", salesExec: "✗", operator: "✗" },
    { module: "Finance", action: "Create Invoice", admin: "✓", prodMgr: "✗", salesExec: "✗", operator: "✗" },
    { module: "Masters", action: "Configure", admin: "✓", prodMgr: "✗", salesExec: "✗", operator: "✗" },
];

export default function PermissionControlPage() {
    return (
        <ModulePage
            title="Permission Rules"
            addLabel="New Rule"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Permissions", value: "180", color: "#3b82f6" },
                { label: "Modules Covered", value: "12", color: "#10b981" },
                { label: "Restricted Access", value: "48", color: "#f97316" },
                { label: "Last Updated", value: "Today", color: "#f59e0b" }
            ]}
        />
    );
}
