"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "adjId", label: "Adj. ID" },
    { key: "item", label: "Material" },
    { key: "gsm", label: "GSM" },
    { key: "before", label: "Before (Kg)" },
    { key: "after", label: "After (Kg)" },
    { key: "reason", label: "Reason" },
    { key: "date", label: "Date" },
];

const fields = [
    { key: "adjId", label: "Adjustment ID", required: true },
    { key: "item", label: "Material Item", placeholder: "e.g. Kraft Paper Roll", required: true },
    { key: "gsm", label: "GSM / Grade", placeholder: "e.g. 120", required: false },
    { key: "before", label: "Quantity Before (Kg)", type: "number" as const, placeholder: "e.g. 4680", required: true },
    { key: "after", label: "Quantity After (Kg)", type: "number" as const, placeholder: "e.g. 4200", required: true },
    {
        key: "reason", label: "Adjustment Reason", type: "select" as const,
        options: ["Physical count variance", "Damage write-off", "GRN correction", "Return to vendor", "Expired/Old stock"],
        required: true
    },
    { key: "date", label: "Adjustment Date", type: "date" as const, required: true },
    { key: "authorizedBy", label: "Authorized By", placeholder: "e.g. Store Manager", required: true },
];

const initialRows = [
    { adjId: "ADJ-001", item: "Kraft Paper Roll", gsm: "120", before: "4,680", after: "4,200", reason: "Physical count variance", date: "2026-02-24" },
    { adjId: "ADJ-002", item: "Kraft Paper Roll", gsm: "100", before: "1,280", after: "1,100", reason: "Damage write-off", date: "2026-02-22" },
    { adjId: "ADJ-003", item: "LDPE Film", gsm: "-", before: "450", after: "500", reason: "GRN correction", date: "2026-02-20" },
];

export default function StockAdjustmentPage() {
    return (
        <ModulePage
            title="Stock Adjustment"
            addLabel="New Adjustment"
            idPrefix="ADJ-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Adjustments This Month", value: "5", color: "#3b82f6" },
                { label: "Write-offs (Kg)", value: "360", color: "#ef4444" },
                { label: "Corrections (Kg)", value: "+50", color: "#10b981" },
                { label: "Net Impact", value: "-₹1.2L", color: "#f59e0b" },
            ]}
        />
    );
}
