import { SendHorizontal } from 'lucide-react'

export const ChatInput = ({
  inputValue,
  setInputValue,
  handleSubmit,
  status,
  placeholderText,
}: {
  inputValue: string
  setInputValue: (v: string) => void
  handleSubmit: (e: React.FormEvent) => void
  status: string
  placeholderText: string
}) => (
  <div className='p-6 pt-2 bg-gradient-to-t from-[#080808] to-transparent'>
    <form
      onSubmit={handleSubmit}
      className='bg-white/5 rounded-2xl border border-white/10 focus-within:border-cyan-400/40 transition-all duration-300 min-h-[50px] flex items-center px-4 gap-2'
    >
      <textarea
        rows={1}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
        value={inputValue}
        placeholder={placeholderText}
        className='bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none resize-none flex-1 py-3 max-h-32 scrollbar-hide'
      />
      <button
        type='submit'
        disabled={!inputValue.trim() || status === 'submitted'}
        className='bg-cyan-400 text-[#080808] w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-400/20 disabled:opacity-50 disabled:hover:scale-100'
      >
        <SendHorizontal size={18} />
      </button>
    </form>
  </div>
)
