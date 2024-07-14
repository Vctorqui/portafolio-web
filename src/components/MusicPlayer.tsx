import React, { useRef, useState } from 'react'
import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { MuteIcon, PlayIcon, SoundIcon, TidalIcon } from './SvgIcon'
import Link from 'next/link'
import { Fade } from 'react-awesome-reveal'
import { data } from '../mocks/data'

const MusicPlayerBox = styled(Box)(({ theme }) => ({
  '.linkButton': {
    display: 'flex',
    justifiyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px #000',
    position: 'relative',
    padding: 20,
    color: theme.palette.text.primary,
    background: 'transparent',
    transition: 'background .2s ease-out,color .2s ease-out',
    borderRadius: '0 40px 40px 0',
    '&:hover': {
      background: '#fff',
    },
  },
}))

const MusicPlayer = () => {
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

  // Utilizamos el operador opcional de encadenamiento (?.) para acceder a las propiedades y
  // métodos de audioRef.current solo si audioRef.current no es nulo.

  // El error “Property ‘pause’ does not exist on type ‘never’ se debe a que TypeScript no puede inferir
  //correctamente el tipo de audioRef.current. Para resolverlo, puedes especificar explícitamente el tipo de
  //audioRef como HTMLAudioElement | null

  return (
    <MusicPlayerBox component={'div'}>
      {data.map((item: any, i: any) => (
        <Box display={'flex'} component={'div'} key={i}>
          <Button
            sx={{
              padding: 2,
              width: '250px',
              justifyContent: 'flex-start',
              borderRadius: '40px 0 0 40px',
            }}
            onClick={() => handlePlay(item.src)}
            variant='outlined'
          >
            <Box component='div' display={'flex'} alignItems={'center'} gap={2}>
              {iconState === 'play' && (
                <PlayIcon width={'25px'} height={'25px'} />
              )}
              {iconState === 'sound' && (
                <Fade>
                  <SoundIcon width={'25px'} height={'25px'} />
                </Fade>
              )}
              {iconState === 'mute' && (
                <Fade>
                  <MuteIcon width={'25px'} height={'25px'} />
                </Fade>
              )}
              {textPlayer === 'firstText' && (
                <Stack alignItems={'flex-start'}>
                  <Typography
                    fontSize={'11px'}
                    fontWeight={900}
                    variant='body1'
                  >
                    Block Vibes
                  </Typography>
                  <Typography fontSize={'11px'} variant='body1'>
                    Curated by JAY-Z
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
                    >
                      {item.title}
                    </Typography>
                    <Typography fontSize={'11px'} variant='body1'>
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
                    Full playlist on TIDAL
                  </Typography>
                  <Typography fontSize={'11px'} variant='body1'>
                    Curated by JAY-Z
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
            onMouseEnter={() => setTextPlayer('thirdText')}
            onMouseLeave={() => setTextPlayer('firstText')}
            className='linkButton'
            href={
              'https://tidal.com/browse/playlist/3d95c4f6-dad5-4d7f-a469-8bde01b7771d'
            }
          >
            <TidalIcon width={'30px'} height={'30px'} />
          </Link>
        </Box>
      ))}
    </MusicPlayerBox>
  )
}

export default MusicPlayer
