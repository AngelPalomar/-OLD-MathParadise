import React, { Fragment, useState } from 'react'
import {
    Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText,
    Button, TextField, CircularProgress, Stepper, Step, StepLabel
} from '@material-ui/core'
import { useStyles } from './useStyles';

//Components
import DefaultSnackbar from '../snackbars/DefaultSnackbar'

//APIs
import { createToken, passwordReset } from '../../api/user'

//Utils
import { emailValueValidation, minLenghtValidation } from '../../utils/FormValidation';

function ResetPassword(props) {
    const { open, handleClose } = props;
    const classes = useStyles();
    const steps = [
        "Ingresar correo electrónico",
        "Ingresar código"
    ]

    const [token, setToken] = useState({
        email: '',
        notify: true
    })
    const [generatePass, setGeneratePass] = useState({
        email: '',
        userId: '',
        token: ''
    })
    const [activeStep, setActiveStep] = useState(0)
    //eslint-disable-next-line no-unused-vars
    const [skiped, setSkiped] = useState(new Set())
    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    //Función para obtener el token por mail
    const getToken = () => {
        if (!emailValueValidation(token.email)) {
            setMessage('Ingrese un correo válido.')
            setOpenSnack(true)
            return
        }

        //Inicia la carga
        setIsLoading(true);

        //Pronmesa
        createToken(token).then(response => {
            if (response.status === 0) {
                setOpenSnack(true);
                setMessage(response.message);
                setIsLoading(false);
            } else {
                setActiveStep(prev => prev + 1);
                setGeneratePass({ ...generatePass, email: token.email, userId: response.userId })
                setIsLoading(false)
            }
        })
    }

    //Función para generar una nueva contraseña
    const generatePassword = () => {
        if (!minLenghtValidation(generatePass.token, 1)) {
            setMessage('Ingrese un código (token).')
            setOpenSnack(true)
            return
        }

        //Inicia carga
        setIsLoading(true)

        //Promesa
        passwordReset(generatePass).then(response => {
            if (response.status === 0) {
                setOpenSnack(true);
                setMessage(response.message);
                setIsLoading(false);
            } else {
                setActiveStep(prev => prev + 1);
                setIsLoading(false)
            }
        })
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DefaultSnackbar open={openSnack} handleClose={() => setOpenSnack(false)} message={message} />
            <DialogTitle>Recuperar contraseña</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep}>
                    {
                        steps.map((value, index) => {
                            const stepProps = {}

                            if (skiped.has(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={index} {...stepProps}>
                                    <StepLabel>{value}</StepLabel>
                                </Step>
                            )
                        })
                    }
                </Stepper>
                <DialogContent>
                    {
                        activeStep === 0 ?
                            <Fragment>
                                <DialogContentText>
                                    Ingresa tu correo electrónico para enviarte un código (token).
                                </DialogContentText>
                                <TextField
                                    variant='outlined'
                                    label='Correo electrónico'
                                    fullWidth
                                    value={token.email}
                                    onChange={(e) => setToken({ ...token, email: e.target.value })} />
                                {
                                    !isLoading ?
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className={classes.actionElement}
                                            onClick={getToken}>
                                            Enviar
                                        </Button> :
                                        <CircularProgress variant='indeterminate' color='primary' className={classes.actionElement} />
                                }
                            </Fragment> :
                            activeStep === 1 ?
                                <Fragment>
                                    <DialogContentText>
                                        Ingresa el código (token) que te llegó a tu correo electrónico
                                        para generarte una nueva contraseña.
                                    </DialogContentText>
                                    <TextField
                                        variant='outlined'
                                        label='Código de acceso (token)'
                                        fullWidth
                                        value={generatePass.token}
                                        onChange={(e) => setGeneratePass({ ...generatePass, token: e.target.value })} />
                                    {
                                        !isLoading ?
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                className={classes.actionElement}
                                                onClick={generatePassword}>
                                                Cambiar contraseña
                                            </Button> :
                                            <CircularProgress variant='indeterminate' color='primary' className={classes.actionElement} />
                                    }
                                </Fragment> :
                                <Fragment>
                                    <DialogContentText>
                                        Contraseña cambiada correctamente, verifica tu correo electrónico.
                                    </DialogContentText>
                                </Fragment>
                    }
                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={handleClose}>
                    Cancelar
                </Button>
                {
                    activeStep === 2 && (
                        <Button color='primary' onClick={handleClose}>
                            Aceptar
                        </Button>
                    )
                }
            </DialogActions>
        </Dialog>
    )
}

export default ResetPassword