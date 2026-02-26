"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Load Sheet ID" },
    { key: "container", label: "Container" },
    { key: "customer", label: "Customer" },
    { key: "cartons", label: "Cartons" },
    { key: "grossWeight", label: "Gross Wt (Kg)" },
    { key: "generatedOn", label: "Generated On" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Final" ? "green" : v === "Draft" ? "gray" : "blue"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Load Sheet ID", required: true },
    { key: "container", label: "Container ID", placeholder: "e.g. CNT-4401", required: true },
    { key: "customer", label: "Primary Customer", placeholder: "e.g. TechCorp", required: true },
    { key: "description", label: "Cargo Description", placeholder: "e.g. 100% SOS Paper Bags", required: true },
    { key: "cartons", label: "Number of Cartons", type: "number" as const, placeholder: "e.g. 64", required: true },
    { key: "grossWeight", label: "Gross Weight (Kg)", type: "number" as const, placeholder: "e.g. 1920", required: true },
    { key: "generatedOn", label: "Generated Date", type: "date" as const, required: true },
    {
        key: "status", label: "Sheet Status", type: "select" as const,
        options: ["Draft", "Under Review", "Final", "Cancelled"],
        required: true
    },
    { key: "notes", label: "Loading Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "LS-0441", container: "CNT-4401", customer: "TechCorp & Luxe", cartons: "64", grossWeight: "1,920", generatedOn: "2026-02-26", status: "Final" },
    { id: "LS-0440", container: "CNT-4400", customer: "Green Mart", cartons: "48", grossWeight: "1,344", generatedOn: "2026-02-24", status: "Final" },
    { id: "LS-0442", container: "CNT-4402", customer: "Green Mart", cartons: "20", grossWeight: "560", generatedOn: "2026-02-26", status: "Draft" },
];

export default function LoadSheetPage() {
    return (
        <ModulePage
            title="Load Sheet"
            addLabel="Generate Load Sheet"
            idPrefix="LS-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Generated This Month", value: "6", color: "#3b82f6" },
                { label: "Finalized", value: "5", color: "#10b981" },
                { label: "Total Cartons", value: "208", color: "#f97316" },
                { label: "Gross Weight", value: "5.8T", color: "#f59e0b" }
            ]}
        />
    );
}
