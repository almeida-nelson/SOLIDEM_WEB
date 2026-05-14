"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  initials: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  autoPlayInterval?: number
}

export function Testimonials({ testimonials, autoPlayInterval = 5000 }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const isAnimatingRef = useRef(false)
  const activeIndexRef = useRef(0)

  useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])

  const longestQuote = testimonials.reduce((a, b) =>
    a.quote.length > b.quote.length ? a : b
  ).quote

  const handleSelect = (index: number) => {
    if (index === activeIndexRef.current || isAnimatingRef.current) return
    isAnimatingRef.current = true
    setIsAnimating(true)
    setTimeout(() => {
      setDisplayedIndex(index)
      setActiveIndex(index)
      activeIndexRef.current = index
      setTimeout(() => {
        setIsAnimating(false)
        isAnimatingRef.current = false
      }, 400)
    }, 250)
  }

  // Auto-rotation — uses refs to avoid stale closures
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      const next = (activeIndexRef.current + 1) % testimonials.length
      handleSelect(next)
    }, autoPlayInterval)
    return () => clearInterval(id)
  }, [isPaused, testimonials.length, autoPlayInterval])

  const displayed = testimonials[displayedIndex]

  return (
    <div
      className="flex flex-col items-center gap-10 py-16 px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Quote — fixed height via invisible spacer */}
      <div className="relative px-8 max-w-2xl w-full">
        <span className="absolute -left-2 -top-6 text-8xl font-serif text-white/5 select-none pointer-events-none">
          "
        </span>

        <div style={{ position: 'relative' }}>
          {/* Invisible spacer sized to the longest quote — height never changes */}
          <p
            aria-hidden
            className="text-xl md:text-2xl font-light text-center leading-relaxed"
            style={{ visibility: 'hidden', pointerEvents: 'none', userSelect: 'none' }}
          >
            {longestQuote}
          </p>

          {/* All quotes absolutely overlaid — only the active one is visible */}
          {testimonials.map((t, i) => (
            <p
              key={t.id}
              className="text-xl md:text-2xl font-light text-gray-200 text-center leading-relaxed"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                opacity: activeIndex === i && !isAnimating ? 1 : 0,
                transform: activeIndex === i && !isAnimating ? 'translateY(0) translateZ(0)' : 'translateY(6px) translateZ(0)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                willChange: 'opacity, transform',
                pointerEvents: activeIndex === i ? 'auto' : 'none',
              }}
            >
              {t.quote}
            </p>
          ))}
        </div>

        <span className="absolute -right-2 -bottom-8 text-8xl font-serif text-white/5 select-none pointer-events-none">
          "
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        {/* Role */}
        <p
          className="text-xs text-yellow-400/70 tracking-[0.25em] uppercase"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
          }}
        >
          {displayed.role}
        </p>

        {/* Avatar selectors */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {testimonials.map((t, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={t.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center rounded-full cursor-pointer",
                  isActive ? "bg-white shadow-lg" : "bg-transparent hover:bg-white/10",
                  showName ? "pr-4 pl-2 py-2 gap-0" : "p-0.5",
                )}
              style={{ transition: 'background-color 0.3s ease, padding 0.3s ease' }}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    "text-xs font-bold",
                    isActive
                      ? "bg-[#F7C100] text-black ring-2 ring-white/30"
                      : "bg-white/10 text-white/70",
                  )}
                style={{ transition: 'background-color 0.3s ease' }}
                >
                  {t.initials}
                </div>

                <div
                  style={{
                    overflow: 'hidden',
                    maxWidth: showName ? '160px' : '0px',
                    opacity: showName ? 1 : 0,
                    marginLeft: showName ? '8px' : '0px',
                    transition: 'max-width 0.35s ease, opacity 0.35s ease, margin-left 0.35s ease',
                    willChange: 'max-width, opacity',
                  }}
                >
                  <span
                    className="text-sm font-medium whitespace-nowrap block"
                    style={{ color: isActive ? '#000' : '#fff', transition: 'color 0.3s ease' }}
                  >
                    {t.author}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
