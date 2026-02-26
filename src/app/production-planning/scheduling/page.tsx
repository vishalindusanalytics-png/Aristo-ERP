"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "orderId", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "machine", label: "Assigned Machine" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "qty", label: "Qty (Pcs)" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Scheduled" ? "blue" : v === "In Progress" ? "orange" : v === "Completed" ? "green" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Schedule ID", required: true },
    { key: "orderId", label: "Order ID", placeholder: "e.g. SO-2401", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp", required: true },
    { key: "machine", label: "Machine", type: "select" as const, options: ["M-01 HighSpeed SOS", "M-02 SOS Line-B", "M-03 Twisted Handle", "M-06 Auto Gluer"], required: true },
    { key: "startDate", label: "Start Date", type: "date" as const, required: true },
    { key: "endDate", label: "End Date", type: "date" as const, required: true },
    { key: "qty", label: "Quantity (Pcs)", type: "number" as const, required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Draft", "Scheduled", "In Progress", "Completed", "On Hold"],
        required: true
    },
    { key: "operator", label: "Assigned Operator", placeholder: "e.g. Sunil Kumar", required: false },
];

const initialRows = [
    { id: "SCH-001", orderId: "SO-2401", customer: "TechCorp", machine: "M-01 HighSpeed SOS", startDate: "2026-02-25", endDate: "2026-02-26", qty: "10,000", status: "In Progress" },
    { id: "SCH-002", orderId: "SO-2402", customer: "Green Mart", machine: "M-02 SOS Line-B", startDate: "2026-02-27", endDate: "2026-02-28", qty: "5,000", status: "Scheduled" },
    { id: "SCH-003", orderId: "SO-2403", customer: "Daily Fresh", machine: "M-06 Auto Gluer", startDate: "2026-03-01", endDate: "2026-03-03", qty: "50,000", status: "Scheduled" },
    { id: "SCH-004", orderId: "SO-2404", customer: "Luxe Boutique", machine: "M-03 Twisted Handle", startDate: "2026-02-24", endDate: "2026-02-25", qty: "2,000", status: "Completed" },
];

export default function OrderSchedulingPage() {
    return (
        <ModulePage
            title="Order Scheduling"
            addLabel="Schedule Order"
            idPrefix="SCH-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Scheduled Orders", value: "8", color: "#3b82f6" },
                { label: "In Progress", value: "3", color: "#f97316" },
                { label: "Completed This Week", value: "5", color: "#10b981" },
                { label: "Delayed", value: "1", color: "#ef4444" },
            ]}
        />
    );
}
