import { Link, useLocation } from "wouter";
import { Facebook, Linkedin, Instagram, Send, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">JECI GROUP</h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Empowering individuals and businesses to navigate complex financial landscapes and achieve sustainable growth.
            </p>
            <div className="space-y-2 pt-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-secondary shrink-0" />
                <span>80 M St SE, Washington, DC</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-secondary shrink-0" />
                <a href="tel:202-430-5058" className="hover:text-white transition-colors">202-430-5058</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-secondary shrink-0" />
                <a href="mailto:info@jecigroup.com" className="hover:text-white transition-colors">info@jecigroup.com</a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/')}>Home</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/about')}>About Us</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/explore')}>All Services</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/resources')}>Tools & Resources</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/blog')}>Blog & News</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/contact')}>Contact</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Services</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/accounting-services')}>Bookkeeping & Reporting</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/tax-services')}>Tax Services</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/services/llc-formation')}>Entity Formation</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/services/quickbooks-setup')}>QuickBooks Setup</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/credit-club-details')}>700 Credit Club</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation('/book-consultation')}>Book Consultation</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://facebook.com/jecigroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://linkedin.com/company/jecigroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com/jecigroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://x.com/jecigroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                <Send size={18} className="rotate-[315deg] translate-x-[1px] -translate-y-[1px]" />
              </a>
            </div>
            <p className="text-white/50 text-xs">
              &copy; {new Date().getFullYear()} The JECI Group. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer" onClick={() => setLocation('/privacy')}>Privacy Policy</span>
            <span className="hover:text-white cursor-pointer" onClick={() => setLocation('/terms')}>Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Cookie Policy</span>
          </div>
          <p>Designed with precision.</p>
        </div>
      </div>
    </footer>
  );
}
