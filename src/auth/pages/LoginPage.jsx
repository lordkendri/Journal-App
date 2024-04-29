import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//?Esto es interesante: el componente Link de RRD se llamara ahora RouterLink 
import { Link as RouterLink } from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { AuthLayout } from '../layout/AuthLayout'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

import { useForm } from '../../hooks/useForm'

const formData = {
    email: '',
    password: '',
};

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener un @'],
    password: [(value) => value.length >= 6, 'El Password debe de tener mas de 6 letras'],
};

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { email, password, onInputChange, formState,
        isFormValid, passwordValid, emailValid
    } = useForm(formData, formValidations);

    //En caso de que el status cambie se obtiene el nuevo valor
    const isAuthenticaring = useMemo(() => status === 'checking', [status])

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;

        // console.log({ email, password });
        //! Llama a la accion en el Thunk
        dispatch(startLoginWithEmailPassword(formState));
    };

    const onGoogleSignIn = (event) => {
        event.preventDefault();
        console.log('onGoogleSighIn');
        dispatch(startGoogleSignIn());
    }

    return (
        //Codigo exportado
        <AuthLayout title='Login'>

            {/* Formulario */}
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
                {/* TextBox Correo */}
                <Grid container>
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

                        <Grid item xs={12} sm={6}>
                            <Button
                                //Se deshabilita en caso de que isAuthtenticaring este en true
                                disabled={isAuthenticaring}
                                type="submit"
                                variant="contained"
                                fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                //Se deshabilita en caso de que isAuthtenticaring este en true
                                disabled={isAuthenticaring}
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Redireccionamiento */}
                    <Grid container direction='row' justifyContent='end'>
                        {/* Este link es de material */}
                        <Link component={RouterLink} color='inherit' to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>

            </form>
        </AuthLayout>

    )
}
