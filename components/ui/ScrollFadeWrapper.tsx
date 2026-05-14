'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollFadeWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0.3, 0.85], [1, 0])

  return (
    <div ref={wrapperRef} style={{ height: '200vh' }}>
      <motion.div style={{ position: 'sticky', top: 0, opacity, willChange: 'opacity' }}>
        {children}
      </motion.div>
    </div>
  )
}
