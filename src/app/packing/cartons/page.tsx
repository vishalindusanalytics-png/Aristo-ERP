"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Config ID" },
    { key: "bagSize", label: "Bag Size" },
    { key: "cartonSize", label: "Carton Size" },
    { key: "pcsPerCarton", label: "Pcs / Carton" },
    { key: "cartonsPerLayer", label: "Cartons/Layer" },
    { key: "layersPerContainer", label: "Layers/40ft" },
];

const fields = [
    { key: "id", label: "Config ID", required: true },
    { key: "bagSize", label: "Bag Size Reference", placeholder: "e.g. 12×4×10 SOS", required: true },
    { key: "cartonSize", label: "Inner Carton Dimensions", placeholder: "e.g. 60×40×30 cm", required: true },
    { key: "pcsPerCarton", label: "Items per Carton", type: "number" as const, placeholder: "e.g. 500", required: true },
    { key: "cartonsPerLayer", label: "Cartons per Pallet Layer", type: "number" as const, placeholder: "e.g. 12", required: true },
    { key: "layersPerContainer", label: "Layers per Container", type: "number" as const, placeholder: "e.g. 8", required: true },
    { key: "grossWeight", label: "Gross Weight/Carton (Kg)", type: "number" as const, placeholder: "e.g. 30", required: false },
    { key: "remarks", label: "Packing Instructions", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "CC-001", bagSize: "12×4×10 SOS", cartonSize: "60×40×30 cm", pcsPerCarton: "500", cartonsPerLayer: "12", layersPerContainer: "8" },
    { id: "CC-002", bagSize: "8×3×12 Flat", cartonSize: "50×35×25 cm", pcsPerCarton: "1,000", cartonsPerLayer: "16", layersPerContainer: "10" },
    { id: "CC-003", bagSize: "15×5×15 Twisted", cartonSize: "75×50×35 cm", pcsPerCarton: "250", cartonsPerLayer: "8", layersPerContainer: "6" },
];

export default function CartonConfigPage() {
    return (
        <ModulePage
            title="Carton Configuration"
            addLabel="New Config"
            idPrefix="CC-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Active Configs", value: "8", color: "#3b82f6" },
                { label: "Bag Sizes Covered", value: "5", color: "#10b981" },
                { label: "Max Container Fill", value: "96.8%", color: "#f97316" },
                { label: "Avg Pcs/Carton", value: "583", color: "#f59e0b" }
            ]}
        />
    );
}
