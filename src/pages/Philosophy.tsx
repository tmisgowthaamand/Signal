import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const Philosophy = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-24"
    >
      {/* Hero */}
      <section className="section-padding bg-section-primary">
        <div className="container-editorial">
          <div className="max-w-4xl">
            <motion.span variants={itemVariants} className="caption text-muted-foreground uppercase tracking-widest">
              Philosophy
            </motion.span>
            <motion.h1 variants={itemVariants} className="headline-hero mt-6">
              How we think shapes what we build.
            </motion.h1>
            <motion.p variants={itemVariants} className="body-large text-muted-foreground mt-8 max-w-2xl leading-relaxed">
              These aren't values on a wall. They're working principles that guide every decision, every project, every conversation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="section-padding border-t border-border">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief.number}
                variants={itemVariants}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 py-20 ${index !== beliefs.length - 1 ? "border-b border-border" : ""
                  } group hover:bg-foreground/5 transition-colors duration-500 px-4 -mx-4`}
              >
                <div className="md:col-span-2">
                  <span className="font-serif text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                    {belief.number}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <h2 className="headline-xl mb-6 group-hover:translate-x-1 transition-transform duration-500">
                    {belief.title}
                  </h2>
                  <p className="body-large text-muted-foreground leading-relaxed">
                    {belief.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition to Work */}
      <section className="section-padding border-t border-border">
        <div className="container-editorial">
          <motion.div variants={itemVariants} className="max-w-2xl">
            <Link
              to="/work"
              className="group inline-flex items-center gap-4 body-large text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <span className="link-underline">See how this thinking translates into work</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Philosophy;
