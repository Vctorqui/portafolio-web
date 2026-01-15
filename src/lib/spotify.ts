type SpotifyTokenResponse = {
  access_token: string
  token_type: string
  scope: string
  expires_in: number
}

type SpotifyNowPlayingResponse = {
  is_playing: boolean
  item: {
    name: string
    artists: Array<{ name: string }>
    album: {
      name: string
      images: Array<{ url: string; height: number; width: number }>
    }
    external_urls: { spotify: string }
  } | null
}

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env var: ${name}`)
  return value
}

export async function getSpotifyAccessToken(): Promise<string> {
  const clientId = requireEnv('SPOTIFY_CLIENT_ID')
  const clientSecret = requireEnv('SPOTIFY_CLIENT_SECRET')
  const refreshToken = requireEnv('SPOTIFY_REFRESH_TOKEN')

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`Spotify token error: ${response.status} ${text}`)
  }

  const data = (await response.json()) as SpotifyTokenResponse
  return data.access_token
}

export type NowPlaying =
  | {
      isPlaying: true
      title: string
      artist: string
      album: string
      songUrl: string
      albumImageUrl: string | null
    }
  | {
      isPlaying: false
    }

export async function getNowPlaying(): Promise<NowPlaying> {
  const accessToken = await getSpotifyAccessToken()

  const response = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  })

  // 204 = nothing playing
  if (response.status === 204) return { isPlaying: false }

  // 401/403 can happen if refresh token is wrong or missing scopes
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`Spotify now-playing error: ${response.status} ${text}`)
  }

  const data = (await response.json()) as SpotifyNowPlayingResponse

  if (!data.is_playing || !data.item) return { isPlaying: false }

  const title = data.item.name
  const artist = data.item.artists.map((a) => a.name).join(', ')
  const album = data.item.album.name
  const songUrl = data.item.external_urls.spotify
  const albumImageUrl = data.item.album.images?.[0]?.url ?? null

  return {
    isPlaying: true,
    title,
    artist,
    album,
    songUrl,
    albumImageUrl,
  }
}
