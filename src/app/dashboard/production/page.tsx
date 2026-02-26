"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "shift", label: "Shift" },
    { key: "machine", label: "Machine" },
    { key: "bags", label: "Bags Produced" },
    { key: "target", label: "Target" },
    { key: "oee", label: "OEE %" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Running" ? "green" : v === "Idle" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "shift", label: "Active Shift", type: "select" as const, options: ["Morning", "Afternoon", "Night"], required: true },
    { key: "machine", label: "Machine Name", placeholder: "e.g. HighSpeed SOS", required: true },
    { key: "bags", label: "Bags Produced (Current)", type: "number" as const, placeholder: "e.g. 42000", required: true },
    { key: "target", label: "Shift Target (Pcs)", type: "number" as const, placeholder: "e.g. 45000", required: true },
    { key: "oee", label: "OEE Efficiency %", placeholder: "e.g. 92.1%", required: false },
    {
        key: "status", label: "Running Status", type: "select" as const,
        options: ["Running", "Idle", "Maintenance", "Breakdown"],
        required: true
    },
];

const initialRows = [
    { shift: "Morning", machine: "HighSpeed SOS", bags: "42,000", target: "45,000", oee: "92.1%", status: "Running" },
    { shift: "Morning", machine: "SOS Line-B", bags: "38,500", target: "40,000", oee: "88.4%", status: "Running" },
    { shift: "Afternoon", machine: "Auto Gluer", bags: "21,200", target: "25,000", oee: "74.3%", status: "Running" },
    { shift: "Afternoon", machine: "Twisted Handle", bags: "0", target: "20,000", oee: "0%", status: "Idle" },
    { shift: "Night", machine: "Corrugator A", bags: "62,000", target: "60,000", oee: "98.2%", status: "Running" },
];

export default function ProductionDashboardPage() {
    return (
        <ModulePage
            title="Production Live Status"
            addLabel="Log Production Entry"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Output Today", value: "842K", color: "#3b82f6" },
                { label: "OEE Average", value: "92.1%", color: "#10b981" },
                { label: "Machines Running", value: "4 / 6", color: "#f97316" },
                { label: "Downtime Hours", value: "2.4h", color: "#ef4444" },
            ]}
        />
    );
}
