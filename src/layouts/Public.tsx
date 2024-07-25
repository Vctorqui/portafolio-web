import React, { ReactNode } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { PublicFooter } from './public/Footer'
import { PublicHeader } from './public/Header'

const PublicLayout = ({
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
      <PublicHeader changeLang={changeLang} />
      <Box minHeight={'calc(100vh - 123px)'} mt={isSm ? 7 : 8} sx={sx}>
        {children}
      </Box>
      <PublicFooter changeLang={changeLang} />
    </>
  )
}

export default PublicLayout
