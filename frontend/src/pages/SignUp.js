import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography, Paper, Grid, Container, Button, Box, TextField,
    FormControl, FormControlLabel, Radio, RadioGroup, Snackbar, IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import CreateIcon from '@material-ui/icons/Create'

import PublicHeader from '../components/PublicHeader'
import { emailValidation, minLenghtValidation } from '../utils/FormValidation'

/**APIs */
import { signUpApi } from '../api/user'
import { getAccessTokenApi } from '../api/auth'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
    paper: {
        color: theme.palette.paper,
        padding: theme.spacing(2),
    },
    boxForm: {
        paddingTop: theme.spacing(3),
    },
    formTitle: {
        paddingBottom: theme.spacing(2)
    },
    button: {
        display: "flex",
        margin: "auto",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        textAlign: "center",
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

function SignUp() {
    const classes = useStyles()

    const [alert, setAlert] = React.useState(false)

    useEffect(() => {
        document.title = 'Registrarse - Math Paradise'
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false)
    }

    //Mensaje de alertas
    const [message, setMessage] = useState('')

    //Valoresd de los campos
    const [inputs, setInputs] = useState({
        name: '',
        lastname: '',
        nickname: '',
        email: '',
        password: '',
        repeatPassword: '',
        role: ''
    })

    //Contornos de error de los campos
    const [isError, setIsError] = useState({
        name: false,
        lastname: false,
        nickname: false,
        email: false,
        password: false,
        repeatPassword: false,
    })

    //Validación de los campos
    const [formValid, setformValid] = useState({
        name: false,
        lastname: false,
        nickname: false,
        email: false,
        password: false,
        repeatPassword: false,
        role: false
    })

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const inputValidation = (e) => {
        const { type, name, value } = e.target

        /**Validaciones */
        if (type === "text") {
            setformValid({ ...formValid, [name]: minLenghtValidation(value, 1) })
        }
        if (type === "email") {
            setformValid({ ...formValid, [name]: emailValidation(e.target) })
            setIsError({ ...isError, [name]: !emailValidation(e.target) })
        }
        if (type === "password") {
            setformValid({ ...formValid, [name]: minLenghtValidation(value, 8) })
            setIsError({ ...isError, [name]: !minLenghtValidation(value, 8) })
        }
        if (type === "radio") {
            setformValid({ ...formValid, [name]: e.target.checked })
        }
    }

    //Registro
    const signUp = async e => {
        e.preventDefault()
        const { name, lastname, nickname, email, password, repeatPassword, role } = formValid
        const passwordValue = inputs.password
        const repeatPasswordValue = inputs.repeatPassword

        //Si los campos devuelve -false-
        if (!name || !lastname || !nickname || !email || !password || !repeatPassword || !role) {
            setMessage('Todos los campos son requeridos.')
            setAlert(true)
        } else {
            if (passwordValue !== repeatPasswordValue) {
                setMessage('Las contraseñas deben ser iguales.')
                setAlert(true)
            } else {
                const result = await signUpApi(inputs)

                if (!result.ok) {
                    setMessage(result.message)
                    setAlert(true)
                } else {
                    setMessage(result.message)
                    setAlert(true)
                }
            }
        }
    }

    /**Si el usuario está logueado */
    if (getAccessTokenApi()) {
        return <Redirect to="/home" />
    }

    return (
        <>
            <PublicHeader />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={alert}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
            <Container className={classes.root}>
                <form onChange={changeForm} onSubmit={signUp}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" color="primary">Crear cuenta</Typography>
                        <Typography>*Todos los campos son requeridos</Typography>
                        <Box className={classes.boxForm} onSubmit={signUp}>
                            <Typography variant="h6" className={classes.formTitle}>Datos personales</Typography>
                            <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <TextField type="text" name="name" label="*Nombres" variant="outlined" error={isError.name} fullWidth onChange={inputValidation}></TextField>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <TextField type="text" name="lastname" label="*Apellidos" variant="outlined" error={isError.lastname} fullWidth onChange={inputValidation}></TextField>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <TextField type="text" name="nickname" label="*Alias" variant="outlined" error={isError.nickname} fullWidth onChange={inputValidation}></TextField>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField type="email" name="email" label="*Correo electrónico" variant="outlined" error={isError.email} fullWidth onChange={inputValidation}></TextField>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <TextField type="password" name="password" label="*Contraseña (8 caracteres)" variant="outlined" error={isError.password} fullWidth onChange={inputValidation}></TextField>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <TextField type="password" name="repeatPassword" label="*Confirmar contraseña" variant="outlined" error={isError.repeatPassword} fullWidth onChange={inputValidation}></TextField>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className={classes.boxForm}>
                            <Typography variant="h6" className={classes.formTitle}>Unirme a Math Paradise como</Typography>
                            <RadioGroup name="role">
                                <FormControlLabel value="student" control={<Radio color="primary" checked={inputs.role === 'student'} onChange={inputValidation} />} label="Estudiante" />
                                <FormControlLabel value="tutor" control={<Radio color="primary" checked={inputs.role === 'tutor'} onChange={inputValidation} />} label="Tutor/Profesor" />
                            </RadioGroup>
                        </Box>
                        <Container className={classes.container}>
                            <FormControl>
                                <Button type="submit" className={classes.button} startIcon={<CreateIcon />}>
                                    <Typography variant="h5">Crear cuenta</Typography>
                                </Button>
                            </FormControl>
                        </Container>
                    </Paper>
                </form>
            </Container>
        </>
    )
}


export default SignUp