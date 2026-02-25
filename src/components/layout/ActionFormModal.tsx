"use client";

import { X, Calendar, Package, User, Hash, Ruler, Truck, FileText, Zap, AlertCircle } from "lucide-react";
import styles from "../masters/MasterFormModal.module.css"; // Reusing the same premium styles
import { motion, AnimatePresence } from "framer-motion";

interface ActionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: string | null;
}

export default function ActionFormModal({ isOpen, onClose, type }: ActionFormModalProps) {
    if (!isOpen) return null;

    const renderActionFields = () => {
        switch (type) {
            case "New Inquiry":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><User size={14} /> Customer Selection</label>
                            <select>
                                <option>Search existing customer...</option>
                                <option>TechCorp Global</option>
                                <option>Green Mart Retail</option>
                                <option>Luxe Boutique</option>
                                <option>+ Add New Customer</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label><Ruler size={14} /> Dimensions (W x G x H)</label>
                            <input type="text" placeholder="e.g. 240 x 100 x 320" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label><Hash size={14} /> Target Quantity</label>
                            <input type="number" placeholder="5,000" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Paper GSM</label>
                            <select>
                                <option>100 GSM</option>
                                <option>120 GSM</option>
                                <option>140 GSM</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Handle Type</label>
                            <select>
                                <option>Twisted Handle</option>
                                <option>Flat Handle</option>
                                <option>No Handle (SOS)</option>
                            </select>
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>Design/Printing Notes</label>
                            <textarea rows={2} placeholder="Logo placement, color specs..." />
                        </div>
                    </div>
                );
            case "Receive Stock":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><Package size={14} /> Material Name</label>
                            <select>
                                <option>Select raw material...</option>
                                <option>Brown Kraft Roll (120 GSM)</option>
                                <option>White Kraft Roll (100 GSM)</option>
                                <option>Synthetic Glue</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Received Qty</label>
                            <input type="number" placeholder="0.00" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Unit</label>
                            <select>
                                <option>Tons</option>
                                <option>KG</option>
                                <option>PCS</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label><Truck size={14} /> Supplier</label>
                            <input type="text" placeholder="Vendor Name" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label><FileText size={14} /> Bill/GRN No.</label>
                            <input type="text" placeholder="Invoice #7721" />
                        </div>
                    </div>
                );
            case "Create Gate Pass":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><Truck size={14} /> Vehicle Number</label>
                            <input type="text" placeholder="e.g. MH-04-AB-1234" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Driver Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Driver Phone</label>
                            <input type="tel" placeholder="+91..." />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>Orders to Load</label>
                            <select multiple style={{ height: '80px' }}>
                                <option>AR-4401 (TechCorp) - 12,000 Bags</option>
                                <option>AR-4405 (Green Mart) - 5,000 Boxes</option>
                            </select>
                        </div>
                    </div>
                );
            case "New Schedule":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><Zap size={14} /> Target Machine</label>
                            <select>
                                <option>M-01 High Speed</option>
                                <option>M-02 Medium</option>
                                <option>M-04 Auto-Folder</option>
                            </select>
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><FileText size={14} /> Select Job (Sales Order)</label>
                            <select>
                                <option>AR-8821: Paper Bag M-Size</option>
                                <option>AR-4490: Custom Kraft L-Size</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label><Calendar size={14} /> Start Date</label>
                            <input type="date" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Shift</label>
                            <select>
                                <option>Day Shift</option>
                                <option>Night Shift</option>
                            </select>
                        </div>
                    </div>
                );
            case "Material Issue":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><Package size={14} /> Select Material from Stock</label>
                            <select>
                                <option>Brown Kraft Roll (120 GSM) - 1.2 Tons available</option>
                                <option>Synthetic Glue - 425 KG available</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Quantity to Issue</label>
                            <input type="number" placeholder="0.00" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Destination Machine</label>
                            <select>
                                <option>M-01 High Speed</option>
                                <option>M-04 Auto-Folder</option>
                            </select>
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><FileText size={14} /> Production Order Ref</label>
                            <input type="text" placeholder="PO-2024-001" />
                        </div>
                    </div>
                );
            case "Tally Sync":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                                This will push all pending invoices and fetch updated ledger balances from Tally ERP.
                            </p>
                            <div style={{ background: 'var(--bg-hover)', padding: '1rem', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                                    <span>Pending Invoices</span>
                                    <strong>12</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                    <span>New Vendors</span>
                                    <strong>2</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "Reconcile Vouchers":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>Period for Reconciliation</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input type="date" placeholder="From" />
                                <input type="date" placeholder="To" />
                            </div>
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>Account Type</label>
                            <select>
                                <option>Sales Control A/c</option>
                                <option>Purchase Control A/c</option>
                                <option>Bank Reconciliation</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Tolerance Limit</label>
                            <input type="number" placeholder="₹ 0.00" />
                        </div>
                    </div>
                );
            case "Downtime Report":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><AlertCircle size={14} /> Reason for Downtime</label>
                            <select>
                                <option>Paper Break / Splice Error</option>
                                <option>Glue Nozzle Blockage</option>
                                <option>Mechanical Failure (Motor/Belt)</option>
                                <option>Electrical / PLC Fault</option>
                                <option>Wait for Material (Roll Change)</option>
                                <option>Scheduled Maintenance</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Duration (Minutes)</label>
                            <input type="number" placeholder="10" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Reported By</label>
                            <input type="text" placeholder="Operator Name" />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>Resolution Action Taken</label>
                            <textarea rows={2} placeholder="Briefly describe how it was fixed..." />
                        </div>
                    </div>
                );
            case "Non-Compliance Report":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><AlertCircle size={14} /> Defect Type</label>
                            <select>
                                <option>Ink Smudging / Off-register</option>
                                <option>Gusset Folding Alignment</option>
                                <option>Weak Bottom Seal Glue</option>
                                <option>Paper Tearing / Low BF</option>
                                <option>Handle Pull Failure</option>
                                <option>Dimensional Inaccuracy</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Batch Number</label>
                            <input type="text" placeholder="#AR-8821B-44" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Quarantine Qty</label>
                            <input type="number" placeholder="500" />
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>Inspector Comments</label>
                            <textarea rows={2} placeholder="Observations for supervisor..." />
                        </div>
                    </div>
                );
            case "Optimize Load":
                return (
                    <div className={styles.formGrid}>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label><Package size={14} /> Select Sales Order(s)</label>
                            <select multiple style={{ height: '80px' }}>
                                <option>AR-8821: TechCorp (1.2 Tons)</option>
                                <option>AR-4490: Green Mart (0.8 Tons)</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Container Type</label>
                            <select>
                                <option>40ft Standard High Cube</option>
                                <option>20ft Standard</option>
                                <option>40ft Open Top</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Stacking Logic</label>
                            <select>
                                <option>Heaviest Bottom</option>
                                <option>Volume Optimized</option>
                                <option>Fragile First</option>
                            </select>
                        </div>
                        <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                            <label>AI Constraints</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <input type="checkbox" defaultChecked /> Avoid Tilting
                                </label>
                                <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <input type="checkbox" defaultChecked /> Center Gravity
                                </label>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <p>Loading action form...</p>;
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
                            <p>Aristo ERP Transactional Workflow</p>
                        </div>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className={styles.body}>
                        {renderActionFields()}
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.cancelBtn} onClick={onClose}>Discard</button>
                        <button className={styles.submitBtn} onClick={onClose}>Execute Transaction</button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
