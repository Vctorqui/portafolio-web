import { styled } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface LinkProps {
  children: any
  href: any
  additionalClassName?: string
}

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.secondary.main,
  transition: 'all .2s ease-out',
  fontWeight: 800,
  position: 'relative',
  pointerEvents:'all',
  '&:after': {
    content: '""',
    bottom: '-3px',
    width: '100%',
    height: '1px',
    position: 'absolute',
    borderRadius: '2px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    transition: 'all .2s ease-out',
    background: 'transparent',
  },
  '&:hover:after': {
    background: '#fff',
  },
  '&:hover': {
    color: theme.palette.text.secondary,
  },
}))

export const LinkBlockStyled = ({
  children,
  href,
  additionalClassName,
}: LinkProps) => {
  return (
    <LinkStyled href={href} className={additionalClassName}>
      {children}
    </LinkStyled>
  )
}
