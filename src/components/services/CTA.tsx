import Link from 'next/link'
import { MessageCircle, Mail } from 'lucide-react'
import { quoteHref, whatsappHref } from './data'

export const CTA = () => {
  return (
    <section className='px-4 pb-20 pt-8 md:pb-28'>
      <div className='mx-auto max-w-6xl overflow-hidden rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] p-6 shadow-2xl shadow-black/30 md:p-10'>
        <div className='grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center'>
          <div>
            <p className='mb-4 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300'>
              next.project
            </p>
            <h2 className='text-3xl font-black tracking-tight text-white md:text-5xl'>
              ¿Tienes un proyecto en mente?
            </h2>
            <p className='mt-5 max-w-2xl text-base leading-8 text-slate-300'>
              Cuéntame qué necesitas y te ayudo a convertirlo en una web
              profesional, rápida y enfocada en resultados.
            </p>
            <p className='mt-3 text-sm leading-6 text-slate-400'>
              También puedes escribirme para cotizar una landing, sitio
              corporativo o portafolio.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row lg:flex-col'>
            <Link
              href={whatsappHref}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-black text-[#080808] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#080808]'
            >
              <MessageCircle aria-hidden='true' className='h-4 w-4' />
              Contactar por WhatsApp
            </Link>
            <Link
              href={quoteHref}
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-400/40 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#080808]'
            >
              <Mail aria-hidden='true' className='h-4 w-4' />
              Enviar correo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
