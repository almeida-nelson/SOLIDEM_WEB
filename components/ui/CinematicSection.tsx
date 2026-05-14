'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface CinematicSectionProps {
  imageSrc?: string
  label?: string
  title: string
  body: React.ReactNode
  scrollHeight?: string
  id?: string
}

function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

function CinematicDesktop({
  imageSrc, label, title, body, scrollHeight = '220vh', id,
}: CinematicSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const scale          = useTransform(scrollYProgress, [0, 0.6],  [1.12, 1.0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.45], [0.85, 0.1])
  const textY          = useTransform(scrollYProgress, [0.05, 0.4],  [60, 0])
  const textOpacity    = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const labelY         = useTransform(scrollYProgress, [0.02, 0.3],  [40, 0])
  const labelOpacity   = useTransform(scrollYProgress, [0.02, 0.28], [0, 1])
  const clipPath       = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
  )

  // Cinematic exit — camera pulls back and lights fade
  const exitScale   = useTransform(scrollYProgress, [0.72, 1.0], [1,    0.94])
  const exitOpacity = useTransform(scrollYProgress, [0.72, 1.0], [1,    0   ])

  return (
    <div ref={containerRef} id={id} style={{ height: scrollHeight }}>
      <motion.div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: '#111111',
        scale: exitScale, opacity: exitOpacity,
        willChange: 'transform, opacity',
      }}>

        {imageSrc && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                inset: '-5%',
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                scale,
                willChange: 'transform',
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#000',
                opacity: overlayOpacity,
              }}
            />
          </>
        )}

        <div
          className="hero-content"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {label && (
            <motion.p
              style={{
                y: labelY,
                opacity: labelOpacity,
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#F7C100',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif',
                willChange: 'transform, opacity',
              }}
            >
              {label}
            </motion.p>
          )}

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              style={{
                clipPath,
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
                fontFamily: 'Poppins, sans-serif',
                margin: 0,
                marginBottom: '28px',
                willChange: 'clip-path',
                maxWidth: '769px',
              }}
            >
              {title}
            </motion.h2>
          </div>

          <motion.div
            style={{
              y: textY,
              opacity: textOpacity,
              willChange: 'transform, opacity',
              maxWidth: '700px',
            }}
          >
            {body}
          </motion.div>
        </div>

      </motion.div>
    </div>
  )
}

function CinematicMobile({
  imageSrc, label, title, body, id,
}: CinematicSectionProps) {
  return (
    <div
      id={id}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#111111',
      }}
    >
      {imageSrc && (
        <>
          {/* Background image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.62)',
            }}
          />
        </>
      )}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 6% 60px',
          maxWidth: '600px',
        }}
      >
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#F7C100',
              marginBottom: '16px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {label}
          </motion.p>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontSize: 'clamp(32px, 8vw, 52px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            fontFamily: 'Poppins, sans-serif',
            margin: 0,
            marginBottom: '24px',
          }}
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {body}
        </motion.div>
      </div>
    </div>
  )
}

export function CinematicSection(props: CinematicSectionProps) {
  const isMobile = useMobile()
  // Render nothing on the server (isMobile starts false), hydrate correctly on client
  return isMobile
    ? <CinematicMobile {...props} />
    : <CinematicDesktop {...props} />
}
