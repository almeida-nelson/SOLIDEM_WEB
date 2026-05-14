'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const CENTER: [number, number] = [48.72, 2.38]
const MARKER_POS: [number, number] = [48.9747, 2.3256]

const GEO_STYLE = {
  color: '#F7C100',
  weight: 2,
  opacity: 1,
  fillColor: '#F7C100',
  fillOpacity: 0.04,
  dashArray: '4 7',
}

function MarkerLayer() {
  const map = useMap()

  useEffect(() => {
    let marker: L.Marker | null = null
    try {
      const icon = L.divIcon({
        className: '',
        html: `
          <div style="position:relative;width:20px;height:26px">
            <div style="
              width:20px;height:20px;
              background:#F7C100;
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
            "></div>
            <div style="
              position:absolute;top:4px;left:4px;
              width:12px;height:12px;
              background:#0d0d0d;
              border-radius:50%;
            "></div>
          </div>`,
        iconSize: [20, 26],
        iconAnchor: [10, 26],
      })

      marker = L.marker(MARKER_POS, { icon })
        .addTo(map)
        .bindTooltip('SOLIDEM — Deuil-la-Barre', {
          permanent: false,
          direction: 'top',
          offset: [0, -28],
          className: 'solidem-tooltip',
        })
    } catch {
      // React Strict Mode double-invoke: map pane not ready, skip silently
    }

    return () => { marker?.remove() }
  }, [map])

  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GeoData = any

export default function MapClient() {
  const [geoData, setGeoData] = useState<GeoData | null>(null)

  useEffect(() => {
    fetch('/api/idf-geo')
      .then(r => r.json())
      .then(setGeoData)
      .catch(() => {})
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <style>{`
        .leaflet-container { background: #0d0d0d !important; }
        .leaflet-control-zoom,
        .leaflet-control-attribution { display: none !important; }
        .solidem-tooltip {
          background: #111111 !important;
          border: 1px solid rgba(247,193,0,0.7) !important;
          color: #F7C100 !important;
          font-family: Poppins, sans-serif !important;
          font-size: 11px !important;
          letter-spacing: 0.06em !important;
          padding: 4px 10px !important;
          border-radius: 4px !important;
          box-shadow: 0 2px 14px rgba(0,0,0,0.7) !important;
        }
        .leaflet-tooltip-top.solidem-tooltip::before { border-top-color: rgba(247,193,0,0.7) !important; }
      `}</style>

      <MapContainer
        center={CENTER}
        zoom={9}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        keyboard={false}
        style={{ width: '100%', height: '100%', background: '#0d0d0d' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        {geoData && (
          <GeoJSON key="idf" data={geoData} style={() => GEO_STYLE} />
        )}
        <MarkerLayer />
      </MapContainer>
    </div>
  )
}
