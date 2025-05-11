import { Tweet } from './Tweet'

export const AboutMe = () => {
  return (
    <section className='about-me-section space-y-4 py-4'>
      <Tweet
        isPinned={true}
        status='💼 Career path'
        content={`About me`}
        description={`👋🏻 I'm <span class="font-bold text-[#EF5A6F]">Victor Quiñones</span>, a passionate <span class="font-bold text-[#EF5A6F]">Frontend Developer</span> focused on creating elegant and high-performance web applications. I specialize in <span class="font-bold text-[#EF5A6F]">React.js</span> and <span class="font-bold text-[#EF5A6F]">Next.js</span>, combining technical expertise with creative problem-solving to deliver exceptional digital experiences.`}
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
          `My mission is to continuously evolve as a <span class="font-bold text-[#EF5A6F]">developer</span>, pushing the boundaries of <span class="font-bold text-[#EF5A6F]">web development</span> while focusing on <span class="font-bold text-[#EF5A6F]">user experience</span> and <span class="font-bold text-[#EF5A6F]">performance</span>. I aim to master <span class="font-bold text-[#EF5A6F]">emerging technologies</span> and contribute to <span class="font-bold text-[#EF5A6F]">innovative projects</span> that make a real impact.`
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
          `When I'm not coding, I'm an avid enthusiast of <span class="font-bold text-[#EF5A6F]">anime</span> and <span class="font-bold text-[#EF5A6F]">cinema</span>. <span class="font-bold text-[#EF5A6F]">Gaming</span> is another passion, with <span class="font-bold text-[#EF5A6F]">Uncharted</span>'s motto "<span class="font-bold text-[#EF5A6F]">Sic parvis magna</span>" (Greatness from small beginnings) resonating with my philosophy. As a soccer fan, I follow <span class="font-bold text-[#EF5A6F]">Barcelona</span> and admire <span class="font-bold text-[#EF5A6F]">Messi's</span> dedication. These interests bring creative insights to my development work 🚀`
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
