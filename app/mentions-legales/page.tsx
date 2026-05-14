import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — SOLIDEM',
  description: 'Mentions légales du site solidem.fr',
}

export default function MentionsLegales() {
  return (
    <main style={{ background: '#111111', minHeight: '100vh', color: '#e5e5e5', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px 120px' }}>

        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#9a9b9a', fontSize: '13px', textDecoration: 'none', marginBottom: '48px' }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          Retour au site
        </Link>

        <p style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#F7C100', marginBottom: '16px' }}>
          Informations légales
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '48px' }}>
          Mentions légales
        </h1>

        <Section title="Éditeur du site">
          <Row label="Raison sociale" value="SOLIDEM" />
          <Row label="Forme juridique" value="SAS (Société par Actions Simplifiée)" />
          <Row label="Siège social" value="28 Rue de l'Église, 95170 Deuil-la-Barre" />
          <Row label="SIRET" value="909 114 324 00017" />
          <Row label="SIREN" value="909 114 324" />
          <Row label="RCS" value="Pontoise" />
          <Row label="Code APE/NAF" value="4312Z — Travaux de terrassement courants et travaux préparatoires" />
          <Row label="Capital social" value="5 000 €" />
          <Row label="N° TVA intracommunautaire" value="FR95 909 114 324" />
          <Row label="Directeur de publication" value="Nelson Almeida" />
        </Section>

        <Section title="Contact">
          <Row label="E-mail" value="contact@solidem.pro" />
          <Row label="Téléphone" value="+33 6 82 63 51 48" />
        </Section>

        <Section title="Hébergeur">
          <Row label="Société" value="Vercel Inc." />
          <Row label="Adresse" value="340 Pine Street, Suite 701 — San Francisco, CA 94104, États-Unis" />
          <Row label="Site" value="vercel.com" />
        </Section>

        <Section title="Propriété intellectuelle">
          <p style={bodyStyle}>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes) est la propriété exclusive de SOLIDEM ou de ses partenaires et est protégé par le droit d'auteur français et international. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.
          </p>
        </Section>

        <Section title="Limitation de responsabilité">
          <p style={bodyStyle}>
            SOLIDEM s'efforce d'assurer l'exactitude des informations publiées sur ce site. Toutefois, la société ne peut garantir l'exhaustivité ou l'absence d'erreurs et décline toute responsabilité quant aux conséquences d'une éventuelle inexactitude.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            Des liens hypertextes peuvent pointer vers des sites tiers. SOLIDEM n'exerce aucun contrôle sur ces sites et ne peut être tenu responsable de leur contenu.
          </p>
        </Section>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '48px' }}>
          Dernière mise à jour : mai 2026
        </p>
      </div>
    </main>
  )
}

const bodyStyle: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.7,
  color: 'rgba(255,255,255,0.7)',
  margin: 0,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#F7C100', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
        {title}
      </h2>
      <div style={{ borderLeft: '2px solid rgba(255,255,255,0.06)', paddingLeft: '20px' }}>
        {children}
      </div>
    </section>
  )
}

function Row({ label, value, placeholder }: { label: string; value: string; placeholder?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '16px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '13px', color: '#9a9b9a', minWidth: '220px', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '13px', color: placeholder ? '#666' : 'rgba(255,255,255,0.85)', fontStyle: placeholder ? 'italic' : 'normal' }}>{value}</span>
    </div>
  )
}
