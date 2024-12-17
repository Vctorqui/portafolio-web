/* eslint-disable @next/next/no-img-element */
import { Alert, Avatar, Box, Snackbar } from '@mui/material'
import Link from 'next/link'
import { GitHub, LinkedIn, Mail } from '@mui/icons-material'
import Image from 'next/image'
import { LightTooltip } from './LightToolTip'
import { useState } from 'react'
import { LuCodepen } from 'react-icons/lu'
import { File } from 'lucide-react'

const Banner = () => {
  const [snackbarCopy, setSnackbarCopy] = useState(false)

  const handleShare = (e: any) => {
    e.preventDefault()

    navigator.clipboard.writeText('victor.quinones.ch@gmail.com')
    setSnackbarCopy(true)
  }

  return (
    <div id='profile-banner' className='profile-banner max-w-2xl mx-auto px-4'>
      <div className='h-48'>
        <div className='w-full h-full'>
          <Image
            width={200}
            height={100}
            alt='gif'
            className='w-full h-full object-cover'
            src='/images/banner-gif.gif'
          />
        </div>
      </div>
      <div className='relative'>
        <Avatar
          alt='Victor Quiñones Profile Picture'
          className='w-32 h-32 border-4 border-black absolute -top-16 left-4 rounded-full object-cover'
          src='/images/profile-perfil.webp'
        />
      </div>
      <div className='pt-20 pb-4'>
        <h1 className='text-2xl font-bold '>Victor Quiñones</h1>
        <p className='font-bold text-[#EF5A6F] italic'>Frontend Developer</p>

        <div className='flex flex-wrap gap-4 mt-3 text-gray-400 text-sm'>
          <Link
            href={'./Victor_Quinones_Frontend_Resume.pdf'}
            className='flex items-center gap-1  hover:text-[#EF5A6F] transition-colors'
          >
            <File className='w-4 h-4' />
            Resume
          </Link>
          <Link
            href={'https://www.linkedin.com/in/victorqui/'}
            className='flex items-center gap-1  hover:text-[#EF5A6F] transition-colors'
          >
            <LinkedIn className='w-4 h-4' />
            LinkedIn
          </Link>
          <Link
            href={'https://github.com/Vctorqui'}
            className='flex items-center gap-1 hover:text-[#EF5A6F] transition-colors'
          >
            <GitHub className='w-4 h-4' />
            GitHub
          </Link>
          <Link
            href={'https://codepen.io/vichorq'}
            className='flex items-center gap-1 hover:text-[#EF5A6F] transition-colors'
          >
            <LuCodepen className='w-4 h-4' />
            Codepen
          </Link>
          <LightTooltip title={'Copy email'}>
            <span>
              <Box
                onClick={handleShare}
                className='flex items-center gap-1 hover:text-[#EF5A6F] transition-colors cursor-pointer'
              >
                <Mail className='w-4 h-4' />
                victor.quinones.ch@gmail.com
              </Box>
            </span>
          </LightTooltip>

          <Snackbar
            open={snackbarCopy}
            autoHideDuration={3000}
            onClose={() => setSnackbarCopy(false)}
          >
            <Alert
              onClose={() => setSnackbarCopy(false)}
              severity='success'
              variant='filled'
            >
              Email copied successfully
            </Alert>
          </Snackbar>
        </div>
        <p className='mt-4'>
          Specialized in creating efficient, intuitive, and scalable web
          interfaces.
        </p>
      </div>
    </div>
  )
}

export default Banner
