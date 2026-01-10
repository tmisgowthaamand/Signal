import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import { MagnifiedBento } from "../ui/MagnifiedBento";

const projects = caseStudies.slice(0, 3).map((study, index) => ({
  id: study.id,
  title: study.client,
  category: study.category,
  description: study.description,
  className: index === 0 ? "md:col-span-8 md:row-span-2" : "md:col-span-4",
  image: `https://images.unsplash.com/photo-${index === 0 ? '1497366216548-37526070297c' : index === 1 ? '1460925895917-afdab827c52f' : '1504384308090-c894fdcc538d'}?auto=format&fit=crop&q=80&w=800`
}));

export function WorkSection() {
  return (
    <section className="section-padding bg-section-primary relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container-editorial relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <span className="caption text-muted-foreground uppercase tracking-widest">Selected Work</span>
            <h2 className="headline-section mt-4">
              Proof, not promises
            </h2>
          </div>
          <Link
            to="/work"
            className="body-small link-underline uppercase tracking-widest font-bold"
          >
            View all projects
          </Link>
        </div>

        {/* Projects Gallery */}
        <MagnifiedBento items={projects} />
      </div>
    </section>
  );
}
