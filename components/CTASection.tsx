'use client'

import { motion } from 'framer-motion'

const TRUST = [
  { label: 'Île-de-France', sub: '8 départements' },
  { label: '24 à 48h ouvrées', sub: 'Délai de réponse' },
  { label: 'Décennale + RC Pro', sub: 'SMA SA · ATOUTP Global' },
  { label: 'Sans engagement', sub: 'Première évaluation gratuite' },
]

export default function CTASection() {
  function openChat(e: React.MouseEvent, mode: 'chat' | 'form' = 'form') {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('solidem:openChat', { detail: { mode } }))
  }

  return (
    <section style={{
      background: '#0a0a0a',
      borderTop: '3px solid #F7C100',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Ghost "24H" — architectural anchor */}
      <div aria-hidden style={{
        position: 'absolute',
        right: '-1%',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'clamp(160px, 24vw, 340px)',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(247,193,0,0.06)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        24H
      </div>

      {/* Diagonal line — construction drawing accent */}
      <div aria-hidden style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <svg style={{ position: 'absolute', bottom: '-1px', left: 0, width: '100%', height: '120px' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
          <line x1="0" y1="120" x2="1440" y2="60" stroke="rgba(247,193,0,0.04)" strokeWidth="1" />
          <line x1="0" y1="90" x2="1440" y2="30" stroke="rgba(247,193,0,0.025)" strokeWidth="1" />
        </svg>
      </div>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'clamp(80px, 10vw, 130px) 32px clamp(80px, 10vw, 120px)',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#F7C100',
            margin: '0 0 28px',
          }}
        >
          Vous avez tout lu. C&apos;est le bon moment.
        </motion.p>

        {/* Headline line 1 */}
        <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Un projet en tête.
          </motion.h2>
        </div>

        {/* Headline line 2 */}
        <div style={{ overflow: 'hidden', marginBottom: '36px' }}>
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              fontWeight: 800,
              color: '#F7C100',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Parlons-en d&apos;abord.
          </motion.h2>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75,
            maxWidth: '480px',
            margin: '0 0 52px',
          }}
        >
          Pas de formulaire à 40 champs. Décrivez votre chantier en quelques lignes —
          nos équipes reviennent vers vous pour une première évaluation, sans engagement.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '80px' }}
        >
          {/* Primary — highest commitment */}
          <a
            href="#"
            onClick={e => openChat(e, 'form')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: '#F7C100',
              color: '#111111',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.02em',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e6b200' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F7C100' }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Analyse de faisabilité
          </a>

          {/* Secondary — lower commitment */}
          <a
            href="#"
            onClick={e => openChat(e, 'chat')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: 'transparent',
              color: '#ffffff',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              letterSpacing: '0.02em',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.4)'
              el.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.2)'
              el.style.background = 'transparent'
            }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Une question ?
          </a>

          {/* WhatsApp — lowest commitment */}
          <a
            href="https://wa.me/33682635148"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 28px',
              background: 'transparent',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '0.02em',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = '#ffffff'
              el.style.borderColor = 'rgba(37,211,102,0.35)'
              el.style.background = 'rgba(37,211,102,0.07)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'rgba(255,255,255,0.5)'
              el.style.borderColor = 'rgba(255,255,255,0.08)'
              el.style.background = 'transparent'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: '32px',
          }}
        >
          {TRUST.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                paddingRight: '40px',
                marginRight: '40px',
                borderRight: i < TRUST.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                marginBottom: '16px',
              }}
            >
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '0.01em',
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.05em',
              }}>
                {item.sub}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 767px) {
          .cta-trust-row > div {
            border-right: none !important;
            padding-right: 0 !important;
            margin-right: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
