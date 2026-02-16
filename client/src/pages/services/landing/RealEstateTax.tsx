import React from 'react';
import ServiceLandingPage from '../ServiceLandingPage';

export default function RealEstateTax() {
  return (
    <ServiceLandingPage
      title="Real Estate Tax Planning"
      subtitle="Maximize Cash Flow for Landlords & Investors"
      price="$399"
      description="Rental property tax strategies that go beyond the basics. We help you utilize depreciation, 1031 exchanges, and cost segregation to keep more of your rental income."
      benefits={[
        "Accelerated Depreciation",
        "Passive Loss Usage",
        "1031 Exchange Ready"
      ]}
      features={[
        "Rental expense optimization audit",
        "Depreciation schedule analysis",
        "Cost segregation feasibility check",
        "1031 Exchange roadmap",
        "Short-term rental (Airbnb) strategy"
      ]}
      process={[
        "Review current portfolio & entity structure",
        "Analyze past returns for missed depreciation",
        "Develop forward-looking tax minimization plan",
        "Implementation roadmap for current tax year"
      ]}
      faqs={[
        { question: "What rental expenses are deductible?", answer: "Mortgage interest, property tax, operating expenses, depreciation, and repairs are standard. We find the hidden ones." },
        { question: "How does depreciation work?", answer: "It allows you to deduct the cost of buying the property over 27.5 years, shielding cash flow from tax." },
        { question: "What is a 1031 exchange?", answer: "A strategy to defer capital gains tax by rolling proceeds from one property into another like-kind property." }
      ]}
      testimonials={[
        { text: "The cost segregation advice alone saved me 5 figures this year.", author: "David K.", role: "Multi-Family Investor" },
        { text: "Essential partner for my Airbnb business.", author: "Jessica M.", role: "Short-Term Rental Host" }
      ]}
    />
  );
}
