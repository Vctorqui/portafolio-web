import { Avatar, Card, Box, Typography } from '@mui/material'
import {
  Heart,
  Rocket,
  Repeat,
  BarChart3,
  Bookmark,
  Share2,
  Code2,
} from 'lucide-react'
import Image from 'next/image'
import { OpenInNew, PushPin, WorkOutline } from '@mui/icons-material'
import { TooltipStyled } from './TooltipStyled'
import { ShareBtn } from './ShareBtn'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TweetProps {
  content: string
  description: string
  name: string
  userName: string
  image?: string
  date?: string
  likes?: number
  avatar?: string
  redirect?: string
  contentMg: string
  isPinned?: boolean
  status?: string
  stack?: string
  showRocket?: boolean
  isSplit?: boolean
  showLikes?: boolean
  showLinkedIn?: boolean
  isLimitedShare?: boolean
  hasLiked?: boolean
  onLike?: () => void
}

export const Tweet = ({
  content,
  description,
  name,
  userName,
  image,
  avatar,
  date,
  likes: initialLikes = 0,
  redirect,
  contentMg,
  isPinned,
  status,
  stack,
  showRocket = false,
  isSplit = false,
  showLikes = true,
  showLinkedIn = false,
  isLimitedShare = false,
  hasLiked: propHasLiked,
  onLike,
}: TweetProps) => {
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (propHasLiked !== undefined) {
      setHasLiked(propHasLiked)
    }
  }, [propHasLiked])

  useEffect(() => {
    setLikes(initialLikes)
  }, [initialLikes])

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (onLike) {
      onLike()
      return
    }

    if (hasLiked) {
      setLikes((prev) => Math.max(prev - 1, 0))
      setHasLiked(false)
    } else {
      setLikes((prev) => prev + 1)
      setHasLiked(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='w-full'
    >
      <Card
        className='group relative bg-[#080808]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 md:p-8 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden mb-4'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative background glow */}
        <div className='absolute -top-24 -right-24 w-64 h-64 bg-cyan-400/5 blur-[100px] rounded-full group-hover:bg-cyan-400/10 transition-colors duration-700' />

        {/* Header section */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4'>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <Avatar
                src={avatar || '/images/perfil_profile.webp'}
                alt={`${name} profile picture`}
                className='w-12 h-12 border-2 border-white/5 ring-2 ring-cyan-400/20'
              />
              <div className='absolute -bottom-1 -right-1 bg-[#080808] rounded-full p-0.5'>
                <div className='bg-cyan-400 rounded-full p-1 shadow-[0_0_10px_rgba(34,211,238,0.5)]'>
                  <svg
                    className='w-2 h-2 text-[#080808]'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <span className='font-bold text-white text-sm'>{name}</span>
                <span className='text-white/40 text-[10px]'>{userName}</span>
                {date && (
                  <span className='text-white/20 text-[10px]'>· {date}</span>
                )}
              </div>
              {status && (
                <div className='flex items-center gap-2 mt-1'>
                  <div className='flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-0.5'>
                    <div className='w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]' />
                    <span className='text-[8px] font-bold text-cyan-400 tracking-wider uppercase'>
                      {status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isPinned && (
            <div className='hidden md:flex items-center gap-2 text-cyan-400/60'>
              <PushPin className='w-3 h-3 text-cyan-400 rotate-45' />
              <span className='text-[8px] font-bold tracking-[0.2em] uppercase'>
                PINNED
              </span>
            </div>
          )}
        </div>

        {/* Main Content: Support for Split or Single layout */}
        <div
          className={`grid grid-cols-1 ${
            isSplit ? 'lg:grid-cols-2' : ''
          } gap-8`}
        >
          {/* Left Side: Text Info */}
          <div
            className={`flex flex-col justify-center ${
              isSplit ? 'order-2 lg:order-1' : ''
            }`}
          >
            {content && (
              <div className='flex items-center gap-2 mb-2'>
                <h2 className='text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300'>
                  {content}
                </h2>
                {showRocket && (
                  <Rocket className='w-5 h-5 text-cyan-400 animate-pulse' />
                )}
              </div>
            )}

            <p
              className='text-white/60 text-sm leading-relaxed mb-4'
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {stack && (
              <div className='flex flex-wrap gap-2 mb-4'>
                {stack.split(/[,\s]+/).map((tag: string) => (
                  <span
                    key={tag}
                    className='px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-bold hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-300'
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Image Preview (Optional) */}
          {image && (
            <div
              className={`relative ${
                isSplit
                  ? 'order-1 lg:order-2 h-[240px] md:h-[320px]'
                  : 'h-[300px] mt-4'
              } group/image`}
            >
              <div className='absolute inset-0 bg-cyan-400/5 rounded-[2rem] blur-2xl group-hover/image:bg-cyan-400/10 transition-all duration-500' />
              <div className='relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10'>
                <Image
                  src={image}
                  alt={content}
                  fill
                  priority={isPinned}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-contain group-hover/image:scale-110 transition-transform duration-700'
                />

                {/* Image Overlay */}
                <div className='absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent'>
                  <div className='bg-[#080808]/80 border border-white/10 rounded-2xl p-6 w-full max-w-[240px] text-center transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500'>
                    <span className='text-cyan-400 text-[7px] font-bold tracking-[0.2em] uppercase mb-3 block'>
                      SYSTEM STATUS: ACTIVE
                    </span>
                    <h3 className='text-white text-lg font-black mb-4'>
                      Build. Share.{' '}
                      <span className='text-cyan-400'>Iterate.</span>
                    </h3>
                    <div className='flex gap-2'>
                      {redirect && (
                        <Link
                          href={redirect}
                          target='_blank'
                          title={`View live demo of ${content}`}
                          className='flex-1 bg-cyan-400 hover:bg-cyan-300 text-black font-black py-2.5 rounded-xl text-[9px] tracking-widest transition-colors flex items-center justify-center gap-2'
                        >
                          VIEW
                        </Link>
                      )}
                      {/*}
                      <button className='bg-white/10 hover:bg-white/20 text-white rounded-xl p-2.5 transition-colors'>
                        <Code2 className='w-3 h-3' />
                      </button>
                      */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions and stats */}
        <div className='mt-6 pt-4 border-t border-white/5 flex items-center justify-between'>
          <div className='flex items-center gap-0'>
            {showLikes && (
              <div
                className='flex items-center gap-2 group/stat cursor-pointer'
                onClick={handleLike}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    hasLiked
                      ? 'fill-cyan-400 text-cyan-400'
                      : 'text-white/40 group-hover/stat:text-cyan-400'
                  }`}
                />
                <span
                  className={`text-sm font-bold transition-colors ${
                    hasLiked
                      ? 'text-cyan-400'
                      : 'text-white/40 group-hover/stat:text-cyan-400'
                  }`}
                >
                  {likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes}
                </span>
              </div>
            )}

            {showLinkedIn && redirect && (
              <div className='flex items-center gap-4'>
                <TooltipStyled title={`Go to LinkedIn`}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={redirect}
                      target='_blank'
                      rel='noopener noreferrer'
                      title={`Open ${name} in a new tab`}
                      className='p-2 hover:text-cyan-400 transition-colors duration-300 text-white/40'
                    >
                      <OpenInNew className='w-5 h-5' />
                    </Link>
                  </motion.div>
                </TooltipStyled>
              </div>
            )}
          </div>

          <div className='flex items-center gap-4'>
            {redirect && (
              <ShareBtn
                insert={redirect}
                content={contentMg}
                classTailwind=' rounded-2xl transition-all'
                isLimited={isLimitedShare}
              />
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
