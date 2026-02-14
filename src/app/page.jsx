import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import TrustIndicators from "@/components/TrustIndicators";

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
