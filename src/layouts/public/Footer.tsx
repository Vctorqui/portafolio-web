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
import { ContentCopy, Close, GitHub, ArrowUpward } from '@mui/icons-material'
import theme from '../../../theme/theme'
import Link from 'next/link'
import { containerWidth } from '@/src/utils/const'
import { LinkedinIcon } from '@/src/components/SvgIcon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { LightTooltip } from '@/src/components/LightToolTip'

const iconColor = theme.palette.secondary.light

const FooterBox = styled(Box)(() => ({
  background: theme.palette.common.black,
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
      justifyContent: 'center',
      gap: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
      '.emailBtn': {
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        '&:hover': {
          background: theme.palette.backgroundGreen.green,
          color: theme.palette.common.black,
        },
      },
    },
    '.iconFooter': {
      color: iconColor,
    },
  },
  '.boxBtnUp': {
    cursor: 'pointer',
    ':hover .btnTop': {
      background: theme.palette.backgroundGreen.green,
    },
    '.btnTop': {
      background: theme.palette.secondary.main,
      ':hover': {
        background: theme.palette.backgroundGreen.green,
      },
    },
  },
}))

export const Footer = () => {
  interface State extends SnackbarOrigin {
    open: boolean
  }
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

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
        aria-label='Close snackbar'
        sx={{ color: theme.palette.backgroundGreen.green }}
        size='small'
        onClick={handleClose}
      >
        Close
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
          fontWeight={600}
        >
          If you would like to contact me directly
        </Typography>
        <Box className='footerContainer'>
          <CopyToClipboard text='victor.quinones.ch@gmail.com'>
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
                  Click to Copy: victor.quinones.ch@gmail.com
                </Typography>
              </IconButton>
            </Box>
          </CopyToClipboard>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={3000}
            open={open}
            onClose={handleClose}
            message={'Email Copied'}
            action={action}
            key={vertical + horizontal}
          />
          <Divider orientation='vertical' variant='middle' flexItem />

          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={2}
          >
            <Divider orientation='vertical' variant='middle' flexItem />
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <LightTooltip title='Go to my GitHub'>
                <Link
                  href={'https://github.com/Vctorqui'}
                  arial-label='Click to know more at my github site'
                >
                  <GitHub className='iconFooter' />
                </Link>
              </LightTooltip>
              <LightTooltip title='Go to my LinkedIn'>
                <Link
                  arial-label='Click to know more at my linkedIn site'
                  href={'www.linkedin.com/in/victorqui'}
                >
                  <LinkedinIcon
                    additionalClassName='iconFooter'
                    width={'16px'}
                    height={'16px'}
                    color={iconColor}
                  />
                </Link>
              </LightTooltip>
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
          <Typography variant='body2'>Jump to top</Typography>
          <IconButton className='btnTop' aria-label='click to jump to top'>
            <ArrowUpward fontSize='medium' />
          </IconButton>
        </Box>
      </Container>
    </FooterBox>
  )
}
