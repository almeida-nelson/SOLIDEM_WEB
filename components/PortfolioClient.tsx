'use client';

import StickyScrollGallery from '@/components/ui/sticky-scroll-gallery';
import type { PortfolioItem } from './PortfolioSection';

export default function PortfolioClient({ items }: { items: PortfolioItem[] }) {
  return <StickyScrollGallery items={items} />;
}
