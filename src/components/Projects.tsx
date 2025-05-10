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
import { motion } from 'framer-motion'

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
  const [isUpdating, setIsUpdating] = useState(false)

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
    if (isUpdating) return

    setIsUpdating(true)
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
          setLikes((prevLikes: number) => Math.max(prevLikes - 1, 0))
          setHasLiked(false)
        } else {
          await updateDoc(docRef, {
            likes: data.likes + 1,
            usersWhoLiked: arrayUnion(userId),
          })
          setLikes((prevLikes: number) => prevLikes + 1)
          setHasLiked(true)
        }
      }
    } catch (error) {
      console.error('Error updating like:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='py-4 px-4 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 relative'>
        {project.isPinned && (
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 30 }}
            transition={{ duration: 0.5 }}
            className='absolute right-3'
          >
            <Box
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              gap={1}
              mb={2}
            >
              <PushPin sx={{ color: '#EF5A6F' }} fontSize='small' />
            </Box>
          </motion.div>
        )}
        <div className='flex gap-3'>
          <Avatar
            alt='Victor Quiñones Profile Picture'
            className='rounded-full object-cover border-2 border-white/10 hover:border-[#EF5A6F] transition-colors duration-300'
            src={'/images/perfil_profile.webp'}
            sx={{ width: 48, height: 48 }}
          />
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold text-white'>Victor Q</span>
              <span className='text-gray-400'>@victorqui</span>
            </div>
            <Box
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              className='mt-1'
            >
              <Box className='bg-slate-700/50 rounded-full px-3 py-1 flex justify-center'>
                <Typography variant='body2' fontWeight={700} className='text-[#EF5A6F]'>
                  👨🏻‍💻 {project.status}
                </Typography>
              </Box>
            </Box>
            <p className='mt-3 font-bold whitespace-pre-line text-[#EF5A6F] text-lg'>
              {project.title}
            </p>
            <p className='mt-3 whitespace-pre-line text-gray-300 leading-relaxed'>
              {project.english_description}
            </p>
            <p className='mt-3 font-semibold text-gray-400'>
              Stack: <span className='text-white'>{project.stack}</span>
            </p>
            {project.image && (
              <div className='mt-4 rounded-xl overflow-hidden'>
                <Image
                  src={project.image}
                  alt={`Picture of ${project.title} project`}
                  width={500}
                  height={280}
                  className='w-full object-cover hover:scale-105 transition-transform duration-500'
                />
              </div>
            )}
            <div className='flex items-center gap-6 mt-4 text-muted-foreground'>
              <LightTooltip title='Comments coming soon'>
                <span className='flex items-center gap-1'>
                  <button
                    disabled
                    aria-label='comments not available for now'
                    className='hover:text-[#EF5A6F] transition-colors duration-300 disabled:opacity-30'
                  >
                    <MessageCircle className='w-4 h-4' />
                  </button>
                </span>
              </LightTooltip>

              {project.preview_link && (
                <div className='flex items-center gap-4'>
                  <ShareBtn
                    insert={project.preview_link}
                    classTailwind={'flex items-center gap-1 hover:text-[#EF5A6F] transition-colors duration-300'}
                    content={'Check%20out%20this%20project%21%20'}
                  />
                  <LightTooltip title='View project'>
                    <span className='flex items-center gap-1'>
                      <Link
                        aria-label='Go to project website'
                        style={{ fontSize: 'small' }}
                        rel='noopener noreferrer'
                        href={project.preview_link}
                        className='hover:text-[#EF5A6F] transition-colors duration-300'
                      >
                        <OpenInNew fontSize='small' />
                      </Link>
                    </span>
                  </LightTooltip>
                </div>
              )}

              <LightTooltip title={hasLiked ? 'Unlike project' : 'Like project'}>
                <span className='flex items-center gap-1'>
                  <button
                    className={`flex items-center gap-1 transition-colors ${
                      hasLiked ? 'text-[#EF5A6F]' : 'hover:text-[#EF5A6F]'
                    }`}
                    aria-label={hasLiked ? 'Click to unlike project' : 'Click to like project'}
                    onClick={handleLike}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                    <span className='text-sm'>{likes}</span>
                  </button>
                </span>
              </LightTooltip>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
