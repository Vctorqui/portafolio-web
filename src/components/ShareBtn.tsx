import {
  Alert,
  Fade,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material'
import { WhatsApp, Link, Repeat } from '@mui/icons-material'
import { useState } from 'react'
import theme from '@/theme/theme'
import { LightTooltip } from './LightToolTip'

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
    switch (e.currentTarget.id) {
      case 'facebook':
        link = `https://www.facebook.com/sharer/sharer.php?u=${insert}`
        open(link)
        break

      case 'whatsapp':
        link = `https://wa.me/?text=${content}${encodedAhref}`
        open(link)
        break

      case 'twitter':
        link = `https://twitter.com/intent/tweet?url=${insert}`
        open(link)

      case 'copy':
        navigator.clipboard.writeText(insert)
        handleClose()
        // setShareDialog(false)
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
            <IconButton
              className={classTailwind}
              id='fade-button'
              aria-controls={menuOpen ? 'fade-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleClick}
            >
              <Repeat
                fontSize='small'
                color='secondary'
                className='hover:text-green-500 transition-colors'
              />
            </IconButton>
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
          >
            <MenuItem
              sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              id='whatsapp'
              onClick={handleShare}
            >
              <WhatsApp
                fontSize='small'
                sx={{ color: theme.palette.common.black }}
              />
              <ListItemText
                sx={{ color: theme.palette.common.black }}
                primary='Whatsapp'
              />
            </MenuItem>
            <MenuItem
              sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              id='copy'
              onClick={handleShare}
            >
              <Link
                fontSize='small'
                sx={{ color: theme.palette.common.black }}
              />
              <ListItemText
                sx={{ color: theme.palette.common.black }}
                primary='Copy Link'
              />
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <LightTooltip title={'Not available for now'}>
          <button
            disabled
            className='flex items-center gap-2 disabled:opacity-30'
          >
            <Repeat fontSize='small' />
          </button>
        </LightTooltip>
      )}
      <Snackbar
        open={snackbarCopy}
        autoHideDuration={3000}
        onClose={() => setSnackbarCopy(false)}
      >
        <Alert
          onClose={() => setSnackbarCopy(false)}
          severity='success'
          variant='filled'
        >
          Link copied successfully
        </Alert>
      </Snackbar>
    </>
  )
}