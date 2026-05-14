'use client'

import { useState } from 'react'

const LOGOS = [
  { src: '/assets/client%20logo/Groupe-LMP.png',             alt: 'Groupe LMP' },
  { src: '/assets/client%20logo/Prorenov95.webp',           alt: 'Prorenov 95' },
  { src: '/assets/client%20logo/Zub.svg',                    alt: 'Zub' },
  { src: '/assets/client%20logo/balas.webp',                 alt: 'Balas' },
  { src: '/assets/client%20logo/ccr.png',                    alt: 'CCR' },
  { src: '/assets/client%20logo/erigere_logo.jpg',           alt: 'Érigère' },
  { src: '/assets/client%20logo/freha.jpg',                  alt: 'Freha' },
  { src: '/assets/client%20logo/gtm.png',                    alt: 'GTM' },
  { src: '/assets/client%20logo/guyon.svg',                  alt: 'Guyon' },
  { src: '/assets/client%20logo/toiture%20parisienne.webp',  alt: 'Toiture Parisienne' },
]

const KEYFRAMES = `
  @keyframes clients-marquee {
    from { transform: translateX(0) }
    to   { transform: translateX(-50%) }
  }
`

export default function ClientsCarousel() {
  const [paused, setPaused] = useState(false)
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <section style={{
      background: '#333333',
      padding: '56px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <style>{KEYFRAMES}</style>

      <p style={{
        textAlign: 'center',
        fontSize: '11px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#9a9b9a',
        marginBottom: '40px',
        fontFamily: 'Poppins, sans-serif',
      }}>
        Nos partenaires
      </p>

      <div
        style={{ overflow: 'hidden', position: 'relative', cursor: 'default', contain: 'layout paint' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, #333333, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, #333333, transparent)', zIndex: 1, pointerEvents: 'none' }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '72px',
          width: 'max-content',
          padding: '8px 0',
          animation: `clients-marquee 28s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}>
          {doubled.map((logo, i) => (
            <LogoItem key={i} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoItem({ src, alt }: { src: string; alt: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      style={{
        height: '38px',
        width: 'auto',
        maxWidth: '130px',
        objectFit: 'contain',
        flexShrink: 0,
        display: 'block',
        filter: 'grayscale(1) invert(1)',
        opacity: hovered ? 1 : 0.55,
        transition: 'opacity 0.3s ease',
        userSelect: 'none',
        willChange: 'opacity',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      draggable={false}
    />
  )
}
