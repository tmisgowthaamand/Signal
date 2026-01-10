import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoItem {
    id: string;
    title: string;
    category: string;
    description: string;
    className?: string;
    image?: string;
}

interface MagnifiedBentoProps {
    items: BentoItem[];
    className?: string;
}

const MagnifiedBentoBase = ({ items, className }: MagnifiedBentoProps) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[350px]", className)}>
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={cn(
                        "relative rounded-3xl overflow-hidden border border-border/50 group transition-all duration-500 will-change-transform",
                        item.className,
                        hoveredId === item.id ? "z-20 scale-[1.02] shadow-2xl" : hoveredId ? "z-10 opacity-50 grayscale-[0.5] scale-[0.98]" : "z-10"
                    )}
                >
                    {/* Background Gradient/Pattern */}
                    <div className="absolute inset-0 bg-section-muted opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                    {item.image && (
                        <motion.img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pt-32 p-8 flex flex-col justify-end">
                        <motion.div
                            animate={hoveredId === item.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0.8 }}
                            transition={{ duration: 0.35 }}
                        >
                            <span className="caption text-muted-foreground uppercase tracking-widest mb-3 block">
                                {item.category}
                            </span>
                            <h3 className="headline-card !text-2xl lg:!text-3xl mb-4 leading-tight group-hover:italic transition-all duration-500">
                                {item.title}
                            </h3>
                        </motion.div>

                        <AnimatePresence>
                            {hoveredId === item.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="body-small text-muted-foreground leading-relaxed mt-2 max-w-xs">
                                        {item.description}
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-foreground font-bold body-small uppercase tracking-widest">
                                        Explore Project <span className="text-xl">→</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-foreground/10 group-hover:border-foreground/30 transition-colors" />
                </motion.div>
            ))}
        </div>
    );
};

export const MagnifiedBento = memo(MagnifiedBentoBase);
