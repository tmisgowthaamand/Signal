import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { RunningText } from "@/components/ui/RunningText";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { FluidExpandingGrid } from "@/components/ui/FluidExpandingGrid";
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

const Work = () => {
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
      {/* Hero - Orange/Amber Theme */}
      <section ref={heroRef} className="section-padding bg-section-primary relative overflow-hidden min-h-[80vh] flex items-center">
        <LiquidBackground variant="work" />

        {/* Decorative Elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute top-[25%] right-[8%] w-40 h-40 rounded-full border border-orange-500/15 hidden lg:block"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]), opacity }}
          className="absolute bottom-[20%] right-[12%] w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 blur-2xl hidden lg:block"
        />

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-32 right-8 hidden lg:block z-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            className="glass-card px-4 py-2 flex items-center gap-2 text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-muted-foreground">{caseStudies.length}+ Projects</span>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-24 md:top-28 z-10">
          <RunningText text="SELECTED PROJECTS — STRATEGIC PARTNERSHIPS" className="opacity-50" />
        </div>

        <div className="container-editorial relative z-20 will-change-transform">
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]), opacity }} className="max-w-4xl">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/[0.03] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse" />
                <span className="caption text-muted-foreground">Work</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="headline-hero">
              <span className="block">Selected</span>
              <span className="block mt-2">
                <span className="relative inline-block">
                  projects
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                    className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 origin-left"
                  />
                </span>
                <span className="text-foreground/30">.</span>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="body-large text-muted-foreground mt-10 max-w-2xl leading-relaxed">
              Each engagement represents a{" "}
              <span className="text-foreground font-medium">strategic partnership</span>.
              We share the thinking, not just the deliverables.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-wrap gap-12"
            >
              {[
                { number: `${caseStudies.length}+`, label: "Case Studies" },
                { number: "100%", label: "Client Focus" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="group"
                >
                  <motion.span
                    className="block text-2xl md:text-3xl font-bold tracking-tight"
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="block mt-1 text-xs text-muted-foreground tracking-[0.2em] uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Projects Grid */}
      <section className="section-padding-sm border-t border-border bg-background">
        <div className="container-editorial">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-border bg-foreground/[0.02] mb-4">
                <span className="caption text-muted-foreground">Archive</span>
              </span>
              <h2 className="headline-section italic">
                The Journal of{" "}
                <span className="not-italic text-foreground/70">Creation</span>
              </h2>
            </div>

            {/* Filter hint */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card px-4 py-2 flex items-center gap-3"
            >
              <div className="flex -space-x-1">
                {["bg-orange-500", "bg-amber-500", "bg-yellow-500"].map((color, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${color} border border-background`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">All Categories</span>
            </motion.div>
          </motion.div>

          {/* Projects Grid */}
          <FluidExpandingGrid
            items={caseStudies.map((study, index) => ({
              id: study.id,
              title: study.client,
              category: study.category,
              description: study.description,
              image: `https://images.unsplash.com/photo-${1460925895917 + index}?auto=format&fit=crop&q=80&w=1200`
            }))}
          />
        </div>
      </section>

      {/* Premium CTA */}
      <section className="section-padding border-t border-border mt-24">
        <div className="container-editorial">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative text-center py-24 md:py-32 bg-foreground text-background overflow-hidden rounded-3xl group shadow-2xl"
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-amber-600/20 to-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              />

              {/* Decorative Circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-background/5"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-background/[0.08]"
              />

              <div className="relative z-10 px-8">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="caption opacity-60 uppercase tracking-[0.5em] mb-8 block"
                >
                  Inquiry
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="headline-section !text-4xl md:!text-6xl mb-10 leading-tight"
                >
                  Ready to find <br />
                  <span className="italic font-light opacity-80">true clarity?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="body-large opacity-70 mb-16 max-w-xl mx-auto"
                >
                  We take on a limited number of engagements each quarter to ensure every partner gets our full strategic focus.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/proposal"
                    className="group/btn relative inline-flex items-center gap-3 bg-background text-foreground px-14 py-6 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="relative z-10 body-small uppercase tracking-[0.2em] font-bold group-hover/btn:text-white transition-colors duration-300">
                      Request Access
                    </span>
                    <motion.span
                      className="relative z-10 group-hover/btn:text-white transition-colors duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Work;
