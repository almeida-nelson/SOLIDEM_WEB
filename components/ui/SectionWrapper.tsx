'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type SectionVariant = 'light' | 'dark' | 'gray'

interface SectionWrapperProps {
  children: React.ReactNode
  variant?: SectionVariant
  className?: string
  id?: string
  stagger?: boolean
  innerClassName?: string
}

const BG: Record<SectionVariant, string> = {
  light: 'bg-brand-white text-brand-black',
  dark:  'bg-brand-black text-brand-white',
  gray:  'bg-brand-gray  text-brand-black',
}

export function SectionWrapper({
  children,
  variant = 'light',
  className,
  id,
  stagger = false,
  innerClassName,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(BG[variant], 'transition-colors duration-500', className)}
    >
      {stagger ? (
        <motion.div
          className={cn('w-full', innerClassName)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          className={cn('w-full', innerClassName)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          {children}
        </motion.div>
      )}
    </section>
  )
}

/* ── Stagger item ── */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

/* ── ParallaxImage ── */
export function ParallaxImage({
  src,
  alt,
  className,
  strength = 0.12,
}: {
  src: string
  alt: string
  className?: string
  strength?: number
}) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '115%',
          marginTop: '-7.5%',
          willChange: 'transform',
        }}
        initial={{ y: `-${strength * 50}px` }}
        whileInView={{ y: `${strength * 50}px` }}
        viewport={{ once: false, amount: 0 }}
        transition={{ duration: 0, ease: 'linear' }}
        aria-label={alt}
        role="img"
      />
    </div>
  )
}
