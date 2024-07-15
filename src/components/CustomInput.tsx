import { ChangeEvent, useState } from 'react'
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  StandardTextFieldProps,
  TextField,
  styled,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import theme from '../../theme/theme'

interface validationTypes {
  validate: () => boolean
  msg: string
}

interface FancyInputTypes extends StandardTextFieldProps {
  validation?: validationTypes[]
  onlyNumber?: boolean
  maxLength?: number
  validateSubmit?: boolean
  mb?: number
}

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

const FormLabelCustom = styled(FormLabel)(({ theme }) => ({
  // color: theme.palette.text.primary,
  fontWeight: 500,
  marginBottom: theme.spacing(0.5)
}))

const FancyInput = ({
  label,
  name,
  value,
  variant,
  required,
  validation,
  type,
  multiline,
  helperText,
  onChange,
  maxLength,
  validateSubmit,
  mb,
  ...rest
}: FancyInputTypes) => {
  const [touched, setTouched] = useState(false)

  const isNumber = () => type === 'number'

  const isEmptyString = (str: string) => {
    return str === ''
  }

  const stringIsOnlyDigits = (str: string) => {
    return /^[0-9]+([.])?([0-9]+)?$/.test(str)
  }

  const onChangeCustom = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true)
    if (
      isNumber() &&
      !isEmptyString(e.target.value) &&
      !stringIsOnlyDigits(e.target.value)
    )
      return
    if (onChange) onChange(e)
  }

  const getMessageError = () => {
    if (validation) {
      for (const v of validation) {
        if (!v.validate()) return v.msg
      }
      return ''
    }
  }

  // NOTES: aqui con validateSubmit se lo pasamos a los inputs que son requeridos con un estado dentro de mismo formulario en donde estamos llamando los datos y al darle submit el se encarga de mostrar los que no estan validados

  const requiredCondition = (touched || validateSubmit) && !value && required
  const showCustomError =
    (touched || validateSubmit) && validation && !!getMessageError()
  const hasError = requiredCondition || showCustomError

  return (
    <>
      <FormControl fullWidth error={hasError}>
        {label && <FormLabelCustom>{label}</FormLabelCustom>}
        <TextField
          style={mb !== undefined ? { marginBottom: mb } : { marginBottom: 16 }}
          size='small'
          error={hasError}
          helperText={
            requiredCondition
              ? '* Requirido'
              : showCustomError
              ? getMessageError()
              : helperText ?? ''
          }
          variant={variant ? variant : 'outlined'}
          name={name}
          multiline={multiline}
          value={value}
          onChange={onChangeCustom}
          InputProps={{
            className: required ? 'textField-required' : '',
          }}
          inputProps={{
            maxLength: maxLength,
            style: multiline
              ? {
                  backgroundColor: '#000',
                  borderRadius: 4,
                  margin: '-8.5px -14px',
                  padding: '8.5px 14px',
                }
              : { backgroundColor: '#000', borderRadius: 4 },
            autoComplete: 'off',
            form: {
              autoComplete: 'off',
            },
          }}
          {...rest}
        />
      </FormControl>
    </>
  )
}

export default FancyInput
