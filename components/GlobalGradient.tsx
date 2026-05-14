'use client'

import { useRef, useEffect, useState } from 'react'

// SOLIDEM brand colours — dark warm amber + deep navy
const CFG = {
  bgStart:  'rgb(20, 14, 6)',
  bgEnd:    'rgb(8, 12, 25)',
  first:    '220, 140, 0',   // warm amber
  second:   '180, 90,  0',   // deep amber
  third:    '10,  40, 100',  // deep navy
  fourth:   '247, 193, 0',   // SOLIDEM yellow
  fifth:    '5,   25,  70',  // very deep navy
  pointer:  '247, 193, 0',   // SOLIDEM yellow cursor glow
  size:     '80%',
}

const BLEND = 'hard-light'

export default function GlobalGradient() {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const tgX = useRef(0)
  const tgY = useRef(0)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  // Global mouse tracking — works even with pointer-events: none on parent
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      tgX.current = e.clientX
      tgY.current = e.clientY
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Smooth lerp of pointer orb
  useEffect(() => {
    let curX = 0, curY = 0
    let raf: number

    const animate = () => {
      curX += (tgX.current - curX) / 20
      curY += (tgY.current - curY) / 20
      if (interactiveRef.current) {
        interactiveRef.current.style.transform =
          `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const sz = CFG.size
  const center = `top-[calc(50%-${sz}/2)] left-[calc(50%-${sz}/2)]`
  const base = `absolute w-[${sz}] h-[${sz}] ${center}`

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* Hidden SVG filter for goo effect */}
      <svg className="hidden">
        <defs>
          <filter id="global-gradient-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(40deg, ${CFG.bgStart}, ${CFG.bgEnd})` }}
      />

      {/* Orb layer */}
      <div
        className={`absolute inset-0 blur-lg ${isSafari ? 'blur-2xl' : '[filter:url(#global-gradient-blur)_blur(40px)]'}`}
      >
        {/* Orb 1 */}
        <div
          className={`absolute opacity-100 animate-first [mix-blend-mode:${BLEND}] w-[${sz}] h-[${sz}] [transform-origin:center_center]`}
          style={{
            background: `radial-gradient(circle at center, rgb(${CFG.first}) 0, rgb(${CFG.first}) 50%) no-repeat`,
            mixBlendMode: BLEND as React.CSSProperties['mixBlendMode'],
            width: sz, height: sz,
            top: `calc(50% - ${sz} / 2)`, left: `calc(50% - ${sz} / 2)`,
            transformOrigin: 'center center',
          }}
        />
        {/* Orb 2 */}
        <div
          className="absolute opacity-100 animate-second"
          style={{
            background: `radial-gradient(circle at center, rgba(${CFG.second}, 0.8) 0, rgba(${CFG.second}, 0) 50%) no-repeat`,
            mixBlendMode: BLEND as React.CSSProperties['mixBlendMode'],
            width: sz, height: sz,
            top: `calc(50% - ${sz} / 2)`, left: `calc(50% - ${sz} / 2)`,
            transformOrigin: 'calc(50% - 400px)',
          }}
        />
        {/* Orb 3 */}
        <div
          className="absolute opacity-100 animate-third"
          style={{
            background: `radial-gradient(circle at center, rgba(${CFG.third}, 0.8) 0, rgba(${CFG.third}, 0) 50%) no-repeat`,
            mixBlendMode: BLEND as React.CSSProperties['mixBlendMode'],
            width: sz, height: sz,
            top: `calc(50% - ${sz} / 2)`, left: `calc(50% - ${sz} / 2)`,
            transformOrigin: 'calc(50% + 400px)',
          }}
        />
        {/* Orb 4 */}
        <div
          className="absolute opacity-70 animate-fourth"
          style={{
            background: `radial-gradient(circle at center, rgba(${CFG.fourth}, 0.8) 0, rgba(${CFG.fourth}, 0) 50%) no-repeat`,
            mixBlendMode: BLEND as React.CSSProperties['mixBlendMode'],
            width: sz, height: sz,
            top: `calc(50% - ${sz} / 2)`, left: `calc(50% - ${sz} / 2)`,
            transformOrigin: 'calc(50% - 200px)',
          }}
        />
        {/* Orb 5 */}
        <div
          className="absolute opacity-100 animate-fifth"
          style={{
            background: `radial-gradient(circle at center, rgba(${CFG.fifth}, 0.8) 0, rgba(${CFG.fifth}, 0) 50%) no-repeat`,
            mixBlendMode: BLEND as React.CSSProperties['mixBlendMode'],
            width: sz, height: sz,
            top: `calc(50% - ${sz} / 2)`, left: `calc(50% - ${sz} / 2)`,
            transformOrigin: 'calc(50% - 800px) calc(50% + 800px)',
          }}
        />
        {/* Interactive pointer orb — tracked via window.mousemove */}
        <div
          ref={interactiveRef}
          className="absolute opacity-70"
          style={{
            background: `radial-gradient(circle at center, rgba(${CFG.pointer}, 0.8) 0, rgba(${CFG.pointer}, 0) 50%) no-repeat`,
            mixBlendMode: BLEND as React.CSSProperties['mixBlendMode'],
            width: '100%', height: '100%',
            top: '-50%', left: '-50%',
          }}
        />
      </div>
    </div>
  )
}
