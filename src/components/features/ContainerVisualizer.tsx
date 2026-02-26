"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Rotate3d, Maximize2, Info, Package } from 'lucide-react';
import styles from './ContainerVisualizer.module.css';

interface ContainerVisualizerProps {
    containerId: string;
    type: string;
    loadFactor: string;
    totalCartons: number;
}

export default function ContainerVisualizer({ containerId, type, loadFactor, totalCartons }: ContainerVisualizerProps) {
    const [rotation, setRotation] = useState({ x: -15, y: -35 });
    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const deltaX = e.clientX - lastMousePos.current.x;
            const deltaY = e.clientY - lastMousePos.current.y;

            setRotation(prev => ({
                x: prev.x - deltaY * 0.5,
                y: prev.y + deltaX * 0.5
            }));

            lastMousePos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Simulated cargo items based on load factor
    const itemCount = Math.min(totalCartons, 40); // Max 40 for visual performance
    const renderCargo = () => {
        const items = [];
        const factor = parseFloat(loadFactor) / 100 || 0;
        const visibleItems = Math.floor(itemCount * factor);

        for (let i = 0; i < visibleItems; i++) {
            const row = i % 4;
            const col = Math.floor(i / 4) % 8;
            const layer = Math.floor(i / 32);

            items.push(
                <div
                    key={i}
                    className={styles.cargoItem}
                    style={{
                        width: '30px',
                        height: '25px',
                        left: `${col * 35 + 10}px`,
                        bottom: `${layer * 28 + 5}px`,
                        transform: `translateZ(${row * 28 - 45}px)`
                    }}
                >
                    <div className={styles.cargoFace} style={{ width: '30px', height: '25px', transform: 'translateZ(15px)' }} />
                    <div className={styles.cargoFace} style={{ width: '30px', height: '25px', transform: 'rotateY(180deg) translateZ(15px)' }} />
                    <div className={styles.cargoFace} style={{ width: '30px', height: '30px', transform: 'rotateX(90deg) translateZ(12.5px)' }} />
                    <div className={styles.cargoFace} style={{ width: '30px', height: '30px', transform: 'rotateX(-90deg) translateZ(12.5px)' }} />
                </div>
            );
        }
        return items;
    };

    return (
        <div className={styles.scene} onMouseDown={handleMouseDown}>
            <div className={styles.overlay}>
                <h4><Rotate3d size={16} /> 3D Load Visualization</h4>
                <p>{containerId} • {type} • {loadFactor} Optimized</p>
            </div>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ background: '#3b82f6' }} />
                    <span>Container Hull</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ background: '#f59e0b' }} />
                    <span>Planned Cargo ({totalCartons} Cartons)</span>
                </div>
            </div>

            <div
                className={styles.container3d}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
            >
                {/* Outer Shell */}
                <div className={`${styles.face} ${styles.front}`}><div className={styles.corrugation} /></div>
                <div className={`${styles.face} ${styles.back}`}><div className={styles.corrugation} /></div>
                <div className={`${styles.face} ${styles.right}`}><div className={styles.corrugation} /></div>
                <div className={`${styles.face} ${styles.left}`}><div className={styles.corrugation} /></div>
                <div className={`${styles.face} ${styles.top}`} />
                <div className={`${styles.face} ${styles.bottom}`} />

                {/* Cargo */}
                {renderCargo()}
            </div>

            <div className={styles.controls}>
                <button className={styles.controlBtn} title="Reset View" onClick={() => setRotation({ x: -15, y: -35 })}>
                    <Rotate3d size={14} />
                </button>
                <button className={styles.controlBtn} title="Expand">
                    <Maximize2 size={14} />
                </button>
            </div>
        </div>
    );
}
