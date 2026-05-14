'use client';

import { useState } from 'react';
import type { PortfolioItem } from '@/components/PortfolioSection';

function MediaCell({ item }: { item: PortfolioItem }) {
  const [thumbVisible, setThumbVisible] = useState(true);

  if (item.type === 'vimeo') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <iframe
          src={`https://player.vimeo.com/video/${item.vimeoId}?autoplay=1&muted=1&loop=1&background=1`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '177.78%',
            height: '177.78%',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          title={item.title}
          onLoad={() => setTimeout(() => setThumbVisible(false), 600)}
        />
        {item.thumbnail && (
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: thumbVisible ? 1 : 0,
            transition: 'opacity 0.8s ease',
            pointerEvents: 'none',
          }}>
            <img
              src={item.thumbnail}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}
      </div>
    );
  }

  const filename = item.portfolio_image.split('/').pop() || item.portfolio_image;
  return (
    <img
      src={`/portfolio/${filename}`}
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      loading="lazy"
      decoding="async"
    />
  );
}

const CELL_H = 384;

export default function StickyScrollGallery({ items }: { items: PortfolioItem[] }) {
  const left   = items.slice(0, 5);
  const center = items.slice(5, 8);
  const right  = items.slice(8, 13);

  return (
    <section style={{ background: '#111111', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '8px' }}>

        {/* Left — scrolling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {left.map((item) => (
            <div key={item.id} style={{ position: 'relative', height: CELL_H, borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
              <MediaCell item={item} />
            </div>
          ))}
        </div>

        {/* Center — sticky, fills viewport height, divided in 3 rows */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {center.map((item) => (
            <div key={item.id} style={{ position: 'relative', flex: '1 1 0', minHeight: 0, borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
              <MediaCell item={item} />
            </div>
          ))}
        </div>

        {/* Right — scrolling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {right.map((item) => (
            <div key={item.id} style={{ position: 'relative', height: CELL_H, borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
              <MediaCell item={item} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
