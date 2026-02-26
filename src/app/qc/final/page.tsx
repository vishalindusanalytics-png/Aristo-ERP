"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "FQC ID" },
    { key: "orderId", label: "Order ID" },
    { key: "batchId", label: "Batch" },
    { key: "totalPcs", label: "Total (Pcs)" },
    { key: "samplePcs", label: "Sample Checked" },
    { key: "defects", label: "Defects" },
    {
        key: "result", label: "Result", render: (v: string | number) => (
            <span className={`badge badge-${v === "Certified" ? "green" : v === "Rejected" ? "red" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Final QC ID", required: true },
    { key: "orderId", label: "Order ID", placeholder: "e.g. PO-2400", required: true },
    { key: "batchId", label: "Batch Reference", placeholder: "e.g. BT-0880", required: true },
    { key: "totalPcs", label: "Total Production (Pcs)", type: "number" as const, placeholder: "e.g. 8000", required: true },
    { key: "samplePcs", label: "Sample Checked (Pcs)", type: "number" as const, placeholder: "e.g. 200", required: true },
    { key: "defects", label: "Defects Found", type: "number" as const, placeholder: "e.g. 2", required: true },
    {
        key: "result", label: "Final QC Result", type: "select" as const,
        options: ["Certified", "Rejected", "Pending", "Reprocess"],
        required: true
    },
    { key: "inspectedBy", label: "Quality Inspector", placeholder: "e.g. Vijay K.", required: true },
    { key: "remarks", label: "Certification Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "FQC-0221", orderId: "PO-2400", batchId: "BT-0880", totalPcs: "8,000", samplePcs: "200", defects: "2", result: "Certified" },
    { id: "FQC-0220", orderId: "PO-2399", batchId: "BT-0879", totalPcs: "5,000", samplePcs: "150", defects: "18", result: "Rejected" },
    { id: "FQC-0219", orderId: "PO-2398", batchId: "BT-0878", totalPcs: "12,000", samplePcs: "300", defects: "1", result: "Certified" },
];

export default function FinalQCPage() {
    return (
        <ModulePage
            title="Final QC"
            addLabel="New Final QC"
            idPrefix="FQC-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Certified Batches", value: "8", color: "#10b981" },
                { label: "Rejected Batches", value: "1", color: "#ef4444" },
                { label: "Total Certified Pcs", value: "1,24,000", color: "#3b82f6" },
                { label: "Defect Rate", value: "0.48%", color: "#f59e0b" }
            ]}
        />
    );
}
