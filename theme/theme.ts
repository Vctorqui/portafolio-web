import { createTheme, responsiveFontSizes } from '@mui/material/styles'

interface micolor {
  backgroundRose: {
    rose: string
  }
}

declare module '@mui/material/styles' {
  interface Palette extends micolor {}
  interface PaletteOptions extends micolor {}
}

const colors = {
  primary: {
    main: '#1a1f2e',
    light: '#3a4258',
    dark: '',
  },
  secondary: {
    main: '#f5f6f8',
    light: '#ffffff',
  },
  text: {
    primary: '#1a1f2e',
    secondary: '#1e3a8a',
  },
  backgroundRose: {
    rose: '#1e3a8a',
  },
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: colors.primary.main,
        light: colors.primary.light,
      },
      secondary: {
        main: colors.secondary.main,
        light: colors.secondary.light,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
      background: {
        default: '#ffffff',
        paper: '#fafbfc',
      },
      backgroundRose: {
        rose: colors.backgroundRose.rose,
      },
    },
    typography: {
      fontFamily: 'var(--font-body)',
      button: {
        fontSize: 12,
        textTransform: 'none',
      },
    },
  })
)

export default theme
