import React, { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isInput, setIsInput] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth springs for the outer ring
    const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.6 };
    const dotSpringConfig = { damping: 40, stiffness: 400, mass: 0.2 };

    const ringX = useSpring(mouseX, ringSpringConfig);
    const ringY = useSpring(mouseY, ringSpringConfig);

    const dotX = useSpring(mouseX, dotSpringConfig);
    const dotY = useSpring(mouseY, dotSpringConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [mouseX, mouseY, isVisible]);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isClickable =
            target.tagName.toLowerCase() === 'button' ||
            target.tagName.toLowerCase() === 'a' ||
            target.closest('button') ||
            target.closest('a') ||
            window.getComputedStyle(target).cursor === 'pointer';

        const isInputField =
            target.tagName.toLowerCase() === 'input' ||
            target.tagName.toLowerCase() === 'textarea' ||
            target.isContentEditable;

        setIsHovering(!!isClickable);
        setIsInput(!!isInputField);
    }, []);

    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", () => setIsVisible(false));
        document.addEventListener("mouseenter", () => setIsVisible(true));

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp]);

    // Disable custom cursor on touch devices
    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) setIsVisible(false);
    }, []);

    if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            <style>
                {`
          @media (min-width: 768px) {
            * {
              cursor: none !important;
            }
            a, button, [role="button"], input, textarea {
              cursor: none !important;
            }
          }
        `}
            </style>
            <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
                {/* Outer ring */}
                <motion.div
                    className={cn(
                        "fixed rounded-full border border-primary/30 flex items-center justify-center transition-colors duration-300",
                        isHovering || isClicking ? "bg-primary/5 border-primary/50" : "bg-transparent"
                    )}
                    animate={{
                        width: isClicking ? 40 : isHovering ? 80 : isInput ? 4 : 48,
                        height: isClicking ? 40 : isHovering ? 80 : isInput ? 32 : 48,
                        borderRadius: isInput ? "2px" : "100%",
                    }}
                    style={{
                        x: ringX,
                        y: ringY,
                        translateX: "-50%",
                        translateY: "-50%",
                        opacity: isVisible ? 1 : 0,
                    }}
                >
                    <AnimatePresence>
                        {isHovering && !isClicking && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="body-small text-[10px] tracking-[0.2em] font-bold"
                            >
                                VIEW
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Inner dot */}
                <motion.div
                    className={cn(
                        "fixed w-1.5 h-1.5 bg-primary rounded-full transition-transform duration-200",
                        isInput && "opacity-0"
                    )}
                    style={{
                        x: dotX,
                        y: dotY,
                        translateX: "-50%",
                        translateY: "-50%",
                        opacity: isVisible && !isInput ? 1 : 0,
                        scale: isClicking ? 0.8 : 1,
                    }}
                />
            </div>
        </>
    );
};
