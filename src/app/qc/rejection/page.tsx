"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Rejection ID" },
    { key: "batchId", label: "Batch" },
    { key: "stage", label: "Stage" },
    { key: "qty", label: "Qty (Pcs/Kg)" },
    { key: "reason", label: "Reason" },
    { key: "disposalAction", label: "Disposal" },
    { key: "date", label: "Date" },
];

const fields = [
    { key: "id", label: "Rejection ID", required: true },
    { key: "batchId", label: "Batch Reference", placeholder: "e.g. BT-0879", required: true },
    {
        key: "stage", label: "Detection Stage", type: "select" as const,
        options: ["RM Inspection", "In-Process", "Final QC", "Customer Return", "Dispatch"],
        required: true
    },
    { key: "qty", label: "Rejected Quantity", placeholder: "e.g. 5000 Pcs", required: true },
    {
        key: "reason", label: "Rejection Reason", type: "select" as const,
        options: ["Handle loop defect", "Print misalignment", "GSM out of spec", "Gluing failure", "Bottom leaking", "Moisture high", "Bad paper quality"],
        required: true
    },
    {
        key: "disposalAction", label: "Disposal Action", type: "select" as const,
        options: ["Reprocess", "Scrap", "Return to Vendor", "Sell as Seconds", "Downgrade"],
        required: true
    },
    { key: "date", label: "Rejection Date", type: "date" as const, required: true },
    { key: "remarks", label: "Special Remarks", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "REJ-0121", batchId: "BT-0879", stage: "Final QC", qty: "5,000", reason: "Handle loop defect", disposalAction: "Reprocess", date: "2026-02-25" },
    { id: "REJ-0120", batchId: "BT-0877", stage: "In-Process", qty: "420", reason: "Print misalignment", disposalAction: "Scrap", date: "2026-02-24" },
    { id: "REJ-0119", batchId: "BT-0876", stage: "RM Inspection", qty: "800 Kg", reason: "GSM out of spec", disposalAction: "Return to Vendor", date: "2026-02-23" },
];

export default function RejectionEntryPage() {
    return (
        <ModulePage
            title="Rejection Entry"
            addLabel="Log Rejection"
            idPrefix="REJ-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Rejections This Month", value: "8", color: "#ef4444" },
                { label: "Total Pcs Rejected", value: "6,420", color: "#f97316" },
                { label: "Reprocessed", value: "3", color: "#f59e0b" },
                { label: "Scrapped", value: "2", color: "#64748b" }
            ]}
        />
    );
}
