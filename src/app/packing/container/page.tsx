"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Container ID" },
    { key: "type", label: "Container Type" },
    { key: "orders", label: "Orders Loaded" },
    { key: "totalCartons", label: "Total Cartons" },
    { key: "loadFactor", label: "Load Factor" },
    { key: "eta", label: "ETA / Dispatch" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Loaded" ? "green" : v === "Planning" ? "blue" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Container Number", required: true },
    {
        key: "type", label: "Container Type", type: "select" as const,
        options: ["20ft GP", "40ft GP", "40ft HC", "LCL"],
        required: true
    },
    { key: "orders", label: "Orders (Comma separated)", placeholder: "e.g. SO-2400, SO-2398", required: true },
    { key: "totalCartons", label: "Planned Cartons", type: "number" as const, placeholder: "e.g. 64", required: true },
    { key: "loadFactor", label: "Load Factor %", placeholder: "e.g. 95%", required: true },
    { key: "eta", label: "Dispatch/Arrival Date", type: "date" as const, required: true },
    {
        key: "status", label: "Planning Status", type: "select" as const,
        options: ["Draft", "Planning", "Partially Loaded", "Loaded", "Departed"],
        required: true
    },
    { key: "sealNumber", label: "Container Seal No.", placeholder: "e.g. SL-99011", required: false },
    { key: "remarks", label: "Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "CNT-4401", type: "40ft HC", orders: "SO-2400, SO-2398", totalCartons: "64", loadFactor: "96.8%", eta: "2026-02-28", status: "Loaded" },
    { id: "CNT-4402", type: "20ft GP", orders: "SO-2402", totalCartons: "20", loadFactor: "71.4%", eta: "2026-03-02", status: "Planning" },
    { id: "CNT-4403", type: "40ft HC", orders: "SO-2403, SO-2404, SO-2405", totalCartons: "0", loadFactor: "0%", eta: "2026-03-05", status: "Planning" },
];

export default function ContainerPlanningPage() {
    return (
        <ModulePage
            title="Container Planning"
            addLabel="New Container"
            idPrefix="CNT-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Containers Planned", value: "3", color: "#3b82f6" },
                { label: "Dispatched This Month", value: "4", color: "#10b981" },
                { label: "Avg Load Factor", value: "84.1%", color: "#f97316" },
                { label: "Upcoming Dispatch", value: "2", color: "#f59e0b" }
            ]}
        />
    );
}
