"use client";

import {
    Search,
    Bell,
    Sun,
    Moon,
    HelpCircle,
    BrainCircuit,
    User,
    ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const routeNames: Record<string, string> = {
    // Dashboard
    "/": "Owner Dashboard",
    "/dashboard/production": "Production Dashboard",
    "/dashboard/sales": "Sales Dashboard",
    "/dashboard/inventory": "Inventory Snapshot",
    "/dashboard/finance": "Finance Snapshot",
    // Sales & Orders
    "/sales/inquiry": "Inquiry",
    "/sales/quotation": "Quotation",
    "/sales/order": "Sales Order",
    "/sales/proforma": "Proforma Invoice",
    "/sales/customers": "Customer Master",
    // Production Planning
    "/production-planning/machines": "Machine Master",
    "/production-planning/calendar": "Capacity Calendar",
    "/production-planning/scheduling": "Order Scheduling",
    "/production-planning/batches": "Batch Planning",
    "/production-planning/release": "Plan Release",
    // Inventory & RM
    "/inventory/grn": "GRN Entry",
    "/inventory/stock": "Stock View (GSM Wise)",
    "/inventory/issue": "Material Issue",
    "/inventory/adjustment": "Stock Adjustment",
    "/inventory/alerts": "Low Stock Alert",
    // Production Execution
    "/execution/orders": "Production Order",
    "/execution/entry": "Production Entry",
    "/execution/wastage": "Wastage Entry",
    "/execution/downtime": "Downtime Entry",
    "/execution/summary": "Production Summary",
    // Quality Control
    "/qc/rm-inspection": "RM Inspection",
    "/qc/in-process": "In-Process QC",
    "/qc/final": "Final QC",
    "/qc/rejection": "Rejection Entry",
    "/qc/report": "QC Report",
    // Packing & Container
    "/packing/cartons": "Carton Configuration",
    "/packing/entry": "Packing Entry",
    "/packing/container": "Container Planning",
    "/packing/loadsheet": "Load Sheet",
    "/packing/dispatch": "Dispatch Entry",
    // Printing & Plate
    "/printing/plates": "Plate Master",
    "/printing/inventory": "Plate Inventory",
    "/printing/cylinders": "Cylinder Mapping",
    "/printing/ink": "Ink Entry",
    "/printing/history": "Print History",
    // Finance & Tally
    "/finance/invoice": "Sales Invoice",
    "/finance/purchase": "Purchase Entry",
    "/finance/tally": "Tally Sync",
    "/finance/receivable": "Receivable Report",
    "/finance/payable": "Payable Report",
    // Reports
    "/reports/orders": "Order Report",
    "/reports/production": "Production Report",
    "/reports/wastage": "Wastage Report",
    "/reports/inventory": "Inventory Report",
    "/reports/margin": "Margin Report",
    // Masters
    "/masters/bag-size": "Bag Size Master",
    "/masters/gsm": "GSM Master",
    "/masters/handle": "Handle Type Master",
    "/masters/machine": "Machine Master",
    "/masters/vendor": "Vendor Master",
    // Admin
    "/admin/users": "User Creation",
    "/admin/roles": "Role Setup",
    "/admin/permissions": "Permission Control",
    "/admin/activity": "Activity Log",
};

export default function Header() {
    const pathname = usePathname();
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
            if (savedTheme) setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme || 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }
    };

    const pageTitle = routeNames[pathname] || "Smart ERP";

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.pageIndicator}>
                    <h2>{pageTitle}</h2>
                    <span>Aristo Ecosystem</span>
                </div>
            </div>

            <div className={styles.center}>
                <div className={styles.searchWrapper}>
                    <Search size={16} className={styles.searchIcon} />
                    <input type="text" placeholder="Search anything... (Ctrl + K)" />
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.actions}>
                    <button className={styles.aiBtn}>
                        <BrainCircuit size={16} />
                        <span>AI Insights</span>
                    </button>

                    <div className={styles.divider}></div>

                    <button className={styles.iconBtn} onClick={toggleTheme}>
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button className={styles.iconBtn}>
                        <Bell size={20} />
                        <span className={styles.notifBadge}></span>
                    </button>

                    <div className={styles.divider}></div>

                    <div className={styles.userProfile}>
                        <div className={styles.avatar}>
                            <User size={18} />
                        </div>
                        <div className={styles.userDetails}>
                            <p>Admin</p>
                            <span>Super User</span>
                        </div>
                        <ChevronDown size={14} className={styles.dropIcon} />
                    </div>
                </div>
            </div>
        </header>
    );
}
