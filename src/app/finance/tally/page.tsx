"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "syncId", label: "Sync ID" },
    { key: "type", label: "Entry Type" },
    { key: "ref", label: "Reference" },
    { key: "amount", label: "Amount" },
    { key: "tallyLedger", label: "Tally Ledger" },
    { key: "syncedAt", label: "Synced At" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Synced" ? "green" : v === "Failed" ? "red" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "syncId", label: "Sync ID", required: true },
    {
        key: "type", label: "Integration Type", type: "select" as const,
        options: ["Sales Invoice", "Purchase Entry", "Payment Received", "Payment Made", "Credit Note", "Debit Note"],
        required: true
    },
    { key: "ref", label: "ERP Reference No.", placeholder: "e.g. INV-2401", required: true },
    { key: "amount", label: "Amount (₹)", type: "number" as const, placeholder: "e.g. 531000", required: true },
    { key: "tallyLedger", label: "Tally Ledger Name", placeholder: "e.g. TechCorp A/c", required: true },
    { key: "syncedAt", label: "Sync Date/Time", placeholder: "e.g. 26 Feb 10:05", required: false },
    {
        key: "status", label: "Sync Status", type: "select" as const,
        options: ["Pending", "Synced", "Failed", "In Queue"],
        required: true
    },
    { key: "errorMessage", label: "Error (if any)", type: "textarea" as const, required: false },
];

const initialRows = [
    { syncId: "TSY-0441", type: "Sales Invoice", ref: "INV-2401", amount: "5,31,000", tallyLedger: "TechCorp A/c", syncedAt: "26 Feb 10:05", status: "Synced" },
    { syncId: "TSY-0442", type: "Purchase Entry", ref: "PUR-1101", amount: "1,96,800", tallyLedger: "Balkrishna Papers A/c", syncedAt: "26 Feb 10:06", status: "Synced" },
    { syncId: "TSY-0440", type: "Sales Invoice", ref: "INV-2400", amount: "2,47,800", tallyLedger: "Green Mart A/c", syncedAt: "25 Feb 11:20", status: "Synced" },
    { syncId: "TSY-0443", type: "Purchase Entry", ref: "PUR-1099", amount: "60,000", tallyLedger: "National Poly A/c", syncedAt: "-", status: "Pending" },
];

export default function TallySyncPage() {
    return (
        <ModulePage
            title="Tally Sync Log"
            addLabel="Log Sync Entry"
            idPrefix="TSY-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Synced Today", value: "3", color: "#10b981" },
                { label: "Pending Sync", value: "1", color: "#f59e0b" },
                { label: "Failed", value: "0", color: "#ef4444" },
                { label: "Last Sync", value: "10:06 AM", color: "#3b82f6" }
            ]}
        />
    );
}
