import {
  db,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from '@/src/firebase/config'
import { useEffect, useState, useCallback } from 'react'
import { Tweet } from './shared/Tweet'

type Language = 'es' | 'en'

export const Projects = ({
  project,
  language,
}: {
  project: any
  language: Language
}) => {
  const [likes, setLikes] = useState(project.likes || 0)
  const [hasLiked, setHasLiked] = useState(false)
  const [userId, setUserId] = useState<string>('')

  const labels = {
    shareMsg:
      language === 'es' ? '¡Mira este proyecto!' : 'Check out this project!',
    status: language === 'es' ? 'ESTADO: ACTIVO' : 'SYSTEM STATUS: ACTIVE',
  }

  const getUserId = useCallback(() => {
    if (typeof window === 'undefined') return ''
    const storedId = localStorage.getItem('userId')
    if (storedId) return storedId
    const newId = 'user_' + Math.random().toString(36).slice(2, 9)
    localStorage.setItem('userId', newId)
    return newId
  }, [])

  useEffect(() => {
    const id = getUserId()
    setUserId(id)

    const fetchProjectData = async () => {
      try {
        const docRef = doc(db, 'projects', project.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setLikes(data.likes || 0)
          const likers = data.likers || []
          setHasLiked(likers.includes(id))
        }
      } catch (error) {
        console.error('Error fetching project data:', error)
      }
    }
    fetchProjectData()
  }, [project.id, getUserId])

  const handleLike = async () => {
    if (!userId || !project.id) return

    const newHasLiked = !hasLiked
    const increment = newHasLiked ? 1 : -1

    // Optimistic update
    setHasLiked(newHasLiked)
    setLikes((prev: any) => Math.max(prev + increment, 0))

    try {
      const docRef = doc(db, 'projects', project.id)
      await updateDoc(docRef, {
        likes: likes + increment < 0 ? 0 : likes + increment,
        likers: newHasLiked ? arrayUnion(userId) : arrayRemove(userId),
      })
    } catch (error) {
      console.error('Error updating likes:', error)
      // Rollback on error
      setHasLiked(!newHasLiked)
      setLikes(likes)
    }
  }

  const description =
    language === 'es'
      ? project.spanish_description || project.english_description
      : project.english_description || project.spanish_description

  return (
    <Tweet
      content={project.title}
      description={description}
      name='Victor Q'
      userName='@victorqui'
      image={project.image}
      likes={likes}
      hasLiked={hasLiked}
      onLike={handleLike}
      redirect={project.preview_link}
      contentMg={labels.shareMsg}
      isPinned={project.isPinned}
      status={labels.status}
      stack={project.stack}
      showRocket={true}
      isSplit={true}
    />
  )
}
