import CTASection from "@/components_temp/CTASection";
import Footer from "@/components_temp/Footer";
import Hero from "@/components_temp/Hero";
import HowItWorks from "@/components_temp/HowItWorks";
import Navbar from "@/components_temp/Navbar";
import ServicesGrid from "@/components_temp/ServicesGrid";
import Testimonials from "@/components_temp/Testimonials";
import TrustIndicators from "@/components_temp/TrustIndicators";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero></Hero>
      <TrustIndicators></TrustIndicators>
      <ServicesGrid></ServicesGrid>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <CTASection></CTASection>
      <Footer></Footer>
    </main>
  );
}
