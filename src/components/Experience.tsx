import { experiences } from '../utils/const'
import { experienceTypes } from '../types/types'
import { Tweet } from './Tweet'

export const Experience = () => {
  return (
    <section className='experience-section space-y-4 py-4'>
      {experiences.map((exp: experienceTypes, i: number) => (
        <>
          <Tweet
            key={i}
            content={exp.position}
            date={exp.english_date}
            description={exp.english_description}
            avatar={''}
            name={exp.company}
            userName={''}
            isPinned={true}
            redirect={'https://www.linkedin.com/in/victorqui/'}
            contentMg={'¡Mira%20este%20perfil%21%20'}
          />
        </>
      ))}
    </section>
  )
}
