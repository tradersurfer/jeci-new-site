import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Star, ArrowRight, Clock, DollarSign, Users, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICE_CATEGORIES, Service } from '@/data/services';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface ServiceDetailData {
  whoIsFor: string[];
  process: string[];
  results: string[];
  faqs: { question: string; answer: string }[];
}

const serviceDetails: Record<string, ServiceDetailData> = {
  "individual-tax": {
    whoIsFor: ["W-2 employees with investment income", "Freelancers and gig workers", "Individuals with rental properties", "Anyone who needs to maximize deductions"],
    process: ["Upload your documents via our secure portal", "We review and categorize all income and deductions", "Draft return prepared for your review", "File electronically with IRS and state"],
    results: ["Average $2,400 in additional deductions found", "Same-day electronic filing", "Audit protection included"],
    faqs: [
      { question: "What documents do I need?", answer: "W-2s, 1099s, mortgage interest statements (1098), charitable donation receipts, and any investment statements. We'll send you a complete checklist." },
      { question: "How long does it take?", answer: "Most individual returns are completed within 3-5 business days of receiving all documents." },
      { question: "Do you handle state taxes too?", answer: "Yes! Federal and state filing are both included in the base price. Multi-state filing is available as an add-on." },
      { question: "What if I get audited?", answer: "We provide audit support for all returns we prepare. We'll represent you before the IRS at no additional charge." },
      { question: "Can you file amended returns?", answer: "Absolutely. Prior year amendments are available as an add-on service for $249." }
    ]
  },
  "schedule-c": {
    whoIsFor: ["Sole proprietors", "Single-member LLC owners", "Freelancers and independent contractors", "Side-hustle entrepreneurs"],
    process: ["Gather business income and expense records", "Classify and optimize business deductions", "Prepare Schedule C with profit/loss calculation", "Integrate with personal return and file"],
    results: ["Home office deduction optimization", "Vehicle expense maximization", "Self-employment tax planning"],
    faqs: [
      { question: "What qualifies as a business deduction?", answer: "Ordinary and necessary expenses for your business including supplies, equipment, travel, marketing, professional services, and home office expenses." },
      { question: "Should I switch to an S-Corp?", answer: "If your net profit exceeds $40-50K, an S-Corp may save you significant self-employment taxes. We can analyze this during your session." },
      { question: "Can I deduct my home office?", answer: "Yes, if you use a dedicated space regularly and exclusively for business. We'll calculate both the simplified and actual expense methods." },
      { question: "What records do I need to keep?", answer: "Income records, receipts for expenses over $75, mileage logs, and bank statements. We recommend QuickBooks for easy tracking." },
      { question: "How do estimated taxes work?", answer: "If you expect to owe $1,000+ in taxes, you should pay quarterly estimates. We can calculate these for you." }
    ]
  },
  "partnership-tax": {
    whoIsFor: ["Multi-member LLC owners", "General and limited partnerships", "Joint venture participants", "Family business partnerships"],
    process: ["Collect partnership agreement and financials", "Allocate income, deductions, and credits per agreement", "Prepare Form 1065 and individual K-1s", "File and distribute K-1s to all partners"],
    results: ["Proper income allocation per partnership agreement", "K-1s delivered to all partners for their returns", "Multi-state compliance handled"],
    faqs: [
      { question: "What is a K-1?", answer: "Schedule K-1 reports each partner's share of partnership income, deductions, and credits. Each partner uses their K-1 to file their personal tax return." },
      { question: "When is the partnership return due?", answer: "March 15th (or the 15th day of the 3rd month after the fiscal year ends). Extensions are available until September 15th." },
      { question: "Can partners have different profit/loss allocations?", answer: "Yes, partnerships have flexibility in allocating income and losses, but allocations must have substantial economic effect under IRS rules." },
      { question: "What if we have partners in different states?", answer: "We handle multi-state filing requirements and ensure each partner's K-1 reflects the correct state-level allocations." },
      { question: "Do I need a partnership agreement?", answer: "While not legally required in all states, a written partnership agreement is essential for tax purposes and dispute prevention. We can recommend attorneys for this." }
    ]
  },
  "scorp-tax": {
    whoIsFor: ["S-Corporation owners", "Businesses with 1-100 shareholders", "Entrepreneurs seeking tax-efficient structures", "Growing businesses with W-2 employees"],
    process: ["Gather corporate financial statements and payroll records", "Reconcile officer compensation with reasonable salary", "Prepare Form 1120S and shareholder K-1s", "File with IRS and distribute K-1s"],
    results: ["Self-employment tax savings through salary optimization", "Clean K-1s for all shareholders", "Full payroll tax reconciliation"],
    faqs: [
      { question: "What is a reasonable salary for an S-Corp owner?", answer: "The IRS requires 'reasonable compensation' based on industry standards, experience, and job duties. We help you find the sweet spot that minimizes taxes while staying compliant." },
      { question: "How much can I save vs. a sole proprietorship?", answer: "Depending on your net income, S-Corp election can save $5,000-$20,000+ annually in self-employment taxes through salary/distribution splits." },
      { question: "Do I need to run payroll?", answer: "Yes, S-Corp owners who perform services must take a reasonable salary through payroll. We can help set this up." },
      { question: "When should I elect S-Corp status?", answer: "Generally when net business income exceeds $40,000-$50,000 annually. We can model the savings for your specific situation." },
      { question: "What happens to my distributions?", answer: "After paying yourself a reasonable salary, remaining profits can be taken as distributions, which are not subject to self-employment tax." }
    ]
  },
  "tax-planning": {
    whoIsFor: ["Business owners seeking to minimize tax liability", "High-income earners", "Real estate investors", "Anyone who wants proactive tax strategy"],
    process: ["Review current tax situation and financial goals", "Identify tax-saving opportunities and strategies", "Create customized tax reduction plan", "Implement strategies with quarterly check-ins"],
    results: ["Average 15-30% reduction in tax liability", "Year-round strategic guidance", "Proactive planning vs. reactive filing"],
    faqs: [
      { question: "When should I start tax planning?", answer: "The best time is January, but any time before year-end can yield savings. Proactive planning throughout the year maximizes results." },
      { question: "What strategies do you typically recommend?", answer: "Retirement plan optimization, entity structuring, income timing, expense acceleration, qualified business deductions, and investment tax strategies." },
      { question: "How is this different from tax preparation?", answer: "Tax preparation looks backward at last year. Tax planning looks forward to minimize what you'll owe. Think of it as offense vs. defense." },
      { question: "Do I need this if I already have a CPA?", answer: "Many CPAs focus on compliance (filing returns) rather than strategy. Our planning sessions complement preparation services." },
      { question: "Can you help with estimated tax payments?", answer: "Absolutely. Quarterly estimates are a key part of our planning process to avoid underpayment penalties and manage cash flow." }
    ]
  },
  "quarterly-taxes": {
    whoIsFor: ["Self-employed individuals", "Freelancers and contractors", "Business owners without payroll", "Anyone with significant non-W-2 income"],
    process: ["Estimate annual income and deductions", "Calculate quarterly payment amounts", "Prepare and file estimated tax vouchers", "Adjust quarterly based on income changes"],
    results: ["Avoid underpayment penalties", "Better cash flow management", "No year-end surprises"],
    faqs: [
      { question: "When are quarterly taxes due?", answer: "April 15, June 15, September 15, and January 15 of the following year." },
      { question: "What happens if I miss a payment?", answer: "The IRS charges an underpayment penalty. We can help calculate if you need to catch up or adjust future payments." },
      { question: "How do you calculate the amount?", answer: "We estimate your annual income, apply deductions and credits, and divide the tax liability into quarterly installments." },
      { question: "Can the amount change each quarter?", answer: "Yes! We recommend adjusting each quarter based on actual income to avoid over or underpaying." },
      { question: "Do I need to pay state estimated taxes too?", answer: "In most states with income tax, yes. We handle both federal and state estimates." }
    ]
  },
  "irs-representation": {
    whoIsFor: ["Anyone who received an IRS notice", "Businesses facing an audit", "Taxpayers with back taxes or penalties", "Those needing installment agreements"],
    process: ["Review IRS correspondence and tax history", "Develop response strategy", "Communicate directly with the IRS on your behalf", "Resolve the issue and prevent future problems"],
    results: ["Professional representation saves stress and money", "Average 40% penalty reduction", "Resolution typically in 30-90 days"],
    faqs: [
      { question: "Can you really negotiate with the IRS?", answer: "Yes. As Enrolled Agents and tax professionals, we have the authority to represent you before the IRS and negotiate on your behalf." },
      { question: "What if I owe more than I can pay?", answer: "We can negotiate installment agreements, currently not collectible status, or even an Offer in Compromise to settle for less than you owe." },
      { question: "Will I have to go to the IRS office?", answer: "In most cases, no. We handle all communication on your behalf through written correspondence, phone calls, and virtual meetings." },
      { question: "How far back can the IRS audit me?", answer: "Generally 3 years, but up to 6 years if substantial income was underreported. There's no limit for fraud or unfiled returns." },
      { question: "What should I do if I receive an IRS letter?", answer: "Don't panic. Contact us immediately. Do not call the IRS or respond until we've reviewed the notice and developed a strategy." }
    ]
  },
  "sales-tax": {
    whoIsFor: ["E-commerce businesses", "Companies selling in multiple states", "Retailers and service providers", "Businesses unsure about nexus obligations"],
    process: ["Analyze your nexus exposure across states", "Register for required permits", "Set up tracking and filing systems", "Manage ongoing compliance and filing"],
    results: ["Full compliance across all states", "Avoid penalties and interest", "Streamlined filing process"],
    faqs: [
      { question: "What is nexus?", answer: "Nexus is a connection to a state that requires you to collect and remit sales tax. This can be physical presence or economic activity exceeding state thresholds." },
      { question: "Do online sales require sales tax?", answer: "After the 2018 Wayfair decision, most states require online sellers to collect sales tax if they exceed certain sales thresholds (typically $100K in sales or 200 transactions)." },
      { question: "How often do I need to file?", answer: "Filing frequency depends on your sales volume in each state — it can be monthly, quarterly, or annually." },
      { question: "What happens if I haven't been collecting sales tax?", answer: "Many states offer voluntary disclosure agreements (VDAs) that can reduce penalties. We can help you get compliant with minimal exposure." },
      { question: "Do you handle local taxes too?", answer: "Yes, we manage city, county, and special district taxes in addition to state-level requirements." }
    ]
  },
  "payroll-tax": {
    whoIsFor: ["Small businesses with employees", "Companies with W-2 workers and 1099 contractors", "Growing businesses adding their first hires", "Employers needing compliance help"],
    process: ["Set up payroll system and tax accounts", "Process regular payroll runs", "File quarterly payroll tax returns", "Handle year-end W-2 and 1099 preparation"],
    results: ["On-time filings avoid penalties", "Proper worker classification", "Year-end forms delivered on time"],
    faqs: [
      { question: "What payroll taxes am I responsible for?", answer: "Federal income tax withholding, Social Security and Medicare (FICA), Federal Unemployment (FUTA), and State Unemployment (SUTA) taxes." },
      { question: "What's the difference between W-2 and 1099?", answer: "W-2 workers are employees where you withhold taxes. 1099 contractors are independent — you report payments but don't withhold taxes." },
      { question: "How often do I need to file payroll taxes?", answer: "Federal deposits can be monthly or semi-weekly depending on your liability. Quarterly returns (Form 941) are due by the end of the month following each quarter." },
      { question: "Can you handle multi-state payroll?", answer: "Yes, we manage state withholding, unemployment, and local tax requirements for employees in multiple states." },
      { question: "When are W-2s due to employees?", answer: "W-2s must be provided to employees by January 31st. We prepare and distribute them on time." }
    ]
  },
  "tax-resolution": {
    whoIsFor: ["Anyone with unfiled tax returns", "Taxpayers owing back taxes to the IRS", "Those with tax liens or levies", "Anyone who received a collections notice"],
    process: ["Full review of tax history and compliance status", "File any missing returns", "Determine best resolution option", "Negotiate with IRS and implement solution"],
    results: ["Get back in compliance with the IRS", "Potential reduction in taxes owed", "Stop collections and wage garnishments"],
    faqs: [
      { question: "What is an Offer in Compromise?", answer: "It's an agreement with the IRS to settle your tax debt for less than the full amount owed. Not everyone qualifies, but we'll evaluate your eligibility." },
      { question: "Can you stop a wage garnishment?", answer: "Yes, we can request a release of levy and negotiate an alternative payment arrangement." },
      { question: "What if I haven't filed for several years?", answer: "We'll file all delinquent returns, often going back to find refunds you missed. Getting current is the first step to resolution." },
      { question: "How long does resolution take?", answer: "Simple cases can resolve in 30-60 days. Complex situations like Offers in Compromise may take 6-12 months." },
      { question: "Will this affect my credit?", answer: "Tax liens can impact credit, but resolution removes the lien. We focus on getting you to a clean slate as quickly as possible." }
    ]
  },
  "real-estate-tax": {
    whoIsFor: ["Rental property owners", "Real estate investors", "House flippers", "Commercial property owners"],
    process: ["Review your real estate portfolio and tax situation", "Identify depreciation and deduction opportunities", "Develop asset-specific tax strategies", "Implement and track savings throughout the year"],
    results: ["Maximize depreciation deductions", "Identify 1031 exchange opportunities", "Average $5,000+ in additional deductions"],
    faqs: [
      { question: "How does depreciation work?", answer: "Residential rental property is depreciated over 27.5 years, commercial over 39 years. Cost segregation studies can accelerate depreciation and significantly increase deductions." },
      { question: "What is a 1031 exchange?", answer: "A tax-deferred exchange allowing you to sell an investment property and reinvest proceeds into a like-kind property without paying capital gains tax." },
      { question: "Can I deduct renovation expenses?", answer: "Some renovation costs can be deducted immediately, while others must be capitalized and depreciated. We'll classify each expense correctly." },
      { question: "What about short-term rental income (Airbnb)?", answer: "Short-term rental income has specific rules about passive vs. active income, self-employment tax, and deductions. We ensure proper reporting and maximize your deductions." },
      { question: "Do I need a separate LLC for each property?", answer: "While not required for taxes, separate entities can provide liability protection. We coordinate with attorneys for the optimal structure." }
    ]
  },
  "crypto-tax": {
    whoIsFor: ["Cryptocurrency traders and investors", "DeFi participants and yield farmers", "NFT creators and collectors", "Bitcoin miners and stakers"],
    process: ["Connect your wallets and exchanges (read-only)", "Analyze transactions for missing cost basis", "Classify income types (staking, airdrops, etc.)", "Generate Form 8949 for your return"],
    results: ["IRS-compliant crypto reporting", "Tax-loss harvesting opportunities identified", "Average $3,000+ in tax savings"],
    faqs: [
      { question: "What crypto transactions are taxable?", answer: "Selling crypto for fiat, trading one crypto for another, spending crypto, and earning crypto (staking/mining) are all taxable events." },
      { question: "Can I deduct crypto losses?", answer: "Yes! You can offset capital gains and up to $3,000 of ordinary income annually." },
      { question: "Do you handle DeFi?", answer: "Absolutely. We are experts in liquidity pool tokens, yield farming, and complex wrapper transactions." },
      { question: "What about NFT taxes?", answer: "NFT sales are subject to capital gains tax. Creators may owe self-employment tax. We handle both buyer and seller scenarios." },
      { question: "How do you track cost basis?", answer: "We use specialized crypto tax software and manual reconciliation to ensure accurate cost basis tracking across all exchanges and wallets." }
    ]
  },
  "re-crypto-combined": {
    whoIsFor: ["Investors with both real estate and crypto portfolios", "Entrepreneurs diversifying across asset classes", "High-net-worth individuals with complex holdings"],
    process: ["Review full investment portfolio across both asset classes", "Identify cross-asset tax optimization strategies", "Develop comprehensive tax reduction plan", "Implement strategies with quarterly monitoring"],
    results: ["Unified tax strategy across all investments", "Maximized deductions across both asset classes", "Strategic timing of gains and losses"],
    faqs: [
      { question: "Why combine real estate and crypto planning?", answer: "Both asset classes have unique tax rules. A unified strategy can leverage losses in one to offset gains in the other." },
      { question: "Can I use crypto gains to invest in real estate?", answer: "Yes, but the crypto sale triggers capital gains tax. Proper planning can minimize the tax impact of converting crypto to real estate." },
      { question: "How do 1031 exchanges interact with crypto?", answer: "Currently, 1031 exchanges are limited to real property. They cannot be used for cryptocurrency. However, we can plan around this." },
      { question: "What records do I need?", answer: "Wallet/exchange records for crypto, property purchase documents, rental income records, and expense receipts for both." },
      { question: "Is this a one-time session or ongoing?", answer: "We recommend at least quarterly reviews to adjust strategy based on market conditions and transaction activity." }
    ]
  },
  "monthly-bookkeeping": {
    whoIsFor: ["Small business owners", "Freelancers and solopreneurs", "Growing companies without in-house accounting", "Anyone who wants clean financial records"],
    process: ["Connect your bank accounts and credit cards", "We categorize and reconcile transactions weekly", "Monthly financial reports delivered to your inbox", "Ongoing QuickBooks support and maintenance"],
    results: ["Always know your financial position", "Tax-ready books year-round", "Save 10+ hours per month on bookkeeping"],
    faqs: [
      { question: "What accounting software do you use?", answer: "We primarily use QuickBooks Online, but can also work with Xero, FreshBooks, or Wave." },
      { question: "How many transactions are included?", answer: "Our base plan covers up to 200 transactions per month. High-volume businesses may need a custom plan." },
      { question: "Will I have access to my books?", answer: "Absolutely! You'll have 24/7 access to your QuickBooks account and can view reports anytime." },
      { question: "What reports do I receive?", answer: "Monthly P&L statement, balance sheet, cash flow summary, and accounts aging reports." },
      { question: "Can I cancel anytime?", answer: "Yes, our bookkeeping services are month-to-month with no long-term contracts." }
    ]
  },
  "quickbooks-setup": {
    whoIsFor: ["New business owners", "Businesses switching from spreadsheets", "Companies migrating from another platform", "Anyone who needs organized financial records"],
    process: ["Assess your business needs and chart of accounts", "Configure QuickBooks with proper categories and settings", "Migrate existing data and connect bank accounts", "Provide training and 1 month of support"],
    results: ["Fully configured QuickBooks in 1-2 days", "Clean chart of accounts for your industry", "Training so you can manage day-to-day"],
    faqs: [
      { question: "Which QuickBooks version should I use?", answer: "For most small businesses, QuickBooks Online Simple Start or Essentials is sufficient. We'll recommend the best plan based on your needs." },
      { question: "Can you migrate data from another system?", answer: "Yes, we can import data from spreadsheets, other accounting software, or bank statements." },
      { question: "What is included in the 1 month of support?", answer: "Email and phone support for questions about categorization, reporting, and general QuickBooks usage." },
      { question: "Do I need any prior accounting knowledge?", answer: "Not at all. Our training session covers everything you need to know to manage your daily bookkeeping in QuickBooks." },
      { question: "How long does setup take?", answer: "Typically 1-2 hours for setup and configuration, plus additional time for data migration if needed." }
    ]
  },
  "financial-statements": {
    whoIsFor: ["Businesses applying for loans or funding", "Companies preparing for audits", "Startups seeking investors", "Any business needing formal financial reports"],
    process: ["Review and verify your financial records", "Prepare income statement, balance sheet, and cash flow", "Compile notes and disclosures", "Deliver bank-ready financial package"],
    results: ["Lender-ready financial statements", "Clear picture of business financial health", "Professional presentation for stakeholders"],
    faqs: [
      { question: "What's the difference between compiled and audited statements?", answer: "Compiled statements are prepared from your data without verification. Audited statements involve independent verification. Most small businesses need compiled statements." },
      { question: "How often should I prepare financial statements?", answer: "Monthly or quarterly for internal management. Annually at minimum for tax purposes and stakeholder reporting." },
      { question: "Can these be used for bank loans?", answer: "Yes, our financial statements are formatted to meet bank and SBA lending requirements." },
      { question: "What if my books are messy?", answer: "We can clean up your books first (additional service) before preparing statements. Clean data produces reliable statements." },
      { question: "How quickly can you prepare them?", answer: "With clean books, financial statements can be prepared in 2-4 business days." }
    ]
  },
  "ap-ar-management": {
    whoIsFor: ["Businesses struggling with cash flow", "Companies with many vendors or customers", "Growing businesses that need accounts management", "Anyone spending too much time on invoicing"],
    process: ["Set up vendor and customer accounts", "Process invoices and schedule payments", "Send customer invoices and follow up on collections", "Provide weekly aging reports"],
    results: ["Improved cash flow through faster collections", "Avoid late payment penalties", "Clear visibility into money owed and owing"],
    faqs: [
      { question: "What exactly do you manage?", answer: "We handle incoming bills (accounts payable), customer invoicing (accounts receivable), payment scheduling, collections follow-up, and aging reports." },
      { question: "Can you approve payments on my behalf?", answer: "We prepare payments for your approval. You maintain control of final authorization and signing." },
      { question: "How do you handle past-due customers?", answer: "We send professional reminders at 30, 60, and 90 days. For chronic late-payers, we develop escalation procedures tailored to your preferences." },
      { question: "What systems do you use?", answer: "We work within QuickBooks, Xero, or your existing accounting platform to ensure seamless integration." },
      { question: "Can you handle high volumes?", answer: "Yes, our systems are designed for businesses processing hundreds of transactions monthly." }
    ]
  },
  "bank-reconciliation": {
    whoIsFor: ["Any business with bank accounts", "Companies with multiple accounts or credit cards", "Businesses that need clean audit trails", "Anyone who hasn't reconciled in months"],
    process: ["Download bank statements and transaction records", "Match transactions with accounting records", "Identify and resolve discrepancies", "Document reconciliation and flag unusual items"],
    results: ["Accurate financial records", "Early fraud detection", "Audit-ready books"],
    faqs: [
      { question: "How often should I reconcile?", answer: "Monthly is the standard. Some high-volume businesses benefit from weekly reconciliation." },
      { question: "What if I'm months behind?", answer: "We can catch you up. We'll reconcile each month in order to ensure accuracy and identify any issues." },
      { question: "What discrepancies do you look for?", answer: "Missing transactions, duplicate entries, incorrect amounts, unauthorized charges, and timing differences between books and bank." },
      { question: "Is this included in bookkeeping?", answer: "Yes, bank reconciliation is included in our monthly bookkeeping service. This standalone service is for businesses that handle their own bookkeeping but want professional reconciliation." },
      { question: "How many accounts are included?", answer: "The base price covers up to 2 bank accounts and 2 credit cards. Additional accounts can be added." }
    ]
  },
  "financial-reporting": {
    whoIsFor: ["Business owners who want data-driven decisions", "Companies with investors or boards", "Growing businesses tracking KPIs", "Anyone who wants to understand their numbers"],
    process: ["Define key metrics and KPIs for your business", "Build custom reporting dashboards", "Deliver quarterly analysis with insights", "Review results and adjust strategy"],
    results: ["Clear financial visibility for better decisions", "Trend identification and forecasting", "Board-ready quarterly reports"],
    faqs: [
      { question: "What reports are included?", answer: "P&L analysis, balance sheet review, cash flow projections, budget vs. actual comparisons, and custom KPI dashboards." },
      { question: "Can you create custom reports?", answer: "Yes, we tailor reports to your specific business needs and the metrics that matter most to you." },
      { question: "Do I meet with someone to review?", answer: "Yes, each quarterly report includes a 30-minute review call with your financial analyst." },
      { question: "Can this help me get funding?", answer: "Absolutely. Well-documented financial reports and trends strengthen any funding application or investor pitch." },
      { question: "What if I also need bookkeeping?", answer: "We recommend combining bookkeeping and reporting for the best results. Bundle discounts are available." }
    ]
  },
  "cfo-advisory": {
    whoIsFor: ["Growing businesses without a full-time CFO", "Companies planning major growth or changes", "Business owners who need financial strategy", "Startups preparing for funding rounds"],
    process: ["Deep dive into your business financials and goals", "Develop financial forecasts and models", "Create strategic financial roadmap", "Ongoing advisory with regular check-ins"],
    results: ["Executive-level financial strategy", "Data-driven growth planning", "Investor-ready financial infrastructure"],
    faqs: [
      { question: "What does a fractional CFO do?", answer: "Provides the strategic financial guidance of a full-time CFO — forecasting, fundraising, cash management, and financial strategy — without the $150K+ salary." },
      { question: "How often will we meet?", answer: "The initial session is 2 hours. Ongoing engagements typically involve bi-weekly or monthly strategy calls." },
      { question: "Can you help with fundraising?", answer: "Yes, we create financial models, projections, and pitch deck financials that investors expect to see." },
      { question: "Is this different from bookkeeping?", answer: "Very different. Bookkeeping records what happened. CFO advisory focuses on strategy — what should happen next and how to get there." },
      { question: "What size business is this for?", answer: "Typically businesses with $250K-$10M in revenue benefit most from fractional CFO services." }
    ]
  },
  "business-credit-building": {
    whoIsFor: ["New business owners", "Entrepreneurs wanting to separate personal and business credit", "Companies preparing for loans or lines of credit", "Businesses wanting vendor credit accounts"],
    process: ["Establish business credit profile with reporting agencies", "Open strategic vendor and trade line accounts", "Build payment history over 90 days", "Monitor and coach through the process"],
    results: ["Established business credit score", "Access to business credit cards and lines", "Separation of personal and business credit"],
    faqs: [
      { question: "What is business credit?", answer: "A credit profile separate from your personal credit, linked to your EIN. It allows your business to qualify for financing independently." },
      { question: "How long does it take to build?", answer: "Initial trade lines can report within 30-60 days. A solid business credit profile takes 90-180 days." },
      { question: "Do I need an LLC or corporation?", answer: "Yes, you need a registered business entity with an EIN to build business credit." },
      { question: "Will this affect my personal credit?", answer: "No, business credit is separate. However, some business credit cards may require a personal guarantee initially." },
      { question: "What credit bureaus report business credit?", answer: "Dun & Bradstreet, Experian Business, and Equifax Business are the three main business credit bureaus." }
    ]
  },
  "credit-repair": {
    whoIsFor: ["Anyone with a credit score below 700", "People with negative items on their report", "Those preparing for a major purchase (home, car)", "Entrepreneurs needing good personal credit for business"],
    process: ["Pull and analyze all three credit reports", "Identify disputable negative items", "Send AI-powered dispute letters in 3 rounds", "Monitor progress and provide monthly updates"],
    results: ["Average 100+ point improvement", "80% of negative items removed in 30-60 days", "Monthly progress reports"],
    faqs: [
      { question: "How much can my score improve?", answer: "Results vary, but our clients see an average improvement of 100+ points. Some clients have seen 150+ point increases." },
      { question: "Is credit repair legal?", answer: "Yes, credit repair is 100% legal. You have the right under federal law (FCRA) to dispute inaccurate, incomplete, or unverifiable information on your credit report." },
      { question: "How long does the process take?", answer: "Most clients see significant results within 3-6 months. The dispute process involves multiple rounds spaced 30-45 days apart." },
      { question: "What items can be removed?", answer: "Late payments, collections, charge-offs, repossessions, and other negative items that are inaccurate, incomplete, or unverifiable." },
      { question: "Do I need to stop using my credit cards?", answer: "No, but we'll advise you on optimal credit utilization (keeping balances below 30% of limits) during the repair process." }
    ]
  },
  "funding-assistance": {
    whoIsFor: ["Businesses seeking SBA loans", "Entrepreneurs applying for grants", "Startups looking for capital", "Businesses that have been denied funding"],
    process: ["Assess your funding needs and eligibility", "Prepare financial documents and business plan", "Identify best funding sources and programs", "Submit applications and follow up"],
    results: ["Professional funding applications", "Higher approval rates", "Access to funding sources you didn't know existed"],
    faqs: [
      { question: "What types of funding can you help with?", answer: "SBA loans, bank loans, microloans, grants, lines of credit, equipment financing, and invoice factoring." },
      { question: "Do you guarantee approval?", answer: "No one can guarantee approval, but our professional preparation significantly increases your chances." },
      { question: "What do I need to apply?", answer: "Typically: 2 years of tax returns, current financial statements, business plan, and personal financial statement. We'll create what you're missing." },
      { question: "Can you help if I've been denied before?", answer: "Yes, we analyze the denial reasons, address weaknesses, and reapply to more appropriate lenders." },
      { question: "Do you charge if I don't get funded?", answer: "Our fee covers the preparation and application process regardless of outcome." }
    ]
  },
  "business-loan-guidance": {
    whoIsFor: ["Business owners comparing loan options", "Entrepreneurs unsure about borrowing", "Companies needing working capital", "Anyone navigating the lending process"],
    process: ["Review your financial position and borrowing needs", "Compare loan products and terms", "Prepare documentation checklist", "Introduce you to appropriate lenders"],
    results: ["Clear understanding of your options", "Optimized loan structure for your needs", "Stronger negotiating position"],
    faqs: [
      { question: "What interest rates can I expect?", answer: "Rates depend on your credit, revenue, and loan type. SBA loans range 6-10%, bank loans 5-12%, and alternative lenders 10-30%." },
      { question: "How much can I borrow?", answer: "Generally, lenders look at revenue, cash flow, and collateral. SBA loans go up to $5M, while microloans start at $500." },
      { question: "Should I use personal or business credit?", answer: "Business credit is preferred, but most lenders review both. We'll help you present the strongest application possible." },
      { question: "What collateral do I need?", answer: "Requirements vary by lender. Some SBA loans require collateral, while unsecured lines of credit don't." },
      { question: "How long does approval take?", answer: "Bank loans typically take 2-8 weeks. SBA loans 30-90 days. Alternative lenders can approve in 24-72 hours." }
    ]
  },
  "credit-score-consultation": {
    whoIsFor: ["Anyone wanting to understand their credit", "People planning to apply for loans or mortgages", "Individuals looking to improve their score", "Business owners needing personal credit for business funding"],
    process: ["Pull and review your full credit report", "Identify factors impacting your score", "Create personalized improvement roadmap", "Set up ongoing monitoring"],
    results: ["Clear understanding of your credit position", "Actionable improvement plan", "Strategy for reaching your target score"],
    faqs: [
      { question: "What credit score do I need?", answer: "For most business loans: 680+. For mortgages: 620-740 depending on loan type. We'll set the right target for your goals." },
      { question: "How fast can I improve my score?", answer: "Quick wins like reducing utilization can improve scores in 30 days. Disputes and building history take 3-6 months." },
      { question: "What hurts my score the most?", answer: "Late payments (35% of score), high utilization (30%), and negative items like collections or charge-offs." },
      { question: "Should I close old credit cards?", answer: "Usually no. Closing old accounts reduces your available credit and shortens credit history, both of which can lower your score." },
      { question: "How is this different from credit repair?", answer: "This session focuses on understanding and strategy. If we identify items to dispute, credit repair is the next step." }
    ]
  },
  "seo-mastery": {
    whoIsFor: ["Businesses wanting more website traffic", "Companies not appearing in Google searches", "E-commerce stores needing organic growth", "Service businesses wanting local visibility"],
    process: ["Technical SEO audit of your website", "Keyword research and content strategy", "On-page and off-page optimization", "Monthly ranking reports and adjustments"],
    results: ["Average 200% increase in organic traffic within 6 months", "Top 10 rankings for target keywords", "Measurable ROI through traffic and leads"],
    faqs: [
      { question: "How long before I see results?", answer: "SEO is a long-term strategy. Most clients see initial improvements in 2-3 months, with significant results by month 6." },
      { question: "Do you guarantee first page rankings?", answer: "No ethical SEO provider can guarantee rankings. We focus on sustainable strategies that deliver consistent improvement." },
      { question: "What's included in the monthly package?", answer: "Technical optimization, content creation, link building, local SEO (if applicable), and monthly performance reports." },
      { question: "Do I need a new website?", answer: "Not necessarily. We optimize your existing site. However, if your site has major technical issues, we may recommend improvements." },
      { question: "How do you measure success?", answer: "Organic traffic growth, keyword rankings, conversion rates, and ultimately leads and revenue attributed to organic search." }
    ]
  },
  "content-strategy": {
    whoIsFor: ["Businesses wanting to build authority", "Companies that need consistent content", "Brands looking to engage their audience", "Anyone who doesn't have time to create content"],
    process: ["Develop content strategy and editorial calendar", "Create blog posts, articles, and email campaigns", "Publish and distribute across channels", "Analyze performance and optimize"],
    results: ["Consistent brand voice and messaging", "Increased engagement and lead generation", "Content library that drives traffic for years"],
    faqs: [
      { question: "How many pieces of content per month?", answer: "Our standard package includes 4 blog posts and 4 email campaigns per month. Custom volumes are available." },
      { question: "Do you write in our brand voice?", answer: "Yes, we develop brand guidelines and maintain consistent voice across all content." },
      { question: "What types of content do you create?", answer: "Blog posts, email newsletters, social media content, whitepapers, case studies, and more." },
      { question: "Can I approve content before publishing?", answer: "Absolutely. All content goes through your approval process before going live." },
      { question: "How do you measure content performance?", answer: "Traffic, engagement, email open/click rates, lead generation, and conversion metrics." }
    ]
  },
  "social-media": {
    whoIsFor: ["Businesses wanting to grow their online presence", "Brands that don't have time for social media", "Companies wanting professional social management", "Anyone who needs consistent posting"],
    process: ["Audit current social presence and competitors", "Develop strategy for target platforms", "Create and schedule content weekly", "Engage with audience and report monthly"],
    results: ["Consistent professional social presence", "Growing follower base and engagement", "Measurable brand awareness increase"],
    faqs: [
      { question: "Which platforms do you manage?", answer: "We focus on the platforms most relevant to your business — typically Instagram, LinkedIn, Facebook, and Twitter/X." },
      { question: "How many posts per week?", answer: "Our standard package includes 3-5 posts per week across your primary platforms." },
      { question: "Do you handle comments and messages?", answer: "Yes, community management is included. We respond to comments and DMs during business hours." },
      { question: "Can I approve posts before they go live?", answer: "Yes, we can set up an approval workflow. Most clients prefer to approve the weekly content calendar." },
      { question: "Do you run paid ads?", answer: "Paid social advertising is available as an add-on. We manage ad creation, targeting, and optimization." }
    ]
  },
  "website-development": {
    whoIsFor: ["Businesses needing a professional website", "Companies with outdated websites", "Startups launching their online presence", "Anyone wanting to increase online conversions"],
    process: ["Discovery call to understand goals and brand", "Design mockups and get your approval", "Build responsive, SEO-optimized website", "Launch, test, and hand off with training"],
    results: ["Professional website in 2-4 weeks", "Mobile-responsive and SEO-ready", "Modern design that converts visitors to customers"],
    faqs: [
      { question: "What platform do you build on?", answer: "We build custom sites using modern frameworks. We can also work with WordPress, Shopify, or Squarespace depending on your needs." },
      { question: "Do I own my website?", answer: "Yes, you own everything — the domain, design, content, and code." },
      { question: "Is hosting included?", answer: "We'll help you set up hosting. Hosting costs ($10-50/month) are separate and paid directly to the provider." },
      { question: "Can I update the site myself?", answer: "Yes, we build sites with user-friendly content management and provide training on how to make updates." },
      { question: "Do you offer ongoing maintenance?", answer: "Yes, maintenance packages start at $99/month for updates, security, and performance monitoring." }
    ]
  },
  "brand-identity": {
    whoIsFor: ["New businesses needing a brand from scratch", "Companies wanting to refresh their brand", "Entrepreneurs who need professional branding", "Businesses preparing for a market launch"],
    process: ["Brand discovery workshop (your vision, audience, competitors)", "Develop logo concepts and visual identity", "Create comprehensive brand guidelines", "Deliver complete brand kit"],
    results: ["Professional logo and visual identity", "Complete brand guidelines document", "Social media and marketing brand kit"],
    faqs: [
      { question: "How many logo concepts will I see?", answer: "We present 3 initial concepts and refine your favorite through 2 rounds of revisions." },
      { question: "What's included in the brand kit?", answer: "Logo files (all formats), color palette, typography system, brand voice guidelines, social media templates, and business card design." },
      { question: "Do you do just logos?", answer: "While we can do logo-only projects, we recommend the full brand identity package for a cohesive, professional presence." },
      { question: "How long does the process take?", answer: "1-2 weeks from discovery to final delivery, depending on revision cycles." },
      { question: "Can you apply the brand to my website?", answer: "Yes, we can integrate your new brand identity into website design as a bundled project." }
    ]
  },
  "free-consultation": {
    whoIsFor: ["Anyone considering JECI Group services", "Entrepreneurs who don't know where to start", "Business owners looking for a second opinion", "Anyone with tax, accounting, or business questions"],
    process: ["Tell us about your business and goals", "We assess your current situation", "Identify key opportunities and challenges", "Recommend specific services and next steps"],
    results: ["Clear understanding of your needs", "Personalized recommendations", "No obligation, no pressure"],
    faqs: [
      { question: "Is it really free?", answer: "Yes, 100% free with no obligation. It's our way of ensuring we're the right fit for each other." },
      { question: "How long is the consultation?", answer: "30 minutes via Zoom. We respect your time and pack maximum value into the session." },
      { question: "What should I prepare?", answer: "Just a brief overview of your business, current challenges, and goals. No financial documents needed." },
      { question: "Will you try to sell me something?", answer: "We'll recommend services if appropriate, but there's zero pressure. The consultation is designed to provide value regardless." },
      { question: "Can I bring my business partner?", answer: "Absolutely! We encourage all decision-makers to join the call." }
    ]
  },
  "llc-formation": {
    whoIsFor: ["New business owners", "Freelancers wanting liability protection", "Side hustlers ready to formalize", "Anyone needing a business entity"],
    process: ["Consult on entity structure (LLC vs. S-Corp vs. C-Corp)", "Draft and file Articles of Organization", "Create customized Operating Agreement", "File for EIN and set up business foundations"],
    results: ["Fully formed LLC in as little as 1 week", "Personal liability protection", "Business bank account and credit ready"],
    faqs: [
      { question: "How long does LLC formation take?", answer: "Filing takes 3-7 business days depending on the state. We can expedite in most states for an additional fee." },
      { question: "Should I form an LLC or S-Corp?", answer: "Most new businesses start as LLCs. We'll discuss when/if S-Corp election makes sense based on your projected income." },
      { question: "Which state should I form in?", answer: "Usually your home state. Wyoming or Delaware formation can offer benefits for certain situations — we'll advise on the best option." },
      { question: "Do I need an Operating Agreement?", answer: "Yes, it's included in our package. Even single-member LLCs should have one for liability protection and bank requirements." },
      { question: "What do I do after formation?", answer: "Open a business bank account, get necessary licenses/permits, and set up bookkeeping. We guide you through all of this." }
    ]
  },
  "strategy-session": {
    whoIsFor: ["Business owners at a crossroads", "Entrepreneurs planning their next growth phase", "Anyone needing quick strategic guidance", "Business owners considering pivots or expansions"],
    process: ["Brief pre-session questionnaire", "30-minute focused strategy call", "Discuss challenges and opportunities", "Receive actionable recommendations"],
    results: ["Clear strategic direction", "Immediate actionable takeaways", "Confidence in your next steps"],
    faqs: [
      { question: "What can we cover in 30 minutes?", answer: "We focus on your single most important challenge or decision. Pre-session prep ensures we maximize every minute." },
      { question: "How is this different from the free consultation?", answer: "The free consultation is about discovering your needs. The strategy session dives deep into a specific challenge with concrete recommendations." },
      { question: "Can I book a longer session?", answer: "Yes, our Strategic Business Consultation offers 2.5 hours for a comprehensive deep dive." },
      { question: "Will I get a follow-up document?", answer: "The written strategic plan add-on ($199) provides a comprehensive document with all recommendations." },
      { question: "Can I follow up with questions?", answer: "Yes, the follow-up strategy call add-on ($99) gives you 30 more minutes to discuss implementation." }
    ]
  },
  "strategic-consultation": {
    whoIsFor: ["Established business owners", "Companies planning significant changes", "Businesses seeking comprehensive strategic guidance", "Entrepreneurs building their 3-year plan"],
    process: ["Pre-session business assessment", "2.5-hour deep-dive strategy session", "Financial and operational analysis", "Deliver strategic recommendations and action plan"],
    results: ["Comprehensive business strategy", "Detailed action plan with priorities", "Clear 90-day implementation roadmap"],
    faqs: [
      { question: "What makes this different from the 30-minute session?", answer: "The 2.5-hour format allows us to thoroughly analyze your business, develop detailed strategies, and create a comprehensive action plan." },
      { question: "What should I bring to the session?", answer: "Recent financial statements, current business plan (if any), marketing materials, and a list of your top challenges and goals." },
      { question: "Do I get a written plan?", answer: "Yes, you'll receive a detailed strategic document within 5 business days of our session." },
      { question: "Can this be done via Zoom?", answer: "Yes, all consultations are conducted via Zoom for your convenience." },
      { question: "What industries do you work with?", answer: "We work with all industries, with deep expertise in professional services, real estate, tech, and retail." }
    ]
  },
  "financial-analysis": {
    whoIsFor: ["Business owners who need financial clarity", "Companies applying for funding", "Entrepreneurs building budgets", "Anyone who needs professional financial review"],
    process: ["Collect financial data and records", "Analyze cash flow, profitability, and trends", "Develop budget and financial forecasts", "Present findings and recommendations"],
    results: ["Clear financial picture of your business", "Professional budget and forecast", "Data-driven growth recommendations"],
    faqs: [
      { question: "What data do you need?", answer: "Bank statements, P&L, balance sheet, and any existing financial reports. We'll work with whatever you have." },
      { question: "Can this help me get a loan?", answer: "Absolutely. Our financial analysis package creates the documentation lenders want to see." },
      { question: "How detailed is the forecast?", answer: "We provide 12-month cash flow projections with best, expected, and worst-case scenarios." },
      { question: "Do you compare us to industry benchmarks?", answer: "Yes, we benchmark your key metrics against industry standards so you know where you stand." },
      { question: "Is this a one-time service?", answer: "It can be, but many clients opt for quarterly updates to track progress against projections." }
    ]
  },
  "starter-pack": {
    whoIsFor: ["Early-stage businesses", "Solo entrepreneurs getting started", "Companies with limited budgets", "Anyone wanting foundational business support"],
    process: ["Onboarding call to understand your business", "Set up financial tracking and reporting", "Develop basic customer targeting blueprint", "Bi-weekly check-ins to track progress"],
    results: ["Clear financial snapshot", "Basic brand and customer strategy", "Consistent accountability through check-ins"],
    faqs: [
      { question: "What's the minimum commitment?", answer: "We recommend at least 3 months to see meaningful results, but there's no long-term contract required." },
      { question: "Can I upgrade later?", answer: "Absolutely! Many clients start with Bronze and upgrade as their business grows." },
      { question: "What does a financial snapshot include?", answer: "Revenue tracking, expense categorization, basic P&L, and cash flow overview." },
      { question: "How long are the check-in calls?", answer: "30 minutes, twice per month. Focused on progress, challenges, and next steps." },
      { question: "Is this enough for my business?", answer: "It depends on your stage and needs. Schedule a free consultation and we'll recommend the right tier." }
    ]
  },
  "growth-pack": {
    whoIsFor: ["Growing businesses ready to scale", "Companies wanting detailed financial tracking", "Businesses needing weekly strategic guidance", "Entrepreneurs wanting advanced brand development"],
    process: ["Comprehensive business assessment", "Set up enhanced financial tracking", "Develop detailed customer blueprint", "Weekly strategy calls and brand development"],
    results: ["Detailed financial visibility", "Professional brand presence", "Weekly strategic guidance"],
    faqs: [
      { question: "How is this different from Starter?", answer: "Silver adds weekly check-ins (vs. bi-weekly), enhanced financial tracking, detailed customer blueprints, and advanced brand development." },
      { question: "What's in the customer blueprint?", answer: "Ideal customer profiles, competitor analysis, messaging framework, and channel strategy." },
      { question: "Do you create marketing materials?", answer: "The Silver tier includes brand development. Full marketing material creation is available in Gold and Diamond tiers." },
      { question: "Can I add specific services?", answer: "Yes, all tiers can be customized with add-on services like SEO, content creation, or tax preparation." },
      { question: "What results can I expect?", answer: "Clients typically see 25-50% improvement in financial clarity and actionable growth metrics within 90 days." }
    ]
  },
  "scale-pack": {
    whoIsFor: ["Established businesses with $500K+ revenue", "Companies preparing for rapid growth", "Businesses needing comprehensive support", "Entrepreneurs building systems and processes"],
    process: ["Full process and operations audit", "Identify automation opportunities", "Comprehensive brand audit and strategy", "Build visual identity and growth systems"],
    results: ["Streamlined operations and processes", "Comprehensive brand identity", "Scalable business systems"],
    faqs: [
      { question: "What's included in the process audit?", answer: "We map every business process, identify bottlenecks, and recommend automation and efficiency improvements." },
      { question: "What kind of automation?", answer: "CRM setup, email sequences, invoicing automation, workflow tools, and AI-powered assistants where appropriate." },
      { question: "Is the brand audit different from brand identity?", answer: "Yes, the audit evaluates your current brand positioning. Based on findings, we develop or refine your complete visual identity." },
      { question: "How long until I see ROI?", answer: "Process improvements typically show ROI within 60-90 days through time savings and efficiency gains." },
      { question: "Can I start at Gold without doing Bronze/Silver?", answer: "Yes! Each tier is self-contained. Many clients start at Gold if they're ready for comprehensive support." }
    ]
  },
  "enterprise-pack": {
    whoIsFor: ["Companies with $1M+ revenue", "Businesses with multiple departments", "Organizations needing executive-level support", "Companies planning exits or major transitions"],
    process: ["Executive strategy session and deep analysis", "Develop comprehensive KPI framework", "Build full brand strategy and implementation", "Weekly executive advisory calls"],
    results: ["Executive-level business intelligence", "Comprehensive strategic plan with KPIs", "Full brand strategy and implementation"],
    faqs: [
      { question: "What makes Diamond different?", answer: "Diamond provides executive-level support typically reserved for companies with full-time C-suite staff. You get CFO, CMO, and COO-level guidance." },
      { question: "How often do we meet?", answer: "Weekly or bi-weekly executive advisory calls, plus unlimited email/Slack access to your advisory team." },
      { question: "Can this replace hiring executives?", answer: "For many growing businesses, yes. You get the expertise without the $150K+ salary per executive." },
      { question: "What KPIs do you track?", answer: "Custom KPIs based on your business — revenue metrics, operational efficiency, marketing ROI, customer acquisition cost, and more." },
      { question: "Is there a minimum commitment?", answer: "We recommend 6 months for Diamond to implement and measure the impact of strategies." }
    ]
  },
  "advanced-tax": {
    whoIsFor: ["High-net-worth individuals", "Business owners with multiple entities", "Investors with complex portfolios", "Anyone facing complex tax situations"],
    process: ["Review complex tax situation and entity structure", "Identify advanced strategies and savings", "Develop comprehensive tax reduction plan", "Implement and monitor throughout the year"],
    results: ["Significant tax liability reduction", "Multi-entity optimization", "Advanced strategies most CPAs miss"],
    faqs: [
      { question: "What advanced strategies do you use?", answer: "Captive insurance, cost segregation, charitable remainder trusts, opportunity zone investing, and entity restructuring." },
      { question: "How much can I save?", answer: "Advanced strategies can reduce tax liability by 30-60% for qualifying clients." },
      { question: "Is this legal?", answer: "Absolutely. All strategies are legal, IRS-approved methods. We never recommend aggressive positions that create audit risk." },
      { question: "Do I need this if I already have a CPA?", answer: "If your CPA focuses on compliance (filing returns), they may not be implementing advanced strategies that could save you thousands." },
      { question: "What's the minimum income level?", answer: "These strategies are most impactful for individuals earning $250K+ or businesses with $500K+ in revenue." }
    ]
  },
  "comprehensive-package": {
    whoIsFor: ["Business owners wanting a complete assessment", "Companies at inflection points", "Businesses that need both financial and operational review", "Entrepreneurs planning their next chapter"],
    process: ["Comprehensive business and financial assessment", "Review operations, marketing, and finances", "Develop holistic strategic plan", "Create detailed implementation roadmap"],
    results: ["360-degree business assessment", "Integrated strategy across all functions", "Prioritized action plan"],
    faqs: [
      { question: "What areas do you assess?", answer: "Financial health, operational efficiency, marketing effectiveness, competitive positioning, and organizational structure." },
      { question: "How long is the assessment process?", answer: "The 4-hour session includes pre-work, the assessment itself, and initial recommendations. A detailed report follows within one week." },
      { question: "Is this a one-time engagement?", answer: "It can be, but many clients use this as a launching point for ongoing advisory services." },
      { question: "Can my whole team participate?", answer: "We encourage key team members to join relevant portions of the assessment." },
      { question: "What deliverables do I receive?", answer: "A comprehensive assessment report, strategic recommendations, and a 90-day action plan." }
    ]
  },
  "restructuring": {
    whoIsFor: ["Businesses with inefficient entity structures", "Companies that have outgrown their original setup", "Business owners considering S-Corp or C-Corp election", "Multi-entity business owners"],
    process: ["Review current entity structure and tax implications", "Model alternative structures and their impact", "Recommend optimal restructuring plan", "Coordinate implementation with legal counsel"],
    results: ["Tax-optimized entity structure", "Reduced liability exposure", "Streamlined business operations"],
    faqs: [
      { question: "When should I restructure?", answer: "When your revenue exceeds $50K (S-Corp election), when you have multiple businesses, or when your current structure creates unnecessary tax burden." },
      { question: "Will restructuring cause problems with the IRS?", answer: "Not when done properly. We ensure all restructuring is compliant with IRS regulations and properly documented." },
      { question: "How much can restructuring save?", answer: "S-Corp election alone can save $5,000-$20,000+ annually in self-employment taxes. Multi-entity strategies can save even more." },
      { question: "Do I need a lawyer too?", answer: "For entity changes, yes. We coordinate with attorneys to ensure both legal and tax aspects are handled correctly." },
      { question: "How long does restructuring take?", answer: "Planning takes 1-2 weeks. Implementation varies from 2-6 weeks depending on complexity." }
    ]
  },
  "tax-audit": {
    whoIsFor: ["Businesses needing comprehensive financial review", "Companies preparing for external audits", "Business owners who want total compliance assurance", "Organizations with complex financial structures"],
    process: ["Full review of financial records and tax filings", "Identify compliance gaps and risks", "Assess operational efficiency and controls", "Deliver detailed audit report with recommendations"],
    results: ["Complete compliance assurance", "Identified and resolved risk areas", "Detailed recommendations for improvement"],
    faqs: [
      { question: "Is this an official audit?", answer: "This is an internal review, not a statutory audit. It prepares you for external audits and identifies issues before the IRS does." },
      { question: "How far back do you review?", answer: "Typically 3 years of tax filings and 1-2 years of detailed financial records." },
      { question: "What if you find problems?", answer: "We'll document issues, assess their severity, and provide a remediation plan. We can also amend prior returns if needed." },
      { question: "How often should this be done?", answer: "Annually is ideal. At minimum, every 2-3 years or before major events like selling the business or seeking large funding." },
      { question: "Is the audit report shareable with investors?", answer: "Yes, many clients use our audit reports to demonstrate financial health to investors or lenders." }
    ]
  },
  "transformation": {
    whoIsFor: ["Businesses undergoing major changes", "Companies pivoting their business model", "Organizations planning significant growth", "Business owners preparing for exits or acquisitions"],
    process: ["Deep analysis of current business state", "Develop transformation vision and strategy", "Create detailed implementation plan with milestones", "Guide execution over 90-day sprints"],
    results: ["Complete transformation roadmap", "Restructured operations for growth", "New strategic direction with clear execution plan"],
    faqs: [
      { question: "What does business transformation include?", answer: "Financial restructuring, operational overhaul, market repositioning, and organizational development — a complete business reinvention." },
      { question: "How long does transformation take?", answer: "The initial planning phase is 6 hours. Full implementation typically occurs over 6-12 months in 90-day sprints." },
      { question: "Can I do this in phases?", answer: "Absolutely. We prioritize changes by impact and resource requirements so you can implement in manageable stages." },
      { question: "Do you stay involved during implementation?", answer: "The planning engagement includes the roadmap. Ongoing advisory during implementation is available through our development packages." },
      { question: "What results should I expect?", answer: "Clients typically see 30-50% improvement in operational efficiency and significant revenue growth within 12 months." }
    ]
  },
  "enterprise-dev": {
    whoIsFor: ["Established companies seeking major growth", "Businesses expanding to new markets", "Companies preparing for acquisition or merger", "Organizations building multi-year strategic plans"],
    process: ["Comprehensive business analysis and market research", "Develop multi-year strategic and financial plan", "Build detailed financial models and projections", "Create implementation roadmap with quarterly milestones"],
    results: ["Multi-year strategic growth plan", "Professional financial models", "Board-ready strategic documentation"],
    faqs: [
      { question: "How detailed is the strategic plan?", answer: "Extremely detailed — market analysis, competitive positioning, financial projections, hiring plans, capital requirements, and quarterly milestones." },
      { question: "Can this be used for fundraising?", answer: "Yes, our enterprise plans include investor-ready financial models and pitch-ready documentation." },
      { question: "How many hours of work is involved?", answer: "10 hours of direct client engagement, plus significant research and analysis time by our team." },
      { question: "What industries do you specialize in?", answer: "We have deep expertise across professional services, technology, real estate, and retail, but our strategic frameworks apply to any industry." },
      { question: "Is there ongoing support?", answer: "The engagement delivers the plan. Ongoing implementation support is available through our Diamond tier development package." }
    ]
  }
};

