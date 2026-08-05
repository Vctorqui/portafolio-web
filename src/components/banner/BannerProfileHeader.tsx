import { m } from 'framer-motion'
import { bannerLabels } from '../../constants/banner'
import { Language } from '../../types'
import { BannerSocialLinks } from './BannerSocialLinks'

type BannerProfileHeaderProps = {
  language: Language
}

export function BannerProfileHeader({ language }: BannerProfileHeaderProps) {
  return (
    <div className='flex flex-col md:flex-row align-center justify-between'>
      <div>
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-3xl font-black text-white mb-1 tracking-tight'
        >
          Victor Quiñones
        </m.h1>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='text-cyan-400 italic text-lg mb-4 font-medium'
        >
          {bannerLabels[language].role}
        </m.p>
      </div>
      <div className='flex items-center gap-3 absolute top-2 right-2'></div>
      <BannerSocialLinks language={language} />
    </div>
  )
}
