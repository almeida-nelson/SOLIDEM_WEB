import type { MetadataRoute } from 'next'
import { SERVICES, IDF_CITIES } from '@/lib/seo-data'

const BASE = 'https://www.solidem.fr'

const REALISATIONS_SLUGS = [
  'terrassement-maconnerie',
  'amenagements-exterieurs',
  'terrassement',
  'maconnerie',
  'realisation',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const statics: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/cgv`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const services: MetadataRoute.Sitemap = SERVICES.map(s => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const realisations: MetadataRoute.Sitemap = REALISATIONS_SLUGS.map(slug => ({
    url: `${BASE}/realisations/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const local: MetadataRoute.Sitemap = IDF_CITIES.flatMap(city =>
    SERVICES.map(service => ({
      url: `${BASE}/local/${city.slug}/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...statics, ...services, ...realisations, ...local]
}
