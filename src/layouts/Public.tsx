import React, { ReactNode } from 'react'
import { Box, Button, ButtonGroup } from '@mui/material'
import { Footer } from './public/Footer'
import { SEO } from '../components/SEO'

type Language = 'es' | 'en'

export const Layout = ({
  children,
  sx,
  language,
  onLanguageChange,
}: {
  children: ReactNode
  sx?: any
  language: Language
  onLanguageChange: (lang: Language) => void
}) => {
  const langLabels: Record<Language, string> = { es: 'ES', en: 'EN' }

  return (
    <>
      <SEO />
      <Box px={2} pt={2} display='flex' justifyContent='flex-end'>
        <ButtonGroup size='small' aria-label='Language selector'>
          {(Object.keys(langLabels) as Language[]).map((lang) => (
            <Button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              variant={language === lang ? 'contained' : 'outlined'}
              color={language === lang ? 'secondary' : 'inherit'}
            >
              {langLabels[lang]}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box minHeight={'calc(100vh - 123px)'} sx={sx}>
        {children}
      </Box>
      <Footer />
    </>
  )
}
