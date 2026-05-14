import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — SOLIDEM',
  description: 'Politique de confidentialité et traitement des données personnelles — SOLIDEM',
}

export default function Confidentialite() {
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
          RGPD
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
          Politique de confidentialité
        </h1>
        <p style={{ fontSize: '14px', color: '#9a9b9a', marginBottom: '48px', lineHeight: 1.6 }}>
          SOLIDEM s'engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés.
        </p>

        <Section title="1. Responsable du traitement">
          <p style={bodyStyle}>
            <strong style={{ color: '#fff' }}>SOLIDEM</strong> — SAS unipersonnelle au capital de 5 000 €<br />
            28 Rue de l'Église, 95170 Deuil-la-Barre<br />
            SIRET : 909 114 324 00017<br />
            Contact : <a href="mailto:contact@solidem.pro" style={{ color: '#F7C100', textDecoration: 'none' }}>contact@solidem.pro</a>
          </p>
        </Section>

        <Section title="2. Données collectées et finalités">
          <p style={{ ...bodyStyle, marginBottom: '16px' }}>Les données suivantes sont collectées via l'assistant virtuel et le formulaire de contact :</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                <Th>Donnée</Th>
                <Th>Finalité</Th>
                <Th>Base légale</Th>
              </tr>
            </thead>
            <tbody>
              <Tr cells={['Nom, prénom', 'Identification du contact', 'Intérêt légitime']} />
              <Tr cells={['Numéro de téléphone', 'Prise de contact pour devis', 'Intérêt légitime']} />
              <Tr cells={['Adresse e-mail', 'Envoi du récapitulatif de demande', 'Consentement']} />
              <Tr cells={['Type de travaux, localisation', 'Qualification du projet', 'Intérêt légitime']} />
              <Tr cells={['Photos de chantier', 'Analyse technique du projet', 'Consentement']} />
            </tbody>
          </table>
        </Section>

        <Section title="3. Durée de conservation">
          <p style={bodyStyle}>
            Les données collectées sont conservées pendant <strong style={{ color: '#fff' }}>3 ans</strong> à compter du dernier contact, conformément aux délais de prescription civile applicables. Les photos de chantier sont supprimées dès la clôture du dossier ou sur demande.
          </p>
        </Section>

        <Section title="4. Destinataires des données">
          <p style={bodyStyle}>
            Vos données sont traitées exclusivement par SOLIDEM et ne sont ni vendues ni transmises à des tiers à des fins commerciales. Elles peuvent être partagées avec des sous-traitants techniques opérant sous notre responsabilité (hébergement : Vercel Inc. ; base de données : Supabase Inc.) dans le cadre strict de la prestation.
          </p>
        </Section>

        <Section title="5. Cookies et traceurs">
          <p style={bodyStyle}>
            Ce site utilise <strong style={{ color: '#fff' }}>Cloudflare Web Analytics</strong>, un outil de mesure d'audience qui ne dépose aucun cookie et ne collecte aucune donnée personnelle identifiable. Aucune bannière de consentement n'est requise pour cet usage.
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            Le site ne recourt à aucun cookie publicitaire, de suivi comportemental ou de profilage.
          </p>
        </Section>

        <Section title="6. Vos droits">
          <p style={{ ...bodyStyle, marginBottom: '12px' }}>
            Conformément au RGPD, vous disposez des droits suivants sur vos données :
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              "Droit d'accès — obtenir une copie de vos données",
              "Droit de rectification — corriger des données inexactes",
              "Droit à l'effacement — demander la suppression de vos données",
              "Droit d'opposition — vous opposer à un traitement",
              "Droit à la portabilité — recevoir vos données dans un format structuré",
              "Droit de limitation — restreindre un traitement en cours",
            ].map((right, i) => (
              <li key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{right}</li>
            ))}
          </ul>
          <p style={{ ...bodyStyle, marginTop: '16px' }}>
            Pour exercer ces droits, contactez-nous à :<br />
            <a href="mailto:contact@solidem.pro" style={{ color: '#F7C100', textDecoration: 'none' }}>contact@solidem.pro</a>
          </p>
          <p style={{ ...bodyStyle, marginTop: '12px' }}>
            En cas de désaccord, vous pouvez introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#F7C100', textDecoration: 'none' }}>CNIL</a> (Commission Nationale de l'Informatique et des Libertés).
          </p>
        </Section>

        <Section title="7. Sécurité">
          <p style={bodyStyle}>
            SOLIDEM met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation (connexions chiffrées HTTPS, accès restreint à la base de données, authentification sécurisée à l'interface d'administration).
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

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a9b9a', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      {children}
    </th>
  )
}

function Tr({ cells }: { cells: [string, string, string] }) {
  return (
    <tr>
      {cells.map((c, i) => (
        <td key={i} style={{ padding: '8px 12px', fontSize: '13px', color: i === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }}>
          {c}
        </td>
      ))}
    </tr>
  )
}
