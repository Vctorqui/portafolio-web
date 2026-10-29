import { bannerLabels } from '../../../../constants/banner'
import { Language } from '../../../../types'
import { HeaderNav } from './HeaderNav'
import { LocalStatus } from './LocalStatus'

export function HomeHeader({ language }: { language: Language }) {
  return (
    <header id='index' className='section-reveal scroll-mt-lg pb-xl pt-md'>
      <div className='flex flex-wrap items-center justify-between gap-md'>
        <div className='min-w-0'>
          <h1 className='font-body text-lg font-semibold leading-snug text-ink'>Victor Quiñones</h1>
          <p className='font-mono text-xs text-ink-3'>{bannerLabels[language].role} · Santiago, CL</p>
          <LocalStatus language={language} />
        </div>
        <HeaderNav language={language} />
      </div>
    </header>
  )
}
