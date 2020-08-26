import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Typography, Paper, Grid, Container, Button, Box, TextField,
    FormControl
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Logo from '../components/Logo'
import PublicHeader from '../components/PublicHeader'

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
        padding: theme.spacing(2),
    },
    containerLogin: {
        marginTop: theme.spacing(4),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        width: "60%"
    },
    button: {
        display: "flex",
        margin: "auto",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        textAlign: "center",
    },
}));

function Login(props) {
    const classes = useStyles();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const login = async e => {
        e.preventDefault()
    }
    

    return (
        <>
            <PublicHeader />
            <Container className={classes.root}>
                <Container className={classes.containerLogin}>
                    <Grid container spacing={1}>
                        <Grid item lg={4} md={12} xs={12} />
                        <Grid item lg={4} md={12} xs={12} >
                            <form onChange={changeForm} onSubmit={login}>
                                <Paper className={classes.paper}>
                                    <Box className={classes.box}>
                                        <Logo src={logoSource} className={classes.logo} />
                                    </Box>
                                    <Box className={classes.box}>
                                        <Typography variant="h4" color="primary">Iniciar sesión</Typography>
                                        <Typography >Todos los campos son requeridos</Typography>
                                    </Box>
                                    <FormControl fullWidth>
                                        <Box className={classes.box}>
                                            <TextField name="email" value={inputs.email} label="Correo electrónico" variant="outlined" fullWidth required />
                                        </Box>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Box className={classes.box}>
                                            <TextField name="password" value={inputs.password} type="password" label="Contraseña" variant="outlined" fullWidth required />
                                        </Box>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Box className={classes.box}>
                                            <Button type="submit" variant="contained" className={classes.button} startIcon={<ExitToAppIcon />}>Iniciar sesión</Button>
                                        </Box>
                                    </FormControl>
                                </Paper>
                            </form>
                        </Grid>
                        <Grid item lg={4} md={12} xs={12} />
                    </Grid>
                </Container>
            </Container>
        </>
    )
}

export default Login