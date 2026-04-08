import { useState } from "react";
import SubpageNav from "@/components/SubpageNav";

// ─── SVG Icons ──────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg className="w-4 h-4 mt-0.5 shrink-0 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────────

interface PlanFeature {
  text: string;
  included?: boolean;
}

interface Plan {
  name: string;
  tagline: string;
  monthlyPrice: number;
  firstMonthPrice: number; // monthlyPrice x2 — covers onboarding
  features: PlanFeature[];
  highlighted?: boolean;
  // ─── Stripe Payment Links ─────────────────────────────────────────────────
  // Replace each REPLACE_* value with your real Stripe Payment Link URL.
  // Create at: https://dashboard.stripe.com/payment-links
  stripeFirstMonthUrl: string;  // one-time · first month + onboarding
  stripeRecurringUrl: string;   // subscription · month 2+ recurring
  // ─────────────────────────────────────────────────────────────────────────
}

interface AddOn {
  name: string;
  description: string;
  price: number;
  // ─── Stripe Payment Links ─────────────────────────────────────────────────
  stripeUrl: string; // one-time payment link for this add-on
  // ─────────────────────────────────────────────────────────────────────────
}

// ─── Plan Data ───────────────────────────────────────────────────────────────

const plans: Plan[] = [
  {
    name: "Starter Plan",
    tagline: "Establish your digital footprint with essential local search optimization.",
    monthlyPrice: 600,
    firstMonthPrice: 1200, // month 1 = setup + month 1 service
    // ─── STRIPE: Starter Plan ─────────────────────────────────────────────
    stripeFirstMonthUrl:  "https://buy.stripe.com/REPLACE_STARTER_FIRST_MONTH",
    stripeRecurringUrl:   "https://buy.stripe.com/REPLACE_STARTER_RECURRING",
    // ──────────────────────────────────────────────────────────────────────
    features: [
      { text: "Google Business Profile — full optimization" },
      { text: "Apple Maps — premium listing setup" },
      { text: "Yelp Business Profile — optimized for local traffic" },
      { text: "Bing Listing — expanded search reach" },
      { text: "Niche Directory Listings — industry citations" },
      { text: "Monthly maintenance & updates" },
    ],
  },
  {
    name: "Full Package",
    tagline: "The complete digital growth system built for long-term dominance.",
    monthlyPrice: 699,
    firstMonthPrice: 1398, // month 1 = setup + month 1 service
    highlighted: true,
    // ─── STRIPE: Full Package ─────────────────────────────────────────────
    stripeFirstMonthUrl:  "https://buy.stripe.com/REPLACE_FULL_FIRST_MONTH",
    stripeRecurringUrl:   "https://buy.stripe.com/REPLACE_FULL_RECURRING",
    // ──────────────────────────────────────────────────────────────────────
    features: [
      { text: "Everything in Starter Plan" },
      { text: "Multi-location support — up to 5 Apple Maps locations" },
      { text: "Custom website build — Shopify, Wix, or WordPress" },
      { text: "Full website speed & technical SEO optimization" },
      { text: "10–15 exact local keywords — high-intent targeting" },
      { text: "Google Search Console & Microsoft Clarity setup" },
      { text: "30 niche blog posts per month — local SEO focused" },
      { text: "Weekly SEO work reports" },
      { text: "Direct call & WhatsApp support" },
    ],
  },
];

// ─── Add-On Data ─────────────────────────────────────────────────────────────
// Priced for the DC metro market (2026).
// DC commands 10–30% above national average for digital marketing services.

