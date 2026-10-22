import React, { ReactNode } from 'react'
import { SEO } from '../shared/ui/SEO'

export const Layout = ({ children }: { children: ReactNode; sx?: unknown }) => {
  return (
    <>
      <SEO />
      {children}
    </>
  )
}
