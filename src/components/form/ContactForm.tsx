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
import React, { useEffect, useState } from 'react'
import { contactUsInit } from '@/src/utils/const'
import FancyInput, { isValidEmail } from '../CustomInput'
import emailjs from 'emailjs-com'
import { useRouter } from 'next/router'
import CustomDialog from '../CustomDialog'
import { Check, HighlightOffSharp } from '@mui/icons-material'
import { CircularLoading } from '../CircularLoading'

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
}))

export const ContactForm = () => {
  const frmContact = { full_name: '', email: '', subject: '' }
  const [form, setForm] = useState(frmContact)
  const theme = useTheme()
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false)
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false)
  const [validateInputs, setValidateInputs] = useState(false)
  const [dialogLoading, setDialogLoading] = useState(false)
  const [loadComponent, setLoadComponent] = useState(0)
  const [clickSubmit, setClickSubmit] = useState<number>(0)
  const [fieldsWithError, setFieldsWithError] = useState(0)
  const router = useRouter()

  const handleChange = (event: any) => {
    let { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  useEffect(() => {
    if (loadComponent > 0 && clickSubmit > 0) {
      const getAll = document.querySelectorAll('.textField-required.Mui-error')
      setFieldsWithError(getAll.length)
      if (getAll.length === 0) {
        submitForm()
      }
    }
    setLoadComponent(loadComponent + 1)
    // eslint-disable-next-line
  }, [clickSubmit])

  const submitForm = async () => {
    setDialogLoading(true)
    try {
      const sendFormContact = await emailjs.send(
        'portafolio_contact',
        'template_tok2wgk',
        form,
        'Avb6LnstDi00ZVPvh'
      )
      if (sendFormContact.status === 200) {
        setOpenSuccessDialog(true)
        setForm(contactUsInit)
      } else {
        setOpenErrorDialog(true)
      }
      setDialogLoading(false)
    } catch (error) {
      console.log(error)
      setDialogLoading(false)
      setOpenErrorDialog(true)
    }
  }

  // const handleSubmit = (e: any) => {
  //   e.preventDefault()
  //   emailjs
  //     .send('portafolio_contact', 'template_tok2wgk', form, 'Avb6LnstDi00ZVPvh')
  //     .then(
  //       (response) => {
  //         console.log('SUCCESS!', response.status, response.text)
  //         setForm(contactUsInit)
  //         setShowMessage(true)
  //       },
  //       (err) => {
  //         console.log('FAILED...', err)
  //         setShowMessage(false)
  //       }
  //     )
  // }

  const handleClose = () => {
    setOpenSuccessDialog(false)
    setOpenErrorDialog(false)
  }

  const validateForm = () => {
    setValidateInputs(true)
    setClickSubmit(clickSubmit + 1)
  }

  return (
    <>
      <GridForm id='contact' sx={{ background: '#222831' }} item xs={12}>
        <Container maxWidth={'sm'}>
          <Box className='formContainer'>
            <Typography
              marginBottom={'20px'}
              textAlign={'center'}
              fontStyle={'normal'}
              variant='h5'
              color={theme.palette.common.white}
            >
              CONTACTO
            </Typography>
            <Box
              component='form'
              width={'100%'}
              noValidate
              autoComplete='off'
              // onSubmit={submitForm}
            >
              <Grid container spacing={1}>
                <Grid item lg={6} xs={12}>
                  <FancyInput
                    validateSubmit={validateInputs}
                    required
                    placeholder='Ej: Victor, DevInc'
                    type='text'
                    label='Nombre'
                    name='full_name'
                    value={form.full_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <FancyInput
                    validateSubmit={validateInputs}
                    value={form.email}
                    required
                    placeholder='Ej: tuemail@gmail.com'
                    type='email'
                    label='Correo'
                    name='email'
                    validation={[
                      {
                        validate: () => isValidEmail(form.email),
                        msg: 'Correo no válido',
                      },
                    ]}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <FancyInput
                validateSubmit={validateInputs}
                className='inputStyled'
                value={form.subject}
                required
                type='text'
                placeholder='Ej: Estoy interesado...'
                label='Consulta'
                name='subject'
                onChange={handleChange}
                multiline
                rows={4}
              />

              <Stack alignItems={'flex-end'}>
                {fieldsWithError > 0 && loadComponent > 1 && (
                  <Typography
                    variant='body1'
                    align='right'
                    color='error'
                    sx={{ marginBottom: 2 }}
                  >
                    Some fields are empty
                  </Typography>
                )}
                <Button
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
                  onClick={validateForm}
                >
                  Enviar
                </Button>
              </Stack>
            </Box>
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
