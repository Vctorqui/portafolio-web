import { Alert, Snackbar } from '@mui/material'
import { bannerLabels } from '../../constants/banner'
import { Language } from '../../types'

type BannerCopySnackbarProps = {
  language: Language
  open: boolean
  onClose: () => void
}

export function BannerCopySnackbar({
  language,
  open,
  onClose,
}: BannerCopySnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity='success'
        variant='filled'
        className='bg-cyan-400 text-[#080808]'
      >
        {bannerLabels[language].copySuccess}
      </Alert>
    </Snackbar>
  )
}
