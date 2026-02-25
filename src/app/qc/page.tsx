"use client";

import {
    ShieldCheck,
    FlaskConical,
    Scale,
    CheckCircle2,
    AlertCircle,
    History,
    Info,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Beaker,
    TrendingUp,
    PlusCircle
} from "lucide-react";
import styles from "./qc.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import ActionFormModal from "@/components/layout/ActionFormModal";

export default function QualityControl() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <button className={styles.historyBtn}>
                        <History size={16} />
                        Lab Logs
                    </button>
                </div>
                <div className={styles.barRight}>
                    <div className={styles.batchTag}>CURRENT: #AR-8821B-44</div>
                </div>
            </div>

            <div className="scroll-area">
                <div className={styles.gridContainer}>
                    <div className={`${styles.mainColumn}`}>
                        <div className="card-premium" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <div className={styles.cardSectionHeader}>
                                <h3>Sample Laboratory Analysis</h3>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-ghost" style={{ padding: '0.4rem' }}><TrendingUp size={16} /></button>
                                </div>
                            </div>

                            <div className={styles.testForm}>
                                <div className={styles.inputGroup}>
                                    <label><Scale size={16} /> Burst Strength (kPa)</label>
                                    <div className={styles.fieldRow}>
                                        <input type="number" placeholder="285" />
                                        <span>Safe Range: 250 - 300</span>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label><Beaker size={16} /> Handle Pull (kg)</label>
                                    <div className={styles.fieldRow}>
                                        <input type="number" placeholder="14.2" />
                                        <span>Minimum: 12.0 kg</span>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label><ShieldCheck size={16} /> Print Registration</label>
                                    <div className={styles.toggleRow}>
                                        <button className={styles.active}>Aligned</button>
                                        <button>Skewed</button>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label><CheckCircle2 size={16} /> Visual QC Status</label>
                                    <select>
                                        <option>Flawless Execution</option>
                                        <option>Minor Ink Variation</option>
                                        <option>Gusset Alignment Issue</option>
                                        <option>Bag Bottom Glue Check</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formFooter}>
                                <button className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>Certify & Release Batch</button>
                            </div>
                        </div>

                        <div className="card-premium" style={{ overflow: 'hidden' }}>
                            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Recent Lab Submissions</h4>
                            </div>
                            <table className="table-container">
                                <thead>
                                    <tr>
                                        <th>LAB ID</th>
                                        <th>BATCH</th>
                                        <th>B.S. (kPa)</th>
                                        <th>STATUS</th>
                                        <th>TIME</th>
                                        <th>VERIFIED</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: "LAB-2401", batch: "#8821B", bs: "285", status: "Pass", time: "10:20 AM", verifier: "Dr. Sharma" },
                                        { id: "LAB-2402", batch: "#8815A", bs: "210", status: "Fail", time: "09:45 AM", verifier: "Inspector" },
                                    ].map((log) => (
                                        <tr key={log.id}>
                                            <td className={styles.logId}>{log.id}</td>
                                            <td style={{ fontWeight: 700 }}>{log.batch}</td>
                                            <td style={{ color: parseInt(log.bs) < 250 ? 'var(--danger)' : 'var(--text-main)' }}>{log.bs}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${styles[log.status.toLowerCase()]}`}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{log.time}</td>
                                            <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{log.verifier}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <aside className={styles.sideColumn}>
                        <div className="card-premium" style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 800 }}>Global Quality Score</h3>
                            <div className={styles.circularGauge}>
                                <svg viewBox="0 0 36 36" className={styles.circularChart}>
                                    <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className={styles.circle} strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className={styles.gaugeInfo}>
                                    <strong>92<sub>%</sub></strong>
                                    <span>APPROVED</span>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Data calculated from last 500 batches</p>
                        </div>

                        <div className="card-premium" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 800 }}>Non-Compliance Alerts</h3>
                                <button className="btn-ghost" style={{ padding: '0.25rem' }} onClick={() => setIsModalOpen(true)}>
                                    <PlusCircle size={16} color="var(--danger)" />
                                </button>
                            </div>
                            <div className={styles.notificationList}>
                                <div className={styles.noteItem}>
                                    <AlertCircle size={20} color="var(--danger)" style={{ flexShrink: 0 }} />
                                    <div className={styles.noteContent}>
                                        <p>Critical Failure: #8815A</p>
                                        <span>Burst strength failed at 210 kPa. Whole batch quarantined for supervisor review.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <ActionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="Non-Compliance Report"
            />
        </>
    );
}
