import { Bot, X } from 'lucide-react'

export const ChatHeader = ({
  language,
  toggleChat,
}: {
  language: string
  toggleChat: () => void
}) => (
  <div className='p-5 flex items-center justify-between border-b border-white/5 bg-white/2 pb-4'>
    <div className='flex items-center gap-3'>
      <div className='relative'>
        <div className='w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20'>
          <Bot size={20} className='text-[#080808]' />
        </div>
        <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d0d0d]' />
      </div>
      <div>
        <h3 className='text-sm font-black text-white tracking-tight uppercase'>
          Victor AI
        </h3>
        <div className='flex items-center gap-1.5'>
          <span className='w-1 h-1 bg-cyan-400 rounded-full animate-pulse' />
          <p className='text-[10px] text-white/40 font-bold uppercase tracking-[0.1em]'>
            {language === 'es' ? 'Siempre activo' : 'Always active'}
          </p>
        </div>
      </div>
    </div>
    <button
      onClick={toggleChat}
      className='w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all'
    >
      <X size={18} />
    </button>
  </div>
)
