"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "vendor", label: "Vendor" },
    { key: "bills", label: "Open Bills" },
    { key: "total", label: "Total Payable" },
    { key: "overdue", label: "Overdue" },
    { key: "days", label: "Oldest (Days)" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Current" ? "green" : v === "Due Soon" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "vendor", label: "Vendor Name", required: true },
    { key: "bills", label: "Number of Unpaid Bills", type: "number" as const, placeholder: "e.g. 1", required: true },
    { key: "total", label: "Total Payable (₹)", type: "number" as const, placeholder: "e.g. 196800", required: true },
    { key: "overdue", label: "Overdue Amount (₹)", type: "number" as const, placeholder: "e.g. 0", required: true },
    { key: "days", label: "Oldest Bill Age (Days)", type: "number" as const, placeholder: "e.g. 2", required: true },
    {
        key: "status", label: "Priority Status", type: "select" as const,
        options: ["Current", "Due Soon", "Overdue", "On Hold"],
        required: true
    },
    { key: "paymentScheduled", label: "Scheduled Payment Date", type: "date" as const, required: false },
    { key: "remarks", label: "Payment Notes", type: "textarea" as const, required: false },
];

const initialRows = [
    { vendor: "Balkrishna Papers", bills: "1", total: "1,96,800", overdue: "0", days: "2", status: "Current" },
    { vendor: "National Poly", bills: "1", total: "60,000", overdue: "0", days: "5", status: "Due Soon" },
    { vendor: "Flint Group", bills: "2", total: "45,000", overdue: "22,500", days: "38", status: "Overdue" },
];

export default function PayableReportPage() {
    return (
        <ModulePage
            title="Payable"
            addLabel="Add Tracking Entry"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Payable", value: "₹3.0L", color: "#ef4444" },
                { label: "Overdue", value: "₹22,500", color: "#f97316" },
                { label: "Due This Week", value: "₹60,000", color: "#f59e0b" },
                { label: "Vendors", value: "3", color: "#3b82f6" }
            ]}
        />
    );
}
