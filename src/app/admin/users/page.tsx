"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "id", label: "User ID" },
    { key: "name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    { key: "lastLogin", label: "Last Login" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "id", label: "User ID", required: true },
    { key: "name", label: "Full Name", placeholder: "e.g. Vishal Pushpad", required: true },
    { key: "email", label: "Email Address", type: "email" as const, placeholder: "e.g. vishal@aristo.com", required: true },
    {
        key: "role", label: "User Role", type: "select" as const,
        options: ["Super Admin", "Production Manager", "QC Supervisor", "Sales Executive", "Machine Operator", "Finance Officer", "Viewer"],
        required: true
    },
    {
        key: "department", label: "Department", type: "select" as const,
        options: ["Management", "Production", "Quality", "Sales", "Finance", "HR", "Maintenance"],
        required: true
    },
    { key: "phone", label: "Mobile Number", type: "tel" as const, placeholder: "+91 XXXX XXXX", required: false },
    {
        key: "status", label: "Account Status", type: "select" as const,
        options: ["Active", "Inactive", "Suspended"],
        required: true
    },
    { key: "password", label: "Initial Password", type: "password" as const, placeholder: "Leave blank to keep current", required: false },
];

const initialRows = [
    { id: "USR-001", name: "Vishal Pushpad", email: "vishal@aristo.com", role: "Super Admin", department: "Management", lastLogin: "2026-02-26", status: "Active" },
    { id: "USR-002", name: "Ravi Kumar", email: "ravi@aristo.com", role: "Production Manager", department: "Production", lastLogin: "2026-02-26", status: "Active" },
    { id: "USR-003", name: "Suresh Patel", email: "suresh@aristo.com", role: "QC Supervisor", department: "Quality", lastLogin: "2026-02-25", status: "Active" },
    { id: "USR-004", name: "Anita Shah", email: "anita@aristo.com", role: "Sales Executive", department: "Sales", lastLogin: "2026-02-26", status: "Active" },
    { id: "USR-005", name: "Mohan Joshi", email: "mohan@aristo.com", role: "Machine Operator", department: "Production", lastLogin: "2026-02-26", status: "Active" },
    { id: "USR-006", name: "Priya Nair", email: "priya@aristo.com", role: "Finance Officer", department: "Finance", lastLogin: "2026-02-24", status: "Inactive" },
];

export default function UserCreationPage() {
    return (
        <ModulePage
            title="User Management"
            addLabel="Add User"
            idPrefix="USR-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Users", value: "12", color: "#3b82f6" },
                { label: "Active", value: "10", color: "#10b981" },
                { label: "Inactive", value: "2", color: "#64748b" },
                { label: "Online Now", value: "4", color: "#f97316" }
            ]}
        />
    );
}
