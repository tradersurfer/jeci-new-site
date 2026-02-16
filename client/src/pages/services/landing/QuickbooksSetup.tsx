import React from 'react';
import ServiceLandingPage from '../ServiceLandingPage';

export default function QuickbooksSetup() {
  return (
    <ServiceLandingPage
      title="QuickBooks Initial Setup"
      subtitle="Stop Guessing. Start Knowing Your Numbers."
      price="$349"
      description="A messy backend kills businesses. We configure your QuickBooks specifically for your industry so you have clearer insights and cleaner tax returns."
      benefits={[
        "Bank-Ready Financials",
        "Automated Workflows",
        "Tax Season Peace of Mind"
      ]}
      features={[
        "Chart of Accounts Customization",
        "Bank Feed Connections",
        "Invoice & Bill Pay Templates",
        "Payroll Integration Setup",
        "1-Hour Training Session"
      ]}
      process={[
        "Assessment of current accounting method",
        "Configuration of QBO file",
        "Historical data import (if needed)",
        "Training call to hand over the keys"
      ]}
      faqs={[
        { question: "Which QuickBooks version is best?", answer: "For most service businesses, QBO Simple Start or Essentials is perfect. We'll help you pick." },
        { question: "Can you migrate from Excel?", answer: "Yes, we can import your customer and vendor lists and opening balances." },
        { question: "Do you provide ongoing support?", answer: "Yes, we offer monthly bookkeeping packages starting at $149/mo so you never have to touch it again." }
      ]}
      testimonials={[
        { text: "My books were a disaster. JECI fixed them in 2 days.", author: "Tom B.", role: "Contractor" },
        { text: "The training session was worth the price alone.", author: "Lisa P.", role: "Agency Owner" }
      ]}
    />
  );
}
