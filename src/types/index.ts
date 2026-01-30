export type Language = 'es' | 'en'

export interface Experience {
  id: number
  company: string
  position: string
  english_date: string
  spanish_date: string
  spanish_description: string
  english_description: string
  stacks: string[]
}

export interface BannerLabels {
  role: string
  bio_start: string
  bio_highlight: string
  social: {
    resume: string
    resumeTip: string
    linkedinTip: string
    githubTip: string
    codepenTip: string
    emailTip: string
  }
  techStackLabel: string
  tabs: {
    projects: string
    experience: string
    about: string
  }
  copySuccess: string
  myTimeLabel: string
}

export interface AboutMeLabels {
  statusCareer: string
  statusGoals: string
  statusHobbies: string
  about: string
  goals: string
  hobbies: string
  aboutLabel: string
  hobbiesLabel: string
  share: string
}

export interface SpotifyLabels {
  label: string
  notPlaying: string
  listenOn: string
}

export type NowPlayingResponse =
  | {
      isPlaying: false
    }
  | {
      isPlaying: true
      title: string
      artist: string
      album: string
      songUrl: string
      albumImageUrl: string | null
    }
