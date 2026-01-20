import { Tweet } from './shared/Tweet'

import { Language } from '../types'
import { aboutMeLabels } from '../constants'

export const AboutMe = ({ language }: { language: Language }) => {
  const t = aboutMeLabels[language]

  return (
    <section className='about-me-section space-y-4 py-4'>
      <Tweet
        isPinned={true}
        status={t.statusCareer}
        content={t.aboutLabel}
        description={t.about}
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/perfil_profile.webp'}
        contentMg={t.share}
        showLikes={false}
        showLinkedIn={true}
        isLimitedShare={true}
        redirect={'https://www.linkedin.com/in/victorqui/'}
      />
      <Tweet
        isPinned={true}
        content={t.statusGoals}
        status={'OBJECTIVES'}
        description={t.goals}
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/perfil_profile.webp'}
        contentMg={t.share}
        showLikes={false}
        showLinkedIn={true}
        isLimitedShare={true}
        redirect={'https://www.linkedin.com/in/victorqui/'}
      />
      <Tweet
        isPinned={true}
        status={t.statusHobbies}
        content={t.hobbiesLabel}
        description={t.hobbies}
        name={'Victor'}
        userName={'@victorqui'}
        avatar={'/images/perfil_profile.webp'}
        contentMg={t.share}
        showLikes={false}
        showLinkedIn={true}
        isLimitedShare={true}
        redirect={'https://www.linkedin.com/in/victorqui/'}
      />
    </section>
  )
}
