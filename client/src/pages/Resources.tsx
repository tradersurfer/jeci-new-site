import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, ExternalLink, DollarSign, BarChart3, FileText, TrendingUp, 
  BookOpen, Calculator, ClipboardList, Building, FileCheck, Calendar,
  CreditCard, Rocket, Zap, GraduationCap, Users
} from 'lucide-react';

interface ResourceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  available?: boolean;
}

const financialTools: ResourceCard[] = [
  {
    icon: <Calculator className="text-green-600" size={28} />,
    title: "P&L Financial Model",
    description: "Build detailed 3-5 year financial projections with best-case, worst-case, and most-likely scenarios.",
    cta: "Open Tool",
    href: "/tools/financial-model"
  },
  {
    icon: <DollarSign className="text-green-600" size={28} />,
    title: "Cash Flow & Budget Planner",
    description: "Track your weekly income across multiple streams and visualize your earnings trends in real time.",
    cta: "Open Tool",
    href: "/tools/weekly-tracker"
  },
  {
    icon: <BarChart3 className="text-green-600" size={28} />,
    title: "Break-Even Calculator",
    description: "Determine exactly when your business will become profitable based on your costs and revenue.",
    cta: "Coming Soon",
    href: "#",
    available: false
  },
  {
    icon: <TrendingUp className="text-green-600" size={28} />,
    title: "Retirement Calculator",
    description: "Calculate your path to financial independence with compound growth projections and goal tracking.",
    cta: "Open Tool",
    href: "/tools/retirement-calculator"
  },
  {
    icon: <Rocket className="text-green-600" size={28} />,
    title: "Wealth Diversification Tool",
    description: "Analyze and optimize your portfolio across traditional assets, real estate, and alternative investments.",
    cta: "Open Tool",
    href: "/tools/wealth-diversification"
  },
  {
    icon: <FileText className="text-green-600" size={28} />,
    title: "Invoice Templates",
    description: "Professional invoice templates ready to customize for your business. Download and start billing today.",
    cta: "Coming Soon",
    href: "#",
    available: false
  },
];

const businessSetup: ResourceCard[] = [
  {
    icon: <Building className="text-blue-600" size={28} />,
    title: "LLC Formation Checklist",
    description: "Step-by-step guide to forming your LLC — from choosing a name to filing articles of organization.",
    cta: "Learn More",
    href: "/services/llc-formation"
  },
  {
    icon: <FileCheck className="text-blue-600" size={28} />,
    title: "EIN Application Guide",
    description: "How to apply for your Employer Identification Number (EIN) from the IRS — free and fast.",
    cta: "Learn More",
    href: "/services/ein-registration"
  },
  {
    icon: <ClipboardList className="text-blue-600" size={28} />,
    title: "Business License Lookup",
    description: "Find out which licenses and permits your business needs based on your state and industry.",
    cta: "Visit SBA.gov",
    href: "https://www.sba.gov/business-guide/launch-your-business/apply-licenses-permits",
    external: true
  },
  {
    icon: <FileText className="text-blue-600" size={28} />,
    title: "Operating Agreement Template",
    description: "Essential operating agreement outline for single-member and multi-member LLCs.",
    cta: "Coming Soon",
    href: "#",
    available: false
  },
];

const taxResources: ResourceCard[] = [
  {
    icon: <ClipboardList className="text-amber-600" size={28} />,
    title: "Crypto Tax Health Checklist",
    description: "Interactive 24-item checklist covering exchanges, wallets, DeFi, NFTs, and more. Auto-saves your progress.",
    cta: "Access Tool",
    href: "/crypto-tax-checklist"
  },
  {
    icon: <FileCheck className="text-amber-600" size={28} />,
    title: "Small Business Tax Deduction Checklist",
    description: "Comprehensive list of deductions most small business owners miss — from home office to vehicle expenses.",
    cta: "Coming Soon",
    href: "#",
    available: false
  },
  {
    icon: <Calculator className="text-amber-600" size={28} />,
    title: "Quarterly Estimated Tax Calculator",
    description: "Calculate your quarterly estimated tax payments to avoid penalties and stay IRS-compliant.",
    cta: "Coming Soon",
    href: "#",
    available: false
  },
  {
    icon: <Calendar className="text-amber-600" size={28} />,
    title: "IRS Deadlines Calendar 2026",
    description: "Key federal tax deadlines for individuals and businesses — never miss a filing date again.",
    cta: "Coming Soon",
    href: "#",
    available: false
  },
];

const growthOps: ResourceCard[] = [
  {
    icon: <CreditCard className="text-purple-600" size={28} />,
    title: "Business Credit Building Guide",
    description: "Learn how to build business credit from scratch and unlock funding opportunities for growth.",
    cta: "Learn More",
    href: "/credit-club-details"
  },
  {
    icon: <DollarSign className="text-purple-600" size={28} />,
    title: "Funding & Grant Resources",
    description: "Curated list of grants, SBA loans, and alternative funding sources for small business owners.",
    cta: "Coming Soon",
    href: "#",
    available: false
  },
  {
    icon: <BarChart3 className="text-purple-600" size={28} />,
    title: "QuickBooks Tips & Tutorials",
    description: "Step-by-step guides to set up, customize, and master QuickBooks for your business.",
    cta: "Learn More",
    href: "/services/quickbooks-setup"
  },
  {
    icon: <Zap className="text-purple-600" size={28} />,
    title: "Time-Saving Automation Tools",
    description: "Recommended tools like Zapier, Notion, and Calendly to automate your business operations.",
    cta: "Visit Zapier",
    href: "https://zapier.com",
    external: true
  },
];

