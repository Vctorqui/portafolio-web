import { BannerLabels } from '../types'

export const bannerLabels: Record<string, BannerLabels> = {
  en: {
    role: 'Frontend Developer',
    bio_start: `Specialized in creating efficient, intuitive, and scalable web interfaces. Throughout my journey, `,
    bio_highlight: `I've discovered how fundamental technology is in our daily lives and its incredible power to transform them.`,
    social: {
      resume: 'Resume',
      resumeTip: 'Download my resume',
      linkedinTip: 'Go to my LinkedIn profile',
      githubTip: 'Go to my GitHub profile',
      codepenTip: 'Go to my Codepen profile',
      emailTip: 'Copy email',
    },
    techStackLabel: 'TECH STACK',
    tabs: {
      projects: 'PROJECTS',
      experience: 'EXPERIENCE',
      about: 'ABOUT ME',
    },
    copySuccess: 'Email copied successfully',
  },
  es: {
    role: 'Desarrollador Frontend',
    bio_start: `Especializado en crear interfaces web eficientes, intuitivas y escalables. A lo largo de mi camino `,
    bio_highlight: `he descubierto lo fundamental que es la tecnología en nuestras vidas y su increíble poder para transformarlas.`,
    social: {
      resume: 'CV',
      resumeTip: 'Descarga mi CV',
      linkedinTip: 'Ver mi perfil de LinkedIn',
      githubTip: 'Ver mi perfil de GitHub',
      codepenTip: 'Ver mi perfil de Codepen',
      emailTip: 'Copiar email',
    },
    techStackLabel: 'TECH STACK',
    tabs: {
      projects: 'PROYECTOS',
      experience: 'EXPERIENCIA',
      about: 'SOBRE MÍ',
    },
    copySuccess: 'Email copiado correctamente',
  },
}

export const techStack = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Next.js',
  'Framer Motion',
  'Node.js',
  'Express',
  'Shadcn',
  'PHP',
  'MongoDB',
]
