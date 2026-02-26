"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "grnId", label: "GRN ID" },
    { key: "vendor", label: "Vendor" },
    { key: "item", label: "Item" },
    { key: "gsm", label: "GSM" },
    { key: "qty", label: "Qty (Kg)" },
    { key: "date", label: "Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Accepted" ? "green" : v === "Pending" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "grnId", label: "GRN ID", required: true },
    { key: "vendor", label: "Vendor Name", placeholder: "e.g. Balkrishna Papers", required: true },
    { key: "poRef", label: "Purchase Order Ref", placeholder: "e.g. PO-7701", required: false },
    { key: "item", label: "Item Name", placeholder: "e.g. Kraft Paper Roll", required: true },
    { key: "gsm", label: "GSM", type: "number" as const, placeholder: "e.g. 120", required: false },
    { key: "qty", label: "Quantity Received (Kg)", type: "number" as const, placeholder: "e.g. 2400", required: true },
    { key: "invoiceNo", label: "Supplier Invoice No.", placeholder: "e.g. INV-1234", required: true },
    { key: "date", label: "Received Date", type: "date" as const, required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Pending", "Accepted", "Rejected", "Partial"],
        required: true
    },
    { key: "remarks", label: "Inspection Remarks", type: "textarea" as const, required: false },
];

const initialRows = [
    { grnId: "GRN-1101", vendor: "Balkrishna Papers", item: "Kraft Paper Roll", gsm: "120", qty: "2,400", date: "2026-02-24", status: "Accepted" },
    { grnId: "GRN-1102", vendor: "Shree Papers Ltd", item: "Kraft Paper Roll", gsm: "100", qty: "1,800", date: "2026-02-22", status: "Accepted" },
    { grnId: "GRN-1103", vendor: "National Poly", item: "LDPE Film", gsm: "-", qty: "500", date: "2026-02-21", status: "Pending" },
    { grnId: "GRN-1104", vendor: "Balkrishna Papers", item: "Kraft Paper Roll", gsm: "80", qty: "3,000", date: "2026-02-20", status: "Rejected" },
];

export default function GRNEntryPage() {
    return (
        <ModulePage
            title="GRN Entry"
            addLabel="New GRN"
            idPrefix="GRN-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "GRNs This Month", value: "18", color: "#3b82f6" },
                { label: "Total Qty Received", value: "7.7T", color: "#10b981" },
                { label: "Pending Inspection", value: "2", color: "#f59e0b" },
                { label: "Rejected", value: "1", color: "#ef4444" },
            ]}
        />
    );
}
