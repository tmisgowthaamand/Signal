import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="section-padding bg-section-dark text-primary-foreground">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="headline-section">
            Ready to build deliberately?
          </h2>
          <p className="body-large mt-6 opacity-70 max-w-xl mx-auto">
            We work with a select number of clients each quarter. If you're considering a strategic partner, let's talk.
          </p>
          <div className="mt-12">
            <Link
              to="/proposal"
              className="inline-block body-small border border-background px-10 py-4 hover:bg-background hover:text-foreground transition-all duration-300"
            >
              Get a Proposal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
