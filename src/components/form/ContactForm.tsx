import styled from '@emotion/styled'
import {
  Grid,
  Container,
  Box,
  Typography,
  Stack,
  Button,
  useTheme,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import CustomDialog from '../CustomDialog'
import {
  Check,
  HighlightOffSharp,
  SentimentVeryDissatisfied,
} from '@mui/icons-material'
import { CircularLoading } from '../CircularLoading'
import emailjs from '@emailjs/browser'

const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
const PUBLIC_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string

const GridForm = styled(Grid)(({ theme }) => ({
  padding: '50px 0',
  '.formContainer': {
    width: '100%',
    textAlight: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '.inputStyled': {
    height: '30px',
  },

  '.inputStyled, .texteareaStyled': {
    background: '#000',
    border: 'none',
    color: '#EEEEEE',
    fontFamily: 'NeueMachina',
    fontSize: '14px',
    padding: '10px',
  },
}))

export const ContactForm = ({ changeLang }: any) => {
  const form = useRef<any>()
  const theme = useTheme()
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false)
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false)
  const [dialogLoading, setDialogLoading] = useState(false)
  const router = useRouter()
  const [errorForm, setErrorForm] = useState(false)

  const handleClose = () => {
    setOpenSuccessDialog(false)
    setOpenErrorDialog(false)
  }

  const sendEmail = (e: any) => {
    e.preventDefault()
    setDialogLoading(true)

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_ID,
      })
      .then(
        (result) => {
          console.log(result.text)
          form.current.reset()
          setOpenSuccessDialog(true)
          setDialogLoading(false)
        },
        (error) => {
          console.log('FAILED...', error.text)
          setDialogLoading(false)
          setOpenErrorDialog(true)
        }
      )
  }

  return (
    <>
      <GridForm
        id='contact'
        sx={{ background: theme.palette.primary.main }}
        item
        xs={12}
      >
        <Container maxWidth={'sm'}>
          <Box className='formContainer'>
            <Typography
              marginBottom={'20px'}
              textAlign={'center'}
              fontStyle={'normal'}
              variant='h5'
              color={theme.palette.common.white}
            >
              {changeLang === true ? 'CONTACT' : 'CONTACTO'}
            </Typography>
            {errorForm === true ? (
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={1}
              >
                <Typography textAlign={'center'}>
                  {changeLang === true
                    ? `Sorry. The contact form is under maintenance. I invite you to use the following direct methods`
                    : `Lo siento. El formulario de contacto se encuentra en
                  mantenimiento. Te invito a usar los metodos directos de abajo`}
                </Typography>
                <SentimentVeryDissatisfied
                  fontSize='large'
                  sx={{ color: theme.palette.backgroundGreen.green }}
                />
              </Box>
            ) : (
              <form
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '10px',
                }}
                ref={form}
                onSubmit={sendEmail}
              >
                <Stack width={'100%'}>
                  <label>{changeLang === true ? 'Name' : 'Nombre'}</label>
                  <input
                    required
                    className='inputStyled'
                    placeholder={
                      changeLang === true
                        ? 'E.g. Victor, DevInc'
                        : 'Ej: Victor, DevInc'
                    }
                    type='text'
                    name='user_name'
                  />
                </Stack>
                <Stack>
                  <label> {changeLang === true ? 'Email' : 'Correo'}</label>
                  <input
                    required
                    className='inputStyled'
                    type='email'
                    name='user_email'
                    placeholder={
                      changeLang === true
                        ? 'E.g. your-email@gmail.com'
                        : 'Ej: tu-correo@gmail.com'
                    }
                  />
                </Stack>
                <Stack>
                  <label>{changeLang === true ? 'Message' : 'Mensaje'}</label>
                  <textarea
                    required
                    rows={6}
                    className='texteareaStyled'
                    placeholder={
                      changeLang === true
                        ? `E.g. I'm interested in...`
                        : 'Ej: Estoy interesado en...'
                    }
                    name='message'
                  />
                </Stack>
                <Box alignSelf={'flex-end'}>
                  <Button
                    aria-label='Enviar'
                    sx={{
                      width: '120px',
                      fontWeight: 700,
                      borderRadius: '5px',
                      ':hover': {
                        background: '#76ABAE',
                        color: '#EEE',
                        borderColor: '#76ABAE',
                      },
                    }}
                    type='submit'
                    variant='outlined'
                  >
                    {changeLang === true ? 'Send' : 'Enviar'}
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Container>
      </GridForm>
      <CustomDialog
        open={openSuccessDialog}
        onClose={() => {
          handleClose()
          router.push('/')
        }}
        title={''}
      >
        <Box
          padding={2}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
        >
          <Typography variant='body1' color='initial'>
            Formulario enviado correctamente
          </Typography>
          <Check color='success' sx={{ fontSize: '45px' }} />
        </Box>
      </CustomDialog>
      <CustomDialog open={openErrorDialog} onClose={handleClose} title={''}>
        <Box
          padding={theme.spacing(4, 2, 4)}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
        >
          <Typography variant='body1' color='initial'>
            No se ha podido enviar el formulario. Vuelva a intentarlo más tarde.
          </Typography>
          <HighlightOffSharp sx={{ fontSize: '45px' }} color='error' />
        </Box>
      </CustomDialog>
      <CustomDialog open={dialogLoading}>
        <CircularLoading />
        <Stack spacing={1} pb={2}>
          <Typography
            variant='h4'
            align='center'
            gutterBottom
            sx={{ color: '#222831' }}
          >
            Enviando su solicitud
          </Typography>
          <Typography variant='h6' align='center' sx={{ color: '#222831' }}>
            Por favor Espere
          </Typography>
        </Stack>
      </CustomDialog>
    </>
  )
}
