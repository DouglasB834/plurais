import { mockTracks, useMusicStore } from "@/store/useMusicStore";
import { useTracks } from "@/lib/tracks/useTracks";
import { TrackListCard } from "./TrackListCard";
import { useEffect } from "react";

const PlaylistSection = () => {
  const { data: driveTracks, isLoading } = useTracks();
  const { setQueue } = useMusicStore();

  useEffect(() => {
    if (driveTracks && driveTracks.length > 0) {
      setQueue(driveTracks);
    }
  }, [driveTracks, setQueue]);

  const tracks = driveTracks && driveTracks.length > 0 ? driveTracks : mockTracks;
  console.log(tracks, "lista de musica e fotos ")
  return (
    <section id="playlist" className="relative py-32 overflow-hidden bg-background z-10">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-white leading-tight">
            Descubra as <span className="text-gradient-primary">Faixas</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            Mergulhe na nossa seleção exclusiva. Clique no card para alterar a música que domina todo o ambiente do site.
          </p>
        </div>

        {/* Tracks List */}
        <div className="flex flex-col w-full">
          {isLoading && !driveTracks && (
            <p className="text-white/60 text-sm mb-4">Carregando faixas do Drive…</p>
          )}
          {tracks.map((track, index) => (
            <TrackListCard key={track.id} track={track} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PlaylistSection;
