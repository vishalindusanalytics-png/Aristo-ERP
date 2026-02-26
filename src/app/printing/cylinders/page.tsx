"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "cylinderId", label: "Cylinder ID" },
    { key: "plateId", label: "Plate ID" },
    { key: "design", label: "Design" },
    { key: "machine", label: "Machine" },
    { key: "mountedOn", label: "Mounted On" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Mounted" ? "orange" : v === "Available" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "cylinderId", label: "Cylinder ID", required: true },
    { key: "plateId", label: "Attached Plate ID", placeholder: "e.g. PL-0041", required: false },
    { key: "design", label: "Active Design", placeholder: "e.g. TechCorp Logo v2", required: false },
    {
        key: "machine", label: "Assigned Machine", type: "select" as const,
        options: ["M-01", "M-02", "M-03", "M-04", "M-05", "M-06", "-"],
        required: true
    },
    { key: "mountedOn", label: "Mounted Date", type: "date" as const, required: false },
    {
        key: "status", label: "Current Status", type: "select" as const,
        options: ["Available", "Mounted", "Dismounted", "Maintenance"],
        required: true
    },
    { key: "circumference", label: "Cylinder Circumference", placeholder: "e.g. 600mm", required: false },
];

const initialRows = [
    { cylinderId: "CYL-001", plateId: "PL-0041", design: "TechCorp Logo v2", machine: "M-01 HighSpeed SOS", mountedOn: "2026-02-25", status: "Mounted" },
    { cylinderId: "CYL-002", plateId: "PL-0042", design: "Green Mart Pattern", machine: "M-02 SOS Line-B", mountedOn: "2026-02-25", status: "Mounted" },
    { cylinderId: "CYL-003", plateId: "-", design: "-", machine: "-", mountedOn: "", status: "Available" },
    { cylinderId: "CYL-004", plateId: "PL-0036", design: "Old EcoFresh v1", machine: "-", mountedOn: "2025-11-20", status: "Dismounted" },
];

export default function CylinderMappingPage() {
    return (
        <ModulePage
            title="Cylinder Mapping"
            addLabel="Map Cylinder"
            idPrefix="CYL-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Cylinders", value: "6", color: "#3b82f6" },
                { label: "Currently Mounted", value: "2", color: "#f97316" },
                { label: "Available", value: "3", color: "#10b981" },
                { label: "Under Inspection", value: "1", color: "#f59e0b" }
            ]}
        />
    );
}
