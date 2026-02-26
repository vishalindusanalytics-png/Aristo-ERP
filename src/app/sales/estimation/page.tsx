"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
    Calculator,
    ChevronRight,
    ChevronLeft,
    FileText,
    Sparkles,
    Printer,
    Package,
    ArrowUpRight,
    TrendingUp,
    ShieldCheck,
    Briefcase,
    Zap,
    Truck,
    ShoppingBag,
    History,
    Search,
    Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Estimation.module.css';

const STEPS = [
    { name: "Context", icon: Briefcase },
    { name: "Product", icon: Package },
    { name: "Logistics", icon: Truck },
    { name: "Direct Cost", icon: Calculator },
    { name: "Production", icon: Zap },
    { name: "Finalize", icon: TrendingUp }
];

export default function ProfessionalEstimation() {
    const [view, setView] = useState<'create' | 'archive'>('create');
    const [currentStep, setCurrentStep] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [archiveData, setArchiveData] = useState([
        { id: "EST-2108", customer: "TechCorp Global", date: "2026-02-25", qty: 10000, value: 45000, status: "Draft", type: "Export", bag: "SOS Box" },
        { id: "EST-2095", customer: "Green Mart", date: "2026-02-24", qty: 5000, value: 18500, status: "Quoted", type: "Domestic", bag: "Flat-V" },
        { id: "EST-2088", customer: "Luxe Boutique", date: "2026-02-23", qty: 2000, value: 12000, status: "Ordered", type: "Export", bag: "Twisted" },
        { id: "EST-2070", customer: "Daily Fresh", date: "2026-02-22", qty: 25000, value: 98000, status: "Quoted", type: "Domestic", bag: "SOS Box" },
        { id: "EST-2055", customer: "Swift Logistics", date: "2026-02-21", qty: 15000, value: 62000, status: "Draft", type: "Export", bag: "Twisted" },
    ]);
    const [data, setData] = useState({
        estNo: "EST-COMING",
        estDate: "",
        customerName: '',
        customerType: 'Domestic',
        inquiryRef: '',
        salesPerson: '',
        currency: 'INR',
        deliveryDate: '',
        targetPrice: 0,
        remarks: '',
        leadTime: '15 Days',
        paymentTerms: '30 Days Net',
        urgency: 'Standard',
        industry: 'Retail',
        targetMargin: 15,

        bagType: 'SOS',
        width: 300,
        gusset: 120,
        height: 400,
        gsm: 120,
        paperType: 'Kraft Brown',
        printing: 'Yes',
        inkColors: 2,
        inkCoverage: 10,
        coating: 'None',
        reinforceBottom: false,
        printSide: 'Single',
        handleType: 'Twisted',
        handleColor: 'Matching',
        handleGsm: 100,
        reinforcement: 'Yes',
        topFold: true,
        dieCut: false,

        orderQty: 10000,
        wastagePercent: 4.5,
        extraQtyPercent: 0,
        packingType: 'Bundle',
        pcsPerBundle: 50,
        cartonType: '3 Ply',

        paperRate: 68,
        glueType: 'Hotmelt',
        glueUsage: 3.2,
        glueRate: 95,
        handleCostPerPc: 1.25,

        plateCostPerColor: 1200,
        inkUsagePer1000: 450,
        inkRate: 320,

        machineSpeed: 85,
        machineHourRate: 550,
        powerCostPerHour: 95,
        labourCostPerHour: 60,
        setupTime: 30,

        factoryOverheadPercent: 6,
        adminOverheadPercent: 4,
        marginPercent: 18,

        freightCost: 0,
        insuranceCost: 0,
        documentationCost: 0,
        containerCost: 0
    });

    useEffect(() => {
        setData(prev => ({
            ...prev,
            estNo: `EST-${Math.floor(Math.random() * 9000) + 1000}`,
            estDate: new Date().toISOString().split('T')[0]
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const calcs = useMemo(() => {
        const finalProdQty = Math.ceil(data.orderQty * (1 + (data.wastagePercent / 100)) * (1 + (data.extraQtyPercent / 100)));
        const devWidth = data.width + (2 * data.gusset) + 25;
        const devLength = data.height + 40 + 20;
        const paperArea = (devWidth * devLength) / 1000000;
        const weight = paperArea * data.gsm;
        const paperKg = (weight * finalProdQty) / 1000;
        const paperCost = paperKg * data.paperRate;

        const glueKg = (data.glueUsage * finalProdQty) / 1000;
        const glueCost = glueKg * data.glueRate;
        const handleCost = data.handleType !== 'None' ? data.handleCostPerPc * finalProdQty : 0;

        let printCost = 0;
        if (data.printing === 'Yes') {
            const plate = data.plateCostPerColor * data.inkColors;
            // Base ink usage adjusted by coverage %
            const ink = ((data.inkUsagePer1000 * finalProdQty * (data.inkCoverage / 100)) / 1000) * data.inkRate;
            printCost = plate + ink;
        }

        const reinforceCost = data.reinforceBottom ? (5.5 * finalProdQty) : 0; // Fixed cost for bottom board

        const runTime = (finalProdQty / (data.machineSpeed * 60)) + (data.setupTime / 60);
        const mcCost = runTime * (data.machineHourRate + data.powerCostPerHour);
        const lbCost = runTime * data.labourCostPerHour;

        const directCost = paperCost + glueCost + handleCost + printCost + mcCost + lbCost + reinforceCost;
        const overhead = directCost * ((data.factoryOverheadPercent + data.adminOverheadPercent) / 100);
        const totalProductionCost = directCost + overhead;

        const costPerBag = totalProductionCost / finalProdQty;
        const targetSP = costPerBag * (1 + (data.marginPercent / 100));

        const totalExport = data.customerType === 'Export' ? (data.freightCost + data.insuranceCost + data.documentationCost + data.containerCost) : 0;
        const finalRevenue = (targetSP * data.orderQty) + totalExport;
        const totalProfit = finalRevenue - totalProductionCost - totalExport;

        return {
            finalProdQty,
            devWidth,
            devLength,
            weight,
            paperKg,
            costs: {
                paper: paperCost,
                glue: glueCost,
                handle: handleCost,
                printing: printCost,
                machine: mcCost,
                labour: lbCost,
                overhead: overhead
            },
            totalProductionCost,
            costPerBag,
            targetSP,
            finalRevenue,
            totalProfit,
            prodTimeHours: runTime,
            marginOnRevenue: (totalProfit / finalRevenue) * 100
        };
    }, [data]);

    const steps = [
        {
            title: "Commercial Context",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Customer Entity</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="customerName" value={data.customerName} onChange={handleChange}>
                                <option value="">Select Master Entity</option>
                                <option value="TechCorp">TechCorp Global Logistics</option>
                                <option value="GreenMart">Green Mart Retail Chain</option>
                                <option value="Luxe">Luxe Boutique Intl.</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Region / Flow</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="customerType" value={data.customerType} onChange={handleChange}>
                                <option value="Domestic">Domestic (Local GST)</option>
                                <option value="Export">International (Export Flow)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Industry Segment</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="industry" value={data.industry} onChange={handleChange}>
                                <option value="Retail">Retail / Fashion</option>
                                <option value="Food">Food / Beverage</option>
                                <option value="ecommerce">E-Commerce</option>
                                <option value="Medical">Medical / Pharma</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Sales Executive</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="salesPerson" value={data.salesPerson} onChange={handleChange}>
                                <option value="Arjun">Arjun Singh</option>
                                <option value="Anita">Anita Shah</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Currency</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="currency" value={data.currency} onChange={handleChange}>
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Project Urgency</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="urgency" value={data.urgency} onChange={handleChange}>
                                <option value="Standard">Standard (Low Cost)</option>
                                <option value="Urgent">Urgent (Express)</option>
                                <option value="Critical">Critical (Overtime)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Lead Time</label>
                            <select className={styles.inputField} name="leadTime" value={data.leadTime} onChange={handleChange}>
                                <option value="7 Days">7 Days (Express)</option>
                                <option value="15 Days">15 Days (Std)</option>
                                <option value="30 Days">30 Days (Bulk)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Payment Terms</label>
                            <select className={styles.inputField} name="paymentTerms" value={data.paymentTerms} onChange={handleChange}>
                                <option value="Advanced">100% Adv.</option>
                                <option value="30 Days">30 Days Net</option>
                                <option value="LC">Letter Credit</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup} style={{ gridColumn: 'span 4' }}>
                            <label className={styles.label}>Strategic Remarks</label>
                            <textarea className={styles.inputField} name="remarks" value={data.remarks} onChange={handleChange} rows={1} placeholder="Competitive insights, competitor price, or unique requirements..." />
                        </div>
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><Sparkles size={10} /> AI COMMERCIAL INSIGHT</div>
                        <div className={styles.advisoryContent}>
                            <span className={styles.statBadge}>SEGMENT: {data.industry.toUpperCase()}</span>
                            This industry usually yields <span style={{ color: 'var(--primary)', fontWeight: 800 }}>12-15% margin</span>. Selected lead time is within typical SLA for {data.customerType} shipments.
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Product Engineering",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Bag Type</label>
                            <select className={styles.inputField} name="bagType" value={data.bagType} onChange={handleChange}>
                                <option value="SOS">SOS Box Bag</option>
                                <option value="Flat">Flat-V Handleless</option>
                                <option value="Twisted">Twisted Handle</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Paper Base</label>
                            <select className={styles.inputField} name="paperType" value={data.paperType} onChange={handleChange}>
                                <option value="Kraft Brown">Kraft Natural Brown</option>
                                <option value="White">Bleached White</option>
                                <option value="Premium">Recycled Grey</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>GSM</label>
                            <select className={styles.inputField} name="gsm" value={data.gsm} onChange={handleChange}>
                                {[80, 100, 110, 120, 140, 150].map(g => <option key={g} value={g}>{g} GSM</option>)}
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Printing</label>
                            <select className={styles.inputField} name="printing" value={data.printing} onChange={handleChange}>
                                <option value="Yes">Yes (Custom)</option>
                                <option value="No">No (Plain)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Ink Colors</label>
                            <select className={styles.inputField} name="inkColors" value={data.inkColors} onChange={handleChange}>
                                {[0, 1, 2, 3, 4, 6].map(c => <option key={c} value={c}>{c} Colors</option>)}
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Print Side</label>
                            <select className={styles.inputField} name="printSide" value={data.printSide} onChange={handleChange}>
                                <option value="Single">Single Side</option>
                                <option value="Both">Both Sides</option>
                                <option value="Full">Full Coverage</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Surface Finish</label>
                            <select className={styles.inputField} name="coating" value={data.coating} onChange={handleChange}>
                                <option value="None">None</option>
                                <option value="Varnish">Varnish</option>
                                <option value="Lamination">Lamination</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Reinforce</label>
                            <select className={styles.inputField} name="reinforceBottom" value={data.reinforceBottom.toString()} onChange={handleChange}>
                                <option value="false">Base Only</option>
                                <option value="true">Cardboard (Bottom)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Width (mm)</label>
                            <input className={styles.inputField} type="number" name="width" value={data.width} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Gusset (mm)</label>
                            <input className={styles.inputField} type="number" name="gusset" value={data.gusset} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Height (mm)</label>
                            <input className={styles.inputField} type="number" name="height" value={data.height} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Handle GSM</label>
                            <input className={styles.inputField} type="number" name="handleGsm" value={data.handleGsm} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><Zap size={10} /> ENGINEERING VERDICT</div>
                        <div className={styles.advisoryContent}>
                            <span className={styles.statBadge}>VOL: {(data.width * data.gusset * data.height / 1000000).toFixed(1)}L</span>
                            Structural integrity verified for {data.gsm}gsm. {data.coating !== 'None' ? 'Premium finish selected, machine speed should be reduced by 10%.' : 'Natural finish allows high-speed run.'}
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Logistics & Quantity",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Order Quantity</label>
                            <input className={styles.inputField} type="number" name="orderQty" value={data.orderQty} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Wastage (%)</label>
                            <input className={styles.inputField} type="number" name="wastagePercent" value={data.wastagePercent} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Packing Type</label>
                            <select className={styles.inputField} name="packingType" value={data.packingType} onChange={handleChange}>
                                <option value="Bundle">Bundle Wrap</option>
                                <option value="Carton">Corrugated Box</option>
                                <option value="Pallet">Palletization</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Pcs / Unit</label>
                            <input className={styles.inputField} type="number" name="pcsPerBundle" value={data.pcsPerBundle} onChange={handleChange} />
                        </div>
                        {data.customerType === 'Export' ? (
                            <>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Ocean/Air Freight</label>
                                    <input className={styles.inputField} type="number" name="freightCost" value={data.freightCost} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Insurance (CIF)</label>
                                    <input className={styles.inputField} type="number" name="insuranceCost" value={data.insuranceCost} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Documentation</label>
                                    <input className={styles.inputField} type="number" name="documentationCost" value={data.documentationCost} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Container Handling</label>
                                    <input className={styles.inputField} type="number" name="containerCost" value={data.containerCost} onChange={handleChange} />
                                </div>
                            </>
                        ) : (
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Carton Type</label>
                                <select className={styles.inputField} name="cartonType" value={data.cartonType} onChange={handleChange}>
                                    <option value="3 Ply">3 Ply Standard</option>
                                    <option value="5 Ply">5 Ply Heavy Duty</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><Calculator size={10} /> LOGISTICS ANALYTICS</div>
                        <div className={styles.advisoryContent}>
                            <span className={styles.statBadge}>TOT WT: {((calcs.weight * data.orderQty) / 1000).toFixed(0)} KG</span>
                            Estimated volume: <span style={{ fontWeight: 700 }}>{(data.orderQty / data.pcsPerBundle).toFixed(0)} units</span> to be packed. {data.customerType === 'Export' ? 'Recommended container: 20ft FCL.' : 'Recommended vehicle: 14ft Truck.'}
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Direct Material",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Paper Rate (Ex-Mill)</label>
                            <input className={styles.inputField} type="number" name="paperRate" value={data.paperRate} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Glue Type</label>
                            <select className={styles.inputField} name="glueType" value={data.glueType} onChange={handleChange}>
                                <option value="Hotmelt">Hotmelt (High Speed)</option>
                                <option value="WaterBased">Water Based (Eco)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Glue Usage (g/pc)</label>
                            <input className={styles.inputField} type="number" name="glueUsage" value={data.glueUsage} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Glue Rate / KG</label>
                            <input className={styles.inputField} type="number" name="glueRate" value={data.glueRate} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Handle Style</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="handleType" value={data.handleType} onChange={handleChange}>
                                <option value="None">No Handle</option>
                                <option value="Twisted">Twisted Paper</option>
                                <option value="Flat">Flat Paper</option>
                                <option value="Cotton">Cotton Rope</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Handle Rate / Pair</label>
                            <input className={styles.inputField} type="number" name="handleCostPerPc" value={data.handleCostPerPc} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Plate / Block Cost</label>
                            <input className={styles.inputField} type="number" name="plateCostPerColor" value={data.plateCostPerColor} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Ink Rate / KG</label>
                            <input className={styles.inputField} type="number" name="inkRate" value={data.inkRate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><ShoppingBag size={10} /> PROCUREMENT FEED</div>
                        <div className={styles.advisoryContent}>
                            <span className={styles.statBadge}>PAPER: {data.paperRate}/KG</span>
                            Market average for {data.paperType} is currently ₹65-72. Glue consumption is within 5% of standard recipe.
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Process Parameters",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Running Speed (Bpm)</label>
                            <input className={styles.inputField} type="number" name="machineSpeed" value={data.machineSpeed} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Setup Time (Min)</label>
                            <input className={styles.inputField} type="number" name="setupTime" value={data.setupTime} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>M/c Hour Rate</label>
                            <input className={styles.inputField} type="number" name="machineHourRate" value={data.machineHourRate} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Power / Hr</label>
                            <input className={styles.inputField} type="number" name="powerCostPerHour" value={data.powerCostPerHour} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Labour / Hr</label>
                            <input className={styles.inputField} type="number" name="labourCostPerHour" value={data.labourCostPerHour} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Target Margin (%)</label>
                            <input className={styles.inputField} type="number" name="marginPercent" value={data.marginPercent} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Admin OH (%)</label>
                            <input className={styles.inputField} type="number" name="adminOverheadPercent" value={data.adminOverheadPercent} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Factory OH (%)</label>
                            <input className={styles.inputField} type="number" name="factoryOverheadPercent" value={data.factoryOverheadPercent} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><TrendingUp size={10} /> PRODUCTION FORECAST</div>
                        <div className={styles.advisoryContent}>
                            <span className={styles.statBadge}>PROD TIME: {calcs.prodTimeHours.toFixed(1)}H</span>
                            Total production including setup: <span style={{ fontWeight: 700 }}>{(calcs.prodTimeHours + data.setupTime / 60).toFixed(1)} hours</span>. Efficiency rated at 92%.
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Industrial Summary",
            content: (
                <div className={styles.reportGrid}>
                    <div className={styles.reportSection}>
                        <h3 className={styles.reportTitle}><Briefcase size={12} style={{ marginRight: '6px' }} /> COMMERCIAL RECAP</h3>
                        <div style={{ display: 'grid', gap: '0.4rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className={styles.rowLabel}>Customer:</span>
                                <span className={styles.rowValue}>{data.customerName || 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className={styles.rowLabel}>Lead Time:</span>
                                <span className={styles.rowValue}>{data.leadTime}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className={styles.rowLabel}>Terms:</span>
                                <span className={styles.rowValue}>{data.paymentTerms}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', paddingTop: '4px', borderTop: `1px solid var(--border)` }}>
                                <span className={styles.rowLabel}>Order Qty:</span>
                                <span className={styles.highlightValue}>{data.orderQty.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reportSection}>
                        <h3 className={styles.reportTitle}><Package size={12} style={{ marginRight: '6px' }} /> TECH PROFILE</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                            <div>
                                <div className={styles.rowLabel}>Bag Size</div>
                                <div className={styles.rowValue}>{data.width}x{data.gusset}x{data.height}</div>
                            </div>
                            <div>
                                <div className={styles.rowLabel}>Paper/GSM</div>
                                <div className={styles.rowValue}>{data.gsm}G {data.paperType}</div>
                            </div>
                            <div>
                                <div className={styles.rowLabel}>Printing</div>
                                <div className={styles.rowValue}>{data.inkColors} Colors</div>
                            </div>
                            <div>
                                <div className={styles.rowLabel}>Unit Wt</div>
                                <div className={styles.rowValue}>{calcs.weight.toFixed(1)}g</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reportSection}>
                        <h3 className={styles.reportTitle}><Calculator size={12} style={{ marginRight: '6px' }} /> COST BREAKDOWN</h3>
                        <div style={{ display: 'grid', gap: '0.3rem' }}>
                            {[
                                { l: 'Paper', v: calcs.costs.paper },
                                { l: 'Glue/Handles', v: calcs.costs.glue + calcs.costs.handle },
                                { l: 'Print', v: calcs.costs.printing },
                                { l: 'M/c & Lab.', v: calcs.costs.machine + calcs.costs.labour },
                                { l: 'Overheads', v: calcs.costs.overhead }
                            ].map((row, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className={styles.rowLabel}>{row.l}</span>
                                    <span className={styles.rowValue}>₹{row.v.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.reportSummaryBanner}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div className={styles.mainPriceLabel}>AI PROJECTED COST / PC</div>
                                <div className={styles.mainPriceValue}>₹{calcs.costPerBag.toFixed(2)}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className={styles.mainPriceLabel}>TARGET QUOTATION SP</div>
                                <div className={styles.mainPriceValue} style={{ color: 'var(--secondary)' }}>₹{calcs.targetSP.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div>
                        <h1 className={styles.titleMain}>PrecisionAI Costing</h1>
                        <p className={styles.subtitle}>Revision 1.05 • Industrial Grade</p>
                    </div>
                    <div style={{ display: 'flex', background: 'var(--bg-hover)', padding: '3px', borderRadius: '8px' }}>
                        <button
                            className={styles.btnBase}
                            style={{
                                padding: '0.4rem 1rem',
                                background: view === 'create' ? 'var(--primary)' : 'transparent',
                                color: view === 'create' ? 'white' : 'var(--text-muted)',
                                fontSize: '0.75rem'
                            }}
                            onClick={() => setView('create')}
                        >
                            CREATE NEW
                        </button>
                        <button
                            className={styles.btnBase}
                            style={{
                                padding: '0.4rem 1rem',
                                background: view === 'archive' ? 'var(--primary)' : 'transparent',
                                color: view === 'archive' ? 'white' : 'var(--text-muted)',
                                fontSize: '0.75rem'
                            }}
                            onClick={() => setView('archive')}
                        >
                            ARCHIVE
                        </button>
                    </div>
                </div>
                {view === 'create' ? (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', background: 'var(--primary-soft)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
                            {data.estNo}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(139, 92, 246, 0.15)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
                            <ShieldCheck size={14} /> VERIFIED
                        </div>
                    </div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <input
                            className={styles.inputField}
                            style={{ width: '250px', paddingLeft: '2.5rem', fontSize: '0.8rem' }}
                            placeholder="Find estimation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
                            <Package size={16} />
                        </div>
                    </div>
                )}
            </header>

            {view === 'create' ? (
                <>
                    <div className={styles.stepperContainer}>
                        <div className={styles.stepperLine} />
                        <div className={styles.stepperProgress} style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }} />
                        <div className={styles.steps}>
                            {STEPS.map((step, i) => {
                                const Icon = step.icon;
                                const isCompleted = i < currentStep;
                                const isActive = i === currentStep;
                                return (
                                    <div key={i} className={`${styles.stepWrapper} ${isActive ? styles.activeStep : ''} ${isCompleted ? styles.completedStep : ''}`} onClick={() => i <= currentStep + 1 && setCurrentStep(i)}>
                                        <div className={styles.stepCircle}>
                                            {isCompleted ? <ShieldCheck size={12} /> : <Icon size={12} />}
                                        </div>
                                        <span className={styles.stepLabel}>{step.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.contentArea}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className={currentStep === 5 ? styles.fullWidthGrid : styles.grid}
                            >
                                <div>
                                    <h2 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1.25rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '4px', height: '14px', background: 'var(--primary)', borderRadius: '2px' }} />
                                        {steps[currentStep].title}
                                    </h2>
                                    {steps[currentStep].content}
                                </div>

                                {currentStep !== 5 && (
                                    <aside className={styles.previewSidebar}>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <h3 className={styles.label}>Engineering Preview</h3>
                                            <div className={styles.mockupContainer}>
                                                <div
                                                    className={styles.bagMockup}
                                                    style={{
                                                        width: `${data.width / 2.5}px`,
                                                        height: `${data.height / 2.5}px`,
                                                        backgroundColor: data.paperType.includes('Kraft') ? '#d97706' : '#f8fafc'
                                                    }}
                                                >
                                                    <div className={styles.bagFront}>
                                                        <span style={{ fontSize: '7px', color: 'rgba(0,0,0,0.3)', fontWeight: 900 }}>{data.printing === 'Yes' ? 'LOGO PRINT' : ''}</span>
                                                    </div>
                                                    <div className={styles.bagGusset} style={{ width: `${data.gusset / 2.5}px` }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.quickStats}>
                                            <div className={styles.qStat}>
                                                <span className={styles.qLabel}>UNIT WT</span>
                                                <span className={styles.qValue}>{calcs.weight.toFixed(1)}g</span>
                                            </div>
                                            <div className={styles.qStat}>
                                                <span className={styles.qLabel}>PAPER KG</span>
                                                <span className={styles.qValue}>{calcs.paperKg.toFixed(0)}</span>
                                            </div>
                                            <div className={styles.qStat}>
                                                <span className={styles.qLabel}>REVENUE</span>
                                                <span className={styles.qValue}>₹{Math.round(calcs.finalRevenue / 1000)}k</span>
                                            </div>
                                            <div className={styles.qStat}>
                                                <span className={styles.qLabel}>MARGIN</span>
                                                <span className={styles.qValue} style={{ color: calcs.totalProfit > 0 ? 'var(--secondary)' : 'var(--danger)' }}>{data.marginPercent}%</span>
                                            </div>
                                            <div className={styles.qStat}>
                                                <span className={styles.qLabel}>COST/PC</span>
                                                <span className={styles.qValue}>₹{calcs.costPerBag.toFixed(2)}</span>
                                            </div>
                                            <div className={styles.qStat}>
                                                <span className={styles.qLabel}>PROD HR</span>
                                                <span className={styles.qValue}>{calcs.prodTimeHours.toFixed(1)}h</span>
                                            </div>
                                        </div>

                                        <div className={styles.advisoryBox}>
                                            <div style={{ color: 'var(--primary)' }}><Sparkles size={16} /></div>
                                            <div>
                                                <div className={styles.advisoryTitle}>AI Analysis</div>
                                                <p className={styles.advisoryContent} style={{ fontSize: '0.7rem' }}>
                                                    {calcs.marginOnRevenue < 15 ? "Optimizing Paper Grade or Speed recommended." : "Balanced cost configuration."}
                                                </p>
                                            </div>
                                        </div>
                                    </aside>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className={styles.navActions}>
                        <button className={`${styles.btnBase} ${styles.btnSecondary}`} disabled={currentStep === 0} onClick={() => setCurrentStep(prev => prev - 1)}>
                            <ChevronLeft size={16} /> BACK
                        </button>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {currentStep === STEPS.length - 1 && (
                                <button className={`${styles.btnBase}`} style={{ background: 'var(--bg-hover)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
                                    <Printer size={16} /> EXPORT
                                </button>
                            )}
                            <button className={`${styles.btnBase} ${styles.btnPrimary}`} onClick={() => currentStep < STEPS.length - 1 ? setCurrentStep(v => v + 1) : alert("Estimation Finalized!")}>
                                {currentStep === STEPS.length - 1 ? "SAVE ORDER" : "CONTINUE"} <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.contentArea}>
                    <div className={styles.summaryHeader} style={{ background: 'transparent', border: '1px solid var(--border)', marginBottom: '1rem' }}>
                        {[
                            { l: 'Total Active', v: '124' },
                            { l: 'This Month', v: '28' },
                            { l: 'Conversion', v: '4.2%' },
                            { l: 'Revenue Est.', v: '₹4.2M' }
                        ].map((s, i) => (
                            <div key={i} style={{ borderRight: i < 3 ? '1px solid var(--border)' : 'none', padding: '0 1rem', flex: 1 }}>
                                <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>{s.l}</span>
                                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{s.v}</span>
                            </div>
                        ))}
                    </div>
                    <table className={styles.costTable}>
                        <thead>
                            <tr>
                                <th>Ref #</th>
                                <th>Customer Entity</th>
                                <th>Type</th>
                                <th>Bag Specification</th>
                                <th>Qty</th>
                                <th>Value</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {archiveData.filter(e => e.customer.toLowerCase().includes(searchTerm.toLowerCase())).map((e, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>{e.id}</td>
                                    <td style={{ fontSize: '0.8rem' }}>{e.customer}</td>
                                    <td>
                                        <span style={{ fontSize: '0.65rem', color: e.type === 'Export' ? 'var(--primary)' : 'var(--text-muted)' }}>{e.type}</span>
                                    </td>
                                    <td style={{ fontSize: '0.75rem', opacity: 0.8 }}>{e.bag}</td>
                                    <td style={{ fontWeight: 700 }}>{e.qty.toLocaleString()}</td>
                                    <td>₹{e.value.toLocaleString()}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.65rem',
                                            fontWeight: 800,
                                            background: e.status === 'Draft' ? 'var(--bg-hover)' : e.status === 'Quoted' ? 'var(--primary-soft)' : 'var(--secondary-soft)',
                                            color: e.status === 'Draft' ? 'var(--text-dim)' : e.status === 'Quoted' ? 'var(--primary)' : 'var(--secondary)'
                                        }}>
                                            {e.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                                            <button className={styles.btnSmall} title="Edit"><FileText size={12} /></button>
                                            <button className={styles.btnSmall} title="Clone"><Briefcase size={12} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Showing 1 - 5 of 120 results</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {[1, 2, 3, "...", 12].map((p, i) => (
                                <button
                                    key={i}
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '4px',
                                        background: p === 1 ? 'var(--primary)' : 'var(--bg-hover)',
                                        border: '1px solid var(--border)',
                                        color: p === 1 ? 'white' : 'var(--text-muted)',
                                        fontSize: '0.75rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}
