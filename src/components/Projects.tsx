import { OpenInNew, PushPin } from '@mui/icons-material'
import { Box, Card, Typography } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import {
  db,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from '@/src/firebase/config'
import { useEffect, useState } from 'react'
import { ShareBtn } from './ShareBtn'
import { Avatar } from '@mui/material'
import { Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { LightTooltip } from './LightToolTip'

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

export const Projects = ({ project }: any) => {
  const [likes, setLikes] = useState(project.likes || 0)
  const [hasLiked, setHasLiked] = useState(false)

  const getUserId = () => {
    const storedId = localStorage.getItem('userId')
    if (storedId) {
      return storedId
    } else {
      const newId = 'user_' + Math.random().toString(36).slice(2, 9)
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
          const userId = getUserId()
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
    const userId = getUserId()

    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        const userLikes = data.usersWhoLiked || []

        if (userLikes.includes(userId)) {
          await updateDoc(docRef, {
            likes: data.likes - 1,
            usersWhoLiked: arrayRemove(userId),
          })
          setLikes(likes - 1)
          setHasLiked(false)
        } else {
          await updateDoc(docRef, {
            likes: data.likes + 1,
            usersWhoLiked: arrayUnion(userId),
          })
          setLikes(likes + 1)
          setHasLiked(true)
        }
      }
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  return (
    <Card className='p-4 mt-2 hover:bg-slate-800 transition-colors cursor-pointer bg-slate-900 border-x border-y  border-gray-800 relative'>
      {project.isPinned && (
        <Box
          sx={{ rotate: '30deg' }}
          className='absolute right-3'
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          gap={1}
          mb={2}
        >
          <PushPin sx={{ color: '#EF5A6F' }} fontSize='small' />
        </Box>
      )}
      <div className='flex gap-3'>
        <Avatar
          alt='Victor Quiñones Profile Picture'
          className='rounded-full object-cover'
          src={'/images/profile-perfil.webp'}
          sx={{ width: 48, height: 48 }}
        />
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <span className='font-semibold'>Victor Q</span>
            <span className='text-muted-foreground'>@victorqui</span>
            <span className='text-muted-foreground'>·</span>
          </div>
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
          >
            <Box className='bg-slate-700 rounded-full px-2  flex justify-center'>
              <Typography variant='body2' fontWeight={700}>
                👨🏻‍💻{project.status}
              </Typography>
            </Box>
          </Box>
          <p className='mt-2 font-bold whitespace-pre-line  text-[#EF5A6F]'>
            {project.title}
          </p>
          <p className='mt-2 text-left'>{project.english_description}</p>
          <p className='mt-2 font-bold'>Stack: {project.stack}</p>
          {Image && (
            <div className='mt-3 rounded-lg overflow-hidden'>
              <Image
                src={project.image}
                alt={`Picture of ${project.title} project`}
                width={500}
                height={280}
                className='w-full object-cover'
              />
            </div>
          )}
          <div className='flex justify-between mt-3 text-muted-foreground'>
            <LightTooltip title='Not available for now'>
              <span className='flex items-center gap-2 '>
                <button
                  disabled
                  className='flex items-center gap-2 disabled:opacity-30'
                  aria-label='commets not available for now'
                >
                  <MessageCircle className='w-4 h-4' />
                  <span>0</span>
                </button>
              </span>
            </LightTooltip>
            <>
              <ShareBtn
                insert={project.preview_link}
                classTailwind={'flex items-center gap-2 '}
                content={'¡Mira%20este%20proyecto%21%20'}
              />
            </>
            <LightTooltip title='Like post'>
              <span className='flex items-center gap-2 '>
                <button
                  className={`flex items-center gap-2 transition-colors ${
                    hasLiked ? 'text-[#EF5A6F]' : 'hover:text-[#EF5A6F]'
                  }`}
                  aria-label={
                    hasLiked
                      ? 'click to dislike post'
                      : 'click to like the project'
                  }
                  onClick={handleLike}
                >
                  <Heart
                    className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`}
                  />
                  <span>{likes}</span>
                </button>
              </span>
            </LightTooltip>
            {project.preview_link ? (
              <LightTooltip title={'Click to see the project'}>
                <span className='flex items-center gap-2 '>
                  <Link
                    style={{ fontSize: 'small' }}
                    rel='noopener noreferrer'
                    aria-label='click to go to the project web'
                    href={project.preview_link}
                    className='flex items-center gap-2 hover:text-blue-400 transition-colors'
                  >
                    <OpenInNew fontSize='small' />
                  </Link>
                </span>
              </LightTooltip>
            ) : (
              <LightTooltip title={'Not available for now'}>
                <span className='flex items-center gap-2 '>
                  <button
                    aria-label='project web not available for now'
                    disabled
                    className='flex items-center gap-2 disabled:opacity-30'
                  >
                    <OpenInNew fontSize='small' />
                  </button>
                </span>
              </LightTooltip>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
