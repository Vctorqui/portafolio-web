import React, { ReactNode } from 'react'
import { SEO } from '../components/SEO'

export const Layout = ({ children }: { children: ReactNode; sx?: unknown }) => {
  return (
    <>
      <SEO />
      {children}
    </>
  )
}
