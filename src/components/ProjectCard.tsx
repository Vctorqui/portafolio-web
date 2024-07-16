import { Add, Remove, Star, Visibility } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { projectsTypes } from '../types/types'
import { containerWidth, projects } from '../utils/const'
import { useState } from 'react'
import theme from '@/theme/theme'
import Image from 'next/image'

const CardProjects = styled(Box)(() => ({
  background: '#222831',
  padding: '40px 0',
  '.linkCard': {
    textDecoration: 'none',
    color: '#EEE',
    '.cardStyled': {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      position: 'relative',
      border: '1px solid #EEE',
      borderRadius: '5px',
      padding: '30px 20px',
      height: '270px',
      transition: 'all .3s ease-out',
      [theme.breakpoints.down('lg')]: {
        height: '350px',
      },
      [theme.breakpoints.down('md')]: {
        height: '280px',
      },
      // [theme.breakpoints.down('sm')]: {
      //   height: '260px',
      // },
      '.cardImg': {
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    },
    ':hover .cardStyled': {
      transform: 'scale(1.04)',
    },
  },
  '.extendBtn': {
    background: '#d6e6e7',
    ':hover': {
      background: '#76ABAE',
    },
  },
}))

export const ProjectCard = () => {
  const [showMore, setShowMore] = useState(false)

  return (
    <CardProjects id={'projects'}>
      <Container maxWidth={containerWidth}>
        <Typography
          mb={2}
          variant='h4'
          fontWeight={800}
          sx={{ color: '#d6e6e7' }}
          // color={theme.palette.text.secondary}
        >
          Proyectos
        </Typography>
        <Grid container spacing={4}>
          {projects.map((item: projectsTypes, i: any) => {
            const MyIcon =
              item.languages.html.icon &&
              item.languages.css.icon &&
              item.languages.javascript.icon &&
              item.languages.sass.icon &&
              item.languages.bootstrap.icon &&
              item.languages.typescript.icon &&
              item.languages.react.icon &&
              item.languages.nextjs.icon &&
              item.languages.mui.icon
                ? item.languages.html.icon &&
                  item.languages.css.icon &&
                  item.languages.javascript.icon &&
                  item.languages.sass.icon &&
                  item.languages.bootstrap.icon &&
                  item.languages.typescript.icon &&
                  item.languages.react.icon &&
                  item.languages.nextjs.icon &&
                  item.languages.mui.icon
                : Star
            if (!showMore && i >= 4) {
              return null
            }
            return (
              <Grid key={i} item xl={6} md={6} xs={12}>
                <Link className='linkCard' href={item.preview_link}>
                  <Box className='cardStyled'>
                    <Box display={'flex'} alignItems={'center'} gap={2}>
                      <Stack spacing={2}>
                        <Typography
                          variant='h6'
                          fontWeight={800}
                          color={theme.palette.text.secondary}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant='body2'>
                          {item.description}
                        </Typography>
                      </Stack>
                      <Image
                        className='cardImg'
                        src={item.image}
                        width={220}
                        height={200}
                        style={{ maxWidth: '100%', height: 'auto' }}
                        alt={item.title}
                      />
                    </Box>

                    <Box
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      gap={'5px'}
                      flexWrap={'wrap'}
                    >
                      <Typography variant='body2'>Stack:</Typography>
                      {item.languages.html.text && (
                        <Typography variant='body2'>
                          {item.languages.html.text},
                        </Typography>
                      )}
                      {item.languages.css.text && (
                        <Typography variant='body2'>
                          {item.languages.css.text},
                        </Typography>
                      )}
                      {item.languages.javascript.text && (
                        <Typography variant='body2'>
                          {item.languages.javascript.text},
                        </Typography>
                      )}
                      {item.languages.sass.text && (
                        <Typography variant='body2'>
                          {item.languages.sass.text},
                        </Typography>
                      )}
                      {item.languages.bootstrap.text && (
                        <Typography variant='body2'>
                          {item.languages.bootstrap.text},
                        </Typography>
                      )}
                      {item.languages.typescript.text && (
                        <Typography variant='body2'>
                          {item.languages.typescript.text},
                        </Typography>
                      )}
                      {item.languages.react.text && (
                        <Typography variant='body2'>
                          {item.languages.react.text},
                        </Typography>
                      )}

                      {item.languages.nextjs.text && (
                        <Typography variant='body2'>
                          {item.languages.nextjs.text},
                        </Typography>
                      )}
                      {item.languages.mui.text && (
                        <Typography variant='body2'>
                          {item.languages.mui.text},
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Button
                        sx={{
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                        variant='outlined'
                      >
                        <Visibility fontSize='small' />
                        Ver
                      </Button>
                    </Box>
                  </Box>
                </Link>
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
    </CardProjects>
  )
}
