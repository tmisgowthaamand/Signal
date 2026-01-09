import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Featured insights - title-forward, no excerpts
const insights = [
  {
    id: "clarity-compounds",
    title: "Clarity Compounds",
    type: "Essay",
    category: "Strategy",
  },
  {
    id: "restraint-as-strategy",
    title: "Restraint as Strategy",
    type: "Framework",
    category: "Positioning",
  },
  {
    id: "seo-without-compromise",
    title: "SEO Without Compromise",
    type: "Playbook",
    category: "SEO",
  },
];

export function InsightsSection() {
  return (
    <section className="section-padding bg-section-secondary relative overflow-hidden">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 lg:mb-32 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="caption mb-8 inline-block opacity-40">Knowledge Base</span>
            <h2 className="headline-section">
              Strategic <span className="italic underline underline-offset-[12px] decoration-foreground/[0.05]">Perspectives.</span>
            </h2>
          </motion.div>

          <Link
            to="/insights"
            className="group flex items-center gap-4 body-small font-bold"
          >
            <span>View all articles</span>
            <div className="w-12 h-px bg-foreground/20 group-hover:w-20 transition-all duration-700" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {insights.map((insight, idx) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 1 }}
              className="group flex flex-col h-full bg-background/30 hover:bg-background/60 transition-all duration-700 border border-foreground/[0.03] p-10 lg:p-12"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="caption !text-[9px] px-3 py-1 border border-foreground/10 rounded-full">
                  {insight.category}
                </span>
                <span className="caption opacity-30 !text-[9px] italic font-serif normal-case tracking-normal">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>

              <Link to="/insights" className="flex-1">
                <h3 className="headline-card mb-8 group-hover:italic group-hover:translate-x-2 transition-all duration-700">
                  {insight.title}
                </h3>
              </Link>

              <div className="mt-auto pt-10 border-t border-foreground/[0.05] flex items-center justify-between">
                <span className="caption opacity-40 tracking-[0.2em]">{insight.type}</span>
                <div className="w-10 h-10 rounded-full bg-foreground/[0.03] flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute -bottom-32 -left-32 pointer-events-none select-none opacity-[0.02] transform -rotate-90 origin-top-left">
        <span className="font-serif text-[300px] leading-none uppercase font-black italic">Insights</span>
      </div>
    </section>
  );
}
