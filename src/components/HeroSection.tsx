import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { MusicPlayerCard } from "./MusicPlayerCard";
// import heroBg from "/PLURAIS_1.JPG";

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-start justify-center z-20 mt-20"
      aria-label="Seção principal - Novo álbum Plurais 2025"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center lg:max-w-[1600px] bg-no-repeat overflow-hidden" 
        style={{ backgroundImage: `url(/PLURAIS_1.JPG)` }}
        role="img"
        aria-label="Palco com luzes vibrantes - Atmosfera de show da banda Plurais"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden="true" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" aria-hidden="true"/>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[80vh]">
        {/* Left Column - Text & Socials */}
        <div className="flex flex-col items-start text-left space-y-10 animate-slide-up">
          <nav className="flex flex-wrap gap-4 pt-4 max-auto justify-center" aria-label="Redes Sociais">
            <Link to="https://www.instagram.com/pluraisoficial/">
              <img
                src="/instagram-cut.png"
                alt="Instagram"
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
            </Link>

            <Link to="https://www.youtube.com/@plurais">
              <img
                src="Youtube.png"
                alt="YouTube"
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
            </Link>

            <Link
              to={" https://www.facebook.com/pluraisoficial/"}
            >
              <img src="/facebook.svg" alt="Facebook"  className="w-12 h-12 hover:scale-110 transition-all duration-300" />
            </Link>

            <Link to="https://www.youtube.com/@plurais">
              <img
                src="/Twitter-cut.png"
                alt="Twitter"
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </nav>
        </div>

        {/* Right Column - Music Player */}
        <div className="flex justify-center lg:justify-end items-center relative z-50">
          {/* Floating decorative elements behind the player could go here */}
          <div className="w-full max-w-sm relative">
             <MusicPlayerCard />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float z-20">
        <a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
          aria-label="Rolar para conhecer mais"
        >
          <span className="sr-only">Scroll para baixo</span>
        </a>
      </div>

      {/* Marquee Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 border-t border-border/30 bg-background/50 backdrop-blur-sm" aria-hidden="true">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="mx-8 text-muted-foreground font-display text-xl tracking-widest">
              DESABAFO SEM FREIO • MASHUPS • BRASIL • RIO BEATS • GRAFFITI • PLURAIS •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;