'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const MapSVG = dynamic(() => import('./MapSVG'), { ssr: false })

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'clamp(420px, 55vh, 600px)',
        background: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* SVG map — full bleed */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <MapSVG />
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '100px',
        background: 'linear-gradient(to top, #111111, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Left vignette */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: '180px',
        background: 'linear-gradient(to right, rgba(13,13,13,0.65), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Full-width alignment container — mirrors MethodologySection's 1100px grid */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: 'translateY(-50%)',
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '10px',
            padding: 'clamp(20px, 3vw, 32px)',
            maxWidth: '280px',
          }}
        >
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#F7C100',
            margin: '0 0 10px',
          }}>
            Zone d&apos;intervention
          </p>

          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 800,
            color: '#ffffff', margin: '0 0 14px',
            lineHeight: 1.1, letterSpacing: '-0.01em',
          }}>
            Île-de-France
          </h2>

          <div style={{
            display: 'flex', gap: '20px',
            marginBottom: '14px', paddingBottom: '14px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 800, color: '#F7C100', lineHeight: 1 }}>8</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px' }}>Départements</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)' }} />
            <div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 800, color: '#F7C100', lineHeight: 1 }}>95</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px' }}>Siège</div>
            </div>
          </div>

          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px', color: 'rgba(255,255,255,0.4)',
            margin: 0, lineHeight: 1.6,
          }}>
            Deuil-la-Barre · Val-d&apos;Oise
          </p>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
