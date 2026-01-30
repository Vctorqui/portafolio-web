import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Box, Divider, IconButton, Typography, styled } from '@mui/material'
import { GitHub, ArrowUpward, LinkedIn } from '@mui/icons-material'
import Link from 'next/link'
import { containerWidth } from '@/src/utils/const'
import { TooltipStyled } from '@/src/components/shared/TooltipStyled'
import { motion } from 'framer-motion'
import theme from '@/theme/theme'
import { Language } from '@/src/types'

const FooterBox = styled(Box)(() => ({
  padding: '2rem 0',
  '.footerContainer': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  '.socialIcons': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
  },
  '.iconFooter': {
    color: '#94a3b8',
    transition: 'all .3s ease-out',
    '&:hover': {
      color: '#EF5A6F',
    },
  },
  '.boxBtnUp': {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '2rem',
    '.btnTop': {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#94a3b8',
      transition: 'all .3s ease-out',
      '&:hover': {
        background: 'rgba(239, 90, 111, 0.1)',
        color: '#EF5A6F',
        transform: 'scale(1.05)',
      },
    },
  },
}))

const FooterSectionLg = {
  es: {
    contact: '¿Tienes un proyecto en mente? ¡Hablemos!',
    subtitle: 'Siempre estoy abierto a nuevas oportunidades y colaboraciones',
  },
  en: {
    contact: "Have a project in mind? Let's talk!",
    subtitle: "I'm always open to new opportunities and collaborations",
  },
}

export const Footer = ({ language }: { language: Language }) => {
  return (
    <FooterBox className='bg-slate-950/50 backdrop-blur-sm border-t border-white/10'>
      <Container maxWidth={containerWidth}>
        <Box className='footerContainer'>
          <Typography
            textAlign={'center'}
            color='white'
            variant='body1'
            fontWeight={500}
            className='text-lg'
          >
            {FooterSectionLg[language].contact}
          </Typography>
          <Typography
            textAlign={'center'}
            color='#94a3b8'
            variant='body2'
            className='text-sm'
          >
            {FooterSectionLg[language].subtitle}
          </Typography>
          <Box className='socialIcons'>
            <TooltipStyled title='Visit my GitHub'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href={'https://github.com/Vctorqui'}
                  aria-label='Visit my GitHub profile'
                  title='Follow me on GitHub'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GitHub className='iconFooter' fontSize='medium' />
                </Link>
              </motion.div>
            </TooltipStyled>
            <TooltipStyled title='Connect on LinkedIn'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href={'https://www.linkedin.com/in/victorqui'}
                  aria-label='Visit my LinkedIn profile'
                  title='Connect with me on LinkedIn'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <LinkedIn className='iconFooter' fontSize='medium' />
                </Link>
              </motion.div>
            </TooltipStyled>
          </Box>
        </Box>
        {/* 
        <Box
          className='boxBtnUp'
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: 'smooth',
            })
          }}
        >
          <Typography
            variant='body2'
            color='#94a3b8'
            className='text-sm hover:text-[#EF5A6F] transition-colors'
          >
            Back to top
          </Typography>
          <IconButton
            className='btnTop'
            aria-label='Back to top of the page'
            size='small'
          >
            <ArrowUpward fontSize='small' />
          </IconButton>
        </Box>
*/}
      </Container>
    </FooterBox>
  )
}
