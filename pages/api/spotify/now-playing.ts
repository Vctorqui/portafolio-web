import type { NextApiRequest, NextApiResponse } from 'next'
import { getNowPlaying } from '@/src/lib/spotify'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const nowPlaying = await getNowPlaying()

    // Cache lightly at CDN (Vercel) but always fresh from Spotify
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')

    if (!nowPlaying.isPlaying) {
      return res.status(200).json({ isPlaying: false })
    }

    return res.status(200).json(nowPlaying)
  } catch (error) {
    // Avoid leaking secrets/details
    return res.status(200).json({ isPlaying: false })
  }
}
