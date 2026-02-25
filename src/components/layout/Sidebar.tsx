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
    Command,
    LayoutGrid,
    History,
    ShieldCheck
} from "lucide-react";
import { useState } from "react";
import styles from "./Sidebar.module.css";
import { motion } from "framer-motion";

const groups = [
    {
        title: "Operations",
        items: [
            { name: "Dashboard", icon: LayoutDashboard, path: "/" },
            { name: "Sales & Quoting", icon: ShoppingCart, path: "/sales" },
            { name: "Production Plan", icon: Calendar, path: "/production-planning" },
            { name: "Inventory", icon: Package, path: "/inventory" },
        ]
    },
    {
        title: "Manufacture",
        items: [
            { name: "Execution", icon: PlayCircle, path: "/execution" },
            { name: "Quality Control", icon: CheckCircle2, path: "/qc" },
            { name: "Container AI", icon: ContainerIcon, path: "/container-planning" },
        ]
    },
    {
        title: "Accounting",
        items: [
            { name: "Dispatch", icon: Truck, path: "/dispatch" },
            { name: "Finance Sync", icon: IndianRupee, path: "/finance" },
            { name: "Masters Registry", icon: Settings, path: "/masters" },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            className={styles.sidebar}
        >
            <div className={styles.logoSlot}>
                <div className={styles.logoIcon}>
                    <Command size={24} />
                </div>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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
                        {!collapsed && <h3 className={styles.groupTitle}>{group.title}</h3>}
                        <div className={styles.items}>
                            {group.items.map((item) => {
                                const isActive = pathname === item.path;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                                    >
                                        <div className={styles.iconWrapper}>
                                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        </div>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
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
                        {gIdx < groups.length - 1 && !collapsed && <div className={styles.separator} />}
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
