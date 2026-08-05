import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { bannerLabels } from '../../constants/banner'
import { Language } from '../../types'

export function BannerStatusCarousel({ language }: { language: Language }) {
  const statusCards = bannerLabels[language].statusCards
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCard((prev) => (prev + 1) % statusCards.length)
    }, 4000)
    return () => clearTimeout(timer)
  }, [activeCard, statusCards.length])

  return (
    <div className='space-y-4'>
      <h3 className='text-white/50 text-[8px] font-black tracking-[0.3em] uppercase'>
        {language === 'es' ? 'ESTADO ACTUAL' : 'CURRENT STATUS'}
      </h3>

      <div className='relative h-[80px] w-full overflow-hidden rounded-xl bg-cyan-400/5 border border-cyan-400/10'>
        <AnimatePresence mode='wait'>
          <m.div
            key={`${activeCard}-${language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className='absolute inset-0 p-4 flex flex-col justify-center'
          >
            <div className='flex items-center gap-2'>
              <span className='text-cyan-400/40 font-mono text-[8px]'>[</span>
              <span className='text-white/40 text-[9px] font-black tracking-[0.2em] uppercase font-mono'>
                {statusCards[activeCard].label}
              </span>
              <span className='text-cyan-400/40 font-mono text-[8px]'>]</span>
            </div>
            <div className='flex flex-col sm:flex-row sm:items-baseline sm:gap-3'>
              <p className='text-white text-base md:text-lg font-bold truncate tracking-tight'>
                {statusCards[activeCard].value}
              </p>
              <p className='text-cyan-400/80 text-[10px] md:text-xs font-medium truncate'>
                {statusCards[activeCard].sub}
              </p>
            </div>
          </m.div>
        </AnimatePresence>

        <div className='absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5'>
          {statusCards.map((card, i) => (
            <button
              key={card.label}
              onClick={() => setActiveCard(i)}
              className={`w-1 transition-[height,background-color] duration-500 rounded-full ${
                i === activeCard
                  ? 'h-4 bg-cyan-400'
                  : 'h-1 bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>

        <div className='absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/[0.02] to-transparent bg-[length:100%_4px] animate-pulse opacity-30' />
      </div>
    </div>
  )
}
