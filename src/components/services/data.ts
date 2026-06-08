import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Code2,
  FileCheck2,
  Github,
  Globe2,
  LayoutDashboard,
  Linkedin,
  Mail,
  MessageCircle,
  PanelsTopLeft,
  Rocket,
  SearchCheck,
  Settings2,
  Smartphone,
  Sparkles,
  UserRound,
  Workflow,
} from 'lucide-react'

export const quoteHref =
  'mailto:victor.quinones.ch@gmail.com?subject=Cotizacion%20desarrollo%20web&body=Hola%20Victor,%20quiero%20cotizar%20un%20sitio%20web.'

export const whatsappHref =
  'https://wa.me/56976991810?text=Hola%20Victor,%20quiero%20cotizar%20un%20sitio%20web.'

export const services = [
  {
    title: 'Landing Pages',
    description:
      'Páginas enfocadas en presentar tu producto, servicio o negocio de forma clara, rápida y profesional.',
    icon: PanelsTopLeft,
  },
  {
    title: 'Sitios Corporativos',
    description:
      'Webs para empresas que necesitan mostrar quiénes son, qué ofrecen y facilitar el contacto con nuevos clientes.',
    icon: Building2,
  },
  {
    title: 'Portafolios',
    description:
      'Sitios personalizados para profesionales, arquitectos, diseñadores, fotógrafos o freelancers que quieren mostrar su trabajo.',
    icon: UserRound,
  },
  {
    title: 'Desarrollo Web Personalizado',
    description:
      'Soluciones web adaptadas a necesidades específicas, con posibilidad de escalar hacia automatizaciones, dashboards o aplicaciones internas.',
    icon: Code2,
  },
]

export const processSteps = [
  {
    title: 'Diagnóstico',
    description:
      'Revisamos qué necesitas, a quién quieres llegar y cuál es el objetivo real del sitio.',
  },
  {
    title: 'Propuesta',
    description:
      'Definimos estructura, estilo visual, contenido, alcance y prioridades para avanzar con claridad.',
  },
  {
    title: 'Desarrollo',
    description:
      'Construyo el sitio con buenas prácticas, responsive design, performance y una base fácil de escalar.',
  },
  {
    title: 'Entrega',
    description:
      'Publico la web y te explico cómo mantenerla, actualizarla o seguir creciendo después del lanzamiento.',
  },
]

export const benefits = [
  { label: 'Diseño responsive', icon: Smartphone },
  { label: 'Sitios rápidos y optimizados', icon: Rocket },
  { label: 'Integración con WhatsApp', icon: MessageCircle },
  { label: 'Formularios de contacto', icon: Mail },
  { label: 'SEO básico', icon: SearchCheck },
  { label: 'Código limpio y escalable', icon: FileCheck2 },
  { label: 'Mantenimiento mensual', icon: Settings2 },
  { label: 'Listo para automatizaciones', icon: Workflow },
]

export const audiences = [
  'Emprendedores',
  'Profesionales independientes',
  'PYMEs',
  'Empresas de servicios',
  'Arquitectos, diseñadores o creativos',
  'Negocios que necesitan presencia digital profesional',
]

export const packages = [
  {
    name: 'Landing Esencial',
    tag: 'Desde diagnóstico inicial',
    description: 'Para validar una oferta o presentar un servicio con foco.',
    features: [
      '1 página',
      'Diseño responsive',
      'Secciones principales',
      'Botón de WhatsApp',
      'Formulario de contacto',
      'SEO básico',
    ],
  },
  {
    name: 'Web Corporativa',
    tag: 'Cotizar segun alcance',
    description: 'Para empresas que necesitan presencia clara y confiable.',
    featured: true,
    features: [
      'Inicio',
      'Nosotros',
      'Servicios',
      'Contacto',
      'Diseño personalizado',
      'Integración con redes/contacto',
      'SEO básico',
    ],
  },
  {
    name: 'Portafolio Profesional',
    tag: 'Cotizar segun contenido',
    description: 'Para mostrar trabajo, experiencia y una marca personal.',
    features: [
      'Presentación personal',
      'Galería de proyectos',
      'Página de contacto',
      'Diseño visual alineado a la marca',
      'Optimización responsive',
    ],
  },
]

export const profileLinks = [
  { label: 'Portafolio actual', href: '/', icon: Globe2 },
  {
    label: 'GitHub',
    href: 'https://github.com/Vctorqui',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/victorqui/',
    icon: Linkedin,
  },
]

export const systemStats = [
  { label: 'stack', value: 'Next.js · React · TypeScript' },
  { label: 'focus', value: 'Performance · SEO · UX' },
  { label: 'status', value: 'available_for_projects' },
]

export const heroSignals = [
  { label: 'build', icon: LayoutDashboard },
  { label: 'active', icon: BadgeCheck },
  { label: 'deploy', icon: Sparkles },
  { label: 'business', icon: BriefcaseBusiness },
]
