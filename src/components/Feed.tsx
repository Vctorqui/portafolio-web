import { Tweet } from './Tweet'

export const Feed = () => {
  return (
    <>
      <Tweet
        content='Coming Soon DevDash: '
        image='/images/10.webp'
        date='2h'
        likes={0}
        retweets={0}
        replies={0}
        description={
          'A website where you can find tips and tools for frontend developers for registered users.!🚀 #webdev #next.js #express.js #mongodb #docker'
        }
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/profile.webp'}
        redirect={''}
        contentMg={'¡Mira%20este%20proyecto%21%20'}
      />
      <Tweet
        content='Autocomplete with React'
        image='/images/resource.png'
        date='2mo'
        likes={0}
        retweets={0}
        replies={0}
        description={`A component created with React.js without dependencies. Contribution to the community 👨🏻‍💻 #webdev #react #frontend`}
        name={'Victor Quiñones'}
        userName={'@victorqui'}
        avatar={'/images/profile.webp'}
        redirect={
          'https://www.linkedin.com/feed/update/urn:li:activity:7236463247086817280/?originTrackingId=0PzrOrkjSze8SrEnJYTbPA%3D%3D'
        }
        contentMg={'¡Mira%20este%20componente%21%20'}
      />
    </>
  )
}
