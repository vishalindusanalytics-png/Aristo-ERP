"use client";
import ModulePage from "@/components/layout/ModulePage";

const columns = [
    { key: "roleId", label: "Role ID" },
    { key: "roleName", label: "Role Name" },
    { key: "department", label: "Department" },
    { key: "users", label: "No. of Users" },
    { key: "permissions", label: "Permissions Count" },
    {
        key: "status", label: "Status", render: (v: string | number) => (
            <span className={`badge badge-${v === "Active" ? "green" : "gray"}`}>{v}</span>
        )
    },
];

const fields = [
    { key: "roleId", label: "Role ID", required: true },
    { key: "roleName", label: "Role Title", placeholder: "e.g. Senior Production Manager", required: true },
    {
        key: "department", label: "Primary Department", type: "select" as const,
        options: ["All", "Management", "Production", "Quality", "Sales", "Finance", "Logistics"],
        required: true
    },
    { key: "users", label: "Current User Count", type: "number" as const, placeholder: "0", required: false },
    { key: "permissions", label: "Count of Assigned Rights", type: "number" as const, placeholder: "e.g. 24", required: true },
    {
        key: "status", label: "Status", type: "select" as const,
        options: ["Active", "Inactive"],
        required: true
    },
    { key: "description", label: "Role Description", type: "textarea" as const, required: false },
];

const initialRows = [
    { roleId: "ROL-001", roleName: "Super Admin", department: "All", users: "1", permissions: "150", status: "Active" },
    { roleId: "ROL-002", roleName: "Production Manager", department: "Production", users: "2", permissions: "48", status: "Active" },
    { roleId: "ROL-003", roleName: "QC Supervisor", department: "Quality", users: "3", permissions: "22", status: "Active" },
    { roleId: "ROL-004", roleName: "Sales Executive", department: "Sales", users: "4", permissions: "18", status: "Active" },
    { roleId: "ROL-005", roleName: "Machine Operator", department: "Production", users: "8", permissions: "6", status: "Active" },
    { roleId: "ROL-006", roleName: "Finance Officer", department: "Finance", users: "2", permissions: "24", status: "Active" },
    { roleId: "ROL-007", roleName: "Viewer", department: "All", users: "3", permissions: "5", status: "Active" },
];

export default function RoleSetupPage() {
    return (
        <ModulePage
            title="Role Setup"
            addLabel="Create New Role"
            idPrefix="ROL-"
            columns={columns}
            fields={fields}
            initialRows={initialRows}
            stats={[
                { label: "Total Roles", value: "7", color: "#3b82f6" },
                { label: "Active", value: "7", color: "#10b981" },
                { label: "Total Permissions", value: "180", color: "#f97316" },
                { label: "Custom Roles", value: "5", color: "#f59e0b" }
            ]}
        />
    );
}
