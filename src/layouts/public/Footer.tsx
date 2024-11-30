import React from 'react'
import Container from '@mui/material/Container'
import { Box, Divider, IconButton, Typography, styled } from '@mui/material'
import { GitHub, ArrowUpward, LinkedIn } from '@mui/icons-material'
import theme from '../../../theme/theme'
import Link from 'next/link'
import { containerWidth } from '@/src/utils/const'
import { LightTooltip } from '@/src/components/LightToolTip'

const iconColor = theme.palette.secondary.light

const FooterBox = styled(Box)(() => ({
  background: theme.palette.common.black,
  padding: theme.spacing(2, 0),
  '.footerContainer': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    aligItems: 'center',

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
      transition: 'all .3s ease-out',
      '&:hover': {
        color: theme.palette.backgroundGreen.green,
        transform: 'scale(1.05)',
      },
    },
  },
  '.boxBtnUp': {
    cursor: 'pointer',
    ':hover .btnTop': {
      background: theme.palette.backgroundGreen.green,
      transform: 'scale(1.1)',
    },
    '.btnTop': {
      background: theme.palette.secondary.main,
      transition: 'all .3s ease-out',
      ':hover': {
        background: theme.palette.backgroundGreen.green,
        transform: 'scale(1.1)',
      },
    },
  },
}))

export const Footer = () => {
  return (
    <FooterBox>
      <Container maxWidth={containerWidth}>
        <Box className='footerContainer'>
          <Typography
            textAlign={'center'}
            color={theme.palette.common.white}
            variant='body2'
            fontWeight={600}
          >
            If you would like to contact me directly:
          </Typography>
          <Divider orientation='vertical' variant='middle' flexItem />
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          >
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
                <LinkedIn className='iconFooter' />
              </Link>
            </LightTooltip>
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
          <Typography className='textTop' variant='body2'>
            Jump to top
          </Typography>
          <IconButton className='btnTop' aria-label='click to jump to top'>
            <ArrowUpward fontSize='medium' />
          </IconButton>
        </Box>
      </Container>
    </FooterBox>
  )
}
