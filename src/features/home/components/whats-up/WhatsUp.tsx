import { bannerLabels } from '../../../../constants/banner'
import { Language } from '../../../../types'
import { Section } from '../Section'
import { PixelIcon } from '../../../../shared/ui/pixel'
import { GameLog } from './GameLog'
import { JOYSTICK, LAPTOP_CODING, WALL_BUILDING } from './statusIcons'

const lead = {
  es: ['Trabajando como', 'Construyendo', 'Jugando'],
  en: ['Working as', 'Building', 'Playing'],
}
/** Pixel icon per status: coding on a laptop, a wall going up, a joystick. */
const icons = [
  { frames: LAPTOP_CODING, frameMs: 180, className: 'text-ink' },
  { frames: WALL_BUILDING, frameMs: 220, className: 'text-arcade-amber' },
  { frames: JOYSTICK, className: 'text-ink-3' },
]
/** The status card that gets the game log instead of a subtitle. */
const GAME_INDEX = 2

export function WhatsUp({ language }: { language: Language }) {
  const status = bannerLabels[language].statusCards

  return (
    <Section id='now' title={language === 'es' ? '¿Qué hay de nuevo?' : "What's up?"}>
      <ul className='m-0 grid list-none gap-sm p-0 text-md leading-relaxed text-ink-2'>
        {status.map((item, index) => (
          <li key={item.label} className='flex gap-xs'>
            <span className='flex w-[30px] shrink-0 justify-center pt-[0.35em]'>
              <PixelIcon {...icons[index]} />
            </span>
            <span className='min-w-0 flex-1'>
              {lead[language][index]} <a href={item.link} target="_blank" rel="noopener noreferrer" className='font-medium text-ink'>{item.value}</a>
              {index === GAME_INDEX ? (
                <GameLog language={language} />
              ) : (
                <span className='block text-sm text-ink-3'>{item.sub}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
