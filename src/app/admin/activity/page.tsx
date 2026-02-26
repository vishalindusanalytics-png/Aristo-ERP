"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "Log ID" },
    { key: "user", label: "User" },
    { key: "action", label: "Action" },
    { key: "module", label: "Module" },
    { key: "details", label: "Details" },
    { key: "ip", label: "IP Address" },
    { key: "time", label: "Timestamp" },
];

const fields = [
    { key: "id", label: "Log ID", required: true },
    { key: "user", label: "User Name", required: true },
    { key: "action", label: "Performed Action", required: true },
    { key: "module", label: "Target Module", required: true },
    { key: "details", label: "Action Details", type: "textarea" as const, required: true },
    { key: "ip", label: "IP Address", placeholder: "e.g. 192.168.1.10", required: false },
    { key: "time", label: "Event Time", placeholder: "e.g. 26 Feb, 10:02 AM", required: true },
];

const initialRows = [
    { id: "LOG-4401", user: "Vishal Pushpad", action: "Login", module: "Auth", details: "Successful login", ip: "192.168.1.10", time: "26 Feb, 10:02 AM" },
    { id: "LOG-4402", user: "Vishal Pushpad", action: "Create", module: "Sales - Inquiry", details: "Created INQ-2406", ip: "192.168.1.10", time: "26 Feb, 10:12 AM" },
    { id: "LOG-4403", user: "Ravi Kumar", action: "Update", module: "Production Entry", details: "Updated PE-0441", ip: "192.168.1.14", time: "26 Feb, 10:35 AM" },
    { id: "LOG-4404", user: "Suresh Patel", action: "Create", module: "QC - Final QC", details: "Certified BT-0881", ip: "192.168.1.18", time: "26 Feb, 11:00 AM" },
    { id: "LOG-4405", user: "Anita Shah", action: "Create", module: "Sales - Quotation", details: "Created QT-2406", ip: "192.168.1.22", time: "26 Feb, 11:30 AM" },
    { id: "LOG-4406", user: "Mohan Joshi", action: "Login", module: "Auth", details: "Successful login", ip: "192.168.1.25", time: "26 Feb, 07:00 AM" },
];

export default function ActivityLogPage() {
    return (
        <ModulePage
            title="Activity Audit Log"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Actions Today", value: "48", color: "#3b82f6" },
                { label: "Active Users", value: "4", color: "#10b981" },
                { label: "Failed Logins", value: "0", color: "#ef4444" },
                { label: "Last Activity", value: "11:30 AM", color: "#f97316" }
            ]}
        />
    );
}
