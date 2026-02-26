"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "item", label: "Item" },
    { key: "gsm", label: "GSM" },
    { key: "openStock", label: "Opening Stock (Kg)" },
    { key: "received", label: "Received (Kg)" },
    { key: "consumed", label: "Consumed (Kg)" },
    { key: "closeStock", label: "Closing Stock (Kg)" },
    { key: "value", label: "Stock Value" },
];

const fields = [
    { key: "item", label: "Material Item", required: true },
    { key: "gsm", label: "GSM / Grade", placeholder: "e.g. 120", required: false },
    { key: "openStock", label: "Opening Stock (Kg)", type: "number" as const, placeholder: "e.g. 1000", required: true },
    { key: "received", label: "Inward/Received (Kg)", type: "number" as const, placeholder: "e.g. 2400", required: true },
    { key: "consumed", label: "Outward/Consumed (Kg)", type: "number" as const, placeholder: "e.g. 2000", required: true },
    { key: "closeStock", label: "Closing Balance (Kg)", type: "number" as const, placeholder: "e.g. 1400", required: true },
    { key: "value", label: "Inventory Value (₹)", type: "number" as const, placeholder: "e.g. 344400", required: true },
];

const initialRows = [
    { item: "Kraft Paper Roll", gsm: "80", openStock: "1,000", received: "0", consumed: "750", closeStock: "250", value: "15,000" },
    { item: "Kraft Paper Roll", gsm: "100", openStock: "1,600", received: "1,800", consumed: "2,300", closeStock: "1,100", value: "74,800" },
    { item: "Kraft Paper Roll", gsm: "120", openStock: "3,800", received: "2,400", consumed: "2,000", closeStock: "4,200", value: "3,44,400" },
    { item: "Kraft Paper Roll", gsm: "150", openStock: "7,200", received: "0", consumed: "400", closeStock: "6,800", value: "7,14,000" },
    { item: "LDPE Film", gsm: "-", openStock: "450", received: "500", consumed: "450", closeStock: "500", value: "60,000" },
];

export default function InventoryReportPage() {
    return (
        <ModulePage
            title="Inventory Movement Report"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Stock Value", value: "₹12.1L", color: "#3b82f6" },
                { label: "Consumed This Month", value: "5.9T", color: "#f97316" },
                { label: "Received", value: "4.7T", color: "#10b981" },
                { label: "Net Movement", value: "-1.2T", color: "#ef4444" }
            ]}
        />
    );
}
