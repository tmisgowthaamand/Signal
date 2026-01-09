import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './ThemeSwitcher';
import {
    Home,
    Briefcase,
    Lightbulb,
    Mail,
    Search,
    Menu,
    X
} from 'lucide-react';

interface NavItem {
    label: string;
    icon: React.ReactNode;
    path: string;
}

const navItems: NavItem[] = [
    { label: 'Home', icon: <Home size={20} />, path: '/' },
    { label: 'Work', icon: <Briefcase size={20} />, path: '/work' },
    { label: 'Philosophy', icon: <Lightbulb size={20} />, path: '/philosophy' },
    { label: 'Insights', icon: <Search size={20} />, path: '/insights' },
    { label: 'Proposal', icon: <Mail size={20} />, path: '/proposal' },
];

export const BottomMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useOutsideClick(containerRef, () => setIsOpen(false));

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 p-2 bg-background/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl flex flex-col gap-1 min-w-[200px]"
                        ref={containerRef}
                    >
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                        isActive
                                            ? "bg-foreground text-background"
                                            : "hover:bg-accent text-foreground"
                                    )}
                                >
                                    <span className={cn(
                                        "transition-transform duration-200 group-hover:scale-110",
                                        isActive ? "text-background" : "text-muted-foreground"
                                    )}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                        <div className="h-px bg-border my-1" />
                        <div className="px-2 py-2">
                            <ThemeSwitcher />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                layout
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center bg-foreground text-background shadow-xl border border-white/10 hover:scale-105 active:scale-95 transition-all",
                    isOpen && "bg-accent text-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'menu'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
