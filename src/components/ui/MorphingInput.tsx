import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const MorphingInputBase = ({ label, error, className, value, ...props }: MorphingInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    const isActive = isFocused || hasValue;

    return (
        <div className={cn("group relative w-full mb-12", className)}>
            <motion.label
                initial={false}
                animate={{
                    y: isActive ? -28 : 16,
                    scale: isActive ? 0.8 : 1,
                    color: isFocused ? "var(--foreground)" : "var(--muted-foreground)",
                    opacity: isActive ? 1 : 0.6
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
                className="absolute left-0 top-0 pointer-events-none origin-left caption uppercase tracking-widest font-medium will-change-transform"
            >
                {label}
            </motion.label>

            <input
                {...props}
                ref={inputRef}
                value={value}
                onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    props.onBlur?.(e);
                }}
                className="w-full bg-transparent border-b border-border/40 px-0 py-4 body-large focus:outline-none focus:border-foreground transition-all duration-700 placeholder:opacity-0"
            />

            {/* Animated underline */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-foreground origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isFocused ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
                style={{ width: "100%", willChange: "transform" }}
            />

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 text-xs text-red-500 font-medium tracking-tight"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Subtle background glow on focus */}
            <div className={cn(
                "absolute -inset-x-4 -inset-y-2 bg-foreground/[0.02] rounded-lg -z-10 transition-opacity duration-700",
                isFocused ? "opacity-100" : "opacity-0"
            )} />
        </div>
    );
};

export const MorphingInput = memo(MorphingInputBase);
