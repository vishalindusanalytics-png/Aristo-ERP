"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "orderId", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "bagSpec", label: "Bag Spec" },
    { key: "qty", label: "Qty (Pcs)" },
    { key: "value", label: "Value" },
    { key: "dispatchDate", label: "Dispatch Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Delivered" ? "green" : v === "In Transit" ? "blue" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "orderId", label: "Order Reference", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "bagSpec", label: "Bag Specifications", placeholder: "e.g. SOS 12×4×10 120GSM", required: true },
    { key: "qty", label: "Ordered Quantity (Pcs)", type: "number" as const, placeholder: "e.g. 10000", required: true },
    { key: "value", label: "Order Value (₹)", type: "number" as const, placeholder: "e.g. 450000", required: true },
    { key: "dispatchDate", label: "Dispatch/Delivery Date", type: "date" as const, required: true },
    {
        key: "status", label: "Current Status", type: "select" as const,
        options: ["Pending", "In Production", "Ready", "In Transit", "Delivered"],
        required: true
    },
];

const initialRows = [
    { orderId: "SO-2401", customer: "TechCorp Global", bagSpec: "SOS 12×4×10 120GSM", qty: "10,000", value: "4,50,000", dispatchDate: "2026-02-26", status: "In Transit" },
    { orderId: "SO-2400", customer: "Luxe Boutique", bagSpec: "Twisted 15×5×15 150GSM", qty: "2,000", value: "1,80,000", dispatchDate: "2026-02-25", status: "Delivered" },
    { orderId: "SO-2399", customer: "TechCorp Global", bagSpec: "SOS 12×4×10 120GSM", qty: "8,000", value: "3,60,000", dispatchDate: "2026-02-24", status: "Delivered" },
    { orderId: "SO-2402", customer: "Green Mart", bagSpec: "Flat 8×3×12 100GSM", qty: "5,000", value: "2,10,000", dispatchDate: "2026-03-02", status: "Pending" },
];

export default function OrderReportPage() {
    return (
        <ModulePage
            title="Order Analysis Report"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Orders This Month", value: "14", color: "#3b82f6" },
                { label: "Total Value", value: "₹28.6L", color: "#10b981" },
                { label: "Delivered", value: "10", color: "#f97316" },
                { label: "Pending", value: "4", color: "#f59e0b" }
            ]}
        />
    );
}
