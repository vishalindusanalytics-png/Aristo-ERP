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
    "/": "Executive Overview",
    "/sales": "Sales Pipeline",
    "/production-planning": "Machine Scheduler",
    "/inventory": "Inventory & Store",
    "/execution": "Production Execution",
    "/qc": "Quality & Lab",
    "/container-planning": "Vector Load Planner",
    "/dispatch": "Logistics & Dispatch",
    "/finance": "Finance & Tally Sync",
    "/masters": "Configuration Masters",
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
                            <p>Vishal Pushpad</p>
                            <span>Admin</span>
                        </div>
                        <ChevronDown size={14} className={styles.dropIcon} />
                    </div>
                </div>
            </div>
        </header>
    );
}
