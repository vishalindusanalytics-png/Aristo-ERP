"use client";
import ModulePage from "@/components/layout/ModulePage";
import SalesPipeline from "@/components/features/SalesPipeline";

const columns = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "value", label: "Order Value" },
    { key: "margin", label: "Margin %" },
    { key: "qtyPcs", label: "Qty (Pcs)" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Confirmed" ? "green" : v === "Quoted" ? "blue" : v === "Inquiry" ? "yellow" : "orange"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Reference ID", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "value", label: "Estimated Value (₹)", type: "number" as const, placeholder: "e.g. 450000", required: true },
    { key: "margin", label: "Projected Margin %", placeholder: "e.g. 18%", required: false },
    { key: "qtyPcs", label: "Quantity (Pcs)", type: "number" as const, placeholder: "e.g. 10000", required: true },
    {
        key: "status", label: "Workflow Stage", type: "select" as const,
        options: ["Inquiry", "Quoted", "Negotiation", "Confirmed", "On Hold"],
        required: true
    },
];

const initialRows = [
    { id: "SO-2401", customer: "TechCorp Global", value: "4,50,000", margin: "18%", qtyPcs: "10,000", status: "Confirmed" },
    { id: "SO-2402", customer: "Green Mart Retail", value: "2,10,000", margin: "22%", qtyPcs: "5,000", status: "Quoted" },
    { id: "SO-2403", customer: "Luxe Boutique", value: "1,80,000", margin: "15%", qtyPcs: "2,000", status: "Inquiry" },
    { id: "SO-2404", customer: "Swift Logistics", value: "8,20,000", margin: "20%", qtyPcs: "25,000", status: "Confirmed" },
    { id: "SO-2405", customer: "Daily Fresh", value: "12,00,000", margin: "25%", qtyPcs: "50,000", status: "Confirmed" },
];

export default function SalesDashboardPage() {
    return (
        <ModulePage
            title="Sales Overview"
            addLabel="New Sales Entry"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            customHeader={<SalesPipeline />}
            stats={[
                { label: "Orders This Month", value: "₹28.6L", color: "#f97316" },
                { label: "Active Orders", value: "24", color: "#3b82f6" },
                { label: "Avg. Margin", value: "20.1%", color: "#10b981" },
                { label: "Pending Quotes", value: "7", color: "#f59e0b" },
            ]}
        />
    );
}
