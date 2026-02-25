"use client";

import {
    Plus,
    Filter,
    ArrowUpDown,
    Box,
    ChevronLeft,
    ChevronRight,
    History,
    AlertCircle,
    ShoppingBag,
    Database,
    Search,
    TrendingUp,
    TrendingDown,
    Package,
    ArrowUpRight,
    Layers,
    Warehouse
} from "lucide-react";
import styles from "./inventory.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import ActionFormModal from "@/components/layout/ActionFormModal";

const inventoryData = [
    { id: "MAT-101", name: "Brown Kraft Roll", cat: "Paper", gsm: "120", stock: 14.5, total: 20, unit: "Tons", status: "In Stock" },
    { id: "MAT-102", name: "White Kraft Roll", cat: "Paper", gsm: "100", stock: 2.2, total: 15, unit: "Tons", status: "Low Stock" },
    { id: "MAT-105", name: "Synthetic Glue", cat: "Adhesive", gsm: "-", stock: 450, total: 500, unit: "KG", status: "In Stock" },
    { id: "MAT-201", name: "Twisted Handle - Black", cat: "Handle", gsm: "-", stock: 12000, total: 50000, unit: "PCS", status: "In Stock" },
    { id: "MAT-202", name: "Twisted Handle - Brown", cat: "Handle", gsm: "-", stock: 2500, total: 50000, unit: "PCS", status: "Low Stock" },
    { id: "MAT-301", name: "Poly Film Roll", cat: "Packaging", gsm: "40", stock: 0.8, total: 10, unit: "Tons", status: "Low Stock" },
];

export default function Inventory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("All");

    const openAction = (type: string) => {
        setSelectedAction(type);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <div className={styles.searchWrapper}>
                        <Search size={16} className={styles.searchIcon} />
                        <input type="text" placeholder="Search global stock..." />
                    </div>
                    <div className={styles.tabs}>
                        {["All", "Paper", "Adhesive", "Handle"].map((t) => (
                            <button
                                key={t}
                                className={`${styles.tab} ${activeTab === t ? styles.activeTab : ""}`}
                                onClick={() => setActiveTab(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={styles.barRight}>
                    <button className={styles.filterBtn}><Filter size={18} /></button>
                    <button className="btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => openAction("Receive Stock")}>
                        <Plus size={16} /> Stock In
                    </button>
                </div>
            </div>

            <div className="scroll-area">
                <div className={styles.topStats}>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${styles.statCard} card-premium`}>
                        <div className={styles.statIcon} style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}><Warehouse size={24} /></div>
                        <div className={styles.statInfo}>
                            <p>Global Inventory Value</p>
                            <h3>₹1.84 Cr</h3>
                        </div>
                        <div className={`${styles.statTrend} styles.plus`} style={{ color: 'var(--secondary)' }}>+4.2%</div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${styles.statCard} card-premium`}>
                        <div className={styles.statIcon} style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}><AlertCircle size={24} /></div>
                        <div className={styles.statInfo}>
                            <p>Stockouts Avoided</p>
                            <h3>14</h3>
                        </div>
                        <div className={styles.statTrend} style={{ color: 'var(--secondary)' }}><TrendingUp size={14} /></div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${styles.statCard} card-premium`}>
                        <div className={styles.statIcon} style={{ background: 'var(--secondary-soft)', color: 'var(--secondary)' }}><Layers size={24} /></div>
                        <div className={styles.statInfo}>
                            <p>Active Batches</p>
                            <h3>42</h3>
                        </div>
                        <div className={styles.statTrend}><ArrowUpRight size={14} color="var(--primary)" /></div>
                    </motion.div>
                </div>

                <div className={styles.mainLayout}>
                    <div className="card-premium" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div className={styles.tableToolbar}>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 800 }}>Material Registry</h3>
                            <button className="btn-ghost" style={{ fontSize: '0.75rem', fontWeight: 700 }} onClick={() => openAction("Material Issue")}>
                                <ShoppingBag size={14} /> Batch Requisition
                            </button>
                        </div>
                        <table className="table-container">
                            <thead>
                                <tr>
                                    <th>Ref ID</th>
                                    <th>Material Name</th>
                                    <th>Category</th>
                                    <th className={styles.stockCol}>Stock Utilization</th>
                                    <th>Available</th>
                                    <th>Health</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryData.filter(i => activeTab === "All" || i.cat === activeTab).map((item) => {
                                    const percent = (item.stock / item.total) * 100;
                                    return (
                                        <tr key={item.id}>
                                            <td className={styles.idCell}>{item.id}</td>
                                            <td className={styles.nameCell}>{item.name}</td>
                                            <td><span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6 }}>{item.cat}</span></td>
                                            <td>
                                                <div className={styles.stockGauges}>
                                                    <div className={styles.gaugeTrack}>
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${percent}%` }}
                                                            className={styles.gaugeFill}
                                                            style={{ background: percent < 30 ? 'var(--danger)' : percent < 60 ? 'var(--accent)' : 'var(--secondary)' }}
                                                        />
                                                    </div>
                                                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)' }}>{percent.toFixed(0)}% Capacity</span>
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 800 }}>{item.stock} {item.unit}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${styles[item.status.toLowerCase().replace(" ", "")]}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="pagination-container" style={{ padding: '1rem 1.5rem' }}>
                            <div className="pagination-controls">
                                <button className="pg-btn" disabled><ChevronLeft size={16} /></button>
                                <button className="pg-num active">1</button>
                                <button className="pg-btn"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>

                    <aside className={styles.sidePanel}>
                        <div className="card-premium" style={{ padding: '1.5rem', height: '100%' }}>
                            <h3>Critical Procurement Alerts</h3>
                            <div className={styles.alertList}>
                                <div className={`${styles.alertItem} ${styles.critical}`}>
                                    <h4>White Kraft Roll (100 GSM)</h4>
                                    <p>Stock plummeted below 15% threshold. Projected depletion: 36 hours based on AR-8821 schedule.</p>
                                    <span className={styles.alertTime}>URGENT REORDER</span>
                                </div>
                                <div className={`${styles.alertItem} ${styles.warning}`}>
                                    <h4>Synthetic Glue (High Visc)</h4>
                                    <p>Current stock 450 KG. Lead time from Global Mills is 4 days. Recommended reorder point reached.</p>
                                    <span className={styles.alertTime}>REORDER WARNING</span>
                                </div>
                                <div className={styles.alertItem}>
                                    <h4>Twisted Handle (Brown)</h4>
                                    <p>Incoming shipment #IND-992 stalled at Customs. Estimated arrival delayed by 24h.</p>
                                    <span className={styles.alertTime}>IN-TRANSIT UPDATE</span>
                                </div>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '0.8rem' }}>
                                Generate Purchase Orders
                            </button>
                        </div>
                    </aside>
                </div>
            </div>

            <ActionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={selectedAction}
            />
        </>
    );
}
