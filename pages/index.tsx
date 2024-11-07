/* eslint-disable @next/next/no-img-element */
import { AboutMe } from '@/src/components/AboutMe'
import { Experience } from '@/src/components/Experience'
import { Projects } from '@/src/components/Projects'
import { Layout } from '@/src/layouts/Public'
import { CalendarMonth, Mail, Place } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, Box, Stack, styled, Tab } from '@mui/material'
import React, { useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/src/firebase/config'
import { Feed } from '@/src/components/Feed'
import Link from 'next/link'

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
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Layout changeLang={changeLang}>
      <main className='min-h-screen bg-black text-white pb-10'>
        <div className='h-48 max-w-2xl mx-auto'>
          <div className='w-full h-full'>
            <img
              alt='gif'
              className='w-full h-full object-cover'
              src='https://64.media.tumblr.com/cb1a6d28f1f97fe56c0764cdf40fc92c/d662df3b2e19bcdc-c5/s2048x3072/be56de3866ebc146e4f1b0893ca69b955a92ae23.gifv'
            ></img>
          </div>
        </div>

        <div className='max-w-2xl mx-auto px-4'>
          <div className='relative'>
            <Avatar className='w-32 h-32 border-4 border-black absolute -top-16 left-4'>
              <img
                src='/images/profile.webp'
                alt='Profile'
                className='object-cover'
              />
            </Avatar>
          </div>
          <div className='pt-20 pb-4'>
            <h1 className='text-2xl font-bold'>Victor Quiñones</h1>
            <p>Frontend Developer</p>
            <Link
              className='font-semibold'
              href='https://www.linkedin.com/in/victorqui/'
            >
              <p className='text-orange-600'>@victorqui</p>
            </Link>

            <div className='flex flex-wrap gap-4 mt-3 text-gray-400 text-sm'>
              <div className='flex items-center gap-1'>
                <Place className='w-4 h-4' />
                Falcon, VE
              </div>
              <div className='flex items-center gap-1'>
                <Mail className='w-4 h-4' />
                victhorq716@gmail.com
              </div>
              <div className='flex items-center gap-1'>
                <CalendarMonth className='w-4 h-4' />
                Joined 2024
              </div>
            </div>
            <p className='mt-4'>
              Technology lover, with skills and experience in developing unique
              web applications.
            </p>
          </div>
          <Box className='w-full'>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  className='w-full bg-black border-b border-gray-800'
                  centered
                  sx={{ justifyContent: 'center' }}
                  textColor='secondary'
                  indicatorColor='secondary'
                  onChange={handleChange}
                  aria-label='lab API tabs example'
                >
                  <Tab
                    className='flex-1 font-semibold'
                    label='Home'
                    value='1'
                  />
                  <Tab
                    className='flex-1 font-semibold'
                    label='Projects'
                    value='2'
                  />
                  <Tab
                    className='flex-1 font-semibold'
                    label='Experience'
                    value='3'
                  />
                  <Tab className='flex-1 font-semibold' label='Me' value='4' />
                </TabList>
              </Box>
              <TabPanel sx={{ padding: 0 }} value='1'>
                <Feed />
              </TabPanel>
              <TabPanel sx={{ padding: 0 }} value='2'>
                {projects.map((project: any, i: any) => {
                  return (
                    <Projects
                      key={i}
                      project={project}
                      changeLang={changeLang}
                    />
                  )
                })}
              </TabPanel>
              <TabPanel sx={{ padding: 0 }} value='3'>
                <Experience />
              </TabPanel>
              <TabPanel sx={{ padding: 0 }} value='4'>
                <AboutMe />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </main>
    </Layout>
  )
}

export default Index
