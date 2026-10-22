import { Language } from '../../../types'

const copy = {
  es: 'Soy Víctor Quiñones, Software Developer. Me enfoco en crear experiencias web intuitivas, eficientes y bien construidas, cuidando tanto los detalles visuales como la calidad del código.',
  en: "I'm Victor Quiñones. I build web interfaces end to end: from the component system to the screen people actually use, keeping them fast, accessible and easy to maintain.",
}

export function Summary({ language }: { language: Language }) {
  return (
    <p className='section-reveal border-y-2 border-rule py-lg text-lg leading-relaxed text-ink'>{copy[language]}</p>
  )
}
