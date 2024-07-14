import { LinkBlockStyled } from '@/src/components/LinkStyled'
import MusicPlayer from '@/src/components/MusicPlayer'
import { AccessibilityIcon } from '@/src/components/SvgIcon'
import { Box, Container, IconButton, styled } from '@mui/material'
import React from 'react'

const HeaderBox = styled(Box)(({ theme }) => ({
  '.headerContainer': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ' center',
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '20px',
    },
  },

  '.iconButton': {
    padding: 0,
    color: '#000',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'color .2s ease-out',
    marginBottom: '8px',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
  '.textLink': {
    fontSize: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
}))

const HomePublicHeader = ({ openDialog }: any) => {
  return (
    <>
      <HeaderBox>
        <Container maxWidth={'xl'}>
          <Box className='headerContainer' component={'div'}>
            <MusicPlayer />
            <Box component='div' display={'flex'} alignItems={'center'} gap={4}>
              <LinkBlockStyled additionalClassName='textLink' href={''}>
                NEWS
              </LinkBlockStyled>
              <LinkBlockStyled additionalClassName='textLink' href={''}>
                CARRERS
              </LinkBlockStyled>
              <LinkBlockStyled additionalClassName='textLink' href={''}>
                INVENTORS
              </LinkBlockStyled>
              <IconButton onClick={openDialog} className='iconButton'>
                <AccessibilityIcon width={'20px'} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </HeaderBox>
    </>
  )
}

export default HomePublicHeader
