"use client";

import {
    Plus,
    Filter,
    ArrowUpDown,
    ArrowRightLeft,
    Truck,
    Package,
    ChevronLeft,
    ChevronRight,
    Search
} from "lucide-react";
import styles from "./dispatch.module.css";
import { useState } from "react";
import ActionFormModal from "@/components/layout/ActionFormModal";

const dispatchData = [
    { id: "DISP-9901", order: "AR-8812", client: "TechCorp Global", qty: "12,000 Pcs", vehicle: "MH-04-AX-8821", status: "In Transit", eta: "2 Hours" },
    { id: "DISP-9902", order: "AR-8805", client: "Green Mart", qty: "4,500 Pcs", vehicle: "GJ-01-BK-4412", status: "Loading", eta: "4 Hours" },
];

export default function Dispatch() {
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
                        <ArrowRightLeft size={16} />
                        Tally Sync
                    </button>
                </div>
                <div className={styles.barRight}>
                    <button className="btn-primary" style={{ padding: '0.4rem 1rem' }} onClick={() => openAction("Create Gate Pass")}>
                        <Plus size={16} />
                        Create Gate Pass
                    </button>
                </div>
            </div>

            <div className="scroll-area">
                <div className="card-premium">
                    <table className="table-container">
                        <thead>
                            <tr>
                                <th>Dispatch ID</th>
                                <th>Order Ref</th>
                                <th>Client Name</th>
                                <th>Load Qty</th>
                                <th>Vehicle Info</th>
                                <th>Live Status</th>
                                <th>ETA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dispatchData.map((item) => (
                                <tr key={item.id}>
                                    <td className={styles.idCell}>{item.id}</td>
                                    <td className={styles.orderCell}>{item.order}</td>
                                    <td>{item.client}</td>
                                    <td>{item.qty}</td>
                                    <td className={styles.truckCell}>
                                        <Truck size={14} />
                                        {item.vehicle}
                                    </td>
                                    <td>
                                        <div className={styles.statusGroup}>
                                            <div className={`${styles.statusDot} ${styles[item.status.toLowerCase().replace(" ", "")]}`}></div>
                                            <span>{item.status}</span>
                                        </div>
                                    </td>
                                    <td>{item.eta}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
