import { bannerLabels, techStack } from '../../constants/banner'
import { Language } from '../../types'

export function BannerTechStack({ language }: { language: Language }) {
  return (
    <div className='relative pt-4'>
      <h3 className='text-white/50 text-[8px] font-black tracking-[0.3em] uppercase mb-3'>
        {bannerLabels[language].techStackLabel}
      </h3>
      <div className='relative overflow-hidden py-1'>
        <div className='flex items-center gap-3 w-max animate-scroll will-change-transform'>
          {[...techStack, ...techStack, ...techStack, ...techStack].map(
            (tech, i) => (
              <span
                key={`${tech}-${i}`}
                className='flex-shrink-0 px-4 py-2 rounded-lg bg-[#0a0a0a] border border-white/5 text-white/50 text-[10px] font-bold tracking-widest hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300 cursor-default shadow-sm'
              >
                {tech}
              </span>
            ),
          )}
        </div>
        <div className='absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-10' />
        <div className='absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10' />
      </div>
    </div>
  )
}
