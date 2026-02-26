"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Customer ID" },
    { key: "name", label: "Customer Name" },
    { key: "city", label: "City" },
    { key: "gst", label: "GST No." },
    { key: "contact", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "orders", label: "Total Orders" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Customer ID", required: true },
    { key: "name", label: "Customer / Company Name", placeholder: "e.g. TechCorp Global", required: true },
    { key: "contact", label: "Contact Person", placeholder: "e.g. Rajesh Sharma", required: true },
    { key: "phone", label: "Phone", type: "tel" as const, placeholder: "+91 98201 12345", required: true },
    { key: "email", label: "Email", type: "email" as const, placeholder: "contact@company.com", required: false },
    { key: "city", label: "City", placeholder: "e.g. Mumbai", required: true },
    { key: "state", label: "State", type: "select" as const, options: ["Maharashtra", "Gujarat", "Delhi", "Punjab", "Rajasthan", "Tamil Nadu", "Karnataka", "UP", "West Bengal", "Other"], required: true },
    { key: "gst", label: "GST Number", placeholder: "e.g. 27AABCT1234A1Z5", required: false },
    { key: "address", label: "Full Address", type: "textarea" as const, required: false },
    { key: "paymentTerms", label: "Payment Terms", type: "select" as const, options: ["Advance", "30 Days Credit", "45 Days Credit", "60 Days Credit", "COD"], required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Active", "Inactive", "Blacklisted"],
        required: true
    },
];

const initialRows = [
    { id: "CUS-001", name: "TechCorp Global", city: "Mumbai", gst: "27AABCT1234A1Z5", contact: "+91 98201 12345", email: "tc@techcorp.in", orders: "24", status: "Active" },
    { id: "CUS-002", name: "Green Mart Retail", city: "Pune", gst: "27AABCG5678B2Z6", contact: "+91 98201 67890", email: "gm@greenmart.in", orders: "11", status: "Active" },
    { id: "CUS-003", name: "Luxe Boutique", city: "Delhi", gst: "07AAACL9012C3Z7", contact: "+91 98201 34567", email: "luxe@boutique.in", orders: "5", status: "Active" },
    { id: "CUS-004", name: "Swift Logistics", city: "Surat", gst: "24AABCS3456D4Z8", contact: "+91 98201 78901", email: "info@swiftlogistics.in", orders: "8", status: "Active" },
    { id: "CUS-005", name: "Eco Friendly Co", city: "Chennai", gst: "33AABCE7890E5Z9", contact: "+91 98201 23456", email: "eco@ecofriendly.in", orders: "2", status: "Active" },
    { id: "CUS-006", name: "Daily Fresh", city: "Ahmedabad", gst: "24AABCD1122F6Z0", contact: "+91 98201 56789", email: "df@dailyfresh.in", orders: "18", status: "Active" },
];

export default function CustomerMasterPage() {
    return (
        <ModulePage
            title="Customer Master"
            addLabel="Add Customer"
            idPrefix="CUS-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Customers", value: "48", color: "#3b82f6" },
                { label: "Active", value: "44", color: "#10b981" },
                { label: "New This Month", value: "3", color: "#f97316" },
                { label: "Top Revenue", value: "₹28L", color: "#f59e0b" },
            ]}
        />
    );
}
