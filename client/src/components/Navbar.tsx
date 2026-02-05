import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/explore" },
    { name: "Accounting", href: "/#accounting-services" },
    { name: "Credit Club", href: "/credit-club-details" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pillar-2" }, // Linking pricing to Services/Engine as per request
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary text-white font-serif font-bold text-xl w-10 h-10 flex items-center justify-center rounded-sm group-hover:bg-secondary group-hover:text-primary transition-colors">
              J
            </div>
            <span
              className={cn(
                "font-serif font-bold text-xl tracking-wide",
                scrolled ? "text-primary" : "text-white"
              )}
            >
              JECI GROUP
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a className={cn(
                "text-sm font-medium tracking-wide hover:text-secondary transition-colors uppercase cursor-pointer",
                scrolled ? "text-primary" : "text-white/90"
              )}>
                {link.name}
              </a>
            </Link>
          ))}
          <Button
            onClick={() => setLocation('/book-consultation')}
            className="bg-secondary text-primary hover:bg-white hover:text-primary font-bold rounded-sm"
          >
            Book Consultation
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={scrolled ? "text-primary" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-primary" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b md:hidden shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a 
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium text-primary hover:text-secondary cursor-pointer"
                >
                  {link.name}
                </a>
              </Link>
            ))}
            <Button
              onClick={() => {
                setLocation('/book-consultation');
                setIsOpen(false);
              }}
              className="w-full bg-primary text-white"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
