/* eslint-disable @next/next/no-img-element */
import { Alert, Avatar, Box, Snackbar } from '@mui/material'
import Link from 'next/link'
import { GitHub, LinkedIn, Mail } from '@mui/icons-material'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { LuCodepen } from 'react-icons/lu'
import { FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TimeZone } from './TimeZone'
import { Language } from '../types'
import { bannerLabels, techStack } from '../constants'
import { TooltipStyled } from './shared/TooltipStyled'

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
  const [activeCard, setActiveCard] = useState(0)
  const statusCards = bannerLabels[language].statusCards

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCard((prev) => (prev + 1) % statusCards.length)
    }, 4000)
    return () => clearTimeout(timer)
  }, [activeCard, statusCards.length])

  const socialLinks = [
    {
      icon: <LinkedIn className='w-4 h-4' />,
      href: 'https://www.linkedin.com/in/victorqui/',
      label: '',
      tooltip: bannerLabels[language].social.linkedinTip,
    },
    {
      icon: <GitHub className='w-4 h-4' />,
      href: 'https://github.com/Vctorqui',
      label: '',
      tooltip: bannerLabels[language].social.githubTip,
    },
    {
      icon: <LuCodepen className='w-4 h-4' />,
      href: 'https://codepen.io/vichorq',
      label: '',
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
            <div className='flex items-center gap-3 absolute top-2 right-2'></div>
            <div className='flex flex-wrap gap-x-4 gap-y-2 mb-6 text-white/40 text-[10px] font-bold uppercase tracking-wider'>
              <TooltipStyled title={bannerLabels[language].social.resumeTip}>
                <Link
                  href={
                    language === 'es'
                      ? '/Victor_Quinones_Frontend_CV.pdf'
                      : '/Victor_Quinones_Frontend_Resume.pdf'
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:text-cyan-400 transition-all duration-300 group'
                >
                  <span className='group-hover:scale-110 transition-transform'>
                    <FileText className='w-4 h-4' />
                  </span>
                  <span></span>
                </Link>
              </TooltipStyled>
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
                  <span></span>
                </Box>
              </TooltipStyled>
            </div>
          </div>
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='text-white/60 leading-relaxed text-sm max-w-xl mb-8'
          >
            {bannerLabels[language].bio_start}
            <span className='text-cyan-400 font-bold'>
              {bannerLabels[language].bio_highlight}
            </span>
          </motion.p> */}{' '}
          {/* Status Cards Carousel (Single item cycling on all screens for a dynamic feel) */}
          <div className='space-y-4'>
            <h3 className='text-white/50 text-[8px] font-black tracking-[0.3em] uppercase'>
              {language === 'es' ? 'ESTADO ACTUAL' : 'CURRENT STATUS'}
            </h3>

            <div className='relative h-[80px] w-full overflow-hidden rounded-xl bg-cyan-400/5 border border-cyan-400/10'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`${activeCard}-${language}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className='absolute inset-0 p-4 flex flex-col justify-center'
                >
                  <div className='flex items-center gap-2'>
                    <span className='text-cyan-400/40 font-mono text-[8px]'>
                      [
                    </span>
                    <span className='text-white/40 text-[9px] font-black tracking-[0.2em] uppercase font-mono'>
                      {statusCards[activeCard].label}
                    </span>
                    <span className='text-cyan-400/40 font-mono text-[8px]'>
                      ]
                    </span>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:items-baseline sm:gap-3'>
                    <p className='text-white text-base md:text-lg font-bold truncate tracking-tight'>
                      {statusCards[activeCard].value}
                    </p>
                    <p className='text-cyan-400/80 text-[10px] md:text-xs font-medium truncate'>
                      {statusCards[activeCard].sub}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className='absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5'>
                {statusCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCard(i)}
                    className={`w-1 transition-all duration-500 rounded-full ${
                      i === activeCard
                        ? 'h-4 bg-cyan-400'
                        : 'h-1 bg-white/10 hover:bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Decorative scanline effect */}
              <div className='absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/[0.02] to-transparent bg-[length:100%_4px] animate-pulse opacity-30' />
            </div>

            {/* Tech stack carousel - auto-scrolling pill strip */}
            <div className='relative pt-4'>
              <h3 className='text-white/50 text-[8px] font-black tracking-[0.3em] uppercase mb-3'>
                {bannerLabels[language].techStackLabel}
              </h3>
              <div className='relative overflow-hidden py-1'>
                <div className='flex items-center gap-3 w-max animate-scroll will-change-transform'>
                  {/* Replicating items for seamless loop */}
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
                {/* Edge Fades */}
                <div className='absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-10' />
                <div className='absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10' />
              </div>
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
