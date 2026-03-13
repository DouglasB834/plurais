import { Play, Pause } from 'lucide-react';
import React, { useRef } from 'react';

import { Track, useMusicStore } from '@/store/useMusicStore';

import { Button } from './ui/button';

export const TrackListCard = ({ track, index }: { track: Track; index: number }) => {
  const {
    currentTrack,
    playTrack,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
  } = useMusicStore();
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
      className={`relative flex flex-col md:flex-row w-full max-w-5xl mx-auto my-11 group ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Parte principal/maior do \"L\" (Vídeo ou Imagem grande) */}
      <div 
        className={`track-video-area  bg-white/10 p-2 md:p-4   flex flex-col justify-center w-full md:w-2/3 aspect-video relative overflow-hidden transition-all duration-700 ${isEven ? 'md:rounded-tr-xl md:rounded-l-xl' : 'md:rounded-bl-xl md:rounded-r-xl'} `}
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

      {/* Parte menor do \"L\" (Informações da faixa) */}
      <div 
        className={`track-info-area bg-white/10 p-6 md:p-8  flex flex-col w-full md:w-1/3 justify-center md:justify-between transition-all duration-700 ${
          isEven ? 'md:self-end md:rounded-r-[2rem]' : 'md:self-start md:rounded-l-[2rem]'
        }`} 
        style={{ minHeight: '200px' }} 
      >
        <div>
          <h3 className="text-2xl md:text-3xl font-display text-white mb-2 leading-tight">{track.title}</h3>
          <p className="text-lg text-white/60 font-light">{track.artist}</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-6">
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

            <span className="text-white/40 text-lg font-mono tracking-widest">
              {track.duration || '0:00'}
            </span>
          </div>

          {/* Barra de progresso sincronizada com o player principal */}
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-200 ${
                isThisTrackPlaying ? 'bg-primary' : 'bg-transparent'
              }`}
              style={{
                width:
                  isThisTrackPlaying && duration > 0
                    ? `${(currentTime / duration) * 100}%`
                    : '0%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
