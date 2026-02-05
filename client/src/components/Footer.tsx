import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">JECI GROUP</h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Empowering individuals and businesses to navigate complex financial landscapes and achieve sustainable growth.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/"><a className="hover:text-white transition-colors">Home</a></Link></li>
              <li><Link href="/about"><a className="hover:text-white transition-colors">About Us</a></Link></li>
              <li><Link href="/explore"><a className="hover:text-white transition-colors">Services</a></Link></li>
              <li><Link href="/pillar-2"><a className="hover:text-white transition-colors">Pricing Plans</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-white transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-secondary">Services</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/accounting/entity-core"><a className="hover:text-white transition-colors">Entity & Core Accounting</a></Link></li>
              <li><Link href="/accounting/indirect-tax"><a className="hover:text-white transition-colors">Indirect & Transaction Taxes</a></Link></li>
              <li><Link href="/accounting/salt"><a className="hover:text-white transition-colors">State & Local (SALT)</a></Link></li>
              <li><Link href="/accounting/compliance-payroll"><a className="hover:text-white transition-colors">Compliance & Payroll</a></Link></li>
              <li><Link href="/accounting/specialty-crypto"><a className="hover:text-white transition-colors">Specialty & Crypto</a></Link></li>
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
              © {new Date().getFullYear()} The JECI Group. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <div className="flex gap-6">
            <Link href="/privacy"><a className="hover:text-white">Privacy Policy</a></Link>
            <Link href="/terms"><a className="hover:text-white">Terms of Service</a></Link>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
          <p>Designed with precision.</p>
        </div>
      </div>
    </footer>
  );
}
