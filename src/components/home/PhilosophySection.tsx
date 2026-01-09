import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Clarity is strategy",
    description: "We distill complexity into focus. Every decision stems from understanding what matters most.",
  },
  {
    number: "02",
    title: "Design is thinking made visible",
    description: "Aesthetics follow intention. We craft systems that communicate before they decorate.",
  },
  {
    number: "03",
    title: "Restraint outperforms excess",
    description: "The brands that endure know what to leave out. We build deliberately, not abundantly.",
  },
  {
    number: "04",
    title: "Partnership, not production",
    description: "We work with, not for. Every engagement is a collaboration that elevates both sides.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export function PhilosophySection() {
  return (
    <section className="section-padding bg-section-secondary relative overflow-hidden">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-6 mb-12">
              <span className="caption">01 — Ethos</span>
              <div className="flex-1 h-px bg-foreground/[0.08]" />
            </div>

            <h2 className="headline-section relative">
              Design is thinking made <span className="italic">visible.</span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="body-large mt-12 text-foreground/80"
            >
              We believe that the most successful digital products are the result of
              intense focus, architectural rigor, and an uncompromising commitment
              to clarity.
            </motion.p>

            <Link
              to="/philosophy"
              className="group inline-flex items-center gap-4 body-small font-bold mt-16"
            >
              <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center transition-all duration-500 group-hover:bg-foreground group-hover:text-background">
                →
              </div>
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Read the manual</span>
                <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0 italic">Our Philosophy</span>
              </span>
            </Link>
          </motion.div>

          {/* Principles */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12">
              {principles.map((principle, idx) => (
                <motion.div
                  key={principle.number}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-serif text-sm italic opacity-30 mt-1">
                      ({principle.number})
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl mb-6 group-hover:italic transition-all duration-500">
                        {principle.title}
                      </h3>
                      <p className="body-base text-foreground/60 leading-relaxed max-w-sm">
                        {principle.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle hover reveal line */}
                  <div className="absolute -bottom-10 left-0 w-0 h-px bg-foreground/10 transition-all duration-1000 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 -right-64 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
