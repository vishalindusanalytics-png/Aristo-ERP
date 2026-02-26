"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingCart,
    Calendar,
    Package,
    PlayCircle,
    CheckCircle2,
    Container as ContainerIcon,
    Truck,
    IndianRupee,
    Settings,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Command,
    Users,
    BarChart3,
    Printer,
    AlertTriangle,
    FileText,
    ClipboardList,
    List,
    Factory,
    Shield,
    TrendingUp,
} from "lucide-react";
import { useState } from "react";
import styles from "./Sidebar.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface SubItem {
    name: string;
    path: string;
}

interface NavItem {
    name: string;
    icon: React.ElementType;
    path?: string;
    sub?: SubItem[];
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

const groups: NavGroup[] = [
    {
        title: "Dashboard",
        items: [
            {
                name: "Dashboard",
                icon: LayoutDashboard,
                sub: [
                    { name: "Owner Dashboard", path: "/" },
                    { name: "Production Dashboard", path: "/dashboard/production" },
                    { name: "Sales Dashboard", path: "/dashboard/sales" },
                    { name: "Inventory Snapshot", path: "/dashboard/inventory" },
                    { name: "Finance Snapshot", path: "/dashboard/finance" },
                ],
            },
        ],
    },
    {
        title: "Sales & Orders",
        items: [
            {
                name: "Sales & Orders",
                icon: ShoppingCart,
                sub: [
                    { name: "Inquiry", path: "/sales/inquiry" },
                    { name: "AI Estimation", path: "/sales/estimation" },
                    { name: "Quotation", path: "/sales/quotation" },
                    { name: "Sales Order", path: "/sales/order" },
                    { name: "Proforma Invoice", path: "/sales/proforma" },
                    { name: "Customer Master", path: "/sales/customers" },
                ],
            },
        ],
    },
    {
        title: "Production Planning",
        items: [
            {
                name: "Production Planning",
                icon: Calendar,
                sub: [
                    { name: "Machine Master", path: "/production-planning/machines" },
                    { name: "Capacity Calendar", path: "/production-planning/calendar" },
                    { name: "Order Scheduling", path: "/production-planning/scheduling" },
                    { name: "Batch Planning", path: "/production-planning/batches" },
                    { name: "Plan Release", path: "/production-planning/release" },
                ],
            },
        ],
    },
    {
        title: "Inventory & RM",
        items: [
            {
                name: "Inventory & Raw Material",
                icon: Package,
                sub: [
                    { name: "GRN Entry", path: "/inventory/grn" },
                    { name: "Stock View (GSM Wise)", path: "/inventory/stock" },
                    { name: "Material Issue", path: "/inventory/issue" },
                    { name: "Stock Adjustment", path: "/inventory/adjustment" },
                    { name: "Low Stock Alert", path: "/inventory/alerts" },
                ],
            },
        ],
    },
    {
        title: "Production",
        items: [
            {
                name: "Production Execution",
                icon: PlayCircle,
                sub: [
                    { name: "Production Order", path: "/execution/orders" },
                    { name: "Production Entry", path: "/execution/entry" },
                    { name: "Wastage Entry", path: "/execution/wastage" },
                    { name: "Downtime Entry", path: "/execution/downtime" },
                    { name: "Production Summary", path: "/execution/summary" },
                ],
            },
        ],
    },
    {
        title: "Quality Control",
        items: [
            {
                name: "Quality Control",
                icon: CheckCircle2,
                sub: [
                    { name: "RM Inspection", path: "/qc/rm-inspection" },
                    { name: "In-Process QC", path: "/qc/in-process" },
                    { name: "Final QC", path: "/qc/final" },
                    { name: "Rejection Entry", path: "/qc/rejection" },
                    { name: "QC Report", path: "/qc/report" },
                ],
            },
        ],
    },
    {
        title: "Packing & Dispatch",
        items: [
            {
                name: "Packing & Container",
                icon: ContainerIcon,
                sub: [
                    { name: "Carton Configuration", path: "/packing/cartons" },
                    { name: "Packing Entry", path: "/packing/entry" },
                    { name: "Container Planning", path: "/packing/container" },
                    { name: "Load Sheet", path: "/packing/loadsheet" },
                    { name: "Dispatch Entry", path: "/packing/dispatch" },
                ],
            },
        ],
    },
    {
        title: "Printing",
        items: [
            {
                name: "Print & Plate Mgmt",
                icon: Printer,
                sub: [
                    { name: "Plate Master", path: "/printing/plates" },
                    { name: "Plate Inventory", path: "/printing/inventory" },
                    { name: "Cylinder Mapping", path: "/printing/cylinders" },
                    { name: "Ink Entry", path: "/printing/ink" },
                    { name: "Print History", path: "/printing/history" },
                ],
            },
        ],
    },
    {
        title: "Finance",
        items: [
            {
                name: "Finance & Tally Sync",
                icon: IndianRupee,
                sub: [
                    { name: "Sales Invoice", path: "/finance/invoice" },
                    { name: "Purchase Entry", path: "/finance/purchase" },
                    { name: "Tally Sync", path: "/finance/tally" },
                    { name: "Receivable Report", path: "/finance/receivable" },
                    { name: "Payable Report", path: "/finance/payable" },
                ],
            },
        ],
    },
    {
        title: "Reports",
        items: [
            {
                name: "Reports & Analytics",
                icon: BarChart3,
                sub: [
                    { name: "Order Report", path: "/reports/orders" },
                    { name: "Production Report", path: "/reports/production" },
                    { name: "Wastage Report", path: "/reports/wastage" },
                    { name: "Inventory Report", path: "/reports/inventory" },
                    { name: "Margin Report", path: "/reports/margin" },
                ],
            },
        ],
    },
    {
        title: "Masters",
        items: [
            {
                name: "Masters",
                icon: Settings,
                sub: [
                    { name: "Bag Size", path: "/masters/bag-size" },
                    { name: "GSM", path: "/masters/gsm" },
                    { name: "Handle Type", path: "/masters/handle" },
                    { name: "Machine", path: "/masters/machine" },
                    { name: "Vendor", path: "/masters/vendor" },
                ],
            },
        ],
    },
    {
        title: "Admin",
        items: [
            {
                name: "User & Role Mgmt",
                icon: Users,
                sub: [
                    { name: "User Creation", path: "/admin/users" },
                    { name: "Role Setup", path: "/admin/roles" },
                    { name: "Permission Control", path: "/admin/permissions" },
                    { name: "Activity Log", path: "/admin/activity" },
                ],
            },
        ],
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
        // Auto-open the group that matches current path
        const initial: Record<string, boolean> = {};
        groups.forEach((group) => {
            group.items.forEach((item) => {
                if (item.sub) {
                    const isActive = item.sub.some((sub) => sub.path === pathname || pathname.startsWith(sub.path + "/"));
                    if (isActive) initial[item.name] = true;
                }
            });
        });
        return initial;
    });

