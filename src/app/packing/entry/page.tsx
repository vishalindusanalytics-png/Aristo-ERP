"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Packing ID" },
    { key: "orderId", label: "Order ID" },
    { key: "batchId", label: "Batch" },
    { key: "pcsPerCarton", label: "Pcs/Carton" },
    { key: "cartonsProduced", label: "Cartons Packed" },
    { key: "totalPcs", label: "Total Pcs" },
    { key: "date", label: "Date" },
];

const fields = [
    { key: "id", label: "Packing ID", required: true },
    { key: "orderId", label: "Order ID", placeholder: "e.g. PO-2400", required: true },
    { key: "batchId", label: "Batch Reference", placeholder: "e.g. BT-0880", required: true },
    { key: "pcsPerCarton", label: "Pcs per Carton", type: "number" as const, placeholder: "e.g. 500", required: true },
    { key: "cartonsProduced", label: "Number of Cartons", type: "number" as const, placeholder: "e.g. 16", required: true },
    { key: "totalPcs", label: "Total Quantity (Pcs)", type: "number" as const, placeholder: "e.g. 8000", required: true },
    { key: "packer", label: "Packer Name", placeholder: "e.g. Manish", required: true },
    { key: "date", label: "Packing Date", type: "date" as const, required: true },
    { key: "remarks", label: "Packing Remarks", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "PK-0441", orderId: "PO-2400", batchId: "BT-0880", pcsPerCarton: "500", cartonsProduced: "16", totalPcs: "8,000", date: "2026-02-26" },
    { id: "PK-0440", orderId: "PO-2399", batchId: "BT-0879", pcsPerCarton: "1,000", cartonsProduced: "5", totalPcs: "5,000", date: "2026-02-25" },
    { id: "PK-0439", orderId: "PO-2398", batchId: "BT-0878", pcsPerCarton: "250", cartonsProduced: "48", totalPcs: "12,00,000", date: "2026-02-24" },
];

export default function PackingEntryPage() {
    return (
        <ModulePage
            title="Packing Entry"
            addLabel="New Packing Entry"
            idPrefix="PK-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Packed Today", value: "24,000 Pcs", color: "#10b981" },
                { label: "Cartons Packed", value: "69", color: "#3b82f6" },
                { label: "Orders Completed", value: "2", color: "#f97316" },
                { label: "Pending Packing", value: "3", color: "#f59e0b" }
            ]}
        />
    );
}
