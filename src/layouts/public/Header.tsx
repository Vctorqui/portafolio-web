import CustomDialog from '@/src/components/CustomDialog'
import {
  containerWidth,
  navEnglishItems,
  navSpanishItems,
} from '@/src/utils/const'
import { Menu } from '@mui/icons-material'
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
  background: theme.palette.primary.main,
  border: '1px solid #393E46',
  marginTop: '10px',
  borderRadius: '10px',
  width: '100%',
  margin: '0 auto',
  left: 0,
  right: 0,
  boxShadow: '0px 5px 19px rgba(0,0,0,.2901960784)',
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
    '.menuOptions': {
      display: 'none',

      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(1),
      },
    },
    '.nav-link': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      transition: 'all .2s ease-out',
      fontWeight: 800,
      position: 'relative',
      pointerEvents: 'all',
      '&:after': {
        content: '""',
        bottom: '-3px',
        width: '100%',
        height: '1px',
        position: 'absolute',
        borderRadius: '2px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        transition: 'all .2s ease-out',
        background: 'transparent',
      },
      '&:hover:after': {
        background: '#fff',
      },
      '&.active': {
        color: theme.palette.text.secondary,
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
  border: '1px solid #1E2022',
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
      {changeLang === true
        ? navEnglishItems.map((item) => (
            <LinkContainer
              aria-label={`Go to ${item.label}`}
              key={item.href}
              href={item.href}
              className='nav-link'
              activeClass='active'
              to={item.href.slice(1)}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={handleDrawerToggle}
            >
              <MenuItem className='link-text'>{item.label}</MenuItem>
            </LinkContainer>
          ))
        : navSpanishItems.map((item) => (
            <LinkContainer
              aria-label={`Ir a ${item.label}`}
              key={item.href}
              href={item.href}
              className='nav-link'
              activeClass='active'
              to={item.href.slice(1)}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={handleDrawerToggle}
            >
              <MenuItem className='link-text'>{item.label}</MenuItem>
            </LinkContainer>
          ))}
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
                sx={{ display: { lg: 'none' }, color: '#EEE' }}
              >
                <Menu />
              </IconButton>
            </Box>
            <BoxNavContainer>
              {changeLang === true
                ? navEnglishItems.map((item) => (
                    <Link
                      aria-label={`Go to ${item.label}`}
                      key={item.href}
                      href={item.href}
                      className='nav-link'
                      activeClass='active'
                      to={item.href.slice(1)}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      <Typography variant='body1'>{item.label}</Typography>
                    </Link>
                  ))
                : navSpanishItems.map((item) => (
                    <Link
                      aria-label={`Ir a ${item.label}`}
                      key={item.href}
                      href={item.href}
                      className='nav-link'
                      activeClass='active'
                      to={item.href.slice(1)}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      <Typography variant='body1'>{item.label}</Typography>
                    </Link>
                  ))}
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
