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
    spanish_description:
      'Desarrollo de interfaces unificadas de componentes y herramientas para los diferentes proyectos de la empresa para converger técnicamente y acelerar la entrega de cada uno de los productos.',
    english_description:
      'Development of unified interfaces of components and tools for the different projects of the company in order to technically converge and accelerate the delivery of each of the products.',
  },
  {
    id: 2,
    spanish_description:
      'Gestión de estados en grandes aplicaciones con React Context.',
    english_description:
      'State management in large applications with React Context.',
  },
  {
    id: 3,
    spanish_description:
      'Integración de APIs mediante el consumo para la implementación de datos dentro del Frontend.',
    english_description:
      'Integration of APIs through consumption for the implementation of data within the Frontend.',
  },
  {
    id: 4,
    spanish_description: 'Adaptar paradigmas funcionales a problemas comunes.',
    english_description: 'Adapt functional paradigms to common problems.',
  },
  {
    id: 5,
    spanish_description:
      'Planificación de proyectos mediante metodologías ágiles.',
    english_description: 'Project planning using agile methodologies.',
  },
  {
    id: 6,
    spanish_description:
      'Adaptar y plasmar ideas, necesidades y peticiones de los clientes para la creación de componentes funcionales y sostenibles dentro de la web.',
    english_description:
      'Adapt and translate ideas, needs and customer requests for the creation of functional and sustainable components within the web.',
  },
]

export const projects: projectsTypes[] = [
  {
    id: 1,
    title: 'Talks',
    spanish_description:
      'Página web para promocionar un evento que aborda temas como Inteligencia Artificial, liderazgo y marketing.',
    image: '/images/9.jpeg',
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
    preview_link: 'https://talks.infocasas.com.uy/',
    english_description:
      'Website to promote an event that addresses topics such as Artificial Intelligence, leadership, marketing, among others.',
  },
  {
    id: 2,
    title: 'Floraria',
    spanish_description:
      'Página web para promocionar el proyecto residencial Floraria. Diseño responsive usando el preprocesador Sass.',
    image: '/images/8.webp',
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
    english_description:
      'Website to promote the Floraria residential project. Responsive design using Sass preprocessor.',
  },
  {
    id: 3,
    title: 'Subasta de Propiedades',
    spanish_description:
      'Aplicación web para comprar, vender y principalmente subastar proyectos residenciales.',
    image: '/images/5.webp',
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
    english_description:
      'Web application to buy, sell and mainly auction residential projects.',
  },
  {
    id: 4,
    title: 'La Pituca',
    spanish_description:
      'Página web para promocionar el proyecto residencial La Pituca. Diseño responsive usando el preprocesador Sass.',
    image: '/images/3.webp',
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
    english_description:
      'Website to promote La Pituca residential project. Responsive design using Sass preprocessor.',
  },
  {
    id: 5,
    title: 'Blue Way Transportation',
    spanish_description:
      'Aplicación web donde puedes acceder a servicios de Transporte médico no urgente, fiable y accesible.',
    image: '/images/6.webp',
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
    english_description:
      'Web application where you can access non-emergency, reliable and accessible medical transportation services.',
  },
  {
    id: 6,
    title: 'Lyon',
    spanish_description:
      'Página web para promocionar el proyecto residencial Lyon. Diseño responsive usando el preprocesador Sass.',
    image: '/images/2.webp',
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
    english_description:
      'Website to promote Lyon residential project. Responsive design using Sass preprocessor.',
  },
  {
    id: 7,
    title: 'Lisboa',
    spanish_description:
      'Página web para promocionar el proyecto residencial Lisboa. Diseño responsive usando el preprocesador Sass.',
    image: '/images/1.webp',
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
    english_description:
      'Website to promote Lisboa residential project. Responsive design using Sass preprocessor.',
  },
]
