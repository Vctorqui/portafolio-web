type BannerDogSceneProps = {
  className?: string
}

export function BannerDogScene({ className = '' }: BannerDogSceneProps) {
  return (
    <div
      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-cyan-300/10 shadow-lg shadow-cyan-500/10 sm:h-20 sm:w-20 md:h-24 md:w-24 ${className}`}
    >
      <iframe
        title='Perrito 3D'
        src='/perrito-widget.html'
        loading='lazy'
        tabIndex={-1}
        className='h-full w-full border-0'
      />
    </div>
  )
}
