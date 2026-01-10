import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { RunningText } from "@/components/ui/RunningText";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { VerticalTabs } from "@/components/ui/VerticalTabs";
import { useRef } from "react";

const beliefs = [
  {
    number: "01",
    title: "Clarity is strategy",
    body: "Most brands fail not from lack of effort, but from lack of focus. We believe the first job of strategy is to create clarity—to identify what matters most and pursue it with conviction. When you know exactly who you serve and why you exist, every decision becomes easier. Clarity compounds. It's not just a starting point; it's an ongoing discipline.",
  },
  {
    number: "02",
    title: "Design is thinking made visible",
    body: "We don't separate strategy from execution. Design is not decoration applied after decisions are made—it's a way of working through problems. Every visual choice, every interaction, every word reflects underlying thinking. When design is treated as strategy made tangible, the result is work that communicates before it needs to be explained.",
  },
  {
    number: "03",
    title: "Restraint outperforms excess",
    body: "Addition is easy. Subtraction requires judgment. The brands that endure know what to leave out. They resist the temptation to chase every trend, serve every audience, or add every feature. We believe in building deliberately—choosing constraints that create distinction rather than capabilities that create confusion.",
  },
  {
    number: "04",
    title: "Partnership, not production",
    body: "We're not an agency that takes orders and delivers assets. We're strategic partners who work alongside leadership teams to solve real problems. This requires honesty, shared accountability, and a willingness to challenge assumptions—including our own. The best work emerges from genuine collaboration.",
  },
  {
    number: "05",
    title: "Long-term value over short-term metrics",
    body: "Quick wins are seductive but often hollow. We focus on building foundations that create compounding returns—brand equity that appreciates, systems that scale, and relationships that deepen. This means sometimes saying no to what would work today in favor of what will matter in five years.",
  },
];

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

const Philosophy = () => {
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
      {/* Hero - Purple/Violet Theme */}
      <section ref={heroRef} className="section-padding bg-section-primary relative overflow-hidden min-h-[80vh] flex items-center">
        <LiquidBackground variant="philosophy" />

        {/* Decorative Elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full border border-purple-500/20 hidden lg:block"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]), opacity }}
          className="absolute bottom-[25%] right-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-xl hidden lg:block"
        />

        <div className="pointer-events-none absolute inset-x-0 top-24 md:top-28 z-20">
          <RunningText text="HOW WE THINK SHAPES WHAT WE BUILD" className="opacity-50" />
        </div>

        <div className="container-editorial relative z-30 will-change-transform">
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]), opacity }} className="max-w-4xl">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/[0.03] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 animate-pulse" />
                <span className="caption text-muted-foreground">Philosophy</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="headline-hero">
              <span className="block">How we think</span>
              <span className="block mt-2">
                <span className="italic font-light text-foreground/70">shapes what</span>{" "}
                <span className="relative inline-block">
                  we build
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                    className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 origin-left"
                  />
                </span>
                <span className="text-foreground/30">.</span>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="body-large text-muted-foreground mt-10 max-w-2xl leading-relaxed">
              These aren't values on a wall. They're{" "}
              <span className="text-foreground font-medium">working principles</span>{" "}
              that guide every decision, every project, every conversation.
            </motion.p>

            {/* Visual Accent */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-purple-500/30 to-violet-500/30 backdrop-blur-sm"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">5 principles</span> that define our approach
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Beliefs - Premium Card Layout */}
      <section className="section-padding border-t border-border bg-background">
        <div className="container-editorial">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div variants={itemVariants} className="mb-20 text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 rounded-full border border-border bg-foreground/[0.02] mb-6"
              >
                <span className="caption text-muted-foreground">Core Beliefs</span>
              </motion.span>

              <h2 className="headline-section !text-4xl md:!text-6xl mb-6">
                Our Operating{" "}
                <span className="italic text-foreground/70">Principles</span>
              </h2>
              <p className="body-large text-muted-foreground mx-auto max-w-xl">
                Five core beliefs that define how we approach strategy, design, and partnership.
              </p>
            </motion.div>

            {/* Vertical Tabs */}
            <VerticalTabs
              items={beliefs.map(b => ({
                id: b.number,
                title: b.title,
                number: b.number,
                body: b.body
              }))}
            />

            {/* Bottom Accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-20 flex justify-center"
            >
              <div className="glass-card px-8 py-4 flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full border border-dashed border-foreground/20"
                />
                <span className="text-sm text-muted-foreground">
                  Principles in <span className="text-foreground">constant practice</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transition to Work - Premium CTA */}
      <section className="section-padding border-t border-border">
        <div className="container-editorial">
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-12 md:p-16 relative overflow-hidden group"
            >
              {/* Background Gradient on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] to-violet-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />

              <div className="relative z-10">
                <span className="caption text-muted-foreground block mb-6">Next Step</span>
                <h3 className="headline-card mb-6">
                  See how this thinking{" "}
                  <span className="italic text-foreground/70">translates</span>
                </h3>
                <p className="body-base text-muted-foreground mb-10 max-w-md mx-auto">
                  Our philosophy isn't theoretical—it's embedded in every project we take on.
                </p>

                <Link
                  to="/work"
                  className="group/link inline-flex items-center gap-4"
                >
                  <span className="relative overflow-hidden">
                    <span className="body-small font-bold tracking-[0.15em] inline-block transition-transform duration-500 group-hover/link:-translate-y-full">
                      EXPLORE WORK
                    </span>
                    <span className="body-small font-bold tracking-[0.15em] absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover/link:translate-y-0 text-purple-500">
                      EXPLORE WORK
                    </span>
                  </span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-xl"
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Philosophy;
