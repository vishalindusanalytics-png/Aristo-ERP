"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Proforma ID" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount" },
    { key: "bags", label: "Bag Description" },
    { key: "issued", label: "Issued On" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Approved" ? "green" : v === "Issued" ? "blue" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Proforma ID", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "amount", label: "Proforma Amount (₹)", type: "number" as const, placeholder: "e.g. 450000", required: true },
    { key: "bags", label: "Product Summary", placeholder: "e.g. SOS 12×4×10 120GSM", required: true },
    { key: "issued", label: "Issuance Date", type: "date" as const, required: true },
    {
        key: "status", label: "Approval Status", type: "select" as const,
        options: ["Pending", "Issued", "Verified", "Approved", "Cancelled"],
        required: true
    },
    { key: "paymentTerms", label: "Advance % Required", type: "number" as const, placeholder: "e.g. 50", required: false },
];

const initialRows = [
    { id: "PI-2401", customer: "TechCorp Global", amount: "4,50,000", bags: "SOS 12×4×10 120GSM", issued: "2026-02-24", status: "Approved" },
    { id: "PI-2402", customer: "Green Mart", amount: "2,10,000", bags: "Flat Handle 8×3×12 100GSM", issued: "2026-02-22", status: "Issued" },
    { id: "PI-2403", customer: "Luxe Boutique", amount: "1,82,000", bags: "Twisted 15×5×15 150GSM", issued: "2026-02-20", status: "Pending" },
];

export default function ProformaPage() {
    return (
        <ModulePage
            title="Proforma Invoice"
            addLabel="New Proforma"
            idPrefix="PI-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Pending", value: "3", color: "#f59e0b" },
                { label: "Issued", value: "9", color: "#3b82f6" },
                { label: "Approved", value: "14", color: "#10b981" },
                { label: "Total Value", value: "₹8.4L", color: "#f97316" },
            ]}
        />
    );
}
