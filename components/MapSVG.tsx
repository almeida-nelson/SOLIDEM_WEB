'use client'

import { useEffect, useState } from 'react'

const MIN_LON = 1.3,  MAX_LON = 3.7
const MIN_LAT = 47.95, MAX_LAT = 49.38
const W = 500, H = 500

function px(lon: number): number {
  return ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * W
}
function py(lat: number): number {
  return H - ((lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * H
}

type Ring = [number, number][]
type GeoFeature = {
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: Ring[][] | Ring[][][]
  }
}

function ringToD(ring: Ring): string {
  return ring.map(([lon, lat], i) =>
    `${i === 0 ? 'M' : 'L'}${px(lon).toFixed(1)},${py(lat).toFixed(1)}`
  ).join(' ') + ' Z'
}

function featureToPath(f: GeoFeature): string {
  if (f.geometry.type === 'Polygon') {
    return (f.geometry.coordinates as Ring[][]).map(ringToD).join(' ')
  }
  return (f.geometry.coordinates as Ring[][][])
    .flatMap(poly => poly.map(ringToD))
    .join(' ')
}

// Deuil-la-Barre
const PIN_X = px(2.3256)
const PIN_Y = py(48.9747)

type FeatureData = GeoFeature & { properties: { code: string } }

export default function MapSVG() {
  const [all, setAll]   = useState<string[]>([])
  const [idf, setIdf]   = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson')
      .then(r => r.json())
      .then((data: { features: FeatureData[] }) => {
        const IDF = new Set(['75', '77', '78', '91', '92', '93', '94', '95'])
        setAll(data.features.map(featureToPath))
        setIdf(data.features.filter(f => IDF.has(f.properties.code)).map(featureToPath))
        setReady(true)
      })
      .catch(() => {})
  }, [])

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%' }}
      aria-hidden
    >
      {/* Background */}
      <rect width={W} height={H} fill="#0d0d0d" />

      {/* All French departments — muted background context */}
      {all.map((d, i) => (
        <path
          key={`all-${i}`}
          d={d}
          fill="rgba(255,255,255,0.015)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      ))}

      {/* IDF departments — highlighted */}
      {idf.map((d, i) => (
        <path
          key={`idf-${i}`}
          d={d}
          fill="rgba(247,193,0,0.05)"
          stroke="#F7C100"
          strokeWidth="1.5"
          strokeDasharray="4 7"
          strokeLinejoin="round"
        />
      ))}

      {/* Pin — Deuil-la-Barre */}
      {ready && (
        <g transform={`translate(${PIN_X}, ${PIN_Y})`}>
          <ellipse cx="0" cy="3" rx="5" ry="2.5" fill="rgba(0,0,0,0.4)" />
          <path
            d="M0,-18 C6,-18 10,-13 10,-8 C10,-2 0,4 0,4 C0,4 -10,-2 -10,-8 C-10,-13 -6,-18 0,-18 Z"
            fill="#F7C100"
          />
          <circle cx="0" cy="-9" r="3.5" fill="#0d0d0d" />
        </g>
      )}
    </svg>
  )
}
