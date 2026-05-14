import { readdir } from 'fs/promises';
import path from 'path';
import PortfolioClient from './PortfolioClient';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const VIMEO_VIDEOS = [
  { vimeoId: '1192197536', title: 'Terrassement & Maçonnerie' },
  { vimeoId: '1192197562', title: 'Aménagements Extérieurs' },
  { vimeoId: '1192197538', title: 'Terrassement' },
  { vimeoId: '1192197535', title: 'Maçonnerie' },
  { vimeoId: '1192373584', title: 'Réalisation' },
];

export interface PhotoPortfolioItem {
  id: number;
  type: 'image';
  picture_name: string;
  portfolio_image: string;
}

export interface VimeoPortfolioItem {
  id: number;
  type: 'vimeo';
  vimeoId: string;
  title: string;
  thumbnail: string | null;
}

export type PortfolioItem = PhotoPortfolioItem | VimeoPortfolioItem;

async function getVimeoThumbnail(videoId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.thumbnail_url as string) ?? null;
  } catch {
    return null;
  }
}

async function getPortfolio(): Promise<PortfolioItem[]> {
  const photos: PhotoPortfolioItem[] = await (async () => {
    try {
      const dir = path.join(process.cwd(), 'public', 'portfolio');
      const files = await readdir(dir);
      return files
        .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .map((filename, idx) => ({
          id: idx + 1,
          type: 'image' as const,
          picture_name: path.basename(filename, path.extname(filename)),
          portfolio_image: filename,
        }));
    } catch {
      return [];
    }
  })();

  const videos: VimeoPortfolioItem[] = await Promise.all(
    VIMEO_VIDEOS.map(async (v, idx) => ({
      id: photos.length + idx + 1,
      type: 'vimeo' as const,
      vimeoId: v.vimeoId,
      title: v.title,
      thumbnail: await getVimeoThumbnail(v.vimeoId),
    }))
  );

  // Interleave: 1 video every 2 photos for a more mixed feel
  const result: PortfolioItem[] = [];
  let p = 0;
  let v = 0;
  while (p < photos.length || v < videos.length) {
    for (let i = 0; i < 2 && p < photos.length; i++) result.push(photos[p++]);
    if (v < videos.length) result.push(videos[v++]);
  }
  return result;
}

export default async function PortfolioSection() {
  const items = await getPortfolio();
  return (
    <section style={{ padding: '20px 0', background: '#111111' }}>
      <PortfolioClient items={items} />
    </section>
  );
}
