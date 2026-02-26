"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "period", label: "Period" },
    { key: "grossInput", label: "Gross Input (Kg)" },
    { key: "wastageKg", label: "Wastage (Kg)" },
    { key: "percent", label: "Wastage %" },
    { key: "trimWaste", label: "Trim (Kg)" },
    { key: "startup", label: "Startup (Kg)" },
    { key: "spoilage", label: "Spoilage (Kg)" },
];

const fields = [
    { key: "period", label: "Report Period / Date", required: true },
    { key: "grossInput", label: "Total RM Input (Kg)", type: "number" as const, placeholder: "e.g. 1080", required: true },
    { key: "wastageKg", label: "Total Wastage (Kg)", type: "number" as const, placeholder: "e.g. 30.7", required: true },
    { key: "percent", label: "Wastage Percentage", placeholder: "e.g. 2.84%", required: false },
    { key: "trimWaste", label: "Trim Waste (Kg)", type: "number" as const, placeholder: "e.g. 22.4", required: true },
    { key: "startup", label: "Startup Waste (Kg)", type: "number" as const, placeholder: "e.g. 8.1", required: true },
    { key: "spoilage", label: "Spoilage (Kg)", type: "number" as const, placeholder: "e.g. 0.2", required: true },
];

const initialRows = [
    { period: "2026-02-26", grossInput: "1,080", wastageKg: "30.7", percent: "2.84%", trimWaste: "22.4", startup: "8.1", spoilage: "0.2" },
    { period: "2026-02-25", grossInput: "980", wastageKg: "24.2", percent: "2.47%", trimWaste: "18.6", startup: "5.6", spoilage: "0.0" },
    { period: "Week 08 (Feb 2026)", grossInput: "7,200", wastageKg: "201.6", percent: "2.80%", trimWaste: "148.2", startup: "42.8", spoilage: "10.6" },
];

export default function WastageReportPage() {
    return (
        <ModulePage
            title="Wastage Analysis Report"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Monthly Wastage", value: "2.80%", color: "#ef4444" },
                { label: "Total Waste (Kg)", value: "804 Kg", color: "#f97316" },
                { label: "Value Lost", value: "₹2.8L", color: "#f59e0b" },
                { label: "Best Day", value: "2.47%", color: "#10b981" }
            ]}
        />
    );
}
