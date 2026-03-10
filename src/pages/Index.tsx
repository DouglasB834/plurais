import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AlbumSection from "@/components/AlbumSection";
import AgendaSection from "@/components/AgendaSection";
import PlaylistSection from "@/components/PlaylistSection";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import { useMusicStore } from "@/store/useMusicStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger, Flip);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentTrack, isPlaying, volume, setProgress, nextTrack } = useMusicStore();

  // Handle Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Handle Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle Time Update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress || 0);
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global Audio Element */}
      <audio 
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
      <Navbar />
      <SocialLinks />
      <HeroSection />
      {/* <AboutSection /> */}
      {/* <AlbumSection /> */}
      {/* <AgendaSection /> */}
      <PlaylistSection />
      {/* <Footer /> */}
    </main>
  );
};

export default Index;
