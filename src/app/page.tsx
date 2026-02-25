"use client";

import {
  Zap,
  Activity,
  Trash2,
  Globe,
  TrendingUp,
  TrendingDown,
  Cpu,
  Box,
  Truck,
  ShieldCheck,
  Clock,
  AlertCircle,
  ChevronRight,
  ArrowUpRight,
  Plus,
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { useState } from "react";
import ActionFormModal from "@/components/layout/ActionFormModal";

const kpis = [
  { label: "Fleet Output", value: "842k", sub: "Pcs Today", trend: "+12.4%", color: "#3b82f6", icon: Zap, plus: true },
  { label: "Group OEE", value: "92.1%", sub: "Last Shift", trend: "+2.1%", color: "#10b981", icon: Activity, plus: true },
  { label: "Waste Factor", value: "2.84%", sub: "Gross Tons", trend: "-0.5%", color: "#ef4444", icon: Trash2, plus: false },
  { label: "Dispatch EQ", value: "96.8%", sub: "Load Factor", trend: "+4.2%", color: "#f59e0b", icon: Globe, plus: true },
];

const machines = [
  { id: "M-01", name: "HighSpeed SOS", status: "running", load: 88 },
  { id: "M-02", name: "SOS Line-B", status: "running", load: 92 },
  { id: "M-03", name: "Twisted Handle", status: "paused", load: 45 },
  { id: "M-04", name: "Corrugator A", status: "running", load: 98 },
  { id: "M-05", name: "Flat Handle", status: "idle", load: 0 },
  { id: "M-06", name: "Auto Gluer", status: "running", load: 74 },
];

const operationalFeed = [
  { id: 1, type: 'qc', title: 'Batch #8821B Certified', desc: 'Sample passed all lab tests (Burst: 285kPa). Ready for packing.', time: '12 mins ago', color: 'var(--secondary)' },
  { id: 2, type: 'logistics', title: 'Container #IND-4401 Arrived', desc: '40ft HC spotted at Gate 2. Loading sequence optimized.', time: '45 mins ago', color: 'var(--primary)' },
  { id: 3, type: 'alert', title: 'Machine M-03 Downtime', desc: 'Solenoid valve error reported. Maintenance team dispatched.', time: '1 hour ago', color: 'var(--danger)' },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);

  const openAction = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="scroll-area">
      <div className={styles.dashboard}>
        {/* Header Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Global Mission Control</h1>
            <span style={{ padding: '0.2rem 0.6rem', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>LIVE OPERATIONS</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-ghost" style={{ padding: '0.5rem' }}><Search size={18} /></button>
            <button className="btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => openAction("New Inquiry")}>
              <Plus size={16} /> Quick Action
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className={styles.kpiGrid}>
          {kpis.map((kpi, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`${styles.kpiCard} card-premium`}
            >
              <div className={styles.kpiHeader}>
                <div className={styles.kpiIcon} style={{ background: kpi.color + '15', color: kpi.color }}>
                  <kpi.icon size={22} />
                </div>
                <div className={`${styles.kpiTrend} ${kpi.plus ? styles.plus : styles.minus}`}>
                  {kpi.plus ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.trend}
                </div>
              </div>
              <div>
                <p className={styles.kpiLabel}>{kpi.label}</p>
                <h3 className={styles.kpiValue}>{kpi.value}</h3>
                <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)' }}>{kpi.sub}</p>
              </div>
              {/* Decorative Mini Chart Area */}
              <div className={styles.sparkline}>
                <svg width="100%" height="100%" viewBox="0 0 100 40">
                  <motion.path
                    d="M0 30 Q 25 10 50 25 T 100 15"
                    fill="none"
                    stroke={kpi.color}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: idx * 0.2 }}
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Section */}
        <div className={styles.mainGrid}>
          <div className={styles.primaryColumn}>
            {/* Machine Fleet Pulse */}
            <div className="card-premium" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Cpu size={18} color="var(--primary)" />
                  <h3>Machine Fleet Pulse</h3>
                </div>
                <button className="btn-ghost" style={{ fontSize: '0.75rem', fontWeight: 700 }}>View Machine Logs</button>
              </div>
              <div className={styles.machineGrid}>
                {machines.map((m) => (
                  <motion.div key={m.id} whileHover={{ scale: 1.02 }} className={styles.machineItem}>
                    <div className={styles.machineStatus}>
                      <span className={styles.machineLabel}>{m.id}</span>
                      <div className={`${styles.statusDot} ${styles[m.status]}`}></div>
                    </div>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-dim)' }}>{m.name}</p>
                    <div className={styles.machineProgress}>
                      <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.load}%` }}
                        style={{ background: m.status === 'running' ? 'var(--primary)' : 'var(--text-dim)' }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', fontWeight: 800 }}>
                      <span>LOAD</span>
                      <span>{m.load}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Throughput Chart */}
            <div className="card-premium" style={{ padding: '1.5rem' }}>
              <div className={styles.cardHeader}>
                <h3>Operational Throughput (Tons)</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-ghost" style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}>Today</button>
                  <button className="btn-ghost" style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem', opacity: 0.5 }}>Monthly</button>
                </div>
              </div>
              <div className={styles.chartContainer}>
                {[45, 60, 30, 85, 95, 70, 50, 82, 35, 65, 88, 92].map((h, i) => (
                  <div key={i} className={styles.chartBar} style={{ height: `${h}%` }}>
                    <span className={styles.chartLabel}>{8 + i}:00</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.secondaryColumn}>
            {/* Operational Stream */}
            <div className="card-premium" style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className={styles.cardHeader}>
                <h3>Critical Operations Stream</h3>
              </div>
              <div className={styles.feedList}>
                {operationalFeed.map((item) => (
                  <div key={item.id} className={styles.feedItem} style={{ borderLeftColor: item.color }}>
                    <div className={styles.feedContent}>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                      <span className={styles.feedTime} style={{ color: item.color }}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem' }}>
                <div className="card-premium" style={{ background: 'var(--bg-hover)', padding: '1rem', border: 'none' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ background: 'var(--secondary-soft)', color: 'var(--secondary)', padding: '0.5rem', borderRadius: '8px' }}>
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 800 }}>System Integrity</p>
                      <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 600 }}>All modules synchronized</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--secondary)' }}>SECURE GATEWAY</span>
                    <ArrowUpRight size={14} color="var(--secondary)" />
                  </div>
                </div>
              </div>
              <button className={styles.fullWidthBtn} style={{ marginTop: '2rem' }}>
                Full Operational Report <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ActionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  );
}
