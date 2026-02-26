"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "QC ID" },
    { key: "batchId", label: "Batch" },
    { key: "machine", label: "Machine" },
    { key: "checkTime", label: "Check Time" },
    { key: "sampleSize", label: "Sample Size" },
    { key: "defects", label: "Defects Found" },
    {
        key: "result", label: "Result", render: (v: string | number) => (
            <span className={`badge badge-${v === "Pass" ? "green" : v === "Fail" ? "red" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "QC Check ID", required: true },
    { key: "batchId", label: "Batch Reference", placeholder: "e.g. BT-0881", required: true },
    {
        key: "machine", label: "Machine", type: "select" as const,
        options: ["M-01", "M-02", "M-03", "M-04", "M-05", "M-06"],
        required: true
    },
    { key: "checkTime", label: "Inspection Time", placeholder: "e.g. 10:00 AM", required: true },
    { key: "sampleSize", label: "Sample Size (Pcs)", type: "number" as const, placeholder: "e.g. 50", required: true },
    { key: "defects", label: "Defects Found", type: "number" as const, placeholder: "e.g. 2", required: true },
    {
        key: "result", label: "Final Result", type: "select" as const,
        options: ["Pass", "Fail", "Rework Required"],
        required: true
    },
    { key: "inspector", label: "QC Inspector", placeholder: "e.g. Vijay Kumar", required: true },
    { key: "defectTypes", label: "Type of Defects", type: "textarea" as const, placeholder: "e.g. Gluing issue, printing smudge", required: false },
];

const initialRows = [
    { id: "IPC-0441", batchId: "BT-0881", machine: "M-01", checkTime: "10:00 AM", sampleSize: "50", defects: "1", result: "Pass" },
    { id: "IPC-0442", batchId: "BT-0881", machine: "M-01", checkTime: "02:00 PM", sampleSize: "50", defects: "3", result: "Pass" },
    { id: "IPC-0440", batchId: "BT-0880", machine: "M-04", checkTime: "08:00 AM", sampleSize: "50", defects: "8", result: "Fail" },
    { id: "IPC-0439", batchId: "BT-0879", machine: "M-02", checkTime: "06:00 PM", sampleSize: "50", defects: "0", result: "Pass" },
];

export default function InProcessQCPage() {
    return (
        <ModulePage
            title="In-Process QC"
            addLabel="New QC Check"
            idPrefix="IPC-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Checks Today", value: "4", color: "#3b82f6" },
                { label: "Pass Rate", value: "75%", color: "#10b981" },
                { label: "Failed Checks", value: "1", color: "#ef4444" },
                { label: "Avg Defects", value: "3.0", color: "#f59e0b" },
            ]}
        />
    );
}
