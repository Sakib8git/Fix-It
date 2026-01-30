import CTASection from "@/Components/CTASection";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import HowItWorks from "@/Components/HowItWorks";
import Navbar from "@/Components/Navbar";
import ServicesGrid from "@/Components/ServicesGrid";
import Testimonials from "@/Components/Testimonials";
import TrustIndicators from "@/Components/TrustIndicators";

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
