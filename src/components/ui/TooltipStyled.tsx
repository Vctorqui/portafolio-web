import { styled } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

export const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: 12,
    padding: '8px 12px',
    borderRadius: '8px',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(255, 255, 255, 0.05)',
    '&::before': {
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  },
}))
