import { contactUsTypes, projectsTypes, taskTypes } from '../types/types'

export const containerWidth = 'lg'

export const contactUsInit: contactUsTypes = {
  full_name: '',
  email: '',
  phone: '',
  subject: '',
  country: '',
  city: '',
}

export const tasks: taskTypes[] = [
  {
    id: 1,
    description:
      'Desarrollo de interfaces unificadas de componentes y herramientas para los diferentes proyectos de la empresa para converger técnicamente y acelerar la entrega de cada uno de los productos.',
  },
  {
    id: 2,
    description: 'Gestión de estados en grandes aplicaciones con React Contex.',
  },
  {
    id: 3,
    description:
      'Integración de APIs mediante el consumo para la implementación de datos dentro del Frontend.',
  },
  {
    id: 4,
    description: 'Adaptar paradigmas funcionales a problemas comunes.',
  },
  {
    id: 5,
    description: 'Planificación de proyectos mediante metodologías ágiles.',
  },
  {
    id: 6,
    description:
      'Adaptar y plasmar ideas, necesidades y peticiones de los clientes para la creación de componentes funcionales y sostenibles dentro de la web.',
  },
]

export const projects: projectsTypes[] = [
  {
    id: 1,
    title: 'Floraria',
    description:
      'Página web para promocionar el proyecto residencial Floraria. Diseño responsive usando el preprocesador Sass.',
    image: '/images/8.png',
    source_code: undefined,
    languages: {
      html: {
        icon: undefined,
        text: 'HTML',
      },
      css: {
        icon: undefined,
        text: 'CSS',
      },
      javascript: {
        icon: undefined,
        text: 'JavaScript',
      },
      sass: {
        icon: undefined,
        text: 'Sass',
      },
      bootstrap: {
        icon: undefined,
        text: 'Bootstrap',
      },
      typescript: {
        icon: undefined,
        text: '',
      },
      nextjs: {
        icon: undefined,
        text: '',
      },
      mui: {
        icon: undefined,
        text: '',
      },
      react: {
        icon: undefined,
        text: '',
      },
    },
    preview_link: 'https://floralia.com.uy/',
  },
  {
    id: 2,
    title: 'Subasta de Propiedades',
    description:
      'Aplicación web para comprar, vender y principalmente subastar proyectos residenciales.',
    image: '/images/5.jpg',
    source_code: undefined,
    languages: {
      html: {
        icon: undefined,
        text: '',
      },
      css: {
        icon: undefined,
        text: 'CSS',
      },
      javascript: {
        icon: undefined,
        text: '',
      },
      sass: {
        icon: undefined,
        text: '',
      },
      bootstrap: {
        icon: undefined,
        text: '',
      },
      typescript: {
        icon: undefined,
        text: 'TypeScript',
      },
      nextjs: {
        icon: undefined,
        text: 'NextJS',
      },
      mui: {
        icon: undefined,
        text: 'MUI',
      },
      react: {
        icon: undefined,
        text: 'ReactJS',
      },
    },
    preview_link: 'https://subastadepropiedades.com/',
  },
  {
    id: 3,
    title: 'La Pituca',
    description:
      'Página web para promocionar el proyecto residencial La Pituca. Diseño responsive usando el preprocesador Sass.',
    image: '/images/3.jpg',
    source_code: undefined,
    languages: {
      html: {
        icon: undefined,
        text: 'HTML',
      },
      css: {
        icon: undefined,
        text: 'CSS',
      },
      javascript: {
        icon: undefined,
        text: 'JavaScript',
      },
      sass: {
        icon: undefined,
        text: 'Sass',
      },
      bootstrap: {
        icon: undefined,
        text: 'Bootstrap',
      },
      typescript: {
        icon: undefined,
        text: null,
      },
      nextjs: {
        icon: undefined,
        text: null,
      },
      mui: {
        icon: undefined,
        text: null,
      },
      react: {
        icon: undefined,
        text: null,
      },
    },
    preview_link: 'https://lapituca.com.py/',
  },
  {
    id: 4,
    title: 'Blue Way Transportation',
    description:
      'Aplicación web donde puedes acceder a servicios de Transporte médico no urgente, fiable y accesible.',
    image: '/images/6.jpg',
    source_code: undefined,
    languages: {
      html: {
        icon: undefined,
        text: null,
      },
      css: {
        icon: undefined,
        text: 'CSS',
      },
      typescript: {
        icon: undefined,
        text: 'TypeScript',
      },
      nextjs: {
        icon: undefined,
        text: 'NextJS',
      },
      mui: {
        icon: undefined,
        text: 'MUI',
      },
      react: {
        icon: undefined,
        text: 'ReactJS',
      },
      javascript: {
        icon: undefined,
        text: null,
      },
      sass: {
        icon: undefined,
        text: null,
      },
      bootstrap: {
        icon: undefined,
        text: null,
      },
    },
    preview_link: 'https://bluewayisbetter.com/',
  },
  {
    id: 5,
    title: 'Lyon',
    description:
      'Página web para promocionar el proyecto residencial Lyon. Diseño responsive usando el preprocesador Sass.',
    image: '/images/2.jpg',
    source_code: undefined,
    languages: {
      html: {
        icon: undefined,
        text: 'HTML',
      },
      css: {
        icon: undefined,
        text: 'CSS',
      },
      javascript: {
        icon: undefined,
        text: 'JavaScript',
      },
      sass: {
        icon: undefined,
        text: 'Sass',
      },
      bootstrap: {
        icon: undefined,
        text: 'Bootstrap',
      },
      typescript: {
        icon: undefined,
        text: '',
      },
      nextjs: {
        icon: undefined,
        text: '',
      },
      mui: {
        icon: undefined,
        text: '',
      },
      react: {
        icon: undefined,
        text: '',
      },
    },
    preview_link: 'https://lyon.com.uy/',
  },
  {
    id: 5,
    title: 'Lisboa',
    description:
      'Página web para promocionar el proyecto residencial Lisboa. Diseño responsive usando el preprocesador Sass.',
    image: '/images/1.jpg',
    source_code: undefined,
    languages: {
      html: {
        icon: undefined,
        text: 'HTML',
      },
      css: {
        icon: undefined,
        text: 'CSS',
      },
      javascript: {
        icon: undefined,
        text: 'JavaScript',
      },
      sass: {
        icon: undefined,
        text: 'Sass',
      },
      bootstrap: {
        icon: undefined,
        text: 'Bootstrap',
      },
      typescript: {
        icon: undefined,
        text: '',
      },
      nextjs: {
        icon: undefined,
        text: '',
      },
      mui: {
        icon: undefined,
        text: '',
      },
      react: {
        icon: undefined,
        text: '',
      },
    },
    preview_link: 'https://lisboa.com.py/',
  },
]
