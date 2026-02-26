"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Ink Entry ID" },
    { key: "color", label: "Ink Color" },
    { key: "vendor", label: "Vendor" },
    { key: "stockKg", label: "Stock (Kg)" },
    { key: "usedKg", label: "Used Today (Kg)" },
    { key: "reorderLevel", label: "Reorder Level" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "OK" ? "green" : v === "Low" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Ink Entry ID", required: true },
    { key: "color", label: "Color Name / Pantone", placeholder: "e.g. Black (Pantone 419)", required: true },
    { key: "vendor", label: "Ink Vendor", placeholder: "e.g. Sun Chemical", required: true },
    { key: "stockKg", label: "Current Stock (Kg)", type: "number" as const, placeholder: "e.g. 28", required: true },
    { key: "usedKg", label: "Usage Today (Kg)", type: "number" as const, placeholder: "e.g. 2.4", required: false },
    { key: "reorderLevel", label: "Reorder Threshold (Kg)", type: "number" as const, placeholder: "e.g. 10", required: true },
    {
        key: "status", label: "Stock Indicator", type: "select" as const,
        options: ["OK", "Low", "Critical"],
        required: true
    },
    { key: "lastPurchase", label: "Last Purchase Date", type: "date" as const, required: false },
];

const initialRows = [
    { id: "INK-001", color: "Black (Pantone 419)", vendor: "Sun Chemical", stockKg: "28", usedKg: "2.4", reorderLevel: "10", status: "OK" },
    { id: "INK-002", color: "Process Blue (C)", vendor: "Sun Chemical", stockKg: "8", usedKg: "1.2", reorderLevel: "10", status: "Low" },
    { id: "INK-003", color: "Red (Pantone 485)", vendor: "Flint Group", stockKg: "15", usedKg: "0.8", reorderLevel: "5", status: "OK" },
    { id: "INK-004", color: "Green (Pantone 348)", vendor: "Flint Group", stockKg: "4", usedKg: "0.4", reorderLevel: "8", status: "Critical" },
];

export default function InkEntryPage() {
    return (
        <ModulePage
            title="Ink Entry"
            addLabel="Log Ink Usage"
            idPrefix="INK-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Ink Stock", value: "55 Kg", color: "#3b82f6" },
                { label: "Used Today", value: "4.8 Kg", color: "#f97316" },
                { label: "Low Stock", value: "1", color: "#f59e0b" },
                { label: "Critical", value: "1", color: "#ef4444" }
            ]}
        />
    );
}
