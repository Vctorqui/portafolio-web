import { useFetch } from '../hooks/useFetch'
import { Language, NowPlayingResponse } from '../types'
import { spotifyLabels, SPOTIFY_REFRESH_INTERVAL } from '../constants'
import { SpotifyIcon } from './SvgIcon'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { TooltipStyled } from './ui/TooltipStyled'

function SoundWaves({ isPlaying }: { isPlaying: boolean }) {
  const animationClass = isPlaying
    ? 'animate-sound-wave'
    : 'animate-sound-wave-idle'
  const colorClass = isPlaying ? 'bg-cyan-400' : 'bg-white/20'

  return (
    <div className='flex items-end gap-[2px] h-3 w-4'>
      <span
        className={`w-[2px] ${colorClass} ${animationClass} [animation-delay:-0.6s]`}
      />
      <span
        className={`w-[2px] ${colorClass} ${animationClass} [animation-delay:-0.4s]`}
      />
      <span
        className={`w-[2px] ${colorClass} ${animationClass} [animation-delay:-0.2s]`}
      />
      <span className={`w-[2px] ${colorClass} ${animationClass}`} />
    </div>
  )
}

export function SpotifyNowPlaying({ language }: { language: Language }) {
  const { data, isLoading, refetch } = useFetch<NowPlayingResponse>(
    '/api/spotify/now-playing'
  )

  useEffect(() => {
    const interval = setInterval(refetch, SPOTIFY_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refetch])

  const t = spotifyLabels[language]

  const fallbackData = {
    isPlaying: true,
    title: 'Stupid Deep',
    artist: 'Jon Bellion',
    album: 'Glory Sound Prep',
    songUrl: 'https://open.spotify.com/track/69vToOV9p9Y6I7O58Yoy9C',
    albumImageUrl:
      'https://cdn-images.dzcdn.net/images/cover/d9ded5e477aafb7f680d5a0bcdc010ea/0x1900-000000-80-0-0.jpg',
  }

  const currentData = data?.isPlaying ? data : fallbackData
  const isCurrentlyPlaying = data?.isPlaying ?? false

  return (
    <TooltipStyled title={t.listenOn} placement='top'>
      <motion.section
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className='relative overflow-hidden rounded-full max-w-[800px] md:rounded-[2rem] border border-white/5 bg-[#080808]/80 backdrop-blur-xl p-2 md:p-4 hover:border-cyan-400/30 transition-all duration-500 group cursor-pointer'
      >
        <Link
          href={currentData.songUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='block'
        >
          {/* Decorative background glow */}
          <div className='absolute -top-12 -right-12 w-32 h-32 bg-cyan-400/5 blur-[60px] rounded-full group-hover:bg-cyan-400/10 transition-colors duration-700' />

          <div>
            {isLoading ? (
              <div className='flex items-center gap-4 relative z-10 animate-pulse'>
                <div className='w-14 h-14 rounded-xl bg-white/5 border border-white/10' />
                <div className='flex-1 space-y-2'>
                  <div className='h-4 bg-white/10 rounded-full w-3/4' />
                  <div className='h-3 bg-white/5 rounded-full w-1/2' />
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-4 relative z-10'>
                {currentData.albumImageUrl ? (
                  <div className='relative shrink-0'>
                    <Image
                      src={currentData.albumImageUrl}
                      alt={`${currentData.album} cover`}
                      width={50}
                      height={50}
                      className='w-10 h-10 md:w-14 md:h-14 rounded-xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-500'
                    />
                    {isCurrentlyPlaying && (
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
                    )}
                  </div>
                ) : (
                  <div className='h-10 w-10 md:h-14 md:w-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0'>
                    <SoundWaves isPlaying={isCurrentlyPlaying} />
                  </div>
                )}

                {/* Mobile Sound Waves - visible only on small screens */}
                <div className='block md:hidden pr-2'>
                  <SoundWaves isPlaying={isCurrentlyPlaying} />
                </div>

                <div className='hidden md:flex min-w-0 flex-1 flex-col space-y-1'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm text-white font-bold truncate group-hover:text-cyan-400 transition-colors'>
                      {currentData.title.length > 20
                        ? currentData.title.slice(0, 20).concat('...')
                        : currentData.title}
                    </p>
                    <SoundWaves isPlaying={isCurrentlyPlaying} />
                  </div>
                  <p className='text-white/50 text-xs truncate font-medium'>
                    {currentData.artist}
                  </p>
                </div>

                <div className='hidden md:flex bg-white/5 p-2 rounded-xl group-hover:bg-cyan-400/10 transition-colors'>
                  <SpotifyIcon width={25} height={25} />
                </div>
              </div>
            )}
          </div>
        </Link>
      </motion.section>
    </TooltipStyled>
  )
}
