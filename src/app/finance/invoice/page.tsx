"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Invoice ID" },
    { key: "customer", label: "Customer" },
    { key: "orderId", label: "Order ID" },
    { key: "amount", label: "Amount" },
    { key: "gst", label: "GST" },
    { key: "total", label: "Total" },
    { key: "dueDate", label: "Due Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Paid" ? "green" : v === "Overdue" ? "red" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Invoice ID", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "orderId", label: "Sales Order Ref", placeholder: "e.g. SO-2400", required: true },
    { key: "amount", label: "Taxable Amount (₹)", type: "number" as const, placeholder: "e.g. 450000", required: true },
    { key: "gst", label: "GST Amount (18%) (₹)", type: "number" as const, placeholder: "e.g. 81000", required: true },
    { key: "total", label: "Total Amount (₹)", type: "number" as const, placeholder: "e.g. 531000", required: true },
    { key: "dueDate", label: "Due Date", type: "date" as const, required: true },
    {
        key: "status", label: "Payment Status", type: "select" as const,
        options: ["Unpaid", "Paid", "Partially Paid", "Overdue", "Cancelled"],
        required: true
    },
    { key: "paymentDate", label: "Payment Date", type: "date" as const, required: false },
    { key: "remarks", label: "Invoicing Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "INV-2401", customer: "TechCorp Global", orderId: "SO-2400", amount: "4,50,000", gst: "81,000", total: "5,31,000", dueDate: "2026-03-20", status: "Unpaid" },
    { id: "INV-2400", customer: "Green Mart", orderId: "SO-2399", amount: "2,10,000", gst: "37,800", total: "2,47,800", dueDate: "2026-03-10", status: "Paid" },
    { id: "INV-2399", customer: "Luxe Boutique", orderId: "SO-2398", amount: "1,82,000", gst: "32,760", total: "2,14,760", dueDate: "2026-02-28", status: "Overdue" },
    { id: "INV-2398", customer: "Daily Fresh", orderId: "SO-2397", amount: "12,00,000", gst: "2,16,000", total: "14,16,000", dueDate: "2026-03-05", status: "Paid" },
];

export default function SalesInvoicePage() {
    return (
        <ModulePage
            title="Sales Invoice"
            addLabel="New Invoice"
            idPrefix="INV-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Outstanding", value: "₹7.5L", color: "#ef4444" },
                { label: "Collected This Month", value: "₹16.6L", color: "#10b981" },
                { label: "Overdue", value: "₹2.1L", color: "#f97316" },
                { label: "Invoices Created", value: "14", color: "#3b82f6" }
            ]}
        />
    );
}
