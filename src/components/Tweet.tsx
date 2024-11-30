import { Avatar, Card, Box, Typography, IconButton } from '@mui/material'
import { Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { OpenInNew, PushPin, WorkOutline } from '@mui/icons-material'
import { LightTooltip } from './LightToolTip'
import { ShareBtn } from './ShareBtn'
import Link from 'next/link'

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
    <Card className='py-4 px-2 hover:bg-slate-800 transition-colors cursor-pointer bg-slate-900 mt-2 border-x border-y border-gray-800'>
      {isPinned && (
        <Box
          className='text-zinc-600'
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          gap={1}
          mb={2}
        >
          <PushPin fontSize='small' />
          <Typography fontWeight={'bold'} variant='caption'>
            Pinned Cheep
          </Typography>
        </Box>
      )}
      <div className='flex gap-3'>
        {avatar ? (
          <Avatar
            alt='Victor Quiñones Profile Picture'
            className='rounded-full object-cover'
            src={avatar}
            sx={{ width: 48, height: 48 }}
          />
        ) : (
          <div className='p-2 bg-[#EF5A6F/10 rounded-full w-10 h-10'>
            <WorkOutline className='h-6 w-6 text-[#EF5A6F]' />
          </div>
        )}
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <span className='font-semibold'>{name}</span>
            <span className='text-gray-400'>{userName}</span>
            <span className='text-muted-foreground'>·</span>
            <span className='text-gray-400'>{date}</span>
          </div>
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
          >
            <Box className='bg-slate-500 rounded-full px-2  flex justify-center'>
              <Typography variant='body2' fontWeight={700}>
                {status}
              </Typography>
            </Box>
          </Box>
          <p className='mt-2 font-bold whitespace-pre-line text-[#EF5A6F]'>
            {content}
          </p>
          <p className='mt-2 whitespace-pre-line'>{description}</p>
          {image && (
            <div className='mt-3 rounded-lg overflow-hidden'>
              <Image
                src={image}
                alt={`Picture of ${content} resource`}
                width={500}
                height={280}
                className='w-full object-cover'
              />
            </div>
          )}
          <div className='flex justify-between mt-3 text-muted-foreground'>
            <LightTooltip
              title={replies ? 'See comments' : 'Not available for now'}
            >
              <span className='flex items-center gap-2'>
                <button
                  disabled={replies ? false : true}
                  className=' disabled:opacity-30'
                >
                  <MessageCircle className='w-4 h-4' />
                </button>
              </span>
            </LightTooltip>
            <>
              <ShareBtn
                insert={redirect}
                classTailwind={'flex items-center gap-2 '}
                content={contentMg}
              />
            </>
            <LightTooltip title={'Not available for now'}>
              <span className='flex items-center gap-2'>
                <button disabled className=' disabled:opacity-30'>
                  <Heart className='w-4 h-4' />
                </button>
              </span>
            </LightTooltip>
            {redirect ? (
              <LightTooltip title={`Go to Victor's LinkedIn`}>
                <span className='flex items-center gap-2'>
                  <Link
                    style={{ fontSize: 'small' }}
                    rel='noopener noreferrer'
                    href={redirect}
                    className=' hover:text-blue-400 transition-colors'
                  >
                    <OpenInNew fontSize='small' />
                  </Link>
                </span>
              </LightTooltip>
            ) : (
              <LightTooltip title={'Not available for now'}>
                <span className='flex items-center gap-2 '>
                  <button disabled className=' disabled:opacity-30'>
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