const learningTraining: ResourceCard[] = [
  {
    icon: <GraduationCap className="text-rose-600" size={28} />,
    title: "JECI Online Courses",
    description: "Self-paced courses on bookkeeping, tax strategy, and business growth fundamentals.",
    cta: "Coming Soon",
    href: "#",
    available: false
  },
  {
    icon: <Users className="text-rose-600" size={28} />,
    title: "700 Credit Club Experts (Skool)",
    description: "Join our community of entrepreneurs building wealth through credit repair and financial strategy.",
    cta: "Join Community",
    href: "https://www.skool.com/700-credit-club-experts-7830",
    external: true
  },
  {
    icon: <Rocket className="text-rose-600" size={28} />,
    title: "Free Business Consultation",
    description: "Book a complimentary 30-minute session to discuss your business challenges and goals.",
    cta: "Book Now",
    href: "/services/business-strategy-session"
  },
  {
    icon: <BookOpen className="text-rose-600" size={28} />,
    title: "Blog & News",
    description: "Business intelligence, tax tips, and industry insights from the JECI Group team.",
    cta: "Read Blog",
    href: "/blog"
  },
];

interface CategorySection {
  emoji: string;
  title: string;
  description: string;
  items: ResourceCard[];
  colorAccent: string;
}

const categories: CategorySection[] = [
  { emoji: "💰", title: "Financial Tools", description: "Calculators and planners to take control of your money", items: financialTools, colorAccent: "border-green-500" },
  { emoji: "📊", title: "Business Setup & Compliance", description: "Everything you need to form and register your business", items: businessSetup, colorAccent: "border-blue-500" },
  { emoji: "📁", title: "Tax Resources", description: "Checklists, calculators, and calendars for tax season", items: taxResources, colorAccent: "border-amber-500" },
  { emoji: "📈", title: "Growth & Operations", description: "Build credit, find funding, and automate your business", items: growthOps, colorAccent: "border-purple-500" },
  { emoji: "📚", title: "Learning & Training", description: "Courses, community, and free consultations", items: learningTraining, colorAccent: "border-rose-500" },
];

function ResourceCardComponent({ card }: { card: ResourceCard }) {
  const [, setLocation] = useLocation();
  const isAvailable = card.available !== false;

  const handleClick = () => {
    if (!isAvailable) return;
    if (card.external) {
      window.open(card.href, '_blank');
    } else {
      setLocation(card.href);
    }
  };

  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-6 flex flex-col transition-all",
        isAvailable ? "hover:shadow-lg hover:border-slate-300 cursor-pointer" : "opacity-70"
      )}
      onClick={handleClick}
      data-testid={`resource-card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
        {card.icon}
      </div>
      <h3 className="font-bold text-slate-900 text-base mb-2">{card.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{card.description}</p>
      <Button
        variant={isAvailable ? "default" : "outline"}
        size="sm"
        className={cn(
          "w-full font-bold text-xs uppercase tracking-wider",
          isAvailable
            ? "bg-primary text-white hover:bg-secondary hover:text-primary"
            : "border-slate-200 text-slate-400 cursor-not-allowed"
        )}
        disabled={!isAvailable}
        onClick={(e) => { e.stopPropagation(); handleClick(); }}
      >
        {card.cta}
        {isAvailable && !card.external && <ArrowRight className="ml-2 w-3 h-3" />}
        {isAvailable && card.external && <ExternalLink className="ml-2 w-3 h-3" />}
      </Button>
    </div>
  );
}

export default function ToolsAndResources() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <section className="pt-28 pb-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-white/3 skew-x-12 transform -translate-x-1/2" />
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-secondary/50 rounded-full bg-secondary/10 text-secondary font-bold tracking-wider text-xs uppercase">
            Tools & Resources Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-resources-title">
            Everything You Need to Run a<br />
            <span className="text-secondary italic">Smarter Business</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Free tools, checklists, calculators, and resources designed to solve the biggest pain points for entrepreneurs and small business owners.
          </p>
        </div>
      </section>

      {categories.map((category, catIndex) => (
        <section
          key={catIndex}
          className={catIndex % 2 === 0 ? "py-16 bg-white" : "py-16 bg-slate-50"}
        >
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl">{category.emoji}</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">{category.title}</h2>
            </div>
            <p className="text-slate-500 mb-8 ml-[52px]">{category.description}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((card, i) => (
                <ResourceCardComponent key={i} card={card} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-gradient-to-br from-primary to-slate-800 text-white">
        <div className="container px-4 md:px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">Need Personalized Help?</h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Our team of experts is ready to help you with bookkeeping, taxes, entity formation, and more. Book a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setLocation('/book-consultation')}
              className="bg-secondary text-primary hover:bg-white hover:text-primary font-bold h-14 px-8 text-lg rounded-full"
            >
              Book Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/explore')}
              className="border-white text-white hover:bg-white/10 font-bold h-14 px-8 text-lg rounded-full"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
        <div className="container px-4 md:px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-3">Get Weekly Tips & Resources</h2>
          <p className="text-white/80 mb-6">
            Subscribe to JECI Edge Weekly for tax strategies, bookkeeping tips, and business growth insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setLocation('/newsletter')}
              className="bg-white text-[#667eea] hover:bg-white/90 font-bold h-12 px-8"
            >
              Newsletter Archive
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('https://adrianjordanio.substack.com', '_blank')}
              className="border-white text-white hover:bg-white/10 font-bold h-12 px-8"
            >
              Subscribe Free <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
