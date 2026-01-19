/* eslint-disable @next/next/no-img-element */
import { Alert, Avatar, Box, Snackbar } from '@mui/material'
import Link from 'next/link'
import { GitHub, LinkedIn, Mail } from '@mui/icons-material'
import Image from 'next/image'
import { useState } from 'react'
import { LuCodepen } from 'react-icons/lu'
import { File, FileText, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { SpotifyNowPlaying } from './SpotifyNowPlaying'
import { TimeZone } from './TimeZone'
import { Language } from '../types'
import { bannerLabels, techStack } from '../constants'
import { TooltipStyled } from './ui/TooltipStyled'

const Banner = ({
  language,
  activeTab,
  onTabChange,
}: {
  language: Language
  activeTab: string
  onTabChange: (value: string) => void
}) => {
  const [snackbarCopy, setSnackbarCopy] = useState(false)

  const socialLinks = [
    {
      icon: <FileText className='w-4 h-4' />,
      href: './Victor_Quinones_Frontend_CV.pdf',
      label: bannerLabels[language].social.resume,
      tooltip: bannerLabels[language].social.resumeTip,
    },
    {
      icon: <LinkedIn className='w-4 h-4' />,
      href: 'https://www.linkedin.com/in/victorqui/',
      label: 'LinkedIn',
      tooltip: bannerLabels[language].social.linkedinTip,
    },
    {
      icon: <GitHub className='w-4 h-4' />,
      href: 'https://github.com/Vctorqui',
      label: 'GitHub',
      tooltip: bannerLabels[language].social.githubTip,
    },
    {
      icon: <LuCodepen className='w-4 h-4' />,
      href: 'https://codepen.io/vichorq',
      label: 'Codepen',
      tooltip: bannerLabels[language].social.codepenTip,
    },
  ]

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
      className='profile-banner max-w-3xl mx-auto bg-[#080808]/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/5'
    >
      <div className='h-48 relative overflow-hidden'>
        <div className='w-full h-full'>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload='metadata'
            className='w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 opacity-40'
          >
            <source src='/images/banner.mp4' type='video/mp4' />
          </video>
          <div className='absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent' />
        </div>
        <div className='absolute top-4 right-4'>
          <TimeZone />
        </div>
      </div>

      <div className='relative px-6'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='absolute -top-12 left-6'
        >
          <div className='relative'>
            <Avatar
              alt='Victor Quiñones Profile Picture'
              className='w-28 h-28 border-4 border-[#080808] shadow-2xl rounded-full object-cover ring-2 ring-cyan-400/20'
              src='/images/perfil_profile.webp'
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
        </motion.div>

        <div className='pt-20 pb-8'>
          <div className='flex align-center justify-between'>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='text-3xl font-black text-white mb-1 tracking-tight'
              >
                Victor Quiñones
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='text-cyan-400 italic text-lg mb-4 font-medium'
              >
                {bannerLabels[language].role}
              </motion.p>
            </div>
            <div className='flex items-center gap-3 absolute top-2 right-2'>
              <SpotifyNowPlaying language={language} />
            </div>
          </div>

          <div className='flex flex-wrap gap-x-4 gap-y-2 mb-6 text-white/40 text-[10px] font-bold uppercase tracking-wider'>
            {socialLinks.map((link) => (
              <TooltipStyled key={link.label} title={link.tooltip}>
                <Link
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:text-cyan-400 transition-all duration-300 group'
                >
                  <span className='group-hover:scale-110 transition-transform'>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              </TooltipStyled>
            ))}
            <TooltipStyled title={bannerLabels[language].social.emailTip}>
              <Box
                onClick={handleShare}
                className='flex items-center gap-2 hover:text-cyan-400 transition-all duration-300 cursor-pointer group'
              >
                <span className='group-hover:scale-110 transition-transform'>
                  <Mail className='w-4 h-4' />
                </span>
                <span>victor.quinones.ch@gmail.com</span>
              </Box>
            </TooltipStyled>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='text-white/60 leading-relaxed text-sm max-w-xl mb-8'
          >
            {bannerLabels[language].bio_start}
            <span className='text-cyan-400 font-bold'>
              {bannerLabels[language].bio_highlight}
            </span>
          </motion.p>

          <div className='space-y-3'>
            <h3 className='text-white/20 text-[8px] font-black tracking-[0.3em] uppercase'>
              {bannerLabels[language].techStackLabel}
            </h3>
            <div className='flex flex-wrap gap-2'>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className='px-3 py-1.5 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 text-[9px] font-black tracking-widest hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all duration-300'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex border-t border-white/5 bg-black/40'>
        <button
          onClick={() => onTabChange('Projects')}
          className={`flex-1 py-4 text-[10px] font-black tracking-[0.3em] transition-all relative overflow-hidden group ${
            activeTab === 'Projects'
              ? 'text-cyan-400'
              : 'text-white/20 hover:text-white/40 hover:bg-white/5'
          }`}
        >
          {bannerLabels[language].tabs.projects}
          {activeTab === 'Projects' && (
            <>
              <div className='absolute inset-0 bg-cyan-400/5' />
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' />
            </>
          )}
        </button>
        <button
          onClick={() => onTabChange('Experience')}
          className={`flex-1 py-4 text-[10px] font-black tracking-[0.3em] transition-all border-x border-white/5 relative overflow-hidden group ${
            activeTab === 'Experience'
              ? 'text-cyan-400'
              : 'text-white/20 hover:text-white/40 hover:bg-white/5'
          }`}
        >
          {bannerLabels[language].tabs.experience}
          {activeTab === 'Experience' && (
            <>
              <div className='absolute inset-0 bg-cyan-400/5' />
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' />
            </>
          )}
        </button>
        <button
          onClick={() => onTabChange('Me')}
          className={`flex-1 py-4 text-[10px] font-black tracking-[0.3em] transition-all relative overflow-hidden group ${
            activeTab === 'Me'
              ? 'text-cyan-400'
              : 'text-white/20 hover:text-white/40 hover:bg-white/5'
          }`}
        >
          {bannerLabels[language].tabs.about}
          {activeTab === 'Me' && (
            <>
              <div className='absolute inset-0 bg-cyan-400/5' />
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' />
            </>
          )}
        </button>
      </div>

      <Snackbar
        open={snackbarCopy}
        autoHideDuration={3000}
        onClose={() => setSnackbarCopy(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarCopy(false)}
          severity='success'
          variant='filled'
          className='bg-cyan-400 text-[#080808]'
        >
          {bannerLabels[language].copySuccess}
        </Alert>
      </Snackbar>
    </motion.div>
  )
}

export default Banner
