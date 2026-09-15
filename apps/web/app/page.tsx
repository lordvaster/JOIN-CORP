import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats-section";
import { ServicesBento } from "@/components/sections/services-bento";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ContactCta } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesBento />
      <PortfolioPreview />
      <ContactCta />
    </>
  );
}
