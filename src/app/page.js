
import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";


export default function Home() {
  return (
   <div>
    <StatsSection/>
    <HeroSection/>
    <FeaturesSection/>
    <PricingSection/>
    <CTASection/>
   </div>
  );
}
