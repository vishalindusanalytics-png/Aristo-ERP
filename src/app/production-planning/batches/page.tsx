"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "batchId", label: "Batch ID" },
    { key: "orderId", label: "Order ID" },
    { key: "bagSpec", label: "Bag Spec" },
    { key: "plannedQty", label: "Planned Qty" },
    { key: "rmRequired", label: "RM Required (Kg)" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Released" ? "green" : v === "Draft" ? "gray" : "blue"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "batchId", label: "Batch ID", required: true },
    { key: "orderId", label: "Parent Order ID", placeholder: "e.g. SO-2401", required: true },
    { key: "bagSpec", label: "Bag Specifications", placeholder: "e.g. SOS 12×4×10 120GSM", required: true },
    { key: "plannedQty", label: "Planned Quantity (Pcs)", type: "number" as const, placeholder: "e.g. 10000", required: true },
    { key: "rmRequired", label: "RM Required (Kg)", type: "number" as const, placeholder: "e.g. 480", required: true },
    {
        key: "status", label: "Batch Status", type: "select" as const,
        options: ["Draft", "Planned", "Ready", "Released", "Cancelled"],
        required: true
    },
    { key: "notes", label: "Planning Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { batchId: "BT-0881", orderId: "SO-2401", bagSpec: "SOS 12×4×10 120GSM", plannedQty: "10,000", rmRequired: "480", status: "Released" },
    { batchId: "BT-0882", orderId: "SO-2402", bagSpec: "Flat 8×3×12 100GSM", plannedQty: "5,000", rmRequired: "180", status: "Planned" },
    { batchId: "BT-0883", orderId: "SO-2403", bagSpec: "SOS 8×2×10 80GSM", plannedQty: "50,000", rmRequired: "1,200", status: "Draft" },
];

export default function BatchPlanningPage() {
    return (
        <ModulePage
            title="Batch Planning"
            addLabel="Create Batch"
            idPrefix="BT-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Active Batches", value: "6", color: "#3b82f6" },
                { label: "Released", value: "4", color: "#10b981" },
                { label: "Draft", value: "2", color: "#64748b" },
                { label: "RM Allocated", value: "1,860 Kg", color: "#f97316" },
            ]}
        />
    );
}
