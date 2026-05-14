import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES, SERVICES_MAP, IDF_CITIES, CITIES_MAP } from '@/lib/seo-data'

const SITE_URL = 'https://www.solidem.fr'

type Props = { params: Promise<{ ville: string; service: string }> }

export function generateStaticParams() {
  return IDF_CITIES.flatMap(city =>
    SERVICES.map(s => ({ ville: city.slug, service: s.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville, service: serviceSlug } = await params
  const city = CITIES_MAP[ville]
  const service = SERVICES_MAP[serviceSlug]
  if (!city || !service) return {}

  const title = `${service.title} à ${city.label}`
  const description = `SOLIDEM intervient en ${service.title.toLowerCase()} à ${city.label} et dans tout le département ${city.dept}. Diagnostic gratuit, réponse sous 48h. Entreprise basée à Deuil-la-Barre (95).`

  return {
    title,
    description,
    keywords: [
      ...service.keywords,
      city.label,
      `${serviceSlug} ${city.label}`,
      `entreprise ${serviceSlug} ${city.label}`,
    ],
    alternates: { canonical: `${SITE_URL}/local/${ville}/${serviceSlug}` },
    openGraph: {
      title: `${title} | SOLIDEM`,
      description,
      url: `${SITE_URL}/local/${ville}/${serviceSlug}`,
    },
  }
}

export default async function LocalPage({ params }: Props) {
  const { ville, service: serviceSlug } = await params
  const city = CITIES_MAP[ville]
  const service = SERVICES_MAP[serviceSlug]
  if (!city || !service) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SOLIDEM',
    description: `Spécialiste en ${service.title.toLowerCase()} à ${city.label} et en Île-de-France.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '28 Rue de l\'Église',
      addressLocality: 'Deuil-la-Barre',
      postalCode: '95170',
      addressCountry: 'FR',
    },
    telephone: '+33682635148',
    url: SITE_URL,
    areaServed: [
      { '@type': 'City', name: city.label },
      { '@type': 'State', name: 'Île-de-France' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ background: '#111111', minHeight: '100vh', color: '#ffffff', fontFamily: 'Poppins, sans-serif' }}>
        <section style={{
          padding: 'clamp(100px, 12vw, 160px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#F7C100',
            marginBottom: '20px',
          }}>
            {city.label} · {city.dept === '75' ? 'Paris' : `Département ${city.dept}`}
          </p>

          <h1 style={{
            fontSize: 'clamp(28px, 4.5vw, 58px)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
          }}>
            {service.title}<br />
            <span style={{ color: '#F7C100' }}>à {city.label}</span>
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75,
            maxWidth: '620px',
            margin: '0 0 16px',
          }}>
            SOLIDEM intervient en {service.title.toLowerCase()} à {city.label} et dans l&apos;ensemble
            du département {city.dept}, basé à Deuil-la-Barre (95).
            Chaque intervention est précédée d&apos;un diagnostic terrain — aucun devis n&apos;est établi sans.
          </p>

          <p style={{
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            maxWidth: '580px',
            margin: '0 0 40px',
          }}>
            {service.intro}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '13px 28px',
                background: '#F7C100',
                color: '#111111',
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: '6px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              Devis gratuit
            </a>
            <a
              href={`https://wa.me/33682635148?text=Bonjour, je cherche un prestataire pour de la ${service.title.toLowerCase()} à ${city.label}.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 24px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '6px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              WhatsApp
            </a>
          </div>
        </section>

        {/* Points */}
        <section style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 clamp(24px, 8vw, 120px) clamp(60px, 8vw, 80px)',
        }}>
          <h2 style={{
            fontSize: 'clamp(18px, 2vw, 26px)',
            fontWeight: 700,
            margin: '0 0 28px',
            color: '#ffffff',
          }}>
            Ce que nous faisons à {city.label}
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {service.points.map((pt, i) => (
              <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#F7C100', flexShrink: 0, marginTop: '2px' }}>▸</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{pt}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Zone d'intervention */}
        <section style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 clamp(24px, 8vw, 120px) clamp(80px, 10vw, 100px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '48px',
        }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            margin: '0 0 16px',
          }}>
            Zone d&apos;intervention
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '560px' }}>
            SOLIDEM intervient sur l&apos;ensemble de l&apos;Île-de-France : {city.label},{' '}
            {IDF_CITIES.filter(c => c.slug !== ville).slice(0, 6).map(c => c.label).join(', ')} et toute la région.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
            {IDF_CITIES.filter(c => c.slug !== ville).map(c => (
              <a
                key={c.slug}
                href={`/local/${c.slug}/${serviceSlug}`}
                style={{
                  padding: '6px 14px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                }}
              >
                {c.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
