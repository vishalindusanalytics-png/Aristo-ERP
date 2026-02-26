"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Inspection ID" },
    { key: "grnId", label: "GRN Ref" },
    { key: "item", label: "Material" },
    { key: "gsm", label: "GSM Target" },
    { key: "gsm_actual", label: "GSM Actual" },
    { key: "burstStrength", label: "Burst (kPa)" },
    {
        key: "result", label: "Result", render: (v: string | number) => (
            <span className={`badge badge-${v === "Pass" ? "green" : v === "Fail" ? "red" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Inspection ID", required: true },
    { key: "grnId", label: "GRN Reference", placeholder: "e.g. GRN-1101", required: true },
    { key: "item", label: "Material Name", placeholder: "e.g. Kraft Paper Roll", required: true },
    { key: "gsm", label: "GSM Target", type: "number" as const, placeholder: "e.g. 120", required: true },
    { key: "gsm_actual", label: "GSM Actual", type: "number" as const, placeholder: "e.g. 121", required: true },
    { key: "burstStrength", label: "Burst Strength (kPa)", type: "number" as const, placeholder: "e.g. 280", required: false },
    { key: "moisture", label: "Moisture %", type: "number" as const, placeholder: "e.g. 6.5", required: false },
    {
        key: "result", label: "Inspection Result", type: "select" as const,
        options: ["Pending", "Pass", "Fail", "Hold"],
        required: true
    },
    { key: "inspector", label: "Inspector Name", placeholder: "e.g. Amit Patil", required: true },
    { key: "remarks", label: "Observation Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "RI-0221", grnId: "GRN-1101", item: "Kraft Paper Roll", gsm: "120", gsm_actual: "121", burstStrength: "285", result: "Pass" },
    { id: "RI-0222", grnId: "GRN-1102", item: "Kraft Paper Roll", gsm: "100", gsm_actual: "98", burstStrength: "210", result: "Pass" },
    { id: "RI-0223", grnId: "GRN-1104", item: "Kraft Paper Roll", gsm: "80", gsm_actual: "76", burstStrength: "135", result: "Fail" },
    { id: "RI-0220", grnId: "GRN-1103", item: "LDPE Film", gsm: "-", gsm_actual: "-", burstStrength: "-", result: "Pending" },
];

export default function RMInspectionPage() {
    return (
        <ModulePage
            title="RM Inspection"
            addLabel="New Inspection"
            idPrefix="RI-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Inspected Today", value: "4", color: "#3b82f6" },
                { label: "Passed", value: "2", color: "#10b981" },
                { label: "Failed", value: "1", color: "#ef4444" },
                { label: "Pending", value: "1", color: "#f59e0b" },
            ]}
        />
    );
}
