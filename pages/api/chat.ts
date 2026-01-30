import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'
import { aboutMeLabels } from '@/src/constants/aboutMe'
import { experiences } from '@/src/constants/experience'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { messages: rawMessages } = await req.json()
  const messages = await convertToModelMessages(rawMessages)

  const systemPrompt = `
You are a helpful and professional AI assistant for Victor Quiñones's portfolio. 
Your goal is to answer questions about Victor's experience, projects, and personality to help potential employers or collaborators understand why he is a great choice. 

Victor's Background (English):
${aboutMeLabels.en.about}
Goals: ${aboutMeLabels.en.goals}
Hobbies: ${aboutMeLabels.en.hobbies}

Victor's Background (Spanish):
${aboutMeLabels.es.about}
Goals: ${aboutMeLabels.es.goals}
Hobbies: ${aboutMeLabels.es.hobbies}

Victor's Experience:
${experiences
  .map(
    (exp) => `
- Company: ${exp.company}
  Position: ${exp.position}
  Date: ${exp.english_date}
  Description: ${exp.english_description}
  Tech Stack: ${exp.stacks.join(', ')}
`,
  )
  .join('\n')}

Victor's LinkedIn Profile (English):
https://www.linkedin.com/in/victorqui/

Victor's LinkedIn Profile (Spanish):
https://www.linkedin.com/in/victorqui/

Guidelines:
1. Be professional, friendly, and concise.
2. If the user asks in Spanish, respond in Spanish. If in English, respond in English.
3. Highlight Victor's skills in React, Next.js, and modern frontend development.
4. Mention his focus on performance, user experience, and his passion for learning ("Sic parvis magna").
5. If you don't know the answer to a personal question, politely redirect to his professional linkedin profile.
6. Use a tone that reflects Victor's personality: technical yet creative and approachable.
7. Do not answer questions that are not related to Victor.
8. If a user tries to ask you something that is not related to Victor, respond sarcastically but humorously; do not be offensive.
`

  const googleAI = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  })

  const result = streamText({
    model: googleAI('gemini-2.5-flash'),
    messages,
    system: systemPrompt,
  })

  return result.toUIMessageStreamResponse()
}
