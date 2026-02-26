"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "item", label: "Item" },
    { key: "gsm", label: "GSM" },
    { key: "rolls", label: "No. of Rolls" },
    { key: "totalKg", label: "Total Kg" },
    { key: "location", label: "Location" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "OK" ? "green" : v === "Low" ? "yellow" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Stock ID", required: true },
    { key: "item", label: "Material Name", placeholder: "e.g. Kraft Paper Roll", required: true },
    { key: "gsm", label: "GSM", type: "number" as const, placeholder: "e.g. 100", required: false },
    { key: "rolls", label: "No. of Rolls/Units", type: "number" as const, placeholder: "e.g. 12", required: true },
    { key: "totalKg", label: "Total Stock (Kg)", type: "number" as const, placeholder: "e.g. 1100", required: true },
    { key: "location", label: "Warehouse Location", placeholder: "e.g. Rack A-02", required: true },
    {
        key: "status", label: "Stock Status", type: "select" as const,
        options: ["OK", "Low", "Critical", "Reserved"],
        required: true
    },
    { key: "batchNo", label: "Batch/Lot No.", placeholder: "e.g. B-9921", required: false },
];

const initialRows = [
    { id: "STK-001", item: "Kraft Paper Roll", gsm: "80", rolls: "3", totalKg: "250", location: "Rack A-01", status: "Critical" },
    { id: "STK-002", item: "Kraft Paper Roll", gsm: "100", rolls: "12", totalKg: "1,100", location: "Rack A-02", status: "Low" },
    { id: "STK-003", item: "Kraft Paper Roll", gsm: "120", rolls: "42", totalKg: "4,200", location: "Rack B-01", status: "OK" },
    { id: "STK-004", item: "Kraft Paper Roll", gsm: "150", rolls: "68", totalKg: "6,800", location: "Rack B-02", status: "OK" },
    { id: "STK-005", item: "LDPE Film", gsm: "-", rolls: "5", totalKg: "500", location: "Rack C-01", status: "OK" },
];

export default function StockViewPage() {
    return (
        <ModulePage
            title="Stock View"
            addLabel="Add Stock"
            idPrefix="STK-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Stock", value: "12.8T", color: "#3b82f6" },
                { label: "Critical Items", value: "1", color: "#ef4444" },
                { label: "Low Stock", value: "1", color: "#f59e0b" },
                { label: "Stock Value", value: "₹38.4L", color: "#10b981" },
            ]}
        />
    );
}
