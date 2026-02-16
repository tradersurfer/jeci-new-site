import React from 'react';
import ServiceLandingPage from '../ServiceLandingPage';

export default function IndividualTax() {
  return (
    <ServiceLandingPage
      title="Individual Tax Preparation"
      subtitle="Maximize Your Refund. Minimize Your Stress."
      price="$399"
      description="Stop leaving money on the table with generic tax software. Our CPA-reviewed process ensures you claim every deduction and credit you're entitled to."
      benefits={[
        "Audit Support",
        "Accuracy Guarantee",
        "Year-Round Advice"
      ]}
      features={[
        "Federal & State Filing",
        "Itemized Deduction Optimization",
        "Capital Gains/Loss Review",
        "W-4 Withholding Adjustment",
        "Electronic Filing & Direct Deposit"
      ]}
      process={[
        "Secure document upload via our portal",
        "Professional preparation & review",
        "Review call to explain your return",
        "E-filing upon your approval"
      ]}
      faqs={[
        { question: "What documents do I need?", answer: "W-2s, 1099s, mortgage interest statements, and any records of deductible expenses." },
        { question: "How long does it take?", answer: "Typically 5-7 business days once we have all your documents." },
        { question: "Do you handle state returns?", answer: "Yes, we file for all 50 states." }
      ]}
      testimonials={[
        { text: "They found a $2,000 credit I missed for the last 3 years.", author: "Robert L.", role: "Engineer" },
        { text: "Pain-free process. Highly recommend.", author: "Amanda W.", role: "Teacher" }
      ]}
    />
  );
}
