import CustomDialog from '@/src/components/CustomDialog'
import { containerWidth } from '@/src/utils/const'
import { Person, Menu, KeyboardReturn, Home } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Link, animateScroll as scroll } from 'react-scroll'

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  // background: '#222831',
  background: '#31363F',
  // background: theme.palette.primary.main,
  boxShadow: '0px 5px 19px rgba(0,0,0,.2901960784)',
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
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
    '.menuOptions': {
      display: 'none',

      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(1),
      },
    },
  },
}))

const BoxNavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  '.nav-link': {
    textDecoration: 'none',
    color: theme.palette.common.white,
    fontStyle: 'italic',
    cursor: 'pointer',
  },
}))

const LinkContainer = styled(Link)(({ theme }) => ({
  display: 'flex',
  textDecoration: 'none',
  color: theme.palette.common.black,
  fontWeight: '700',
  borderRadius: 4,
  position: 'relative',
  transition: 'all 0.3s ease-out',
  // background: theme.palette.gradient.background,
  '&:hover': {
    boxShadow: '0 5px 10px 0px #00000060',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '10px 0',
    marginBottom: '20px',
    borderRadius: '10px',
  },
  '.link-text': {
    fontWeight: '700',
  },

  '.icon-nav': {
    [theme.breakpoints.down('lg')]: {
      marginRight: '10px',
    },
  },
}))

const ResponsiveBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
}))

export const PublicHeader = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const responsiveMenuOptions = (
    <ResponsiveBox p={2} onClick={handleDrawerToggle}>
      <Grid container spacing={0}>
        <Grid item xs={12} textAlign={'start'} marginBottom={'10px'}>
          <Typography variant='h6' color={theme.palette.common.black} fontWeight={700}>
            Menú de opciones
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: '20px' }} />

      <LinkContainer
        className='nav-link'
        activeClass='active'
        to='experience'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <MenuItem className='link-text'>Experiencia</MenuItem>
      </LinkContainer>
      <LinkContainer
        className='nav-link'
        to='projects'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <MenuItem className='link-text'>Proyectos</MenuItem>
      </LinkContainer>
      <LinkContainer
        className='nav-link'
        to='about-me'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <MenuItem className='link-text'>Sobre Mí</MenuItem>
      </LinkContainer>
      <LinkContainer
        className='nav-link'
        to='contact'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <MenuItem className='link-text'>Contacto</MenuItem>
      </LinkContainer>
    </ResponsiveBox>
  )

  return (
    <Box>
      <AppBarContainer position='fixed'>
        <Container maxWidth={containerWidth}>
          <Toolbar className='toolBarStyled'>
            <Box className='menuOptions'>
              <IconButton
                // color={theme.palette.common.white}
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ display: { lg: 'none' } }}
              >
                <Menu />
              </IconButton>
            </Box>
            <BoxNavContainer>
              <Link
                className='nav-link'
                activeClass='active'
                to='home'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Home sx={{ marginTop: '5px' }} fontSize='medium' />
              </Link>
              <Link
                className='nav-link'
                to='experience'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Typography variant='body1'>Experiencia</Typography>
              </Link>
              <Link
                className='nav-link'
                to='projects'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Typography variant='body1'>Proyectos</Typography>
              </Link>
              <Link
                className='nav-link'
                to='about-me'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Typography variant='body1'>Sobre Mí</Typography>
              </Link>
              <Link
                className='nav-link'
                to='contact'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Typography variant='body1'>Contacto</Typography>
              </Link>
            </BoxNavContainer>
          </Toolbar>
        </Container>
      </AppBarContainer>
      <Box component='nav'>
        <CustomDialog fullMobile open={mobileOpen} onClose={handleDrawerToggle}>
          {responsiveMenuOptions}
        </CustomDialog>
      </Box>
    </Box>
  )
}
