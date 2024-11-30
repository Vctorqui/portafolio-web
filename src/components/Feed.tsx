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
        status={`✍🏻 Spanish Article`}
        content='How to improve your programming logic and not cry in the attempt?🥲'
        description={`Tips on how to improve our logic, but also how to deal with those problems taking into account other aspects. I hope you like it and keep on improving!👨🏻‍💻 `}
        name={'Victor Quiñones'}
        date='23 Nov'
        image='/images/article.webp'
        userName={'@victorqui'}
        avatar={'/images/profile-perfil.webp'}
        redirect={
          'https://www.linkedin.com/pulse/c%C3%B3mo-mejorar-tu-l%C3%B3gica-de-programaci%C3%B3n-y-llorar-en-el-victor-qui%C3%B1ones-ujspe/?trackingId=LqeYQTwuT5a90r6MNNwNeA%3D%3D'
        }
        contentMg={'¡Mira%20este%20articulo%21%20'}
      />
      <Tweet
        status={`👨🏻‍💻 Nerdin'`}
        content='Autocomplete with React'
        image='/images/resource.png'
        description={`A component created with React.js without dependencies. Contribution to the community 👨🏻‍💻 #webdev #react #frontend`}
        name={'Victor Quiñones'}
        userName={'@victorqui'}
        avatar={'/images/profile-perfil.webp'}
        redirect={
          'https://www.linkedin.com/feed/update/urn:li:activity:7236463247086817280/?originTrackingId=0PzrOrkjSze8SrEnJYTbPA%3D%3D'
        }
        contentMg={'¡Mira%20este%20componente%21%20'}
      />
    </section>
  )
}

export default Feed
