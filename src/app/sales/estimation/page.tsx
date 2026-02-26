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
    Plus,
    Info, // Added Info icon
    Activity, // Added Activity icon
    CheckCircle // Added CheckCircle icon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Estimation.module.css';

const STEPS = [
    { name: "Context", icon: Info },
    { name: "Engineering", icon: Package },
    { name: "Logistics", icon: Truck },
    { name: "Material", icon: ShoppingBag },
    { name: "Production", icon: Activity },
    { name: "Summary", icon: CheckCircle }
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
        // 1. BASIC INFORMATION
        estNo: "EST-COMING",
        estDate: "",
        customerName: '',
        customerType: 'Domestic',
        salesPerson: 'Admin',
        currency: 'INR',
        inquiryRef: '',
        targetPrice: 0,
        deliveryDate: '',
        remarks: '',

        // 2. BAG DIMENSION DETAILS
        bagType: 'SOS',
        width: 300,
        gusset: 120,
        height: 400,
        bottomFold: 40,
        topFoldMm: 20,

        // 3. PAPER SPECIFICATION
        gsm: 120,
        paperType: 'Kraft Brown',
        reelWidth: 700,
        reelRate: 68,
        grainDirection: 'Vertical',
        fscRequired: 'No',
        moisturePercent: 5,

        // 4. PRINTING DETAILS
        printing: 'Yes',
        inkColors: 2,
        printSide: 'Single',
        coverageType: 'Partial',
        plateCostPerColor: 1200,
        inkType: 'Water Based',
        inkRate: 320,
        inkUsagePer1000: 450,
        printingSetupCost: 500,

        // 5. HANDLE DETAILS
        handleType: 'Twisted',
        handleLength: 350,
        handleCostPerPc: 1.25,
        patchRequired: 'Yes',
        patchGsm: 120,
        patchCost: 0.45,

        // 6. ORDER DETAILS
        orderQty: 10000,
        wastagePercent: 4.5,
        extraQtyPercent: 0,

        // 7. GLUE & CONSUMABLES
        glueUsage: 3.2,
        glueRate: 95,

        // 9. MACHINE COSTING
        machineType: 'Automatic SOS',
        machineSpeed: 85,
        changeoverTime: 45,
        machineHourRate: 550,
        powerCostPerHour: 95,

        // 10. LABOUR
        labourCostPerHour: 60,

        // 11. OVERHEADS
        factoryOverheadPercent: 6,
        adminOverheadPercent: 4,
        packingMaterialCost: 200,
        cartonCost: 45,

        // 13. MARGIN
        marginPercent: 18,

        // 14. EXPORT
        freightCost: 0,
        insuranceCost: 0,
        documentationCost: 0,
        containerCost: 0,

        // 15. CONTAINER PRE-CHECK
        bagsPerCarton: 200,
        cartonL: 600,
        cartonW: 400,
        cartonH: 400,
        containerType: '20ft',

        // UI Helpers
        urgency: 'Standard',
        industry: 'Retail',
        targetMargin: 15
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
        // 1. Production Quantity
        const finalProdQty = Math.ceil(data.orderQty * (1 + (data.wastagePercent / 100)) * (1 + (data.extraQtyPercent / 100)));

        // 2. Bag Dimensions (Developed)
        // For SOS: Width + Gusset + Height + Folds
        const devWidth = (data.width * 2) + (data.gusset * 2) + 25; // Tube formation allowance
        const devLength = data.height + data.bottomFold + data.topFoldMm;

        const paperArea = (devWidth * devLength) / 1000000;
        const weight = paperArea * data.gsm;
        const paperKg = (weight * finalProdQty) / 1000;
        const paperCost = paperKg * data.reelRate;

        // 3. Glue & Consumables
        const glueKg = (data.glueUsage * finalProdQty) / 1000;
        const glueCost = glueKg * data.glueRate;
        const handleCost = data.handleType !== 'None' ? data.handleCostPerPc * finalProdQty : 0;
        const patchCost = data.patchRequired === 'Yes' ? data.patchCost * finalProdQty : 0;

        // 4. Printing
        let printCost = 0;
        if (data.printing === 'Yes') {
            const plate = data.plateCostPerColor * data.inkColors;
            const coverageFactor = data.coverageType === 'Full' ? 1.5 : 0.4;
            const ink = ((data.inkUsagePer1000 * finalProdQty * coverageFactor) / 1000) * data.inkRate;
            printCost = plate + ink + data.printingSetupCost;
        }

        // 5. Machine & Labour
        const runTime = (finalProdQty / (data.machineSpeed * 60)) + (data.changeoverTime / 60);
        const mcCost = runTime * (data.machineHourRate + data.powerCostPerHour);
        const lbCost = runTime * data.labourCostPerHour;

        // 6. Overheads
        const directCost = paperCost + glueCost + handleCost + patchCost + printCost + mcCost + lbCost;
        const packingTotal = (data.cartonCost * (finalProdQty / data.bagsPerCarton)) + data.packingMaterialCost;

        const overheads = directCost * ((data.factoryOverheadPercent + data.adminOverheadPercent) / 100) + packingTotal;
        const totalProductionCost = directCost + overheads;

        // 7. Summary
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
                overhead: overheads
            },
            totalProductionCost,
            costPerBag,
            targetSP,
            finalRevenue,
            totalProfit,
            prodTimeHours: runTime,
            marginOnRevenue: finalRevenue > 0 ? (totalProfit / finalRevenue) * 100 : 0
        };
    }, [data]);

    const steps = [
        {
            title: "Basic Information",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Estimation No</label>
                            <input className={styles.inputField} type="text" name="estNo" value={data.estNo} readOnly style={{ opacity: 0.7 }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Estimation Date</label>
                            <input className={styles.inputField} type="date" name="estDate" value={data.estDate} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Customer Name</label>
                            <input className={styles.inputField} type="text" name="customerName" value={data.customerName} onChange={handleChange} placeholder="Enter name..." />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Customer Type</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="customerType" value={data.customerType} onChange={handleChange}>
                                <option value="Domestic">Domestic</option>
                                <option value="Export">Export</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Sales Person</label>
                            <input className={styles.inputField} type="text" name="salesPerson" value={data.salesPerson} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Currency</label>
                            <select className={`${styles.inputField} ${styles.selectField}`} name="currency" value={data.currency} onChange={handleChange}>
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Inquiry Reference</label>
                            <input className={styles.inputField} type="text" name="inquiryRef" value={data.inquiryRef} onChange={handleChange} placeholder="Ref code..." />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Target Price</label>
                            <input className={styles.inputField} type="number" name="targetPrice" value={data.targetPrice} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Req. Delivery Date</label>
                            <input className={styles.inputField} type="date" name="deliveryDate" value={data.deliveryDate} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup} style={{ gridColumn: 'span 3' }}>
                            <label className={styles.label}>Remarks</label>
                            <input className={styles.inputField} type="text" name="remarks" value={data.remarks} onChange={handleChange} placeholder="Special instructions..." />
                        </div>
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><Sparkles size={10} /> COMMERCIAL CONTEXT</div>
                        <div className={styles.advisoryContent}>
                            <span className={styles.statBadge}>CLIENT: {data.customerName || 'N/A'}</span>
                            {data.customerType === 'Export' ? 'Export documentation and container planning will be enabled in next steps.' : 'Standard domestic GST and transport rates apply.'}
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Product Specification",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Bag Type</label>
                            <select className={styles.inputField} name="bagType" value={data.bagType} onChange={handleChange}>
                                <option value="SOS">SOS Box Bag</option>
                                <option value="Flat">Flat / V-Bottom</option>
                                <option value="D-Cut">D-Cut Bag</option>
                                <option value="Twisted">Twisted Handle</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Paper Type</label>
                            <select className={styles.inputField} name="paperType" value={data.paperType} onChange={handleChange}>
                                <option value="Brown">Brown Kraft</option>
                                <option value="White">White Bleached</option>
                                <option value="Virgin">Virgin Kraft</option>
                                <option value="Recycled">Recycled</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Paper GSM</label>
                            <input className={styles.inputField} type="number" name="gsm" value={data.gsm} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Reel Rate / Kg</label>
                            <input className={styles.inputField} type="number" name="reelRate" value={data.reelRate} onChange={handleChange} />
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
                            <label className={styles.label}>Bottom Fold (mm)</label>
                            <input className={styles.inputField} type="number" name="bottomFold" value={data.bottomFold} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Top Fold (mm)</label>
                            <input className={styles.inputField} type="number" name="topFoldMm" value={data.topFoldMm} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Handle Type</label>
                            <select className={styles.inputField} name="handleType" value={data.handleType} onChange={handleChange}>
                                <option value="None">None</option>
                                <option value="Twisted">Twisted Paper</option>
                                <option value="Flat">Flat Paper</option>
                                <option value="D-Cut">D-Cut</option>
                            </select>
                        </div>
                        {data.handleType !== 'None' && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Handle Cost / Pc</label>
                                    <input className={styles.inputField} type="number" name="handleCostPerPc" value={data.handleCostPerPc} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Patch Req.</label>
                                    <select className={styles.inputField} name="patchRequired" value={data.patchRequired} onChange={handleChange}>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><Zap size={10} /> ENGINEERING SPECIFICATIONS</div>
                        <div className={styles.advisoryContent}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4px' }}>
                                <span className={styles.statBadge}>DEV WIDTH: {calcs.devWidth}mm</span>
                                <span className={styles.statBadge}>DEV LENGTH: {calcs.devLength}mm</span>
                            </div>
                            Calculated Area: <span style={{ fontWeight: 800 }}>{(calcs.devWidth * calcs.devLength / 1000000).toFixed(3)} sqm</span>. Standard reel width recommended: {Math.ceil(calcs.devWidth / 10) * 10}mm.
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
                            <label className={styles.label}>Wastage %</label>
                            <input className={styles.inputField} type="number" name="wastagePercent" value={data.wastagePercent} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Extra Qty %</label>
                            <input className={styles.inputField} type="number" name="extraQtyPercent" value={data.extraQtyPercent} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Bags / Carton</label>
                            <input className={styles.inputField} type="number" name="bagsPerCarton" value={data.bagsPerCarton} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Carton L (mm)</label>
                            <input className={styles.inputField} type="number" name="cartonL" value={data.cartonL} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Carton W (mm)</label>
                            <input className={styles.inputField} type="number" name="cartonW" value={data.cartonW} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Carton H (mm)</label>
                            <input className={styles.inputField} type="number" name="cartonH" value={data.cartonH} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Container Type</label>
                            <select className={styles.inputField} name="containerType" value={data.containerType} onChange={handleChange}>
                                <option value="20ft">20ft FCL</option>
                                <option value="40ft">40ft FCL</option>
                                <option value="LCL">LCL Cargo</option>
                            </select>
                        </div>
                        {data.customerType === 'Export' && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Freight Cost</label>
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
                        )}
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><Calculator size={10} /> LOGISTICS ANALYTICS</div>
                        <div className={styles.advisoryContent}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4px' }}>
                                <span className={styles.statBadge}>PROD QTY: {calcs.finalProdQty.toLocaleString()}</span>
                                <span className={styles.statBadge}>TOT WT: {(calcs.paperKg).toFixed(0)} KG</span>
                            </div>
                            Shipping Units: <span style={{ fontWeight: 700 }}>{(calcs.finalProdQty / data.bagsPerCarton).toFixed(0)} Cartons</span>.
                            Estimated CBM: <span style={{ fontWeight: 700 }}>{((data.cartonL * data.cartonW * data.cartonH / 1000000000) * (calcs.finalProdQty / data.bagsPerCarton)).toFixed(2)}</span>.
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Material & Printing",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Printing Required</label>
                            <select className={styles.inputField} name="printing" value={data.printing} onChange={handleChange}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        {data.printing === 'Yes' && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>No. of Colors</label>
                                    <input className={styles.inputField} type="number" name="inkColors" value={data.inkColors} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Coverage</label>
                                    <select className={styles.inputField} name="coverageType" value={data.coverageType} onChange={handleChange}>
                                        <option value="Partial">Partial / Text</option>
                                        <option value="Full">Full / Solid</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Plate Cost / Col</label>
                                    <input className={styles.inputField} type="number" name="plateCostPerColor" value={data.plateCostPerColor} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Setup Cost</label>
                                    <input className={styles.inputField} type="number" name="printingSetupCost" value={data.printingSetupCost} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Ink Rate / Kg</label>
                                    <input className={styles.inputField} type="number" name="inkRate" value={data.inkRate} onChange={handleChange} />
                                </div>
                            </>
                        )}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Glue Usage (g/pc)</label>
                            <input className={styles.inputField} type="number" name="glueUsage" value={data.glueUsage} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Glue Rate / Kg</label>
                            <input className={styles.inputField} type="number" name="glueRate" value={data.glueRate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><ShoppingBag size={10} /> PROCUREMENT FEED</div>
                        <div className={styles.advisoryContent}>
                            <span className={styles.statBadge}>PLATES: ₹{(data.plateCostPerColor * data.inkColors).toLocaleString()}</span>
                            Printing setup cost of ₹{data.printingSetupCost} is standard for {data.inkColors} colors. {data.coverageType === 'Full' ? 'High ink consumption expected.' : 'Standard ink consumption applied.'}
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Production & Margin",
            content: (
                <>
                    <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Machine Type</label>
                            <select className={styles.inputField} name="machineType" value={data.machineType} onChange={handleChange}>
                                <option value="Automatic SOS">Automatic SOS</option>
                                <option value="Semi Auto">Semi-Automatic</option>
                                <option value="Manual">Manual Finishing</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Speed (Bpm)</label>
                            <input className={styles.inputField} type="number" name="machineSpeed" value={data.machineSpeed} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Changeover (Min)</label>
                            <input className={styles.inputField} type="number" name="changeoverTime" value={data.changeoverTime} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>M/c Hr Rate</label>
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
                            <label className={styles.label}>Factory OH %</label>
                            <input className={styles.inputField} type="number" name="factoryOverheadPercent" value={data.factoryOverheadPercent} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Admin OH %</label>
                            <input className={styles.inputField} type="number" name="adminOverheadPercent" value={data.adminOverheadPercent} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Margin %</label>
                            <input className={styles.inputField} type="number" name="marginPercent" value={data.marginPercent} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.advisoryBox}>
                        <div className={styles.advisoryTitle}><TrendingUp size={10} /> PRODUCTION FORECAST</div>
                        <div className={styles.advisoryContent}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4px' }}>
                                <span className={styles.statBadge}>RUN TIME: {calcs.prodTimeHours.toFixed(1)}H</span>
                                <span className={styles.statBadge}>NET COST: {data.currency} {calcs.costPerBag.toFixed(2)}</span>
                            </div>
                            Total setup & run: <span style={{ fontWeight: 700 }}>{(calcs.prodTimeHours).toFixed(1)} hours</span>. Efficiency rated at 92%. Profit on order: <span style={{ color: 'var(--secondary)', fontWeight: 800 }}>{data.currency} {calcs.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>.
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
                                <span className={styles.rowLabel}>Sales Person:</span>
                                <span className={styles.rowValue}>{data.salesPerson}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className={styles.rowLabel}>Currency:</span>
                                <span className={styles.rowValue}>{data.currency}</span>
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
                                <div className={styles.rowLabel}>Developed</div>
                                <div className={styles.rowValue}>{calcs.devWidth}x{calcs.devLength}</div>
                            </div>
                            <div>
                                <div className={styles.rowLabel}>Paper/GSM</div>
                                <div className={styles.rowValue}>{data.gsm}G {data.paperType}</div>
                            </div>
                            <div>
                                <div className={styles.rowLabel}>Printing</div>
                                <div className={styles.rowValue}>{data.inkColors} Colors</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reportSection}>
                        <h3 className={styles.reportTitle}><Calculator size={12} style={{ marginRight: '6px' }} /> COST BREAKDOWN</h3>
                        <div style={{ display: 'grid', gap: '0.3rem' }}>
                            {[
                                { l: 'Paper Cost', v: calcs.costs.paper },
                                { l: 'Adhesive & Trims', v: calcs.costs.glue + calcs.costs.handle },
                                { l: 'Printing/Plates', v: calcs.costs.printing },
                                { l: 'Conversion Cost', v: calcs.costs.machine + calcs.costs.labour },
                                { l: 'Total Overheads', v: calcs.costs.overhead }
                            ].map((row, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className={styles.rowLabel}>{row.l}</span>
                                    <span className={styles.rowValue}>{data.currency} {row.v.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                        <div className={styles.reportSummaryBanner} style={{ margin: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div className={styles.mainPriceLabel}>AI PROJECTED COST / PC</div>
                                    <div className={styles.mainPriceValue}>{data.currency} {calcs.costPerBag.toFixed(2)}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className={styles.mainPriceLabel}>TARGET SELLING PRICE</div>
                                    <div className={styles.mainPriceValue} style={{ color: 'var(--secondary)' }}>{data.currency} {calcs.targetSP.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.advisoryBox} style={{ margin: 0, padding: '0.75rem' }}>
                            <div className={styles.advisoryTitle}><Zap size={10} /> AI VALIDATION ALERTS</div>
                            <div className={styles.advisoryContent} style={{ fontSize: '0.65rem' }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    <li style={{ color: calcs.marginOnRevenue < 15 ? 'var(--danger)' : 'var(--secondary)', marginBottom: '2px' }}>
                                        • {calcs.marginOnRevenue < 15 ? "Low Margin (Critical)" : "Margin Healthy"}
                                    </li>
                                    <li style={{ marginBottom: '2px' }}>
                                        • {data.gsm > 150 ? "High GSM (Check machine compatibility)" : "GSM Optimal"}
                                    </li>
                                    <li>
                                        • {data.coverageType === 'Full' ? "High Ink (Verify Drying Time)" : "Ink: Partial Coverage"}
                                    </li>
                                </ul>
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
                                                        width: `${Math.min(data.width / 3, 140)}px`,
                                                        height: `${Math.min(data.height / 3, 160)}px`,
                                                        backgroundColor: data.paperType.toLowerCase().includes('brown') || data.paperType.toLowerCase().includes('kraft') ? '#d4a373' : '#f8f9fa'
                                                    }}
                                                >
                                                    {/* Handles */}
                                                    {data.handleType !== 'None' && (
                                                        <div className={`${styles.handleLeft} ${data.handleType === 'Twisted' ? styles.handleTwisted : styles.handleFlat}`} />
                                                    )}

                                                    <div className={styles.bagFront}>
                                                        {data.printing === 'Yes' && (
                                                            <div style={{ border: '1px dashed rgba(0,0,0,0.2)', padding: '4px', borderRadius: '4px', textAlign: 'center' }}>
                                                                <div style={{ fontSize: '8px', fontWeight: 900, opacity: 0.4 }}>BRAND</div>
                                                                <div style={{ fontSize: '5px', opacity: 0.3 }}>{data.inkColors} COLORS</div>
                                                            </div>
                                                        )}
                                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '6px', opacity: 0.4, fontWeight: 700 }}>
                                                            {data.width}x{data.height}
                                                        </div>
                                                        <div className={styles.bagBottomFold} />
                                                    </div>
                                                    <div className={styles.bagGusset} style={{ width: `${Math.min(data.gusset / 3, 40)}px` }} />
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
