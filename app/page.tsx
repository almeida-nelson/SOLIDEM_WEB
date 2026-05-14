import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutPortfolioSection from '@/components/AboutPortfolioSection';
import ClientsCarousel from '@/components/ClientsCarousel';
import MethodologySection from '@/components/MethodologySection';
import EngagementsSection from '@/components/EngagementsSection';
import MapSection from '@/components/MapSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={
        <section style={{ padding: '20px 0' }}>
          <div style={{ padding: '40px', textAlign: 'center' }}>Chargement...</div>
        </section>
      }>
        <AboutPortfolioSection />
      </Suspense>
      <MethodologySection />
      <EngagementsSection />
      <ClientsCarousel />
      <MapSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
