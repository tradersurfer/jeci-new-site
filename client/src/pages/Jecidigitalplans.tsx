import { useState } from "react";
import SubpageNav from "@/components/SubpageNav";

const CheckIcon = () => (
  <svg
    className="w-4 h-4 mt-0.5 shrink-0 text-yellow-400"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  tagline: string;
  setupFee: number;
  monthlyFee: number;
  yearlyFee: number;
  features: PlanFeature[];
  highlighted?: boolean;
  hostingLabel?: string;
  // ─── Stripe Payment Links ───────────────────────────────────────────────────
  // Replace each placeholder with your real Stripe Payment Link URL.
  // Create links at: https://dashboard.stripe.com/payment-links
  stripeSetupUrl: string;       // one-time setup fee link
  stripeMonthlyUrl: string;     // recurring monthly hosting link
  stripeYearlyUrl: string;      // recurring yearly hosting link
  // ──────────────────────────────────────────────────────────────────────────
}

const plans: Plan[] = [
  {
    name: "Essential",
    tagline: "For small businesses needing a professional website with AI support.",
    setupFee: 999,
    monthlyFee: 39,
    yearlyFee: 399,
    // ─── STRIPE: Essential Plan ───────────────────────────────────────────────
    stripeSetupUrl:   "https://buy.stripe.com/REPLACE_ESSENTIAL_SETUP",
    stripeMonthlyUrl: "https://buy.stripe.com/REPLACE_ESSENTIAL_MONTHLY",
    stripeYearlyUrl:  "https://buy.stripe.com/REPLACE_ESSENTIAL_YEARLY",
    // ─────────────────────────────────────────────────────────────────────────
    features: [
      { text: "Custom landing page + 4 additional pages" },
      { text: "Fully responsive & mobile-optimized" },
      { text: "Design customization" },
      { text: "SEO-ready structure" },
      { text: "Forms (leads, newsletter, inquiries)" },
      { text: "Updates & maintenance" },
      { text: "Alerts, announcements, and company directory updates" },
    ],
  },
  {
    name: "Business Pro E-Commerce",
    tagline: "Ideal for growing businesses ready to scale.",
    setupFee: 1599,
    monthlyFee: 99,
    yearlyFee: 990,
    highlighted: true,
    // ─── STRIPE: Business Pro Plan ────────────────────────────────────────────
    stripeSetupUrl:   "https://buy.stripe.com/REPLACE_BIZPRO_SETUP",
    stripeMonthlyUrl: "https://buy.stripe.com/REPLACE_BIZPRO_MONTHLY",
    stripeYearlyUrl:  "https://buy.stripe.com/REPLACE_BIZPRO_YEARLY",
    // ─────────────────────────────────────────────────────────────────────────
    features: [
      { text: "Full e-commerce site & ManagementApp" },
      { text: "Custom landing page + 5 additional pages" },
      { text: "Product setup (up to 99 variants/product)" },
      { text: "Promo banners, sales, and pricing updates" },
      { text: "Hours, schedules, team, contact updates" },
      { text: "SEO enhancements & page optimization" },
      { text: "Abandoned cart recovery" },
      { text: "Monthly updates + bug fixes + backups" },
    ],
  },
  {
    name: "Enterprise E-Commerce",
    tagline: "For serious businesses needing full automation and AI operations.",
    setupFee: 1999,
    monthlyFee: 139,
    yearlyFee: 1390,
    // ─── STRIPE: Enterprise Plan ──────────────────────────────────────────────
    stripeSetupUrl:   "https://buy.stripe.com/REPLACE_ENTERPRISE_SETUP",
    stripeMonthlyUrl: "https://buy.stripe.com/REPLACE_ENTERPRISE_MONTHLY",
    stripeYearlyUrl:  "https://buy.stripe.com/REPLACE_ENTERPRISE_YEARLY",
    // ─────────────────────────────────────────────────────────────────────────
    features: [
      { text: "Full e-commerce site & ManagementApp" },
      { text: "7–10 page custom website (any style)" },
      { text: "Advanced e-commerce system" },
      { text: "Unlimited products & variants" },
      { text: "Product import/export & inventory mgmt" },
      { text: "Tax & shipping automation" },
      { text: "Marketplace & social store integration" },
      { text: "Abandoned cart recovery" },
      { text: "SEO enhancements & page optimization" },
      { text: "Onboarding & training included" },
    ],
  },
];

const maintenanceItems = [
  "Web/App cloud hosting",
  "Updating company directories and staff profiles",
  "Adding promotions to the website",
  "Updating hours, schedules, and contact info",
  "Changing an address or contact information",
  "Performing website updates and backups",
  "Fixing bugs or errors on your website",
  "Performing offsite local backups",
  "Reviewing link structure and sitemap",
  "Analyzing website for broken links",
];

