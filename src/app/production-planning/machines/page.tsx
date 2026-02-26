"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Machine ID" },
    { key: "name", label: "Machine Name" },
    { key: "type", label: "Type" },
    { key: "capacity", label: "Capacity (Pcs/hr)" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : v === "Maintenance" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Machine ID", required: true },
    { key: "name", label: "Machine Name", placeholder: "e.g. HighSpeed SOS", required: true },
    {
        key: "type", label: "Machine Type", type: "select" as const,
        options: ["SOS Bag", "Twisted Handle", "Flat Handle", "Corrugator", "Gluing", "Printing", "Slitting"],
        required: true
    },
    { key: "capacity", label: "Capacity (Pcs/hr)", type: "number" as const, placeholder: "e.g. 6000", required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Active", "Inactive", "Maintenance", "Repair Required"],
        required: true
    },
];

const initialRows = [
    { id: "M-01", name: "HighSpeed SOS", type: "SOS Bag", capacity: "6,000", status: "Active" },
    { id: "M-02", name: "SOS Line-B", type: "SOS Bag", capacity: "5,500", status: "Active" },
    { id: "M-03", name: "Twisted Handle", type: "Twisted Handle", capacity: "3,200", status: "Maintenance" },
    { id: "M-04", name: "Corrugator A", type: "Corrugator", capacity: "8,000", status: "Active" },
    { id: "M-05", name: "Flat Handle", type: "Flat Handle", capacity: "4,000", status: "Inactive" },
    { id: "M-06", name: "Auto Gluer", type: "Gluing", capacity: "5,000", status: "Active" },
];

export default function MachineMasterPage() {
    return (
        <ModulePage
            title="Machine Master"
            addLabel="Add Machine"
            idPrefix="M-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Machines", value: "6", color: "#3b82f6" },
                { label: "Active", value: "4", color: "#10b981" },
                { label: "Under Maintenance", value: "1", color: "#f59e0b" },
                { label: "Avg Capacity", value: "5,283/hr", color: "#f97316" },
            ]}
        />
    );
}
