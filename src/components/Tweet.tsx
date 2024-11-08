import { Avatar, Card } from '@mui/material'
import { Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { OpenInNew, WorkOutline } from '@mui/icons-material'
import { LightTooltip } from './LightToolTip'
import { ShareBtn } from './ShareBtn'
import Link from 'next/link'

interface TweetProps {
  content: string
  description: string
  name: string
  userName: string
  image?: string
  date: string
  likes: number
  retweets: number
  replies: number
  avatar: string
  redirect: string
  contentMg: string
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
}: TweetProps) => {
  return (
    <Card className='py-4 px-2 hover:bg-slate-800 transition-colors cursor-pointer bg-black'>
      <div className='flex gap-3'>
        {avatar ? (
          <Avatar
            alt='Victor Quiñones Profile Picture'
            className='rounded-full object-cover'
            src={avatar}
            sx={{ width: 48, height: 48 }}
          />
        ) : (
          <div className='p-2 bg-[#ea580c/10 rounded-full w-10 h-10'>
            <WorkOutline className='h-6 w-6 text-[#ea580c]' />
          </div>
        )}
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <span className='font-semibold'>{name}</span>
            <span className='text-gray-400'>{userName}</span>
            <span className='text-muted-foreground'>·</span>
            <span className='text-gray-400'>{date}</span>
          </div>
          <p className='mt-2 font-bold whitespace-pre-line'>{content}</p>
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
            {replies ? (
              <LightTooltip title={'Go to the web'}>
                <button
                  disabled
                  className='flex items-center gap-2 disabled:opacity-30'
                >
                  <MessageCircle className='w-4 h-4' />
                </button>
              </LightTooltip>
            ) : (
              <LightTooltip title={'Not available for now'}>
                <button
                  disabled
                  className='flex items-center gap-2 disabled:opacity-30'
                >
                  <MessageCircle className='w-4 h-4' />
                </button>
              </LightTooltip>
            )}
            <>
              <ShareBtn
                insert={redirect}
                classTailwind={'flex items-center gap-2 '}
                content={contentMg}
              />
            </>
            <LightTooltip title={'Not available for now'}>
              <button
                disabled
                className='flex items-center gap-2 disabled:opacity-30'
              >
                <Heart className='w-4 h-4' />
              </button>
            </LightTooltip>
            {redirect ? (
              <LightTooltip title={`Go to Victor's LinkedIn`}>
                <Link
                  style={{ fontSize: 'small' }}
                  rel='noopener noreferrer'
                  href={redirect}
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
  )
}
