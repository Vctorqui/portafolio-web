import React, { useRef, useState } from 'react'
import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { MuteIcon, SoundIcon } from './SvgIcon'
import Link from 'next/link'
import { Fade } from 'react-awesome-reveal'
import { data } from '../mocks/data'
import { FaSpotify } from 'react-icons/fa'
import { Headphones, HeadsetOff, PlayArrow } from '@mui/icons-material'
interface PlayerProps {
  additionalClassName?: string
}

const MusicPlayerBox = styled(Box)(({ theme }) => ({
  '.linkButton': {
    display: 'flex',
    justifiyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px #76ABAE',
    position: 'relative',
    padding: 20,
    color: theme.palette.secondary.light,
    background: 'transparent',
    transition: 'background .2s ease-out,color .2s ease-out',
    borderRadius: '0 5px 5px 0',
    '&:hover': {
      color: theme.palette.common.black,
      background: theme.palette.secondary.light,
    },
  },
  '.playButton': {
    padding: theme.spacing(2),
    width: '250px',
    justifyContent: 'flex-start',
    borderRadius: '5px 0 0 5px',
    '&:hover .textPlayer': {
      color: theme.palette.common.black,
    },
    '&:hover .iconPlayer': {
      color: theme.palette.common.black,
    },
  },
  '.iconPlayer': {
    color: theme.palette.secondary.light,
  },
}))

const MusicPlayer = ({ additionalClassName }: PlayerProps) => {
  // create an audio
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null) // Especifica el tipo
  const [iconState, setIconState] = useState('play') // Estado inicial: 'play'
  const [textPlayer, setTextPlayer] = useState('firstText')

  const handlePlay = (songUrl: string) => {
    if (currentSong === songUrl) {
      // Si la canción actual es la misma, alterna entre reproducir y pausar
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false) // Cambia el estado a "no está reproduciendo"
      } else {
        audioRef.current?.play()
        setIsPlaying(true) // Cambia el estado a "está reproduciendo"
      }
    } else {
      setCurrentSong(songUrl)
      setIsPlaying(true) // Comienza a reproducir la nueva canción
    }

    setIconState((prevIcon) => {
      if (prevIcon === 'play') {
        return 'sound'
      } else if (prevIcon === 'sound') {
        return 'mute'
      } else {
        return 'sound'
      }
    })

    setTextPlayer((prevText): any => {
      if (prevText === 'firstText') {
        return 'secondText'
      } else if (prevText === 'secondText') {
        return 'secondText'
      }
    })
  }

  return (
    <MusicPlayerBox className={additionalClassName}>
      {data.map((item: any, i: any) => (
        <Box display={'flex'} key={i}>
          <Button
            aria-label='Play'
            onClick={() => handlePlay(item.src)}
            className='playButton'
            variant='outlined'
          >
            <Box display={'flex'} alignItems={'center'} gap={2}>
              {iconState === 'play' && (
                <PlayArrow
                  arial-label='Play icono'
                  width={'25px'}
                  height={'25px'}
                  className={'iconPlayer'}
                />
              )}
              {iconState === 'sound' && (
                <Fade>
                  <Headphones
                    arial-label='Audifonos icono'
                    width={'25px'}
                    height={'25px'}
                    className={'iconPlayer'}
                  />
                </Fade>
              )}
              {iconState === 'mute' && (
                <Fade>
                  <HeadsetOff
                    arial-label='Mute icono'
                    width={'25px'}
                    height={'25px'}
                    className={'iconPlayer'}
                  />
                </Fade>
              )}
              {textPlayer === 'firstText' && (
                <Stack alignItems={'flex-start'}>
                  <Typography
                    fontSize={'11px'}
                    fontWeight={900}
                    variant='body1'
                    className='textPlayer'
                  >
                    Code Vibes
                  </Typography>
                  <Typography
                    className='textPlayer'
                    fontSize={'11px'}
                    variant='body1'
                  >
                    by Victor
                  </Typography>
                </Stack>
              )}
              {textPlayer === 'secondText' && (
                <Fade>
                  <Stack alignItems={'flex-start'}>
                    <Typography
                      fontSize={'11px'}
                      fontWeight={900}
                      variant='body1'
                      className='textPlayer'
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      fontSize={'11px'}
                      variant='body1'
                      className='textPlayer'
                    >
                      {item.artist}
                    </Typography>
                  </Stack>
                </Fade>
              )}
              {textPlayer === 'thirdText' && (
                <Stack alignItems={'flex-start'}>
                  <Typography
                    fontSize={'11px'}
                    fontWeight={900}
                    variant='body1'
                  >
                    Full playlist on Spotify
                  </Typography>
                  <Typography fontSize={'11px'} variant='body1'>
                    by Victor
                  </Typography>
                </Stack>
              )}
            </Box>
            {currentSong && (
              <audio ref={audioRef} autoPlay>
                <source src={currentSong} type='audio/mpeg' />
                Tu navegador no admite el elemento de audio.
              </audio>
            )}
          </Button>
          <Link
            aria-label='Ir a Playlist en Spotify'
            onMouseEnter={() => setTextPlayer('thirdText')}
            onMouseLeave={() => setTextPlayer('firstText')}
            className='linkButton'
            href={
              'https://open.spotify.com/intl-es/album/4xUST4uTiV5TCCVws3Vie6?si=T4M_lbWPSoCEBScPhkog1A'
            }
          >
            <FaSpotify />
          </Link>
        </Box>
      ))}
    </MusicPlayerBox>
  )
}

export default MusicPlayer
