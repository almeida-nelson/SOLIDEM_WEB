'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CinematicSection } from '@/components/ui/CinematicSection'

const CYCLING = ["l'Excellence", "l'Engagement", "la Précision", "la Durabilité", "l'Innovation"]

function AnimatedAboutBody() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % CYCLING.length), 2400)
    return () => clearTimeout(t)
  }, [idx])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Tagline animée */}
      <div style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.2 }}>
        <div style={{
          fontSize: 'clamp(14px, 1.4vw, 18px)',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.02em',
          marginBottom: '4px',
        }}>
          Transformer l&apos;Avenir par
        </div>
        <div style={{ position: 'relative', height: 'clamp(36px, 4.5vw, 58px)', overflow: 'hidden' }}>
          {CYCLING.map((word, i) => (
            <motion.span
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(28px, 3.5vw, 50px)',
                fontWeight: 800,
                color: '#F7C100',
                whiteSpace: 'nowrap',
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={
                idx === i
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: idx > i ? -60 : 60 }
              }
              transition={{ type: 'spring', stiffness: 55, damping: 16 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Corps */}
      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'clamp(12px, 1.1vw, 14px)',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.55,
        margin: 0,
      }}>
        SOLIDEM intervient en déconstruction, dépollution, terrassement et aménagement
        extérieur depuis Deuil-la-Barre — en Île-de-France et en Île-de-France.
      </p>
      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'clamp(12px, 1.1vw, 14px)',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.55,
        margin: 0,
      }}>
        Nos prestations s&apos;adaptent à votre enveloppe budgétaire sans transiger sur la qualité
        ni sur la sécurité. Le réemploi et l&apos;économie circulaire ne constituent pas des
        arguments commerciaux — ils définissent notre méthode de travail.
      </p>
    </div>
  )
}

export default function AboutSection() {
  return (
    <CinematicSection
      id="mission"
      label="Notre Mission"
      title="Qui Nous Sommes"
      body={<AnimatedAboutBody />}
      scrollHeight="220vh"
    />
  )
}
