import { Link } from "react-router-dom";
import { insights } from "@/data/insights";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { RunningText } from "@/components/ui/RunningText";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { AnimatedCollection } from "@/components/ui/AnimatedCollection";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const Insights = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-24"
    >
      {/* Hero - Emerald/Teal Theme */}
      <section ref={heroRef} className="section-padding bg-section-primary relative overflow-hidden min-h-[80vh] flex items-center">
        <LiquidBackground variant="insights" />

        {/* Decorative Elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute top-[20%] right-[12%] w-36 h-36 rounded-full border border-emerald-500/15 hidden lg:block"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]), opacity }}
          className="absolute bottom-[25%] right-[8%] w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/10 blur-2xl hidden lg:block"
        />

        {/* Floating Status Badges */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-32 right-8 hidden lg:flex flex-col gap-3 z-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            className="glass-card px-4 py-2 flex items-center gap-2 text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">{insights.length} Articles</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            className="glass-card px-4 py-2 text-xs text-muted-foreground"
          >
            Strategy & Design
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-24 md:top-28 z-10">
          <RunningText text="THINKING BEFORE BUILDING — SIGNAL INSIGHTS" className="opacity-50" />
        </div>

        <div className="container-editorial relative z-20 will-change-transform">
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]), opacity }} className="max-w-4xl">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.03] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" />
                <span className="caption text-muted-foreground">Insights</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="headline-hero">
              <span className="block">Thinking</span>
              <span className="block mt-2">
                <span className="italic font-light text-foreground/70">before</span>{" "}
                <span className="relative inline-block">
                  building
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                    className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 origin-left"
                  />
                </span>
                <span className="text-foreground/30">.</span>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="body-large text-muted-foreground mt-10 max-w-2xl leading-relaxed">
              Essays and frameworks on{" "}
              <span className="text-foreground font-medium">strategy, design</span>,
              and building brands that navigate complexity with clarity.
            </motion.p>

            {/* Topics Tags */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap gap-3"
            >
              {["Strategy", "Design", "Branding", "Technology", "Leadership"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--foreground) / 0.05)" }}
                  className="px-4 py-2 text-xs font-medium tracking-wider uppercase border border-border/50 rounded-full cursor-default transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Insights List */}
      <section className="section-padding-sm border-t border-border bg-background">
        <div className="container-editorial">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-border bg-foreground/[0.02] mb-4">
                <span className="caption text-muted-foreground">Knowledge Base</span>
              </span>
              <h2 className="headline-section italic">
                Essays on{" "}
                <span className="not-italic text-foreground/70">Strategy & Design</span>
              </h2>
            </div>

            {/* View indicator */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card px-4 py-2 flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 rounded-full border border-dashed border-emerald-500/50"
              />
              <span className="text-xs text-muted-foreground">Latest First</span>
            </motion.div>
          </motion.div>

          {/* Articles Grid */}
          <AnimatedCollection
            items={insights.map((insight, index) => ({
              id: insight.id,
              title: insight.title,
              author: "Signal Strategy Team",
              date: insight.date,
              category: insight.type,
              image: `https://images.unsplash.com/photo-${1515378960530 + index}?auto=format&fit=crop&q=80&w=600`
            }))}
          />
        </div>
      </section>

      {/* Quote & CTA Section */}
      <section className="section-padding border-t border-border mt-12">
        <div className="container-editorial">
          <div className="max-w-3xl mx-auto">
            {/* Featured Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block mb-8"
              >
                <span className="text-6xl opacity-20">"</span>
              </motion.div>

              <blockquote className="headline-card italic text-foreground/80 mb-8">
                Strategy without clarity is just noise.
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-emerald-500/50" />
                <span className="text-sm text-muted-foreground">Signal Philosophy</span>
                <div className="w-12 h-px bg-emerald-500/50" />
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="glass-card p-10 md:p-14 relative overflow-hidden group"
            >
              {/* Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-teal-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />

              {/* Decorative */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -top-20 w-40 h-40 rounded-full border border-emerald-500/10"
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <h3 className="headline-card mb-3">
                    This perspective{" "}
                    <span className="italic text-foreground/70">resonates?</span>
                  </h3>
                  <p className="body-base text-muted-foreground">
                    Let's explore how we can help clarify your brand's direction.
                  </p>
                </div>

                <Link
                  to="/proposal"
                  className="group/link inline-flex items-center gap-4 shrink-0"
                >
                  <div className="relative overflow-hidden rounded-full bg-foreground text-background px-8 py-4 transition-all duration-500 group-hover/link:shadow-lg group-hover/link:shadow-emerald-500/20">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="relative z-10 flex items-center gap-3 body-small font-bold tracking-[0.1em]">
                      LET'S TALK
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Insights;
