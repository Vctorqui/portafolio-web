import { Layout } from '@/src/layouts/Public'
import React, { useEffect, useState } from 'react'
import {
  featuredProjects,
  realEstateProjects,
  ProjectRecord,
} from '@/src/constants/projects'
import { SideRail } from '@/src/components/site/SideRail'
import {
  IndexSection,
  NowSection,
  YearsSection,
  WorkSection,
  ReachSection,
} from '@/src/components/site/IndexSections'
import { Language } from '@/src/types'
import { useGsapSectionReveal } from '@/src/hooks/useGsapSectionReveal'
import { FloatingCommandDock } from '@/src/components/site/FloatingCommandDock'
import dynamic from 'next/dynamic'

const LazyCommandPalette = dynamic(
  () =>
    import('@/src/components/site/CommandPalette').then(
      (module) => module.CommandPalette
    ),
  { ssr: false }
)

export async function getStaticProps() {
  return {
    props: {
      featured: featuredProjects,
      realEstate: realEstateProjects,
    },
    revalidate: 60,
  }
}

const Index = ({
  featured,
  realEstate,
}: {
  featured: ProjectRecord[]
  realEstate: ProjectRecord[]
}) => {
  const [language, setLanguage] = useState<Language>('es')
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  useGsapSectionReveal()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen((open) => !open)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <Layout>
      {commandPaletteOpen && (
        <LazyCommandPalette
          open={commandPaletteOpen}
          onOpenChange={setCommandPaletteOpen}
        />
      )}
      <FloatingCommandDock
        language={language}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />
      <main className='mx-auto flex max-w-[var(--measure-wide)] flex-col gap-xl px-md py-md lg:px-lg lg:pb-3xl'>
        <SideRail
          language={language}
          onLanguageChange={setLanguage}
        />

        <article className='min-w-0'>
          <IndexSection language={language} />
          <NowSection language={language} />
          <YearsSection language={language} />
          <WorkSection
            language={language}
            featured={featured}
            realEstate={realEstate}
          />
          <ReachSection language={language} />
        </article>
      </main>
    </Layout>
  )
}

export default Index
