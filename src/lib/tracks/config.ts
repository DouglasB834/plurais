import type { AudioProvider } from './types';

export const DRIVE_ROOT_FOLDER_ID =
  import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID ?? '';

export const AUDIO_PROVIDER: AudioProvider =
  (import.meta.env.VITE_AUDIO_PROVIDER as AudioProvider) || 'drive';

const DRIVE_BASE_VIEW_URL = 'https://drive.google.com/uc';

export function buildDriveFileUrl(fileId: string, opts?: { download?: boolean; thumbnail?: boolean }) {
  if (opts?.thumbnail) {
    // Thumbnails são muito mais confiáveis para renderizar imagens do Drive no front-end
    // sem cair em avisos de vírus ou redirecionamentos de download.
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  }
  const exportType = opts?.download ? 'download' : 'view';
  return `${DRIVE_BASE_VIEW_URL}?export=${exportType}&id=${fileId}`;
}

export function buildAudioUrl(
  source: { provider?: AudioProvider; fileId?: string; externalUrl?: string }
): string | undefined {
  const provider = source.provider ?? AUDIO_PROVIDER;

  if (provider === 'drive') {
    if (!source.fileId) return undefined;
    return buildDriveFileUrl(source.fileId, { download: false });
  }

  if (provider === 'spotify') {
    return source.externalUrl;
  }

  return source.externalUrl ?? (source.fileId ? buildDriveFileUrl(source.fileId) : undefined);
}

