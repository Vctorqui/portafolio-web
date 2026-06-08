import Link from 'next/link'
import { Check, Send } from 'lucide-react'
import { packages, quoteHref } from './data'
import { SectionHeader } from './SectionHeader'

export const Packages = () => {
  return (
    <section className='border-y border-white/10 bg-slate-950/30 px-4 py-14 md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <SectionHeader
          eyebrow='packages'
          title='Paquetes base para partir con una cotización clara'
          description='No son plantillas cerradas. Son puntos de partida para definir alcance, contenido y prioridades de tu web.'
        />

        <div className='grid gap-4 lg:grid-cols-3'>
          {packages.map((item) => (
            <article
              key={item.name}
              className={`flex rounded-lg border p-5 ${
                item.featured
                  ? 'border-cyan-400/40 bg-cyan-400/[0.06]'
                  : 'border-white/10 bg-[#0b0b0b]/80'
              }`}
            >
              <div className='flex w-full flex-col'>
                <p className='font-mono text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300'>
                  {item.tag}
                </p>
                <h3 className='mt-4 text-xl font-black text-white'>{item.name}</h3>
                <p className='mt-3 text-sm leading-6 text-slate-400'>
                  {item.description}
                </p>
                <ul className='mt-6 flex-1 space-y-3'>
                  {item.features.map((feature) => (
                    <li key={feature} className='flex items-start gap-3'>
                      <Check
                        aria-hidden='true'
                        className='mt-0.5 h-4 w-4 shrink-0 text-cyan-300'
                      />
                      <span className='text-sm text-slate-300'>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={quoteHref}
                  className='mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-white transition hover:border-cyan-400/40 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#080808]'
                >
                  Cotizar
                  <Send aria-hidden='true' className='h-4 w-4' />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
