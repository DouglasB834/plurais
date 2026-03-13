import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl?: string;
  youtubeUrl?: string;
  duration?: string;
}

interface MusicStoreState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setProgress: (progress: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

// Temporary mock tracks for initial testing
export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Stay (with Justin Bieber)',
    artist: 'The Kid LAROI, Justin Bieber',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop', // Temporary placeholder
    youtubeUrl: 'https://www.youtube.com/embed/kTJczUoc26U?enablejsapi=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // valid dummy audio
    duration: '2:21',
  },
  {
    id: '2',
    title: 'Drops of Jupiter (Tell Me)',
    artist: 'Train',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=500&auto=format&fit=crop', // Temporary placeholder
    youtubeUrl: 'https://www.youtube.com/embed/7Xf-Lesrkuc?enablejsapi=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '4:19',
  },
  {
    id: '3',
    title: 'Desabafo Sem Freio',
    artist: 'Plurais',
    coverUrl: '/PLURAIS_1.JPG',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1', // Placeholder
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '3:45',
  }
];

export const useMusicStore = create<MusicStoreState>((set, get) => ({
  currentTrack: mockTracks[0],
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
  volume: 50,
  
  playTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
      progress: 0,
      currentTime: 0,
      duration: 0,
    }),
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  // Mantido para compatibilidade, mas o progresso agora é calculado a partir de currentTime/duration
  setProgress: (progress) => set({ progress }),

  setCurrentTime: (time) =>
    set((state) => {
      const safeDuration = state.duration || 0;
      const progress = safeDuration > 0 ? (time / safeDuration) * 100 : 0;
      return {
        currentTime: time,
        progress,
      };
    }),

  setDuration: (duration) =>
    set((state) => {
      const safeDuration = duration || 0;
      const progress =
        safeDuration > 0 ? (state.currentTime / safeDuration) * 100 : 0;
      return {
        duration: safeDuration,
        progress,
      };
    }),

  setVolume: (volume) => set({ volume }),
  
  // Dummy logic for next/prev. Will be expanded if we have a real queue
  nextTrack: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockTracks.length;
    set({
      currentTrack: mockTracks[nextIndex],
      isPlaying: true,
      progress: 0,
      currentTime: 0,
      duration: 0,
    });
  },
  
  prevTrack: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + mockTracks.length) % mockTracks.length;
    set({
      currentTrack: mockTracks[prevIndex],
      isPlaying: true,
      progress: 0,
      currentTime: 0,
      duration: 0,
    });
  }
}));
