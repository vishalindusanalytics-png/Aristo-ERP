"use client";

import {
    IndianRupee,
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCcw,
    ShieldCheck,
    AlertCircle,
    FileSearch,
    CheckCircle2,
    Lock,
    Search,
    ChevronLeft,
    ChevronRight,
    Plus
} from "lucide-react";
import styles from "./finance.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import ActionFormModal from "@/components/layout/ActionFormModal";

export default function FinanceSync() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const openAction = (type: string) => {
        setSelectedAction(type);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <button className={styles.syncBtn} onClick={() => openAction("Tally Sync")}>
                        <RefreshCcw size={18} />
                        Force Live Sync
                    </button>
                </div>
                <div className={styles.barRight}>
                    <button className="btn-primary" onClick={() => openAction("Reconcile Vouchers")}>
                        <ShieldCheck size={18} />
                        Reconcile Vouchers
                    </button>
                </div>
            </div>

            <div className="scroll-area">
                <div className={styles.financeGrid}>
                    <div className={`${styles.statsRow}`}>
                        <div className="card-premium" style={{ padding: '1.25rem', flex: 1 }}>
                            <p className={styles.statLabel}>Total Receivables</p>
                            <h3 className={styles.statValue}>₹84.50 L</h3>
                            <span className={styles.statSub} style={{ color: 'var(--secondary)' }}>+12% this week</span>
                        </div>
                        <div className="card-premium" style={{ padding: '1.25rem', flex: 1 }}>
                            <p className={styles.statLabel}>Upcoming Payables</p>
                            <h3 className={styles.statValue}>₹12.20 L</h3>
                            <span className={styles.statSub}>Due: 05 Mar 24</span>
                        </div>
                    </div>

                    <div className="card-premium" style={{ gridRow: 'span 2', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div className={styles.cardHeader}>
                            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '1rem' }}>Account Status</h3>
                        </div>
                        <div className={styles.statusBox}>
                            <div className={styles.pulseContainer}>
                                <div className={styles.pulse}></div>
                                <strong>Tally Gateway Connected</strong>
                            </div>
                            <p>AES-256 Encrypted Tunnel Active</p>
                        </div>
                        <div className={styles.outstandingList}>
                            <h4 className={styles.sectionTag}>Critical Outstanding</h4>
                            <div className={styles.outstandingItem}>
                                <p>Daily Fresh Retail</p>
                                <span>₹12,40,000 (45 Days)</span>
                            </div>
                            <div className={styles.outstandingItem}>
                                <p>Swift Logistics</p>
                                <span>₹4,50,000 (12 Days)</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium" style={{ overflow: 'hidden' }}>
                        <div className={styles.tableToolbar}>
                            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Pending Tally Vouchers</h3>
                            <div className={styles.search}>
                                <Search size={16} />
                                <input type="text" placeholder="Voucher #..." />
                            </div>
                        </div>
                        <table className="table-container">
                            <thead>
                                <tr>
                                    <th>Voucher ID</th>
                                    <th>Ledger</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: "INV-4402", ledger: "TechCorp Global", amt: "₹1,45,200", status: "Local" },
                                    { id: "INV-4405", ledger: "Green Mart Retail", amt: "₹45,800", status: "Local" },
                                ].map((v) => (
                                    <tr key={v.id}>
                                        <td className={styles.vId}>{v.id}</td>
                                        <td>{v.ledger}</td>
                                        <td className={styles.amtCell}>{v.amt}</td>
                                        <td><span className={styles.vBadge}>{v.status}</span></td>
                                        <td><button className={styles.pushBtn}>Push to Tally</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination-container" style={{ padding: '0.75rem 1.25rem' }}>
                            <div className="pagination-controls">
                                <button className="pg-btn" disabled><ChevronLeft size={16} /></button>
                                <button className="pg-num active">1</button>
                                <button className="pg-btn"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
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
