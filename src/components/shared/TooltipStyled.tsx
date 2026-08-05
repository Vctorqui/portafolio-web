import { styled } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

export const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--color-ink)',
    color: 'var(--color-paper)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6875rem',
    fontWeight: 400,
    letterSpacing: '0.04em',
    lineHeight: 1.4,
    padding: '6px 10px',
    borderRadius: 0,
    boxShadow: 'none',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'var(--color-ink)',
  },
})
