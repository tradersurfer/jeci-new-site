
export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number; // Base price
  priceString?: string; // For things like "$149/month"
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
    name: "Accounting & Bookkeeping",
    slug: "accounting-services",
    description: "Keep your finances in order with professional bookkeeping and QuickBooks setup.",
    services: [
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
        id: "monthly-bookkeeping",
        name: "Monthly Bookkeeping",
        duration: "Monthly",
        price: 149,
        priceString: "$149/month",
        description: [
          "Transaction categorization",
          "Bank reconciliation",
          "Weekly/monthly financial reports",
          "Ongoing QuickBooks support"
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
    name: "Business Development Packages",
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
    name: "Premium & Specialized Services",
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
        id: "cfo-advisory",
        name: "CFO Advisory Session",
        duration: "2 hours",
        price: 899,
        description: [
          "Strategic financial guidance",
          "Financial forecasting",
          "Growth capital planning",
          "KPI development"
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
