import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DropdownItem {
  name: string;
  href: string;
  external?: boolean;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

const dropdowns: NavDropdown[] = [
  {
    label: "Services",
    items: [
      { name: "Bookkeeping & Financial Reporting", href: "/accounting-services" },
      { name: "Tax Services", href: "/tax-services" },
      { name: "Entity Formation", href: "/services/llc-formation" },
      { name: "QuickBooks Setup", href: "/services/quickbooks-setup" },
      { name: "Real Estate Tax Planning", href: "/services/real-estate-tax-planning" },
      { name: "Free Business Consultation", href: "/services/business-strategy-session" },
      { name: "All Services", href: "/explore" },
    ]
  },
  {
    label: "Tools & Resources",
    items: [
      { name: "All Tools & Resources", href: "/resources" },
      { name: "P&L Financial Model", href: "/tools/financial-model" },
      { name: "Retirement Calculator", href: "/tools/retirement-calculator" },
      { name: "Weekly Income Tracker", href: "/tools/weekly-tracker" },
      { name: "Wealth Diversification", href: "/tools/wealth-diversification" },
      { name: "Crypto Tax Checklist", href: "/crypto-tax-checklist" },
      { name: "Blog & News", href: "/blog" },
    ]
  },
  {
    label: "Community",
    items: [
      { name: "700 Credit Club", href: "/credit-club-details" },
      { name: "700 Credit Club Experts (Skool)", href: "https://www.skool.com/700-credit-club-experts-7830", external: true },
      { name: "JECI Edge Newsletter", href: "/newsletter" },
    ]
  },
  {
    label: "About",
    items: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ]
  }
];

function DesktopDropdown({ dropdown, scrolled }: { dropdown: NavDropdown; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, setLocation] = useLocation();

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-semibold tracking-wide hover:text-secondary transition-colors uppercase cursor-pointer py-2",
          scrolled ? "text-slate-700" : "text-white/90"
        )}
        onClick={() => setOpen(!open)}
        data-testid={`nav-dropdown-${dropdown.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {dropdown.label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 z-50" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-2 min-w-[260px]">
            {dropdown.items.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                  <ExternalLink size={12} className="text-slate-400" />
                </a>
              ) : (
                <button
                  key={item.name}
                  className="w-full text-left flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  onClick={() => { setLocation(item.href); setOpen(false); }}
                >
                  {item.name}
                  <ChevronRight size={12} className="text-slate-400" />
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({ dropdown, onNavigate }: { dropdown: NavDropdown; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-3.5 text-base font-bold text-primary"
        onClick={() => setOpen(!open)}
      >
        {dropdown.label}
        <ChevronDown size={18} className={cn("transition-transform text-slate-400", open && "rotate-180")} />
      </button>

      {open && (
        <div className="pb-3 pl-4 space-y-1">
          {dropdown.items.map((item) => (
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-sm text-slate-600 hover:text-primary transition-colors"
                onClick={onNavigate}
              >
                {item.name}
                <ExternalLink size={11} className="text-slate-400" />
              </a>
            ) : (
              <button
                key={item.name}
                className="w-full text-left py-2 text-sm text-slate-600 hover:text-primary transition-colors"
                onClick={() => { setLocation(item.href); onNavigate(); }}
              >
                {item.name}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMobile = () => setIsOpen(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-primary/90 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-[72px]">
          <Link href="/">
            <div className="flex items-center gap-2.5 group cursor-pointer shrink-0" data-testid="nav-logo">
              <div className="bg-secondary text-primary font-serif font-bold text-lg w-9 h-9 flex items-center justify-center rounded group-hover:scale-105 transition-transform">
                J
              </div>
              <div className="flex flex-col leading-none">
                <span className={cn(
                  "font-serif font-bold text-lg tracking-wide",
                  scrolled ? "text-primary" : "text-white"
                )}>
                  JECI GROUP
                </span>
                <span className={cn(
                  "text-[9px] font-semibold tracking-[0.2em] uppercase",
                  scrolled ? "text-slate-400" : "text-white/50"
                )}>
                  Consulting & Financial Services
                </span>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            {dropdowns.map((dd) => (
              <DesktopDropdown key={dd.label} dropdown={dd} scrolled={scrolled} />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation('/book-consultation')}
              className={cn(
                "font-bold rounded-full px-5 h-9 text-xs uppercase tracking-wider border-2",
                scrolled
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-primary"
              )}
              data-testid="nav-book-call"
            >
              Book a Call
            </Button>
          </div>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="nav-mobile-toggle"
          >
            {isOpen ? (
              <X className={scrolled ? "text-primary" : "text-white"} size={24} />
            ) : (
              <Menu className={scrolled ? "text-primary" : "text-white"} size={24} />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <>
          <div className="fixed inset-0 top-16 bg-black/30 z-[60] lg:hidden" onClick={closeMobile} />
          <div
            className="fixed top-16 right-0 bottom-0 w-full max-w-sm z-[70] lg:hidden shadow-2xl overflow-y-auto"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="p-5 flex flex-col h-full">
              <div className="flex-1 space-y-0">
                {dropdowns.map((dd) => (
                  <MobileAccordion key={dd.label} dropdown={dd} onNavigate={closeMobile} />
                ))}
              </div>

              <div className="mt-6 space-y-3 pt-6 border-t border-slate-100">
                <Button
                  variant="outline"
                  onClick={() => { setLocation('/book-consultation'); closeMobile(); }}
                  className="w-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full h-11"
                  data-testid="nav-mobile-book"
                >
                  Book a Call
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 pb-8">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="text-secondary shrink-0" />
                  <span>80 M St SE, Washington, DC</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} className="text-secondary shrink-0" />
                  <a href="tel:202-430-5058" className="hover:text-primary transition-colors">202-430-5058</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="text-secondary shrink-0" />
                  <a href="mailto:info@jecigroup.com" className="hover:text-primary transition-colors">info@jecigroup.com</a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
