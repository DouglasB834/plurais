import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMusicStore, mockTracks } from "@/store/useMusicStore";
import { TrackListCard } from "./TrackListCard";

gsap.registerPlugin(ScrollTrigger);

const PlaylistSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Hero Player "Fit" Animation
      const heroPlayer = document.querySelector("#hero-player");
      const firstTrack = document.querySelector("#first-track-card");
      
      if (heroPlayer && firstTrack) {
        const infoArea = firstTrack.querySelector(".track-info-area");

        // Ensure origin is set for smooth scaling
        gsap.set(heroPlayer, { transformOrigin: "center center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", 
            end: "top 15%",     
            scrub: 0.5,
          }
        });

        tl.to(heroPlayer, {
          x: () => {
             const heroRect = heroPlayer.getBoundingClientRect();
             const targetRect = infoArea?.getBoundingClientRect() || firstTrack.getBoundingClientRect();
             const currentTransformX = parseFloat(gsap.getProperty(heroPlayer, "x") as string || "0");
             
             // Calculate center to center
             const heroCenterX = heroRect.left + heroRect.width / 2;
             const targetCenterX = targetRect.left + targetRect.width / 2;
             return currentTransformX + (targetCenterX - heroCenterX);
          },
          y: () => {
             const heroRect = heroPlayer.getBoundingClientRect();
             const targetRect = infoArea?.getBoundingClientRect() || firstTrack.getBoundingClientRect();
             const currentTransformY = parseFloat(gsap.getProperty(heroPlayer, "y") as string || "0");
             
             // Calculate center to center
             const heroCenterY = heroRect.top + heroRect.height / 2;
             const targetCenterY = targetRect.top + targetRect.height / 2;
             return currentTransformY + (targetCenterY - heroCenterY);
          },
          scale: () => {
             const heroRect = heroPlayer.getBoundingClientRect();
             const targetRect = infoArea?.getBoundingClientRect() || firstTrack.getBoundingClientRect();
             // Scale based on the smaller card width (infoArea)
             return (targetRect.width * 0.95) / heroRect.width;
          },
          borderRadius: "2rem",
          ease: "power2.inOut"
        })
        .to(heroPlayer, {
          opacity: 0,
          duration: 0.1,
          ease: "none"
        }, ">-0.1")
        .to(infoArea, {
          opacity: 1,
          duration: 0.2,
          ease: "back.out(1.2)"
        }, "<");
      }

      // Animate track cards (Stacking / Stagger effect)
      if (listRef.current) {
        const cards = listRef.current.children;
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="playlist" className="relative py-32 overflow-hidden bg-background z-10">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-card border border-white/10 text-xs font-bold text-white mb-6 tracking-widest uppercase">
            A Experiência
          </span>
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-white leading-tight">
            Descubra as <span className="text-gradient-primary">Faixas</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            Mergulhe na nossa seleção exclusiva. Clique no card para alterar a música que domina todo o ambiente do site.
          </p>
        </div>

        {/* Tracks Zig-Zag List */}
        <div ref={listRef} className="flex flex-col w-full">
          {mockTracks.map((track, index) => (
            <TrackListCard key={track.id} track={track} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PlaylistSection;
