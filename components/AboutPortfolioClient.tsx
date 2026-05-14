'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StickyScrollGallery from '@/components/ui/sticky-scroll-gallery'
import AboutSection from '@/components/AboutSection'
import type { PortfolioItem } from './PortfolioSection'

const CYCLING = ["l'Excellence", "l'Engagement", "la Précision", "la Durabilité", "l'Innovation"]

function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

function DesktopAboutPanel() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % CYCLING.length), 2400)
    return () => clearTimeout(t)
  }, [idx])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 48px 0 8vw' }}
    >
      <p style={{
        fontSize: '11px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#F7C100',
        fontFamily: 'Poppins, sans-serif',
        margin: 0,
      }}>
        Notre Mission
      </p>

      <h2 style={{
        fontSize: 'clamp(30px, 2.8vw, 52px)',
        fontWeight: 700,
        color: '#ffffff',
        lineHeight: 1.1,
        fontFamily: 'Poppins, sans-serif',
        margin: 0,
      }}>
        Qui Nous Sommes
      </h2>

      <div style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.2 }}>
        <div style={{
          fontSize: 'clamp(12px, 1.1vw, 15px)',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.02em',
          marginBottom: '4px',
        }}>
          Transformer l&apos;Avenir par
        </div>
        <div style={{ position: 'relative', height: 'clamp(30px, 3.2vw, 46px)', overflow: 'hidden' }}>
          {CYCLING.map((word, i) => (
            <motion.span
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(22px, 2.4vw, 38px)',
                fontWeight: 800,
                color: '#F7C100',
                whiteSpace: 'nowrap',
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={idx === i ? { opacity: 1, y: 0 } : { opacity: 0, y: idx > i ? -60 : 60 }}
              transition={{ type: 'spring', stiffness: 55, damping: 16 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'clamp(12px, 1.1vw, 14px)',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.55,
        margin: 0,
      }}>
        SOLIDEM intervient en déconstruction, dépollution, terrassement et aménagement
        extérieur — basé à Deuil-la-Barre, actif sur l&apos;ensemble de l&apos;Île-de-France.
      </p>
      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'clamp(12px, 1.1vw, 14px)',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.55,
        margin: 0,
      }}>
        Chaque chantier est précédé d&apos;un diagnostic terrain. Le devis suit — jamais l&apos;inverse.
        Tarification transparente, exécution sans compromis — quelle que soit l&apos;envergure du chantier.
      </p>
    </motion.div>
  )
}

export default function AboutPortfolioClient({ items }: { items: PortfolioItem[] }) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <>
        <AboutSection />
        <StickyScrollGallery items={items} />
      </>
    )
  }

  return (
    <div id="mission" style={{ display: 'flex', alignItems: 'flex-start', background: '#111111' }}>
      {/* Left: sticky about panel */}
      <div style={{
        width: '40%',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <DesktopAboutPanel />
      </div>

      {/* Right: scrolling gallery */}
      <div style={{ flex: 1 }}>
        <StickyScrollGallery items={items} />
      </div>
    </div>
  )
}
