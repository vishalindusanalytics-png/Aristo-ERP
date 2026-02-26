"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "DT ID" },
    { key: "machine", label: "Machine" },
    { key: "reason", label: "Reason" },
    { key: "duration", label: "Duration (min)" },
    { key: "reportedBy", label: "Reported By" },
    { key: "date", label: "Date" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Resolved" ? "green" : v === "In Progress" ? "orange" : "red"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "Downtime ID", required: true },
    {
        key: "machine", label: "Machine", type: "select" as const,
        options: ["M-01 HighSpeed SOS", "M-02 SOS Line-B", "M-03 Twisted Handle", "M-04 Corrugator A", "M-05 Flat Handle", "M-06 Auto Gluer"],
        required: true
    },
    {
        key: "reason", label: "Downtime Reason", type: "select" as const,
        options: ["Mechanical Failure", "Electrical Issue", "Paper Jam", "Cleaning/Changeover", "No Material", "No Operator", "Power Failure", "Scheduled Maintenance"],
        required: true
    },
    { key: "duration", label: "Duration (Minutes)", type: "number" as const, placeholder: "e.g. 45", required: true },
    { key: "reportedBy", label: "Reported By", placeholder: "e.g. Ram S.", required: true },
    { key: "date", label: "Date", type: "date" as const, required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Reported", "In Progress", "Resolved", "Pending Parts"],
        required: true
    },
    { key: "actionTaken", label: "Action Taken", type: "textarea" as const, required: false },
];

const initialRows = [
    { id: "DT-0111", machine: "M-03 Twisted Handle", reason: "Solenoid valve error", duration: "85", reportedBy: "Ram S.", date: "2026-02-26", status: "In Progress" },
    { id: "DT-0110", machine: "M-05 Flat Handle", reason: "Scheduled maintenance", duration: "240", reportedBy: "Suresh P.", date: "2026-02-25", status: "Resolved" },
    { id: "DT-0109", machine: "M-01 HighSpeed SOS", reason: "Paper jam", duration: "12", reportedBy: "Mohan K.", date: "2026-02-24", status: "Resolved" },
];

export default function DowntimeEntryPage() {
    return (
        <ModulePage
            title="Downtime Entry"
            addLabel="Log Downtime"
            idPrefix="DT-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Active Downtime", value: "1", color: "#ef4444" },
                { label: "Today's DT Hours", value: "1.4h", color: "#f97316" },
                { label: "Resolved Today", value: "2", color: "#10b981" },
                { label: "Avg Resolution", value: "45 min", color: "#3b82f6" }
            ]}
        />
    );
}
