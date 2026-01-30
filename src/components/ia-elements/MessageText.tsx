import { Streamdown } from 'streamdown'

export const MessageText = ({ text }: { text: string }) => {
  return (
    <div className='text-white/90 leading-relaxed'>
      <Streamdown>{text}</Streamdown>
    </div>
  )
}
