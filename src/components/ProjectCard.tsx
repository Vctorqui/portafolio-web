/* eslint-disable @next/next/no-img-element */
import { Favorite, FavoriteBorder, Visibility } from '@mui/icons-material'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Link,
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

const CardStyled = styled(Card)(() => ({
  border: `1px solid ${theme.palette.primary.light}`,
  position: 'relative',
  borderRadius: '10px',
  '.showBtn': {
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '5px 10px',
    background: 'transparent',
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.backgroundGreen.green}`,
    borderRadius: '5px',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  '.showBtn:hover': { color: theme.palette.text.primary },
  '.showBtn::after': {
    content: '""',
    background: theme.palette.backgroundGreen.green,
    position: 'absolute',
    zIndex: -1,
    padding: '16px 20px',
    display: 'block',
    left: '0',
    right: '0',
    top: '-200%',
    bottom: '100%',
    WebkitTransition: 'all 0.35s ease-out',
    transition: 'all 0.35s ease-out',
  },
  '.showBtn:hover::after': {
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    WebkitTransition: 'all 0.35s ease-out',
    transition: 'all 0.35s ease-out',
  },

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
    <Box id={'projects'}>
      <CardStyled>
        <Box className='containerImg' sx={{ maxHeight: '200px' }}>
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
        <CardContent sx={{ background: theme.palette.primary.main }}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography
              // mt={2}
              fontWeight={700}
              gutterBottom
              variant='h6'
              component='div'
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
              <Typography color={theme.palette.common.white} variant='caption'>
                {likes}
              </Typography>
            </IconButton>
          </Box>
          <Typography variant='body2'>
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
          {/* <IconButton className='likeBtn' onClick={handleLike}>
            {hasLiked ? (
              <Favorite fontSize='medium' sx={{ color: '#A02334' }} />
            ) : (
              <FavoriteBorder fontSize='medium' sx={{ color: '#A02334' }} />
            )}
            <Typography color={theme.palette.common.white} variant='caption'>
              {likes}
            </Typography>
          </IconButton> */}
        </CardContent>
        <Divider sx={{ background: theme.palette.primary.light }} />
        <CardActions sx={{ background: theme.palette.primary.main }}>
          <Link href={project.preview_link} className='showBtn'>
            <Visibility fontSize='small' />
            <Typography variant='body2'>
              {changeLang === true ? 'View' : 'Ver'}
            </Typography>
          </Link>
        </CardActions>
      </CardStyled>
    </Box>
  )
}
