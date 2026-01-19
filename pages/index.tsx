import { AboutMe } from '@/src/components/AboutMe'
import { Experience } from '@/src/components/Experience'
import { Layout } from '@/src/layouts/Public'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React, { useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/src/firebase/config'
import Banner from '@/src/components/Banner'
import { Projects } from '@/src/components/Projects'
import { SpotifyNowPlaying } from '@/src/components/SpotifyNowPlaying'

import { Language } from '@/src/types'

export async function getStaticProps() {
  const projectsCollection = collection(db, 'projects')
  const q = query(projectsCollection, orderBy('order', 'asc'))
  const projectSnapshot = await getDocs(q)
  const projects = projectSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return {
    props: {
      projects,
    },
    // ISR: Regenerate page every 5 minutes if there's a request
    revalidate: 300,
  }
}

const Index = ({ projects }: any) => {
  const [language, setLanguage] = useState<Language>('es')
  const [value, setValue] = useState('Projects')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <Banner language={language} activeTab={value} onTabChange={setValue} />
      <main className='max-w-3xl mx-auto'>
        <TabContext value={value}>
          <TabPanel sx={{ padding: 0 }} value='Projects'>
            <section className='project-section space-y-4 py-4'>
              {projects.map((project: any, i: any) => {
                return (
                  <Projects key={i} project={project} language={language} />
                )
              })}
            </section>
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value='Experience'>
            <Experience language={language} />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value='Me'>
            <AboutMe language={language} />
          </TabPanel>
        </TabContext>
      </main>
    </Layout>
  )
}

export default Index
