'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

// GPU-composited: background-position animated via CSS @keyframes runs on
// the compositor thread — no JS per frame, no SVG repaints.
const GRID_CSS: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px',
  animation: 'grid-drift 1.667s linear infinite',
}

const KEYFRAMES = `
  @keyframes grid-drift {
    from { background-position: 0px 0px; }
    to   { background-position: 40px 40px; }
  }
`

export default function GlobalGrid() {
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  // mask-image update goes straight to compositor — no layout, no paint
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* Base layer — faint texture, fully compositor */}
      <div
        style={{
          position: 'absolute', inset: 0,
          zIndex: 2, opacity: 0.06,
          pointerEvents: 'none',
          ...GRID_CSS,
        }}
      />

      {/* Reveal layer — cursor halo, mask updated off main thread */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          zIndex: 2, opacity: 0.40,
          maskImage, WebkitMaskImage: maskImage,
          pointerEvents: 'none',
          ...GRID_CSS,
        }}
      />
    </>
  )
}
