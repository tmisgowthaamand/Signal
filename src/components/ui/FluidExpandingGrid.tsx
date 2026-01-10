import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GridItem {
    id: string;
    title: string;
    category: string;
    description: string;
    image?: string;
}

interface FluidExpandingGridProps {
    items: GridItem[];
    className?: string;
}

const FluidExpandingGridBase = ({ items, className }: FluidExpandingGridProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className={cn("space-y-4", className)}>
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    layout
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className={cn(
                        "relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 will-change-[height,shadow]",
                        expandedId === item.id ? "h-[600px] shadow-2xl" : "h-[120px] bg-foreground/[0.03] hover:bg-foreground/[0.06]"
                    )}
                >
                    {/* Background Image (Only visible when expanded or slightly on hover) */}
                    <AnimatePresence>
                        {expandedId === item.id && (
                            <motion.img
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 0.8, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            />
                        )}
                    </AnimatePresence>

                    <div className={cn(
                        "relative z-10 w-full h-full p-8 flex transition-all duration-500 will-change-transform",
                        expandedId === item.id ? "flex-col justify-end bg-gradient-to-t from-background via-background/20 to-transparent" : "flex-row items-center justify-between"
                    )}>
                        <div className="flex items-center gap-12">
                            <span className="font-serif text-2xl opacity-20">
                                {items.indexOf(item) + 1 < 10 ? `0${items.indexOf(item) + 1}` : items.indexOf(item) + 1}
                            </span>
                            <div>
                                <h3 className={cn(
                                    "headline-card transition-all duration-500",
                                    expandedId === item.id ? "!text-5xl lg:!text-7xl mb-4 italic" : "!text-2xl"
                                )}>
                                    {item.title}
                                </h3>
                                {expandedId !== item.id && (
                                    <span className="caption text-muted-foreground uppercase tracking-widest block">
                                        {item.category}
                                    </span>
                                )}
                            </div>
                        </div>

                        {expandedId !== item.id && (
                            <div className="hidden md:flex items-center gap-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="body-small uppercase tracking-widest">Details</span>
                                <span className="text-2xl">+</span>
                            </div>
                        )}

                        <AnimatePresence>
                            {expandedId === item.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="max-w-2xl"
                                >
                                    <span className="caption text-foreground uppercase tracking-[0.4em] mb-6 block font-bold">
                                        {item.category}
                                    </span>
                                    <p className="body-large text-foreground leading-relaxed mb-10">
                                        {item.description}
                                    </p>
                                    <button className="luxury-button luxury-button-fill">
                                        <span className="body-small font-bold tracking-widest uppercase">View Case Study</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress bar for expanded state */}
                    {expandedId === item.id && (
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-foreground"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8 }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export const FluidExpandingGrid = memo(FluidExpandingGridBase);
