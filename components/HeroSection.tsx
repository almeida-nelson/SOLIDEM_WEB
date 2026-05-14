'use client';
import { useState, useCallback } from 'react';
import GlobalGrid from '@/components/GlobalGrid';
import {
  motion, AnimatePresence,
  type Variants,
} from 'framer-motion';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const TABS = [
  {
    id: 'deconstruction',
    label: 'DÉCONSTRUCTION',
    heading: 'Dépose technique, démolition sélective ou totale',
    text: "Chaque structure fait l'objet d'une évaluation préalable : nature des matériaux, contraintes de voisinage, présence éventuelle de pollutions. Les interventions sont conduites avec des techniques maîtrisées, un tri sélectif rigoureux sur site et une valorisation systématique des matériaux récupérables. Du bâtiment entier à la démolition partielle ciblée.",
  },
  {
    id: 'depollution',
    label: 'DÉPOLLUTION',
    heading: 'Diagnostic, plan d\'action, intervention ciblée',
    text: "Amiante, HAP, hydrocarbures, métaux lourds — nous identifions précisément la nature et l'étendue de la pollution, dimensionnons l'intervention et procédons à la dépollution dans le strict respect de la réglementation en vigueur. Aucun devis n'est établi sans une compréhension exhaustive du problème.",
  },
  {
    id: 'terrassement',
    label: 'TERRASSEMENT',
    heading: 'Fouilles, pleine masse, maîtrise des cotes',
    text: "Petits volumes ou grandes excavations, terrain contraint ou dégagé — nous adaptons les équipements aux contraintes spécifiques du chantier. Les travaux sont exécutés selon les plans et niveaux définis, dans le respect rigoureux des délais contractuels.",
  },
  {
    id: 'amenagements',
    label: 'AMÉNAGEMENTS EXTÉRIEURS',
    heading: 'VRD, dallages, espaces verts — de la tranchée à la livraison',
    text: "VRD, dallages, engazonnement, plantations, murs de soutènement — de la tranchée à la livraison. Mise en conformité des réseaux existants intégrée : nous vous conseillons sur vos obligations réglementaires avant d'intervenir.",
  },
  {
    id: 'devis',
    label: 'DEVIS',
    heading: 'Un projet ? Nous vous rappelons.',
    text: "Décrivez votre chantier à notre assistant. Nos équipes prennent contact sous 24 à 48 heures ouvrées pour une première évaluation, sans engagement.",
  },
];

const entryVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const entryItemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const tabContentVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
};

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [menuOpen, setMenuOpen]   = useState(false);

  const switchTab = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setMenuOpen(false);
  }, [activeIdx]);

  function openChat(e: React.MouseEvent, mode: 'chat' | 'form' = 'form') {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('solidem:openChat', { detail: { mode } }));
  }

  const shown = TABS[activeIdx];

  return (
    <motion.section className="hero-fullscreen">
        <GlobalGrid />

      {/* ── Content ── */}
      <motion.div
        className="hero-content"
        variants={entryVariants}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 4 }}
      >

        {/* Mobile toggle */}
        <motion.div
          variants={entryItemVariants}
          className="toggle d-md-none"
          style={{ alignItems: 'center', paddingBottom: '16px' }}
        >
          <button
            className="toggle-btn"
            onClick={() => setMenuOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label="Ouvrir le menu"
          >
            <Image src="/assets/menu-icon.png" alt="Menu" width={30} height={30} />
          </button>
          <div className="active-tab-name" style={{ paddingLeft: '10px' }}>
            <span style={{ color: '#F7C100', fontFamily: 'Poppins', fontWeight: 700, fontSize: '15px' }}>
              {TABS[activeIdx].label}
            </span>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <motion.ul
          variants={entryItemVariants}
          className="nav-tabs"
          style={menuOpen ? { display: 'flex' } : undefined}
        >
          {menuOpen && (
            <li className="text-end py-2 d-md-none cross" style={{ listStyle: 'none', textAlign: 'right', width: '100%' }}>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                aria-label="Fermer"
              >
                <Image src="/assets/cross.png" alt="Fermer" width={20} height={20} />
              </button>
            </li>
          )}
          {TABS.map((tab, idx) => (
            <li key={tab.id} className="nav-item" style={{ listStyle: 'none' }}>
              <a
                className={cn('heronavlinks', idx === activeIdx && 'active')}
                href={`#${tab.id}`}
                onClick={(e) => { e.preventDefault(); switchTab(idx); }}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Tab content — fixed-height container, absolute child so height never shifts */}
        <div className="hero-tab-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
            >
              <h1 className="heroheading"><b>{shown.heading}</b></h1>
              <p className="herotext">{shown.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3 CTAs — toujours visibles */}
        <motion.div
          variants={entryItemVariants}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '36px' }}
        >
          {/* CTA 1 — Devis gratuit (primaire) */}
          <a
            href="#"
            onClick={(e) => openChat(e, 'form')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px',
              background: '#F7C100',
              color: '#111111',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700, fontSize: '14px',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e6b200' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F7C100' }}
          >
            Devis gratuit
          </a>

          {/* CTA 2 — Poser une question (secondaire) */}
          <a
            href="#"
            onClick={(e) => openChat(e, 'chat')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600, fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.18)',
              textDecoration: 'none',
              transition: 'background 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Une question ?
          </a>

          {/* CTA 3 — WhatsApp (tertiaire) */}
          <a
            href="https://wa.me/33682635148"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(8px)',
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500, fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(37,211,102,0.12)'; el.style.borderColor = 'rgba(37,211,102,0.3)'; el.style.color = '#fff' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.05)'; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.color = 'rgba(255,255,255,0.75)' }}
          >
            {/* WhatsApp icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </motion.div>

      </motion.div>

      {/* Scroll indicator — plumb line */}
      <div className="hero-plumb" style={{
        position: 'absolute',
        bottom: '28px',
        left: '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        {/* Label */}
        <motion.span
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '8px',
            fontWeight: 600,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#F7C100',
          }}
        >
          Défiler
        </motion.span>

        {/* Bob — filled plumb weight */}
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8], scale: [0.92, 1, 0.92] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            background: '#F7C100',
            boxShadow: '0 0 10px rgba(247,193,0,0.35)',
            flexShrink: 0,
          }}
        />

        {/* Line — traveling dot inside a track */}
        <div style={{
          width: '1px',
          height: '44px',
          background: 'rgba(247,193,0,0.15)',
          borderRadius: '1px',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <motion.div
            animate={{ y: [-12, 48] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: [0.4, 0, 0.6, 1], repeatDelay: 0.2 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1px',
              height: '16px',
              background: 'linear-gradient(to bottom, transparent, #F7C100, transparent)',
              borderRadius: '1px',
            }}
          />
        </div>
      </div>

    </motion.section>
  );
}

