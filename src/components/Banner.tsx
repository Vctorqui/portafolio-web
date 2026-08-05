import { domAnimation, LazyMotion, m } from 'framer-motion'
import { Language } from '../types'
import { BannerAvatar } from './banner/BannerAvatar'
import { BannerProfileHeader } from './banner/BannerProfileHeader'
import { BannerStatusCarousel } from './banner/BannerStatusCarousel'
import { BannerTabs } from './banner/BannerTabs'
import { BannerTechStack } from './banner/BannerTechStack'
import { BannerVideoHeader } from './banner/BannerVideoHeader'

const Banner = ({
  language,
  activeTab,
  onTabChange,
}: {
  language: Language
  activeTab: string
  onTabChange: (value: string) => void
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id='profile-banner'
        className='profile-banner max-w-3xl mx-auto bg-[#080808]/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/5'
      >
        <BannerVideoHeader language={language} />

        <div className='relative px-6'>
          <BannerAvatar />

          <div className='pt-20 pb-8'>
            <BannerProfileHeader language={language} />
            <BannerStatusCarousel language={language} />
            <BannerTechStack language={language} />
          </div>
        </div>

        <BannerTabs
          language={language}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />

      </m.div>
    </LazyMotion>
  )
}

export default Banner
