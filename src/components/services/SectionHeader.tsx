type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
}

export const SectionHeader = ({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) => {
  return (
    <div className='mb-8 max-w-2xl'>
      <p className='mb-3 font-mono text-[10px] font-black uppercase tracking-[0.32em] text-cyan-400/80'>
        {eyebrow}
      </p>
      <h2 className='text-2xl font-black tracking-tight text-white md:text-4xl'>
        {title}
      </h2>
      {description && (
        <p className='mt-4 text-sm leading-7 text-slate-400 md:text-base'>
          {description}
        </p>
      )}
    </div>
  )
}
