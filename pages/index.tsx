import React, { useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { containerWidth, experiences } from '@/src/utils/const'
import theme from '@/theme/theme'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import Timeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import { Add, Remove, WorkOutline } from '@mui/icons-material'
import { TimelineDot } from '@mui/lab'
import { experienceTypes } from '@/src/types/types'
import { ProjectCard } from '@/src/components/ProjectCard'
import MusicPlayer from '@/src/components/MusicPlayer'
import { LinkBlockStyled } from '@/src/components/LinkStyled'
import { ContactForm } from '@/src/components/form/ContactForm'
import { PublicHeader } from '@/src/layouts/public/Header'
import { PublicFooter } from '@/src/layouts/public/Footer'
import Link from 'next/link'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/src/firebase/config'

const Banner = styled(Box)(() => ({
  background: theme.palette.primary.main,
  position: 'relative',
  height: 'calc(100vh - 100px)',
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
      alignSelf: 'flex-end',

      [theme.breakpoints.down('md')]: {
        alignSelf: 'center',
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
    height: '40px',
    width: '220px',
    backgroundColor: 'transparent',
    borderRadius: '20px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all .3s ease-out',

    '.linkBtn': {
      textDecoration: 'none',
    },
  },
  '.wrapperBtn::before': {
    content: '""',
    position: 'absolute',
    height: '250px',
    width: '300px',
    backgroundImage: `conic-gradient(${theme.palette.backgroundGreen.green} 20deg, transparent 120deg)`,
    animation: 'rotar 3s linear infinite',
  },
  '@keyframes rotar': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(-360deg)' },
  },
  '.wrapperBtn::after': {
    content: '""',
    position: 'absolute',
    height: '30px',
    width: '210px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '20px',
  },

  '.wrapperBtn:hover': {
    backgroundColor: theme.palette.backgroundGreen.green,
    boxShadow: 'inset 16px 14px 20px #0000008c',
  },
}))

const ProyectContainer = styled(Box)(() => ({
  background: theme.palette.primary.main,
  paddingBottom: theme.spacing(4),
  paddingTop: theme.spacing(2),
  '.extendBtn': {
    background: theme.palette.secondary.main,
    ':hover': {
      background: theme.palette.backgroundGreen.green,
    },
  },
}))

export async function getServerSideProps() {
  const projectsCollection = collection(db, 'projects')
  const q = query(projectsCollection, orderBy('order', 'asc')) // Ordenar por el campo 'order'
  const projectSnapshot = await getDocs(q)
  const projects = projectSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return {
    props: {
      projects,
    },
  }
}

