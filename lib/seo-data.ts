export const SERVICES = [
  {
    slug: 'deconstruction',
    title: 'Déconstruction & Démolition',
    headline: 'Dépose technique, démolition sélective ou totale',
    metaDescription:
      'SOLIDEM réalise vos travaux de déconstruction et démolition en Île-de-France. Démolition sélective, dépose technique, tri sélectif des matériaux. Basé à Deuil-la-Barre (95). Devis gratuit sous 48h.',
    keywords: [
      'déconstruction', 'démolition', 'dépose technique',
      'démolition sélective', 'démolition bâtiment', 'Île-de-France',
    ],
    image: '/assets/deconstruction.png',
    intro:
      "Chaque structure fait l'objet d'une évaluation préalable : nature des matériaux, contraintes de voisinage, présence éventuelle de pollutions. Les interventions sont conduites avec des techniques maîtrisées, un tri sélectif rigoureux sur site et une valorisation systématique des matériaux récupérables.",
    points: [
      'Démolition totale ou sélective selon cahier des charges',
      'Dépose douce avec préservation des éléments réutilisables',
      'Tri sélectif et valorisation des matériaux sur site',
      'Gestion complète des déchets — bordereau de suivi remis',
      'Intervention en milieu contraint (mitoyenneté, accessibilité réduite)',
    ],
  },
  {
    slug: 'depollution',
    title: 'Dépollution & Désamiantage',
    headline: 'Diagnostic, plan d\'action, intervention ciblée',
    metaDescription:
      'Dépollution amiante, HAP, hydrocarbures et métaux lourds en Île-de-France. SOLIDEM intervient après diagnostic terrain complet. Entreprise certifiée, basée à Deuil-la-Barre (95). Devis gratuit.',
    keywords: [
      'dépollution', 'désamiantage', 'amiante', 'HAP', 'hydrocarbures',
      'métaux lourds', 'dépollution sol', 'Île-de-France',
    ],
    image: '/assets/depollution.png',
    intro:
      "Amiante, HAP, hydrocarbures, métaux lourds — nous identifions précisément la nature et l'étendue de la pollution, dimensionnons l'intervention et procédons à la dépollution dans le strict respect de la réglementation. Aucun devis n'est établi sans une compréhension exhaustive du problème.",
    points: [
      'Diagnostic terrain et prélèvements avant toute intervention',
      'Plan de retrait amiante conforme réglementation SS4',
      'Dépollution des sols : HAP, hydrocarbures, métaux lourds',
      'Contrôle post-travaux et attestation de conformité',
      'Suivi administratif complet (BSDA, déclaration préalable)',
    ],
  },
  {
    slug: 'terrassement',
    title: 'Terrassement & Fouilles',
    headline: 'Fouilles, pleine masse, maîtrise des cotes',
    metaDescription:
      'Terrassement, fouilles et excavation en Île-de-France. SOLIDEM adapte ses équipements aux contraintes terrain. Petits volumes ou grandes excavations. Basé à Deuil-la-Barre (95). Devis gratuit.',
    keywords: [
      'terrassement', 'fouilles', 'excavation', 'déblai remblai',
      'pleine masse', 'terrassement Île-de-France', 'terrassement Val-d\'Oise',
    ],
    image: '/assets/deterrassessment.png',
    intro:
      "Petits volumes ou grandes excavations, terrain contraint ou dégagé — nous adaptons les équipements aux contraintes spécifiques du chantier. Les travaux sont exécutés selon les plans et niveaux définis, dans le respect rigoureux des délais contractuels.",
    points: [
      'Terrassement en pleine masse ou en fouilles ponctuelles',
      'Équipements adaptés : micro-pelle à engins de grande capacité',
      'Maîtrise des cotes et contrôle topographique',
      'Gestion des terres excavées et filières agréées',
      'Coordination avec les réseaux enterrés (DICT systématique)',
    ],
  },
  {
    slug: 'amenagements-exterieurs',
    title: 'Aménagements Extérieurs & VRD',
    headline: 'VRD, dallages, espaces verts — de la tranchée à la livraison',
    metaDescription:
      'Aménagements extérieurs, VRD et voirie en Île-de-France. Dallages, engazonnement, murs de soutènement, mise en conformité réseaux. SOLIDEM, basé à Deuil-la-Barre (95). Devis gratuit.',
    keywords: [
      'aménagements extérieurs', 'VRD', 'voirie réseaux divers',
      'dallage', 'engazonnement', 'murs de soutènement',
      'aménagement paysager', 'Île-de-France',
    ],
    image: '/assets/amenagements.png',
    intro:
      "VRD, dallages, engazonnement, plantations, murs de soutènement — de la tranchée à la livraison. Mise en conformité des réseaux existants intégrée : nous vous conseillons sur vos obligations réglementaires avant d'intervenir.",
    points: [
      'Voirie et réseaux divers : eau, assainissement, eaux pluviales',
      'Dallages, pavages et revêtements extérieurs',
      'Murs de soutènement béton ou gabions',
      'Engazonnement, plantation, aménagement paysager',
      'Mise en conformité réseaux existants intégrée au périmètre',
    ],
  },
]

export const SERVICES_MAP = Object.fromEntries(SERVICES.map(s => [s.slug, s]))

export const IDF_CITIES = [
  // Val-d'Oise (95) — département siège
  { slug: 'argenteuil', label: 'Argenteuil', dept: '95' },
  { slug: 'cergy', label: 'Cergy', dept: '95' },
  { slug: 'pontoise', label: 'Pontoise', dept: '95' },
  { slug: 'sarcelles', label: 'Sarcelles', dept: '95' },
  { slug: 'garges-les-gonesse', label: 'Garges-lès-Gonesse', dept: '95' },
  { slug: 'enghien-les-bains', label: 'Enghien-les-Bains', dept: '95' },
  { slug: 'montmorency', label: 'Montmorency', dept: '95' },
  { slug: 'saint-gratien', label: 'Saint-Gratien', dept: '95' },
  { slug: 'ermont', label: 'Ermont', dept: '95' },
  // Paris (75)
  { slug: 'paris', label: 'Paris', dept: '75' },
  // Seine-Saint-Denis (93)
  { slug: 'saint-denis', label: 'Saint-Denis', dept: '93' },
  { slug: 'aubervilliers', label: 'Aubervilliers', dept: '93' },
  { slug: 'bobigny', label: 'Bobigny', dept: '93' },
  { slug: 'montreuil', label: 'Montreuil', dept: '93' },
  // Hauts-de-Seine (92)
  { slug: 'nanterre', label: 'Nanterre', dept: '92' },
  { slug: 'asnieres-sur-seine', label: 'Asnières-sur-Seine', dept: '92' },
  { slug: 'levallois-perret', label: 'Levallois-Perret', dept: '92' },
  // Yvelines (78)
  { slug: 'versailles', label: 'Versailles', dept: '78' },
  { slug: 'saint-germain-en-laye', label: 'Saint-Germain-en-Laye', dept: '78' },
  // Val-de-Marne (94)
  { slug: 'creteil', label: 'Créteil', dept: '94' },
  // Essonne (91)
  { slug: 'evry-courcouronnes', label: 'Évry-Courcouronnes', dept: '91' },
  // Seine-et-Marne (77)
  { slug: 'melun', label: 'Melun', dept: '77' },
]

export const CITIES_MAP = Object.fromEntries(IDF_CITIES.map(c => [c.slug, c]))
