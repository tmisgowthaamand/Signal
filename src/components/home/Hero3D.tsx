import React, { Suspense, useState, Component, ErrorInfo, ReactNode } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';

class LocalErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode, onError?: () => void }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Spline Runtime Error:", error, errorInfo);
        this.props.onError?.();
    }
    render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

export const Hero3D = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Ultra-premium mesh gradient fallback
    const MeshFallback = () => (
        <div className="absolute inset-0 overflow-hidden bg-[#000000]">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 100, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-accent/20 blur-[120px] opacity-40"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -45, 0],
                    x: [0, -50, 0],
                    y: [0, -100, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-foreground/10 blur-[100px] opacity-30"
            />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[20px]" />
        </div>
    );

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none md:pointer-events-auto">
            <AnimatePresence>
                {(!isLoaded || hasError) && (
                    <motion.div
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

            {!hasError && (
                <LocalErrorBoundary fallback={<MeshFallback />} onError={() => setHasError(true)}>
                    <Suspense fallback={null}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isLoaded ? 1 : 0 }}
                            transition={{ duration: 1.5 }}
                            className="w-full h-full"
                        >
                            <Spline
                                // Using a more stable and public Spline scene
                                scene="https://prod.spline.design/kZqon7WDbT84-Kj3/scene.splinecode"
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
        </div>
    );
};
