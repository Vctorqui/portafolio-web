import { SpotifyLabels } from '../types'

export const spotifyLabels: Record<'en' | 'es', SpotifyLabels> = {
  es: {
    label: 'Escuchando ahora',
    notPlaying: 'Ahora mismo no estoy reproduciendo nada',
    listenOn: 'Abrir en Spotify',
  },
  en: {
    label: 'Now playing',
    notPlaying: "I'm not listening to anything right now",
    listenOn: 'Open on Spotify',
  },
}

export const SPOTIFY_REFRESH_INTERVAL = 30000 // 30 seconds
