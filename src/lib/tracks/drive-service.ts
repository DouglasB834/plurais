import { DRIVE_ROOT_FOLDER_ID, buildDriveFileUrl, buildAudioUrl, DRIVE_API_KEY } from './config';
import type { Track, TrackPhoto } from './types';

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

async function driveRequest<T>(path: string, params: Record<string, string>): Promise<T> {
  if (!DRIVE_ROOT_FOLDER_ID) {
    throw new Error('DRIVE_ROOT_FOLDER_ID (VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID) não configurado.');
  }
  if (!DRIVE_API_KEY) {
    throw new Error('VITE_GOOGLE_DRIVE_API_KEY não configurado.');
  }

  const searchParams = new URLSearchParams({
    key: DRIVE_API_KEY,
    ...params,
  });

  const res = await fetch(`${DRIVE_API_BASE}${path}?${searchParams.toString()}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Drive API error: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

async function listFoldersInRoot() {
  type Response = { files: DriveFile[] };
  const q = [
    `'${DRIVE_ROOT_FOLDER_ID}' in parents`,
    "mimeType = 'application/vnd.google-apps.folder'",
    'trashed = false',
  ].join(' and ');

  const data = await driveRequest<Response>('/files', {
    q,
    fields: 'files(id,name,mimeType)',
  });

  return data.files;
}

async function listChildren(folderId: string) {
  type Response = { files: DriveFile[] };
  const q = [`'${folderId}' in parents`, 'trashed = false'].join(' and ');

  const data = await driveRequest<Response>('/files', {
    q,
    fields: 'files(id,name,mimeType)',
  });

  return data.files;
}

function isImage(file: DriveFile) {
  return file.mimeType.startsWith('image/');
}

function isAudio(file: DriveFile) {
  return file.mimeType.startsWith('audio/') || file.name.toLowerCase().endsWith('.mp3');
}

export async function getTracksFromDrive(): Promise<Track[]> {
  const trackFolders = await listFoldersInRoot();

  const tracks: Track[] = [];

  for (const folder of trackFolders) {
    const children = await listChildren(folder.id);

    const photosFolder = children.find(
      (f) =>
        f.mimeType === 'application/vnd.google-apps.folder' &&
        f.name.toLowerCase() === 'photos',
    );
    const trackFolder = children.find(
      (f) =>
        f.mimeType === 'application/vnd.google-apps.folder' &&
        f.name.toLowerCase() === 'track',
    );

    let photos: TrackPhoto[] = [];
    if (photosFolder) {
      const photoFiles = (await listChildren(photosFolder.id)).filter(isImage);
      photos = photoFiles.map((file) => ({
        url: buildDriveFileUrl(file.id, { thumbnail: true }),
        alt: file.name,
      }));
    }

    let audioUrl: string | undefined;
    let externalUrl: string | undefined;
    if (trackFolder) {
      const audioFiles = (await listChildren(trackFolder.id)).filter(isAudio);
      if (audioFiles[0]) {
        const fileId = audioFiles[0].id;
        audioUrl = buildAudioUrl({
          provider: 'drive',
          fileId,
        });
        // Link de fallback para abrir no Google Drive se o player falhar
        externalUrl = `https://drive.google.com/file/d/${fileId}/view`;
      }
    }

    if (!photos.length && !audioUrl) {
      continue;
    }

    const folderName = folder.name;
    // Limpa o título: remove números iniciais (ex: "01_") e troca "_" por espaço
    const cleanTitle = folderName.replace(/^\d+[\s_-]*/, '').replace(/_/g, ' ');

    const track: Track = {
      id: folderName,
      title: cleanTitle,
      artist: 'Plurais',
      coverUrl: photos[0]?.url ?? '',
      audioUrl,
      photos,
      audioProvider: 'drive',
      externalUrl,
    };

    tracks.push(track);
  }
  console.log('[DriveService] Tracks mapeadas a partir do Drive:', tracks);
  return tracks;
}

