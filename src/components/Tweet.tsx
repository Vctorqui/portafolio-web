import { Avatar, Card, Box, Typography, IconButton } from '@mui/material'
import { Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { OpenInNew, PushPin, WorkOutline } from '@mui/icons-material'
import { LightTooltip } from './LightToolTip'
import { ShareBtn } from './ShareBtn'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface TweetProps {
  content: string
  description: string
  name: string
  userName: string
  image?: string
  date?: string
  likes?: number
  retweets?: number
  replies?: number
  avatar: string
  redirect: string
  contentMg: string
  isPinned?: boolean
  status?: string
}

export const Tweet = ({
  content,
  description,
  name,
  userName,
  image,
  avatar,
  date,
  likes,
  retweets,
  redirect,
  replies,
  contentMg,
  isPinned,
  status,
}: TweetProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='py-4 px-4 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 relative'>
        {isPinned && (
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
          {avatar ? (
            <Avatar
              alt='Victor Quiñones Profile Picture'
              className='rounded-full object-cover border-2 border-white/10 hover:border-[#EF5A6F] transition-colors duration-300'
              src={avatar}
              sx={{ width: 48, height: 48 }}
            />
          ) : (
            <div className='p-2 bg-[#EF5A6F]/10 rounded-full w-10 h-10'>
              <WorkOutline className='h-6 w-6 text-[#EF5A6F]' />
            </div>
          )}
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold text-white'>{name}</span>
              <span className='text-gray-400'>{userName}</span>
              <span className='text-muted-foreground'>·</span>
              <span className='text-gray-400'>{date}</span>
            </div>
            <Box
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              className='mt-1'
            >
              <Box className='bg-slate-700/50 rounded-full px-3 py-1 flex justify-center'>
                <Typography variant='body2' fontWeight={700} className='text-[#EF5A6F]'>
                  {status}
                </Typography>
              </Box>
            </Box>
            <p className='mt-3 font-bold whitespace-pre-line text-[#EF5A6F] text-lg'>
              {content}
            </p>
            <p className='mt-3 whitespace-pre-line text-gray-300 leading-relaxed'>
              {description}
            </p>
            {image && (
              <div className='mt-4 rounded-xl overflow-hidden'>
                <Image
                  src={image}
                  alt={`Picture of ${content} resource`}
                  width={500}
                  height={280}
                  className='w-full object-cover hover:scale-105 transition-transform duration-500'
                />
              </div>
            )}
            <div className='flex items-center gap-6 mt-4 text-muted-foreground'>
              {replies && (
                <LightTooltip title='See comments'>
                  <motion.span 
                    className='flex items-center gap-1'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <button
                      aria-label='click to see comments'
                      className='hover:text-[#EF5A6F] transition-colors duration-300'
                    >
                      <MessageCircle className='w-4 h-4' />
                    </button>
                  </motion.span>
                </LightTooltip>
              )}
              
              {redirect && (
                <div className='flex items-center gap-4'>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ShareBtn
                      insert={redirect}
                      classTailwind={'flex items-center gap-1 hover:text-[#EF5A6F] transition-colors duration-300'}
                      content={contentMg}
                    />
                  </motion.div>
                  <LightTooltip title={`Go to Victor's LinkedIn`}>
                    <motion.span 
                      className='flex items-center gap-1'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link
                        aria-label='Go to Victor LinkedIn profile'
                        style={{ fontSize: 'small' }}
                        rel='noopener noreferrer'
                        href={redirect}
                        className='hover:text-[#EF5A6F] transition-colors duration-300'
                      >
                        <OpenInNew fontSize='small' />
                      </Link>
                    </motion.span>
                  </LightTooltip>
                </div>
              )}

              {likes && (
                <LightTooltip title={`${likes} likes`}>
                  <motion.span 
                    className='flex items-center gap-1'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <button
                      aria-label='click to like the post'
                      className='hover:text-[#EF5A6F] transition-colors duration-300'
                    >
                      <Heart className='w-4 h-4' />
                      <span className='text-sm'>{likes}</span>
                    </button>
                  </motion.span>
                </LightTooltip>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
