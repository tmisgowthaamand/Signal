import React, { Suspense, useState, useEffect, useRef } from "react";
const Spline = React.lazy(() => import('@splinetool/react-spline'));
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SplineCharacterProps {
    scene: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    interactive?: boolean;
    floatAnimation?: boolean;
    glowColor?: string;
    showLoader?: boolean;
}

const SIZE_CLASSES = {
    sm: "w-[200px] h-[200px]",
    md: "w-[300px] h-[300px]",
    lg: "w-[400px] h-[400px]",
    xl: "w-[500px] h-[500px]",
    full: "w-full h-full",
};

// Premium 3D Character Loader
const CharacterLoader = ({ glowColor }: { glowColor: string }) => (
    <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
            {/* Outer ring */}
            <motion.div
                className={cn(
                    "w-20 h-20 rounded-full border-2 border-t-transparent",
                    glowColor || "border-foreground/30"
                )}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner pulse */}
            <motion.div
                className={cn(
                    "absolute inset-3 rounded-full",
                    glowColor || "bg-foreground/10"
                )}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Core dot */}
            <motion.div
                className={cn(
                    "absolute inset-1/3 rounded-full",
                    glowColor || "bg-foreground/40"
                )}
                animate={{
                    scale: [0.8, 1, 0.8],
                }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>

        {/* Loading text */}
        <motion.span
            className="absolute -bottom-8 text-xs text-muted-foreground tracking-[0.3em] uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            Loading 3D
        </motion.span>
    </div>
);

export const SplineCharacter = ({
    scene,
    className,
    size = "lg",
    interactive = true,
    floatAnimation = true,
    glowColor,
    showLoader = true,
}: SplineCharacterProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for 3D parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 60 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Transform mouse position to 3D rotation
    const rotateX = useTransform(smoothY, [-100, 100], [15, -15]);
    const rotateY = useTransform(smoothX, [-100, 100], [-15, 15]);
    const translateX = useTransform(smoothX, [-100, 100], [-10, 10]);
    const translateY = useTransform(smoothY, [-100, 100], [-10, 10]);

    useEffect(() => {
        if (!interactive) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [interactive, mouseX, mouseY]);

    if (hasError) {
        return (
            <div className={cn(
                SIZE_CLASSES[size],
                "flex items-center justify-center bg-foreground/5 rounded-2xl border border-border/30",
                className
            )}>
                <div className="text-center p-6">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl mb-3"
                    >
                        🤖
                    </motion.div>
                    <p className="text-xs text-muted-foreground">3D unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                SIZE_CLASSES[size],
                "relative",
                className
            )}
            style={{ perspective: 1000 }}
        >
            {/* Glow effect behind character */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={cn(
                    "absolute inset-[10%] rounded-full blur-[40px]",
                    glowColor || "bg-gradient-to-br from-primary/30 to-secondary/20"
                )}
            />

            {/* Loading state */}
            {!isLoaded && showLoader && <CharacterLoader glowColor={glowColor || ""} />}

            {/* Spline Character */}
            <Suspense fallback={null}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isLoaded ? 1 : 0,
                        scale: isLoaded ? 1 : 0.8,
                    }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
                    style={interactive ? {
                        rotateX,
                        rotateY,
                        x: translateX,
                        y: translateY,
                    } : {}}
                    className="w-full h-full will-change-transform"
                >
                    <motion.div
                        animate={floatAnimation && isLoaded ? {
                            y: [0, -15, 0],
                            rotateZ: [0, 2, -2, 0],
                        } : {}}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-full h-full"
                    >
                        <Spline
                            scene={scene}
                            onLoad={() => setIsLoaded(true)}
                            onError={(e) => {
                                console.error("SplineCharacter Error:", e);
                                setHasError(true);
                            }}
                        />
                    </motion.div>
                </motion.div>
            </Suspense>

            {/* Interactive hint */}
            {interactive && isLoaded && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.span
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase whitespace-nowrap"
                    >
                        Move cursor to interact
                    </motion.span>
                </motion.div>
            )}
        </div>
    );
};

// Preset characters for easy use
export const PRESET_CHARACTERS = {
    robot: "https://prod.spline.design/6Wq8KIxC8CJnxJtU/scene.splinecode",
    avatar: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
    hand: "https://prod.spline.design/GgMhq6rhmLvANnPi/scene.splinecode",
    brain: "https://prod.spline.design/pfvnAGaQ-NmJoL8r/scene.splinecode",
    message: "https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode",
};

export default SplineCharacter;
