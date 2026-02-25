"use client";

import { X } from "lucide-react";
import styles from "./MasterFormModal.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface MasterFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: string | null;
}

export default function MasterFormModal({ isOpen, onClose, type }: MasterFormModalProps) {
    if (!isOpen) return null;

    const renderFormFields = () => {
        switch (type) {
            case "Client Directory":
                return (
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Client Name</label>
                            <input type="text" placeholder="e.g. TechCorp Global" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Contact Person</label>
                            <input type="text" placeholder="Full Name" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Phone Number</label>
                            <input type="tel" placeholder="+91 00000 00000" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>GSTIN</label>
                            <input type="text" placeholder="22AAAAA0000A1Z5" />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>Tally Ledger Name</label>
                            <input type="text" placeholder="Account Name in Tally" />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>Office Address</label>
                            <textarea rows={3} placeholder="Full Registered Address" />
                        </div>
                    </div>
                );
            case "Vendor Network":
                return (
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Vendor Name</label>
                            <input type="text" placeholder="e.g. Global Paper Mills" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Material Type</label>
                            <select>
                                <option>Kraft Paper</option>
                                <option>White Paper</option>
                                <option>Glue & Adhesives</option>
                                <option>Handle Raw Material</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Contact Email</label>
                            <input type="email" placeholder="vendor@example.com" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Tally Alias</label>
                            <input type="text" placeholder="Short Name" />
                        </div>
                    </div>
                );
            case "Bag Dimension Master":
                return (
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Width (mm)</label>
                            <input type="number" placeholder="e.g. 240" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Gusset (mm)</label>
                            <input type="number" placeholder="e.g. 100" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Height (mm)</label>
                            <input type="number" placeholder="e.g. 320" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Standard Loop</label>
                            <select>
                                <option>Small (25cm)</option>
                                <option>Medium (30cm)</option>
                                <option>Large (35cm)</option>
                            </select>
                        </div>
                    </div>
                );
            case "GSM Density Config":
                return (
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>GSM Value</label>
                            <input type="number" placeholder="e.g. 120" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Burst Factor (BF)</label>
                            <input type="number" placeholder="e.g. 18" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Paper Shade</label>
                            <input type="text" placeholder="e.g. Natural / Brown" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Material Price / KG</label>
                            <input type="number" placeholder="₹ 0.00" />
                        </div>
                    </div>
                );
            case "Carton Standards":
                return (
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Carton Code</label>
                            <input type="text" placeholder="e.g. C-11" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Ply Count</label>
                            <select>
                                <option>3 Ply</option>
                                <option>5 Ply</option>
                                <option>7 Ply</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Max Qty (Bags)</label>
                            <input type="number" placeholder="e.g. 250" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Material Type</label>
                            <input type="text" placeholder="e.g. Semi-Kraft" />
                        </div>
                    </div>
                );
            case "Shipping Containers":
                return (
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Contaner Type</label>
                            <select>
                                <option>20ft Standard</option>
                                <option>40ft Standard</option>
                                <option>40ft High Cube (HC)</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Max Payload (KG)</label>
                            <input type="number" placeholder="28000" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Capacity (CBM)</label>
                            <input type="number" placeholder="67.5" />
                        </div>
                    </div>
                );
            case "Art & Plates":
                return (
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Design Name</label>
                            <input type="text" placeholder="e.g. EcoMart Winter Logo" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Plate Type</label>
                            <select>
                                <option>Flexo Photopolymer</option>
                                <option>Stereo Rubber</option>
                                <option>Offset Plate</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Color Count</label>
                            <input type="number" placeholder="1-4" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Setup Cost</label>
                            <input type="number" placeholder="₹ 0.00" />
                        </div>
                    </div>
                );
            case "Handle Type Master":
                return (
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Handle Name</label>
                            <input type="text" placeholder="e.g. Twisted Paper Rope" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Material</label>
                            <input type="text" placeholder="e.g. Recycled Kraft" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Length (cm)</label>
                            <input type="number" placeholder="30" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Unit Cost</label>
                            <input type="number" placeholder="₹ 0.00" />
                        </div>
                    </div>
                );
            default:
                return <p>Form fields for {type} are being generated...</p>;
        }
    };

    return (
        <AnimatePresence>
            <div className={styles.overlay} onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className={styles.modal}
                    onClick={e => e.stopPropagation()}
                >
                    <div className={styles.header}>
                        <div className={styles.titleGroup}>
                            <h2>{type}</h2>
                            <p>Configure and save master entry</p>
                        </div>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className={styles.body}>
                        {renderFormFields()}
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                        <button className={styles.submitBtn} onClick={onClose}>Save Entry</button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
