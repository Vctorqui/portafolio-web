import { Language } from '../../../../types'
import { Section } from '../Section'
import { colophonCopy } from './colophonCopy'
import { FindsBoard } from './FindsBoard'
import { ToyList } from './ToyList'

export function Colophon({ language }: { language: Language }) {
  const t = colophonCopy[language]

  return (
    <Section id='colophon' title={t.toys}>
      <ToyList language={language} />
      <FindsBoard language={language} />
    </Section>
  )
}
