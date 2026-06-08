import Link from 'next/link'
import { ArrowDown, ArrowRight, Terminal } from 'lucide-react'
import { heroSignals, quoteHref, systemStats } from './data'

export const Hero = () => {
  return (
    <section className='relative overflow-hidden px-4 pb-16 pt-8 md:pb-24 md:pt-14'>
      <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
        <div>
          <div className='mb-6 inline-flex max-w-full items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200'>
            <Terminal aria-hidden='true' className='h-4 w-4 shrink-0' />
            <span>Frontend Developer · Next.js · React · TypeScript</span>
          </div>

          <h1 className='max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl'>
            Desarrollo sitios web modernos para negocios, profesionales y
            marcas personales
          </h1>

          <p className='mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg'>
            Landing pages, sitios corporativos y portafolios diseñados para
            verse bien, cargar rápido y ayudarte a conseguir más clientes.
          </p>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <Link
              href={quoteHref}
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-black text-[#080808] shadow-[0_0_28px_rgba(34,211,238,0.22)] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#080808]'
            >
              Solicitar cotización
              <ArrowRight aria-hidden='true' className='h-4 w-4' />
            </Link>
            <Link
              href='#services'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-400/40 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#080808]'
            >
              Ver servicios
              <ArrowDown aria-hidden='true' className='h-4 w-4' />
            </Link>
          </div>
        </div>

        <aside
          aria-label='Resumen del sistema de servicios'
          className='rounded-lg border border-white/10 bg-[#080808]/90 shadow-2xl shadow-black/30'
        >
          <div className='flex items-center gap-2 border-b border-white/10 px-4 py-3'>
            <span className='h-2.5 w-2.5 rounded-full bg-[#ef5a6f]' />
            <span className='h-2.5 w-2.5 rounded-full bg-yellow-300' />
            <span className='h-2.5 w-2.5 rounded-full bg-cyan-300' />
            <span className='ml-2 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500'>
              services.pipeline
            </span>
          </div>
          <div className='space-y-5 p-5'>
            <div className='grid grid-cols-2 gap-3'>
              {heroSignals.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className='rounded-md border border-white/10 bg-white/[0.03] p-4'
                >
                  <Icon aria-hidden='true' className='mb-4 h-5 w-5 text-cyan-300' />
                  <p className='font-mono text-[10px] font-black uppercase tracking-[0.24em] text-slate-500'>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className='rounded-md border border-cyan-400/20 bg-cyan-400/[0.04] p-4'>
              <p className='font-mono text-xs text-cyan-300'>
                deploy.ready = true
              </p>
              <div className='mt-4 space-y-3'>
                {systemStats.map((stat) => (
                  <div
                    key={stat.label}
                    className='flex items-start justify-between gap-4 text-sm'
                  >
                    <span className='font-mono text-slate-500'>{stat.label}</span>
                    <span className='text-right font-medium text-slate-200'>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
