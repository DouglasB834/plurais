export type AudioProvider = 'drive' | 'spotify' | 'other';

export interface TrackPhoto {
  url: string;
  alt?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl?: string;
  youtubeUrl?: string;
  duration?: string;
  /**
   * Lista de fotos relacionadas à faixa.
   * A primeira foto é usada como capa / destaque.
   */
  photos?: TrackPhoto[];
  /**
   * Indica de onde vem o áudio da faixa.
   * Hoje: 'drive'. Futuro: 'spotify' ou outro provider.
   */
  audioProvider?: AudioProvider;
  /**
   * Identificador/URL externa opcional (ex.: URL do Spotify).
   */
  externalUrl?: string;
}

