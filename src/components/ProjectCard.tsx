/* eslint-disable @next/next/no-img-element */
import {
  Close,
  Favorite,
  FavoriteBorder,
  Visibility,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Divider,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  styled,
} from '@mui/material'
import { useEffect, useState } from 'react'
import theme from '@/theme/theme'
import {
  db,
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from '@/src/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import CustomDialog from './CustomDialog'

const CardStyled = styled(Card)(() => ({
  border: `1px solid ${theme.palette.primary.light}`,
  position: 'relative',
  borderRadius: '10px',
  '.containerImg': {
    position: 'relative',
    overflow: 'hidden',
    '&:hover .imgProject': {
      transition: 'all 0.35s ease-out',
      transform: 'scale(1.05)',
    },
  },
}))

export async function getServerSideProps() {
  const projectsCollection = collection(db, 'projects')
  const projectSnapshot = await getDocs(projectsCollection)
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

export const ProjectCard = ({ changeLang, project }: any) => {
  const [likes, setLikes] = useState(project.likes || 0)
  const [hasLiked, setHasLiked] = useState(false)
  const [projectOpen, setProjectOpen] = useState(false)

  const handleDrawerToggle = () => {
    setProjectOpen((prevState) => !prevState)
  }

  const getUserId = () => {
    const storedId = localStorage.getItem('userId')
    if (storedId) {
      return storedId
    } else {
      const newId = 'user_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('userId', newId)
      return newId
    }
  }

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const docRef = doc(db, 'projects', project.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setLikes(data.likes || 0)
          const userLikes = data.usersWhoLiked || []
          const userId = getUserId() // Obtén el ID del usuario de alguna manera
          setHasLiked(userLikes.includes(userId))
        }
      } catch (error) {
        console.error('Error fetching likes:', error)
      }
    }

    fetchLikes()
  }, [project.id])

  const handleLike = async () => {
    const docRef = doc(db, 'projects', project.id)
    const userId = getUserId() // Obtén el ID del usuario de alguna manera

    try {
      if (hasLiked) {
        await updateDoc(docRef, {
          likes: increment(-1),
          usersWhoLiked: arrayRemove(userId),
        })
      } else {
        await updateDoc(docRef, {
          likes: increment(1),
          usersWhoLiked: arrayUnion(userId),
        })
      }

      // Después de la actualización, obtén los datos más recientes
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setLikes(data.likes || 0)
        const userLikes = data.usersWhoLiked || []
        setHasLiked(userLikes.includes(userId))
      }
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  return (
    <>
      <Box id={'projects'}>
        <CardStyled>
          <Box
            onClick={handleDrawerToggle}
            className='containerImg'
            sx={{ maxHeight: '200px' }}
          >
            <img
              className='imgProject'
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '200px',
              }}
              src={project.image}
              alt={project.title}
            />
          </Box>
          <CardContent
            sx={{ background: theme.palette.primary.main, paddingBottom: 0 }}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography
                // mt={2}
                fontWeight={700}
                variant='h6'
                color={theme.palette.text.secondary}
              >
                {project.title}
              </Typography>
              <IconButton className='likeBtn' onClick={handleLike}>
                {hasLiked ? (
                  <Favorite fontSize='medium' sx={{ color: '#A02334' }} />
                ) : (
                  <FavoriteBorder fontSize='medium' sx={{ color: '#A02334' }} />
                )}
                <Typography
                  color={theme.palette.common.white}
                  variant='caption'
                >
                  {likes}
                </Typography>
              </IconButton>
            </Box>
            <Button onClick={handleDrawerToggle} variant='outlined'>
              {changeLang === true ? 'View more' : 'Ver más'}
            </Button>
          </CardContent>
        </CardStyled>
      </Box>
      <CustomDialog fullMobile open={projectOpen} onClose={handleDrawerToggle}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Stack spacing={2} padding={5}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography
                // mt={2}
                fontWeight={700}
                variant='h6'
                color={theme.palette.text.secondary}
              >
                {project.title}
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
                <Typography
                  color={theme.palette.common.white}
                  variant='caption'
                >
                  {likes}
                </Typography>
                <Favorite fontSize='medium' sx={{ color: '#A02334' }} />
              </Box>
            </Box>

            <Typography variant='body2' color={theme.palette.common.white}>
              {changeLang === true
                ? project.english_description
                : project.spanish_description}
            </Typography>
            <Typography
              mt={2}
              variant='caption'
              color={theme.palette.text.secondary}
            >
              Stack: {project.stack}
            </Typography>
            {project.preview_link === '' ? (
              <Box
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Button disabled variant='contained'>
                  <Typography
                    color={theme.palette.secondary.main}
                    variant='body2'
                  >
                    {changeLang === true ? 'Coming soon...' : 'Muy pronto...'}
                  </Typography>
                </Button>
              </Box>
            ) : (
              <Link
                href={project.preview_link}
                sx={{ color: '#eeee' }}
                className='showBtn'
              >
                <Typography variant='body2'>
                  {changeLang === true
                    ? 'Visit the site'
                    : 'Visita el sitio web'}
                </Typography>
              </Link>
            )}
          </Stack>
        </Box>
      </CustomDialog>
    </>
  )
}
