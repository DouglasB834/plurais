import React, { useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Track, useMusicStore } from '@/store/useMusicStore';
import { Button } from './ui/button';

export const TrackListCard = ({ track, index }: { track: Track; index: number }) => {
  const { currentTrack, playTrack, isPlaying, togglePlay } = useMusicStore();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const isThisTrackPlaying = currentTrack?.id === track.id;
  const isEven = index % 2 === 0;

  const handlePlayClick = () => {
    if (isThisTrackPlaying) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div 
      ref={cardRef} 
      id={index === 0 ? "first-track-card" : undefined}
      className={`relative flex flex-col md:flex-row gap-4 w-full max-w-5xl mx-auto my-11 group ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Parte principal/maior do "L" (Vídeo ou Imagem grande) */}
      <div 
        className={`track-video-area glass-card p-2 md:p-4 rounded-[2rem] flex flex-col justify-center w-full md:w-2/3 aspect-video relative overflow-hidden transition-all duration-700 hover:border-white/30`}
      >
        {track.youtubeUrl ? (
          <iframe 
            src={track.youtubeUrl} 
            title={track.title}
            className="w-full h-full rounded-xl object-cover pointer-events-auto"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        ) : (
           <img 
            src={track.coverUrl} 
            alt={track.title} 
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      {/* Parte menor do "L" (Informações da faixa) */}
      <div 
        className={`track-info-area glass-card p-6 md:p-8 rounded-[2rem] flex flex-col w-full md:w-1/3 justify-center md:justify-between transition-all duration-700 hover:border-white/30 ${
          isEven ? 'md:self-end' : 'md:self-start'
        } ${index === 0 ? 'opacity-0' : ''}`} 
        style={{ minHeight: '200px' }}
      >
        <div>
          <h3 className="text-2xl md:text-3xl font-display text-white mb-2 leading-tight">{track.title}</h3>
          <p className="text-lg text-white/60 font-light">{track.artist}</p>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <Button 
            onClick={handlePlayClick}
            variant="outline" 
            size="icon" 
            className="w-16 h-16 rounded-full glass-card hover:bg-white/20 border-white/30 text-white flex-shrink-0 transition-transform active:scale-95"
          >
            {isThisTrackPlaying && isPlaying ? (
               <Pause size={28} fill="currentColor" />
            ) : (
               <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </Button>

          <span className="text-white/40 text-lg font-mono tracking-widest">{track.duration || '0:00'}</span>
        </div>
      </div>
    </div>
  );
};
