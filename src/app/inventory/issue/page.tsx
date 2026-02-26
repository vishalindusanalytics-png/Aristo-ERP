"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Issue ID" },
    { key: "batchId", label: "Batch ID" },
    { key: "item", label: "Material" },
    { key: "gsm", label: "GSM" },
    { key: "issuedQty", label: "Issued Qty (Kg)" },
    { key: "issuedTo", label: "Issued To" },
    { key: "date", label: "Date" },
];

const fields = [
    { key: "id", label: "Issue ID", required: true },
    { key: "batchId", label: "Production Batch ID", placeholder: "e.g. BT-0881", required: true },
    { key: "item", label: "Material Item", placeholder: "e.g. Kraft Paper Roll", required: true },
    { key: "gsm", label: "GSM / Grade", placeholder: "e.g. 120", required: false },
    { key: "issuedQty", label: "Quantity Issued (Kg)", type: "number" as const, placeholder: "e.g. 480", required: true },
    {
        key: "issuedTo", label: "Requesting Center / Machine", type: "select" as const,
        options: ["M-01 HighSpeed SOS", "M-02 SOS Line-B", "M-03 Twisted Handle", "M-04 Corrugator A", "M-05 Flat Handle", "Printing Dept", "Maintenance"],
        required: true
    },
    { key: "date", label: "Issue Date", type: "date" as const, required: true },
    { key: "issuer", label: "Issued By", placeholder: "e.g. Rajesh K.", required: true },
];

const initialRows = [
    { id: "ISS-0441", batchId: "BT-0881", item: "Kraft Paper Roll", gsm: "120", issuedQty: "480", issuedTo: "M-01 HighSpeed SOS", date: "2026-02-25" },
    { id: "ISS-0442", batchId: "BT-0882", item: "Kraft Paper Roll", gsm: "100", issuedQty: "180", issuedTo: "M-02 SOS Line-B", date: "2026-02-25" },
    { id: "ISS-0443", batchId: "BT-0880", item: "Twisted Paper Rope", gsm: "-", issuedQty: "85", issuedTo: "M-03 Twisted Handle", date: "2026-02-24" },
];

export default function MaterialIssuePage() {
    return (
        <ModulePage
            title="Material Issue"
            addLabel="Issue Material"
            idPrefix="ISS-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Issues Today", value: "3", color: "#f97316" },
                { label: "Total Issued (Kg)", value: "745", color: "#3b82f6" },
                { label: "This Month", value: "28 Issues", color: "#10b981" },
                { label: "Pending Issue", value: "0", color: "#64748b" },
            ]}
        />
    );
}
