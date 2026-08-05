import { TimeZone } from '../TimeZone'
import { Language } from '../../types'

export function BannerVideoHeader({ language }: { language: Language }) {
  return (
    <div className='h-48 relative overflow-hidden'>
      <div className='w-full h-full'>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
          // @ts-ignore - fetchPriority is valid but not in React types yet
          fetchPriority='high'
          className='w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 opacity-40'
        >
          <source src='/images/banner.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent' />
      </div>
      <div className='absolute top-4 right-4'>
        <TimeZone language={language} />
      </div>
    </div>
  )
}
