import { SectionHeader } from './SectionHeader'
import { processSteps } from './data'

export const Process = () => {
  return (
    <section className='border-y border-white/10 bg-slate-950/30 px-4 py-14 backdrop-blur-sm md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <SectionHeader
          eyebrow='process'
          title='Un proceso simple para llevar tu idea a la web'
        />

        <div className='grid gap-4 md:grid-cols-4'>
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className='relative rounded-lg border border-white/10 bg-[#0b0b0b]/80 p-5'
            >
              <span className='font-mono text-xs font-black text-cyan-300'>
                0{index + 1}
              </span>
              <h3 className='mt-5 text-lg font-bold text-white'>{step.title}</h3>
              <p className='mt-3 text-sm leading-6 text-slate-400'>
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
