import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Typography, Paper, Grid, Container, Button, Box, TextField,
    FormControl, AppBar, Toolbar
} from '@material-ui/core'

import Logo from '../other/Logo'
import logoSource from '../assets/images/logos/MathParadiseLogo.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
    paper: {
        textAlign: 'center',
    },

    box: {
        padding: theme.spacing(2)
    },

    containerLogin: {
        marginTop: theme.spacing(4),
    },

    title: {
        flexGrow: 1,
    },
}));

export default function Login(props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="static" color="white">
                <Toolbar>
                    <Typography variant="h5" color="primary" className={classes.title}>Math Paradise</Typography>
                    <Button color="inherit">Registrarse</Button>
                    <Button color="inherit">Información</Button>
                </Toolbar>
            </AppBar>
            <Container className={classes.root}>
                <Container className={classes.containerLogin}>
                    <Grid container spacing={1}>
                        <Grid item lg={4} md={12} xs={12} justify="center" />
                        <Grid item lg={4} md={12} xs={12} justify="center">
                            <Paper className={classes.paper}>
                                <Box className={classes.box}>
                                    <Logo src={logoSource} width="60%" />
                                </Box>
                                <Box className={classes.box}>
                                    <Typography variant="h4" color="primary">Acceder</Typography>
                                    <Typography variant="span">Todos los campos son requeridos</Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Box className={classes.box}>
                                        <TextField name="email" label="Correo electrónico" variant="outlined" fullWidth required />
                                    </Box>
                                    <Box className={classes.box}>
                                        <TextField name="password" type="password" label="Contraseña" variant="outlined" fullWidth required />
                                    </Box>
                                    <Box className={classes.box}>
                                        <Button type="submit" variant="contained" color="primary">Iniciar sesión</Button>
                                    </Box>
                                </FormControl>
                            </Paper>
                        </Grid>
                        <Grid item lg={4} md={12} xs={12} justify="center" />
                    </Grid>
                </Container>
            </Container>
        </React.Fragment>
    )
}

