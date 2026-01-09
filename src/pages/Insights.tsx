import { Link } from "react-router-dom";
import { insights } from "@/data/insights";
import { motion } from "framer-motion";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

const Insights = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-24"
    >
      {/* Hero */}
      <section className="section-padding bg-section-primary relative overflow-hidden">
        <LiquidBackground variant="insights" />
        <div className="container-editorial">
          <div className="max-w-4xl">
            <motion.span variants={itemVariants} className="caption text-muted-foreground uppercase tracking-widest">
              Insights
            </motion.span>
            <motion.h1 variants={itemVariants} className="headline-hero mt-6">
              Thinking before building.
            </motion.h1>
            <motion.p variants={itemVariants} className="body-large text-muted-foreground mt-8 max-w-2xl leading-relaxed">
              Essays and frameworks on strategy, design, and building brands that navigate complexity with clarity.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Insights List */}
      <section className="section-padding-sm border-t border-border">
        <div className="container-editorial">
          <div className="max-w-4xl">
            {insights.map((insight, index) => (
              <motion.div key={insight.id} variants={itemVariants}>
                <Link
                  to={`/insights/${insight.id}`}
                  className="group block"
                >
                  <article className="py-16 lg:py-20 border-b border-border transition-all duration-500 hover:px-6 -mx-6 rounded-lg hover:bg-foreground/5">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="caption uppercase tracking-[0.2em] font-semibold text-muted-foreground bg-muted px-3 py-1 rounded">
                        {insight.type}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="caption text-muted-foreground italic">
                        {insight.category}
                      </span>
                    </div>
                    <h2 className="headline-xl group-hover:italic transition-all duration-500 mb-6">
                      {insight.title}
                    </h2>
                    <div className="flex justify-between items-center">
                      <span className="body-small text-muted-foreground/60 tracking-wider">
                        {insight.date}
                      </span>
                      <span className="body-small font-bold uppercase tracking-widest translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        Read Essay →
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion */}
      <section className="section-padding border-t border-border mt-12">
        <div className="container-editorial">
          <motion.div variants={itemVariants} className="max-w-2xl">
            <p className="body-large text-muted-foreground italic">
              "Strategy without clarity is just noise."
            </p>
            <Link
              to="/proposal"
              className="inline-flex items-center gap-4 body-base text-foreground font-semibold hover:opacity-70 transition-all duration-300 mt-8 group"
            >
              <span className="link-underline">If this perspective resonates, let's talk</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Insights;
