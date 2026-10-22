import { Language } from '../../../../types'
import { AchievementId, achievementDefs } from '../../../achievements'
import { focusRing } from '../../styles'

const status = {
  es: { found: '■ Encontrado', secret: '□ Secreto', how: '□ Cómo conseguirlo', yes: ' (encontrado)', no: ' (pendiente)' },
  en: { found: '■ Found', secret: '□ Secret', how: '□ How to get it', yes: ' (found)', no: ' (missing)' },
}

/** One find with a tooltip explaining how to get it (hints only, for secrets). */
export function FindItem({ id, done, language }: { id: AchievementId; done: boolean; language: Language }) {
  const def = achievementDefs[id]
  const copy = def[language]
  const masked = def.hidden && !done
  const s = status[language]
  const tipId = `find-tip-${id}`

  return (
    <li className='group relative'>
      <span
        tabIndex={0}
        aria-describedby={tipId}
        className={`inline-flex cursor-help items-baseline gap-2xs underline decoration-dotted decoration-rule underline-offset-4 outline-none hover:text-ink focus-visible:text-ink ${
          done ? 'text-ink' : 'text-ink-3'
        } ${focusRing}`}
      >
        <span aria-hidden>{done ? '■' : '□'}</span>
        {masked ? '???' : copy.title}
        <span className='sr-only'>{done ? s.yes : s.no}</span>
      </span>

      <span
        id={tipId}
        role='tooltip'
        className='pointer-events-none absolute bottom-full left-0 z-20 mb-xs w-max max-w-[16rem] translate-y-3xs bg-ink px-sm py-xs text-paper opacity-0 shadow-panel transition duration-short ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100'
      >
        <span className='block text-[0.625rem] uppercase tracking-[0.14em] opacity-60'>
          {done ? s.found : masked ? s.secret : s.how}
        </span>
        <span className='mt-3xs block normal-case leading-snug'>{masked ? copy.hint ?? '…' : copy.desc}</span>
        {/* Little pointer down to the row. */}
        <span
          aria-hidden
          className='absolute left-md top-full h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-ink'
        />
      </span>
    </li>
  )
}
