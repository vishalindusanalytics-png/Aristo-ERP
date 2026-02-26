"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Dispatch ID" },
    { key: "orderId", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "container", label: "Container" },
    { key: "vehicle", label: "Vehicle No." },
    { key: "dispatchDate", label: "Dispatch Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Dispatched" ? "green" : v === "In Transit" ? "blue" : "yellow"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Dispatch ID", required: true },
    { key: "orderId", label: "Order Reference", placeholder: "e.g. SO-2400", required: true },
    { key: "customer", label: "Customer Name", placeholder: "e.g. Luxe Boutique", required: true },
    { key: "container", label: "Container ID", placeholder: "e.g. CNT-4401", required: true },
    { key: "vehicle", label: "Vehicle Number", placeholder: "e.g. GJ05AC1234", required: true },
    { key: "dispatchDate", label: "Dispatch Date", type: "date" as const, required: true },
    {
        key: "status", label: "Dispatch Status", type: "select" as const,
        options: ["Pending", "Ready to Load", "Dispatched", "In Transit", "Delivered"],
        required: true
    },
    { key: "driverContact", label: "Driver Contact", placeholder: "e.g. +91 98XXX XXXX", required: false },
    { key: "remarks", label: "Dispatch Remarks", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "DIS-0221", orderId: "SO-2400", customer: "Luxe Boutique", container: "CNT-4401", vehicle: "GJ05AC1234", dispatchDate: "2026-02-26", status: "Dispatched" },
    { id: "DIS-0220", orderId: "SO-2399", customer: "TechCorp", container: "CNT-4400", vehicle: "MH12AB5678", dispatchDate: "2026-02-24", status: "In Transit" },
    { id: "DIS-0222", orderId: "SO-2402", customer: "Green Mart", container: "CNT-4402", vehicle: "-", dispatchDate: "2026-03-02", status: "Pending" },
];

export default function DispatchEntryPage() {
    return (
        <ModulePage
            title="Dispatch Entry"
            addLabel="New Dispatch"
            idPrefix="DIS-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Dispatched This Month", value: "8", color: "#10b981" },
                { label: "In Transit", value: "2", color: "#3b82f6" },
                { label: "Pending", value: "3", color: "#f59e0b" },
                { label: "On-Time %", value: "91.2%", color: "#f97316" }
            ]}
        />
    );
}
