import React, { ReactNode } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import HomePublicHeader from './homePublic/Header'
import HomePublicFooter from './homePublic/Footer';

const HomePublicLayout = ({ children, sx }: { children: ReactNode; sx?: any }) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <HomePublicHeader />
      <Box component={'div'} minHeight={'calc(100vh - 160px)'}  sx={sx}>
        {children}
      </Box>
      <HomePublicFooter />
    </Box>
  )
}

export default HomePublicLayout
