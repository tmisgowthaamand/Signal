import React, { Suspense, useState, Component, ErrorInfo, ReactNode } from "react";
import Spline from "@splinetool/react-spline";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { WaveAnimation } from "./WaveAnimation";
import { FloatingCharacters } from "./FloatingCharacters";
import { ParticleSystem } from "./ParticleSystem";
import { MorphingBlob } from "./MorphingBlob";

interface LiquidBackgroundProps {
    className?: string;
    variant?: "home" | "philosophy" | "work" | "insights" | "inquiry";
}

// Map variants to specific Spline scene URLs
// Currently set to null to force the distinct CSS fallbacks which provide the requested "3D background" look immediately.
// You can re-enable Spline by adding valid URLs here.
const SCENES: Record<string, string | null> = {
    home: null, // "https://prod.spline.design/kZqon7WDbT84-Kj3/scene.splinecode", 
    philosophy: null,
    work: null,
    insights: null,
    inquiry: null,
};

class LocalErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode, onError?: () => void }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Spline Runtime Error:", error, errorInfo);
        this.props.onError?.();
    }
    render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

export const LiquidBackground = ({
    className,
    variant = "home",
}: LiquidBackgroundProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const sceneUrl = SCENES[variant];

    // Distinct configurations for each variant to create "3D image" like effects with CSS
    const getVariantStyles = () => {
        switch (variant) {
            case "philosophy":
                return {
                    blob1: "bg-indigo-500/20",
                    blob2: "bg-purple-500/20",
                    blob3: "bg-slate-300/10",
                    animation1: { duration: 25, scale: [1, 1.3, 1], rotate: [0, 45, 0] },
                    animation2: { duration: 20, scale: [1, 1.2, 1], rotate: [0, -45, 0] },
                };
            case "work":
                return {
                    blob1: "bg-stone-500/20",
                    blob2: "bg-orange-500/10",
                    blob3: "bg-gray-100/5",
                    animation1: { duration: 30, scale: [1, 1.1, 1], x: [0, 50, 0] },
                    animation2: { duration: 25, scale: [1, 1.4, 1], x: [0, -30, 0] },
                };
            case "insights":
                return {
                    blob1: "bg-emerald-500/15",
                    blob2: "bg-cyan-500/15",
                    blob3: "bg-teal-900/10",
                    animation1: { duration: 22, scale: [1, 1.25, 1], rotate: [0, 90, 0] },
                    animation2: { duration: 28, scale: [1, 1.15, 1], rotate: [0, -90, 0] },
                };
            case "inquiry":
                return {
                    blob1: "bg-amber-700/15", // Warm/Gold
                    blob2: "bg-rose-900/15",
                    blob3: "bg-orange-100/5",
                    animation1: { duration: 26, scale: [1, 1.3, 1], y: [0, 40, 0] },
                    animation2: { duration: 24, scale: [1, 1.2, 1], y: [0, -40, 0] },
                };
            case "home":
            default:
                return {
                    blob1: "bg-primary/20", // Deep Blue/Default
                    blob2: "bg-blue-600/15",
                    blob3: "bg-background/10",
                    animation1: { duration: 20, scale: [1, 1.2, 1], rotate: [0, 90, 0] },
                    animation2: { duration: 15, scale: [1, 1.3, 1], rotate: [0, -45, 0] },
                };
        }
    };

    const styles = getVariantStyles();

    // Optimized Mesh Background with better performance
    const MeshFallback = () => (
        <div className="absolute inset-0 overflow-hidden bg-background">
            {/* Optimized Base gradient blobs */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 25, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={cn("absolute top-[-15%] left-[-5%] w-[70%] h-[70%] rounded-full blur-[80px] opacity-30 mix-blend-screen will-change-transform", styles.blob1)}
            />
            <motion.div
                animate={{
                    x: [0, -25, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className={cn("absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full blur-[70px] opacity-20 mix-blend-screen will-change-transform", styles.blob2)}
            />

            {/* Subtler layers for better performance */}
            <WaveAnimation variant={variant} className="opacity-40" />
            <ParticleSystem variant={variant} particleCount={12} className="opacity-30" />
            <MorphingBlob variant={variant} className="opacity-30" />

            {/* Optimized backdrop blur - reduced intensity for mobile smoothness */}
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[20px] pointer-events-none" />

            {/* Static texture instead of SVG filter for zero-CPU cost texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-noise" />
        </div>
    );

    const showSpline = sceneUrl && !hasError;

    return (
        <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
            <AnimatePresence mode="wait">
                {!showSpline && (
                    <motion.div
                        key="fallback"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-10"
                    >
                        <MeshFallback />
                    </motion.div>
                )}
            </AnimatePresence>

            {showSpline && (
                <LocalErrorBoundary fallback={<MeshFallback />} onError={() => setHasError(true)}>
                    <Suspense fallback={null}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isLoaded ? 1 : 0 }}
                            transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full h-full"
                        >
                            <Spline
                                scene={sceneUrl}
                                onLoad={() => setIsLoaded(true)}
                                onError={(e) => {
                                    console.error("Spline Load Error:", e);
                                    setHasError(true);
                                }}
                            />
                        </motion.div>
                    </Suspense>
                </LocalErrorBoundary>
            )}

            {/* Subtle Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-background/10 pointer-events-none" />
        </div>
    );
};
