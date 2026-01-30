export const ChatLoader = ({ language }: { language: string }) => (
  <div className='flex items-center gap-2 text-cyan-400/50 italic text-xs'>
    <div className='flex gap-1'>
      <span className='w-1 h-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]' />
      <span className='w-1 h-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]' />
      <span className='w-1 h-1 bg-cyan-400 rounded-full animate-bounce' />
    </div>
    {language === 'es'
      ? 'Víctor IA está pensando...'
      : 'Victor AI is thinking...'}
  </div>
)