function getDefaultDetails(service: Service): ServiceDetailData {
  return {
    whoIsFor: [
      "Entrepreneurs and business owners",
      "Growing companies seeking professional support",
      "Anyone looking to optimize their business operations"
    ],
    process: [
      "Schedule your consultation",
      "Share your business details and goals",
      "Receive expert analysis and recommendations",
      "Implement strategies with ongoing support"
    ],
    results: [
      "Professional expert guidance",
      "Actionable strategies tailored to your business",
      "Ongoing support and accountability"
    ],
    faqs: [
      { question: "How do I get started?", answer: "Book a consultation through our website or call (202) 430-5078. We'll schedule a time that works for you." },
      { question: "Can this be done remotely?", answer: "Yes, all services are available via Zoom for your convenience." },
      { question: "What should I prepare?", answer: "Any relevant business documents, financial records, and a list of your goals and challenges." },
      { question: "Do you offer payment plans?", answer: "Yes, we offer flexible payment options for larger engagements. A $50 deposit secures most consultations." },
      { question: "What makes JECI different?", answer: "We combine tax expertise, business strategy, credit building, and digital marketing under one roof — a truly holistic approach." }
    ]
  };
}

interface ServiceDetailPageProps {
  id: string;
}

export default function ServiceDetailPage({ id }: ServiceDetailPageProps) {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      await apiRequest("POST", "/api/newsletter", { email: data.email, source: "service-page" });
    },
    onSuccess: () => {
      toast({ title: "Subscribed!", description: "You'll receive our weekly business insights." });
      setEmail('');
    },
    onError: () => {
      toast({ title: "Already subscribed", description: "This email is already on our list." });
    },
  });

  let service: Service | undefined;
  let categoryName = '';
  for (const cat of SERVICE_CATEGORIES) {
    const found = cat.services.find(s => s.id === id);
    if (found) {
      service = found;
      categoryName = cat.name;
      break;
    }
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
          <p className="text-slate-500 mb-8">The service you're looking for doesn't exist.</p>
          <Button onClick={() => setLocation('/explore')}>View All Services</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const details = serviceDetails[id] || getDefaultDetails(service);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2" />
        <div className="container px-4 md:px-6 relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-4">{categoryName}</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="text-service-title">{service.name}</h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
            {service.description.join('. ')}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-white/60 uppercase tracking-widest font-bold mb-1">
                {service.priceString ? "Starting at" : "Investment"}
              </p>
              <p className="text-4xl font-bold text-white">
                {service.price === 0 ? "FREE" : (service.priceString || `$${service.price.toLocaleString()}`)}
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => setLocation('/book')}
              className="bg-secondary text-primary hover:bg-white font-bold h-16 px-10 text-lg shadow-xl"
              data-testid="button-book-hero"
            >
              Book Now <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-10 text-center">Who This Is For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {details.whoIsFor.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 flex items-start gap-3">
                <Users className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="bg-slate-50 rounded-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
            <div className="bg-primary p-10 text-white md:w-1/3 flex flex-col justify-center">
              <h3 className="text-3xl font-serif font-bold mb-4">What's Included</h3>
              <p className="text-white/70 text-sm">Everything you need, packaged for clarity and impact.</p>
            </div>
            <div className="p-10 md:w-2/3">
              <ul className="grid md:grid-cols-2 gap-4">
                {service.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              {service.addOns && service.addOns.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4">Available Add-Ons</h4>
                  <div className="grid gap-3">
                    {service.addOns.map(addon => (
                      <div key={addon.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100">
                        <span className="text-sm font-medium text-slate-700">{addon.name}</span>
                        <span className="text-sm font-bold text-secondary">+${addon.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">How It Works</h2>
          <div className="space-y-8 relative before:absolute before:left-[19px] md:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200">
            {details.process.map((step, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-6 md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2" />
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-secondary border-4 border-white shadow-lg flex items-center justify-center font-bold text-primary z-10">
                  {i + 1}
                </div>
                <div className={`md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="font-bold text-slate-800">{step}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold text-center mb-10">Expected Results</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {details.results.map((result, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                  <Shield className="w-6 h-6" />
                </div>
                <p className="font-bold text-white">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white md:hidden">
        <div className="container px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-3">Get Weekly Business Tips</h3>
            <p className="text-sm text-white/80 mb-4">Join the JECI Edge newsletter</p>
            <form onSubmit={(e) => { e.preventDefault(); newsletterMutation.mutate({ email }); }} className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                data-testid="input-newsletter-mobile"
              />
              <Button type="submit" disabled={newsletterMutation.isPending} className="bg-white text-purple-600 font-bold shrink-0" data-testid="button-newsletter-mobile">
                {newsletterMutation.isPending ? "..." : "Join"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-10 text-slate-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {details.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-bold text-slate-900 text-sm">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="text-sm text-white/60 uppercase tracking-widest font-bold mb-2">
              {service.priceString ? "Starting at" : "Investment"}
            </p>
            <p className="text-5xl font-bold text-secondary mb-4">
              {service.price === 0 ? "FREE" : (service.priceString || `$${service.price.toLocaleString()}`)}
            </p>
            <p className="text-sm text-white/60">{service.duration} session</p>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-white/70 mb-8">
            Secure your session today and take the next step toward your financial goals.
          </p>
          <Button
            size="lg"
            onClick={() => setLocation('/book')}
            className="bg-secondary text-primary hover:bg-white font-bold h-16 px-12 text-lg"
            data-testid="button-book-bottom"
          >
            Book Your Session Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
