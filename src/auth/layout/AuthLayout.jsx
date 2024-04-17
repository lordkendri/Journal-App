import { Grid, Typography } from "@mui/material"

///Contenido para reutilizar
export const AuthLayout = ({ children, title = '' }) => {
    return (
        //define en sx las propiedades de mui y hereda el theme de <AppTheme />
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'

            //? Style extender
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid
                item
                className='box-shadow'
                //! No confundir con Style Extender, esto es solo para longitud
                xs={3}

                sx={{
                    //medium size
                    width: { sm: 450 },
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2
                }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>

                {/* Children */}
                {children}
            </Grid>
        </Grid>
    )
}
