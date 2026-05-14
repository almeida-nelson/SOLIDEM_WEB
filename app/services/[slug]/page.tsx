import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES, SERVICES_MAP } from '@/lib/seo-data'
import { ChatCTAPrimary } from '@/components/ui/ChatCTA'

const SITE_URL = 'https://www.solidem.fr'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_MAP[slug]
  if (!service) return {}

  return {
    title: service.title,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: {
      title: `${service.title} | SOLIDEM`,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${slug}`,
      images: [{ url: service.image, width: 800, height: 600, alt: service.title }],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = SERVICES_MAP[slug]
  if (!service) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'SOLIDEM',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '28 Rue de l\'Église',
        addressLocality: 'Deuil-la-Barre',
        postalCode: '95170',
        addressCountry: 'FR',
      },
      telephone: '+33682635148',
      url: SITE_URL,
    },
    areaServed: { '@type': 'State', name: 'Île-de-France' },
    url: `${SITE_URL}/services/${slug}`,
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
          padding: 'clamp(100px, 12vw, 160px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#F7C100',
            marginBottom: '20px',
          }}>
            Nos Services
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 24px',
            maxWidth: '800px',
          }}>
            {service.headline}
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75,
            maxWidth: '620px',
            margin: '0 0 48px',
          }}>
            {service.intro}
          </p>

          <ChatCTAPrimary />
        </section>

        {/* Content */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(24px, 8vw, 120px) clamp(80px, 10vw, 120px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}>
          {/* Points */}
          <div>
            <h2 style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 28px',
            }}>
              Ce que nous faisons
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {service.points.map((pt, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#F7C100', flexShrink: 0, marginTop: '3px' }}>▸</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust block */}
          <div style={{
            padding: '32px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
          }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F7C100', margin: '0 0 16px' }}>
              Pourquoi SOLIDEM
            </p>
            {[
              'Diagnostic terrain avant tout devis',
              'Décennale + RC Pro — SMA SA & ATOUTP Global',
              'Interventions en Île-de-France (8 départements)',
              'Réponse sous 24 à 48h ouvrées',
              'Bordereau de suivi des déchets remis systématiquement',
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                marginBottom: '12px',
              }}>
                <span style={{ color: '#F7C100', flexShrink: 0, fontSize: '10px', marginTop: '5px' }}>●</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '24px', paddingTop: '20px' }}>
              <a
                href={`https://wa.me/33682635148`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Nous contacter sur WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(24px, 8vw, 120px) clamp(80px, 10vw, 120px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '60px',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 24px' }}>
            Autres services
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {SERVICES.filter(s => s.slug !== slug).map(s => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                style={{
                  padding: '10px 20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                {s.title}
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
