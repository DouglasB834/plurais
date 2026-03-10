import React, { useRef, useEffect } from 'react';
import { useMusicStore } from '@/store/useMusicStore';
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

// Define the component so it can be animated or transitioned globally
export const MusicPlayerCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, progress, setProgress, volume, setVolume } = useMusicStore();
    
    // Fallback if no track is loaded
    if (!currentTrack) return null;

    return (
      <div 
        ref={ref}
        id="hero-player"
        className={`glass-card rounded-[2rem] p-6 w-full max-w-[320px] flex flex-col gap-6 relative overflow-hidden group hover-lift transition-all duration-300 ${className || ''}`}
        {...props}
      >
        {/* Decorative inner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

        {/* Album Cover */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={currentTrack.coverUrl} 
            alt={`${currentTrack.title} cover`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        </div>

        {/* Track Info */}
        <div className="flex flex-col items-center text-center px-2">
          <h3 className="text-xl font-bold text-white truncate w-full shadow-sm">{currentTrack.title}</h3>
          <p className="text-sm text-white/70 truncate w-full font-light">{currentTrack.artist}</p>
        </div>

        {/* Player Controls & Progress */}
        <div className="flex flex-col gap-4">
          
          {/* Progress Bar */}
          <div className="flex flex-col gap-2">
            <Slider 
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(val) => setProgress(val[0])}
              className="w-full [&_[role=slider]]:bg-primary [&>span:first-child]:bg-white/20"
            />
            <div className="flex justify-between text-xs text-white/50 font-mono">
              <span>0:00</span>
              <span>{currentTrack.duration || '3:45'}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 px-2 group/volume">
            <button className="text-white/50 hover:text-white transition-colors">
              <span className="sr-only">Volume</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            </button>
            <Slider 
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(val) => setVolume(val[0])}
              className="w-full h-1.5 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-white [&>span:first-child]:bg-white/20"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between px-2">
            <button className="text-white/50 hover:text-white transition-colors">
              <Shuffle size={18} />
            </button>
            <button onClick={prevTrack} className="text-white/70 hover:text-white transition-colors">
              <SkipBack size={24} fill="currentColor" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-105"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>

            <button onClick={nextTrack} className="text-white/70 hover:text-white transition-colors">
              <SkipForward size={24} fill="currentColor" />
            </button>
            <button className="text-white/50 hover:text-white transition-colors">
              <Repeat size={18} />
            </button>
          </div>

        </div>
      </div>
    );
  }
);

MusicPlayerCard.displayName = 'MusicPlayerCard';
