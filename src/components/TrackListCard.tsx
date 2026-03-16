import { Play, Pause } from 'lucide-react';
import React, { useRef } from 'react';

import { Track, useMusicStore } from '@/store/useMusicStore';

import { Button } from './ui/button';
import { AnimatedTestimonials } from './ui/animated-testimonials';

export const TrackListCard = ({ track, index }: { track: Track; index: number }) => {
  const {
    currentTrack,
    playTrack,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seekTo,
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

  const handleProgressClickOnList = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isThisTrackPlaying || duration <= 0) return;

    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width || 0;
    if (width <= 0) return;

    let percent = clickX / width;
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    const newTime = percent * duration;
    seekTo(newTime);
  };

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || Number.isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const testimonials = [
    {
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {

      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {

      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
          <h3 className="text-xl md:text-3xl font-display text-white mb-2 leading-tight">{track.title}</h3>
          <p className="text-lg text-white/60 font-light">{track.artist}</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              onClick={handlePlayClick}
              variant="outline" 
              size="icon" 
              className="w-14 h-14 rounded-full glass-card hover:bg-white/20 border-white/30 text-white flex-shrink-0 transition-transform active:scale-95"
            >
              {isThisTrackPlaying && isPlaying ? (
                <Pause size={28} fill="currentColor" />
              ) : (
                <Play size={28} fill="currentColor" className="ml-1" />
              )}
            </Button>
            <figure className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-white/10">
              <AnimatedTestimonials autoplay embedded testimonials={testimonials} />
            </figure>
          </div>

          {/* Barra de progresso sincronizada com o player principal */}
          <div
            className="flex w-full h-1.5 rounded-md bg-white/10 overflow-hidden cursor-pointer"
            onClick={handleProgressClickOnList}
          >
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
          <span className="text-white/40 text-sm font-mono tracking-widest">
              {isThisTrackPlaying && duration > 0
                ? formatTime(duration - currentTime)
                : track.duration || '0:00'}
            </span>
        </div>
      </div>
    </div>
  );
};
