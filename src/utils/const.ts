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
      'Diseñé y desarrollé componentes reutilizables con JavaScript Vanilla, optimizando el flujo de trabajo y reduciendo los tiempos de entrega. Implementé estrategias para estructurar y documentar el código, mejorando su legibilidad y facilitando la colaboración entre equipos. Coordiné con el equipo backend para optimizar las llamadas a API, logrando una integración eficiente y mejorando la velocidad de respuesta en un 15%. Automatización y mantenimiento de más de 4 productos, mejorando la escalabilidad y estabilidad de los sistemas.',
    english_description:
      'Designed and developed reusable components using Vanilla JavaScript, optimizing workflow and reducing delivery times. Implemented strategies for code structuring and documentation, enhancing readability and facilitating team collaboration. Coordinated with backend team to optimize API calls, achieving efficient integration and improving response speed by 15%. Automated and maintained over 4 products, enhancing system scalability and stability.',
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
      'Desarrollo interfaces unificadas de componentes y herramientas para diversos proyectos de la empresa, logrando convergencia técnica y acelerando la entrega de productos. Gestiono estados en grandes aplicaciones utilizando React Context e integro APIs para implementar datos en el Frontend. Adapto paradigmas funcionales a problemas comunes y planifico proyectos mediante metodologías ágiles. Además, me encargo de adaptar y plasmar ideas, necesidades y peticiones de los clientes, creando componentes funcionales y sostenibles para la web.',
    english_description:
      'Led the development of enterprise-grade React components and design systems, resulting in a 30% reduction in development time and improved code maintainability. Engineered responsive and performant user interfaces using modern CSS techniques and best practices, achieving 95%+ performance scores across all devices. Architected and implemented state management solutions using React Context and Next.js, optimizing application performance and reducing bundle size by 25%. Spearheaded the integration of RESTful APIs and GraphQL endpoints, ensuring seamless data flow between frontend and backend systems. Successfully managed and automated 10+ concurrent projects, fostering cross-functional collaboration with backend teams.',
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
      'Desarrollador freelance encargado de crear páginas web y aplicaciones a medida para clientes según sus necesidades.',
    english_description:
      'Delivered custom web solutions and applications for diverse clients, leveraging modern frontend technologies to create scalable and maintainable codebases. Specialized in building responsive and interactive user interfaces using React.js and Next.js, implementing best practices for performance optimization and SEO. Successfully managed client relationships and project lifecycles, from initial consultation to deployment, ensuring timely delivery and exceeding client expectations. Integrated various backend services and databases, including Firebase and MongoDB, to create full-stack solutions tailored to specific business needs.',
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
