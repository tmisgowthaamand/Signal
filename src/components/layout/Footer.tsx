import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-section-primary">
      <div className="container-editorial section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-serif text-xl tracking-tight">
              SIGNAL
            </Link>
            <p className="body-small text-muted-foreground mt-4 max-w-xs">
              Strategy-led digital partner for considered brands.
            </p>
          </div>

          {/* Navigation - Ordered to mirror the intellectual journey */}
          <div>
            <h4 className="caption text-muted-foreground mb-4">Navigate</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/philosophy" className="body-small text-muted-foreground hover:text-foreground transition-colors duration-300">Philosophy</Link>
              <Link to="/work" className="body-small text-muted-foreground hover:text-foreground transition-colors duration-300">Work</Link>
              <Link to="/insights" className="body-small text-muted-foreground hover:text-foreground transition-colors duration-300">Insights</Link>
              <Link to="/proposal" className="body-small text-muted-foreground hover:text-foreground transition-colors duration-300">Get a Proposal</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="caption text-muted-foreground mb-4">Contact</h4>
            <a 
              href="mailto:hello@signal.agency" 
              className="body-small link-underline inline-block"
            >
              hello@signal.agency
            </a>
          </div>
        </div>

        <div className="divider mt-16 mb-8" />

        <div className="flex flex-col md:flex-row justify-between gap-4 text-muted-foreground">
          <p className="body-small">© {currentYear} SIGNAL. All rights reserved.</p>
          <p className="body-small">Strategy before scale.</p>
        </div>
      </div>
    </footer>
  );
}
