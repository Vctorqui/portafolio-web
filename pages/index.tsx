import { Layout } from '@/src/layouts/Public'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/src/firebase/config'
import Banner from '@/src/components/Banner'
import { Projects } from '@/src/components/Projects'
import dynamic from 'next/dynamic'

import { Language } from '@/src/types'

const Experience = dynamic(
  () =>
    import('@/src/components/Experience').then((mod) => ({
      default: mod.Experience,
    })),
  {
    loading: () => (
      <div className='flex justify-center items-center py-20'>
        <div className='text-white/40'>Loading...</div>
      </div>
    ),
  },
)

const AboutMe = dynamic(
  () =>
    import('@/src/components/AboutMe').then((mod) => ({
      default: mod.AboutMe,
    })),
  {
    loading: () => (
      <div className='flex justify-center items-center py-20'>
        <div className='text-white/40'>Loading...</div>
      </div>
    ),
  },
)

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
    revalidate: 300,
  }
}

const Index = ({ projects }: any) => {
  const [language, setLanguage] = useState<Language>('es')
  const [value, setValue] = useState('Projects')

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
