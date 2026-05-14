'use client'

import { motion } from 'framer-motion'

const ITEMS = [
  {
    symbol: 'BSD',
    title: 'Traçabilité certifiée',
    body: "Chaque flux de déchet quitte le chantier accompagné d'un bordereau signé — BSD pour les déchets dangereux courants, BSDA pour les déchets amiantés. Aucune évacuation sans document. Aucun document sans signature.",
    tags: ['BSD', 'BSDA', 'Déchets dangereux', 'Amiante'],
  },
  {
    symbol: '100%',
    title: 'Filières agréées uniquement',
    body: "Béton concassé, ferrailles, terres inertes, matériaux amiantés : chaque type de déchet est orienté vers une installation de traitement agréée par la préfecture. Nous ne choisissons jamais la facilité au détriment de la conformité.",
    tags: ['Béton', 'Ferrailles', 'Terres inertes', 'Agréments préfectoraux'],
  },
  {
    symbol: '↺',
    title: 'Réemploi & économie circulaire',
    body: "Avant d'envoyer en filière, nous identifions ce qui peut être réemployé sur site ou revendu. Granulats de béton, métaux non ferreux, bois de charpente : notre priorité est de maximiser le taux de valorisation à chaque opération.",
    tags: ['Granulats', 'Métaux non ferreux', 'Réemploi in situ', 'Économie circulaire'],
  },
  {
    symbol: '0',
    title: 'Zéro décharge sauvage',
    body: "Ce n'est pas une politique affichée — c'est une règle non négociable. Aucun résidu de chantier ne part en dépôt illégal. Pas de shortcut. Nos bons de pesée et certificats d'élimination sont disponibles à tout maître d'ouvrage qui en fait la demande.",
    tags: ['Dépôt illégal : interdit', 'Bons de pesée', 'Certificats élimination'],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
}

export default function EngagementsSection() {
  return (
    <section style={{
      background: '#111111',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 32px 100px' }}>

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#F7C100',
            margin: '0 0 12px',
          }}
        >
          Responsabilité environnementale
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(26px, 3.8vw, 50px)',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 20px',
            lineHeight: 1.1,
            maxWidth: '640px',
          }}
        >
          Ce qui sort du chantier, on sait où ça va.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: 'rgba(255,255,255,0.5)',
            margin: '0 0 64px',
            maxWidth: '560px',
            lineHeight: 1.7,
          }}
        >
          Dans un secteur où la gestion des déchets reste souvent opaque, chaque flux sortant
          est documenté — filière, poids, destination. Bordereau signé, sans exception.
        </motion.p>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2px',
        }}
          className="engagements-grid"
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="engagements-card"
              style={{
                background: i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.018)',
                padding: 'clamp(28px, 3.5vw, 48px)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                border: '1px solid transparent',
                cursor: 'default',
              }}
            >
              {/* Decorative symbol */}
              <span className="engagements-symbol" style={{
                position: 'absolute',
                top: '16px',
                right: '24px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: item.symbol === '↺' ? '80px' : 'clamp(52px, 6vw, 80px)',
                fontWeight: 900,
                color: 'rgba(247,193,0,0.06)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                pointerEvents: 'none',
                userSelect: 'none',
                transition: 'color 0.3s ease',
              }}>
                {item.symbol}
              </span>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(17px, 1.8vw, 22px)',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.2,
                position: 'relative',
                zIndex: 1,
              }}>
                {item.title}
              </h3>

              {/* Body */}
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(12px, 1vw, 13.5px)',
                color: 'rgba(255,255,255,0.55)',
                margin: 0,
                lineHeight: 1.75,
                position: 'relative',
                zIndex: 1,
                flex: 1,
              }}>
                {item.body}
              </p>

              {/* Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                position: 'relative',
                zIndex: 1,
              }}>
                {item.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: j === 0 ? '#F7C100' : 'rgba(255,255,255,0.35)',
                    background: j === 0 ? 'rgba(247,193,0,0.08)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${j === 0 ? 'rgba(247,193,0,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '4px',
                    padding: '3px 8px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
            margin: '32px 0 0',
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          Documents de traçabilité disponibles sur demande — bordereau de suivi des déchets (BSD/BSDA), bons de pesée, certificats d'élimination.
        </motion.p>

      </div>

      <style>{`
        .engagements-card {
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .engagements-card:hover {
          border-color: rgba(247, 193, 0, 0.18) !important;
          background: rgba(255,255,255,0.055) !important;
        }
        .engagements-card:hover .engagements-symbol {
          color: rgba(247, 193, 0, 0.14) !important;
        }
        @media (max-width: 767px) {
          .engagements-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
