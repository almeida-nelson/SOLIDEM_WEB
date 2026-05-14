"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface MediaItemType {
  id: number
  type: string
  title: string
  desc: string
  url: string
  span: string
  vimeoId?: string
}

const MediaItem = ({ item, className, onClick }: { item: MediaItemType; className?: string; onClick?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isBuffering, setIsBuffering] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsInView(e.isIntersecting)),
      { root: null, rootMargin: '50px', threshold: 0.1 }
    )
    if (videoRef.current) observer.observe(videoRef.current)
    return () => { if (videoRef.current) observer.unobserve(videoRef.current) }
  }, [])

  useEffect(() => {
    let mounted = true
    const handleVideoPlay = async () => {
      if (!videoRef.current || !isInView || !mounted) return
      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false)
          await videoRef.current.play()
        } else {
          setIsBuffering(true)
          await new Promise((resolve) => { if (videoRef.current) videoRef.current.oncanplay = resolve })
          if (mounted) { setIsBuffering(false); await videoRef.current.play() }
        }
      } catch (error) { console.warn('Video playback failed:', error) }
    }
    if (isInView) handleVideoPlay()
    else if (videoRef.current) videoRef.current.pause()
    return () => {
      mounted = false
      if (videoRef.current) { videoRef.current.pause(); videoRef.current.removeAttribute('src'); videoRef.current.load() }
    }
  }, [isInView])

  if (item.type === 'vimeo') {
    return (
      <div
        className={`${className} relative overflow-hidden cursor-pointer group`}
        onClick={onClick}
        style={{
          background: '#111',
          ...(item.url ? { backgroundImage: `url(${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
        }}
      >
        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-200" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '3px' }}>
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
          <p className="text-white text-xs font-medium truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {item.title}
          </p>
        </div>
      </div>
    )
  }

  if (item.type === 'video') {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video ref={videoRef} className="w-full h-full object-cover" onClick={onClick} playsInline muted loop preload="auto"
          style={{ opacity: isBuffering ? 0.8 : 1, transition: 'opacity 0.2s', transform: 'translateZ(0)', willChange: 'transform' }}>
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    )
  }

  return (
    <img src={item.url} alt={item.title} className={`${className} object-cover cursor-pointer`}
      onClick={onClick} loading="lazy" decoding="async" />
  )
}

// ── Lightbox — full-screen, click anywhere to close ──────────────────────────
const Lightbox = ({ item, onClose }: { item: MediaItemType; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-[92vw] max-h-[92vh]"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'vimeo' ? (
          <div style={{ width: '90vw', maxWidth: '960px', aspectRatio: '16/9', position: 'relative' }}>
            <iframe
              src={`https://player.vimeo.com/video/${item.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
              allow="autoplay; fullscreen; picture-in-picture"
              title={item.title}
            />
          </div>
        ) : item.type === 'video' ? (
          <video
            className="max-w-[92vw] max-h-[92vh] rounded-lg shadow-2xl"
            autoPlay playsInline controls loop
          >
            <source src={item.url} type="video/mp4" />
          </video>
        ) : (
          <img
            src={item.url}
            alt={item.title}
            className="max-w-[92vw] max-h-[92vh] rounded-lg shadow-2xl object-contain"
          />
        )}
      </motion.div>

      {/* Close button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        onClick={onClose}
        aria-label="Fermer"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  )
}

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItemType[]
  title: string
  description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && (
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
          )}
          {description && (
            <motion.p
              className="mt-2 text-sm sm:text-base text-gray-600"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]"
        initial="hidden" animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
      >
        {mediaItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
            onClick={() => setSelectedItem(item)}
            variants={{
              hidden: { scale: 0.92, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 350, damping: 25, delay: index * 0.04 } }
            }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <MediaItem item={item} className="absolute inset-0 w-full h-full" />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default InteractiveBentoGallery
