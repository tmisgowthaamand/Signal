import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Project {
    id: string;
    client: string;
    description: string;
    image?: string;
    category: string;
}

interface PremiumGalleryProps {
    projects: Project[];
}

export const PremiumGallery = ({ projects }: PremiumGalleryProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-0 border-t border-foreground/10">
            {projects.map((project, index) => (
                <Link
                    key={project.id}
                    to={`/work/${project.id}`}
                    className="relative group block"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-16 md:py-28 px-4 md:px-0 transition-all duration-700 border-b border-foreground/10 hover:bg-foreground/[0.02]">
                        <div className="flex items-center gap-12 md:gap-24 z-10 w-full md:w-auto">
                            <span className="caption opacity-30 font-serif italic text-lg normal-case tracking-normal">0{index + 1}</span>
                            <div className="flex flex-col gap-4">
                                <span className="caption tracking-[0.3em]">{project.category}</span>
                                <h3 className="headline-section !text-5xl md:!text-7xl group-hover:italic transition-all duration-700 group-hover:translate-x-4">
                                    {project.client}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-10 md:mt-0 md:max-w-md z-10">
                            <p className="body-large !text-lg text-foreground/50 group-hover:text-foreground/90 transition-colors duration-700">
                                {project.description}
                            </p>
                            <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <span className="caption !text-[10px]">View Case Study</span>
                                <div className="w-8 h-px bg-foreground/40" />
                            </div>
                        </div>
                    </div>

                    {/* Grand Image Preview */}
                    <AnimatePresence>
                        {hoveredIndex === index && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8, rotate: 2 }}
                                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                                className="absolute right-[15%] top-1/2 -translate-y-1/2 pointer-events-none z-20 hidden xl:block"
                                style={{ width: '600px', height: '400px' }}
                            >
                                <div className="w-full h-full bg-muted overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                                    {project.image ? (
                                        <motion.img
                                            initial={{ scale: 1.4 }}
                                            animate={{ scale: 1 }}
                                            src={project.image}
                                            alt={project.client}
                                            className="w-full h-full object-cover"
                                            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                                            <span className="caption opacity-20 italic">Strategic Preview</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Massive Floating Text */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 overflow-hidden select-none w-full flex justify-center opacity-0 group-hover:opacity-[0.03] transition-all duration-1000 group-hover:scale-110">
                        <span className="font-serif text-[20vw] leading-none whitespace-nowrap italic uppercase font-black">
                            {project.client}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};
