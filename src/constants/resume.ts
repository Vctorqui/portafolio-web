import { Language } from '../types'

export const resumeFileByLanguage: Record<Language, string> = {
  es: 'Victor_Quinones_Software_Frontend_Developer_CV.pdf',
  en: 'Victor_Quinones_Frontend_Software_Developer_Resume.pdf',
}

export const getResumeHref = (language: Language) => `/${resumeFileByLanguage[language]}`