const Index: NextPage = ({ projects }: any) => {
  const [changeLang, setChangeLang] = useState(false)
  const [showMore, setShowMore] = useState(false)

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
              <Link
                className='linkBtn'
                href={'https://www.linkedin.com/in/victorqui/'}
              >
                <Box className='wrapperBtn'>
                  <Box position={'absolute'} zIndex={10}>
                    <Typography
                      variant='body2'
                      color={theme.palette.common.white}
                      fontWeight={700}
                    >
                      {changeLang === true
                        ? 'Avaliable for work'
                        : 'Disponible para trabajar'}
                    </Typography>
                  </Box>
                </Box>
              </Link>
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
                <LinkBlockStyled href={'./CV-Victor-Quinones-Frontend-en.pdf'}>
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
              <LinkBlockStyled href={'/test'}>New portfolio</LinkBlockStyled>
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
            {experiences.map((item: experienceTypes, i: number) => (
              <TimelineItem key={i}>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot
                    sx={{ background: theme.palette.text.secondary }}
                  >
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
                    {item.company}
                  </Typography>
                  <Typography fontWeight={800}>{item.position}</Typography>
                  <Typography variant='body2'>
                    {changeLang === true
                      ? item.english_date
                      : item.spanish_date}
                  </Typography>
                  <List>
                    <ListItem sx={{ paddingTop: 0 }} key={i}>
                      {changeLang === true ? (
                        <ListItemText>{`- ${item.english_description}`}</ListItemText>
                      ) : (
                        <ListItemText>{`- ${item.spanish_description}`}</ListItemText>
                      )}
                    </ListItem>
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      gap={2}
                      flexWrap={'wrap'}
                      sx={{
                        [theme.breakpoints.down('sm')]: {
                          display: 'none',
                        },
                      }}
                    >
                      {item.stacks.map((stack: any) => (
                        <Button key={i} variant='contained'>
                          {stack}
                        </Button>
                      ))}
                    </Box>
                  </List>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Box>
      <ProyectContainer>
        <Container maxWidth={containerWidth}>
          <Typography
            mb={2}
            variant='h4'
            fontWeight={800}
            color={theme.palette.secondary.main}
          >
            {changeLang ? 'Projects' : 'Proyectos'}
          </Typography>
          <Grid container spacing={4}>
            {projects.map((project: any, i: any) => {
              if (!showMore && i >= 6) {
                return null
              }
              return (
                <Grid key={i} item lg={4} md={4} sm={6} xs={12}>
                  <ProjectCard project={project} changeLang={changeLang} />
                </Grid>
              )
            })}
          </Grid>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={4}
          >
            <IconButton
              aria-label='click to extend button'
              className='extendBtn'
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? (
                <Remove className='extendIcon' />
              ) : (
                <Add className='extendIcon' />
              )}
            </IconButton>
          </Box>
        </Container>
      </ProyectContainer>
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
            <Box
              sx={{
                [theme.breakpoints.down('md')]: {
                  flexDirection: 'column',
                },
              }}
              display={'flex'}
              alignItems={'center'}
              gap={4}
            >
              <Stack>
                {changeLang === true ? (
                  <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Typography variant='body1'>
                      Hi!{' '}
                      <span style={{ color: theme.palette.text.secondary }}>
                        I&apos;m Victor Quiñones, a passionate Front-end
                        Developer based in Venezuela.
                      </span>{' '}
                      Throughout my career, I have had the opportunity to
                      participate in more than{' '}
                      <span style={{ color: theme.palette.text.secondary }}>
                        8 projects with different clients
                      </span>
                      , where I have designed and implemented attractive and
                      functional interfaces. My focus is on creating intuitive
                      and accessible user experiences.
                    </Typography>
                    <Typography
                      variant='h6'
                      fontWeight={700}
                      color={theme.palette.text.secondary}
                    >
                      But what&apos;s beyond the code?
                    </Typography>

                    <Typography variant='body1'>
                      Let me share with you some personal details:
                    </Typography>
                    <Typography>
                      Besides coding,
                      <span style={{ color: theme.palette.text.secondary }}>
                        {' '}
                        I love playing video games, watching anime, learning
                        about the latest technology trends and creating
                        resources for other frontend developers.
                      </span>
                    </Typography>
                    <Typography>
                      My main goal is to keep improving, and be able to help new
                      entrepreneurs, small companies and big startups to reach
                      bigger markets.
                    </Typography>
                    <Typography fontWeight={700}>
                      Reach out and say &quot;Hey!&quot;. I look forward to
                      hearing from you!
                    </Typography>
                  </Box>
                ) : (
                  <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Typography variant='h4'>Hey!</Typography>
                    <Typography variant='body1'>
                      <span style={{ color: theme.palette.text.secondary }}>
                        Soy Victor Quiñones, apasionado Desarrollador Front-end
                        residente en Venezuela.
                      </span>{' '}
                      A lo largo de mi carrera, he tenido la oportunidad de
                      participar en más de{'  '}
                      <span style={{ color: theme.palette.text.secondary }}>
                        8 proyectos con diferentes cliente
                      </span>
                      , en los que he diseñado e implementado interfaces
                      atractivas y funcionales. Me centro en crear experiencias
                      de usuario intuitivas y accesibles.
                    </Typography>
                    <Typography
                      variant='h6'
                      fontWeight={700}
                      color={theme.palette.text.secondary}
                    >
                      Pero, ¿qué hay más allá del código?
                    </Typography>
                    <Typography variant='body1'>
                      Permiteme compartir algunos detalles personales:
                    </Typography>
                    <Typography>
                      Además de programar,
                      <span style={{ color: theme.palette.text.secondary }}>
                        {' '}
                        me encanta jugar a videojuegos, ver anime, aprender
                        sobre las últimas tendencias tecnológicas y crear
                        recursos para otros desarrolladores front-end.
                      </span>
                    </Typography>
                    <Typography>
                      Mi principal objetivo es seguir mejorando, y poder ayudar
                      a nuevos emprendedores, pequeñas empresas y grandes
                      startups a alcanzar mercados más grandes.
                    </Typography>
                    <Typography fontWeight={700}>
                      Si quieres saludarme, di &quot;¡Hola!👋🏻&quot;
                    </Typography>
                  </Box>
                )}
              </Stack>
              <Image
                src={'/images/avatar.png'}
                width={250}
                height={200}
                alt='avatar'
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <ContactForm changeLang={changeLang} />
      <PublicFooter changeLang={changeLang} />
    </>
  )
}

export default Index
