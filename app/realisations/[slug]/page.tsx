import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const SITE_URL = 'https://www.solidem.fr'

// Vimeo réalisations connues — à étendre avec les photos quand le contenu est prêt
const REALISATIONS = [
  {
    slug: 'terrassement-maconnerie',
    vimeoId: '1192197536',
    title: 'Terrassement & Maçonnerie',
    service: 'Terrassement',
    location: 'Île-de-France',
    description: 'Chantier de terrassement et maçonnerie réalisé par SOLIDEM en Île-de-France. Intervention complète, du diagnostic à la livraison.',
  },
  {
    slug: 'amenagements-exterieurs',
    vimeoId: '1192197562',
    title: 'Aménagements Extérieurs',
    service: 'Aménagements Extérieurs & VRD',
    location: 'Île-de-France',
    description: 'Réalisation d\'aménagements extérieurs par SOLIDEM : VRD, dallages, espaces verts. Chantier livré en Île-de-France.',
  },
  {
    slug: 'terrassement',
    vimeoId: '1192197538',
    title: 'Terrassement',
    service: 'Terrassement',
    location: 'Île-de-France',
    description: 'Travaux de terrassement réalisés par SOLIDEM. Maîtrise des cotes, gestion des terres excavées, délais respectés.',
  },
  {
    slug: 'maconnerie',
    vimeoId: '1192197535',
    title: 'Maçonnerie',
    service: 'Aménagements Extérieurs & VRD',
    location: 'Île-de-France',
    description: 'Travaux de maçonnerie réalisés par SOLIDEM en Île-de-France. Murs de soutènement, dallages et ouvrages en béton.',
  },
  {
    slug: 'realisation',
    vimeoId: '1192197533',
    title: 'Réalisation SOLIDEM',
    service: 'Déconstruction & Démolition',
    location: 'Île-de-France',
    description: 'Réalisation SOLIDEM : intervention complète en Île-de-France, du diagnostic terrain à la restitution du chantier.',
  },
]

const REALISATIONS_MAP = Object.fromEntries(REALISATIONS.map(r => [r.slug, r]))

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return REALISATIONS.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const r = REALISATIONS_MAP[slug]
  if (!r) return {}

  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: `${SITE_URL}/realisations/${slug}` },
    openGraph: {
      title: `${r.title} | SOLIDEM`,
      description: r.description,
      url: `${SITE_URL}/realisations/${slug}`,
    },
  }
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params
  const r = REALISATIONS_MAP[slug]
  if (!r) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: r.title,
    description: r.description,
    creator: {
      '@type': 'LocalBusiness',
      name: 'SOLIDEM',
      url: SITE_URL,
    },
    url: `${SITE_URL}/realisations/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ background: '#111111', minHeight: '100vh', color: '#ffffff', fontFamily: 'Poppins, sans-serif' }}>

        {/* Hero */}
        <section style={{
          padding: 'clamp(100px, 12vw, 160px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 80px)',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#F7C100', marginBottom: '20px' }}>
            Réalisation · {r.service}
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 20px',
          }}>
            {r.title}
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            maxWidth: '580px',
            margin: '0 0 48px',
          }}>
            {r.description}
          </p>
        </section>

        {/* Vimeo embed */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(24px, 8vw, 120px) clamp(80px, 10vw, 100px)',
        }}>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#000',
          }}>
            <iframe
              src={`https://player.vimeo.com/video/${r.vimeoId}?autoplay=0&title=0&byline=0&portrait=0`}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              title={r.title}
            />
          </div>
        </section>

        {/* CTA */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(24px, 8vw, 120px) clamp(80px, 10vw, 100px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '48px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 8px' }}>
              Un projet similaire ?
            </p>
            <p style={{ fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, margin: 0 }}>
              Obtenez une évaluation gratuite.
            </p>
          </div>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              background: '#F7C100',
              color: '#111111',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '6px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              flexShrink: 0,
            }}
          >
            Devis gratuit
          </a>
        </section>

        {/* Autres réalisations */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(24px, 8vw, 120px) clamp(80px, 10vw, 100px)',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 20px' }}>
            Autres réalisations
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {REALISATIONS.filter(item => item.slug !== slug).map(item => (
              <a
                key={item.slug}
                href={`/realisations/${item.slug}`}
                style={{
                  padding: '10px 20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  fontSize: '13px',
                }}
              >
                {item.title}
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
