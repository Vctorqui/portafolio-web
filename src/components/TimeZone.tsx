'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, CloudSun, Moon, LucideIcon } from 'lucide-react'
import { Language } from '../types'
import { bannerLabels } from '../constants'

export function TimeZone({ language }: { language: Language }) {
  const [myTime, setMyTime] = useState<string>('')
  const [myDay, setMyDay] = useState<string>('')
  const [hour, setHour] = useState<number>(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Venezuela timezone
      const myFormatter = new Intl.DateTimeFormat(
        language === 'es' ? 'es-VE' : 'en-US',
        {
          timeZone: 'America/Caracas',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        },
      )
      const myDayFormatter = new Intl.DateTimeFormat(
        language === 'es' ? 'es-VE' : 'en-US',
        {
          timeZone: 'America/Caracas',
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        },
      )

      const caracasHour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Caracas',
          hour: 'numeric',
          hour12: false,
        }).format(now),
      )

      setMyTime(myFormatter.format(now))
      setMyDay(myDayFormatter.format(now))
      setHour(caracasHour)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [language])

  const timeTheme = useMemo(() => {
    if (hour >= 6 && hour < 12) {
      return {
        Icon: Sun,
        color: 'text-amber-400',
        bg: 'bg-amber-400/10',
        border: 'border-amber-400/20',
        glow: 'shadow-[0_0_12px_rgba(251,191,36,0.5)]',
        pulse: 'bg-amber-400',
        hover: 'group-hover:bg-amber-400/20',
        hoverBorder: 'hover:border-amber-400/30',
      }
    } else if (hour >= 12 && hour < 18) {
      return {
        Icon: CloudSun,
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        border: 'border-orange-400/20',
        glow: 'shadow-[0_0_12px_rgba(251,146,60,0.5)]',
        pulse: 'bg-orange-400',
        hover: 'group-hover:bg-orange-400/20',
        hoverBorder: 'hover:border-orange-400/30',
      }
    } else {
      return {
        Icon: Moon,
        color: 'text-indigo-400',
        bg: 'bg-indigo-400/10',
        border: 'border-indigo-400/20',
        glow: 'shadow-[0_0_12px_rgba(129,140,248,0.5)]',
        pulse: 'bg-indigo-400',
        hover: 'group-hover:bg-indigo-400/20',
        hoverBorder: 'hover:border-indigo-400/30',
      }
    }
  }, [hour])

  if (!myTime) return null

  const { Icon, color, bg, border, glow, pulse, hover, hoverBorder } = timeTheme

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-3 bg-[#080808]/40 backdrop-blur-xl border border-white/5 rounded-2xl px-4 py-2 transition-all duration-500 group ${hoverBorder}`}
    >
      <div className='relative shrink-0'>
        <div
          className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center border ${border} ${hover} transition-colors overflow-hidden`}
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={
                hour >= 6 && hour < 12
                  ? 'morning'
                  : hour >= 12 && hour < 18
                    ? 'afternoon'
                    : 'night'
              }
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
            >
              <Icon className={`w-4 h-4 ${color}`} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 ${pulse} rounded-full ${glow} animate-pulse`}
        />
      </div>
      <div className='flex flex-col'>
        <div className='text-[9px] font-bold text-white/40 tracking-tighter uppercase'>
          {bannerLabels[language].myTimeLabel}
        </div>
        <div className='text-sm font-black text-white tracking-widest font-mono uppercase'>
          {myTime}
        </div>
        <div className='text-[8px] font-bold text-white/40 tracking-tighter uppercase'>
          {myDay} • VET (UTC-4)
        </div>
      </div>
    </motion.div>
  )
}
