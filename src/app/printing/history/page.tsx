"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Print Job ID" },
    { key: "orderId", label: "Order ID" },
    { key: "design", label: "Design" },
    { key: "machine", label: "Machine" },
    { key: "pcsProduced", label: "Pcs Printed" },
    { key: "inkUsed", label: "Ink Used (Kg)" },
    { key: "date", label: "Date" },
];

const fields = [
    { key: "id", label: "Job ID", required: true },
    { key: "orderId", label: "PO Reference", placeholder: "e.g. PO-2401", required: true },
    { key: "design", label: "Design Printed", placeholder: "e.g. TechCorp Logo v2", required: true },
    {
        key: "machine", label: "Printing Machine", type: "select" as const,
        options: ["M-01", "M-02", "M-03", "M-04", "M-05", "M-06"],
        required: true
    },
    { key: "pcsProduced", label: "Quantity Printed (Pcs)", type: "number" as const, placeholder: "e.g. 10000", required: true },
    { key: "inkUsed", label: "Total Ink Consumed (Kg)", type: "number" as const, placeholder: "e.g. 2.4", required: true },
    { key: "date", label: "Print Date", type: "date" as const, required: true },
    { key: "operator", label: "Press Operator", placeholder: "e.g. Amit P.", required: true },
    { key: "wastageKg", label: "Dross/Waste Ink (Kg)", type: "number" as const, placeholder: "e.g. 0.2", required: false },
];

const initialRows = [
    { id: "PJ-0441", orderId: "PO-2401", design: "TechCorp Logo v2", machine: "M-01", pcsProduced: "10,000", inkUsed: "2.4", date: "2026-02-26" },
    { id: "PJ-0440", orderId: "PO-2400", design: "Green Mart Pattern", machine: "M-02", pcsProduced: "8,000", inkUsed: "1.8", date: "2026-02-25" },
    { id: "PJ-0439", orderId: "PO-2398", design: "Luxe Foil Print", machine: "M-01", pcsProduced: "12,000", inkUsed: "3.2", date: "2026-02-24" },
    { id: "PJ-0438", orderId: "PO-2397", design: "Daily Fresh v3", machine: "M-02", pcsProduced: "50,000", inkUsed: "8.6", date: "2026-02-23" },
];

export default function PrintHistoryPage() {
    return (
        <ModulePage
            title="Print History"
            addLabel="New Print Job"
            idPrefix="PJ-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Jobs This Month", value: "18", color: "#3b82f6" },
                { label: "Total Pcs Printed", value: "80,000", color: "#10b981" },
                { label: "Ink Consumed", value: "16 Kg", color: "#f97316" },
                { label: "Avg Ink/1000 Pcs", value: "0.2 Kg", color: "#f59e0b" }
            ]}
        />
    );
}
