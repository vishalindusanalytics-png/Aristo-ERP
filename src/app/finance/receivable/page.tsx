"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "customer", label: "Customer" },
    { key: "invoices", label: "Open Invoices" },
    { key: "total", label: "Total Due" },
    { key: "overdue", label: "Overdue" },
    { key: "days", label: "Oldest (Days)" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Current" ? "green" : v === "1-30 Days" ? "blue" : v === "31-60 Days" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "customer", label: "Customer Name", required: true },
    { key: "invoices", label: "Number of Open Invoices", type: "number" as const, placeholder: "e.g. 2", required: true },
    { key: "total", label: "Total Outstanding (₹)", type: "number" as const, placeholder: "e.g. 531000", required: true },
    { key: "overdue", label: "Overdue Amount (₹)", type: "number" as const, placeholder: "e.g. 83000", required: true },
    { key: "days", label: "Days Since Oldest Invoice", type: "number" as const, placeholder: "e.g. 45", required: true },
    {
        key: "status", label: "Aging Bracket", type: "select" as const,
        options: ["Current", "1-30 Days", "31-60 Days", ">60 Days"],
        required: true
    },
    { key: "followUp", label: "Last Follow-up Date", type: "date" as const, required: false },
    { key: "remarks", label: "Collection Remarks", type: "textarea" as const, required: false },
];

const initialRows = [
    { customer: "TechCorp Global", invoices: "1", total: "5,31,000", overdue: "0", days: "2", status: "Current" },
    { customer: "Luxe Boutique", invoices: "1", total: "2,14,760", overdue: "2,14,760", days: "28", status: "1-30 Days" },
    { customer: "Swift Logistics", invoices: "2", total: "9,84,000", overdue: "4,92,000", days: "45", status: "31-60 Days" },
    { customer: "Eco Friendly Co", invoices: "1", total: "1,24,500", overdue: "1,24,500", days: "72", status: ">60 Days" },
];

export default function ReceivableReportPage() {
    return (
        <ModulePage
            title="Receivable"
            addLabel="Add Tracking Entry"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Receivable", value: "₹18.5L", color: "#3b82f6" },
                { label: "Overdue", value: "₹8.3L", color: "#ef4444" },
                { label: "Avg Collection Days", value: "28", color: "#f59e0b" },
                { label: "Customers With Dues", value: "4", color: "#f97316" }
            ]}
        />
    );
}
