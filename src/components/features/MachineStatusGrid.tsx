"use client";

import React from 'react';
import { Activity, Zap, AlertCircle } from 'lucide-react';
import styles from './MachineStatusGrid.module.css';

interface MachineData {
    shift: string;
    machine: string;
    bags: string | number;
    target: string | number;
    oee: string;
    status: string;
}

interface Props {
    data: MachineData[];
}

export default function MachineStatusGrid({ data }: Props) {
    return (
        <div className={styles.grid}>
            {data.map((m, i) => {
                const oeeNum = parseFloat(m.oee) || 0;
                const bagsNum = parseInt(String(m.bags).replace(/,/g, '')) || 0;
                const targetNum = parseInt(String(m.target).replace(/,/g, '')) || 1;
                const progress = Math.min((bagsNum / targetNum) * 100, 100);

                return (
                    <div key={i} className={styles.card}>
                        <div className={`${styles.statusIndicator} ${m.status === 'Running' ? styles.running :
                                m.status === 'Idle' ? styles.idle : styles.down
                            }`} />

                        <div className={styles.machineName}>{m.machine}</div>
                        <div className={styles.machineType}>{m.shift} Shift</div>

                        <div className={styles.gaugeSection}>
                            <div className={styles.oeeDial}>
                                <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#1e293b"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke={oeeNum > 85 ? "#10b981" : oeeNum > 60 ? "#f97316" : "#ef4444"}
                                        strokeWidth="3"
                                        strokeDasharray={`${oeeNum}, 100`}
                                    />
                                </svg>
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    fontSize: '0.75rem', fontWeight: 800
                                }}>
                                    {m.oee}
                                </div>
                            </div>

                            <div className={styles.statsGrid}>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>PRODUCED</span>
                                    <span className={styles.statValue}>{m.bags}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>TARGET</span>
                                    <span className={styles.statValue}>{m.target}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.statLabel}>Shift Progress: {progress.toFixed(1)}%</div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{
                                    width: `${progress}%`,
                                    background: m.status === 'Running' ? 'var(--primary)' : '#64748b'
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
