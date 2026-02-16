import React from 'react';
import ServiceLandingPage from '../ServiceLandingPage';

export default function BusinessStrategy() {
  return (
    <ServiceLandingPage
      title="Business Strategy Session"
      subtitle="A Roadmap for Growth & Efficiency"
      price="$149"
      description="Feeling stuck? Our 30-minute high-impact strategy session is designed to unclog your operations and clarify your path to revenue growth."
      benefits={[
        "Actionable Insights",
        "Operational Clarity",
        "Revenue Focus"
      ]}
      features={[
        "Current State Operations Review",
        "Bottleneck Identification",
        "Growth Opportunity Mapping",
        "Technology Stack Recommendations",
        "Priority Action Plan"
      ]}
      process={[
        "Pre-session business audit form",
        "30-minute intensive strategy call",
        "Live problem solving",
        "Follow-up email with resources"
      ]}
      faqs={[
        { question: "Is 30 minutes enough?", answer: "You'd be surprised. We skip the fluff and get straight to the biggest levers in your business." },
        { question: "Can I get a written plan?", answer: "Yes, you can add a written strategic plan document for an additional $199." }
      ]}
      testimonials={[
        { text: "That one idea about my pricing model paid for the session 10x over.", author: "Chris P.", role: "Agency Owner" },
        { text: "Finally clarity on my next steps.", author: "Jennifer H.", role: "Retail Founder" }
      ]}
      ctaText="Book Strategy Session"
    />
  );
}
