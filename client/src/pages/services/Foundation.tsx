import ServiceDetail from "@/components/ServiceDetail";
import { Shield } from "lucide-react";

export default function Foundation() {
  return (
    <ServiceDetail
      pillar="1"
      title="The Foundation"
      subtitle="Restoration & Formation"
      icon={Shield}
      content="Your Legal and Financial Passport. We don't just file papers; we build a secure base for your sovereign future."
      features={[
        {
          title: "700 Credit Club",
          description: "Our signature interactive, DIY program to remove negative items and restore your borrowing power in 90–120 days."
        },
        {
          title: "New Entity Formation",
          description: "We evaluate tax advantages (LLC vs. S-Corp), handle federal EINs, and draft a Methodical Action Plan."
        },
        {
          title: "Legal Foundation",
          description: "Evaluating tax advantages, legal exposure, and portability for your business structure."
        },
        {
          title: "Institutional Readiness",
          description: "Ensuring your business structure meets the standards required by major financial institutions."
        }
      ]}
    />
  );
}
