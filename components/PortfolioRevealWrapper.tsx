'use client';

import { useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// How many px of Lenis-smoothed scroll the wipe-in covers
const REVEAL_PX = 220;

export default function PortfolioRevealWrapper({ children }: { children: React.ReactNode }) {
  const ref         = useRef<HTMLDivElement>(null);
  const lenisScroll  = useMotionValue(0);
  const absTop      = useRef(0);
  const innerHeight = useRef(900); // SSR-safe fallback

  // All window access happens client-side only
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      innerHeight.current = window.innerHeight;
      absTop.current = ref.current.getBoundingClientRect().top + window.scrollY;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Subscribe to Lenis's lerp-smoothed scroll value
  useLenis(({ scroll }) => {
    lenisScroll.set(scroll);
  });

  // Wipe from right: fully hidden → fully visible over REVEAL_PX of smoothed scroll
  const clipPath = useTransform(lenisScroll, (scroll) => {
    const triggerAt = absTop.current - innerHeight.current;
    const progress  = Math.max(0, Math.min(1, (scroll - triggerAt) / REVEAL_PX));
    const hidden    = ((1 - progress) * 100).toFixed(1);
    return `inset(0% ${hidden}% 0% 0%)`;
  });

  return (
    <div ref={ref}>
      <motion.div style={{ clipPath, willChange: 'clip-path' }}>
        {children}
      </motion.div>
    </div>
  );
}