export default function JeciDigitalPlans() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div
      className="min-h-screen bg-black text-white antialiased pb-20"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <SubpageNav />

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        .gold-gradient {
          background: linear-gradient(135deg, #facc15 0%, #eab308 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gold-bg {
          background: linear-gradient(135deg, #facc15 0%, #eab308 100%);
        }

        .card-shadow {
          box-shadow: 0 10px 30px -10px rgba(250, 204, 21, 0.2);
        }

        .toggle-slider {
          transition: transform 0.3s ease-in-out;
        }

        .maintenance-box {
          border: 1px solid rgba(250, 204, 21, 0.3);
          background: rgba(250, 204, 21, 0.05);
        }
      `}</style>

      {/* Header — pt-20 clears the fixed SubpageNav */}
      <header className="pt-24 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 uppercase tracking-tight">
          CHOOSE THE <span className="gold-gradient">PLAN</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Affordable website &amp; AI plans to power your business growth.
        </p>
      </header>

      {/* Pricing Toggle */}
      <div className="flex justify-center items-center gap-4 mb-12">
        <span className="text-sm font-semibold text-gray-300">Monthly</span>
        <button
          role="switch"
          aria-checked={isYearly}
          onClick={() => setIsYearly((prev) => !prev)}
          className="relative inline-flex items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-full"
        >
          <div
            className={`w-14 h-7 rounded-full transition-colors duration-300 ${
              isYearly ? "bg-yellow-500" : "bg-gray-800"
            }`}
          />
          <div
            className={`toggle-slider absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-sm ${
              isYearly ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm font-semibold text-gray-300">Yearly</span>
      </div>

      {/* Plans Grid */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white text-black rounded-3xl p-8 flex flex-col relative overflow-hidden card-shadow ${
              plan.highlighted
                ? "border-4 border-yellow-400 md:-translate-y-4"
                : ""
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-0 gold-bg text-black px-4 py-1 font-bold text-xs rounded-bl-xl uppercase tracking-widest">
                Top Pick
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-extrabold uppercase">{plan.name}</h3>
              <p className="text-gray-600 text-sm mt-1 leading-tight">
                {plan.tagline}
              </p>
            </div>

            <ul className="space-y-3 mb-8 text-sm flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex gap-3">
                  <CheckIcon />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-gray-100 pt-6">
              <div className="text-3xl font-black">
                ${plan.setupFee.toLocaleString()}
                <span className="text-base font-normal text-gray-500">
                  /one-time
                </span>
              </div>
              <div
                className={`rounded-full py-2 px-4 mt-3 text-center ${
                  plan.highlighted ? "gold-bg" : "bg-gray-100"
                }`}
              >
                <span className="text-sm font-bold">
                  {isYearly
                    ? `$${plan.yearlyFee.toLocaleString()}/yr Hosting`
                    : `$${plan.monthlyFee}/mo Hosting`}
                </span>
              </div>
              {!plan.highlighted && (
                <p className="text-[10px] text-gray-400 text-center mt-2">
                  *Yearly option available
                </p>
              )}

              {/* ── Stripe CTA Buttons ─────────────────────────────────────────
                  Replace the href values in the plans[] array above with your
                  real Stripe Payment Links from dashboard.stripe.com/payment-links
                  Setup fee → one-time payment link
                  Hosting   → recurring subscription link (monthly or yearly)
              ──────────────────────────────────────────────────────────────── */}
              <a
                href={plan.stripeSetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 block w-full text-center py-3 px-6 rounded-full font-black uppercase text-sm tracking-wide transition-colors ${
                  plan.highlighted
                    ? "gold-bg text-black hover:opacity-90"
                    : "bg-black text-white hover:bg-yellow-400 hover:text-black"
                }`}
              >
                Get Started — ${plan.setupFee.toLocaleString()}
              </a>
              <a
                href={isYearly ? plan.stripeYearlyUrl : plan.stripeMonthlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-full text-center py-2 px-6 rounded-full font-semibold text-xs uppercase tracking-wide border border-gray-200 text-gray-500 hover:border-yellow-400 hover:text-yellow-500 transition-colors"
              >
                + Add Hosting ({isYearly ? `$${plan.yearlyFee.toLocaleString()}/yr` : `$${plan.monthlyFee}/mo`})
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* Maintenance Packages */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="maintenance-box rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative background icon */}
          <div className="absolute -bottom-10 -right-10 opacity-10 text-yellow-400 text-[200px] leading-none select-none pointer-events-none">
            ⛨
          </div>

          <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-yellow-400 text-2xl">★</span>
            Website Hosting and Maintenance Packages Include:
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm text-gray-300">
            {maintenanceItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
          {["Cancel anytime", "24/7 customer support"].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm text-yellow-400"
            >
              <CheckIcon />
              {label}
            </div>
          ))}
        </div>

        <a
          href="https://jecigroup.com"
          className="inline-flex items-center gap-4 bg-white text-black font-black uppercase py-4 px-10 rounded-full hover:bg-yellow-400 transition-colors group"
        >
          JECI DIGITAL
          <div className="w-8 h-8 gold-bg rounded-full flex items-center justify-center text-black group-hover:bg-black group-hover:text-yellow-400 transition-colors">
            <ArrowIcon />
          </div>
        </a>

        <div className="mt-12 flex justify-center opacity-50">
          <div className="w-12 h-12 gold-bg rounded-full flex items-center justify-center">
            <span className="text-black font-black text-xl">J</span>
          </div>
        </div>
      </footer>
    </div>
  );
}