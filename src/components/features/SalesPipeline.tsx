"use client";

import React from 'react';
import { Target, TrendingUp, Users } from 'lucide-react';

export default function SalesPipeline() {
    const stages = [
        { label: 'Inquiry', count: 42, value: '₹12.4L', color: '#f59e0b', width: '100%' },
        { label: 'Quotation', count: 28, value: '₹8.6L', color: '#3b82f6', width: '85%' },
        { label: 'Negotiation', count: 14, value: '₹5.2L', color: '#8b5cf6', width: '65%' },
        { label: 'Confirmed', count: 9, value: '₹28.6L', color: '#10b981', width: '45%' },
    ];

    return (
        <div className="card-premium" style={{
            padding: '1.5rem',
            background: 'var(--bg-sidebar)',
            border: '1px solid var(--border-strong)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
        }}>
            <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Sales Pipeline Funnel</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Conversion rate from Inquiry to Confirmed</p>

                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stages.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '80px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{s.label}</div>
                            <div style={{ flex: 1, height: '32px', position: 'relative' }}>
                                <div style={{
                                    width: s.width,
                                    height: '100%',
                                    background: s.color,
                                    opacity: 0.2,
                                    borderRadius: '4px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: s.width,
                                    height: '100%',
                                    borderLeft: `3px solid ${s.color}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '12px',
                                    fontSize: '0.8rem',
                                    fontWeight: 700
                                }}>
                                    {s.count} Leads
                                </div>
                            </div>
                            <div style={{ width: '60px', fontSize: '0.75rem', fontWeight: 700, textAlign: 'right' }}>{s.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-hover)', padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ color: '#10b981', marginBottom: '0.5rem' }}><TrendingUp size={24} /></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>CONVERSION RATE</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>21.4%</div>
                </div>
                <div style={{ background: 'var(--bg-hover)', padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ color: '#3b82f6', marginBottom: '0.5rem' }}><Target size={24} /></div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>AVG LEAD TIME</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>4.2 Days</div>
                </div>
                <div style={{ gridColumn: '1 / -1', background: 'var(--bg-hover)', padding: '1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '50%' }}><Users size={20} /></div>
                    <div>
                        <div style={{ fontSize: '1rem', fontWeight: 800 }}>Top Sales Performer</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Anita Shah - ₹8.2L this month</div>
                    </div>
                </div>
            </div>
        </div >
    );
}
