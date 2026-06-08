import { SectionHeader } from './SectionHeader'
import { audiences, benefits } from './data'

export const Benefits = () => {
  return (
    <section className='px-4 py-14 md:py-20'>
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.85fr]'>
        <div>
          <SectionHeader
            eyebrow='benefits'
            title='Lo esencial para lanzar bien y seguir creciendo'
            description='La base del sitio queda preparada para captar contactos, medir resultados y sumar nuevas funcionalidades cuando lo necesites.'
          />

          <div className='grid gap-3 sm:grid-cols-2'>
            {benefits.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className='flex min-h-16 items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-4 py-3'
              >
                <Icon aria-hidden='true' className='h-5 w-5 shrink-0 text-cyan-300' />
                <span className='text-sm font-medium text-slate-200'>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className='rounded-lg border border-white/10 bg-[#0b0b0b]/80 p-5'>
          <p className='mb-5 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400/80'>
            para quien es
          </p>
          <div className='space-y-3'>
            {audiences.map((audience) => (
              <div
                key={audience}
                className='flex items-start gap-3 rounded-md border border-white/10 bg-black/20 p-3'
              >
                <span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.55)]' />
                <p className='text-sm leading-6 text-slate-300'>{audience}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
