import { useState, useEffect } from 'react'
import { Tweet } from './Tweet'

// const QUOTE_RANDOM_ENDPOINT =
//   'https://programming-quotesapi.vercel.app/api/rando'

const Feed = () => {
  const [programmingQuote, setProgrammingQuote] = useState<any>()
  // const [quoteError, setQuoteError] = useState('')
  // const [fadeTransition, setFadeTransition] = useState(true)

  // useEffect(() => {
  //   const fetchQuote = () => {
  //     setFadeTransition(false)
  //     fetch(QUOTE_RANDOM_ENDPOINT)
  //       .then((res) => {
  //         if (!res.ok) {
  //           setQuoteError('Unavailable quote')
  //         }
  //         return res.json()
  //       })
  //       .then((quote) => {
  //         setProgrammingQuote(quote)
  //         setFadeTransition(true)
  //       })
  //   }
  //   fetchQuote()

  //   const intervalTime = setInterval(fetchQuote, 1800000)

  //   return () => clearInterval(intervalTime)
  // }, [])
  return (
    <section className='home-section space-y-4 py-4'>
      <Tweet
        isPinned={true}
        content='Hello World!'
        description={
          'Welcome to my portfolio! This section is about the resources I have created or have been working on to help the community. If you want to know more about me and my projects. Click on another option tab👨🏻‍💻'
        }
        name={'Victor Q'}
        userName={'@victorqui'}
        avatar={'/images/profile-perfil.webp'}
        redirect={''}
        contentMg={''}
        status={`💪🏻 fellin' happy`}
      />
      <Tweet
        status={`🤔 Inspired `}
        content={
          programmingQuote
            ? `${programmingQuote?.author} said: `
            : 'John Resig said: '
        }
        description={
          programmingQuote
            ? `"${programmingQuote?.quote}"`
            : `"The best code is no code at all."`
        }
        name={'Programming Quotes'}
        userName={`@coduotes`}
        isPinned={true}
        avatar={'/images/quote-img.webp'}
        redirect={''}
        contentMg={''}
      />
      <Tweet
        status={`👨🏻‍💻 Nerdin'`}
        content='Autocomplete with React'
        image='/images/resource.png'
        description={`A component created with React.js without dependencies. Contribution to the community 👨🏻‍💻 #webdev #react #frontend`}
        name={'Victor Quiñones'}
        userName={'@victorqui'}
        avatar={'/images/profile.webp'}
        redirect={
          'https://www.linkedin.com/feed/update/urn:li:activity:7236463247086817280/?originTrackingId=0PzrOrkjSze8SrEnJYTbPA%3D%3D'
        }
        contentMg={'¡Mira%20este%20componente%21%20'}
      />
    </section>
  )
}

export default Feed
