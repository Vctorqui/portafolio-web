import { MessageText } from './MessageText'
import { memo } from 'react'
import { RefreshCcwIcon, CopyIcon } from 'lucide-react'

export const ChatMessage = memo(
  ({
    m,
    language,
    regenerate,
  }: {
    m: any
    language: string
    regenerate: () => void
  }) => {
    return (
      <div
        className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}
      >
        {m.parts.map((part: any, index: number) => {
          if (part.type === 'text') {
            return (
              <div
                key={`${m.id}-${index}`}
                className={`max-w-[85%] p-4 text-sm rounded-2xl shadow-sm ${
                  m.role === 'user'
                    ? 'bg-white/5 text-white border border-white/10 rounded-tr-none'
                    : 'bg-[#1E3E62]/20 text-white border-l-2 border-l-cyan-400 rounded-tl-none'
                }`}
              >
                <MessageText text={part.text} />
              </div>
            )
          }
          return null
        })}

        {m.role === 'assistant' && (
          <div className='flex gap-3 px-1'>
            <button
              onClick={regenerate}
              className='text-white/20 hover:text-cyan-400 transition-colors p-1'
              title={language === 'es' ? 'Regenerar' : 'Regenerate'}
            >
              <RefreshCcwIcon className='size-3.5' />
            </button>
            <button
              onClick={() => {
                const text = m.parts
                  .filter((p: any) => p.type === 'text')
                  .map((p: any) => p.text)
                  .join('\n')
                navigator.clipboard.writeText(text)
              }}
              className='text-white/20 hover:text-cyan-400 transition-colors p-1'
              title={language === 'es' ? 'Copiar' : 'Copy'}
            >
              <CopyIcon className='size-3.5' />
            </button>
          </div>
        )}
      </div>
    )
  },
)
ChatMessage.displayName = 'ChatMessage'
