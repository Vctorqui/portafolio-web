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
import { useRouter } from 'next/router'
import { containerWidth } from '@/src/utils/const'
import { LinkedinIcon } from '@/src/components/SvgIcon'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const FooterBox = styled(Box)(() => ({
  background: '#222831',
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
      color: theme.palette.text.primary,
      marginTop: '3px',
    },
  },
}))

export const PublicFooter = () => {
  interface State extends SnackbarOrigin {
    open: boolean
  }
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const iconColor = theme.palette.common.white

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
      <Button color='secondary' size='small' onClick={handleClose}>
        Deshacer
      </Button>
      <IconButton
        size='small'
        aria-label='close'
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
          Si deseas comunicarte conmigo directamente:
        </Typography>
        <Box className='footerContainer'>
          <CopyToClipboard text='victhorq716@gmail.com'>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <IconButton
                onClick={handleClick({
                  vertical: 'bottom',
                  horizontal: 'right',
                })}
                sx={{
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <ContentCopy sx={{ color: theme.palette.common.white }} />
                <Typography color={theme.palette.common.white} variant='body2'>
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
            message='Correo Copiado'
            action={action}
            key={vertical + horizontal}
          />
          <Divider orientation='vertical' variant='middle' flexItem />

          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Link className='footerLink' href={'https://wa.me/+584127884439'}>
              <Box display={'flex'} alignItems={'center'} gap={1}>
                <WhatsApp sx={{ color: iconColor }} fontSize='small' />
                <Typography color={theme.palette.common.white} variant='body2'>
                  +58 412 788 4439{' '}
                </Typography>
              </Box>
            </Link>
            <Divider orientation='vertical' variant='middle' flexItem />
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <Link href={'https://github.com/Vctorqui'}>
                <GitHub sx={{ color: iconColor }} />
              </Link>
              <Link
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
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          gap={1}
          mt={2}
          sx={{
            cursor: 'pointer',
            ':hover .btnTop': {
              background: '#76ABAE',
            },
          }}
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: 'smooth',
            })
          }}
        >
          <Typography variant='body2'>Ir arriba</Typography>
          <IconButton
            className='btnTop'
            sx={{
              background: '#d6e6e7',
              ':hover': {
                background: '#76ABAE',
              },
            }}
          >
            <ArrowUpward fontSize='medium' />
          </IconButton>
        </Box>
      </Container>
    </FooterBox>
  )
}
