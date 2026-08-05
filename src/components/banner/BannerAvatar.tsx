import { Avatar } from '@mui/material'
import { m } from 'framer-motion'

export function BannerAvatar() {
  return (
    <m.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className='absolute -top-12 left-6'
    >
      <div className='relative'>
        <Avatar
          alt='Victor Quiñones Profile Picture'
          src='/images/perfil_profile.webp'
          sx={{ width: 112, height: 112, border: '4px solid #080808' }}
          className='shadow-2xl rounded-full object-cover ring-2 ring-cyan-400/20'
        />
        <div className='absolute bottom-1 right-1 bg-[#080808] rounded-full p-1'>
          <div className='bg-cyan-400 rounded-full p-1.5 shadow-[0_0_15px_rgba(34,211,238,0.5)]'>
            <svg
              className='w-3 h-3 text-[#080808]'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
            </svg>
          </div>
        </div>
      </div>
    </m.div>
  )
}
