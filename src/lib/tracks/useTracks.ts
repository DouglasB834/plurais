import { useQuery } from '@tanstack/react-query';

import type { Track } from './types';
import { getTracksFromDrive } from './drive-service';

const TRACKS_QUERY_KEY = ['tracks', 'drive'];

async function fetchTracks(): Promise<Track[]> {
  return getTracksFromDrive();
}

export function useTracks() {
  return useQuery<Track[]>({
    queryKey: TRACKS_QUERY_KEY,
    queryFn: fetchTracks,
    staleTime: 1000 * 60 * 5,
  });
}

