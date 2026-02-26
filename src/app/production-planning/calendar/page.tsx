"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "date", label: "Date" },
    { key: "machine", label: "Machine" },
    { key: "shift", label: "Shift" },
    { key: "plannedHrs", label: "Planned Hrs" },
    { key: "availableHrs", label: "Available Hrs" },
    {
        key: "utilization", label: "Utilization", render: (v: string | number) => {
            const num = Number(String(v).replace('%', ''));
            return (
                <span className={`badge badge-${num > 85 ? "green" : num > 60 ? "orange" : "red"}`}>{v}</span>
            );
        }
    },
];

const fields = [
    { key: "date", label: "Planning Date", type: "date" as const, required: true },
    {
        key: "machine", label: "Machine", type: "select" as const,
        options: ["HighSpeed SOS", "SOS Line-B", "Twisted Handle", "Auto Gluer", "Corrugator A", "Flat Handle"],
        required: true
    },
    {
        key: "shift", label: "Shift", type: "select" as const,
        options: ["Morning", "Afternoon", "Night"],
        required: true
    },
    { key: "plannedHrs", label: "Planned Production (Hrs)", type: "number" as const, placeholder: "e.g. 8", required: true },
    { key: "availableHrs", label: "Actual Available (Hrs)", type: "number" as const, placeholder: "e.g. 7.5", required: true },
    { key: "utilization", label: "Utilization %", placeholder: "e.g. 92%", required: false },
    { key: "maintenanceNote", label: "Maintenance Downtime Note", type: "textarea" as const, required: false },
];

const initialRows = [
    { date: "2026-02-26", machine: "HighSpeed SOS", shift: "Morning", plannedHrs: "8", availableHrs: "8", utilization: "92%" },
    { date: "2026-02-26", machine: "SOS Line-B", shift: "Morning", plannedHrs: "8", availableHrs: "7.5", utilization: "88%" },
    { date: "2026-02-26", machine: "Twisted Handle", shift: "Afternoon", plannedHrs: "8", availableHrs: "4", utilization: "45%" },
    { date: "2026-02-27", machine: "Auto Gluer", shift: "Morning", plannedHrs: "8", availableHrs: "8", utilization: "74%" },
    { date: "2026-02-27", machine: "Corrugator A", shift: "Night", plannedHrs: "8", availableHrs: "8", utilization: "98%" },
];

export default function CapacityCalendarPage() {
    return (
        <ModulePage
            title="Capacity Calendar"
            addLabel="Add Plan Entry"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Planned Today", value: "5 Shifts", color: "#3b82f6" },
                { label: "Avg Utilization", value: "79.4%", color: "#10b981" },
                { label: "Blocked Hours", value: "4h", color: "#f59e0b" },
                { label: "Idle Machines", value: "1", color: "#ef4444" },
            ]}
        />
    );
}
