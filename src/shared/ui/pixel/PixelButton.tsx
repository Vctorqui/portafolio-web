import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'solid' | 'ghost'

const variantClass: Record<Variant, string> = {
  solid: 'pixel-btn',
  ghost: 'pixel-btn pixel-btn--ghost',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function PixelButton({
  variant = 'solid',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${variantClass[variant]} ${className}`.trim()}
      {...props}
    />
  )
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
}

export function PixelLinkButton({
  variant = 'solid',
  className = '',
  ...props
}: LinkProps) {
  return (
    <a
      className={`${variantClass[variant]} no-underline ${className}`.trim()}
      {...props}
    />
  )
}
