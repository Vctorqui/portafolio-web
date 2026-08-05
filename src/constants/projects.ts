/**
 * Source of truth for the Work section until getStaticProps reads Supabase.
 * Mirror: supabase/seed/projects.sql
 */

export type ProjectKind = 'featured' | 'real_estate'
export type ProjectStatus = 'work' | 'personal'

export type ProjectRecord = {
  id: string
  title: string
  spanish_description: string
  english_description: string
  stack: string[]
  preview_link?: string
  image?: string
  kind: ProjectKind
  status: ProjectStatus
  sort_order: number
  is_pinned: boolean
  /** Migrated Firebase count; UI hides likes until Supabase wiring. */
  likes: number
}

export const featuredProjects: ProjectRecord[] = [
  {
    id: 'english-al-toque',
    title: 'English al Toque',
    spanish_description:
      'Landing para clases de inglés online a medida: diagnóstico por WhatsApp, tipos de clase y planes claros para jóvenes y adultos.',
    english_description:
      'Landing for tailored online English classes: WhatsApp intake, class types, and clear plans for teens and adults.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    preview_link: 'https://englishaltoque.lat/',
    kind: 'featured',
    status: 'work',
    sort_order: 1,
    is_pinned: true,
    likes: 0,
  },
  {
    id: 'ac-maquetas',
    title: 'AC Maquetas',
    spanish_description:
      'Sitio de servicio para maquetas y trabajos escolares en Antofagasta: portfolio, flujo de pedido y contacto directo.',
    english_description:
      'Service site for school models and academic projects in Antofagasta: portfolio, order flow, and direct contact.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    preview_link: 'https://acmaquetas.lat/',
    kind: 'featured',
    status: 'work',
    sort_order: 2,
    is_pinned: true,
    likes: 0,
  },
  {
    id: 'share-it',
    title: 'ShareIT',
    spanish_description:
      'Sitio en Astro para la comunidad argentina ShareIT: ideología, artículos y recursos compartidos por la propia comunidad.',
    english_description:
      'Astro site for the Argentine ShareIT community: values, articles, and resources shared by members.',
    stack: ['Astro', 'TypeScript', 'Tailwind', 'React', 'FastAPI'],
    preview_link: 'https://share-it.tech/',
    image: '/images/21.webp',
    kind: 'featured',
    status: 'work',
    sort_order: 3,
    is_pinned: true,
    likes: 12,
  },
  {
    id: 'cursoflow',
    title: 'CursoFlow',
    spanish_description:
      'Plataforma de concentración para el estudio: seguimiento académico y foco en sesiones de aprendizaje sin ruido.',
    english_description:
      'Study-focus platform: academic tracking and calm sessions built for concentration, not clutter.',
    stack: ['Next.js', 'TypeScript', 'Radix'],
    preview_link: 'https://cursoflow.netlify.app/',
    image: '/images/20.webp',
    kind: 'featured',
    status: 'personal',
    sort_order: 4,
    is_pinned: true,
    likes: 6,
  },
  {
    id: 'talks-infocasas',
    title: 'Talks Infocasas',
    spanish_description:
      'Sitio de evento sobre inteligencia artificial, liderazgo y marketing: agenda clara y diseño pensado para conversión.',
    english_description:
      'Event site covering AI, leadership, and marketing — clear agenda and conversion-minded layout.',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    preview_link: 'https://talks.infocasas.com.uy/',
    image: '/images/9.webp',
    kind: 'featured',
    status: 'work',
    sort_order: 5,
    is_pinned: false,
    likes: 55,
  },
  {
    id: 'blue-way',
    title: 'Blue Way Transportation',
    spanish_description:
      'App web de transporte no urgente: pasajeros, centros de rehabilitación y familiares agendan viajes según condición y disponibilidad.',
    english_description:
      'Non-emergency transportation web app: passengers, rehab centers, and family members schedule trips by condition and availability.',
    stack: ['React', 'Next.js', 'TypeScript', 'MUI'],
    preview_link: 'https://bluewayisbetter.com',
    image: '/images/6.webp',
    kind: 'featured',
    status: 'work',
    sort_order: 6,
    is_pinned: true,
    likes: 34,
  },
  {
    id: 'subasta-propiedades',
    title: 'Subasta de Propiedades',
    spanish_description:
      'Marketplace de subastas inmobiliarias con registro, puja, dashboard del proceso y favoritos.',
    english_description:
      'Property auction marketplace with registration, bidding, process dashboard, and favorites.',
    stack: ['React', 'Next.js', 'TypeScript', 'MUI'],
    preview_link: 'https://subastadepropiedades.com/',
    image: '/images/5.webp',
    kind: 'featured',
    status: 'work',
    sort_order: 7,
    is_pinned: true,
    likes: 42,
  },
  {
    id: 'dragon-ball-manager',
    title: 'Dragon Ball Manager',
    spanish_description:
      'Proyecto personal nacido como prueba técnica: registro y CRUD de cartas de personajes favoritos con formularios tipados.',
    english_description:
      'Personal project from a technical interview: register and CRUD favorite character cards with typed forms.',
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'MUI',
      'Zod',
      'React Hook Form',
    ],
    preview_link: 'https://github.com/Vctorqui/apolo_web_prueba_tecnica',
    image: '/images/11.webp',
    kind: 'featured',
    status: 'personal',
    sort_order: 8,
    is_pinned: true,
    likes: 13,
  },
  {
    id: 'note-manager',
    title: 'Note Manager',
    spanish_description:
      'Gestor de notas y categorías (CRUD y filtros). Sin deploy: con MongoDB configurado, un script de setup levanta el stack local en minutos.',
    english_description:
      'Notes and categories manager (CRUD and filters). No hosted demo — with MongoDB set up, a setup script boots the full local stack quickly.',
    stack: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Express.js',
      'Node.js',
      'MongoDB',
    ],
    preview_link: 'https://github.com/Vctorqui/note_manager',
    image: '/images/12.webp',
    kind: 'featured',
    status: 'personal',
    sort_order: 9,
    is_pinned: false,
    likes: 7,
  },
]

