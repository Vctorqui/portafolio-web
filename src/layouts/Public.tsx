import React, { ReactNode } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Header } from './public/Header'
import { Footer } from './public/Footer'

export const Layout = ({
  children,
  sx,
  changeLang,
}: {
  changeLang: any
  children: ReactNode
  sx?: any
}) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <Header />
      <Box minHeight={'calc(100vh - 123px)'} mt={isSm ? 7 : 8} sx={sx}>
        {children}
      </Box>
      <Footer />
    </>
  )
}
