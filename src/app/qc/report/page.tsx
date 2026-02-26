"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "period", label: "Period" },
    { key: "inspected", label: "RM Inspected (Kg)" },
    { key: "batchesChecked", label: "Batches Checked" },
    { key: "certified", label: "Certified" },
    { key: "rejected", label: "Rejected" },
    { key: "defectRate", label: "Defect Rate" },
    { key: "passRate", label: "Pass Rate" },
];

const fields = [
    { key: "period", label: "Report Period", required: true },
    { key: "inspected", label: "Material Inspected (Kg)", type: "number" as const, placeholder: "e.g. 4200", required: true },
    { key: "batchesChecked", label: "Total Batches Inspected", type: "number" as const, placeholder: "e.g. 6", required: true },
    { key: "certified", label: "Batches Certified (Passed)", type: "number" as const, placeholder: "e.g. 5", required: true },
    { key: "rejected", label: "Batches Rejected", type: "number" as const, placeholder: "e.g. 1", required: true },
    { key: "defectRate", label: "Calculated Defect %", placeholder: "e.g. 0.51%", required: false },
    { key: "passRate", label: "Calculated Pass %", placeholder: "e.g. 83.3%", required: false },
];

const initialRows = [
    { period: "2026-02-26", inspected: "4,200", batchesChecked: "6", certified: "5", rejected: "1", defectRate: "0.51%", passRate: "83.3%" },
    { period: "2026-02-25", inspected: "3,800", batchesChecked: "5", certified: "5", rejected: "0", defectRate: "0.22%", passRate: "100%" },
    { period: "Week 08 (Feb 2026)", inspected: "18,400", batchesChecked: "24", certified: "21", rejected: "3", defectRate: "0.48%", passRate: "87.5%" },
];

export default function QCReportPage() {
    return (
        <ModulePage
            title="Quality Performance Report"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Overall Pass Rate", value: "92.8%", color: "#10b981" },
                { label: "Defect Rate", value: "0.48%", color: "#ef4444" },
                { label: "Batches Certified", value: "38", color: "#3b82f6" },
                { label: "RM Rejected (Kg)", value: "800", color: "#f59e0b" }
            ]}
        />
    );
}
