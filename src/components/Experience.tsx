import { Language, Experience as ExperienceType } from '../types'
import { experiences } from '../constants'
import { Tweet } from './ui/Tweet'

export const Experience = ({ language }: { language: Language }) => {
  const shareMsg =
    language === 'es'
      ? 'Mira%20este%20perfil%21%20'
      : 'Check%20out%20this%20profile%21%20'

  return (
    <section className='experience-section space-y-4 py-4'>
      {experiences.map((exp: ExperienceType, index) => (
        <Tweet
          key={exp.id + index}
          name={exp.position}
          userName='@victorqui'
          content={exp.company}
          date={language === 'es' ? exp.spanish_date : exp.english_date}
          description={
            language === 'es'
              ? exp.spanish_description
              : exp.english_description
          }
          contentMg={shareMsg}
          status={language === 'es' ? 'EXPERIENCIA' : 'EXPERIENCE'}
          isPinned={index === 0} // Highlight current role
          showLikes={false}
          showLinkedIn={true}
          stack={exp.stacks.join(', ')}
          isLimitedShare={true}
          redirect={'https://www.linkedin.com/in/victorqui/'}
        />
      ))}
    </section>
  )
}
