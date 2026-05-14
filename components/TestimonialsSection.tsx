'use client';
import { motion } from 'framer-motion';
import { Testimonials } from '@/components/ui/unique-testimonial';

const REVIEWS = [
  {
    id: 1,
    quote: "Nelson a fait un travail formidable. Après une multitude de devis exorbitants ailleurs, nous sommes tombés sur Solidem. Très réactif, proactif, et de très bons conseils — même avant la signature du devis. Il nous tient informés avec photos à l'appui. Je recommande grandement.",
    author: 'Léa Amziane',
    role: 'Local Guide · Mai 2024',
    initials: 'LA',
  },
  {
    id: 2,
    quote: "J'ai été étonné de la précision et de la qualité du travail. Les conditions météo étaient difficiles, mais Nelson est venu sans interrompre le chantier — ce qui est rare. À chaque problème, une solution a été apportée. Compétent et fiable.",
    author: 'Vincent Charpentier',
    role: 'Client · Février 2024',
    initials: 'VC',
  },
  {
    id: 3,
    quote: "Intervention professionnelle et extrêmement efficace. La satisfaction est totale. Je recommande chaudement cette entreprise.",
    author: 'Jean Claude Perronnes',
    role: 'Client · Avril 2024',
    initials: 'JC',
  },
  {
    id: 4,
    quote: "Travail rapide et impeccable. Le tarif est tout à fait correct. Nettoyage du chantier parfait. Je vous recommanderai sans hésiter.",
    author: 'Philippe Simeau',
    role: 'Local Guide · 2023',
    initials: 'PS',
  },
  {
    id: 5,
    quote: "M. Nelson est venu pour retirer 30m³ de terre. Travail réalisé dans les temps et au tarif convenu. Travail sérieux, je conseille fortement.",
    author: 'Avril Aurore',
    role: 'Client · Novembre 2023',
    initials: 'AA',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" style={{ position: 'relative' }}>

      {/* Background image + overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/assets/20260105_153452.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'saturate(0.15)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,26,0.88)', zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }} className="testimonials-layout-outer">

        {/* Desktop: two-column. Mobile: stacked via CSS */}
        <div className="testimonials-split">

          {/* Left — label + title + CTA */}
          <div className="testimonials-split-left">
            <motion.p
              className="testimonials-label"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'block' }}
            >
              Témoignages
            </motion.p>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="testimonials-title"
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              >
                Ils nous font confiance
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ marginTop: '32px' }}
            >
              <a
                href="https://www.google.com/maps/search/?api=1&query=SOLIDEM+Deuil-la-Barre"
                target="_blank"
                rel="noopener noreferrer"
                className="testimonials-google-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Voir tous les avis sur Google
              </a>
            </motion.div>
          </div>

          {/* Right — testimonials component */}
          <div className="testimonials-split-right">
            <Testimonials testimonials={REVIEWS} />
          </div>

        </div>
      </div>

      <style>{`
        .testimonials-split {
          display: flex;
          align-items: center;
          max-width: 1300px;
          margin: 0 auto;
        }
        .testimonials-split-left {
          width: 38%;
          flex-shrink: 0;
          padding: 80px 48px 80px 8vw;
        }
        .testimonials-split-right {
          flex: 1;
          min-width: 0;
        }
        @media (max-width: 767px) {
          .testimonials-split {
            flex-direction: column;
          }
          .testimonials-split-left {
            width: 100%;
            padding: 64px 24px 32px;
          }
          .testimonials-split-right {
            width: 100%;
          }
          .testimonials-google-link {
            display: none;
          }
        }
      `}</style>

    </section>
  );
}
