/* eslint-disable @next/next/no-img-element */
import { Avatar } from '@mui/material'
import Link from 'next/link'
import { CalendarMonth, Mail, Place } from '@mui/icons-material'
import Image from 'next/image'

const Banner = () => {
  return (
    <div id='profile-banner' className='profile-banner max-w-2xl mx-auto px-4'>
      <div className='h-48'>
        <div className='w-full h-full'>
          <Image
            width={200}
            height={100}
            alt='gif'
            className='w-full h-full object-cover'
            src='https://64.media.tumblr.com/cb1a6d28f1f97fe56c0764cdf40fc92c/d662df3b2e19bcdc-c5/s2048x3072/be56de3866ebc146e4f1b0893ca69b955a92ae23.gifv'
          />
        </div>
      </div>
      <div className='relative'>
        <Avatar
          alt='Victor Quiñones Profile Picture'
          className='w-32 h-32 border-4 border-black absolute -top-16 left-4 rounded-full object-cover'
          src='/images/profile.webp'
        />
      </div>
      <div className='pt-20 pb-4'>
        <h1 className='text-2xl font-bold'>Victor Quiñones</h1>
        <p>Frontend Developer</p>
        <Link
          className='font-semibold'
          href='https://www.linkedin.com/in/victorqui/'
        >
          <p className='text-orange-600'>@victorqui</p>
        </Link>

        <div className='flex flex-wrap gap-4 mt-3 text-gray-400 text-sm'>
          <div className='flex items-center gap-1'>
            <Place className='w-4 h-4' />
            Falcon, VE
          </div>
          <div className='flex items-center gap-1'>
            <Mail className='w-4 h-4' />
            victor.quinones.ch@gmail.com
          </div>
          <div className='flex items-center gap-1'>
            <CalendarMonth className='w-4 h-4' />
            Joined 2024
          </div>
        </div>
        <p className='mt-4'>
          Technology lover, with skills and experience in developing unique web
          applications.
        </p>
      </div>
    </div>
  )
}

export default Banner
