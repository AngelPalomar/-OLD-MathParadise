import React, { useState, useEffect } from 'react'
import {
    Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, Select, MenuItem, Typography
} from "@material-ui/core"
import { useStyles } from './useStyles'

/**Icons */
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/Save'

/**Components */
import DefaultSnackbar from '../snackbars/DefaultSnackbar'

/**Utils */
import { minLenghtValidation, emailValidation, nicknameValidation } from '../../utils/FormValidation'
import { grades } from '../../utils/SelectArrays'

/**APIs */
import { getInstitutionsApi } from '../../api/institution'
import { updateUserApi } from '../../api/user'
import { getAccessTokenApi, logout } from '../../api/auth'

function ProfileForm(props) {
    const classes = useStyles()
    const { userData, open, close } = props
    const [institutionsList, setInstitutionsList] = useState([])
    const [inputs, setInputs] = useState({
        name: userData.name,
        lastname: userData.lastname,
        nickname: userData.nickname,
        email: userData.email,
        institution: userData.institution,
        school_grade: userData.school_grade,
    })
    const [inputsValidation, setInputsValidation] = useState({
        name: true,
        lastname: true,
        nickname: true,
        email: true,
        institution: true,
        school_grade: true,
    })
    //Snackbar
    const [messageNotification, setMessageNotification] = useState('')
    const [openNotification, setOpenNotification] = useState(false)
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenNotification(false)
    }

    useEffect(() => {
        getInstitutionsApi().then(response => {
            setInstitutionsList(response.institution)
        })
    }, [])

    const changeForm = (e) => {
        if (e.target.type === "text" || e.target.type === "email") {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value.trim()
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
    }

    const validForm = (e) => {
        const { type, name, value } = e.target
        if (type === "text" && name !== 'nickname') {
            setInputsValidation({ ...inputsValidation, [name]: minLenghtValidation(value, 1) })
        }
        if (name === 'nickname') {
            setInputsValidation({ ...inputsValidation, nickname: nicknameValidation(e.target) })
        }
        if (type === "email") {
            setInputsValidation({ ...inputsValidation, [name]: emailValidation(e.target) })
        }
    }

    //Editar usuario
    const submitForm = (e) => {
        e.preventDefault()
        const { name, lastname, nickname, email } = inputsValidation

        if (!name || !lastname || !nickname || inputs.institution === "" ||
            inputs.school_grade === "") {
            setMessageNotification("Todos los campos son requeridos")
            setOpenNotification(true)
        } else {
            if (!email) {
                setMessageNotification("Ingrese un correo válido.")
                setOpenNotification(true)
            } else {
                //Validación por si no se modificaron valores anteriores
                if (inputs.name === userData.name && inputs.lastname === userData.lastname &&
                    inputs.nickname === userData.nickname && inputs.email === userData.email &&
                    inputs.institution === userData.institution && inputs.school_grade === userData.school_grade) {
                    setMessageNotification("Modifique los datos para poder guardarlos.")
                    setOpenNotification(true)
                } else {
                    //Actualización de datos
                    updateUserApi(getAccessTokenApi(), inputs, userData._id).then(response => {
                        if (response.status === 0) {
                            setMessageNotification(response.message)
                            setOpenNotification(true)
                        } else {
                            //Si se modificó el alias o el correo
                            if (inputs.email !== userData.email || inputs.nickname !== userData.nickname) {
                                logout()
                                window.location.href = "/login"
                            } else {
                                setMessageNotification(response.message + " Vuelva a iniciar sesión para ver los cambios.")
                                setOpenNotification(true)

                                //Cerrar formulario
                                close()
                            }
                        }
                    })
                }
            }
        }
    }

    return (
        <>
            <DefaultSnackbar message={messageNotification} open={openNotification} handleClose={handleClose} />
            <Dialog
                open={open}
                onClose={close}
                className={classes.root}>

                <DialogTitle>
                    Editar perfil
            </DialogTitle>

                <form onChange={changeForm} onSubmit={submitForm}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField
                                    type="text"
                                    name="name"
                                    label="*Nombres"
                                    variant="outlined"
                                    fullWidth
                                    error={!inputsValidation.name}
                                    defaultValue={userData.name}
                                    onChange={validForm} />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField
                                    type="text"
                                    name="lastname"
                                    label="*Apellidos"
                                    variant="outlined"
                                    fullWidth
                                    error={!inputsValidation.lastname}
                                    defaultValue={userData.lastname}
                                    onChange={validForm} />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField
                                    type="text"
                                    name="nickname"
                                    label="*Alias"
                                    variant="outlined"
                                    fullWidth
                                    error={!inputsValidation.nickname}
                                    defaultValue={userData.nickname}
                                    onChange={validForm} />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    type="email"
                                    name="email"
                                    label="*Correo electrónico"
                                    variant="outlined"
                                    fullWidth
                                    error={!inputsValidation.email}
                                    defaultValue={userData.email}
                                    onChange={validForm} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" className={classes.select}>
                                    <InputLabel id="lbl_inst">Institución</InputLabel>
                                    <Select
                                        name="institution"
                                        value={inputs.institution}
                                        defaultValue={inputs.institution}
                                        label="Institución"
                                        labelId="lbl_inst"
                                        onChange={changeForm}>

                                        <MenuItem key="" value="Ninguna">Ninguna</MenuItem>

                                        {institutionsList.map((values, index) =>
                                            <MenuItem key={index} value={values.name}>{values.name}</MenuItem>
                                        )}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" className={classes.select}>
                                    <InputLabel id="lbl_school">Año/Semestre/Cuatrimestre</InputLabel>
                                    <Select
                                        name="school_grade"
                                        value={inputs.school_grade}
                                        defaultValue={inputs.school_grade}
                                        label="Año/Semestre/Cuatrimestre"
                                        labelId="lbl_school"
                                        onChange={changeForm}>

                                        <MenuItem key="" value="Ninguno">Ninguno</MenuItem>

                                        {grades.map((values, index) =>
                                            <MenuItem key={index} value={values.val}>{values.name}</MenuItem>
                                        )}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography className={classes.label}>*Si modifica el correo electrónico o el alias, se cerarrá la sesión.</Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={close} startIcon={<ClearIcon />} className={classes.cancelButton}>
                            Cancelar
                    </Button>
                        <Button type="submit" startIcon={<SaveIcon />} className={classes.button}>
                            Guardar
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default ProfileForm
