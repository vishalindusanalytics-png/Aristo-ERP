"use client";

import React from 'react';
import { Package, MapPin, Truck } from 'lucide-react';

export default function WarehouseVisual() {
    return (
        <div className="card-premium" style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            border: '1px solid var(--border-strong)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Warehouse RM Floor Map</h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Live Raw Material Storage Distribution</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div className="badge badge-blue">ZONE A</div>
                    <div className="badge badge-purple">ZONE B</div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: '8px',
                height: '120px'
            }}>
                {Array.from({ length: 40 }).map((_, i) => {
                    const status = i < 5 ? 'critical' : i < 15 ? 'warning' : 'ok';
                    const color = status === 'critical' ? '#ef4444' : status === 'warning' ? '#f59e0b' : '#10b981';
                    const height = 40 + Math.random() * 60;

                    return (
                        <div key={i} style={{
                            background: i < 20 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                            border: `1px dashed rgba(255,255,255,0.1)`,
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '2px',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '100%',
                                height: `${height}%`,
                                background: color,
                                opacity: 0.8,
                                borderRadius: '2px',
                                boxShadow: `0 0 10px ${color}44`
                            }} />
                            {i === 12 && (
                                <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)' }}>
                                    <MapPin size={10} color="#ef4444" fill="#ef4444" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '2px', background: '#10b981' }} /> Stock Sufficient
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '2px', background: '#f59e0b' }} /> Low Stock
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '2px', background: '#ef4444' }} /> Critical / Reorder
                </div>
            </div>
        </div>
    );
}
