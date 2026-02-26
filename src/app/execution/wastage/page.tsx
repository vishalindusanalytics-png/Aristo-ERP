"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Wastage ID" },
    { key: "batchId", label: "Batch" },
    { key: "machine", label: "Machine" },
    { key: "type", label: "Wastage Type" },
    { key: "qty", label: "Qty (Kg)" },
    { key: "percent", label: "% of Input" },
    { key: "date", label: "Date" },
];

const fields = [
    { key: "id", label: "Wastage ID", required: true },
    { key: "batchId", label: "Batch Reference", placeholder: "e.g. BT-0881", required: true },
    {
        key: "machine", label: "Machine", type: "select" as const,
        options: ["M-01", "M-02", "M-03", "M-04", "M-05", "M-06"],
        required: true
    },
    {
        key: "type", label: "Wastage Type", type: "select" as const,
        options: ["Trim Waste", "Startup Waste", "Spoilage", "Setup Waste", "Machine Breakage", "Operator Error"],
        required: true
    },
    { key: "qty", label: "Quantity (Kg)", type: "number" as const, placeholder: "e.g. 22.4", required: true },
    { key: "percent", label: "% of Input", placeholder: "e.g. 4.7%", required: false },
    { key: "date", label: "Date", type: "date" as const, required: true },
    { key: "remarks", label: "Remarks", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "WS-0221", batchId: "BT-0881", machine: "M-01", type: "Trim Waste", qty: "22.4", percent: "4.7%", date: "2026-02-26" },
    { id: "WS-0222", batchId: "BT-0881", machine: "M-02", type: "Startup Waste", qty: "8.1", percent: "2.2%", date: "2026-02-26" },
    { id: "WS-0220", batchId: "BT-0880", machine: "M-04", type: "Spoilage", qty: "14.6", percent: "1.8%", date: "2026-02-25" },
];

export default function WastageEntryPage() {
    return (
        <ModulePage
            title="Wastage Entry"
            addLabel="Log Wastage"
            idPrefix="WS-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Wastage Today", value: "30.5 Kg", color: "#ef4444" },
                { label: "Wastage %", value: "2.84%", color: "#f97316" },
                { label: "Trim Waste", value: "22.4 Kg", color: "#f59e0b" },
                { label: "Spoilage", value: "8.1 Kg", color: "#64748b" }
            ]}
        />
    );
}