export const realEstateProjects: ProjectRecord[] = [
  {
    id: 'lyon',
    title: 'Lyon',
    spanish_description:
      'Landing del proyecto residencial Lyon (Uruguay): beneficios, tipologías y llamado a la acción para compradores.',
    english_description:
      'Landing for the Lyon residential project (Uruguay): benefits, typologies, and a clear CTA for buyers.',
    stack: ['HTML5', 'CSS3', 'Sass', 'Bootstrap', 'JavaScript'],
    preview_link: 'https://lyon.com.uy/',
    image: '/images/2.webp',
    kind: 'real_estate',
    status: 'work',
    sort_order: 10,
    is_pinned: false,
    likes: 18,
  },
  {
    id: 'lisboa',
    title: 'Lisboa',
    spanish_description:
      'Landing del proyecto residencial Lisboa (Paraguay): presentación clara de espacios y propuesta de valor.',
    english_description:
      'Landing for the Lisboa residential project (Paraguay): clear presentation of spaces and value proposition.',
    stack: ['HTML5', 'CSS3', 'Sass', 'Bootstrap', 'JavaScript'],
    preview_link: 'https://lisboa.com.py/',
    image: '/images/1.webp',
    kind: 'real_estate',
    status: 'work',
    sort_order: 11,
    is_pinned: false,
    likes: 12,
  },
  {
    id: 'floraria',
    title: 'Floraria',
    spanish_description:
      'Landing del proyecto residencial Floraria (Uruguay): foco en amenities y recorrido comercial del desarrollo.',
    english_description:
      'Landing for the Floraria residential project (Uruguay): amenities-first tour of the development.',
    stack: ['HTML5', 'CSS3', 'Sass', 'Bootstrap', 'JavaScript'],
    preview_link: 'https://floralia.com.uy/',
    image: '/images/8.webp',
    kind: 'real_estate',
    status: 'work',
    sort_order: 12,
    is_pinned: false,
    likes: 30,
  },
  {
    id: 'la-pituca',
    title: 'La Pituca',
    spanish_description:
      'Landing del proyecto residencial La Pituca (Paraguay): ventajas, comodidades y opciones para quien busca invertir.',
    english_description:
      'Landing for La Pituca residential project (Paraguay): benefits, amenities, and options for buyers.',
    stack: ['HTML5', 'CSS3', 'Sass', 'Bootstrap', 'JavaScript'],
    preview_link: 'https://lapituca.com.py/',
    image: '/images/3.webp',
    kind: 'real_estate',
    status: 'work',
    sort_order: 13,
    is_pinned: false,
    likes: 26,
  },
]

/** Featured first, then real estate — same order as seed. */
export const projects: ProjectRecord[] = [
  ...featuredProjects,
  ...realEstateProjects,
]
