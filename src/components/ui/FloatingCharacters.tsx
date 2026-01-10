import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface FloatingCharactersProps {
    variant?: "home" | "philosophy" | "work" | "insights" | "inquiry";
    className?: string;
    count?: number;
}

export const FloatingCharacters = ({
    variant = "home",
    className,
    count = 8, // Reduced for smoother rendering
}: FloatingCharactersProps) => {
    const getCharacterConfig = () => {
        switch (variant) {
            case "philosophy":
                return {
                    shapes: ["◆", "○", "△"],
                    color: "rgba(139, 92, 246, 0.25)",
                };
            case "work":
                return {
                    shapes: ["■", "●", "▲"],
                    color: "rgba(249, 115, 22, 0.25)",
                };
            case "insights":
                return {
                    shapes: ["◉", "⬡", "⬟"],
                    color: "rgba(16, 185, 129, 0.25)",
                };
            case "inquiry":
                return {
                    shapes: ["★", "✦", "◆"],
                    color: "rgba(217, 119, 6, 0.25)",
                };
            case "home":
            default:
                return {
                    shapes: ["◯", "◎", "●"],
                    color: "rgba(59, 130, 246, 0.25)",
                };
        }
    };

    const config = getCharacterConfig();

    const characters = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            shape: config.shapes[Math.floor(Math.random() * config.shapes.length)],
            size: Math.random() * 20 + 15,
            initialX: Math.random() * 100,
            initialY: Math.random() * 100,
            duration: Math.random() * 15 + 20,
            delay: Math.random() * 5,
        }));
    }, [count, variant]);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {characters.map((char) => (
                <motion.div
                    key={char.id}
                    className="absolute will-change-transform font-serif font-light"
                    style={{
                        left: `${char.initialX}%`,
                        top: `${char.initialY}%`,
                        fontSize: `${char.size}px`,
                        color: config.color,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: [0, -150, -300],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: char.duration,
                        delay: char.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {char.shape}
                </motion.div>
            ))}
        </div>
    );
};

