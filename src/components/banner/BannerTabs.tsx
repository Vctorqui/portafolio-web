import { bannerLabels } from '../../constants/banner'
import { Language } from '../../types'

type BannerTabsProps = {
  language: Language
  activeTab: string
  onTabChange: (value: string) => void
}

const tabs = [
  { id: 'Projects', labelKey: 'projects' as const },
  { id: 'Experience', labelKey: 'experience' as const, bordered: true },
  { id: 'Me', labelKey: 'about' as const },
]

export function BannerTabs({
  language,
  activeTab,
  onTabChange,
}: BannerTabsProps) {
  return (
    <div className='flex border-t border-white/5 bg-black/40'>
      {tabs.map(({ id, labelKey, bordered }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 py-4 text-[10px] font-black tracking-[0.3em] transition-colors relative overflow-hidden group ${
              bordered ? 'border-x border-white/5' : ''
            } ${
              isActive
                ? 'text-cyan-400'
                : 'text-white/20 hover:text-white/40 hover:bg-white/5'
            }`}
          >
            {bannerLabels[language].tabs[labelKey]}
            {isActive && (
              <>
                <div className='absolute inset-0 bg-cyan-400/5' />
                <div className='absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' />
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
