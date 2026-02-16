import React from 'react';
import ServiceLandingPage from '../ServiceLandingPage';

export default function LlcFormation() {
  return (
    <ServiceLandingPage
      title="Single Member LLC Formation"
      subtitle="Start Your Business with Ironclad Protection"
      price="$599"
      description="More than just filing papers. We structure your entity for maximum tax efficiency, liability protection, and operational readiness from Day 1."
      benefits={[
        "Liability Protection",
        "Tax Flexibility (S-Corp ready)",
        "Professional Credibility"
      ]}
      features={[
        "Articles of Organization (Drafted & Filed)",
        "Custom Operating Agreement",
        "Federal EIN Obtainment",
        "Banking Resolution Documents",
        "Home Office Compliance Setup"
      ]}
      process={[
        "Strategy call to confirm state & name",
        "We draft and file all legal documents",
        "We obtain your EIN from the IRS",
        "Delivery of your Digital Corporate Kit"
      ]}
      faqs={[
        { question: "Why choose LLC over Sole Proprietorship?", answer: "An LLC separates your personal assets from business liabilities. If the business is sued, your house is safe." },
        { question: "How long does formation take?", answer: "Typically 5-10 business days depending on the state's processing speed." },
        { question: "Do I need a separate bank account?", answer: "Yes! Commingling funds pierces the corporate veil and negates your liability protection." }
      ]}
      testimonials={[
        { text: "Fast, professional, and they explained every step.", author: "Marcus T.", role: "Consultant" },
        { text: "Got my EIN and Operating Agreement in under a week.", author: "Rachel G.", role: "E-commerce Founder" }
      ]}
    />
  );
}
