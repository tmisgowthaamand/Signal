import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabItem {
    id: string;
    title: string;
    number: string;
    body: string;
}

interface VerticalTabsProps {
    items: TabItem[];
    className?: string;
}

const VerticalTabsBase = ({ items, className }: VerticalTabsProps) => {
    const [activeTab, setActiveTab] = useState(items[0].id);

    const activeItem = items.find((item) => item.id === activeTab) || items[0];

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24", className)}>
            {/* Tabs list */}
            <div className="md:col-span-5 space-y-4">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full text-left p-8 rounded-xl transition-all duration-500 group relative overflow-hidden",
                            activeTab === item.id
                                ? "bg-foreground text-background shadow-2xl scale-[1.02]"
                                : "bg-foreground/[0.03] hover:bg-foreground/[0.08]"
                        )}
                    >
                        <div className="relative z-10 flex items-start gap-6">
                            <span className={cn(
                                "font-serif text-2xl transition-opacity duration-500",
                                activeTab === item.id ? "opacity-40" : "opacity-20 group-hover:opacity-40"
                            )}>
                                {item.number}
                            </span>
                            <h3 className="headline-card !text-xl lg:!text-2xl mt-1">
                                {item.title}
                            </h3>
                        </div>
                        {activeTab === item.id && (
                            <motion.div
                                layoutId="activeTabBackground"
                                className="absolute inset-0 bg-foreground -z-10"
                                transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content area */}
            <div className="md:col-span-7">
                <div className="sticky top-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: -20, y: -10 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                            className="bg-section-muted border border-border/50 p-12 lg:p-16 rounded-3xl shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <span className="text-[12rem] font-serif leading-none select-none">
                                    {activeItem.number}
                                </span>
                            </div>

                            <div className="relative z-10">
                                <span className="caption text-muted-foreground uppercase tracking-[0.3em] mb-8 block">
                                    Principle {activeItem.number}
                                </span>
                                <h2 className="headline-section !text-3xl lg:!text-5xl mb-10 leading-tight">
                                    {activeItem.title}
                                </h2>
                                <div className="h-px w-24 bg-foreground/20 mb-10" />
                                <p className="body-large text-muted-foreground/90 leading-relaxed font-light">
                                    {activeItem.body}
                                </p>

                                <div className="mt-16 flex items-center gap-6">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-foreground/10 flex items-center justify-center overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="body-small text-muted-foreground italic">Applied in 24+ projects</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export const VerticalTabs = memo(VerticalTabsBase);
