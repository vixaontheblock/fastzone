import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import FeaturedInventory from "@/components/sections/featured-inventory";
import WhyFastZone from "@/components/sections/why-fastzone";
import CTA from "@/components/sections/cta";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <FeaturedInventory />
      <WhyFastZone />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}