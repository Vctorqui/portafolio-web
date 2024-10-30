import { Tweet } from './Tweet'

export const AboutMe = () => {
  return (
    <>
      <Tweet
        content={`About me`}
        description={`👋🏻 Hey, I'm Victor Quiñones, a passionate Front-end Developer based in Venezuela.Throughout my career, I have had the opportunity to participate in more than 8 projects with different clients, , where I have designed and implemented attractive and functional interfaces. My focus is on creating intuitive and accessible user  experiences.`}
        name={'Victor Q'}
        userName={'@victorqui'}
        date={'pinned'}
        likes={0}
        retweets={0}
        replies={0}
        avatar={'/images/profile.webp'}
        redirect={''}
        contentMg={''}
      />
      <Tweet
        content={``}
        description={
          '🎯 My main goal is to keep improving, and be able to help new entrepreneurs, small companies and big startups to reach bigger markets.'
        }
        name={'Victor Q'}
        userName={'@victorqui'}
        date={'pinned'}
        likes={0}
        retweets={0}
        replies={0}
        avatar={'/images/profile.webp'}
        redirect={''}
        contentMg={''}
      />
      <Tweet
        content={`But what's beyond the code?`}
        description={
          'Besides coding, I love to play videogames, watch anime, learn about the latest technology tends, and create resources to help other frontend developers🚀'
        }
        name={'Victor'}
        userName={'@victorqui'}
        date={'pinned'}
        likes={0}
        retweets={0}
        replies={0}
        avatar={'/images/profile.webp'}
        redirect={''}
        contentMg={''}
      />
    </>
  )
}
