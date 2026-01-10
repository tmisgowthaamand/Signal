import { Link } from "react-router-dom";
import { Hero3DBackground } from "./Hero3DBackground";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-section-primary overflow-hidden">
      <Hero3DBackground />

      <div className="container-editorial relative z-50 pt-20 pointer-events-none">
        <div className="max-w-5xl pointer-events-auto">
          <div className="overflow-hidden mb-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="caption inline-block text-foreground"
            >
              Signal © 2026 — Strategy & Design
            </motion.span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="headline-hero text-foreground"
          >
            Strategy before scale.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-12 md:mt-16 max-w-2xl"
          >
            <p className="body-large text-foreground">
              We partner with considered brands to build clarity, not noise.
              Elevating digital experiences through strategic design and architectural technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-12 pointer-events-auto"
          >
            <Link
              to="/proposal"
              className="luxury-button luxury-button-fill group"
            >
              <span className="relative z-10 body-small tracking-widest font-bold">Get Started</span>
              <motion.span
                className="ml-3 inline-block"
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>

            <Link
              to="/work"
              className="group flex items-center gap-3 py-4"
            >
              <span className="body-small font-bold tracking-[0.2em] relative overflow-hidden">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Explore Work</span>
                <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0 italic">Explore Work</span>
              </span>
              <div className="w-12 h-px bg-foreground/20 group-hover:w-24 transition-all duration-700" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Editorial floating labels - even richer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-16 right-16 hidden lg:block z-20"
      >
        <div className="flex flex-col items-end gap-6">
          <div className="flex items-center gap-4">
            <span className="caption opacity-40">Position</span>
            <span className="caption">Bengaluru, IN</span>
          </div>
          <div className="w-32 h-px bg-foreground/[0.08]" />
          <div className="flex items-center gap-4">
            <span className="caption opacity-40">Status</span>
            <span className="caption flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
              Open for Bookings
            </span>
          </div>
        </div>
      </motion.div>

      {/* Artistic Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-foreground/[0.03] m-16 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-foreground/[0.03] m-16 pointer-events-none" />
    </section>
  );
}
