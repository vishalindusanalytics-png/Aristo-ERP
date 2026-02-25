"use client";

import {
    Play,
    Pause,
    Square,
    AlertTriangle,
    CheckCircle,
    Clock,
    Zap,
    Activity,
    PlusCircle,
    Settings,
    ShieldAlert,
    Gauge,
    Layers,
    History
} from "lucide-react";
import { useState } from "react";
import styles from "./execution.module.css";
import { motion, AnimatePresence } from "framer-motion";
import ActionFormModal from "@/components/layout/ActionFormModal";

export default function ProductionExecution() {
    const [status, setStatus] = useState("running"); // idle, running, paused
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <div className={styles.jobSpecs}>
                        <div className={styles.machineTag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                            <Zap size={14} />
                            <span>M-04 CORRUGATOR</span>
                        </div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 800, marginLeft: '1rem' }}>AR-8821: Paper Bag M-Size (EXPORT)</h3>
                    </div>
                </div>
                <div className={styles.barRight}>
                    <div className={styles.liveClock} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontWeight: 800 }}>
                        <Clock size={18} className={status === "running" ? "animate-spin-slow" : ""} />
                        <span style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>02:45:12</span>
                    </div>
                </div>
            </div>

            <div className="scroll-area">
                <main style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', padding: '1.5rem' }}>
                    <div className={styles.primaryColumn}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${styles.controlPad} card-premium`}>
                            <div className={styles.padHeader}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <Settings size={18} color="var(--primary)" />
                                    <h3>Execution Engine v4.0.2</h3>
                                </div>
                                <div className={`${styles.statusPill} ${styles[status]}`}>
                                    <span className={status === 'running' ? 'animate-pulse' : ''}>• {status.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className={styles.controlStrip}>
                                <div className={styles.stripLabel}>
                                    <p>Active Process Control</p>
                                    <h4>Primary Corrugation Flow</h4>
                                </div>
                                <div className={styles.btnGroup}>
                                    {status !== "running" ? (
                                        <button className={`${styles.execBtn} ${styles.playBtn}`} onClick={() => setStatus("running")}>
                                            <Play size={16} fill="currentColor" /> Resume
                                        </button>
                                    ) : (
                                        <button className={`${styles.execBtn} ${styles.pauseBtn}`} onClick={() => setStatus("paused")}>
                                            <Pause size={16} fill="currentColor" /> Pause
                                        </button>
                                    )}
                                    <button className={`${styles.execBtn} ${styles.stopBtn}`} onClick={() => setStatus("idle")}>
                                        <Square size={16} fill="currentColor" /> Terminate Job
                                    </button>
                                </div>
                            </div>

                            <div className={styles.visualFrame}>
                                <div className={`${styles.movingWeb} ${status === 'running' ? styles.animate : ''}`}></div>
                                <div className={styles.visualOverlay}>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.2em' }}>LIVE FEED</p>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'white' }}>842 m/min</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.entryGrid}>
                                <div className={styles.dataCard}>
                                    <p>Net Output</p>
                                    <input type="number" defaultValue="4250" />
                                    <div className={styles.unit}>PCS REGISTERED</div>
                                </div>
                                <div className={styles.dataCard}>
                                    <p>Wastage Weight</p>
                                    <input type="number" defaultValue="12.5" />
                                    <div className={styles.unit} style={{ color: 'var(--danger)' }}>KG QUARANTINE</div>
                                </div>
                                <div className={styles.dataCard}>
                                    <p>Operator Energy</p>
                                    <input type="number" defaultValue="91" readOnly />
                                    <div className={styles.unit} style={{ color: 'var(--secondary)' }}>EFFICIENCY %</div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="card-premium" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Recent Execution Logs</h3>
                                <button className="btn-ghost" style={{ fontSize: '0.7rem' }}><History size={14} /> History</button>
                            </div>
                            <table className="table-container">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Event Type</th>
                                        <th>Operator</th>
                                        <th>Metric Delta</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { time: "14:20:11", event: "Standard Resume", op: "Vishal P.", delta: "+450 pcs", status: "Success" },
                                        { time: "14:05:05", event: "Web Breakage", op: "System", delta: "+2.5kg waste", status: "Critical" },
                                        { time: "13:45:22", event: "Shift Change", op: "Dr. Sharma", delta: "N/A", status: "Neutral" },
                                    ].map((log, i) => (
                                        <tr key={i}>
                                            <td style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>{log.time}</td>
                                            <td style={{ fontWeight: 800 }}>{log.event}</td>
                                            <td>{log.op}</td>
                                            <td style={{ fontWeight: 800, color: log.delta.includes('+') ? 'var(--secondary)' : 'var(--danger)' }}>{log.delta}</td>
                                            <td><span style={{ fontSize: '0.65rem', fontWeight: 900, padding: '0.2rem 0.5rem', background: 'var(--bg-hover)', borderRadius: '4px' }}>{log.status.toUpperCase()}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className={`${styles.performanceCard} card-premium`}>
                            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'left' }}>Machine Health (OEE)</h3>
                            <div className={styles.oeeGauge}>
                                <svg viewBox="0 0 36 36" className={styles.circularChart}>
                                    <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className={styles.circle} strokeDasharray="94.2, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className={styles.oeeInfo}>
                                    <strong>94.2<sub>%</sub></strong>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                                <div><div style={{ fontSize: '0.9rem', fontWeight: 900 }}>98%</div><div style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>AVAIL</div></div>
                                <div><div style={{ fontSize: '0.9rem', fontWeight: 900 }}>96%</div><div style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>PERF</div></div>
                                <div><div style={{ fontSize: '0.9rem', fontWeight: 900 }}>92%</div><div style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>QLTY</div></div>
                            </div>
                        </div>

                        <div className="card-premium" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Shift Compliance</h3>
                            <div className={styles.checklist}>
                                <div className={styles.checkItem}>
                                    <CheckCircle size={16} className={styles.checked} />
                                    <span>Glue Viscosity Verified</span>
                                </div>
                                <div className={styles.checkItem}>
                                    <CheckCircle size={16} className={styles.checked} />
                                    <span>Tension Rollers Calibrated</span>
                                </div>
                                <div className={styles.checkItem}>
                                    <Activity size={16} color="var(--primary)" />
                                    <span>Lab Sample Pending</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-premium" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                                <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Downtime Events</h3>
                                <button className="btn-ghost" style={{ padding: '0.25rem' }} onClick={() => setIsModalOpen(true)}>
                                    <PlusCircle size={16} color="var(--primary)" />
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--danger-soft)', padding: '0.75rem', borderRadius: '8px' }}>
                                    <ShieldAlert size={18} color="var(--danger)" />
                                    <div>
                                        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--danger)' }}>Roll Change</p>
                                        <p style={{ fontSize: '0.65rem', color: 'var(--danger)', opacity: 0.8 }}>Impact: -12.5m downtime</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>

            <ActionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="Downtime Report"
            />
        </>
    );
}
