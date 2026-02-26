"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "date", label: "Date" },
    { key: "machine", label: "Machine" },
    { key: "bagSpec", label: "Bag Spec" },
    { key: "produced", label: "Produced (Pcs)" },
    { key: "target", label: "Target (Pcs)" },
    { key: "achievement", label: "Achievement %" },
];

const fields = [
    { key: "date", label: "Production Date", type: "date" as const, required: true },
    {
        key: "machine", label: "Machine", type: "select" as const,
        options: ["M-01 HighSpeed SOS", "M-02 SOS Line-B", "M-03 Twisted Handle", "M-04 Corrugator A", "M-05 Flat Handle", "M-06 Auto Gluer"],
        required: true
    },
    { key: "bagSpec", label: "Bag Specifications", placeholder: "e.g. SOS 12×4×10 120GSM", required: true },
    { key: "produced", label: "Quantity Produced (Pcs)", type: "number" as const, placeholder: "e.g. 42000", required: true },
    { key: "target", label: "Standard Target (Pcs)", type: "number" as const, placeholder: "e.g. 45000", required: true },
    { key: "achievement", label: "Target Achievement %", placeholder: "e.g. 93.3%", required: false },
];

const initialRows = [
    { date: "2026-02-26", machine: "M-01 HighSpeed SOS", bagSpec: "SOS 12×4×10 120GSM", produced: "42,000", target: "45,000", achievement: "93.3%" },
    { date: "2026-02-26", machine: "M-02 SOS Line-B", bagSpec: "SOS 8×3×12 100GSM", produced: "38,500", target: "40,000", achievement: "96.3%" },
    { date: "2026-02-26", machine: "M-04 Corrugator A", bagSpec: "Corrugated 12×4×10", produced: "62,000", target: "60,000", achievement: "103.3%" },
    { date: "2026-02-25", machine: "M-01 HighSpeed SOS", bagSpec: "SOS 12×4×10 120GSM", produced: "40,500", target: "45,000", achievement: "90.0%" },
];

export default function ProductionReportPage() {
    return (
        <ModulePage
            title="Production Efficiency Report"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Weekly Output", value: "5.8M Pcs", color: "#10b981" },
                { label: "Avg Achievement", value: "95.7%", color: "#3b82f6" },
                { label: "Best Machine", value: "M-04", color: "#f97316" },
                { label: "OEE Average", value: "92.1%", color: "#f59e0b" }
            ]}
        />
    );
}
