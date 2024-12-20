import React, { ReactNode } from 'react'
import { Box, useTheme } from '@mui/material'
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
  return (
    <>
      <Box minHeight={'calc(100vh - 123px)'} sx={sx}>
        {children}
      </Box>
      <Footer />
    </>
  )
}
