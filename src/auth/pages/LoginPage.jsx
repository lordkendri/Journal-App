//?Esto es interesante: el componente Link de RRD se llamara ahora RouterLink 
import { Link as RouterLink } from 'react-router-dom'

import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {
    return (
        //Codigo exportado
        <AuthLayout title='Login'>
            
            {/* Formulario */}
            <form>
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
                        />
                    </Grid>

                    {/* TextBox Contra */}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type='password'
                            placeholder="Contraseña"
                            fullWidth
                        />
                    </Grid>

                    {/* Botones */}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth>
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
