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
            { name: "Client Directory", icon: Users, count: 124, desc: "B2B Customer Base & Ledger Mappings" },
            { name: "Vendor Network", icon: UserSquare2, count: 42, desc: "Material Suppliers & Service Providers" },
        ]
    },
    {
        group: "Technical Standards",
        items: [
            { name: "Bag Dimension Master", icon: Maximize2, count: 852, desc: "Width, Gusset & Height Presets" },
            { name: "GSM Density Config", icon: Database, count: 12, desc: "Paper Quality & Burst Factor Rules" },
            { name: "Art & Plates", icon: Palette, count: 240, desc: "Printing Assets & Stereos" },
            { name: "Handle Type Master", icon: Settings2, count: 8, desc: "Flat, Rope & SOS Configurations" },
        ]
    },
    {
        group: "Global Logistics",
        items: [
            { name: "Carton Standards", icon: Box, count: 18, desc: "Secondary Transit Packaging" },
            { name: "Shipping Containers", icon: Truck, count: 4, desc: "ISO 20ft/40ft Spatial Rules" },
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
                        <p>Active Entities</p>
                        <h3>1,342</h3>
                        <div className={styles.healthBar}><div className={styles.healthFill} style={{ width: '88%' }}></div></div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={`${styles.miniStat} card-premium`}>
                        <p>Data Accuracy</p>
                        <h3>99.4%</h3>
                        <div className={styles.healthBar}><div className={styles.healthFill} style={{ width: '99%', background: 'var(--secondary)' }}></div></div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={`${styles.miniStat} card-premium`}>
                        <p>Last Sync</p>
                        <h3>04m ago</h3>
                        <div className={styles.healthBar}><div className={styles.healthFill} style={{ width: '100%', background: 'var(--accent)' }}></div></div>
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
                                            <span className={styles.count}><Cpu size={14} /> {item.count} Records</span>
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
