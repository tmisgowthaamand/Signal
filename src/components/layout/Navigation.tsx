import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

const navLinks = [
  { name: "Philosophy", href: "/philosophy" },
  { name: "Work", href: "/work" },
  { name: "Insights", href: "/insights" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
      ? 'bg-background/95 backdrop-blur-xl border-b border-foreground/[0.05] py-2'
      : 'bg-background/90 backdrop-blur-lg py-4'
      }`}>
      <nav className="container-editorial">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl md:text-3xl font-bold tracking-tighter text-foreground hover:opacity-70 transition-all duration-300"
            aria-label="Home"
          >
            SIGNAL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`group relative py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-500 ${location.pathname === link.href
                  ? 'text-foreground'
                  : 'text-foreground/85 hover:text-foreground'
                  }`}
                aria-current={location.pathname === link.href ? 'page' : undefined}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-700 group-hover:w-full" />
              </Link>
            ))}
            <div className="hidden lg:block border-l border-foreground/[0.1] pl-10 lg:pl-14">
              <ThemeSwitcher className="w-10 h-10 rounded-full border border-foreground/[0.1] hover:bg-foreground/[0.05]" />
            </div>
            <Link
              to="/proposal"
              className="luxury-button !px-10 !py-3.5 bg-foreground text-background hover:bg-foreground/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <span className="text-[11px] font-black tracking-widest uppercase">Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 text-foreground hover:opacity-70 transition-all"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-96 border-t border-foreground/10' : 'max-h-0'
          }`}>
          <div className="py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-4 px-1 text-2xl font-serif italic transition-all ${location.pathname === link.href
                  ? 'text-foreground translate-x-2'
                  : 'text-foreground/60 hover:text-foreground hover:translate-x-2'
                  }`}
                aria-current={location.pathname === link.href ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/proposal"
              onClick={() => setIsOpen(false)}
              className="mt-6 py-5 px-6 bg-foreground text-background text-center font-bold tracking-widest uppercase text-xs"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
