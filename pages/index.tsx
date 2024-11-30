import { AboutMe } from '@/src/components/AboutMe'
import { Experience } from '@/src/components/Experience'
import { Projects } from '@/src/components/Projects'
import { Layout } from '@/src/layouts/Public'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React, { useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/src/firebase/config'
import Banner from '@/src/components/Banner'
import Feed from '@/src/components/Feed'

export async function getServerSideProps() {
  const projectsCollection = collection(db, 'projects')
  const q = query(projectsCollection, orderBy('order', 'asc')) // Ordenar por el campo 'order'
  const projectSnapshot = await getDocs(q)
  const projects = projectSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return {
    props: {
      projects,
    },
  }
}

const Index = ({ projects }: any) => {
  const [changeLang, setChangeLang] = useState(false)
  const [value, setValue] = useState('Home')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Layout changeLang={changeLang}>
      <Banner />
      <main className='max-w-2xl mx-auto px-4'>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              className='w-full bg-slate-950 border-b border-none justify-center '
              centered
              textColor='secondary'
              indicatorColor='secondary'
              onChange={handleChange}
              aria-label='Tabs list portfolio options'
            >
              <Tab
                className='flex-1 font-black'
                label='Home'
                value='Home'
                aria-label='Home'
              />
              <Tab
                className='flex-1 font-black'
                label='Projects'
                value='Projects'
                aria-label='Projects'
              />
              <Tab
                className='flex-1 font-black'
                label='Experience'
                value='Experience'
                aria-label='Experience'
              />
              <Tab
                className='flex-1 font-black'
                label='Me'
                value='Me'
                aria-label='About me'
              />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: 0 }} value='Home'>
            <Feed />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value='Projects'>
            {projects.map((project: any, i: any) => {
              return (
                <Projects key={i} project={project} changeLang={changeLang} />
              )
            })}
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value='Experience'>
            <Experience />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value='Me'>
            <AboutMe />
          </TabPanel>
        </TabContext>
      </main>
    </Layout>
  )
}

export default Index
