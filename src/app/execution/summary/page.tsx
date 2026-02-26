"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "date", label: "Date" },
    { key: "machine", label: "Machine" },
    { key: "produced", label: "Produced (Pcs)" },
    { key: "target", label: "Target (Pcs)" },
    { key: "wastageKg", label: "Wastage (Kg)" },
    { key: "oee", label: "OEE %" },
    { key: "dtHours", label: "DT (hrs)" },
];

const fields = [
    { key: "date", label: "Summary Date", type: "date" as const, required: true },
    {
        key: "machine", label: "Machine", type: "select" as const,
        options: ["M-01 HighSpeed SOS", "M-02 SOS Line-B", "M-03 Twisted Handle", "M-04 Corrugator A", "M-05 Flat Handle", "M-06 Auto Gluer"],
        required: true
    },
    { key: "produced", label: "Total Produced (Pcs)", type: "number" as const, placeholder: "e.g. 42000", required: true },
    { key: "target", label: "Target Quantity (Pcs)", type: "number" as const, placeholder: "e.g. 45000", required: true },
    { key: "wastageKg", label: "Total Wastage (Kg)", type: "number" as const, placeholder: "e.g. 22.4", required: true },
    { key: "oee", label: "OEE %", placeholder: "e.g. 92.1%", required: false },
    { key: "dtHours", label: "Downtime Hours", type: "number" as const, placeholder: "e.g. 0", required: true },
    { key: "remarks", label: "Performance Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { date: "2026-02-26", machine: "M-01 HighSpeed SOS", produced: "42,000", target: "45,000", wastageKg: "22.4", oee: "92.1%", dtHours: "0" },
    { date: "2026-02-26", machine: "M-02 SOS Line-B", produced: "38,500", target: "40,000", wastageKg: "8.1", oee: "88.4%", dtHours: "0" },
    { date: "2026-02-26", machine: "M-04 Corrugator A", produced: "62,000", target: "60,000", wastageKg: "14.6", oee: "98.2%", dtHours: "0" },
    { date: "2026-02-25", machine: "M-03 Twisted Handle", produced: "8,400", target: "20,000", wastageKg: "5.2", oee: "45.0%", dtHours: "1.4" },
];

export default function ProductionSummaryPage() {
    return (
        <ModulePage
            title="Production Summary"
            addLabel="Add Daily Stat"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Fleet Output Today", value: "142,500", color: "#10b981" },
                { label: "Fleet OEE", value: "82.2%", color: "#3b82f6" },
                { label: "Total Wastage", value: "50.3 Kg", color: "#ef4444" },
                { label: "DT Hours", value: "1.4h", color: "#f59e0b" }
            ]}
        />
    );
}
