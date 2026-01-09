import { motion } from "framer-motion";
const capabilities = [
  {
    name: "Brand Experience",
    description: "Architecting visual and verbal identities that resonate with precision."
  },
  {
    name: "Web Platforms",
    description: "High-performance digital products built on robust architectural foundations."
  },
  {
    name: "Digital Creative",
    description: "Campaigns and content that bridge the gap between art and technology."
  },
  {
    name: "SEO Foundations",
    description: "Strategic search infrastructure to ensure your brand is seen by the right audience."
  }
];

export function CapabilitiesSection() {
  return (
    <section className="section-padding bg-section-primary">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="caption mb-10 inline-block opacity-40">Core Specialisms</span>
            <h2 className="headline-section">
              End-to-end expertise for the <span className="italic">new digital era.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 md:mt-0"
          >
            <div className="text-right">
              <span className="font-serif italic text-4xl opacity-10 leading-none select-none">Methodology</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="flex flex-col gap-10">
                <div className="w-16 h-px bg-foreground/20 group-hover:w-full transition-all duration-700" />
                <div>
                  <h3 className="headline-card group-hover:italic transition-all duration-500 mb-6">
                    {capability.name}
                  </h3>
                  <p className="body-base text-foreground/50 group-hover:text-foreground/80 transition-colors duration-500">
                    {capability.description}
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {['Foundation', 'Execution', 'Optimization'].map((item) => (
                    <li key={item} className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-10px] group-hover:translate-x-0">
                      <div className="w-1 h-1 rounded-full bg-foreground/20" />
                      <span className="caption !text-[9px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
