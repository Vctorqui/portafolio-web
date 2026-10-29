'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { ProjectRecord } from '../../constants/projects'
import { useGsapSectionReveal } from '../../shared/hooks/useGsapSectionReveal'
import { Language } from '../../types'
import { AchievementToast, unlockAchievement, useAmbientFinds, useSectionVisits } from '../achievements'
import { useCommandPaletteShortcut } from '../command-palette/useCommandPaletteShortcut'
import { useAmbience } from '../weather'
import { Colophon } from './components/colophon/Colophon'
import { HomeHeader } from './components/header/HomeHeader'
import { SiteControls } from './components/header/SiteControls'
import { SelectedWork } from './components/selected-work/SelectedWork'
import { Setup } from './components/Setup'
import { SiteFooter } from './components/SiteFooter'
import { SkyBand } from './components/SkyBand'
import { SoundPrompt } from './components/SoundPrompt'
import { Summary } from './components/Summary'
import { WhatsUp } from './components/whats-up/WhatsUp'
import { WorkLife } from './components/WorkLife'

const LazyCommandPalette = dynamic(
  () => import('../command-palette/CommandPalette').then((module) => module.CommandPalette),
  { ssr: false }
)

function scrollToColophon() {
  document.getElementById('colophon')?.scrollIntoView({ behavior: 'smooth' })
}

/** The single-page portfolio: sky, sections, ground — plus its global behaviours. */
export function HomePage({ featured }: { featured: ProjectRecord[] }) {
  const [language, setLanguage] = useState<Language>('es')
  const [paletteOpen, setPaletteOpen] = useCommandPaletteShortcut()

  useGsapSectionReveal()
  useSectionVisits()
  useAmbience()
  useAmbientFinds({ consoleOpen: paletteOpen })

  const changeLanguage = useCallback(
    (next: Language) => {
      if (next !== language) unlockAchievement('bilingual')
      setLanguage(next)
    },
    [language]
  )

  return (
    <>
      {paletteOpen && (
        <LazyCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onOpenAchievements={scrollToColophon} language={language} />
      )}
      <AchievementToast language={language} />
      <SiteControls language={language} onLanguageChange={changeLanguage} />
      <SkyBand />
      <main className='relative mx-auto -mt-24 w-full max-w-[var(--measure-table)] px-md sm:-mt-36'>
        <SoundPrompt language={language} />
        <HomeHeader language={language} />
        <Summary language={language} />
        <WhatsUp language={language} />
        <SelectedWork language={language} featured={featured} />
        <WorkLife language={language} />
        <Setup language={language} />
        <Colophon language={language} />
      </main>
      <SiteFooter language={language} />
    </>
  )
}
