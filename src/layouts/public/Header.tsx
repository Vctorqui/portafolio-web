import CustomDialog from '@/src/components/CustomDialog'
import { containerWidth } from '@/src/utils/const'
import { Menu, Home } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-scroll'

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.light,
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
    color: theme.palette.text.primary,
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

export const PublicHeader = ({ changeLang }: any) => {
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
          <Typography
            variant='h6'
            color={theme.palette.common.black}
            fontWeight={700}
          >
            {changeLang === true ? 'Menu' : ' Menú de opciones'}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: '20px' }} />
      <LinkContainer
        href='#experience'
        aria-label='Ir al experiencia'
        className='nav-link'
        activeClass='active'
        to='experience'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <MenuItem className='link-text'>
          {changeLang === true ? 'Experience' : 'Experiencia'}
        </MenuItem>
      </LinkContainer>
      <LinkContainer
        href='#projects'
        className='nav-link'
        aria-label='Ir a proyectos'
        to='projects'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <MenuItem className='link-text'>
          {changeLang === true ? 'Proyects' : 'Proyectos'}
        </MenuItem>
      </LinkContainer>
      <LinkContainer
        href='#about-me'
        aria-label='Ir a sobre mi'
        className='nav-link'
        to='about-me'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <MenuItem className='link-text'>
          {changeLang === true ? 'About me' : 'Sobre Mí'}
        </MenuItem>
      </LinkContainer>
      <LinkContainer
        href='#contact'
        aria-label='Ir a contacto'
        className='nav-link'
        to='contact'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <MenuItem className='link-text'>
          {changeLang === true ? 'Contact' : 'Contacto'}
        </MenuItem>
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
                aria-label='Abrir menu'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ display: { lg: 'none' } }}
              >
                <Menu />
              </IconButton>
            </Box>
            <BoxNavContainer>
              <Link
                href='#home'
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
                href='#experience'
                aria-label='Ir al experiencia'
                className='nav-link'
                to='experience'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Typography variant='body1'>
                  {changeLang === true ? 'Experience' : 'Experiencia'}
                </Typography>
              </Link>
              <Link
                href='#projects'
                aria-label='Ir a proyectos'
                className='nav-link'
                to='projects'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Typography variant='body1'>
                  {changeLang === true ? 'Proyects' : 'Proyectos'}
                </Typography>
              </Link>
              <Link
                href='#about-me'
                aria-label='Ir a sobre mi'
                className='nav-link'
                to='about-me'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Typography variant='body1'>
                  {changeLang === true ? 'About me' : 'Sobre Mí'}
                </Typography>
              </Link>
              <Link
                href='#contact'
                aria-label='Ir a contacto'
                className='nav-link'
                to='contact'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Typography variant='body1'>
                  {changeLang === true ? 'Contact' : 'Contacto'}
                </Typography>
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
