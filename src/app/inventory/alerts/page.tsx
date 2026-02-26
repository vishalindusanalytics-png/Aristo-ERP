"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "item", label: "Material" },
    { key: "gsm", label: "GSM" },
    { key: "current", label: "Current Stock (Kg)" },
    { key: "reorder", label: "Reorder Level" },
    { key: "shortage", label: "Shortage" },
    {
        key: "priority", label: "Priority", render: (v: string | number) => (
            <span className={`badge badge-${v === "Critical" ? "red" : v === "High" ? "orange" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Alert ID", required: true },
    { key: "item", label: "Material Name", placeholder: "e.g. Kraft Paper Roll", required: true },
    { key: "gsm", label: "GSM", type: "number" as const, placeholder: "e.g. 100", required: false },
    { key: "current", label: "Current Stock", type: "number" as const, placeholder: "e.g. 250", required: true },
    { key: "reorder", label: "Reorder Level", type: "number" as const, placeholder: "e.g. 1000", required: true },
    { key: "shortage", label: "Shortage Amount", placeholder: "e.g. -750 Kg", required: true },
    {
        key: "priority", label: "Priority", type: "select" as const,
        options: ["Critical", "High", "Medium", "Low"],
        required: true
    },
    { key: "vendorRef", label: "Preferred Vendor", placeholder: "e.g. Indas Paper Mills", required: false },
];

const initialRows = [
    { id: "ALT-001", item: "Kraft Paper Roll", gsm: "80", current: "250", reorder: "1,000", shortage: "-750 Kg", priority: "Critical" },
    { id: "ALT-002", item: "Kraft Paper Roll", gsm: "100", current: "1,100", reorder: "1,500", shortage: "-400 Kg", priority: "High" },
    { id: "ALT-003", item: "Twisted Handle Cord", gsm: "-", current: "150", reorder: "500", shortage: "-350m", priority: "High" },
];

export default function LowStockAlertPage() {
    return (
        <ModulePage
            title="Low Stock Alert"
            addLabel="Raise Purchase Order"
            idPrefix="ALT-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Critical Alerts", value: "1", color: "#ef4444" },
                { label: "High Priority", value: "2", color: "#f97316" },
                { label: "Medium Priority", value: "1", color: "#f59e0b" },
                { label: "POs Raised", value: "2", color: "#10b981" },
            ]}
        />
    );
}
