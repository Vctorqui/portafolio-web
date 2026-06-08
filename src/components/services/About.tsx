import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { profileLinks } from './data'
import { SectionHeader } from './SectionHeader'

export const About = () => {
  return (
    <section className='px-4 py-14 md:py-20'>
      <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-center'>
        <div className='relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0b0b]/80 p-5'>
          <div className='relative mx-auto aspect-square max-w-sm overflow-hidden rounded-lg border border-white/10 bg-cyan-400/5'>
            <Image
              src='/images/perfil_profile.webp'
              alt='Victor Quiñones, Frontend Developer'
              fill
              sizes='(max-width: 768px) 80vw, 360px'
              className='object-cover'
            />
          </div>
          <div className='mt-5 rounded-md border border-cyan-400/20 bg-cyan-400/[0.04] p-4'>
            <p className='font-mono text-xs text-cyan-300'>
              profile.role = "Frontend Developer"
            </p>
            <p className='mt-2 text-sm leading-6 text-slate-400'>
              Interfaces modernas, sitios rápidos y experiencias web pensadas
              para usuarios reales.
            </p>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow='trust'
            title='Una extensión directa de mi trabajo como frontend developer'
          />
          <p className='text-base leading-8 text-slate-300'>
            Soy Victor Quiñones, Frontend Developer. Desarrollo interfaces
            modernas con tecnologías como Next.js, React y TypeScript,
            enfocándome en crear sitios rápidos, claros y fáciles de usar.
          </p>
          <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            {profileLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className='inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white transition hover:border-cyan-400/40 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#080808]'
              >
                <Icon aria-hidden='true' className='h-4 w-4' />
                {label}
                <ArrowUpRight aria-hidden='true' className='h-4 w-4' />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
