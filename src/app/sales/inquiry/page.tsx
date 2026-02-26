"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Inquiry ID" },
    { key: "customer", label: "Customer" },
    { key: "size", label: "Bag Size" },
    { key: "gsm", label: "GSM" },
    { key: "qty", label: "Qty (Pcs)" },
    { key: "date", label: "Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Quoted" ? "blue" : v === "Confirmed" ? "green" : v === "In Progress" ? "orange" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Inquiry ID", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "size", label: "Bag Size", placeholder: "e.g. 12×4×10", required: true },
    { key: "gsm", label: "GSM", type: "number" as const, placeholder: "e.g. 120", required: true },
    { key: "qty", label: "Quantity (Pcs)", type: "number" as const, placeholder: "e.g. 10000", required: true },
    { key: "date", label: "Inquiry Date", type: "date" as const, required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Inquiry", "In Progress", "Quoted", "Confirmed", "Lost"],
        required: true
    },
    { key: "remarks", label: "Remarks / Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "INQ-2401", customer: "TechCorp Global", size: "12×4×10", gsm: "120", qty: "10,000", date: "2026-02-24", status: "Quoted" },
    { id: "INQ-2402", customer: "Green Mart Retail", size: "8×3×12", gsm: "100", qty: "5,000", date: "2026-02-23", status: "In Progress" },
    { id: "INQ-2403", customer: "Luxe Boutique", size: "15×5×15", gsm: "150", qty: "2,000", date: "2026-02-22", status: "Confirmed" },
    { id: "INQ-2404", customer: "Swift Logistics", size: "10×4×8", gsm: "120", qty: "25,000", date: "2026-02-21", status: "Inquiry" },
    { id: "INQ-2405", customer: "Eco Friendly Co", size: "12×5×10", gsm: "120", qty: "15,000", date: "2026-02-20", status: "Quoted" },
    { id: "INQ-2406", customer: "Daily Fresh", size: "8×2×10", gsm: "80", qty: "50,000", date: "2026-02-19", status: "Confirmed" },
];

export default function InquiryPage() {
    return (
        <ModulePage
            title="Inquiry"
            addLabel="New Inquiry"
            idPrefix="INQ-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Open Inquiries", value: "12", color: "#f59e0b" },
                { label: "Quoted", value: "8", color: "#3b82f6" },
                { label: "Confirmed", value: "4", color: "#10b981" },
                { label: "This Week", value: "6", color: "#f97316" },
            ]}
        />
    );
}
