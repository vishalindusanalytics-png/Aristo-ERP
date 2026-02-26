"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Plate ID" },
    { key: "designName", label: "Design Name" },
    { key: "customer", label: "Customer" },
    { key: "colors", label: "Colors" },
    { key: "size", label: "Plate Size" },
    { key: "createdOn", label: "Created On" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : v === "Retired" ? "gray" : "blue"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Plate ID", required: true },
    { key: "designName", label: "Design/Artwork Name", placeholder: "e.g. TechCorp Logo v2", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "colors", label: "Number of Colors", type: "select" as const, options: ["1-color", "2-color", "3-color", "4-color", "5-color", "6-color"], required: true },
    { key: "size", label: "Plate Dimensions", placeholder: "e.g. 12×10 cm", required: true },
    { key: "createdOn", label: "Created Date", type: "date" as const, required: true },
    {
        key: "status", label: "Current Status", type: "select" as const,
        options: ["New", "Active", "Reserved", "Retired"],
        required: true
    },
    { key: "notes", label: "Design Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "PL-0041", designName: "TechCorp Logo v2", customer: "TechCorp Global", colors: "4-color", size: "12×10 cm", createdOn: "2026-01-15", status: "Active" },
    { id: "PL-0042", designName: "Green Mart Pattern", customer: "Green Mart Retail", colors: "2-color", size: "8×8 cm", createdOn: "2026-01-20", status: "Active" },
    { id: "PL-0038", designName: "Luxe Foil Print", customer: "Luxe Boutique", colors: "5-color", size: "15×12 cm", createdOn: "2025-12-10", status: "Retired" },
    { id: "PL-0043", designName: "Daily Fresh v3", customer: "Daily Fresh", colors: "3-color", size: "8×6 cm", createdOn: "2026-02-22", status: "New" },
];

export default function PlateMasterPage() {
    return (
        <ModulePage
            title="Plate Master"
            addLabel="New Plate"
            idPrefix="PL-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Plates", value: "28", color: "#3b82f6" },
                { label: "Active", value: "22", color: "#10b981" },
                { label: "Retired", value: "6", color: "#64748b" },
                { label: "New This Month", value: "3", color: "#f97316" }
            ]}
        />
    );
}
