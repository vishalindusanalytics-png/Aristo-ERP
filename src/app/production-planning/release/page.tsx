"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "batchId", label: "Batch ID" },
    { key: "orderId", label: "Order ID" },
    { key: "releasedBy", label: "Released By" },
    { key: "releaseDate", label: "Release Date" },
    { key: "machine", label: "Machine" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Released" ? "green" : v === "Pending" ? "yellow" : "blue"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "batchId", label: "Batch ID", required: true },
    { key: "orderId", label: "Parent Order ID", required: true },
    { key: "releasedBy", label: "Authorized By", placeholder: "e.g. Vishal P.", required: true },
    { key: "releaseDate", label: "Authorization Date", type: "date" as const, required: true },
    {
        key: "machine", label: "Target Machine", type: "select" as const,
        options: ["M-01 HighSpeed SOS", "M-02 SOS Line-B", "M-03 Twisted Handle", "M-06 Auto Gluer", "M-04 Corrugator A", "M-05 Flat Handle"],
        required: true
    },
    {
        key: "status", label: "Current Status", type: "select" as const,
        options: ["Pending", "Ready", "Verify-Required", "Released", "On Hold"],
        required: true
    },
    { key: "specialInstructions", label: "Special Instructions", type: "textarea" as const, required: false },
];

const initialRows = [
    { batchId: "BT-0881", orderId: "SO-2401", releasedBy: "Vishal P.", releaseDate: "2026-02-24", machine: "M-01 HighSpeed SOS", status: "Released" },
    { batchId: "BT-0882", orderId: "SO-2402", releasedBy: "Ravi K.", releaseDate: "2026-02-25", machine: "M-02 SOS Line-B", status: "Released" },
    { batchId: "BT-0883", orderId: "SO-2403", releasedBy: "-", releaseDate: "", machine: "M-06 Auto Gluer", status: "Pending" },
];

export default function PlanReleasePage() {
    return (
        <ModulePage
            title="Plan Release"
            addLabel="Release Plan"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Released Today", value: "3", color: "#10b981" },
                { label: "Pending Release", value: "2", color: "#f59e0b" },
                { label: "Total This Week", value: "8", color: "#3b82f6" },
                { label: "Overdue", value: "0", color: "#ef4444" },
            ]}
        />
    );
}
