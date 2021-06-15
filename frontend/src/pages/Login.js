import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography, Paper, Grid, Container, Button, Box, TextField,
    FormControl, CircularProgress
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

/**Componentes */
import Logo from '../components/Logo'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'
import DefaultSnackbar from '../components/snackbars/DefaultSnackbar'

/**APIs */
import { loginApi } from "../api/user"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/Constants";
import { getAccessTokenApi } from '../api/auth'

/**Origen de imágenes */
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
    boxInputs: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    containerLogin: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
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
    footer: {
        position: 'relative'
    }
}));

function Login(props) {
    const classes = useStyles();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        document.title = 'Iniciar sesión - Math Paradise'
    }, [])

    /**Mensajes y alertas */
    const [alertMessage, setAlertMessage] = useState('')
    const [alertOpen, setAlertOpen] = React.useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false)
    }

    /**Actualizaciones del formulario */
    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    /**
     * async y await para ver el contenido de la promesa devuelta por el fetch
     */
    const login = async e => {
        e.preventDefault()
        if (inputs.email === '' || inputs.password === '') {
            setAlertOpen(true)
            setAlertMessage('Todos los campos son requeridos')
        } else {
            const result = await loginApi(inputs)

            if (result.message) {
                setIsLoading(true)
                setAlertOpen(true)
                setAlertMessage(result.message)
                setIsLoading(false)
            } else {
                const { accessToken, refreshToken } = result

                /**Si el access token viene indefinifo o nulo, no se redirige al home */
                if (!accessToken || !refreshToken) {
                    setIsLoading(true)
                    setAlertOpen(true)
                    setAlertMessage("Error del servidor, vuelva a intentarlo.")
                    setIsLoading(false)
                } else {
                    setIsLoading(true)
                    /**Guardar datos encriptados del usuario en el localStorage*/
                    localStorage.setItem(ACCESS_TOKEN, accessToken)
                    localStorage.setItem(REFRESH_TOKEN, refreshToken)

                    /**Redireccionar al home */
                    window.location.href = '/home'
                }
            }
        }
    }

    /**Si el usuario está logueado */
    if (getAccessTokenApi()) {
        return <Redirect to="/home" />
    }

    return (
        <Fragment>
            <DefaultSnackbar
                open={alertOpen}
                handleClose={handleClose}
                message={alertMessage} />
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
                                        <Box className={classes.boxInputs}>
                                            <TextField name="email" value={inputs.email} label="Correo electrónico" variant="outlined" fullWidth />
                                        </Box>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Box className={classes.box}>
                                            <TextField name="password" value={inputs.password} type="password" label="Contraseña" variant="outlined" fullWidth />
                                        </Box>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Box className={classes.box}>
                                            {
                                                !isLoading ?
                                                    <Button type="submit" variant="contained" className={classes.button} startIcon={<ExitToAppIcon />}>
                                                        <Typography variant="h6">Iniciar sesión</Typography>
                                                    </Button> :
                                                    <CircularProgress />
                                            }
                                        </Box>
                                    </FormControl>
                                </Paper>
                            </form>
                        </Grid>
                        <Grid item lg={4} md={12} xs={12} />
                    </Grid>
                </Container>
            </Container>
            <div className={classes.footer}>
                <Footer />
            </div>
        </Fragment>
    )
}

export default Login