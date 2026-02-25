"use client";

import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Cpu,
    Zap,
    Clock,
    ArrowUpDown,
    Filter,
    MoreVertical,
    Bell
} from "lucide-react";
import styles from "./planning.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import ActionFormModal from "@/components/layout/ActionFormModal";

const machines = [
    { id: "M01", name: "Corrugator Line A", status: "Busy", utilization: 88, currentJob: "AR-881" },
    { id: "M02", name: "Printing Slotter", status: "Idle", utilization: 0, currentJob: "None" },
    { id: "M03", name: "Folder Gluer", status: "Ready", utilization: 45, currentJob: "AR-902" },
    { id: "M04", name: "Die Cutter PRO", status: "Busy", utilization: 92, currentJob: "AR-885" },
];

export default function ProductionPlanning() {
    const [selectedDate, setSelectedDate] = useState("25 Feb 2024");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <div className={styles.dateControl}>
                        <button className={styles.iconBtn}><ChevronLeft size={16} /></button>
                        <span>{selectedDate}</span>
                        <button className={styles.iconBtn}><ChevronRight size={16} /></button>
                    </div>
                </div>
                <div className={styles.barRight}>
                    <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                        <Plus size={18} />
                        New Schedule
                    </button>
                </div>
            </div>

            <div className="scroll-area">
                <div className={styles.statsRow}>
                    <div className="card-premium" style={{ padding: '1.25rem', flex: 1 }}>
                        <div className={styles.statBox}>
                            <Cpu size={24} color="var(--primary)" />
                            <div>
                                <p>Fleet Utilization</p>
                                <h3>74.2%</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-premium" style={{ padding: '1.25rem', flex: 1 }}>
                        <div className={styles.statBox}>
                            <Zap size={24} color="var(--secondary)" />
                            <div>
                                <p>Energy Rating</p>
                                <h3>91%</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-premium" style={{ padding: '1.25rem', flex: 1 }}>
                        <div className={styles.statBox}>
                            <Clock size={24} color="var(--accent)" />
                            <div>
                                <p>Average OEE</p>
                                <h3>84.5</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-premium" style={{ overflow: 'hidden' }}>
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarLeft}>
                            <button className={styles.filterBtn}><Filter size={16} /> Filter Machine</button>
                        </div>
                        <div className={styles.toolbarRight}>
                            <p>Shift: 08:00 AM - 08:00 PM</p>
                        </div>
                    </div>

                    <table className="table-container">
                        <thead>
                            <tr>
                                <th>Machine ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Utilization</th>
                                <th>Active Job</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {machines.map((machine) => (
                                <tr key={machine.id} className={styles.tableRow}>
                                    <td className={styles.idCell}>{machine.id}</td>
                                    <td className={styles.nameCell}>{machine.name}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[machine.status.toLowerCase()]}`}>
                                            {machine.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.utilBox}>
                                            <span>{machine.utilization}%</span>
                                            <div className={styles.utilTrack}>
                                                <div className={styles.utilBar} style={{ width: `${machine.utilization}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.jobCell}>{machine.currentJob}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button className="btn-ghost"><Bell size={16} /></button>
                                            <button className="btn-ghost"><MoreVertical size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination-container" style={{ padding: '1rem 1.5rem' }}>
                        <p className="pagination-info">Showing 4 Machines</p>
                        <div className="pagination-controls">
                            <button className="pg-btn" disabled><ChevronLeft size={16} /></button>
                            <button className="pg-num active">1</button>
                            <button className="pg-btn" disabled><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <ActionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="New Schedule"
            />
        </>
    );
}