const addOns: AddOn[] = [
  {
    name: "Social Media Profile Setup",
    description: "New profile creation or full optimization revamp — up to 3 platforms (Instagram, Facebook, X/Twitter, LinkedIn, TikTok, etc.).",
    price: 349,
    // ─── STRIPE ────────────────────────────────────────────────────────────
    stripeUrl: "https://buy.stripe.com/REPLACE_ADDON_SOCIAL_MEDIA",
    // ───────────────────────────────────────────────────────────────────────
  },
  {
    name: "Business Identity Setup",
    description: "Domain registration, business email configuration (Google Workspace / Microsoft 365), and business phone setup.",
    price: 249,
    // ─── STRIPE ────────────────────────────────────────────────────────────
    stripeUrl: "https://buy.stripe.com/REPLACE_ADDON_BUSINESS_IDENTITY",
    // ───────────────────────────────────────────────────────────────────────
  },
  {
    name: "NAP Sync",
    description: "Full audit and correction of Name, Address & Phone data across all major platforms and directories for local consistency.",
    price: 199,
    // ─── STRIPE ────────────────────────────────────────────────────────────
    stripeUrl: "https://buy.stripe.com/REPLACE_ADDON_NAP_SYNC",
    // ───────────────────────────────────────────────────────────────────────
  },
  {
    name: "Custom Website Build",
    description: "Redirects to JECI Digital plans page for full website build pricing (Essential, Business Pro, Enterprise).",
    price: 999,
    // ─── STRIPE ────────────────────────────────────────────────────────────
    // Point this to your /digital-plans route instead of a Stripe link,
    // OR use the JECI Digital Essential setup link.
    stripeUrl: "https://jecigroup.com/digital-plans",
    // ───────────────────────────────────────────────────────────────────────
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function JeciWebPresencePlans() {
  const [activeTab, setActiveTab] = useState<"monthly" | "firstmonth">("monthly");

  return (
    <div
      className="min-h-screen bg-black text-white antialiased pb-24"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <SubpageNav />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

        .gold-gradient {
          background: linear-gradient(135deg, #facc15 0%, #eab308 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gold-bg {
          background: linear-gradient(135deg, #facc15 0%, #eab308 100%);
        }
        .card-glow {
          box-shadow: 0 0 0 3px #facc15, 0 20px 60px -10px rgba(250, 204, 21, 0.25);
        }
        .card-shadow {
          box-shadow: 0 10px 40px -10px rgba(250, 204, 21, 0.12);
        }
        .addon-card:hover {
          border-color: rgba(250, 204, 21, 0.5);
          background: rgba(255,255,255,0.04);
        }
        .tab-active {
          background: linear-gradient(135deg, #facc15 0%, #eab308 100%);
          color: #000;
        }
      `}</style>

      {/* ── Header — pt-24 clears the fixed SubpageNav ──────────────────────── */}
      <header className="pt-24 pb-10 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-3 uppercase tracking-tight leading-tight">
          RANK HIGHER.{" "}
          <span className="gold-gradient">GET FOUND.</span>
          <br />GROW FASTER.
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
          Data-driven local SEO and digital presence services built for businesses
          that are serious about growth.
        </p>

        {/* Policy badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[
            "100% upfront — no invoicing",
            "Work starts after payment",
            "All payments non-refundable",
          ].map((label) => (
            <span
              key={label}
              className="text-xs font-semibold text-yellow-400 border border-yellow-400/30 rounded-full px-4 py-1.5 uppercase tracking-wider"
            >
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* ── Tab Toggle ──────────────────────────────────────────────────────── */}
      <div className="flex justify-center mb-12 px-4">
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          {(["monthly", "firstmonth"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === tab ? "tab-active" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab === "monthly" ? "Month 2+ Rate" : "First Month (Inc. Setup)"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Plan Cards ──────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white text-black rounded-3xl p-8 flex flex-col relative overflow-hidden transition-all ${
              plan.highlighted ? "card-glow md:-translate-y-3" : "card-shadow"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-0 gold-bg text-black px-4 py-1.5 font-black text-xs rounded-bl-2xl uppercase tracking-widest">
                Best Value
              </div>
            )}

            <div className="mb-5">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                {plan.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1 leading-snug">
                {plan.tagline}
              </p>
            </div>

            {/* Price display */}
            <div className="mb-6">
              <div className="text-4xl font-black">
                $
                {activeTab === "monthly"
                  ? plan.monthlyPrice.toLocaleString()
                  : plan.firstMonthPrice.toLocaleString()}
                <span className="text-base font-normal text-gray-400">
                  {activeTab === "monthly" ? "/mo" : " one-time"}
                </span>
              </div>
              {activeTab === "firstmonth" && (
                <p className="text-xs text-gray-400 mt-1">
                  Includes onboarding + first month of service. Recurring rate is $
                  {plan.monthlyPrice}/mo from Month 2.
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 text-sm flex-grow mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex gap-3">
                  <CheckIcon />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="mt-auto space-y-2 border-t border-gray-100 pt-6">
              {activeTab === "firstmonth" ? (
                <a
                  href={plan.stripeFirstMonthUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between w-full py-3.5 px-6 rounded-full font-black uppercase text-sm tracking-wide transition-all ${
                    plan.highlighted
                      ? "gold-bg text-black hover:opacity-90"
                      : "bg-black text-white hover:bg-yellow-400 hover:text-black"
                  }`}
                >
                  <span>
                    Get Started — ${plan.firstMonthPrice.toLocaleString()}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      plan.highlighted ? "bg-black/10" : "bg-white/10"
                    }`}
                  >
                    <ArrowIcon />
                  </div>
                </a>
              ) : (
                <a
                  href={plan.stripeRecurringUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between w-full py-3.5 px-6 rounded-full font-black uppercase text-sm tracking-wide transition-all ${
                    plan.highlighted
                      ? "gold-bg text-black hover:opacity-90"
                      : "bg-black text-white hover:bg-yellow-400 hover:text-black"
                  }`}
                >
                  <span>Subscribe — ${plan.monthlyPrice}/mo</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      plan.highlighted ? "bg-black/10" : "bg-white/10"
                    }`}
                  >
                    <ArrowIcon />
                  </div>
                </a>
              )}
              <p className="text-[10px] text-gray-400 text-center pt-1">
                100% upfront · Non-refundable · Work begins after payment
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* ── Add-Ons Section ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Add-On <span className="gold-gradient">Services</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Available to any plan. Billed as one-time fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addOns.map((addon) => (
            <a
              key={addon.name}
              href={addon.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="addon-card block border border-white/10 rounded-2xl p-6 transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-base font-bold text-white leading-tight">
                  {addon.name}
                </h3>
                <span className="text-yellow-400 font-black text-lg shrink-0">
                  ${addon.price.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {addon.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                <span>
                  {addon.name === "Custom Website Build"
                    ? "View Plans"
                    : "Add This Service"}
                </span>
                <ArrowIcon />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="mt-20 text-center px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
          {[
            "Results-focused strategy",
            "Local SEO specialists",
            "DC metro market experts",
          ].map((label) => (
            <div key={label} className="flex items-center gap-2 text-sm text-yellow-400">
              <CheckIcon />
              {label}
            </div>
          ))}
        </div>

        <a
          href="https://jecigroup.com"
          className="inline-flex items-center gap-4 bg-white text-black font-black uppercase py-4 px-10 rounded-full hover:bg-yellow-400 transition-colors group"
        >
          Back to JECI Group
          <div className="w-8 h-8 gold-bg rounded-full flex items-center justify-center text-black group-hover:bg-black group-hover:text-yellow-400 transition-colors">
            <ArrowIcon />
          </div>
        </a>

        <div className="mt-12 flex justify-center opacity-40">
          <div className="w-12 h-12 gold-bg rounded-full flex items-center justify-center">
            <span className="text-black font-black text-xl">J</span>
          </div>
        </div>
      </footer>
    </div>
  );
}