import {
  Alert,
  Fade,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material'
import {
  WhatsApp,
  Link,
  LinkedIn,
  ShareOutlined,
} from '@mui/icons-material'
import { useState } from 'react'
import { TooltipStyled } from './TooltipStyled'
import { motion } from 'framer-motion'

interface ShareBtnProps {
  insert: string
  classTailwind: string
  content: string
  isLimited?: boolean
}

const menuPaperSx = {
  backgroundColor: 'var(--color-paper)',
  border: '1px solid var(--color-rule)',
  borderRadius: 0,
  boxShadow: 'none',
  mt: 0.5,
  py: 0,
}

const menuItemSx = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: 'var(--color-ink)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8125rem',
  padding: '10px 14px',
  minHeight: 0,
  '&:hover': {
    backgroundColor: 'var(--color-paper-2)',
  },
  '& .MuiListItemText-primary': {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8125rem',
    color: 'var(--color-ink)',
  },
  '& .MuiSvgIcon-root': {
    color: 'var(--color-ink-2)',
    fontSize: '1.05rem',
  },
}

export const ShareBtn = ({
  content,
  insert,
  classTailwind,
  isLimited = false,
}: ShareBtnProps) => {
  const [snackbarCopy, setSnackbarCopy] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleShare = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const encodedAhref = encodeURIComponent(insert)
    const encodedContent = encodeURIComponent(content)

    switch (e.currentTarget.id) {
      case 'linkedin':
        open(`https://www.linkedin.com/sharing/share-offsite/?url=${insert}`)
        break
      case 'whatsapp':
        open(`https://wa.me/?text=${encodedContent}${encodedAhref}`)
        break
      case 'copy':
        navigator.clipboard.writeText(insert)
        handleClose()
        setSnackbarCopy(true)
        break
      default:
        break
    }
  }

  if (!insert) return null

  return (
    <>
      <div>
        <TooltipStyled title='Share' enterDelay={200}>
          <motion.span
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className='inline-flex'
          >
            <IconButton
              className={classTailwind}
              id='fade-button'
              aria-label='Share this project'
              aria-controls={menuOpen ? 'fade-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleClick}
              size='small'
              sx={{
                color: 'inherit',
                padding: '4px',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'var(--color-accent)',
                },
              }}
            >
              <ShareOutlined fontSize='small' />
            </IconButton>
          </motion.span>
        </TooltipStyled>
        <Menu
          id='fade-menu'
          MenuListProps={{
            'aria-labelledby': 'fade-button',
            sx: { py: 0 },
          }}
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          TransitionComponent={Fade}
          disableScrollLock
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{ sx: menuPaperSx }}
        >
          {!isLimited && (
            <MenuItem id='linkedin' onClick={handleShare} sx={menuItemSx}>
              <LinkedIn fontSize='small' />
              <ListItemText primary='LinkedIn' />
            </MenuItem>
          )}
          <MenuItem id='whatsapp' onClick={handleShare} sx={menuItemSx}>
            <WhatsApp fontSize='small' />
            <ListItemText primary='WhatsApp' />
          </MenuItem>
          <MenuItem id='copy' onClick={handleShare} sx={menuItemSx}>
            <Link fontSize='small' />
            <ListItemText primary='Copy Link' />
          </MenuItem>
        </Menu>
      </div>
      <Snackbar
        open={snackbarCopy}
        autoHideDuration={3000}
        onClose={() => setSnackbarCopy(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarCopy(false)}
          severity='success'
          variant='outlined'
          sx={{
            backgroundColor: 'var(--color-paper)',
            borderColor: 'var(--color-rule)',
            borderRadius: 0,
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            '& .MuiAlert-icon': {
              color: 'var(--color-accent)',
            },
          }}
        >
          Link copied successfully
        </Alert>
      </Snackbar>
    </>
  )
}
