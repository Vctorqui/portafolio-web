import { Cake, CalendarMonth, Link, Place, Work } from '@mui/icons-material'
import {
  contactUsTypes,
  experienceTypes,
  infoHeaderTypes,
} from '../types/types'

export const containerWidth = 'lg'

export const contactUsInit: contactUsTypes = {
  full_name: '',
  email: '',
  phone: '',
  subject: '',
  country: '',
  city: '',
}

export const experiences: experienceTypes[] = [
  {
    id: 1,
    company: 'Coastal Insight Consulting',
    position: 'Frontend Developer',
    english_date: 'March 2023 - Present...',
    spanish_date: 'March 2023 - Actualmente',
    spanish_description:
      'Desarrollo interfaces unificadas de componentes y herramientas para diversos proyectos de la empresa, logrando convergencia técnica y acelerando la entrega de productos. Gestiono estados en grandes aplicaciones utilizando React Context e integro APIs para implementar datos en el Frontend. Adapto paradigmas funcionales a problemas comunes y planifico proyectos mediante metodologías ágiles. Además, me encargo de adaptar y plasmar ideas, necesidades y peticiones de los clientes, creando componentes funcionales y sostenibles para la web.',
    english_description:
      'Designed and developed unified, reusable React components, improving project consistency and accelerating product delivery by 20%. Utilized CSS to create responsive and efficient user interfaces that ensure optimal performance across devices. Managed state and optimized performance in large-scale applications using React Context and Next.js. Integrated RESTful APIs to efficiently sync data between the frontend and backend. Maintained and automated 8+ projects, closely collaborating with backend teams to ensure seamless data integration and functionality.',
    stacks: [
      'Next.js',
      'React.js',
      'CSS',
      'TypeScript',
      'JavaScript',
      'HTML',
      'Material UI',
    ],
  },
  {
    id: 2,
    company: 'Freelance',
    position: 'Frontend Web Developer',
    english_date: 'February 2023 - Present...',
    spanish_date: 'Febrero 2023 - Actualmente',
    spanish_description:
      'Desarrollador freelance encargado de crear páginas web y aplicaciones a medida para clientes según sus necesidades.',
    english_description:
      'Charged of creating websites and custom applications for clients according to their needs.',
    stacks: [
      'Next.js',
      'React.js',
      'Vite',
      'CSS',
      'TypeScript',
      'JavaScript',
      'HTML',
      'Material UI',
      'Firebase',
      'MongoDB',
    ],
  },
]

export const navSpanishItems = [
  { label: 'Inicio', href: '#home' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Sobre mi', href: '#about-me' },
  { label: 'Contacto', href: '#contact' },
]

export const navEnglishItems = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'About me', href: '#about-me' },
  { label: 'Contact', href: '#contact' },
]

export const iconList: any = {
  Work: Work,
  Place: Place,
  Cake: Cake,
  CalendarMonth: CalendarMonth,
}

export const infoHeader: infoHeaderTypes[] = [
  {
    id: 1,
    title: 'Falcón, Ven',
    icon: 'Place',
    path: '',
  },
  {
    id: 2,
    title: 'Avaliable',
    icon: 'Work',
    path: undefined,
  },
  {
    id: 3,
    title: 'December 18th',
    icon: 'Cake',
    path: undefined,
  },
  {
    id: 4,
    title: 'Joined October 2024',
    icon: 'CalendarMonth',
    path: undefined,
  },
]
