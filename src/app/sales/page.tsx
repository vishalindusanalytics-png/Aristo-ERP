"use client";

import {
    Plus,
    Filter,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    FileText,
    Download,
    ArrowUpDown
} from "lucide-react";
import styles from "./sales.module.css";
import { useState } from "react";
import ActionFormModal from "@/components/layout/ActionFormModal";

const inquiries = [
    { id: "INQ-2401", customer: "TechCorp Global", size: "12x4x10", gsm: "120", qty: "10,000", status: "Quoted", margin: "18%", val: "4.5L", date: "24 Feb" },
    { id: "INQ-2402", customer: "Green Mart Retail", size: "8x3x12", gsm: "100", qty: "5,000", status: "In Progress", margin: "22%", val: "2.1L", date: "23 Feb" },
    { id: "INQ-2403", customer: "Luxe Boutique", size: "15x5x15", gsm: "150", qty: "2,000", status: "Confirmed", margin: "15%", val: "1.8L", date: "22 Feb" },
    { id: "INQ-2404", customer: "Swift Logistics", size: "10x4x8", gsm: "120", qty: "25,000", status: "Inquiry", margin: "20%", val: "8.2L", date: "21 Feb" },
    { id: "INQ-2405", customer: "Eco Friendly Co", size: "12x5x10", gsm: "120", qty: "15,000", status: "Quoted", margin: "19.5%", val: "3.4L", date: "20 Feb" },
    { id: "INQ-2406", customer: "Daily Fresh", size: "8x2x10", gsm: "80", qty: "50,000", status: "Confirmed", margin: "25%", val: "12.0L", date: "19 Feb" },
];

export default function SalesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <button className={styles.filterBtn}><Filter size={14} /> Filters</button>
                    <button className={styles.filterBtn}><Download size={14} /> Export CSV</button>
                </div>
                <div className={styles.barRight}>
                    <button className="btn-primary" style={{ padding: '0.4rem 1rem' }} onClick={() => setIsModalOpen(true)}>
                        <Plus size={16} /> New Inquiry
                    </button>
                </div>
            </div>

            <div className="scroll-area">
                <div className="card-premium" style={{ width: '100%', overflow: 'hidden' }}>
                    <table className="table-container">
                        <thead>
                            <tr>
                                <th><div className={styles.thContent}>ID <ArrowUpDown size={12} /></div></th>
                                <th><div className={styles.thContent}>Customer <ArrowUpDown size={12} /></div></th>
                                <th>Specification</th>
                                <th>Qty</th>
                                <th>Value</th>
                                <th>Margin</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inq) => (
                                <tr key={inq.id} className={styles.tableRow}>
                                    <td className={styles.idCell}>{inq.id}</td>
                                    <td className={styles.custCell}>{inq.customer}</td>
                                    <td className={styles.specCell}>
                                        <strong>{inq.size}</strong>
                                        <span>{inq.gsm} GSM Kraft</span>
                                    </td>
                                    <td className={styles.qtyCell}>{inq.qty}</td>
                                    <td className={styles.valCell}>₹{inq.val}</td>
                                    <td>
                                        <div className={styles.marginInfo}>
                                            <span>{inq.margin}</span>
                                            <div className={styles.marginTrack}>
                                                <div className={styles.marginBar} style={{ width: inq.margin }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[inq.status.toLowerCase().replace(" ", "")]}`}>
                                            {inq.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.rowActions}>
                                            <button className="btn-ghost" title="View Quote"><FileText size={16} /></button>
                                            <button className="btn-ghost" title="More"><MoreVertical size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination-container" style={{ padding: '0.75rem 1.25rem' }}>
                        <p className="pagination-info">Showing 1-6 of 24 records</p>
                        <div className="pagination-controls">
                            <button className="pg-btn" disabled><ChevronLeft size={16} /></button>
                            <button className="pg-num active">1</button>
                            <button className="pg-num">2</button>
                            <button className="pg-num">3</button>
                            <button className="pg-btn"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <ActionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="New Inquiry"
            />
        </>
    );
}
