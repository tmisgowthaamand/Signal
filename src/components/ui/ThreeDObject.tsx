import { Suspense } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export function ThreeDObject() {
    return (
        <div className="w-full h-full relative min-h-[500px] lg:min-h-[700px]">
            <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-foreground/10 border-t-foreground rounded-full animate-spin" />
                </div>
            }>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full absolute inset-0"
                >
                    <Spline
                        scene="https://prod.spline.design/S60E664-5hN7M06V/scene.splinecode"
                        className="w-full h-full"
                    />
                </motion.div>
            </Suspense>

            {/* Subtle floating glass elements for extra depth */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 right-1/4 w-32 h-32 glass-card rounded-2xl blur-sm opacity-20 pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-1/4 left-1/4 w-40 h-40 glass-card rounded-full blur-md opacity-10 pointer-events-none"
            />
        </div>
    );
}
