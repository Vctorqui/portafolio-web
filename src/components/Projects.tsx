import { OpenInNew } from '@mui/icons-material'
import { Card } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import {
  db,
  doc,
  getDoc,
  updateDoc,
  increment,
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
    <section className='project-section'>
      <Card className='p-4 hover:bg-slate-800 transition-colors cursor-pointer bg-black'>
        <div className='flex gap-3'>
          <Avatar>
            <Image
              src='/images/profile.webp'
              alt='Victor Quiñones Profile Picture'
              width={48}
              height={48}
              className='rounded-full object-cover'
            />
          </Avatar>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold'>Victor Q</span>
              <span className='text-muted-foreground'>@victorqui</span>
              <span className='text-muted-foreground'>·</span>
              {/* <span className='text-muted-foreground'>{date}</span> */}
            </div>
            <p className='mt-2 font-bold'>{project.title}</p>
            <p className='mt-2 text-left'>{project.english_description}</p>
            <p className='mt-2 font-semibold'>Stack: #{project.stack}</p>
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
                <button
                  disabled
                  className='flex items-center gap-2 disabled:opacity-30'
                >
                  <MessageCircle className='w-4 h-4' />
                  <span>0</span>
                </button>
              </LightTooltip>
              <>
                <ShareBtn
                  insert={project.preview_link}
                  classTailwind={'flex items-center gap-2 '}
                  content={'¡Mira%20este%20proyecto%21%20'}
                />
              </>
              <LightTooltip title='Like post'>
                <button
                  className={`flex items-center gap-2 transition-colors ${
                    hasLiked ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                  onClick={handleLike}
                >
                  <Heart
                    className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`}
                  />
                  <span>{likes}</span>
                </button>
              </LightTooltip>
              {project.preview_link ? (
                <LightTooltip title={'Go to the web'}>
                  <Link
                    style={{ fontSize: 'small' }}
                    rel='noopener noreferrer'
                    href={project.preview_link}
                    className='flex items-center gap-2 hover:text-blue-400 transition-colors'
                  >
                    <OpenInNew fontSize='small' />
                  </Link>
                </LightTooltip>
              ) : (
                <LightTooltip title={'Not available for now'}>
                  <button
                    disabled
                    className='flex items-center gap-2 disabled:opacity-30'
                  >
                    <OpenInNew fontSize='small' />
                  </button>
                </LightTooltip>
              )}
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
