import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
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

const Work = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-24"
    >
      {/* Hero */}
      <section className="section-padding bg-section-primary relative overflow-hidden">
        <LiquidBackground variant="work" />
        <div className="container-editorial">
          <div className="max-w-4xl">
            <motion.span variants={itemVariants} className="caption text-muted-foreground uppercase tracking-widest">
              Work
            </motion.span>
            <motion.h1 variants={itemVariants} className="headline-hero mt-6">
              Selected projects
            </motion.h1>
            <motion.p variants={itemVariants} className="body-large text-muted-foreground mt-8 max-w-2xl leading-relaxed">
              Each engagement represents a strategic partnership. We share the thinking, not just the deliverables.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding-sm border-t border-border">
        <div className="container-editorial">
          {caseStudies.map((study, index) => (
            <motion.div key={study.id} variants={itemVariants}>
              <Link
                to={`/work/${study.id}`}
                className="block group relative"
              >
                <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-20 lg:py-24 border-b border-border last:border-b-0 hover:bg-foreground/5 transition-colors duration-500 px-4 -mx-4">
                  <div className="lg:col-span-1">
                    <span className="font-serif text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="lg:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    <div>
                      <h2 className="headline-xl group-hover:italic transition-all duration-500">
                        {study.client}
                      </h2>
                      <span className="caption text-muted-foreground tracking-widest mt-4 block uppercase font-medium">
                        {study.category} — {study.year}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between items-start">
                      <p className="body-large text-muted-foreground group-hover:text-foreground transition-colors duration-500 leading-relaxed">
                        {study.description}
                      </p>
                      <div className="mt-8 overflow-hidden inline-flex items-center gap-2 group/link">
                        <span className="body-small uppercase tracking-widest font-semibold border-b border-foreground/20 group-hover/link:border-foreground transition-colors">Study Case</span>
                        <span className="translate-x-[-10px] opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-border mt-24">
        <div className="container-editorial">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center py-24 border border-border bg-section-muted relative overflow-hidden group">
            <div className="absolute inset-0 bg-foreground/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
            <div className="relative z-10">
              <h2 className="headline-section !text-4xl md:!text-6xl mb-8">
                Your project could be next
              </h2>
              <p className="body-large text-muted-foreground mb-12">
                We take on a limited number of engagements each quarter to ensure quality.
              </p>
              <Link
                to="/proposal"
                className="inline-block body-small uppercase tracking-[0.2em] font-bold border border-foreground px-12 py-5 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Get a Proposal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Work;
