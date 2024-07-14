import { LinkBlockStyled } from '@/src/components/LinkStyled'
import { BlockIcon } from '@/src/components/SvgIcon'
import { Box, Container, Typography, styled } from '@mui/material'
import React from 'react'

const FooterBox = styled(Box)(({ theme }) => ({
  '.footerContainer': {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
    },
    '.footerInfo': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(4),
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
      },
      '.textLink': {
        fontWeight: 400,
        fontSize: '20px',
        [theme.breakpoints.down('lg')]: {
          fontSize: '14px',
        },
      },
    },
    '.politesText': {
      alignSelf: 'flex-end',
      [theme.breakpoints.down('md')]: {
        width: '250px',
        alignSelf: 'center',
      },
    },
  },
}))

const HomePublicFooter = () => {
  return (
    <FooterBox>
      <Container maxWidth={'xl'}>
        <Box className='footerContainer' component={'div'}>
          <Box className='footerInfo' component={'div'}>
            <BlockIcon
              additionalClassName={{ position: 'relative' }}
              width={'200px'}
            />
            <Box
              component={'div'}
              display={'flex'}
              alignItems={'center'}
              gap={2}
            >
              <LinkBlockStyled
                additionalClassName='textLink'
                href={'https://squareup.com/us/es'}
              >
                Square
              </LinkBlockStyled>
              <LinkBlockStyled
                additionalClassName='textLink'
                href={'https://cash.app/'}
              >
                Cash App
              </LinkBlockStyled>
              <LinkBlockStyled
                additionalClassName='textLink'
                href={'https://spiral.xyz/'}
              >
                Spiral
              </LinkBlockStyled>
              <LinkBlockStyled
                additionalClassName='textLink'
                href={'https://tidal.com/'}
              >
                Tidal
              </LinkBlockStyled>
              <LinkBlockStyled
                additionalClassName='textLink'
                href={'https://www.tbd.website/'}
              >
                TBD
              </LinkBlockStyled>
            </Box>
          </Box>
          <Box className='politesText' position='relative' component={'div'}>
            <Typography fontSize={'10px'} variant='body2'>
              © 2024 Block, Inc. BLOCK and the Block Logo are trademarks of
              Block, Inc. <LinkBlockStyled href={''}>Legal</LinkBlockStyled>
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterBox>
  )
}

export default HomePublicFooter
