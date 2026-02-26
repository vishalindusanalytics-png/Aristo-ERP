"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Purchase ID" },
    { key: "vendor", label: "Vendor" },
    { key: "item", label: "Item" },
    { key: "qty", label: "Qty (Kg)" },
    { key: "rate", label: "Rate/Kg" },
    { key: "total", label: "Total (₹)" },
    { key: "date", label: "Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Paid" ? "green" : v === "Pending" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Purchase ID", required: true },
    { key: "vendor", label: "Vendor Name", placeholder: "e.g. Balkrishna Papers", required: true },
    { key: "item", label: "Material / Item", placeholder: "e.g. Kraft Paper 120GSM", required: true },
    { key: "qty", label: "Quantity (Kg/Unit)", type: "number" as const, placeholder: "e.g. 2400", required: true },
    { key: "rate", label: "Rate per Unit (₹)", type: "number" as const, placeholder: "e.g. 82", required: true },
    { key: "total", label: "Total Amount (₹)", type: "number" as const, placeholder: "e.g. 196800", required: true },
    { key: "date", label: "Purchase Date", type: "date" as const, required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Pending", "Partially Paid", "Paid", "Cancelled"],
        required: true
    },
    { key: "invoiceRef", label: "Supplier Invoice Ref", placeholder: "e.g. INV-2324/001", required: false },
    { key: "paymentDueDate", label: "Payment Due Date", type: "date" as const, required: false },
];

const initialRows = [
    { id: "PUR-1101", vendor: "Balkrishna Papers", item: "Kraft Paper 120GSM", qty: "2,400", rate: "82", total: "1,96,800", date: "2026-02-24", status: "Pending" },
    { id: "PUR-1100", vendor: "Shree Papers Ltd", item: "Kraft Paper 100GSM", qty: "1,800", rate: "68", total: "1,22,400", date: "2026-02-22", status: "Paid" },
    { id: "PUR-1099", vendor: "National Poly", item: "LDPE Film", qty: "500", rate: "120", total: "60,000", date: "2026-02-21", status: "Pending" },
];

export default function PurchaseEntryPage() {
    return (
        <ModulePage
            title="Purchase"
            addLabel="New Purchase"
            idPrefix="PUR-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Purchases This Month", value: "₹3.8L", color: "#3b82f6" },
                { label: "Pending Payments", value: "₹2.6L", color: "#f59e0b" },
                { label: "Paid", value: "₹1.2L", color: "#10b981" },
                { label: "Vendors", value: "5", color: "#f97316" }
            ]}
        />
    );
}
