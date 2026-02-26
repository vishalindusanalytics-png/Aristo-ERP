"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "orderId", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "bagSpec", label: "Bag Spec" },
    { key: "saleValue", label: "Sale Value" },
    { key: "rmCost", label: "RM Cost" },
    { key: "conversionCost", label: "Conversion" },
    { key: "margin", label: "Margin %" },
];

const fields = [
    { key: "orderId", label: "Order Reference", required: true },
    { key: "customer", label: "Customer Name", required: true },
    { key: "bagSpec", label: "Product Specification", required: true },
    { key: "saleValue", label: "Selling Price (Total ₹)", type: "number" as const, placeholder: "e.g. 450000", required: true },
    { key: "rmCost", label: "Raw Material Cost (₹)", type: "number" as const, placeholder: "e.g. 218400", required: true },
    { key: "conversionCost", label: "Production/Conversion (₹)", type: "number" as const, placeholder: "e.g. 149600", required: true },
    { key: "margin", label: "Profit Margin %", placeholder: "e.g. 18.2%", required: false },
    { key: "overhead", label: "Overhead Allocation (₹)", type: "number" as const, placeholder: "e.g. 25000", required: false },
];

const initialRows = [
    { orderId: "SO-2401", customer: "TechCorp Global", bagSpec: "SOS 12×4×10 120GSM", saleValue: "4,50,000", rmCost: "2,18,400", conversionCost: "1,49,600", margin: "18.2%" },
    { orderId: "SO-2402", customer: "Green Mart", bagSpec: "Flat 8×3×12 100GSM", saleValue: "2,10,000", rmCost: "88,200", conversionCost: "75,600", margin: "21.9%" },
    { orderId: "SO-2400", customer: "Luxe Boutique", bagSpec: "Twisted 15×5×15 150GSM", saleValue: "1,82,000", rmCost: "98,800", conversionCost: "55,500", margin: "15.2%" },
    { orderId: "SO-2397", customer: "Daily Fresh", bagSpec: "SOS 8×2×10 80GSM", saleValue: "12,00,000", rmCost: "4,80,000", conversionCost: "3,20,000", margin: "25.0%" },
];

export default function MarginReportPage() {
    return (
        <ModulePage
            title="Profit Margin Report"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Avg Margin", value: "20.1%", color: "#10b981" },
                { label: "Best Order Margin", value: "25.0%", color: "#3b82f6" },
                { label: "Total Revenue", value: "₹28.6L", color: "#f97316" },
                { label: "Total Profit", value: "₹5.7L", color: "#f59e0b" }
            ]}
        />
    );
}
