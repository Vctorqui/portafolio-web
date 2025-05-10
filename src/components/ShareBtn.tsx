import {
  Alert,
  Fade,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material'
import { WhatsApp, Link, Repeat, LinkedIn } from '@mui/icons-material'
import { useState } from 'react'
import { LightTooltip } from './LightToolTip'
import { motion } from 'framer-motion'

interface ShareBtnProps {
  insert: string
  classTailwind: any
  content: string
}

export const ShareBtn = ({ content, insert, classTailwind }: ShareBtnProps) => {
  const [snackbarCopy, setSnackbarCopy] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleShare = (e: any) => {
    e.preventDefault()
    let link
    const encodedAhref = encodeURIComponent(insert)
    const encodedContent = encodeURIComponent(content)
    switch (e.currentTarget.id) {
      case 'linkedin':
        link = `https://www.linkedin.com/sharing/share-offsite/?url=${insert}`
        open(link)
        break

      case 'whatsapp':
        link = `https://wa.me/?text=${encodedContent}${encodedAhref}`
        open(link)
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
  return (
    <>
      {insert ? (
        <div>
          <LightTooltip title='Share'>
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <IconButton
                className={classTailwind}
                id='fade-button'
                aria-label='click to share the posts'
                aria-controls={menuOpen ? 'fade-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleClick}
              >
                <Repeat
                  fontSize='small'
                  className='text-gray-400 hover:text-[#EF5A6F] transition-colors'
                />
              </IconButton>
            </motion.span>
          </LightTooltip>
          <Menu
            id='fade-menu'
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            TransitionComponent={Fade}
            PaperProps={{
              sx: {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                mt: 1,
              }
            }}
          >
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(239, 90, 111, 0.1)',
                },
                padding: '8px 16px',
              }}
              id='linkedin'
              onClick={handleShare}
            >
              <LinkedIn
                fontSize='small'
                sx={{ color: '#EF5A6F' }}
              />
              <ListItemText
                primary='LinkedIn'
                sx={{ color: 'white' }}
              />
            </MenuItem>
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(239, 90, 111, 0.1)',
                },
                padding: '8px 16px',
              }}
              id='whatsapp'
              onClick={handleShare}
            >
              <WhatsApp
                fontSize='small'
                sx={{ color: '#EF5A6F' }}
              />
              <ListItemText
                primary='WhatsApp'
                sx={{ color: 'white' }}
              />
            </MenuItem>
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(239, 90, 111, 0.1)',
                },
                padding: '8px 16px',
              }}
              id='copy'
              onClick={handleShare}
            >
              <Link
                fontSize='small'
                sx={{ color: '#EF5A6F' }}
              />
              <ListItemText
                primary='Copy Link'
                sx={{ color: 'white' }}
              />
            </MenuItem>
          </Menu>
        </div>
      ) : null}
      <Snackbar
        open={snackbarCopy}
        autoHideDuration={3000}
        onClose={() => setSnackbarCopy(false)}
      >
        <Alert
          onClose={() => setSnackbarCopy(false)}
          severity='success'
          variant='filled'
          sx={{
            backgroundColor: '#EF5A6F',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          Link copied successfully
        </Alert>
      </Snackbar>
    </>
  )
}
