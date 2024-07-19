import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import theme from '@/theme/theme'

export const CircularLoading = ({ size = 80 }: { size?: number }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        padding: '40px 0 80px',
      }}
    >
      <CircularProgress
        sx={{ color: theme.palette.primary.main }}
        size={size}
      />
    </Box>
  )
}
