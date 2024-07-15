import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const colors = {
  text: {
    primary: '#EEEEEE',
    // secondary: ' rgb(254, 249, 195)',
    secondary: '#76ABAE',
  },
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
    },
    typography: {
      fontFamily: ['NeueMachina', 'Helvetica', 'Arial'].join(','),
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
            // fontWeight: '700',
            border: 'solid 1px #76ABAE',
            borderRadius: 20,
            position: 'relative',
            color: colors.text.primary,
            background: 'transparent',
            transition: 'background .2s ease-out,color .2s ease-out',
            '&:hover': {
              background: '#76ABAE',
              border: 'solid 1px #76ABAE',
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
