import React from 'react';
import ServiceLandingPage from '../ServiceLandingPage';

export default function FreeConsultation() {
  return (
    <ServiceLandingPage
      title="FREE Business Consultation"
      subtitle="Valued at $150 - Yours for $0"
      price="FREE"
      description="Not sure where to start? Let's have a 30-minute chat to analyze your financial health and identify your biggest opportunities for growth."
      benefits={[
        "No Obligation",
        "Expert Insight",
        "Clear Next Steps"
      ]}
      features={[
        "Personalized Financial Analysis",
        "Strategic Tax Guidance",
        "Business Growth Insights",
        "Goal-Oriented Planning",
        "Q&A with a JECI Expert"
      ]}
      process={[
        "Book your 30-minute slot",
        "Complete a brief pre-call questionnaire",
        "Join the Zoom call",
        "Receive a summary of recommendations"
      ]}
      faqs={[
        { question: "Is it really free?", answer: "Yes. We believe in building relationships first. If we can help you, we'll tell you how. If not, we'll point you in the right direction." },
        { question: "What should I prepare?", answer: "Just bring your questions and a general idea of your revenue and goals." }
      ]}
      testimonials={[
        { text: "I learned more in 30 minutes than I did in 3 years of trying to figure it out myself.", author: "James D.", role: "Startup Founder" },
        { text: "No hard selling, just great advice.", author: "Maria S.", role: "Freelancer" }
      ]}
      ctaText="Book Free Call"
    />
  );
}
