import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import AboutSection from "@/components/AboutSection";
import AgendaSection from "@/components/AgendaSection";
import AlbumSection from "@/components/AlbumSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PlaylistSection from "@/components/PlaylistSection";
import SocialLinks from "@/components/SocialLinks";

// Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger, Flip);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <SocialLinks />
      <HeroSection />
      {/* <AboutSection /> */}
      {/* <AlbumSection /> */}
      <PlaylistSection />
      <AgendaSection />
      {/* <Footer /> */}
    </main>
  );
};

export default Index;
