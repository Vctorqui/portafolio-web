import { LucideIcon } from 'lucide-react'

type ServiceCardProps = {
  title: string
  description: string
  icon: LucideIcon
}

export const ServiceCard = ({
  title,
  description,
  icon: Icon,
}: ServiceCardProps) => {
  return (
    <article className='group rounded-lg border border-white/10 bg-[#0b0b0b]/80 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]'>
      <div className='mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition group-hover:border-cyan-400/50 group-hover:text-cyan-200'>
        <Icon aria-hidden='true' className='h-5 w-5' />
      </div>
      <h3 className='text-lg font-bold text-white'>{title}</h3>
      <p className='mt-3 text-sm leading-6 text-slate-400'>{description}</p>
    </article>
  )
}
