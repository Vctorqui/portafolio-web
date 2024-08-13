import React, { useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import PublicLayout from '@/src/layouts/Public'
import { containerWidth, tasks } from '@/src/utils/const'
import theme from '@/theme/theme'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from '@mui/material'
import Timeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import { WorkOutline } from '@mui/icons-material'
import { TimelineDot } from '@mui/lab'
import { taskTypes } from '@/src/types/types'
import { ProjectCard } from '@/src/components/ProjectCard'
import MusicPlayer from '@/src/components/MusicPlayer'
import { LinkBlockStyled } from '@/src/components/LinkStyled'
// import { ContactForm } from '@/src/components/form/ContactForm'
import { ContactForm } from '@/src/components/form/ContactForm'
import { PublicHeader } from '@/src/layouts/public/Header'
import { PublicFooter } from '@/src/layouts/public/Footer'
import Link from 'next/link'

const Banner = styled(Box)(() => ({
  background: theme.palette.primary.main,
  position: 'relative',
  height: 'calc(100vh - 224px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100vh - 20px)',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 'calc(100vh - 5px)',
  },
  '.bannerContainer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
    '.musicPlayer': {
      position: 'absolute',
      top: 90,
      right: 40,
      [theme.breakpoints.down('md')]: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        top: -60,
      },
      [theme.breakpoints.down('sm')]: {
        top: 0,
      },
    },
    '.titleBanner': {
      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
  },

  '.wrapperBtn': {
    '.btn-styled2': {
      textDecoration: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '220px',
      height: '40px',
      borderRadius: '10px',
      background: 'transparent',
      borderStyle: 'none',
      color: '#fff',
      fontWeight: 600,
      outline: 'none',
      cursor: 'pointer',
      position: 'relative',
      padding: '0px',
      overflow: 'hidden',
      transition: 'all 0.5s',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    },
    '.btn-styled2 span': { position: 'absolute', display: 'block' },
    '.btn-styled2 span:nth-child(1)': {
      height: '3px',
      width: '200px',
      top: '0px',
      left: '-200px',
      background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${theme.palette.backgroundGreen.green} )`,
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '20px',
      animation: 'span1 2s linear infinite',
      animationDelay: '1s',
    },
    '@keyframes span1': { '0%': { left: '-200px' }, '100%': { left: '200px' } },
    '.btn-styled2 span:nth-child(2)': {
      height: '70px',
      width: '3px',
      top: '-70px',
      right: '0px',
      background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${theme.palette.backgroundGreen.green} )`,
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      animation: 'span2 2s linear infinite',
      animationDelay: '2s',
    },
    '@keyframes span2': { '0%': { top: '-70px' }, '100%': { top: '70px' } },
    '.btn-styled2 span:nth-child(3)': {
      height: '3px',
      width: '200px',
      right: '-200px',
      bottom: '0px',
      background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${theme.palette.backgroundGreen.green} )`,
      borderTopLeftRadius: '20px',
      borderBottomLeftRadius: '20px',
      animation: 'span3 2s linear infinite',
      animationDelay: '3s',
    },
    '@keyframes span3': {
      '0%': { right: '-200px' },
      '100%': { right: '200px' },
    },
    '.btn-styled2 span:nth-child(4)': {
      height: '70px',
      width: '3px',
      bottom: '-70px',
      left: '0px',
      background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${theme.palette.backgroundGreen.green} )`,
      borderTopRightRadius: '20px',
      borderTopLeftRadius: '20px',
      animation: 'span4 2s linear infinite',
      animationDelay: '4s',
    },
    '@keyframes span4': {
      '0%': { bottom: '-70px' },
      '100%': { bottom: '70px' },
    },
    '.btn-styled2:hover': {
      transition: 'all .5s ease-out',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.4)',
    },
  },
}))

