//?Esto es interesante: el componente Link de RRD se llamara ahora RouterLink 
import { Link as RouterLink } from 'react-router-dom'

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener un @'],
  password: [(value) => value.length >= 6, 'El Password debe de tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  //Del Stado del authSlice tomar status y errorMessage
  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, passwordValid, emailValid
  } = useForm(formData, formValidations);

  // console.log(displayNameValid)

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    //Codigo exportado
    <AuthLayout title='Crear Usuario'>
      {/* <h1>FormValid: {isFormValid ? 'Valido' : 'Incorrecto'}</h1> */}

      {/* Formulario */}
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        {/* TextBox Correo */}
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type='text'
              placeholder="Nombre completo"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}

            />
          </Grid>

          {/* el xs  extra small significa que en espacios muy reducidos el espacio es de
                 12 columnas */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type='email'
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
              autoComplete="email"
            />
          </Grid>

          {/* TextBox Contra */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type='password'
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              autoComplete="current-password"
            />
          </Grid>

          {/* Alerta */}
          <Grid
            container
            spacing={2}
            sx={{ mt: 1 }}
            display={!!errorMessage ? '' : 'none'}
          >
            <Grid item xs={12} >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>

          {/* Botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type='submit'
                variant="contained"
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>

          </Grid>

          {/* Redireccionamiento */}
          <Grid container direction='row' justifyContent='end'>

            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>

            {/* Este link es de material */}
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>

  )
}
