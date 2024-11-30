import { Tweet } from './Tweet'

export const AboutMe = () => {
  return (
    <section className='about-me-section space-y-4 py-4'>
      <Tweet
        isPinned={true}
        content={`About me`}
        description={`👋🏻 I'm Victor Quiñones, FrontEnd Developer with experience in creating innovative and attractive user interfaces. Throughout my career, I have worked on a variety of projects both freelance and in the corporate environment.`}
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/profile.webp'}
        redirect={''}
        contentMg={''}
      />
      <Tweet
        isPinned={true}
        content={``}
        description={
          '🎯 My main goal is to keep improving and to be able to grow both personally and professionally. '
        }
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/profile.webp'}
        redirect={''}
        contentMg={''}
      />
      <Tweet
        isPinned={true}
        status='🎮⚽🎬Hobbies'
        content={`But what's beyond the code?`}
        description={
          'Besides coding, I love watching anime, movies, playing videogames, and playing soccer. One of my favorite teams is Barcelona, but the truth is that I started to like soccer because of watching Messi. As I mentioned, I love videogames, and my favorite game of all time is Uncharted. Sic parvis magna—Greatness from small beginnings. I always strive to live by that phrase in my life🚀'
        }
        name={'Victor'}
        userName={'@victorqui'}
        avatar={'/images/profile.webp'}
        redirect={''}
        contentMg={''}
      />
    </section>
  )
}
