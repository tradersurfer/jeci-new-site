import ServiceDetail from "@/components/ServiceDetail";
import { Rocket } from "lucide-react";

export default function Growth() {
  return (
    <ServiceDetail
      pillar="3"
      title="The Growth"
      subtitle="Digital Marketing & Innovation"
      icon={Rocket}
      content="Visibility Meets Future-Proof Strategy. Turn searchers into customers with high-leverage growth engines."
      features={[
        {
          title: "Managed Digital Presence",
          description: "From SEO audits to keyword-driven content strategies that turn searchers into customers."
        },
        {
          title: "Bitcoin Ecosystem Advisory",
          description: "For tech-forward founders. Briefing packets on policy research and stablecoin regulations."
        },
        {
          title: "Market Expansion",
          description: "Identifying 2–3 competitors and building strategies to close the gap and lead the industry."
        },
        {
          title: "Innovation Advisory",
          description: "Navigating shifting financial landscapes and technical regulations for modern entrepreneurs."
        }
      ]}
    />
  );
}
