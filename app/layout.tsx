import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import ChatWidget from '@/components/ChatWidget';
import ContactModal from '@/components/ContactModal';
import AOSInit from '@/components/AOSInit';

const poppins = Poppins({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const SITE_URL = 'https://www.solidem.fr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: 'JQ3S0BqxUk6f9pMnHUceJuobypFcdlk9kYkcVwFYybo',
  },
  title: {
    default: 'SOLIDEM | Déconstruction, Dépollution, Terrassement & VRD – Deuil-la-Barre (95)',
    template: '%s | SOLIDEM',
  },
  description:
    "SOLIDEM, entreprise spécialisée en déconstruction, dépollution, terrassement et aménagements extérieurs (VRD, paysager). Interventions en Île-de-France, basée à Deuil-la-Barre (95). Devis gratuit.",
  keywords: [
    'déconstruction', 'démolition', 'dépollution', 'terrassement',
    'aménagements extérieurs', 'VRD', 'voirie réseaux divers',
    'Deuil-la-Barre', 'Val-d\'Oise', 'Île-de-France',
    'SOLIDEM', 'travaux préparatoires', 'dépose douce',
  ],
  authors: [{ name: 'SOLIDEM', url: SITE_URL }],
  creator: 'SOLIDEM',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'SOLIDEM',
    title: 'SOLIDEM | Déconstruction, Dépollution, Terrassement & VRD',
    description:
      "Spécialiste en déconstruction, dépollution, terrassement et VRD en Île-de-France. Basé à Deuil-la-Barre (95). Demandez votre devis gratuit.",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SOLIDEM – Déconstruction, Dépollution, Terrassement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLIDEM | Déconstruction, Dépollution, Terrassement & VRD',
    description:
      "Spécialiste en travaux préparatoires en Île-de-France. Devis gratuit.",
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SOLIDEM",
  "description": "Entreprise spécialisée en déconstruction, dépollution, terrassement et aménagements extérieurs (VRD).",
  "url": SITE_URL,
  "email": "contact@solidem.pro",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "28 Rue de l'Église",
    "addressLocality": "Deuil-la-Barre",
    "postalCode": "95170",
    "addressCountry": "FR",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.9754,
    "longitude": 2.3289,
  },
  "areaServed": {
    "@type": "State",
    "name": "Île-de-France",
  },
  "serviceType": [
    "Déconstruction", "Démolition", "Dépollution",
    "Terrassement", "VRD", "Aménagements Extérieurs",
  ],
  "logo": `${SITE_URL}/assets/logosolidem-11.svg`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${roboto.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/logosolidem-11.svg" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <LenisProvider>
          <Navbar />
          {children}
          <FooterSection />
          <ChatWidget />
          <ContactModal />
          <AOSInit />
        </LenisProvider>
      </body>
    </html>
  );
}
