import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'SOLIDEM — Dépollution · Déconstruction · Terrassement'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const logoData = readFileSync(join(process.cwd(), 'public/assets/SOLIDEM BLACK CROP2.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          padding: '72px 80px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="SOLIDEM"
            width={400}
            height={115}
            style={{ objectFit: 'contain', objectPosition: 'left' }}
          />
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 56, height: 4, backgroundColor: '#F7C100', borderRadius: 2 }} />
          <div style={{ fontSize: 54, fontWeight: 700, color: '#111827', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Transformer l&apos;Avenir
          </div>
          <div style={{ fontSize: 54, fontWeight: 300, color: '#374151', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            par l&apos;Excellence
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 18, color: '#6B7280', letterSpacing: '0.04em' }}>
            Deuil-la-Barre · Val-d&apos;Oise · Île-de-France
          </div>
          <div style={{ fontSize: 14, color: '#F7C100', fontWeight: 600, letterSpacing: '0.15em' }}>
            solidem.fr
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
