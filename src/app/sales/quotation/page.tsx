"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Quotation ID" },
    { key: "customer", label: "Customer" },
    { key: "bagSize", label: "Bag Size" },
    { key: "gsm", label: "GSM" },
    { key: "qty", label: "Qty (Pcs)" },
    { key: "totalValue", label: "Total Value (₹)" },
    { key: "margin", label: "Margin" },
    { key: "validTill", label: "Valid Till" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Accepted" ? "green" : v === "Sent" ? "blue" : v === "Expired" ? "red" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Quotation ID", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "bagSize", label: "Bag Size", placeholder: "e.g. 12×4×10", required: true },
    { key: "gsm", label: "GSM", type: "number" as const, placeholder: "e.g. 120", required: true },
    { key: "qty", label: "Quantity (Pcs)", type: "number" as const, placeholder: "e.g. 10000", required: true },
    { key: "unitPrice", label: "Unit Price (₹)", type: "number" as const, placeholder: "e.g. 45", required: true },
    { key: "totalValue", label: "Total Value (₹)", placeholder: "e.g. 4,50,000", required: true },
    { key: "margin", label: "Margin %", placeholder: "e.g. 18%", required: true },
    { key: "validTill", label: "Valid Till", type: "date" as const, required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Draft", "Sent", "Accepted", "Expired", "Rejected"],
        required: true
    },
    { key: "remarks", label: "Terms & Remarks", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "QT-2401", customer: "TechCorp Global", bagSize: "12×4×10", gsm: "120", qty: "10,000", totalValue: "4,50,000", margin: "18%", validTill: "2026-03-10", status: "Sent" },
    { id: "QT-2402", customer: "Green Mart", bagSize: "8×3×12", gsm: "100", qty: "5,000", totalValue: "2,10,000", margin: "22%", validTill: "2026-03-05", status: "Accepted" },
    { id: "QT-2403", customer: "Luxe Boutique", bagSize: "15×5×15", gsm: "150", qty: "2,000", totalValue: "1,82,000", margin: "15%", validTill: "2026-02-28", status: "Expired" },
    { id: "QT-2404", customer: "EcoFresh Corp", bagSize: "10×4×8", gsm: "120", qty: "20,000", totalValue: "3,40,000", margin: "19%", validTill: "2026-03-15", status: "Draft" },
    { id: "QT-2405", customer: "Daily Fresh", bagSize: "8×2×10", gsm: "80", qty: "50,000", totalValue: "12,00,000", margin: "25%", validTill: "2026-03-20", status: "Accepted" },
];

export default function QuotationPage() {
    return (
        <ModulePage
            title="Quotation"
            addLabel="New Quotation"
            idPrefix="QT-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Draft Quotes", value: "4", color: "#64748b" },
                { label: "Sent", value: "7", color: "#3b82f6" },
                { label: "Accepted", value: "11", color: "#10b981" },
                { label: "Total Value", value: "₹23.8L", color: "#f97316" },
            ]}
        />
    );
}
