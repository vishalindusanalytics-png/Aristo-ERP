"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Size ID" },
    { key: "length", label: "Length (cm)" },
    { key: "width", label: "Width (cm)" },
    { key: "height", label: "Height (cm)" },
    { key: "category", label: "Category" },
    { key: "rmConsumption", label: "RM/1000 Pcs (Kg)" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Size ID", required: true },
    { key: "length", label: "Length (cm)", type: "number" as const, required: true },
    { key: "width", label: "Width / Gusset (cm)", type: "number" as const, required: true },
    { key: "height", label: "Height / Depth (cm)", type: "number" as const, required: true },
    {
        key: "category", label: "Bag Category", type: "select" as const,
        options: ["SOS", "Flat Handle", "Twisted Handle", "V-Bottom", "Satchel"],
        required: true
    },
    { key: "rmConsumption", label: "RM Consumption (Kg/1000 Pcs)", type: "number" as const, placeholder: "e.g. 48", required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Active", "Inactive", "On Hold"],
        required: true
    },
    { key: "description", label: "Size Description", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "BS-001", length: "30", width: "10", height: "25", category: "SOS", rmConsumption: "48", status: "Active" },
    { id: "BS-002", length: "20", width: "8", height: "30", category: "Flat Handle", rmConsumption: "36", status: "Active" },
    { id: "BS-003", length: "38", width: "13", height: "38", category: "Twisted Handle", rmConsumption: "72", status: "Active" },
    { id: "BS-004", length: "20", width: "5", height: "25", category: "SOS", rmConsumption: "28", status: "Active" },
    { id: "BS-005", length: "45", width: "15", height: "40", category: "SOS", rmConsumption: "96", status: "Inactive" },
];

export default function BagSizeMasterPage() {
    return (
        <ModulePage
            title="Bag Size Master"
            addLabel="Add Bag Size"
            idPrefix="BS-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Sizes", value: "12", color: "#3b82f6" },
                { label: "Active", value: "10", color: "#10b981" },
                { label: "SOS Category", value: "6", color: "#f97316" },
                { label: "Custom Sizes", value: "4", color: "#f59e0b" }
            ]}
        />
    );
}
