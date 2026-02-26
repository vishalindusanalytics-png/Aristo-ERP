"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Handle ID" },
    { key: "type", label: "Handle Type" },
    { key: "material", label: "Material" },
    { key: "diameter", label: "Dia (mm)" },
    { key: "length", label: "Length (cm)" },
    { key: "costPer1000", label: "Cost / 1000 Pcs" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Handle ID", required: true },
    {
        key: "type", label: "Handle Type Name", type: "select" as const,
        options: ["Twisted Paper Rope", "Flat Paper Ribbon", "Cotton Cord", "Nylon Rope", "Die-Cut", "External Rigid"],
        required: true
    },
    {
        key: "material", label: "Primary Material", type: "select" as const,
        options: ["Paper", "Cotton", "Synthetic", "Bioplastic"],
        required: true
    },
    { key: "diameter", label: "Diameter (mm)", type: "number" as const, placeholder: "e.g. 4", required: false },
    { key: "length", label: "Total Length (cm)", type: "number" as const, placeholder: "e.g. 40", required: true },
    { key: "costPer1000", label: "Cost per 1000 Pcs (₹)", type: "number" as const, placeholder: "e.g. 1200", required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Active", "Inactive"],
        required: true
    },
    { key: "color", label: "Standard Color", placeholder: "e.g. Brown / White / Custom", required: false },
];

const initialRows = [
    { id: "HT-001", type: "Twisted Paper Rope", material: "Paper", diameter: "4", length: "40", costPer1000: "1,200", status: "Active" },
    { id: "HT-002", type: "Flat Paper Ribbon", material: "Paper", diameter: "0", length: "50", costPer1000: "800", status: "Active" },
    { id: "HT-003", type: "Cotton Cord", material: "Cotton", diameter: "6", length: "45", costPer1000: "2,400", status: "Active" },
    { id: "HT-004", type: "Nylon Rope", material: "Synthetic", diameter: "5", length: "40", costPer1000: "1,800", status: "Inactive" },
];

export default function HandleTypeMasterPage() {
    return (
        <ModulePage
            title="Handle Type Master"
            addLabel="Add Handle Type"
            idPrefix="HT-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Handle Types", value: "4", color: "#3b82f6" },
                { label: "Active", value: "3", color: "#10b981" },
                { label: "Most Used", value: "Twisted", color: "#f97316" },
                { label: "Cost Range", value: "₹800-₹2,400", color: "#f59e0b" }
            ]}
        />
    );
}
