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
    main: '#0B192C',
    light: '#1E3E62',
    dark: '',
  },
  secondary: {
    main: '#d6e6e7',
    light: '#EEEEEE',
  },
  text: {
    primary: '#EEEEEE',
    secondary: '#EF5A6F',
  },
  backgroundRose: {
    rose: '#EF5A6F',
  },
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
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
      backgroundRose: {
        rose: colors.backgroundRose.rose,
      },
    },
    typography: {
      fontFamily: ['system-ui', 'Helvetica', 'Arial'].join(','),
      button: {
        fontSize: 12,
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            ':disabled': {
              background: 'rgba(0, 0, 0, 0.12)',
            },
          },
          outlinedPrimary: {
            fontWeight: '700',
            border: `solid 1px ${colors.backgroundRose.rose}`,
            borderRadius: 10,
            position: 'relative',
            color: colors.text.primary,
            background: 'transparent',
            transition: 'background .2s ease-out,color .2s ease-out',
            '&:hover': {
              background: colors.backgroundRose.rose,
              border: `solid 1px ${colors.backgroundRose.rose}`,
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            width: '100%',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'NeueMachina';
            font-weight: 300;
            src: local('NeuMachina'), url(/fonts/neueMachina/NeueMachina-Light.ttf) format('truetype');
          }
          @font-face {
            font-family: 'NeueMachina';
            font-weight: 400;
            src: local('NeuMachina'), url(/fonts/neueMachina/NeueMachina-Regular.ttf) format('truetype');
          }
          @font-face {
            font-family: 'NeueMachina';
            font-weight: 800;
            src: local('NeuMachina'), url(/fonts/neueMachina/NeueMachina-Ultrabold.ttf) format('truetype');
          },
          @font-face {
            font-family: 'PilatExtended';
            font-weight: 300;
            src: local('PilatExtended'), url(/fonts/pilat/PilatExtended-Light.ttf) format('truetype');
          },
          @font-face {
            font-family: 'PilatExtended';
            font-weight: 400;
            src: local('PilatExtended'), url(/fonts/pilat/PilatExtended-Regular.ttf) format('truetype');
          },
          @font-face {
            font-family: 'PilatExtended';
            font-weight: 800;
            src: local('PilatExtended'), url(/fonts/pilat/PilatExtended-Bold.ttf) format('truetype');
          },
        `,
      },
    },
  })
)

export default theme
