import { Tweet } from './Tweet'

export const AboutMe = () => {
  return (
    <section className='about-me-section space-y-4 py-4'>
      <Tweet
        isPinned={true}
        status='💼Career path'
        content={`About me`}
        description={`👋🏻 I'm Victor Quiñones. Frontend Developer dedicated to crafting innovative and visually stunning user interfaces.  Throughout my career, I've worked on a wide array of projects, both freelance and within corporate environments. With each project, I've sharpened my skills and delivered solutions that consistently meet and often exceed client expectations. Let's create something extraordinary together!`}
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/profile-perfil.webp'}
        redirect={''}
        contentMg={''}
      />
      <Tweet
        isPinned={true}
        content={``}
        status='🎯Goals'
        description={
          'My main goal is to continue to develop. I want to enhance both my personal and professional growth, and find the best version of myself. Always mindful of who I am now, proud of all that I have achieved, and excited about who I want to be in the next five years and all that I will achieve.'
        }
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/profile-perfil.webp'}
        redirect={''}
        contentMg={''}
      />
      <Tweet
        isPinned={true}
        status='🎮⚽🎬Hobbies'
        content={`But what's beyond the code?`}
        description={
          'Besides coding, I love watching anime, movies, playing videogames, and playing soccer. One of my favorite teams is Barcelona, but the truth is that I started to like soccer because of watching Messi. As I mentioned, I love videogames, and my favorite game of all time is Uncharted. Sic parvis magna—Greatness from small beginnings. I always strive to live by that phrase in my life🚀.'
        }
        name={'Victor'}
        userName={'@victorqui'}
        avatar={'/images/profile-perfil.webp'}
        redirect={''}
        contentMg={''}
      />
    </section>
  )
}
