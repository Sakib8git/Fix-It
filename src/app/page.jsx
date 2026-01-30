import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import TrustIndicators from "@/Components/TrustIndicators";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero></Hero>
      <TrustIndicators></TrustIndicators>
    </main>
  );
}
