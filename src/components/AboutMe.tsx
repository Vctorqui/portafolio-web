import { Tweet } from './Tweet'

export const AboutMe = () => {
  return (
    <section className='about-me-section space-y-4 py-4'>
      <Tweet
        isPinned={true}
        status='💼 Career path'
        content={`About me`}
        description={`👋🏻 I'm Victor Quiñones, a passionate Frontend Developer with a keen eye for creating elegant and high-performance web applications. With extensive experience in both corporate and freelance environments, I specialize in building scalable solutions using modern technologies like React.js and Next.js. My approach combines technical expertise with creative problem-solving, consistently delivering products that not only meet but exceed client expectations. Let's collaborate to bring your digital vision to life!`}
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/perfil_profile.webp'}
        redirect={'https://www.linkedin.com/in/victorqui/'}
        contentMg={'¡Mira%20este%20perfil%21%20'}
      />
      <Tweet
        isPinned={true}
        content={``}
        status='🎯 Goals'
        description={
          `My mission is to continuously evolve as a developer and as a person. I'm committed to pushing the boundaries of what's possible in web development while maintaining a strong focus on user experience and performance. I take pride in my current achievements while staying ambitious about future growth. In the next five years, I aim to master emerging technologies and contribute to innovative projects that make a real impact in the digital world.`
        }
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/perfil_profile.webp'}
        redirect={'https://www.linkedin.com/in/victorqui/'}
        contentMg={'¡Mira%20este%20perfil%21%20'}
      />
      <Tweet
        isPinned={true}
        status='🎮⚽🎬 Hobbies'
        content={`Beyond the Code`}
        description={
          `When I'm not coding, I'm an avid enthusiast of anime and cinema, finding inspiration in storytelling and visual design. Gaming is another passion of mine, with Uncharted holding a special place in my heart - its motto "Sic parvis magna" (Greatness from small beginnings) resonates deeply with my personal philosophy. As a soccer fan, I follow Barcelona and admire Messi's dedication to excellence. These diverse interests help me maintain a balanced perspective and bring creative insights to my development work 🚀`
        }
        name={'Victor'}
        userName={'@victorqui'}
        avatar={'/images/perfil_profile.webp'}
        redirect={'https://www.linkedin.com/in/victorqui/'}
        contentMg={'¡Mira%20este%20perfil%21%20'}
      />
    </section>
  )
}
