
export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceString?: string;
  description: string[];
  addOns?: AddOn[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  services: Service[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "tax",
    name: "Tax Services",
    slug: "tax-services",
    description: "Expert tax preparation and planning for individuals and businesses.",
    services: [
      {
        id: "individual-tax",
        name: "Individual Tax Preparation",
        duration: "1 hour",
        price: 399,
        description: [
          "Comprehensive tax return preparation for individuals",
          "Maximize deductions and credits",
          "Federal and state filing included"
        ],
        addOns: [
          { id: "prior-year", name: "Prior Year Amendment", price: 249 },
          { id: "multi-state", name: "Multi-State Tax Filing", price: 199 }
        ]
      },
      {
        id: "schedule-c",
        name: "Schedule C Filing",
        duration: "1 hour",
        price: 749,
        description: [
          "For sole proprietorships and single-member LLCs",
          "Schedule C preparation and filing",
          "Business deduction optimization"
        ]
      },
      {
        id: "partnership-tax",
        name: "Partnership Tax Return (Form 1065)",
        duration: "8-15 hours",
        price: 999,
        description: [
          "Complete partnership return preparation",
          "K-1 preparation for all partners",
          "Multi-state filing if needed"
        ]
      },
      {
        id: "scorp-tax",
        name: "S-Corporation Tax Return (Form 1120S)",
        duration: "2 hours",
        price: 1299,
        description: [
          "S-Corp tax return preparation",
          "Shareholder K-1s",
          "Payroll reconciliation"
        ]
      },
      {
        id: "tax-planning",
        name: "Tax Planning & Strategy",
        duration: "1 hour",
        price: 299,
        description: [
          "Proactive year-round tax planning",
          "Entity structure optimization for tax savings",
          "Estimated quarterly tax projections",
          "Year-end tax minimization strategies"
        ]
      },
      {
        id: "quarterly-taxes",
        name: "Quarterly Estimated Taxes",
        duration: "30 min",
        price: 199,
        description: [
          "Calculate quarterly estimated payments",
          "Avoid underpayment penalties",
          "Income projection and adjustment",
          "Federal and state estimated filings"
        ]
      },
      {
        id: "irs-representation",
        name: "IRS Representation",
        duration: "2 hours",
        price: 599,
        description: [
          "Professional representation before the IRS",
          "Audit defense and documentation",
          "Penalty abatement requests",
          "Installment agreement negotiation"
        ]
      },
      {
        id: "sales-tax",
        name: "Sales Tax Management",
        duration: "1 hour",
        price: 249,
        description: [
          "Sales & use tax registration and filing",
          "Multi-state nexus analysis",
          "Transaction-level compliance tracking",
          "Sales tax audit preparation"
        ]
      },
      {
        id: "payroll-tax",
        name: "Payroll Tax Services",
        duration: "Monthly",
        price: 199,
        priceString: "$199/month",
        description: [
          "Quarterly FICA, SUTA/FUTA filings",
          "W-2 and 1099 preparation",
          "Employee and contractor compliance",
          "Year-end payroll tax reconciliation"
        ]
      },
      {
        id: "tax-resolution",
        name: "Tax Resolution Services",
        duration: "2 hours",
        price: 799,
        description: [
          "Back tax filing and resolution",
          "Offer in Compromise assistance",
          "Currently Not Collectible status",
          "Tax lien and levy relief"
        ]
      },
      {
        id: "real-estate-tax",
        name: "Real Estate Tax Planning",
        duration: "1 hour",
        price: 399,
        description: [
          "Rental property tax strategies",
          "1031 exchanges, cost segregation",
          "Depreciation optimization",
          "DMV-specific real estate tax guidance"
        ],
        addOns: [
          { id: "rental-deduction", name: "Rental Property Deduction Report", price: 149 },
          { id: "1031-planning", name: "1031 Exchange Planning Session", price: 249 }
        ]
      },
      {
        id: "crypto-tax",
        name: "Crypto Tax Consultation",
        duration: "1 hour",
        price: 149,
        description: [
          "Navigate IRS crypto reporting requirements",
          "Deduct mining, staking, transaction expenses",
          "Report NFT sales and DeFi income",
          "Reduce tax liability on crypto gains"
        ],
        addOns: [
          { id: "crypto-tracker", name: "Crypto Tax Tracker Setup", price: 99 },
          { id: "quarterly-crypto", name: "Quarterly Crypto Tax Review", price: 349 }
        ]
      },
      {
        id: "re-crypto-combined",
        name: "Real Estate & Crypto Tax Optimization",
        duration: "1 hour",
        price: 399,
        description: [
          "Specialized for clients with both real estate and crypto investments",
          "Comprehensive tax strategy across both asset classes"
        ]
      }
    ]
  },
  {
    id: "accounting",
    name: "Accounting Services",
    slug: "accounting-services",
    description: "Professional bookkeeping, financial reporting, and advisory services to keep your business running smoothly.",
    services: [
      {
        id: "monthly-bookkeeping",
        name: "Monthly Bookkeeping",
        duration: "Monthly",
        price: 149,
        priceString: "$149/month",
        description: [
          "Transaction categorization and reconciliation",
          "Bank and credit card reconciliation",
          "Weekly/monthly financial reports",
          "Ongoing QuickBooks support"
        ]
      },
      {
        id: "quickbooks-setup",
        name: "QuickBooks Initial Setup",
        duration: "1-2 hours",
        price: 349,
        description: [
          "Complete QuickBooks account configuration",
          "Data migration and cleanup",
          "Chart of accounts setup",
          "Bank/credit card integration",
          "Includes 1 month support ($149 value)"
        ],
        addOns: [
          { id: "extra-training", name: "Additional training hour", price: 149 },
          { id: "3mo-support", name: "First 3 months support bundle", price: 399 }
        ]
      },
      {
        id: "financial-statements",
        name: "Financial Statement Preparation",
        duration: "2-4 hours",
        price: 499,
        description: [
          "Income statement (P&L) preparation",
          "Balance sheet compilation",
          "Cash flow statement analysis",
          "Bank-ready financial packages"
        ]
      },
      {
        id: "ap-ar-management",
        name: "Accounts Payable/Receivable Management",
        duration: "Monthly",
        price: 249,
        priceString: "$249/month",
        description: [
          "Invoice processing and payment scheduling",
          "Customer invoicing and collections",
          "Aging report management",
          "Vendor relationship coordination"
        ]
      },
      {
        id: "bank-reconciliation",
        name: "Bank Reconciliation",
        duration: "Monthly",
        price: 99,
        priceString: "$99/month",
        description: [
          "Monthly bank statement reconciliation",
          "Identify and resolve discrepancies",
          "Fraud detection monitoring",
          "Clean audit trail maintenance"
        ]
      },
      {
        id: "financial-reporting",
        name: "Financial Reporting & Analysis",
        duration: "Quarterly",
        price: 399,
        priceString: "$399/quarter",
        description: [
          "Quarterly financial performance reports",
          "Budget vs. actual variance analysis",
          "KPI tracking and dashboards",
          "Trend analysis and forecasting"
        ]
      },
      {
        id: "cfo-advisory",
        name: "CFO Advisory Services",
        duration: "2 hours",
        price: 899,
        description: [
          "Strategic financial guidance",
          "Financial forecasting and modeling",
          "Growth capital planning",
          "KPI development and tracking"
        ]
      }
    ]
  },
  {
    id: "credit-funding",
    name: "Credit & Funding",
    slug: "credit-funding",
    description: "Build business credit, repair personal credit, and access funding to fuel your growth.",
    services: [
      {
        id: "business-credit-building",
        name: "Business Credit Building",
        duration: "90 days",
        price: 499,
        description: [
          "Establish business credit profile with Dun & Bradstreet, Experian, Equifax",
          "Trade line strategy and vendor account setup",
          "Business credit monitoring and coaching",
          "90-day credit building action plan"
        ]
      },
      {
        id: "credit-repair",
        name: "Credit Repair Services",
        duration: "3-6 months",
        price: 499,
        description: [
          "3-round AI-powered dispute process",
          "Remove negative items from all three bureaus",
          "Average +100 point improvement",
          "Monthly progress reports and coaching"
        ]
      },
      {
        id: "funding-assistance",
        name: "Funding Application Assistance",
        duration: "2 hours",
        price: 399,
        description: [
          "SBA loan application preparation",
          "Grant research and application support",
          "Business plan review for lender readiness",
          "Financial package preparation for banks"
        ]
      },
      {
        id: "business-loan-guidance",
        name: "Business Loan Guidance",
        duration: "1 hour",
        price: 249,
        description: [
          "Loan product comparison and recommendations",
          "Interest rate negotiation strategy",
          "Documentation preparation and review",
          "Lender relationship introduction"
        ]
      },
      {
        id: "credit-score-consultation",
        name: "Credit Score Strategy Session",
        duration: "1 hour",
        price: 149,
        description: [
          "Full credit report analysis",
          "Personalized improvement roadmap",
          "Debt management strategy",
          "Credit utilization optimization"
        ]
      }
    ]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "Grow your brand and reach more customers with expert digital marketing strategies.",
    services: [
      {
        id: "seo-mastery",
        name: "SEO Mastery Package",
        duration: "Monthly",
        price: 799,
        priceString: "$799/month",
        description: [
          "Advanced technical SEO audit and optimization",
          "Keyword research and content strategy",
          "On-page and off-page SEO implementation",
          "Monthly ranking reports and analytics"
        ]
      },
      {
        id: "content-strategy",
        name: "Content Strategy & Creation",
        duration: "Monthly",
        price: 599,
        priceString: "$599/month",
        description: [
          "Content marketing calendar development",
          "Blog post and article creation",
          "Email marketing campaign management",
          "Content performance analytics"
        ]
      },
      {
        id: "social-media",
        name: "Social Media Management",
        duration: "Monthly",
        price: 499,
        priceString: "$499/month",
        description: [
          "Full managed strategy for primary platforms",
          "Content creation and scheduling",
          "Community management and engagement",
          "Monthly performance reporting"
        ]
      },
      {
        id: "website-development",
        name: "Website Design & Development",
        duration: "2-4 weeks",
        price: 2499,
        description: [
          "Custom responsive website design",
          "SEO-optimized structure and content",
          "Mobile-first development",
          "Analytics and tracking setup"
        ]
      },
      {
        id: "brand-identity",
        name: "Brand Identity Package",
        duration: "1-2 weeks",
        price: 999,
        description: [
          "Logo design and brand guidelines",
          "Color palette and typography system",
          "Brand voice and messaging framework",
          "Social media brand kit"
        ]
      }
    ]
  },
  {
    id: "business-consulting",
    name: "Business Formation & Consulting",
    slug: "business-services",
    description: "Start right and grow smart with expert business guidance.",
    services: [
      {
        id: "free-consultation",
        name: "FREE Business Consultation",
        duration: "30 min",
        price: 0,
        description: [
          "Personalized financial analysis",
          "Strategic tax guidance",
          "Business growth insights",
          "Goal-oriented planning"
        ]
      },
      {
        id: "llc-formation",
        name: "Single Member LLC Entity Formation",
        duration: "30 min",
        price: 599,
        description: [
          "Articles of Organization (drafted & filed)",
          "Operating Agreement (customized)",
          "Federal EIN filing",
          "Cash Flow Budget & Home Office Setup"
        ]
      },
      {
        id: "strategy-session",
        name: "Business Strategy Session",
        duration: "30 min",
        price: 149,
        description: [
          "Quick strategic consultation",
          "Operations review",
          "Growth recommendations"
        ],
        addOns: [
          { id: "follow-up-call", name: "Follow-up strategy call (30 min)", price: 99 },
          { id: "strategy-doc", name: "Written strategic plan document", price: 199 }
        ]
      },
      {
        id: "strategic-consultation",
        name: "Strategic Business Consultation",
        duration: "2.5 hours",
        price: 299,
        description: [
          "In-depth business analysis",
          "Financial strategy development",
          "Operations optimization",
          "Growth planning"
        ]
      },
      {
        id: "financial-analysis",
        name: "Financial Analysis & Planning",
        duration: "2 hours",
        price: 349,
        description: [
          "Comprehensive financial review",
          "Cash flow analysis",
          "Budget development",
          "Financial forecasting"
        ]
      }
    ]
  },
  {
    id: "business-development",
    name: "Development Packages",
    slug: "business-development",
    description: "Comprehensive packages to scale your business operations.",
    services: [
      {
        id: "starter-pack",
        name: "Starter Pack (Bronze Tier)",
        duration: "Monthly",
        price: 799,
        priceString: "$799/month",
        description: [
          "Simple financial snapshot",
          "Basic target customer blueprint",
          "Bi-weekly 30-min check-ins",
          "Basic brand session"
        ]
      },
      {
        id: "growth-pack",
        name: "Growth Pack (Silver Tier)",
        duration: "Monthly",
        price: 1499,
        priceString: "$1,499/month",
        description: [
          "Enhanced financial tracking",
          "Detailed customer blueprint",
          "Weekly check-ins",
          "Advanced brand development"
        ]
      },
      {
        id: "scale-pack",
        name: "Scale Pack (Gold Tier)",
        duration: "Monthly",
        price: 2499,
        priceString: "$2,499/month",
        description: [
          "Comprehensive process audit",
          "Automation recommendations",
          "In-depth brand audit",
          "Comprehensive visual identity system"
        ]
      },
      {
        id: "enterprise-pack",
        name: "Enterprise Edge Pack (Diamond Tier)",
        duration: "Monthly",
        price: 4999,
        priceString: "$4,999/month",
        description: [
          "Detailed financial analysis",
          "Comprehensive action plan with KPIs",
          "Full brand strategy",
          "Weekly/bi-weekly check-ins"
        ]
      }
    ]
  },
  {
    id: "premium",
    name: "Premium & Specialized",
    slug: "premium-services",
    description: "High-level advisory for complex financial situations.",
    services: [
      {
        id: "advanced-tax",
        name: "Advanced Tax Strategy Session",
        duration: "30 min",
        price: 599,
        description: [
          "High-net-worth tax planning",
          "Multi-entity structuring",
          "Advanced tax strategies"
        ]
      },
      {
        id: "comprehensive-package",
        name: "Comprehensive Business Package",
        duration: "4 hours",
        price: 599,
        description: [
          "Full business assessment",
          "Financial + operational review",
          "Strategic implementation plan"
        ]
      },
      {
        id: "restructuring",
        name: "Business Restructuring Consultation",
        duration: "2 hours",
        price: 699,
        description: [
          "Entity structure optimization",
          "Tax-efficient restructuring",
          "Compliance review"
        ]
      },
      {
        id: "tax-audit",
        name: "Comprehensive Tax & Business Audit",
        duration: "6.5 hours",
        price: 999,
        description: [
          "Full financial audit",
          "Tax compliance review",
          "Business operations assessment",
          "Detailed recommendations report"
        ]
      },
      {
        id: "transformation",
        name: "Strategic Business Transformation",
        duration: "6 hours",
        price: 1199,
        description: [
          "Complete business overhaul planning",
          "Financial restructuring",
          "Operations optimization",
          "Growth strategy development"
        ]
      },
      {
        id: "enterprise-dev",
        name: "Enterprise Business Development",
        duration: "10 hours",
        price: 1799,
        description: [
          "Comprehensive business analysis",
          "Multi-year strategic plan",
          "Financial modeling",
          "Implementation roadmap"
        ]
      }
    ]
  }
];
