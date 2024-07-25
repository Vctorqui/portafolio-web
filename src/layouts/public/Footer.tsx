import React from 'react'
import Container from '@mui/material/Container'
import {
  Box,
  Button,
  Divider,
  IconButton,
  Snackbar,
  SnackbarOrigin,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material'
import {
  ContentCopy,
  WhatsApp,
  Close,
  GitHub,
  ArrowUpward,
} from '@mui/icons-material'
import theme from '../../../theme/theme'
import Link from 'next/link'
import { containerWidth } from '@/src/utils/const'
import { LinkedinIcon } from '@/src/components/SvgIcon'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const FooterBox = styled(Box)(() => ({
  background: theme.palette.primary.main,
  padding: theme.spacing(2, 0),
  '.footerContainer': {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    aligItems: 'center',
    gap: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '0',
    },
    '.footerLink': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      marginTop: '3px',
    },
    '.footerEmail': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
      '.emailBtn': {
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      },
    },
  },
  '.boxBtnUp': {
    cursor: 'pointer',
    ':hover .btnTop': {
      background: '#76ABAE',
    },
    '.btnTop': {
      background: theme.palette.secondary.main,
      ':hover': {
        background: theme.palette.backgroundGreen.green,
      },
    },
  },
}))

export const PublicFooter = ({ changeLang }: any) => {
  interface State extends SnackbarOrigin {
    open: boolean
  }
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const iconColor = theme.palette.secondary.light

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = state

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const action = (
    <React.Fragment>
      <Button
        aria-label='Cerrar ventana'
        sx={{ color: theme.palette.backgroundGreen.green }}
        size='small'
        onClick={handleClose}
      >
        {changeLang === true ? 'Close' : 'Deshacer'}
      </Button>
      <IconButton
        size='small'
        aria-label='Cerrar'
        color='inherit'
        onClick={handleClose}
      >
        <Close fontSize='small' />
      </IconButton>
    </React.Fragment>
  )

  return (
    <FooterBox>
      <Container maxWidth={containerWidth}>
        <Typography
          textAlign={'center'}
          color={theme.palette.common.white}
          variant='body2'
        >
          {changeLang === true
            ? 'If you would like to contact me directly:'
            : ' Si deseas comunicarte conmigo directamente:'}
        </Typography>
        <Box className='footerContainer'>
          <CopyToClipboard text='victhorq716@gmail.com'>
            <Box className='footerEmail'>
              <IconButton
                aria-label='copiar correo'
                className='emailBtn'
                onClick={handleClick({
                  vertical: 'bottom',
                  horizontal: 'right',
                })}
              >
                <ContentCopy sx={{ color: theme.palette.common.white }} />
                <Typography color={theme.palette.common.white} variant='body2'>
                  {changeLang === true
                    ? 'Click to Copy: '
                    : 'Click para Copiar:'}
                  <br style={{ display: isSm ? 'block' : 'none' }} />{' '}
                  victhorq716@gmail.com
                </Typography>
              </IconButton>
            </Box>
          </CopyToClipboard>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={3000}
            open={open}
            onClose={handleClose}
            message={changeLang === true ? 'Email Copied ' : 'Correo Copiado'}
            action={action}
            key={vertical + horizontal}
          />
          <Divider orientation='vertical' variant='middle' flexItem />

          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Link
              className='footerLink'
              href={'https://wa.me/+584127884439'}
              arial-label='Ir a whatsapp'
            >
              <Box display={'flex'} alignItems={'center'} gap={1}>
                <WhatsApp sx={{ color: iconColor }} fontSize='small' />
                <Typography color={theme.palette.common.white} variant='body2'>
                  +58 412 788 4439{' '}
                </Typography>
              </Box>
            </Link>
            <Divider orientation='vertical' variant='middle' flexItem />
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <Link
                href={'https://github.com/Vctorqui'}
                arial-label='Ir a github'
              >
                <GitHub sx={{ color: iconColor }} />
              </Link>
              <Link
                arial-label='Ir a linkedIn'
                href={
                  'https://www.linkedin.com/in/victor-qui%C3%B1ones-a41084249/'
                }
              >
                <LinkedinIcon
                  width={'16px'}
                  height={'16px'}
                  color={iconColor}
                />
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          className='boxBtnUp'
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          gap={1}
          mt={2}
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: 'smooth',
            })
          }}
        >
          <Typography variant='body2'>
            {changeLang === true ? 'Jump to top ' : 'Ir arriba'}
          </Typography>
          <IconButton className='btnTop'>
            <ArrowUpward fontSize='medium' />
          </IconButton>
        </Box>
      </Container>
    </FooterBox>
  )
}
