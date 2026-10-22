import type { ElementType, HTMLAttributes } from 'react'

type PixelFrameProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  tone?: 'default' | 'accent'
  raised?: boolean
}

export function PixelFrame({
  as: Tag = 'div',
  tone = 'default',
  raised = false,
  className = '',
  ...props
}: PixelFrameProps) {
  const classes = [
    'pixel-frame bg-paper-2',
    tone === 'accent' ? 'pixel-frame--accent' : '',
    raised ? 'pixel-frame--raised' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes} {...props} />
}