    const toggleGroup = (name: string) => {
        setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const isSubActive = (item: NavItem) => {
        return item.sub?.some((sub) => sub.path === pathname || pathname.startsWith(sub.path + "/"));
    };

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 72 : 256 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={styles.sidebar}
        >
            <div className={styles.logoSlot}>
                <div className={styles.logoIcon}>
                    <Command size={22} />
                </div>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.logoText}
                    >
                        <h1>ARISTO</h1>
                        <span>Smart ERP Ecosystem</span>
                    </motion.div>
                )}
            </div>

            <nav className={styles.nav}>
                {groups.map((group, gIdx) => (
                    <div key={gIdx} className={styles.group}>
                        <div className={styles.items}>
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const hasChildren = item.sub && item.sub.length > 0;
                                const isOpen = openGroups[item.name];
                                const activeParent = isSubActive(item);

                                if (hasChildren) {
                                    return (
                                        <div key={item.name}>
                                            <button
                                                className={`${styles.navLink} ${styles.navBtn} ${activeParent ? styles.activeParent : ""}`}
                                                onClick={() => !collapsed && toggleGroup(item.name)}
                                                title={collapsed ? item.name : undefined}
                                            >
                                                <div className={styles.iconWrapper}>
                                                    <Icon size={19} strokeWidth={activeParent ? 2.5 : 2} />
                                                </div>
                                                {!collapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className={styles.navLabel}
                                                    >
                                                        {item.name}
                                                    </motion.span>
                                                )}
                                                {!collapsed && hasChildren && (
                                                    <motion.div
                                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                                        className={styles.chevronIcon}
                                                    >
                                                        <ChevronDown size={14} />
                                                    </motion.div>
                                                )}
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {isOpen && !collapsed && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                                        className={styles.subMenu}
                                                    >
                                                        {item.sub!.map((sub) => {
                                                            const isSubItemActive = pathname === sub.path;
                                                            return (
                                                                <Link
                                                                    key={sub.path}
                                                                    href={sub.path}
                                                                    className={`${styles.subLink} ${isSubItemActive ? styles.subActive : ""}`}
                                                                >
                                                                    <span className={styles.subDot} />
                                                                    {sub.name}
                                                                </Link>
                                                            );
                                                        })}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                // Direct link item
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path!}
                                        className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        <div className={styles.iconWrapper}>
                                            <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                                        </div>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={styles.navLabel}
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                        {isActive && !collapsed && (
                                            <motion.div layoutId="navIndicator" className={styles.activeDot} />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                        {gIdx < groups.length - 1 && !collapsed && <div className={styles.thinDivider} />}
                    </div>
                ))}
            </nav>

            <div className={styles.footer}>
                <button
                    className={styles.collapseFullBtn}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <ChevronRight size={18} /> : (
                        <div className={styles.collapseLabel}>
                            <ChevronLeft size={18} />
                            <span>Collapse Menu</span>
                        </div>
                    )}
                </button>
            </div>
        </motion.aside>
    );
}
