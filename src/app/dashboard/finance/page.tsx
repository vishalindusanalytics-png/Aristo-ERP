"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "type", label: "Entry Type" },
    { key: "ref", label: "Reference" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Paid" ? "green" : v === "Pending" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    {
        key: "type", label: "Financial Category", type: "select" as const,
        options: ["Sales Invoice", "Purchase Entry", "Payable", "Receivable", "Expense"],
        required: true
    },
    { key: "ref", label: "Doc Reference", placeholder: "e.g. INV-2401", required: true },
    { key: "amount", label: "Total Value (₹)", type: "number" as const, placeholder: "e.g. 450000", required: true },
    { key: "date", label: "Transaction Date", type: "date" as const, required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Paid", "Pending", "Overdue", "Cancelled"],
        required: true
    },
];

const initialRows = [
    { type: "Sales Invoice", ref: "INV-2401", amount: "4,50,000", date: "2026-02-24", status: "Paid" },
    { type: "Purchase Entry", ref: "PUR-1102", amount: "2,10,000", date: "2026-02-23", status: "Pending" },
    { type: "Sales Invoice", ref: "INV-2400", amount: "1,82,000", date: "2026-02-22", status: "Paid" },
    { type: "Payable", ref: "VEN-0091", amount: "75,000", date: "2026-02-21", status: "Overdue" },
    { type: "Receivable", ref: "CUS-3302", amount: "8,20,000", date: "2026-02-20", status: "Pending" },
];

export default function FinanceSnapshotPage() {
    return (
        <ModulePage
            title="Finance Snapshot"
            addLabel="Log Transaction"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Receivables", value: "₹16.7L", color: "#10b981" },
                { label: "Payables", value: "₹8.2L", color: "#ef4444" },
                { label: "Overdue Invoices", value: "3", color: "#f59e0b" },
                { label: "Net Balance", value: "₹8.5L", color: "#3b82f6" },
            ]}
        />
    );
}
