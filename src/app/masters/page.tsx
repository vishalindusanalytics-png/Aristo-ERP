"use client";

import {
    Users,
    UserSquare2,
    Maximize2,
    Database,
    Palette,
    Package,
    ChevronRight,
    Search,
    Plus,
    ArrowUpDown,
    ChevronLeft,
    Settings2,
    Box,
    Truck,
    ShieldCheck,
    Dna,
    Network,
    Cpu
} from "lucide-react";
import styles from "./masters.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import MasterFormModal from "@/components/masters/MasterFormModal";

const masterGroups = [
    {
        group: "Enterprise Stakeholders",
        items: [
            { name: "Client Directory", icon: Users, count: 124, desc: "B2B Customer Base & Ledger Mappings", lastUpdated: "2h ago" },
            { name: "Vendor Network", icon: UserSquare2, count: 42, desc: "Material Suppliers & Service Providers", lastUpdated: "1d ago" },
            { name: "Transporter Master", icon: Truck, count: 18, desc: "Logistics Partners & Freight Agents", lastUpdated: "3d ago" },
        ]
    },
    {
        group: "Product & Material Standards",
        items: [
            { name: "Product Master", icon: Package, count: 345, desc: "Finished Bag SKU & Variant Catalog", lastUpdated: "5h ago" },
            { name: "Bag Dimension Master", icon: Maximize2, count: 852, desc: "Width, Gusset & Height Presets", lastUpdated: "1d ago" },
            { name: "GSM Density Config", icon: Database, count: 12, desc: "Paper Quality & Burst Factor Rules", lastUpdated: "1w ago" },
            { name: "Art & Plates", icon: Palette, count: 240, desc: "Printing Assets & Stereos Library", lastUpdated: "2d ago" },
            { name: "Handle Type Master", icon: Settings2, count: 8, desc: "Flat, Rope & SOS Configurations", lastUpdated: "1w ago" },
            { name: "Raw Material Master", icon: Dna, count: 156, desc: "Paper Rolls, Adhesive & Consumables", lastUpdated: "6h ago" },
        ]
    },
    {
        group: "Production & Logistics",
        items: [
            { name: "Machine Master", icon: Cpu, count: 24, desc: "Production Equipment Registry & Specs", lastUpdated: "4h ago" },
            { name: "Process Master", icon: Network, count: 16, desc: "Standard Operating Procedures & Routes", lastUpdated: "2d ago" },
            { name: "Carton Standards", icon: Box, count: 18, desc: "Secondary Transit Packaging Specs", lastUpdated: "1d ago" },
            { name: "Shipping Containers", icon: ShieldCheck, count: 4, desc: "ISO 20ft/40ft Spatial Configuration", lastUpdated: "1w ago" },
        ]
    }
];

export default function Masters() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMaster, setSelectedMaster] = useState<string | null>(null);

    const openForm = (name: string) => {
        setSelectedMaster(name);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <div className={styles.searchWrapper}>
                        <Search size={16} className={styles.searchIcon} />
                        <input type="text" placeholder="Filter Master Repositories..." />
                    </div>
                </div>
                <div className={styles.barRight}>
                    <button className="btn-primary" style={{ padding: '0.4rem 1.25rem' }} onClick={() => openForm("New Entry")}>
                        <Plus size={16} /> New Entity
                    </button>
                </div>
            </div>

            <div className="scroll-area">
                <div className={styles.statsHeader}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`${styles.miniStat} card-premium`}>
                        <p>Total Master Records</p>
                        <h3>1,827</h3>
                        <div className={styles.healthBar}><div className={styles.healthFill} style={{ width: '92%' }}></div></div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>13 Active Categories</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={`${styles.miniStat} card-premium`}>
                        <p>Data Integrity</p>
                        <h3>99.8%</h3>
                        <div className={styles.healthBar}><div className={styles.healthFill} style={{ width: '99.8%', background: 'var(--secondary)' }}></div></div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--secondary)', marginTop: '0.25rem' }}>All Validations Passed</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={`${styles.miniStat} card-premium`}>
                        <p>Tally Sync Status</p>
                        <h3>Live</h3>
                        <div className={styles.healthBar}><div className={styles.healthFill} style={{ width: '100%', background: 'var(--accent)' }}></div></div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--accent)', marginTop: '0.25rem' }}>Last sync: 4m ago</span>
                    </motion.div>
                </div>

                <div className={styles.grid}>
                    {masterGroups.map((group, idx) => (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={styles.groupSection}
                        >
                            <div className={styles.sectionHeader}>
                                <h3>{group.group}</h3>
                                <div className={styles.line}></div>
                            </div>

                            <div className={styles.cardGrid}>
                                {group.items.map((item, iidx) => (
                                    <motion.div
                                        key={iidx}
                                        whileHover={{ y: -8 }}
                                        className={`${styles.masterCard} card-premium`}
                                        onClick={() => openForm(item.name)}
                                    >
                                        <div className={styles.cardTop}>
                                            <div className={styles.iconBox}><item.icon size={22} /></div>
                                            <div className={styles.cardText}>
                                                <h4>{item.name}</h4>
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className={styles.cardBottom}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <span className={styles.count}><Cpu size={14} /> {item.count} Records</span>
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>Updated: {item.lastUpdated}</span>
                                            </div>
                                            <div className={styles.badge}><ChevronRight size={16} /></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>

            <MasterFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={selectedMaster}
            />
        </>
    );
}