const Index: NextPage = () => {
  const [changeLang, setChangeLang] = useState(false)
  return (
    <>
      <PublicHeader sx={{ position: 'relative' }} changeLang={changeLang} />
      <Banner id='home'>
        <Container maxWidth={containerWidth}>
          <Box className='bannerContainer'>
            <MusicPlayer
              changeLang={changeLang}
              additionalClassName='musicPlayer'
            />
            <Box display={'flex'} gap={1} mb={2}>
              <IconButton
                sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                onClick={() => setChangeLang(false)}
              >
                <Typography variant='body2' color={theme.palette.text.primary}>
                  ES
                </Typography>
                <Image
                  src={'/images/venezuela.png'}
                  width={40}
                  height={40}
                  alt={'Spanish Icon'}
                />
              </IconButton>
              <IconButton
                sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                onClick={() => setChangeLang(true)}
              >
                <Typography variant='body2' color={theme.palette.text.primary}>
                  EN
                </Typography>
                <Image
                  src={'/images/united-states.png'}
                  width={40}
                  height={40}
                  alt={'English Icon'}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                },
              }}
              display={'flex'}
              alignItems={'center'}
              gap={2}
            >
              <Avatar
                sx={{ width: 56, height: 56 }}
                src={'/images/profile.webp'}
                alt='Victor'
              />

              <Box className='wrapperBtn'>
                <Link
                  className='btn btn-styled2'
                  href={
                    'https://www.linkedin.com/in/victor-qui%C3%B1ones-a41084249/'
                  }
                >
                  <Typography variant='body2' fontWeight={700}>
                    {changeLang === true
                      ? 'Avaliable for work'
                      : 'Disponible para trabajar'}
                  </Typography>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </Link>
              </Box>
            </Box>

            {changeLang === true ? (
              <>
                <Typography
                  fontWeight={800}
                  variant='h1'
                  color={theme.palette.text.primary}
                  className='titleBanner'
                >
                  Hey, I&apos;m Victor
                </Typography>
                <Typography
                  className='titleBanner'
                  color={theme.palette.text.primary}
                  variant='h5'
                >
                  <span style={{ color: theme.palette.text.secondary }}>
                    {' '}
                    Frontend Developer
                  </span>
                  , technology lover, with skills and experience in the
                  <span style={{ color: theme.palette.text.secondary }}>
                    {' '}
                    development of unique web applications.
                  </span>
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  fontWeight={800}
                  variant='h1'
                  color={theme.palette.text.primary}
                  className='titleBanner'
                >
                  Hey, soy Victor
                </Typography>
                <Typography
                  className='titleBanner'
                  color={theme.palette.text.primary}
                  variant='h5'
                >
                  <span style={{ color: theme.palette.text.secondary }}>
                    {' '}
                    Frontend Developer
                  </span>
                  , amante de la tecnología, con habilidades y experiencia en el
                  <span style={{ color: theme.palette.text.secondary }}>
                    {' '}
                    desarrollo de aplicaciones web únicas.
                  </span>
                </Typography>
              </>
            )}

            <Box display={'flex'} alignItems={'center'} gap={4} mt={2}>
              {changeLang === true ? (
                <LinkBlockStyled href={'./CV-Victor-Quinones-Frontend-en.pdf'}>
                  Resume
                </LinkBlockStyled>
              ) : (
                <LinkBlockStyled href={'./CV-Victor-Quinones-Frontend-es.pdf'}>
                  Curriculum
                </LinkBlockStyled>
              )}

              <LinkBlockStyled
                href={
                  'https://www.linkedin.com/in/victor-qui%C3%B1ones-a41084249/'
                }
              >
                LinkedIn
              </LinkBlockStyled>
            </Box>
          </Box>
        </Container>
      </Banner>
      <Divider />
      <Box
        id={'experience'}
        bgcolor={theme.palette.primary.main}
        padding={theme.spacing(5, 0)}
      >
        <Container maxWidth={containerWidth}>
          <Typography
            variant='h4'
            fontWeight={800}
            color={theme.palette.secondary.main}
          >
            {changeLang === true ? 'Experience' : 'Experiencia'}
          </Typography>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot sx={{ background: theme.palette.text.secondary }}>
                  <WorkOutline sx={{ color: theme.palette.common.black }} />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography
                  variant='h6'
                  color={theme.palette.text.secondary}
                  fontWeight={800}
                >
                  Coastal Insight Consulting
                </Typography>
                <Typography fontWeight={800}>
                  {changeLang === true
                    ? 'Junior Frontend Developer'
                    : 'Desarrollador Frontend Junior'}
                </Typography>
                <Typography variant='body2'>
                  {changeLang === true
                    ? 'March 2023 - Current...'
                    : ' Marzo 2023 - Actualmente...'}
                </Typography>
                <List>
                  {tasks.map((item: taskTypes, i: any) => (
                    <ListItem sx={{ paddingTop: 0 }} key={i}>
                      {changeLang === true ? (
                        <ListItemText>{item.english_description}</ListItemText>
                      ) : (
                        <ListItemText>{item.spanish_description}</ListItemText>
                      )}
                    </ListItem>
                  ))}
                </List>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Container>
      </Box>
      <ProjectCard changeLang={changeLang} />
      <Divider />
      <Box
        bgcolor={theme.palette.primary.main}
        padding={theme.spacing(10, 0)}
        id={'about-me'}
      >
        <Container maxWidth={containerWidth}>
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Typography
              variant='h4'
              fontWeight={800}
              color={theme.palette.secondary.main}
            >
              {changeLang === true ? 'About me' : ' Sobre mí'}
            </Typography>
            {changeLang === true ? (
              <>
                <Typography variant='body1'>
                  Front-end Developer based in Venezuela who{' '}
                  <span style={{ color: theme.palette.text.secondary }}>
                    loves to learn new things, work with particular startups and
                    collaborate with talented people around the world
                  </span>{' '}
                  building websites and applications with a wide range of
                  technologies.
                </Typography>
                <Typography variant='body1'>
                  <span style={{ color: theme.palette.text.secondary }}>
                    My main goal is to improve, learn more every day
                  </span>{' '}
                  and be able to help new entrepreneurs and small businesses to
                  reach bigger markets and build web presence using the latest
                  and most demanding development trends.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant='body1'>
                  Desarrollador Front-end ubicado en Venezuela a quien le{' '}
                  <span style={{ color: theme.palette.text.secondary }}>
                    encanta aprender cosas nuevas, trabajar con particulares
                    startups y colaborar con gente talentosa alrededor del mundo
                  </span>{' '}
                  construyendo sitios web y aplicaciones con una amplia gama de
                  tecnologías.
                </Typography>
                <Typography variant='body1'>
                  <span style={{ color: theme.palette.text.secondary }}>
                    Mi principal objetivo es mejorar, aprender más cada día
                  </span>{' '}
                  y ser capaz de ayudar a nuevos emprendedores y pequeñas
                  empresas a alcanzar mercados más grandes y construir presencia
                  web utilizando las últimas y más exigentes tendencias de
                  desarrollo.
                </Typography>
              </>
            )}
          </Box>
        </Container>
      </Box>
      <ContactForm changeLang={changeLang} />
      {/* <ContactUs /> */}
      <PublicFooter changeLang={changeLang} />
    </>
  )
}

export default Index
