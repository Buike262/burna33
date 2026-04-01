import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import TicketsSection from "@/components/TicketsSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <TicketsSection />
      <GallerySection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
