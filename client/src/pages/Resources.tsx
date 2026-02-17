import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, CheckCircle, BarChart3, Search, ExternalLink } from 'lucide-react';

const resources = [
  {
    icon: "🪙",
    title: "Interactive Crypto Tax Checklist",
    description: "Track your crypto tax documentation with our interactive checklist. Auto-saves your progress and covers all 7 key categories with 24 essential items.",
    badges: ["Interactive", "24 Items", "Auto-Save"],
    href: "/crypto-tax-checklist",
    available: true
  },
  {
    icon: "💰",
    title: "Profit Leak Detector Worksheet",
    description: "Identify hidden profit leaks in your bookkeeping with our simple diagnostic worksheet.",
    badges: ["Worksheet"],
    href: "#",
    available: false
  },
  {
    icon: "⚙️",
    title: "Operations Quick Audit",
    description: "10 questions to audit your business operations and find efficiency gains immediately.",
    badges: ["Self-Assessment"],
    href: "#",
    available: false
  }
];

const calculators = [
  {
    icon: "📊",
    title: "P&L Financial Model",
    description: "Project your business revenue, expenses, and profit with our interactive financial model.",
    href: "/tools/financial-model"
  },
  {
    icon: "🏦",
    title: "Retirement Calculator",
    description: "Plan your retirement savings with compound growth projections and goal tracking.",
    href: "/tools/retirement-calculator"
  },
  {
    icon: "📈",
    title: "Weekly Income Tracker",
    description: "Track your weekly income across multiple streams and visualize your earnings trends.",
    href: "/tools/weekly-tracker"
  },
  {
    icon: "🌐",
    title: "Wealth Diversification Tool",
    description: "Analyze and optimize your investment portfolio across traditional and alternative assets.",
    href: "/tools/wealth-diversification"
  }
];

export default function Resources() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="pt-32 pb-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-resources-title">Free Resources & Tools</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Professional tools and guides to help you stay organized, tax-ready, and financially informed.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">Free Downloads & Checklists</h2>
            <p className="text-lg text-slate-500">Practical tools to organize your finances before working with us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, i) => (
              <Card key={i} className={`flex flex-col border-slate-200 ${i === 0 ? 'ring-2 ring-secondary shadow-lg relative' : ''}`}>
                {i === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-primary text-xs font-bold px-4 py-1 rounded-full">
                    FEATURED
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">{resource.icon}</div>
                  <CardTitle className="text-lg font-bold text-slate-900">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.badges.map((badge, j) => (
                      <span key={j} className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    {resource.available ? (
                      <Button
                        onClick={() => setLocation(resource.href)}
                        className="w-full bg-primary text-white hover:bg-secondary hover:text-primary font-bold"
                        data-testid={`button-resource-${i}`}
                      >
                        Access Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" disabled className="w-full font-bold">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">Financial Calculators</h2>
            <p className="text-lg text-slate-500">Interactive tools from the MoneyVibes Hub to help you plan and track your finances</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {calculators.map((calc, i) => (
              <Card
                key={i}
                className="flex flex-col cursor-pointer hover:shadow-lg transition-all border-slate-200 group"
                onClick={() => setLocation(calc.href)}
                data-testid={`card-calculator-${i}`}
              >
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <div className="text-4xl mb-4">{calc.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{calc.title}</h3>
                  <p className="text-sm text-slate-500 flex-1">{calc.description}</p>
                  <div className="mt-4 text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Open Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="container px-4 md:px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">Get Weekly Tips & Resources</h2>
          <p className="text-lg text-white/80 mb-8">
            Subscribe to JECI Edge Weekly for tax strategies, bookkeeping tips, and business growth insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setLocation('/newsletter')}
              className="bg-white text-[#667eea] hover:bg-white/90 font-bold h-14 px-8 text-lg"
            >
              View Newsletter Archive
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('https://adrianjordanio.substack.com', '_blank')}
              className="border-white text-white hover:bg-white/10 font-bold h-14 px-8 text-lg"
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
