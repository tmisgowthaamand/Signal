import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphingBlobProps {
    variant?: "home" | "philosophy" | "work" | "insights" | "inquiry";
    className?: string;
}

export const MorphingBlob = ({ variant = "home", className }: MorphingBlobProps) => {
    const getBlobConfig = () => {
        switch (variant) {
            case "philosophy":
                return {
                    gradient: "from-purple-500/20 via-violet-500/15 to-fuchsia-500/10",
                    position: "top-[20%] right-[15%]",
                };
            case "work":
                return {
                    gradient: "from-orange-500/20 via-amber-500/15 to-yellow-500/10",
                    position: "top-[25%] right-[10%]",
                };
            case "insights":
                return {
                    gradient: "from-emerald-500/20 via-teal-500/15 to-cyan-500/10",
                    position: "top-[30%] right-[12%]",
                };
            case "inquiry":
                return {
                    gradient: "from-amber-700/20 via-rose-900/15 to-orange-100/10",
                    position: "top-[25%] right-[15%]",
                };
            case "home":
            default:
                return {
                    gradient: "from-blue-500/20 via-sky-500/15 to-indigo-500/10",
                    position: "top-[20%] right-[10%]",
                };
        }
    };

    const config = getBlobConfig();

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {/* Main morphing blob */}
            <motion.div
                className={cn(
                    "absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br blur-[80px] opacity-40 will-change-transform",
                    config.gradient,
                    config.position
                )}
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 0],
                    borderRadius: ["50%", "40%", "50%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Secondary blob */}
            <motion.div
                className={cn(
                    "absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br blur-[60px] opacity-30 will-change-transform",
                    config.gradient
                )}
                style={{
                    top: "40%",
                    left: "10%",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Tertiary small blob */}
            <motion.div
                className={cn(
                    "absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br blur-[50px] opacity-25 will-change-transform",
                    config.gradient
                )}
                style={{
                    bottom: "20%",
                    right: "25%",
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};
