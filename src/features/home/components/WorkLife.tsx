import { experiences } from '../../../constants/experience'
import { withBrandAccent } from '../../../shared/lib/withBrandAccent'
import { Language } from '../../../types'
import { Section } from './Section'

/** Numbered work history: role · company, dates and what was done. */
export function WorkLife({ language }: { language: Language }) {
  return (
    <Section id='years' title={language === 'es' ? 'Trayectoria' : 'Work life'}>
      <ol className='m-0 list-none p-0'>
        {experiences.map((exp, index) => {
          const date = language === 'es' ? exp.spanish_date : exp.english_date
          const description = language === 'es' ? exp.spanish_description : exp.english_description

          return (
            <li
              key={exp.id}
              className='grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-sm border-t-2 border-rule py-md first:border-t-0 first:pt-0'
            >
              <span className='font-mono text-xs leading-[2] text-ink-2 tabular-nums'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className='min-w-0'>
                <div className='flex flex-wrap items-baseline justify-between gap-x-sm'>
                  <h3 className='font-body text-md font-medium text-ink'>
                    {exp.position} · {exp.company}
                  </h3>
                  <p className='font-mono text-xs text-ink-2 tabular-nums'>{date}</p>
                </div>
                <p className='mt-2xs text-sm text-ink-2' dangerouslySetInnerHTML={{ __html: withBrandAccent(description) }} />
                <p className='mt-2xs font-mono text-xs text-ink-2'>{exp.stacks.join(' · ')}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
