import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { Footer } from "@/components/landing/footer";

export default function RootMarketingLandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden bg-[#F4F1E8]">
      
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
