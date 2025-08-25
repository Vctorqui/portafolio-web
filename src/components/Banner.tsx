/* eslint-disable @next/next/no-img-element */
import { Alert, Avatar, Box, Snackbar } from '@mui/material'
import Link from 'next/link'
import { GitHub, LinkedIn, Mail } from '@mui/icons-material'
import Image from 'next/image'
import { LightTooltip } from './LightToolTip'
import { useState } from 'react'
import { LuCodepen } from 'react-icons/lu'
import { File } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    icon: <File className='w-4 h-4' />,
    href: './Frontend_Victor_Quinones_Resume.pdf',
    label: 'Resume',
    tooltip: 'Download my resume',
  },
  {
    icon: <LinkedIn className='w-4 h-4' />,
    href: 'https://www.linkedin.com/in/victorqui/',
    label: 'LinkedIn',
    tooltip: 'Go to my LinkedIn profile',
  },
  {
    icon: <GitHub className='w-4 h-4' />,
    href: 'https://github.com/Vctorqui',
    label: 'GitHub',
    tooltip: 'Go to my GitHub profile',
  },
  {
    icon: <LuCodepen className='w-4 h-4' />,
    href: 'https://codepen.io/vichorq',
    label: 'Codepen',
    tooltip: 'Go to my Codepen profile',
  },
]

const Banner = () => {
  const [snackbarCopy, setSnackbarCopy] = useState(false)

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('victor.quinones.ch@gmail.com')
    setSnackbarCopy(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id='profile-banner'
      className='profile-banner max-w-2xl mx-auto px-4 bg-white/5 backdrop-blur-sm rounded-xl shadow-lg'
    >
      <div className='h-48 relative overflow-hidden rounded-t-xl'>
        <div className='w-full h-full'>
          <Image
            width={200}
            height={100}
            alt='banner background'
            className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-500'
            src='/images/banner-gif.gif'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/20' />
        </div>
      </div>
      <div className='relative'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Avatar
            alt='Victor Quiñones Profile Picture'
            className='w-32 h-32 border-4 border-white shadow-xl absolute -top-16 left-4 rounded-full object-cover hover:border-[#EF5A6F] transition-colors duration-300'
            src='/images/perfil_profile.webp'
          />
        </motion.div>
      </div>
      <div className='pt-20 pb-6 px-4'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-3xl font-bold bg-gradient-to-r from-[#EF5A6F] to-purple-600 bg-clip-text text-transparent'
        >
          Victor Quiñones
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='font-bold text-[#EF5A6F] italic text-lg mt-1'
        >
          Frontend Developer
        </motion.p>

        <div className='flex flex-wrap gap-4 mt-4 text-gray-400 text-sm'>
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <LightTooltip title={link.tooltip}>
                <Link
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1 hover:text-[#EF5A6F] transition-all duration-300 hover:scale-105'
                >
                  {link.icon}
                  {link.label}
                </Link>
              </LightTooltip>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <LightTooltip title={'Copy email'}>
              <span>
                <Box
                  onClick={handleShare}
                  className='flex items-center gap-1 hover:text-[#EF5A6F] transition-all duration-300 cursor-pointer hover:scale-105'
                >
                  <Mail className='w-4 h-4' />
                  victor.quinones.ch@gmail.com
                </Box>
              </span>
            </LightTooltip>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className='mt-6 text-gray-400 leading-relaxed'
        >
          Specialized in creating efficient, intuitive, and scalable web
          interfaces. Throughout my journey,{' '}
          <span className='text-[#EF5A6F] italic font-medium'>
            I&apos;ve discovered how fundamental technology is in our daily
            lives and its incredible power to transform them.
          </span>
        </motion.p>
      </div>

      <Snackbar
        open={snackbarCopy}
        autoHideDuration={3000}
        onClose={() => setSnackbarCopy(false)}
      >
        <Alert
          onClose={() => setSnackbarCopy(false)}
          severity='success'
          variant='filled'
          className='bg-[#EF5A6F]'
        >
          Email copied successfully
        </Alert>
      </Snackbar>
    </motion.div>
  )
}

export default Banner
