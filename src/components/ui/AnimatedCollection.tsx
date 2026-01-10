import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CollectionItem {
    id: string;
    title: string;
    author: string;
    date: string;
    category: string;
    image?: string;
}

interface AnimatedCollectionProps {
    items: CollectionItem[];
    className?: string;
}

const AnimatedCollectionBase = ({ items, className }: AnimatedCollectionProps) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className={cn("relative flex flex-col", className)}>
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group relative border-b border-border py-12 lg:py-16 flex flex-col md:flex-row md:items-center justify-between gap-8 cursor-pointer overflow-hidden px-4 -mx-4"
                >
                    {/* Animated Background on Hover */}
                    <motion.div
                        className="absolute inset-0 bg-foreground/[0.03] -z-10 will-change-transform"
                        initial={{ x: "-100%" }}
                        animate={{ x: hoveredId === item.id ? "0%" : "-100%" }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
                    />

                    <div className="flex flex-col md:flex-row md:items-center gap-12 lg:gap-20 relative z-10 w-full">
                        <div className="flex items-center gap-6 md:w-48 shrink-0">
                            <span className="caption opacity-30 text-xs font-mono">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                            <span className="caption uppercase tracking-[0.2em] text-[10px] font-bold py-1 px-3 bg-foreground/5 rounded-full">{item.category}</span>
                        </div>

                        <div className="flex-1">
                            <h3 className="headline-card !text-3xl lg:!text-5xl transition-all duration-500 group-hover:translate-x-4">
                                {item.title}
                            </h3>
                            <div className="flex items-center gap-6 mt-6 opacity-40 group-hover:opacity-100 transition-opacity">
                                <span className="body-small italic">by {item.author}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                                <span className="body-small font-mono uppercase text-[10px]">{item.date}</span>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center gap-4 text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-10 group-hover:translate-x-0">
                            <span className="body-small font-bold tracking-widest uppercase italic">Read Insight</span>
                            <div className="w-12 h-px bg-foreground" />
                        </div>
                    </div>

                    {/* Hover Image Preview (Optional / Floating) */}
                    <AnimatePresence>
                        {hoveredId === item.id && item.image && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                className="absolute right-48 top-1/2 -translate-y-1/2 w-64 h-40 hidden xl:block pointer-events-none z-20 shadow-2xl rounded-xl overflow-hidden will-change-transform"
                            >
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
};

export const AnimatedCollection = memo(AnimatedCollectionBase);
