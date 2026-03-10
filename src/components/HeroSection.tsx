import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";
// import heroBg from "/PLURAIS_1.JPG";
import { MusicPlayerCard } from "./MusicPlayerCard";
const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center z-20"
      aria-label="Seção principal - Novo álbum Plurais 2025"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden" 
        style={{ backgroundImage: `url(/PLURAIS_1.JPG)` }}
        role="img"
        aria-label="Palco com luzes vibrantes - Atmosfera de show da banda Plurais"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden="true" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" aria-hidden="true" />

      {/* Content */}
      <header className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        {/* Left Column - Text & Socials */}
        <div className="flex flex-col items-start text-left space-y-8 animate-slide-up">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-xs font-bold text-primary tracking-wider uppercase border border-primary/30">
            Para Todos
          </span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight">
            O seu <span className="text-white">Universo</span><br />
            de <span className="text-white font-black">Músicas</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-xl font-light leading-relaxed">
            Encontre os seus artistas, playlists, podcasts e músicas preferidos em um só lugar.
          </p>

          <nav className="flex flex-wrap gap-4 pt-4" aria-label="Redes Sociais">
            <Button variant="outline" size="lg" className="glass-card hover:bg-white/10 hover:text-white border-white/20">
              <Instagram size={20} className="mr-2" />
              Instagram
            </Button>
            <Button variant="outline" size="lg" className="glass-card hover:bg-white/10 hover:text-white border-white/20">
              <Youtube size={20} className="mr-2" />
              YouTube
            </Button>
            <Button variant="outline" size="icon" className="glass-card hover:bg-white/10 w-12 h-12 border-white/20">
              <Facebook size={20} />
            </Button>
            <Button variant="outline" size="icon" className="glass-card hover:bg-white/10 w-12 h-12 border-white/20">
              <Twitter size={20} />
            </Button>
          </nav>
        </div>

        {/* Right Column - Music Player */}
        <div className="flex justify-center lg:justify-end items-center relative z-50">
          {/* Floating decorative elements behind the player could go here */}
          <div className="w-full max-w-sm relative">
             <MusicPlayerCard />
          </div>
        </div>
      </header>
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