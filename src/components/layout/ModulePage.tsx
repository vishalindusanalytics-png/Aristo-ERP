"use client";

import { Plus, Filter, Download, Search, Pencil, Trash2, X, Save, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./ModulePage.module.css";

export interface Column {
    key: string;
    label: string;
    render?: (val: string | number, row: Record<string, string | number>) => React.ReactNode;
}

export interface FieldDef {
    key: string;
    label: string;
    type?: "text" | "number" | "email" | "tel" | "date" | "select" | "textarea" | "password";
    options?: string[];        // for type="select"
    placeholder?: string;
    required?: boolean;
}

export interface ModulePageProps {
    title: string;
    subtitle?: string;
    addLabel?: string;
    columns: Column[];
    initialRows: Record<string, string | number>[];
    fields: FieldDef[];        // form field definitions
    stats?: { label: string; value: string; color: string }[];
    idPrefix?: string;         // e.g. "INQ-" for auto-id generation
    generateId?: (rows: Record<string, string | number>[]) => string;
    customHeader?: React.ReactNode;
    customDetailView?: (row: Record<string, string | number> | null) => React.ReactNode;
}

function generateAutoId(prefix: string, rows: Record<string, string | number>[]) {
    const nums = rows
        .map(r => {
            const idStr = String(r.id || r[Object.keys(r)[0]] || "");
            const match = idStr.match(/\d+$/);
            return match ? parseInt(match[0]) : 0;
        })
        .filter(n => !isNaN(n));
    const nextNum = nums.length > 0 ? Math.max(...nums) + 1 : 1;
    return `${prefix}${String(nextNum).padStart(4, "0")}`;
}

export default function ModulePage({
    title,
    addLabel = "Add New",
    columns,
    initialRows,
    fields,
    stats,
    idPrefix = "REC-",
    generateId,
    customHeader,
    customDetailView,
}: ModulePageProps) {
    const [rows, setRows] = useState<Record<string, string | number>[]>(initialRows);
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<Record<string, string | number> | null>(null);
    const [selectedRow, setSelectedRow] = useState<Record<string, string | number> | null>(initialRows[0] || null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);

    const filtered = rows.filter((row) =>
        Object.values(row).some((v) =>
            String(v).toLowerCase().includes(search.toLowerCase())
        )
    );

    const openAddDrawer = () => {
        const newId = generateId ? generateId(rows) : generateAutoId(idPrefix, rows);
        const blank: Record<string, string> = {};
        fields.forEach(f => {
            blank[f.key] = f.key === fields[0].key ? newId : "";
        });
        setFormData(blank);
        setEditingRow(null);
        setDrawerOpen(true);
    };

    const openEditDrawer = (row: Record<string, string | number>) => {
        const prefilled: Record<string, string> = {};
        fields.forEach(f => { prefilled[f.key] = String(row[f.key] ?? ""); });
        setFormData(prefilled);
        setEditingRow(row);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setEditingRow(null);
        setFormData({});
    };

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 400)); // simulate async save
        if (editingRow) {
            setRows(prev => prev.map(r =>
                r === editingRow ? { ...r, ...formData } : r
            ));
        } else {
            setRows(prev => [...prev, { ...formData }]);
        }
        setSaving(false);
        closeDrawer();
    };

    const handleDelete = (index: number) => {
        setDeleteTarget(index);
    };

    const confirmDelete = () => {
        if (deleteTarget !== null) {
            setRows(prev => prev.filter((_, i) => {
                const filteredOriginalIdx = rows.indexOf(filtered[deleteTarget]);
                return _ !== rows[filteredOriginalIdx];
            }));
            setDeleteTarget(null);
        }
    };

    const isFormValid = fields
        .filter(f => f.required !== false)
        .every(f => String(formData[f.key] ?? "").trim().length > 0);

    return (
        <>
            {/* Action Bar */}
            <div className="page-action-bar">
                <div className={styles.barLeft}>
                    <div className={styles.searchBox}>
                        <Search size={14} className={styles.searchIcon} />
                        <input
                            placeholder={`Search ${title}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className={styles.filterBtn}><Filter size={14} /> Filter</button>
                    <button className={styles.filterBtn}><Download size={14} /> Export</button>
                </div>
                <div className={styles.barRight}>
                    <button className="btn-primary" style={{ padding: "0.4rem 1rem", display: "flex", alignItems: "center", gap: "0.4rem" }} onClick={openAddDrawer}>
                        <Plus size={15} /> {addLabel}
                    </button>
                </div>
            </div>

            {/* Scroll Area */}
            <div className="scroll-area">
                {customHeader && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        {customHeader}
                    </div>
                )}

                {customDetailView && (
                    <div className={styles.customDetailSection} style={{ marginBottom: '1.5rem' }}>
                        {customDetailView(selectedRow)}
                    </div>
                )}
                {/* Stats Row */}
                {stats && stats.length > 0 && (
                    <div className={styles.statsRow}>
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -3 }}
                                className={`card-premium ${styles.statCard}`}
                                style={{ borderTop: `3px solid ${s.color}` }}
                            >
                                <p className={styles.statLabel}>{s.label}</p>
                                <h3 className={styles.statValue} style={{ color: s.color }}>{s.value}</h3>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Table */}
                <div className="card-premium" style={{ width: "100%", overflow: "hidden" }}>
                    <table className="table-container">
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                                <th style={{ width: 80, textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-dim)" }}>
                                        No records found.{" "}
                                        <button style={{ color: "var(--primary)", fontWeight: 600 }} onClick={openAddDrawer}>
                                            Add the first one?
                                        </button>
                                    </td>
                                </tr>
                            )}
                            {filtered.map((row, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className={`${styles.tableRow} ${selectedRow === row ? styles.selectedRow : ""}`}
                                    onClick={() => setSelectedRow(row)}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key}>
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                    <td>
                                        <div className={styles.actionBtns}>
                                            <button
                                                className={styles.editBtn}
                                                title="Edit"
                                                onClick={() => openEditDrawer(row)}
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                className={styles.deleteBtn}
                                                title="Delete"
                                                onClick={() => handleDelete(i)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination-container" style={{ padding: "0.75rem 1.25rem" }}>
                        <p className="pagination-info">
                            Showing {filtered.length} of {rows.length} records
                        </p>
                    </div>
                </div>
            </div>

            {/* Drawer Overlay */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        <motion.div
                            className={styles.overlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeDrawer}
                        />
                        <motion.aside
                            className={styles.drawer}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        >
                            {/* Drawer Header */}
                            <div className={styles.drawerHeader}>
                                <div>
                                    <h2 className={styles.drawerTitle}>
                                        {editingRow ? `Edit ${title}` : `New ${title}`}
                                    </h2>
                                    <p className={styles.drawerSubtitle}>
                                        {editingRow ? "Update the details below" : "Fill in the details to add a new record"}
                                    </p>
                                </div>
                                <button className={styles.drawerClose} onClick={closeDrawer}>
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Drawer Body */}
                            <div className={styles.drawerBody}>
                                <div className={styles.formGrid}>
                                    {fields.map((field) => (
                                        <div
                                            key={field.key}
                                            className={`${styles.formGroup} ${field.type === "textarea" ? styles.fullWidth : ""}`}
                                        >
                                            <label className={styles.formLabel}>
                                                {field.label}
                                                {field.required !== false && <span className={styles.required}>*</span>}
                                            </label>
                                            {field.type === "select" ? (
                                                <select
                                                    className={styles.formInput}
                                                    value={formData[field.key] ?? ""}
                                                    onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                                                >
                                                    <option value="">Select {field.label}</option>
                                                    {field.options?.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : field.type === "textarea" ? (
                                                <textarea
                                                    className={`${styles.formInput} ${styles.formTextarea}`}
                                                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                                                    value={formData[field.key] ?? ""}
                                                    onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                                                    rows={3}
                                                />
                                            ) : (
                                                <input
                                                    type={field.type ?? "text"}
                                                    className={styles.formInput}
                                                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                                                    value={formData[field.key] ?? ""}
                                                    readOnly={field.key === fields[0].key && !editingRow}
                                                    onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Drawer Footer */}
                            <div className={styles.drawerFooter}>
                                <button className={styles.cancelBtn} onClick={closeDrawer}>
                                    Cancel
                                </button>
                                <button
                                    className={styles.saveBtn}
                                    onClick={handleSave}
                                    disabled={!isFormValid || saving}
                                >
                                    {saving ? (
                                        <span className={styles.spinner} />
                                    ) : (
                                        <Save size={15} />
                                    )}
                                    {saving ? "Saving..." : editingRow ? "Update Record" : "Save Record"}
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteTarget !== null && (
                    <>
                        <motion.div
                            className={styles.overlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDeleteTarget(null)}
                        />
                        <motion.div
                            className={styles.confirmModal}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        >
                            <div className={styles.confirmIcon}>
                                <AlertTriangle size={28} color="#ef4444" />
                            </div>
                            <h3 className={styles.confirmTitle}>Delete Record?</h3>
                            <p className={styles.confirmText}>
                                This action cannot be undone. The record will be permanently removed.
                            </p>
                            <div className={styles.confirmActions}>
                                <button className={styles.cancelBtn} onClick={() => setDeleteTarget(null)}>
                                    Cancel
                                </button>
                                <button className={styles.dangerBtn} onClick={confirmDelete}>
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
