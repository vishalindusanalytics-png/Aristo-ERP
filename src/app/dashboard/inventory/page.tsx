"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "item", label: "Item / GSM" },
    { key: "gsm", label: "GSM" },
    { key: "stock", label: "Stock (Kg)" },
    { key: "reorder", label: "Reorder Level" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "OK" ? "green" : v === "Low" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "item", label: "Material Item", placeholder: "e.g. Kraft Paper Roll", required: true },
    { key: "gsm", label: "GSM / Grade", placeholder: "e.g. 120", required: false },
    { key: "stock", label: "Current Stock (Kg)", type: "number" as const, placeholder: "e.g. 4200", required: true },
    { key: "reorder", label: "Reorder Alarm Level (Kg)", type: "number" as const, placeholder: "e.g. 2000", required: true },
    {
        key: "status", label: "Stock Condition", type: "select" as const,
        options: ["OK", "Low", "Critical"],
        required: true
    },
];

const initialRows = [
    { item: "Kraft Paper Roll", gsm: "120", stock: "4,200", reorder: "2,000", status: "OK" },
    { item: "Kraft Paper Roll", gsm: "100", stock: "1,100", reorder: "1,500", status: "Low" },
    { item: "Kraft Paper Roll", gsm: "80", stock: "250", reorder: "1,000", status: "Critical" },
    { item: "Kraft Paper Roll", gsm: "150", stock: "6,800", reorder: "2,500", status: "OK" },
    { item: "Twisted Paper Rope", gsm: "-", stock: "9,500", reorder: "5,000", status: "OK" },
];

export default function InventorySnapshotPage() {
    return (
        <ModulePage
            title="Inventory Live Snapshot"
            addLabel="Manual Stock Adjust"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total RM Stock", value: "13,300 Kg", color: "#3b82f6" },
                { label: "Low Stock Items", value: "2", color: "#f59e0b" },
                { label: "Critical Items", value: "1", color: "#ef4444" },
                { label: "Reorder Pending", value: "3", color: "#f97316" },
            ]}
        />
    );
}
