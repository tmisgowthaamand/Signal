import { useParams, Link, Navigate } from "react-router-dom";
import { getCaseStudy, getRelatedCaseStudies } from "@/data/caseStudies";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

const insightTitles: Record<string, string> = {
  "clarity-compounds": "Clarity Compounds",
  "restraint-as-strategy": "Restraint as Strategy",
  "design-systems-scale": "How Design Systems Scale Trust",
};

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudy = id ? getCaseStudy(id) : undefined;
  const relatedStudies = id ? getRelatedCaseStudies(id, 2) : [];

  if (!caseStudy) {
    return <Navigate to="/work" replace />;
  }

  const sections = [
    { key: "context", title: "Context", content: caseStudy.sections.context },
    { key: "strategicQuestion", title: "Strategic Question", content: caseStudy.sections.strategicQuestion },
    { key: "constraintsAndTradeoffs", title: "Constraints & Trade-offs", content: caseStudy.sections.constraintsAndTradeoffs },
    { key: "theSystem", title: "The System", content: caseStudy.sections.theSystem },
    { key: "outcome", title: "Outcome", content: caseStudy.sections.outcome },
    { key: "reflection", title: "Reflection", content: caseStudy.sections.reflection },
  ];

  return (
    <>
      {/* Header */}
      <section className="section-padding bg-section-primary relative overflow-hidden">
        <LiquidBackground variant="work" />
        <div className="container-editorial">
          <div className="max-w-3xl">
            <Link
              to="/work"
              className="caption text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              ← Work
            </Link>
            <h1 className="headline-hero mt-8 opacity-0 animate-fade-up">
              {caseStudy.client}
            </h1>
            <p className="body-large text-muted-foreground mt-6 opacity-0 animate-fade-up animate-delay-100">
              {caseStudy.description}
            </p>
            <span className="caption text-muted-foreground mt-8 block opacity-0 animate-fade-up animate-delay-200">
              {caseStudy.year}
            </span>
          </div>
        </div>
      </section>

      {/* Sections */}
      <article className="bg-section-secondary">
        {sections.map((section, index) => (
          <section
            key={section.key}
            className={`section-padding-sm ${index > 0 ? "border-t border-border" : ""}`}
          >
            <div className="container-editorial">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-3">
                  <h2 className="caption text-muted-foreground sticky top-24">
                    {section.title}
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="body-base text-foreground mb-6 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </article>

      {/* Related Thinking */}
      <section className="section-padding border-t border-border bg-section-primary">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <span className="caption text-muted-foreground">Related thinking</span>
            <nav className="mt-6 flex flex-col gap-4">
              {caseStudy.relatedInsights.map((insightId) => (
                <Link
                  key={insightId}
                  to={`/insights/${insightId}`}
                  className="body-base text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {insightTitles[insightId] || insightId}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Other Work */}
      {relatedStudies.length > 0 && (
        <section className="section-padding border-t border-border bg-section-muted">
          <div className="container-editorial">
            <span className="caption text-muted-foreground">Other work</span>
            <div className="mt-8 space-y-8">
              {relatedStudies.map((study) => (
                <Link
                  key={study.id}
                  to={`/work/${study.id}`}
                  className="block group"
                >
                  <h3 className="headline-card group-hover:text-muted-foreground transition-colors duration-300">
                    {study.client}
                  </h3>
                  <p className="body-small text-muted-foreground mt-2">
                    {study.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Soft CTA */}
      <section className="section-padding border-t border-border bg-section-primary">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <p className="body-base text-muted-foreground">
              If this approach to strategic work resonates, we may be a good fit.
            </p>
            <Link
              to="/proposal"
              className="body-base text-foreground hover:text-muted-foreground transition-colors duration-300 mt-4 inline-block"
            >
              Get a Proposal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudy;
