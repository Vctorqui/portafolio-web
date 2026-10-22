import { techStack } from '../../../constants/banner'
import { Language } from '../../../types'
import { Section } from './Section'

const rows: Array<[string, string]> = [
  ['os', 'macOS'],
  ['shell', 'zsh'],
  ['editor', 'VS Code'],
  ['ai', 'Claude Code'],
  ['font', 'JetBrains Mono'],
]

function Prompt({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <span className='text-brand'>victor@mac</span>:<span className='text-arcade-cyan'>~</span>$ {children}
    </>
  )
}

/** The tools of the trade, as a neofetch in a terminal block. */
export function Setup({ language }: { language: Language }) {
  return (
    <Section id='setup' title='Setup'>
      <div className='overflow-x-auto border-2 border-rule bg-paper-2 p-md font-mono text-sm leading-relaxed'>
        <p className='text-ink-3'>
          <Prompt>neofetch</Prompt>
        </p>
        <dl className='mt-sm grid grid-cols-[5rem_minmax(0,1fr)] gap-y-3xs'>
          {rows.map(([key, value]) => (
            <div key={key} className='contents'>
              <dt className='text-arcade-amber'>{key}</dt>
              <dd className='text-ink'>{value}</dd>
            </div>
          ))}
          <dt className='text-arcade-amber'>stack</dt>
          <dd className='text-ink'>{techStack.join(', ')}</dd>
        </dl>
        <p className='mt-sm text-ink-3'>
          <Prompt>
            <span className='pixel-blink'>▌</span>
          </Prompt>
        </p>
      </div>
      <p className='mt-sm text-sm text-ink-3'>
        {language === 'es' ? 'Las herramientas con las que paso el día.' : 'The tools I spend my days in.'}
      </p>
    </Section>
  )
}
