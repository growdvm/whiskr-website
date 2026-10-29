"use client"

import * as React from "react"
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface MagnetizeBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    particleCount?: number;
    attractRadius?: number;
    children: React.ReactNode;
}

interface Particle {
    id: number;
    x: number;
    y: number;
}

function MagnetizeBadge({
    className,
    particleCount = 12,
    attractRadius = 50,
    children,
    ...props
}: MagnetizeBadgeProps) {
    const [isAttracting, setIsAttracting] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particlesControl = useAnimation();

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
        }));
        setParticles(newParticles);
    }, [particleCount]);

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true);
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
            },
        });
    }, [particlesControl]);

    const handleInteractionEnd = useCallback(async () => {
        setIsAttracting(false);
        await particlesControl.start((i) => ({
            x: particles[i]?.x ?? 0,
            y: particles[i]?.y ?? 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }));
    }, [particlesControl, particles]);

    return (
        <div
            className={cn("relative touch-none inline-flex", className)}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            {...props}
        >
            {particles.map((_, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial={{ x: particles[index]?.x ?? 0, y: particles[index]?.y ?? 0 }}
                    animate={particlesControl}
                    className={cn(
                        "absolute w-1.5 h-1.5 rounded-full",
                        "bg-[#1ce881]/60",
                        "transition-opacity duration-300",
                        isAttracting ? "opacity-100" : "opacity-30"
                    )}
                />
            ))}
            <span className="relative z-10 w-full flex items-center justify-center">
                {children}
            </span>
        </div>
    );
}

export { MagnetizeBadge }
