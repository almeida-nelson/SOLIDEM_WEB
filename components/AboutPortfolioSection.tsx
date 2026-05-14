import { readdir } from 'fs/promises';
import path from 'path';
import AboutPortfolioClient from './AboutPortfolioClient';
import type { PortfolioItem, PhotoPortfolioItem, VimeoPortfolioItem } from './PortfolioSection';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const VIMEO_VIDEOS = [
  { vimeoId: '1192197536', title: 'Terrassement & Maçonnerie' },
  { vimeoId: '1192197562', title: 'Aménagements Extérieurs' },
  { vimeoId: '1192197538', title: 'Terrassement' },
  { vimeoId: '1192373584', title: 'Réalisation' },
  { vimeoId: '1192266171', title: 'Chantier' },
  { vimeoId: '1192266169', title: 'Chantier' },
  { vimeoId: '1192266170', title: 'Chantier' },
];

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

async function getPortfolioItems(): Promise<PortfolioItem[]> {
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

  // Spread videos evenly among photos so no two videos are adjacent
  const result: PortfolioItem[] = [];
  const P = photos.length;
  const V = videos.length;
  let pi = 0;
  for (let vi = 0; vi < V; vi++) {
    // Cumulative photos target before this video (centered spacing)
    const photosBefore = Math.round((vi + 0.5) * P / V);
    while (pi < photosBefore && pi < P) result.push(photos[pi++]);
    result.push(videos[vi]);
  }
  while (pi < P) result.push(photos[pi++]);
  return result;
}

export default async function AboutPortfolioSection() {
  const items = await getPortfolioItems();
  return <AboutPortfolioClient items={items} />;
}
