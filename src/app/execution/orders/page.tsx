"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "PO ID" },
    { key: "batch", label: "Batch" },
    { key: "machine", label: "Machine" },
    { key: "qty", label: "Qty (Pcs)" },
    { key: "startDate", label: "Start Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "In Progress" ? "orange" : v === "Completed" ? "green" : "blue"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Production Order ID", required: true },
    { key: "batch", label: "Batch Number", placeholder: "e.g. BT-0881", required: true },
    { key: "soRef", label: "Sales Order Ref", placeholder: "e.g. SO-2401", required: true },
    {
        key: "machine", label: "Machine", type: "select" as const,
        options: ["M-01 HighSpeed SOS", "M-02 SOS Line-B", "M-03 Twisted Handle", "M-04 Corrugator A", "M-06 Auto Gluer"],
        required: true
    },
    { key: "qty", label: "Quantity to Produce", type: "number" as const, placeholder: "e.g. 10000", required: true },
    { key: "startDate", label: "Planned Start", type: "date" as const, required: true },
    { key: "endDate", label: "Planned Finish", type: "date" as const, required: false },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Scheduled", "In Progress", "Paused", "Completed", "Cancelled"],
        required: true
    },
    { key: "instructions", label: "Production Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "PO-2401", batch: "BT-0881", machine: "M-01 HighSpeed SOS", qty: "10,000", startDate: "2026-02-25", status: "In Progress" },
    { id: "PO-2402", batch: "BT-0882", machine: "M-02 SOS Line-B", qty: "5,000", startDate: "2026-02-27", status: "Scheduled" },
    { id: "PO-2403", batch: "BT-0880", machine: "M-06 Auto Gluer", qty: "50,000", startDate: "2026-03-01", status: "Scheduled" },
    { id: "PO-2400", batch: "BT-0879", machine: "M-04 Corrugator A", qty: "8,000", startDate: "2026-02-24", status: "Completed" },
];

export default function ProductionOrderPage() {
    return (
        <ModulePage
            title="Production Order"
            addLabel="New PO"
            idPrefix="PO-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Active", value: "6", color: "#f97316" },
                { label: "Completed Today", value: "2", color: "#10b981" },
                { label: "Scheduled", value: "4", color: "#3b82f6" },
                { label: "Total Pcs", value: "73,000", color: "#f59e0b" }
            ]}
        />
    );
}
