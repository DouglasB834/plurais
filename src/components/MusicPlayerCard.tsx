import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, ExternalLink } from 'lucide-react';
import React, { useRef, useEffect } from 'react';

import { useMusicStore } from '@/store/useMusicStore';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

// Define the component so it can be animated or transitioned globally
export const MusicPlayerCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const {
      currentTrack,
      isPlaying,
      togglePlay,
      nextTrack,
      prevTrack,
      currentTime,
      duration,
      setCurrentTime,
      setDuration,
      volume,
      setVolume,
      setAudioElement,
      seekTo,
    } = useMusicStore();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);

    const formatTime = (timeInSeconds: number) => {
      if (!timeInSeconds || Number.isNaN(timeInSeconds)) return '0:00';
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    };

    const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const container = progressBarRef.current;
      const audio = audioRef.current;
      if (!container || !audio) return;

      const rect = container.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const width = rect.width || 0;
      if (width <= 0) return;

      let percent = clickX / width;
      if (percent < 0) percent = 0;
      if (percent > 1) percent = 1;

      const elementDuration =
        !Number.isNaN(audio.duration) && audio.duration > 0
          ? audio.duration
          : 0;
      const baseDuration = elementDuration || duration || 0;
      if (baseDuration <= 0) return;

      const newTime = percent * baseDuration;
      seekTo(newTime);
    };

    // Registra o elemento de áudio globalmente no store
    useEffect(() => {
      if (!audioRef.current) return;
      setAudioElement(audioRef.current);
      return () => {
        setAudioElement(null);
      };
    }, [setAudioElement]);

    // Sync volume with audio element
    useEffect(() => {
      if (!audioRef.current) return;
      audioRef.current.volume = volume / 100;
    }, [volume]);

    // Sync current track & play/pause with audio element
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio || !currentTrack) return;

      if (currentTrack.audioUrl && audio.src !== currentTrack.audioUrl) {
        audio.src = currentTrack.audioUrl;
        audio.load();
      }

      if (isPlaying) {
        audio
          .play()
          .catch(() => {
            // Best-effort; silently ignore autoplay errors
          });
      } else {
        audio.pause();
      }
    }, [currentTrack, isPlaying]);

    // Attach audio event listeners
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handleLoadedMetadata = () => {
        setDuration(audio.duration || 0);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime || 0);
      };

      const handleEnded = () => {
        nextTrack();
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }, [nextTrack, setCurrentTime, setDuration]);

    // Fallback if no track is loaded
    if (!currentTrack) return null;

    return (
      <div 
        ref={ref}
        id="hero-player"
        className={`glass-card rounded-[2rem] p-6 w-full max-w-[320px] flex flex-col gap-6 relative overflow-hidden group hover-lift transition-all duration-300 ${className || ''}`}
        {...props}
      >
        {/* Elemento de áudio único que controla toda a reprodução */}
        <audio ref={audioRef} className="hidden" crossOrigin="anonymous" preload="auto" />
        {/* Decorative inner glow */}
        <div className="absolute top-0 right-0  bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
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
          <h3 className="text-lg font-light text-white/90 truncate w-full">{currentTrack.title}</h3>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-white/70 truncate w-full font-light tracking-wide uppercase">
              {currentTrack.artist}
            </p>
            {currentTrack.externalUrl && (
              <a 
                href={currentTrack.externalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-primary/60 hover:text-primary flex items-center gap-1 mt-1 transition-colors"
              >
                <ExternalLink size={10} />
                Ouvir no Drive
              </a>
            )}
          </div>
        </div>

        {/* Player Controls & Progress */}
        <div className="flex flex-col gap-4">
          
          {/* Progress Bar */}
          <div className="flex flex-col gap-2">
            <div
              ref={progressBarRef}
              onClick={handleProgressClick}
              className="w-full cursor-pointer"
            >
              <Progress
                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                className="h-1 w-full overflow-hidden rounded-full bg-white/20"
              />
            </div>

            
            <div className="flex justify-between text-xs text-white/50 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{duration ? formatTime(duration) : currentTrack.duration || '3:45'}</span>
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
