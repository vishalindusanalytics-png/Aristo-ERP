"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Plate ID" },
    { key: "design", label: "Design" },
    { key: "totalUses", label: "Total Uses" },
    { key: "lastUsed", label: "Last Used" },
    { key: "condition", label: "Condition" },
    { key: "location", label: "Storage Location" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Good" ? "green" : v === "Worn" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Plate Reference", required: true },
    { key: "design", label: "Design Name", required: true },
    { key: "totalUses", label: "Total Cycles", type: "number" as const, placeholder: "e.g. 18", required: true },
    { key: "lastUsed", label: "Last Used Date", type: "date" as const, required: true },
    {
        key: "condition", label: "Physical Condition", type: "select" as const,
        options: ["New", "Good", "Fair", "Worn", "Damaged"],
        required: true
    },
    { key: "location", label: "Storage Bin / Rack", placeholder: "e.g. Cabinet A-1", required: true },
    {
        key: "status", label: "System Status", type: "select" as const,
        options: ["Good", "Worn", "Damaged"],
        required: true
    },
    { key: "maintenanceNotes", label: "Maintenance Log", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "PL-0041", design: "TechCorp Logo v2", totalUses: "18", lastUsed: "2026-02-24", condition: "Good", location: "Cabinet A-1", status: "Good" },
    { id: "PL-0042", design: "Green Mart Pattern", totalUses: "11", lastUsed: "2026-02-22", condition: "Good", location: "Cabinet A-2", status: "Good" },
    { id: "PL-0036", design: "Old EcoFresh v1", totalUses: "42", lastUsed: "2025-11-30", condition: "Worn", location: "Cabinet B-1", status: "Worn" },
    { id: "PL-0029", design: "BagMart Classic", totalUses: "65", lastUsed: "2025-09-15", condition: "Damaged", location: "Disposal Shelf", status: "Damaged" },
];

export default function PlateInventoryPage() {
    return (
        <ModulePage
            title="Plate Inventory"
            addLabel="Update Plate Info"
            idPrefix="PL-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Plates", value: "28", color: "#3b82f6" },
                { label: "Good Condition", value: "19", color: "#10b981" },
                { label: "Worn", value: "6", color: "#f59e0b" },
                { label: "Damaged", value: "3", color: "#ef4444" }
            ]}
        />
    );
}
