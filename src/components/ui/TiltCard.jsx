import { useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export default function TiltCard({ children, className, noPadding = false }) {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        // Max rotation: 10 degrees
        const x = yPct * -10;
        const y = xPct * 10;

        setRotation({ x, y });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 }); // Reset
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative rounded-xl border backdrop-blur-md transition-all duration-200 ease-out preserve-3d",
                "bg-void/40 dark:bg-void/40 border-white/10 dark:border-white/10 shadow-lg", // Default
                "bg-day-surface/60 border-day-border", // Light mode
                className
            )}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
                padding: noPadding ? '0' : '1.5rem',
            }}
        >
            {/* Holographic Sheen */}
            <div
                className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 0.3 : 0,
                    background: `linear-gradient(
                        125deg, 
                        transparent 40%, 
                        rgba(255, 255, 255, 0.4) 45%, 
                        rgba(74, 222, 128, 0.2) 50%, 
                        rgba(255, 255, 255, 0.4) 55%, 
                        transparent 60%
                    )`
                }}
            />

            {/* Tech Corners (Restored from previous Card) */}
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-l border-t border-bio-400 dark:border-white opacity-50 rounded-tl-lg" />
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-r border-b border-bio-400 dark:border-white opacity-50 rounded-br-lg" />

            <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </div>
    );
}
