import type { AudioProvider } from './types';

export const DRIVE_ROOT_FOLDER_ID =
  import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID ?? '';

export const AUDIO_PROVIDER: AudioProvider =
  (import.meta.env.VITE_AUDIO_PROVIDER as AudioProvider) || 'drive';

export const DRIVE_API_KEY =
  import.meta.env.VITE_GOOGLE_DRIVE_API_KEY ?? '';

const DRIVE_BASE_VIEW_URL = 'https://docs.google.com/uc';

export function buildDriveFileUrl(fileId: string, opts?: { download?: boolean; thumbnail?: boolean }) {
  if (opts?.thumbnail) {
    // LH3 é o servidor de imagens do Google que funciona muito melhor para renderizar diretamente no front-end
    // sem redirecionamentos ou problemas de CORS/ORB.
    return `https://lh3.googleusercontent.com/d/${fileId}=w1200`;
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
    // Endpoint oficial da API do Google Drive para mídia (mais confiável para streaming)
    // Usar alt=media com a chave de API evita muitos erros de 403 e redirecionamentos
    return `https://www.googleapis.com/drive/v3/files/${source.fileId}?alt=media&key=${DRIVE_API_KEY}`;
  }

  if (provider === 'spotify') {
    return source.externalUrl;
  }
  console.log(source, "sourcesourcesourcesource")
  return source.externalUrl ?? (source.fileId ? buildDriveFileUrl(source.fileId) : undefined);
}

