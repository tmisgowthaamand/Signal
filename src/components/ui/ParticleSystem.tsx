import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ParticleSystemProps {
    variant?: "home" | "philosophy" | "work" | "insights" | "inquiry";
    className?: string;
    particleCount?: number;
}

export const ParticleSystem = ({
    variant = "home",
    className,
    particleCount = 12, // Reduced for high performance
}: ParticleSystemProps) => {
    const getParticleConfig = () => {
        switch (variant) {
            case "philosophy": return { color: "rgba(139, 92, 246, 0.4)" };
            case "work": return { color: "rgba(249, 115, 22, 0.4)" };
            case "insights": return { color: "rgba(16, 185, 129, 0.4)" };
            case "inquiry": return { color: "rgba(217, 119, 6, 0.4)" };
            case "home":
            default: return { color: "rgba(59, 130, 246, 0.4)" };
        }
    };

    const config = getParticleConfig();

    const particles = useMemo(() => {
        return Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            size: Math.random() * 6 + 2,
            initialX: Math.random() * 100,
            initialY: Math.random() * 100,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
        }));
    }, [particleCount, variant]);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full will-change-transform"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.initialX}%`,
                        top: `${particle.initialY}%`,
                        backgroundColor: config.color,
                        // Removed box-shadow and blur for zero rendering penalty
                    }}
                    animate={{
                        opacity: [0, 0.6, 0.6, 0],
                        y: [0, -200, -400],
                        x: [0, Math.random() * 100 - 50, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "linear", // Linear is faster to calculate
                    }}
                />
            ))}
        </div>
    );
};

