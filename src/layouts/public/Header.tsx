import { containerWidth } from '@/src/utils/const'
import { AppBar, Box, Container, Toolbar, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  left: 0,
  right: 0,
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
    width: '100%',
    border: 'none',
    boxShadow: 'none',
    marginTop: 0,
  },
  '.navBrandImg': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '.toolBarStyled': {
    padding: '0!important',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
      marginTop: 0,
    },
  },
}))

export const Header = () => {
  const [isNavDown, setIsNavDown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY
      if (scroll > 70) setIsNavDown(true)
      else setIsNavDown(false)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box>
      <AppBarContainer position='fixed' sx={{ background: 'none' }}>
        <Container sx={{ padding: 0 }} maxWidth={containerWidth}>
          <Toolbar
            className='toolBarStyled max-w-2xl mx-auto'
            sx={{
              background: isNavDown ? 'hsl( 232 87.9% 6.5% / 65%)' : '#02061F',
              marginX: 'auto',
              transition: 'all .3s ease-out',
            }}
          ></Toolbar>
        </Container>
        <Box sx={{ position: 'absolute', left: 20, top: 10 }}>
          <Image
            width={40}
            height={40}
            alt='Logo Victor`s web portfolio'
            src='/images/avatar.webp'
          />
        </Box>
      </AppBarContainer>
    </Box>
  )
}
