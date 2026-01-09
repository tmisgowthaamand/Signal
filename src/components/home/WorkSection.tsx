import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import { PremiumGallery } from "../ui/PremiumGallery";

const projects = caseStudies.slice(0, 3);

export function WorkSection() {
  return (
    <section className="section-padding bg-section-muted relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container-editorial relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <span className="caption text-muted-foreground">Selected Work</span>
            <h2 className="headline-section mt-4">
              Proof, not promises
            </h2>
          </div>
          <Link
            to="/work"
            className="body-small link-underline"
          >
            View all projects
          </Link>
        </div>

        {/* Projects Gallery */}
        <PremiumGallery projects={projects} />
      </div>
    </section>
  );
}
