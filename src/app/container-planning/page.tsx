"use client";

import {
    Sparkles,
    ChevronRight,
    Printer,
    Navigation,
    RotateCw,
    Box as BoxIcon,
    Maximize,
    Activity,
    Cpu,
    Target,
    Zap,
    Scale,
    Layers
} from "lucide-react";
import styles from "./container.module.css";
import { motion, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import ActionFormModal from "@/components/layout/ActionFormModal";

export default function ContainerPlanning() {
    const [view, setView] = useState("Vector");
    const [isRotating, setIsRotating] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [optProgress, setOptProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOptProgress(prev => (prev < 100 ? prev + 1 : 100));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <button className={styles.secondaryBtn}>
                        <Printer size={16} />
                        Manifest
                    </button>
                    <button
                        className={styles.secondaryBtn}
                        onClick={() => setIsRotating(!isRotating)}
                    >
                        <RotateCw size={16} className={isRotating ? "animate-spin-slow" : ""} />
                        {isRotating ? "Stop Orbit" : "Orbit View"}
                    </button>
                    <div className={styles.vLine}></div>
                    <div className={styles.aiStatus}>
                        <div className={styles.pulseDot}></div>
                        <span>Neural Optimizer v3.1: <strong>Active</strong></span>
                    </div>
                </div>
                <div className={styles.barRight}>
                    <button className="btn-primary" style={{ padding: '0.4rem 1.25rem' }} onClick={() => setIsModalOpen(true)}>
                        <Sparkles size={16} />
                        Recalculate Fit
                    </button>
                </div>
            </div>

            <div className="scroll-area">
                <div className={styles.mainLayout}>
                    <div className={`${styles.visualizerArea}`}>
                        <div className="card-premium" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: 'none', background: 'var(--bg-card)' }}>
                            <div className={styles.visualizerHeader}>
                                <div className={styles.titleWithIcon}>
                                    <div className={styles.iconPad}><BoxIcon size={18} color="var(--primary)" /></div>
                                    <div>
                                        <h3>SPATIAL RECONSTRUCTION</h3>
                                        <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700 }}>40ft HC ISO CONTAINER STANDARDS</p>
                                    </div>
                                </div>
                                <div className={styles.viewTabs}>
                                    <button className={view === "Vector" ? styles.active : ""} onClick={() => setView("Vector")}>Vector</button>
                                    <button className={view === "X-Ray" ? styles.active : ""} onClick={() => setView("X-Ray")}>X-Ray</button>
                                    <button className={view === "Ghost" ? styles.active : ""} onClick={() => setView("Ghost")}>Ghost</button>
                                </div>
                            </div>

                            <div className={styles.canvasArea}>
                                {/* Grid Floor Decoration */}
                                <div className={styles.gridFloor}></div>

                                <div className={styles.scene3d}>
                                    <motion.div
                                        className={styles.container3d}
                                        animate={isRotating ? { rotateY: [-35, 325] } : {}}
                                        transition={isRotating ? { duration: 25, repeat: Infinity, ease: "linear" } : {}}
                                        style={{
                                            rotateX: -15,
                                            rotateY: isRotating ? undefined : -35
                                        }}
                                    >
                                        {/* Scanning Laser Line */}
                                        {isRotating && <div className={styles.laserScanner}></div>}

                                        {/* Bottom Face */}
                                        <div className={`${styles.face} ${styles.bottom}`}></div>

                                        {/* Back Face */}
                                        <div className={`${styles.face} ${styles.back}`}></div>

                                        {/* Left Face (Partial Transparency) */}
                                        <div className={`${styles.face} ${styles.left}`} style={{ opacity: view === "X-Ray" ? 0.05 : 0.2 }}></div>

                                        {/* Front Face (Partial Transparency) */}
                                        <div className={`${styles.face} ${styles.front}`} style={{
                                            opacity: view === "X-Ray" ? 0.05 : view === "Ghost" ? 0.1 : 0.15,
                                            background: 'rgba(30, 41, 59, 0.15)'
                                        }}></div>

                                        {/* Right Face */}
                                        <div className={`${styles.face}`} style={{
                                            width: '200px',
                                            height: '300px',
                                            transform: 'rotateY(90deg) translateZ(300px)',
                                            background: 'rgba(30, 41, 59, 0.2)',
                                            opacity: view === "X-Ray" ? 0.05 : 0.2
                                        }}></div>

                                        {/* Top Face */}
                                        <div className={`${styles.face}`} style={{
                                            width: '600px',
                                            height: '200px',
                                            transform: 'rotateX(90deg) translateZ(200px)',
                                            background: 'rgba(30, 41, 59, 0.3)',
                                            opacity: view === "Ghost" ? 0.1 : 0.3,
                                            borderTop: '2px solid rgba(6, 182, 212, 0.3)'
                                        }}></div>

                                        {/* Loaded Blocks (Visual Representation) */}
                                        {[...Array(24)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className={styles.block3d}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                                style={{
                                                    width: 65,
                                                    height: 65,
                                                    left: (i % 6) * 75 + 40,
                                                    top: Math.floor(i / 12) * -75 + 130, // Stack heights
                                                    transform: `translateZ(${(Math.floor((i % 12) / 6) * -80) + 60}px)`,
                                                    background: i < 12 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(59, 130, 246, 0.8)',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4), 0 0 10px rgba(0,0,0,0.2)'
                                                } as any}
                                            >
                                                {/* Top Shadow Rim */}
                                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.2)' }}></div>
                                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(0,0,0,0.3)' }}></div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* HUD Telemetry Overlay */}
                                <div className={styles.telemetryHUD}>
                                    <div className={styles.teleGrid}>
                                        <div className={styles.teleItem}>
                                            <span className={styles.teleLabel}>EFFICIENCY</span>
                                            <strong className={styles.teleValue}>94.2%</strong>
                                        </div>
                                        <div className={styles.teleItem}>
                                            <span className={styles.teleLabel}>VOLUME USED</span>
                                            <strong className={styles.teleValue}>62.4 m³</strong>
                                        </div>
                                        <div className={styles.teleItem} style={{ border: 'none' }}>
                                            <span className={styles.teleLabel}>CENTER GRAVITY</span>
                                            <div className={styles.cgIndicator}>
                                                <div className={styles.cgDot}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className={styles.sidePanel}>
                        <div className="card-premium" style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <p className={styles.panelLabel}>Neural Processing</p>
                                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--secondary)' }}>{optProgress}%</span>
                            </div>
                            <div className={styles.utilBar}>
                                <motion.div
                                    className={styles.fill}
                                    style={{ width: `${optProgress}%`, background: 'var(--secondary)' }}
                                />
                            </div>
                            <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontWeight: 700 }}>Iterations: 8,442 | Time: 1.2s</p>
                        </div>

                        <div className={styles.statsGrid}>
                            <div className="card-premium" style={{ padding: '1rem' }}>
                                <div className={styles.statMiniLabel}><Scale size={14} /> Payload</div>
                                <div className={styles.statMiniVal}>24.5<span>t</span></div>
                            </div>
                            <div className="card-premium" style={{ padding: '1rem' }}>
                                <div className={styles.statMiniLabel}><Zap size={14} /> Energy</div>
                                <div className={styles.statMiniVal}>92%<span>A+</span></div>
                            </div>
                        </div>

                        <div className="card-premium" style={{ flex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                            <div className={styles.headerWithIcon}>
                                <Layers size={16} color="var(--primary)" />
                                <h3>STACKING SEQUENCE</h3>
                            </div>
                            <div className={styles.seqList}>
                                {[
                                    { id: "01", name: "Heavy Kraft (B42)", info: "120 Units | Row A-C" },
                                    { id: "02", name: "Gusset Mix (C11)", info: "85 Units | Row D-E" },
                                    { id: "03", name: "Light SOS (S1)", info: "240 Units | Top Level" },
                                ].map((item) => (
                                    <div key={item.id} className={styles.seqItem}>
                                        <div className={styles.seqBadge}>{item.id}</div>
                                        <div className={styles.seqContent}>
                                            <p>{item.name}</p>
                                            <span>{item.info}</span>
                                        </div>
                                        <button className={styles.miniAct}>View</button>
                                    </div>
                                ))}
                            </div>
                            <button className={styles.fullWidthBtn} style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
                                Export Master manifesto <ChevronRight size={14} />
                            </button>
                        </div>
                    </aside>
                </div>
            </div>

            <ActionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="Optimize Load"
            />
        </>
    );
}
