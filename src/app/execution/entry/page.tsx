"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "entryId", label: "Entry ID" },
    { key: "orderId", label: "Order ID" },
    { key: "machine", label: "Machine" },
    { key: "shift", label: "Shift" },
    { key: "produced", label: "Produced (Pcs)" },
    { key: "rejected", label: "Rejected" },
    { key: "date", label: "Date" },
];

const fields = [
    { key: "entryId", label: "Entry ID", required: true },
    { key: "orderId", label: "Order ID (PO Reference)", placeholder: "e.g. PO-2401", required: true },
    {
        key: "machine", label: "Machine", type: "select" as const,
        options: ["M-01", "M-02", "M-03", "M-04", "M-05", "M-06"],
        required: true
    },
    {
        key: "shift", label: "Working Shift", type: "select" as const,
        options: ["Morning", "Afternoon", "Night"],
        required: true
    },
    { key: "produced", label: "Produced Qty (Pcs)", type: "number" as const, placeholder: "e.g. 10000", required: true },
    { key: "rejected", label: "Rejected Qty (Pcs)", type: "number" as const, placeholder: "e.g. 50", required: true },
    { key: "date", label: "Production Date", type: "date" as const, required: true },
    { key: "operator", label: "Operator Name", placeholder: "e.g. Rahul Singh", required: true },
    { key: "remarks", label: "Production Remarks", type: "textarea" as const, required: false },
];

const initialRows = [
    { entryId: "PE-0441", orderId: "PO-2401", machine: "M-01", shift: "Morning", produced: "21,000", rejected: "120", date: "2026-02-26" },
    { entryId: "PE-0442", orderId: "PO-2401", machine: "M-01", shift: "Afternoon", produced: "18,500", rejected: "84", date: "2026-02-26" },
    { entryId: "PE-0443", orderId: "PO-2400", machine: "M-04", shift: "Night", produced: "8,200", rejected: "48", date: "2026-02-25" },
];

export default function ProductionEntryPage() {
    return (
        <ModulePage
            title="Production Entry"
            addLabel="New Production Log"
            idPrefix="PE-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Today's Output", value: "39,500", color: "#10b981" },
                { label: "Total Rejected", value: "204", color: "#ef4444" },
                { label: "Shifts Logged", value: "3", color: "#3b82f6" },
                { label: "Rejection %", value: "0.51%", color: "#f59e0b" },
            ]}
        />
    );
}
