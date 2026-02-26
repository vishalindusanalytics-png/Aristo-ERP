"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "bagSize", label: "Bag Size" },
    { key: "gsm", label: "GSM" },
    { key: "qty", label: "Qty (Pcs)" },
    { key: "deliveryDate", label: "Delivery Date" },
    { key: "value", label: "Order Value (₹)" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Confirmed" ? "green" : v === "In Production" ? "orange" : v === "Dispatched" ? "blue" : v === "Cancelled" ? "red" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Sales Order ID", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "quotationRef", label: "Quotation Ref", placeholder: "e.g. QT-2401", required: false },
    { key: "bagSize", label: "Bag Size", placeholder: "e.g. 12×4×10", required: true },
    { key: "gsm", label: "GSM", type: "number" as const, placeholder: "e.g. 120", required: true },
    { key: "qty", label: "Quantity (Pcs)", type: "number" as const, placeholder: "e.g. 10000", required: true },
    { key: "value", label: "Order Value (₹)", placeholder: "e.g. 4,50,000", required: true },
    { key: "orderDate", label: "Order Date", type: "date" as const, required: true },
    { key: "deliveryDate", label: "Delivery Date", type: "date" as const, required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Pending", "Confirmed", "In Production", "Dispatched", "Delivered", "Cancelled"],
        required: true
    },
    { key: "specialRemarks", label: "Special Instructions", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "SO-2401", customer: "TechCorp Global", bagSize: "12×4×10", gsm: "120", qty: "10,000", deliveryDate: "2026-03-05", value: "4,50,000", status: "In Production" },
    { id: "SO-2402", customer: "Green Mart", bagSize: "8×3×12", gsm: "100", qty: "5,000", deliveryDate: "2026-03-08", value: "2,10,000", status: "Confirmed" },
    { id: "SO-2403", customer: "Luxe Boutique", bagSize: "15×5×15", gsm: "150", qty: "2,000", deliveryDate: "2026-02-28", value: "1,82,000", status: "Dispatched" },
    { id: "SO-2404", customer: "Swift Logistics", bagSize: "10×4×8", gsm: "120", qty: "25,000", deliveryDate: "2026-03-15", value: "8,75,000", status: "Confirmed" },
    { id: "SO-2405", customer: "Daily Fresh", bagSize: "8×2×10", gsm: "80", qty: "50,000", deliveryDate: "2026-03-20", value: "12,00,000", status: "Pending" },
];

export default function SalesOrderPage() {
    return (
        <ModulePage
            title="Sales Order"
            addLabel="New Sales Order"
            idPrefix="SO-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Open Orders", value: "14", color: "#3b82f6" },
                { label: "In Production", value: "6", color: "#f97316" },
                { label: "Dispatched", value: "3", color: "#8b5cf6" },
                { label: "This Month Value", value: "₹48.6L", color: "#10b981" },
            ]}
        />
    );
}
