'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Diagnostic',
    tagline: "Chaque chantier commence par une évaluation des risques. Pas par un devis.",
    body: "Avant d'engager la moindre ressource, nous conduisons une inspection terrain exhaustive : relevés topographiques, analyse des contraintes d'accès, identification des matériaux à risque (amiante, HAP, hydrocarbures), évaluation de la portance des sols. Ce dossier technique préalable constitue le seul socle valide d'un chiffrage honnête.",
    points: [
      'Inspection terrain & relevés topographiques',
      'Détection des matériaux dangereux',
      'Analyse des contraintes riveraines & réseaux',
      'Dossier technique remis avant devis',
    ],
  },
  {
    num: '02',
    title: 'Planification',
    tagline: "Ce qui n'est pas planifié coûte deux fois.",
    body: "Le planning n'est pas un document contractuel de façade — c'est notre outil de travail. Phasage des interventions, coordination avec la maîtrise d'œuvre, identification des sous-traitants agréés, plan de gestion des déchets, DICT et sécurisation du périmètre : tout est arbitré en amont pour que le chantier n'improvise jamais.",
    points: [
      'Planning contractuel phasé',
      'Coordination MOE & sous-traitants',
      'Plan de gestion des déchets en amont',
      'Sécurisation périmètre & DICT',
    ],
  },
  {
    num: '03',
    title: 'Exécution',
    tagline: "Ce qu'on ne fera jamais : rogner sur la sécurité pour gagner du temps.",
    body: "Sur chantier, aucun écart n'est toléré sans documentation. Nos équipes sont formées, encadrées et équipées des protections adaptées. Chaque journée produit un rapport de suivi : avancements, incidents, déviations au plan. La traçabilité n'est pas une contrainte administrative — c'est la preuve que l'on maîtrise ce qu'on fait.",
    points: [
      'Équipements haute performance & sécurité',
      'Rapports de chantier quotidiens',
      'Zéro improvisation : chaque écart est documenté',
      'Encadrement terrain permanent',
    ],
  },
  {
    num: '04',
    title: 'Valorisation',
    tagline: "Le réemploi n'est pas un argument commercial. C'est notre méthode de travail.",
    body: "La dernière étape n'est pas la livraison — c'est la sortie propre du chantier. Chaque matériau évacué est identifié, orienté et tracé avant de quitter le périmètre. Le taux de valorisation est calculé en fin d'opération et transmis au maître d'ouvrage.",
    points: [
      'Tri sélectif systématique dès la dépose',
      'Orientation vers filières agréées par matériau',
      'Bordereau de suivi remis en fin de chantier',
      'Taux de valorisation calculé et communiqué',
    ],
  },
]

const DURATION = 4500 // ms per step

const contentVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.32, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.16 } },
}

export default function MethodologySection() {
  const [active, setActive]   = useState(0)
  const [paused, setPaused]   = useState(false)
  const [key, setKey]         = useState(0) // resets progress bar animation
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (i: number) => {
    setActive(i)
    setKey(k => k + 1)
  }

  useEffect(() => {
    if (paused) { clearInterval(intervalRef.current!); return }
    intervalRef.current = setInterval(() => {
      setActive(i => {
        const next = (i + 1) % STEPS.length
        setKey(k => k + 1)
        return next
      })
    }, DURATION)
    return () => clearInterval(intervalRef.current!)
  }, [paused])

  const step = STEPS[active]

  return (
    <section style={{ background: '#F5F5F7', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 32px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '52px' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C49A00',
              marginBottom: '10px',
            }}
          >
            Notre Méthode
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(26px, 3.5vw, 46px)',
              fontWeight: 800,
              color: '#111111',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Rigueur à chaque étape
          </motion.h2>
        </div>

        {/* Panel */}
        <div className="methodology-panel">

          {/* Left — step nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((s, i) => (
              <div
                key={i}
                onMouseEnter={() => { goTo(i); setPaused(true) }}
                onMouseLeave={() => setPaused(false)}
                style={{ display: 'flex', alignItems: 'stretch', gap: '16px', cursor: 'default' }}
              >
                {/* Line + dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '18px' }}>
                  <div style={{
                    width: '9px', height: '9px', borderRadius: '50%',
                    background: active === i ? '#C49A00' : 'rgba(0,0,0,0.15)',
                    flexShrink: 0, marginTop: '4px',
                    transition: 'background 0.3s',
                  }} />
                  {i < STEPS.length - 1 && (
                    <div style={{
                      width: '1px', flex: 1, minHeight: '36px',
                      background: active > i ? '#C49A00' : 'rgba(0,0,0,0.1)',
                      transition: 'background 0.3s',
                      margin: '4px 0',
                    }} />
                  )}
                </div>

                {/* Label + progress bar */}
                <div style={{ paddingBottom: i < STEPS.length - 1 ? '36px' : 0, flex: 1 }}>
                  <span style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: active === i ? '#C49A00' : 'rgba(0,0,0,0.28)',
                    transition: 'color 0.3s',
                    display: 'block', marginBottom: '2px',
                  }}>
                    {s.num}
                  </span>
                  <span style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(15px, 1.6vw, 20px)', fontWeight: 700,
                    color: active === i ? '#111111' : 'rgba(0,0,0,0.28)',
                    transition: 'color 0.3s',
                    display: 'block', marginBottom: '8px',
                  }}>
                    {s.title}
                  </span>

                  {/* Progress bar — only on active step */}
                  <div style={{
                    height: '2px',
                    background: 'rgba(0,0,0,0.08)',
                    borderRadius: '1px',
                    overflow: 'hidden',
                    opacity: active === i ? 1 : 0,
                    transition: 'opacity 0.2s',
                  }}>
                    {active === i && (
                      <motion.div
                        key={key}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: DURATION / 1000, ease: 'linear' }}
                        style={{ height: '100%', background: '#C49A00', borderRadius: '1px' }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — content panel */}
          <div style={{ position: 'relative', minHeight: '300px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <span style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(56px, 7vw, 88px)', fontWeight: 900,
                  color: 'rgba(196,154,0,0.1)', lineHeight: 1,
                  display: 'block', marginBottom: '-12px',
                  letterSpacing: '-0.02em', userSelect: 'none',
                }}>
                  {step.num}
                </span>

                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 800,
                  color: '#111111', margin: '0 0 12px', lineHeight: 1.15,
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(12px, 1.1vw, 14px)', fontWeight: 500,
                  color: '#C49A00', margin: '0 0 16px',
                  fontStyle: 'italic', lineHeight: 1.5,
                }}>
                  &ldquo;{step.tagline}&rdquo;
                </p>

                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(12px, 1vw, 13px)',
                  color: 'rgba(0,0,0,0.6)', lineHeight: 1.75,
                  margin: '0 0 24px', maxWidth: '520px',
                }}>
                  {step.body}
                </p>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {step.points.map((pt, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: '#C49A00', marginTop: '3px', flexShrink: 0, fontSize: '11px' }}>▸</span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(11px, 0.9vw, 12px)', color: 'rgba(0,0,0,0.65)', lineHeight: 1.5 }}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      <style>{`
        .methodology-panel {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 0 64px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .methodology-panel {
            grid-template-columns: 1fr;
            gap: 32px 0;
          }
        }
      `}</style>
    </section>
  )
}
