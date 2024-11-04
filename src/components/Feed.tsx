import { useState, useEffect } from 'react'
import { Tweet } from './Tweet'

const QUOTE_RANDOM_ENDPOINT =
  'https://programming-quotesapi.vercel.app/api/random'

export const Feed = () => {
  const [programmingQuote, setProgrammingQuote] = useState<any>()
  const [quoteError, setQuoteError] = useState('')
  const [fadeTransition, setFadeTransition] = useState(true)

  useEffect(() => {
    const fetchQuote = () => {
      setFadeTransition(false)
      fetch(QUOTE_RANDOM_ENDPOINT)
        .then((res) => {
          if (!res.ok) {
            setQuoteError('Unavailable quote')
          }
          return res.json()
        })
        .then((quote) => {
          setProgrammingQuote(quote)
          setFadeTransition(true)
        })
    }
    fetchQuote()

    const intervalTime = setInterval(fetchQuote, 1800000)

    return () => clearInterval(intervalTime)
  }, [])
  return (
    <>
      <Tweet
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
        date={''}
        likes={0}
        retweets={0}
        replies={0}
        avatar={'/images/quote-img.jpg'}
        redirect={''}
        contentMg={''}
      />
      <Tweet
        content='Coming Soon DevDash: '
        image='/images/10.webp'
        date='pinned'
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
        date='pinned'
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
