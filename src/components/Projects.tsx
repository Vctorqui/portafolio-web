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

      <Card className='py-3 px-4 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 relative w-full max-w-full'>
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
              mb={1}
            >
              <PushPin sx={{ color: '#EF5A6F' }} fontSize='small' />
            </Box>
          </motion.div>
        )}
        <div className='flex gap-3 w-full'>
          <Avatar
            alt='Victor Quiñones Profile Picture'
            className='rounded-full object-cover border-2 border-white/10 hover:border-[#EF5A6F] transition-colors duration-300 flex-shrink-0'
            src={'/images/perfil_profile.webp'}
            sx={{ width: 40, height: 40 }}
          />
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold text-white'>Victor Q</span>
              <span className='text-gray-400'>@victorqui</span>
            </div>
            <Box
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              className='mt-0.5'
            >
              <Box className='bg-slate-700/50 rounded-full px-2 py-0.5 flex justify-center'>
                <Typography variant='body2' fontWeight={700} className='text-[#EF5A6F] text-sm'>
                  👨🏻‍💻 {project.status}
                </Typography>
              </Box>
            </Box>
            <p className='mt-2 font-bold whitespace-pre-line text-[#EF5A6F] text-base break-words'>
              {project.title}
            </p>
            {/* <p className='mt-3 whitespace-pre-line text-gray-300 leading-relaxed break-words'>
              {project.english_description}
            </p> */}
            <p className='mt-2 font-semibold text-gray-400 break-words text-sm'>
              Stack: <span className='text-white'>{project.stack}</span>
            </p>
            {project.image && (
              <div className='mt-3 rounded-xl overflow-hidden w-full'>
                <Image
                  src={project.image}
                  alt={`Picture of ${project.title} project`}
                  width={500}
                  height={280}
                  className='w-full object-cover hover:scale-105 transition-transform duration-500'
                />
              </div>
            )}
            <div className='flex items-center gap-6 mt-3 text-muted-foreground w-full'>
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
                <motion.span 
                  className='flex items-center gap-1'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    className={`flex items-center gap-1 transition-colors ${
                      hasLiked ? 'text-[#EF5A6F]' : 'hover:text-[#EF5A6F]'
                    }`}
                    aria-label={hasLiked ? 'Click to unlike project' : 'Click to like project'}
                    onClick={handleLike}
                  >
                    <motion.div
                      animate={{
                        scale: hasLiked ? [1, 1.2, 1] : 1,
                        rotate: hasLiked ? [0, -10, 10, -10, 0] : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        times: [0, 0.2, 0.4, 0.6, 1],
                        ease: "easeInOut"
                      }}
                    >
                      <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                    </motion.div>
                    <motion.span 
                      className='text-sm'
                      animate={{
                        scale: hasLiked ? [1, 1.2, 1] : 1,
                        y: hasLiked ? [0, -2, 0] : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        times: [0, 0.2, 1],
                        ease: "easeInOut"
                      }}
                    >
                      {likes}
                    </motion.span>
                  </button>
                </motion.span>
              </LightTooltip>
            </div>
          </div>
        </div>
      </Card>
  )
}
