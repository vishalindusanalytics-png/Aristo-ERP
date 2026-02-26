"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Vendor ID" },
    { key: "name", label: "Vendor Name" },
    { key: "category", label: "Category" },
    { key: "city", label: "City" },
    { key: "gst", label: "GST No." },
    { key: "paymentTerms", label: "Payment Terms" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Vendor ID", required: true },
    { key: "name", label: "Vendor / Company Name", placeholder: "e.g. Balkrishna Papers", required: true },
    {
        key: "category", label: "Vendor Category", type: "select" as const,
        options: ["Raw Material", "Packaging", "Inks", "Consumables", "Machinery", "Services"],
        required: true
    },
    { key: "contactPerson", label: "Contact Person", placeholder: "e.g. Rajesh Kumar", required: true },
    { key: "phone", label: "Phone Number", type: "tel" as const, placeholder: "+91 98200 12345", required: true },
    { key: "email", label: "Email Address", type: "email" as const, placeholder: "sales@vendor.com", required: false },
    { key: "city", label: "City", placeholder: "e.g. Surat", required: true },
    { key: "gst", label: "GST Number", placeholder: "e.g. 24AABCB1234A1Z5", required: true },
    {
        key: "paymentTerms", label: "Payment Terms", type: "select" as const,
        options: ["Immediate", "Net 15", "Net 30", "Net 45", "Net 60", "LC", "Advance"],
        required: true
    },
    { key: "bankDetails", label: "Bank Account Details", type: "textarea" as const, required: false },
    {
        key: "status", label: "Vendor Status", type: "select" as const,
        options: ["Active", "Inactive", "On Hold"],
        required: true
    },
];

const initialRows = [
    { id: "VEN-001", name: "Balkrishna Papers", category: "Raw Material", city: "Surat", gst: "24AABCB1234A1Z5", paymentTerms: "Net 30", status: "Active" },
    { id: "VEN-002", name: "Shree Papers Ltd", category: "Raw Material", city: "Ahmedabad", gst: "24AABCS5678B2Z6", paymentTerms: "Net 45", status: "Active" },
    { id: "VEN-003", name: "National Poly", category: "Packaging", city: "Mumbai", gst: "27AABCN9012C3Z7", paymentTerms: "Net 30", status: "Active" },
    { id: "VEN-004", name: "Sun Chemical", category: "Inks", city: "Pune", gst: "27AABCS3456D4Z8", paymentTerms: "Net 60", status: "Active" },
    { id: "VEN-005", name: "Flint Group", category: "Inks", city: "Delhi", gst: "07AABCF7890E5Z9", paymentTerms: "Net 60", status: "Active" },
];

export default function VendorMasterPage() {
    return (
        <ModulePage
            title="Vendor Master"
            addLabel="Add Vendor"
            idPrefix="VEN-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Vendors", value: "12", color: "#3b82f6" },
                { label: "Active", value: "10", color: "#10b981" },
                { label: "RM Vendors", value: "4", color: "#f97316" },
                { label: "New This Year", value: "2", color: "#f59e0b" },
            ]}
        />
    );
}
