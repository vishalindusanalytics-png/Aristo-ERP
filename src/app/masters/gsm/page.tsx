"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "gsm", label: "GSM" },
    { key: "grade", label: "Paper Grade" },
    { key: "burstStrength", label: "Min Burst (kPa)" },
    { key: "tensile", label: "Tensile (N/m)" },
    { key: "ratePerKg", label: "Rate / Kg" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "gsm", label: "GSM Value", type: "number" as const, placeholder: "e.g. 120", required: true },
    {
        key: "grade", label: "Paper Grade / Type", type: "select" as const,
        options: ["Kraft Brown", "Kraft Natural", "Kraft Premium", "Kraft Supreme", "Kraft Heavy", "White Kraft", "Recycled"],
        required: true
    },
    { key: "burstStrength", label: "Min Burst Strength (kPa)", type: "number" as const, placeholder: "e.g. 270", required: true },
    { key: "tensile", label: "Min Tensile Strength (N/m)", type: "number" as const, placeholder: "e.g. 7200", required: false },
    { key: "ratePerKg", label: "Standard Rate / Kg (₹)", type: "number" as const, placeholder: "e.g. 82", required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Active", "Inactive"],
        required: true
    },
    { key: "specifications", label: "Technical Specs", type: "textarea" as const, required: false },
];

const initialRows = [
    { gsm: "80", grade: "Kraft Brown", burstStrength: "140", tensile: "4,500", ratePerKg: "60", status: "Active" },
    { gsm: "100", grade: "Kraft Natural", burstStrength: "200", tensile: "5,800", ratePerKg: "68", status: "Active" },
    { gsm: "120", grade: "Kraft Premium", burstStrength: "270", tensile: "7,200", ratePerKg: "82", status: "Active" },
    { gsm: "150", grade: "Kraft Supreme", burstStrength: "350", tensile: "9,100", ratePerKg: "105", status: "Active" },
    { gsm: "200", grade: "Kraft Heavy", burstStrength: "480", tensile: "12,000", ratePerKg: "138", status: "Inactive" },
];

export default function GSMMasterPage() {
    return (
        <ModulePage
            title="GSM Master"
            addLabel="Add GSM Grade"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total GSM Grades", value: "5", color: "#3b82f6" },
                { label: "Active", value: "4", color: "#10b981" },
                { label: "Most Used", value: "120 GSM", color: "#f97316" },
                { label: "Price Range", value: "₹60-₹138", color: "#f59e0b" }
            ]}
        />
    );
}
