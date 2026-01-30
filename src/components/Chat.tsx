'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Sparkles } from 'lucide-react'
import { ChatHeader } from './ia-elements/ChatHeader'
import { ChatInput } from './ia-elements/ChatInput'
import { ChatMessage } from './ia-elements/ChatMessage'
import { ChatLoader } from './ia-elements/ChatLoader'

interface ChatProps {
  language: 'en' | 'es'
}

export const Chat = ({ language }: ChatProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { messages, sendMessage, status, regenerate } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, status])

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || status === 'submitted') return

    sendMessage({ text: inputValue })
    setInputValue('')
  }

  // Show tooltip for first few seconds
  const [showTooltip, setShowTooltip] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <div className='relative'>
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
          }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          onMouseEnter={() => setShowTooltip(true)}
          className='bg-[#22d3ee] text-[#080808] p-4 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)] flex items-center justify-center hover:bg-[#06b6d4] transition-all duration-300 relative'
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>

        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className='absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#0B192C]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-2xl whitespace-nowrap border border-cyan-400/20'
            >
              <div className='text-sm font-semibold flex items-center gap-2'>
                <Sparkles size={14} className='text-cyan-400' />
                {language === 'es'
                  ? 'Pregúntame sobre Víctor'
                  : 'Ask me about Victor'}
              </div>
              <div className='absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#0B192C]/90' />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              transformOrigin: 'bottom right',
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className='absolute bottom-20 right-0 w-[350px] sm:w-[420px] h-[550px] bg-[#080808]/80 border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20y_rgba(34,211,238,0.1)] flex flex-col overflow-hidden backdrop-blur-2xl'
          >
            <ChatHeader language={language} toggleChat={toggleChat} />

            <div className='flex-1 overflow-y-auto scrollbar-hide p-6 space-y-6'>
              {messages.length === 0 && (
                <div className='text-center py-12 px-6'>
                  <div className='w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/5'>
                    <Sparkles className='text-cyan-400/50' />
                  </div>
                  <p className='text-white/60 text-sm font-medium leading-relaxed italic'>
                    {language === 'es'
                      ? '¡Hola! Soy la IA de Víctor. Pregúntame sobre su experiencia, habilidades o proyectos.'
                      : "Hi! I'm Victor's AI. Ask me about his experience, skills, or projects."}
                  </p>
                </div>
              )}

              {messages.map((m) => (
                <ChatMessage
                  key={m.id}
                  m={m}
                  language={language}
                  regenerate={() => regenerate()}
                />
              ))}

              {status === 'submitted' && <ChatLoader language={language} />}
              <div ref={messagesEndRef} />
            </div>

            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
              status={status}
              placeholderText={
                language === 'es'
                  ? 'Pregunta algo sobre Víctor...'
                  : 'Ask something about Victor...'
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
