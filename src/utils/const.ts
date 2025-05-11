import { Cake, CalendarMonth, Place, Work } from '@mui/icons-material'
import { experienceTypes } from '../types/types'

export const containerWidth = 'lg'

export const experiences: experienceTypes[] = [
  {
    id: 1,
    company: 'WeAreContent',
    position: 'Frontend Developer',
    english_date: 'January 2025 - Present',
    spanish_date: 'Enero 2025 - Actualmente',
    spanish_description:
      'Desarrollo de componentes reutilizables con JavaScript Vanilla, optimizando el flujo de trabajo. Implementación de estrategias para documentación y estructura del código. Coordinación con backend para optimizar APIs, mejorando la velocidad de respuesta en un 15%. Mantenimiento de 4+ productos.',
    english_description:
      'Developing <span class="font-bold text-[#EF5A6F]">reusable components</span> with <span class="font-bold text-[#EF5A6F]">Vanilla JavaScript</span>, optimizing workflow efficiency. Implementing <span class="font-bold text-[#EF5A6F]">code documentation</span> strategies and <span class="font-bold text-[#EF5A6F]">API optimizations</span> with <span class="font-bold text-[#EF5A6F]">15%</span> performance improvement. Maintaining <span class="font-bold text-[#EF5A6F]">4+ products</span> with focus on <span class="font-bold text-[#EF5A6F]">scalability</span>.',
    stacks: [
      'JavaScript',
      'HTML',
      'CSS',
      'API Integration',
      'Documentation',
      'System Maintenance',
    ],
  },
  {
    id: 2,
    company: 'Coastal Insight Consulting',
    position: 'Frontend Developer',
    english_date: 'March 2023 - January 2025',
    spanish_date: 'Marzo 2023 - Enero 2025',
    spanish_description:
      'Desarrollo de componentes React empresariales y sistemas de diseño, reduciendo el tiempo de desarrollo en 30%. Implementación de interfaces responsivas con 95%+ de rendimiento. Gestión de estado con React Context y Next.js, reduciendo el tamaño del bundle en 25%. Integración de APIs RESTful y GraphQL.',
    english_description:
      'Built <span class="font-bold text-[#EF5A6F]">enterprise React components</span> reducing development time by <span class="font-bold text-[#EF5A6F]">30%</span>. Created responsive UIs with <span class="font-bold text-[#EF5A6F]">95%+ performance scores</span>. Implemented <span class="font-bold text-[#EF5A6F]">state management</span> with <span class="font-bold text-[#EF5A6F]">React Context</span> and <span class="font-bold text-[#EF5A6F]">Next.js</span>, reducing bundle size by <span class="font-bold text-[#EF5A6F]">25%</span>. Integrated <span class="font-bold text-[#EF5A6F]">RESTful APIs</span> and <span class="font-bold text-[#EF5A6F]">GraphQL</span>.',
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
    id: 3,
    company: 'Freelance',
    position: 'Frontend Web Developer',
    english_date: 'February 2023 - Present...',
    spanish_date: 'Febrero 2023 - Actualmente',
    spanish_description:
      'Desarrollo de soluciones web personalizadas y aplicaciones para diversos clientes. Especialización en interfaces responsivas con React.js y Next.js. Implementación de optimizaciones de rendimiento y SEO. Integración con Firebase y MongoDB para soluciones full-stack.',
    english_description:
      'Delivering <span class="font-bold text-[#EF5A6F]">custom web solutions</span> with <span class="font-bold text-[#EF5A6F]">React.js</span> and <span class="font-bold text-[#EF5A6F]">Next.js</span>. Building <span class="font-bold text-[#EF5A6F]">responsive interfaces</span> with focus on <span class="font-bold text-[#EF5A6F]">performance</span> and <span class="font-bold text-[#EF5A6F]">SEO</span>. Creating <span class="font-bold text-[#EF5A6F]">full-stack solutions</span> with <span class="font-bold text-[#EF5A6F]">Firebase</span> and <span class="font-bold text-[#EF5A6F]">MongoDB</span>.',
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

export const iconList: any = {
  Work: Work,
  Place: Place,
  Cake: Cake,
  CalendarMonth: CalendarMonth,
}
