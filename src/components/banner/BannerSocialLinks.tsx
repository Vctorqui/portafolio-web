import Link from 'next/link'
import { GitHub, LinkedIn, Mail } from '@mui/icons-material'
import { LuCodepen } from 'react-icons/lu'
import { FileText } from 'lucide-react'
import { bannerLabels } from '../../constants/banner'
import { Language } from '../../types'
import { TooltipStyled } from '../shared/TooltipStyled'

type BannerSocialLinksProps = {
  language: Language
}

export function BannerSocialLinks({ language }: BannerSocialLinksProps) {
  const socialLinks = [
    {
      id: 'linkedin',
      icon: <LinkedIn className='w-4 h-4' />,
      href: 'https://www.linkedin.com/in/victorqui/',
      tooltip: bannerLabels[language].social.linkedinTip,
    },
    {
      id: 'github',
      icon: <GitHub className='w-4 h-4' />,
      href: 'https://github.com/Vctorqui',
      tooltip: bannerLabels[language].social.githubTip,
    },
    {
      id: 'codepen',
      icon: <LuCodepen className='w-4 h-4' />,
      href: 'https://codepen.io/vichorq',
      tooltip: bannerLabels[language].social.codepenTip,
    },
  ]

  return (
    <div className='flex flex-wrap gap-x-4 gap-y-2 mb-6 text-white/40 text-[10px] font-bold uppercase tracking-wider'>
      <TooltipStyled title={bannerLabels[language].social.resumeTip}>
        <Link
          href={
            language === 'es'
              ? '/Victor_Quinones_Frontend_CV.pdf'
              : '/Victor_Quinones_Frontend_Resume.pdf'
          }
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 hover:text-cyan-400 transition-all duration-300 group'
        >
          <span className='group-hover:scale-110 transition-transform'>
            <FileText className='w-4 h-4' />
          </span>
          <span></span>
        </Link>
      </TooltipStyled>
      {socialLinks.map((link) => (
        <TooltipStyled key={link.id} title={link.tooltip}>
          <Link
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 hover:text-cyan-400 transition-all duration-300 group'
          >
            <span className='group-hover:scale-110 transition-transform'>
              {link.icon}
            </span>
          </Link>
        </TooltipStyled>
      ))}
      <TooltipStyled title={bannerLabels[language].social.emailTip}>
        <Link
          href='mailto:victor.quinones.ch@gmail.com'
          aria-label={bannerLabels[language].social.emailTip}
          className='flex items-center gap-2 hover:text-cyan-400 transition-all duration-300 cursor-pointer group'
        >
          <span className='group-hover:scale-110 transition-transform'>
            <Mail className='w-4 h-4' />
          </span>
          <span></span>
        </Link>
      </TooltipStyled>
    </div>
  )
}
