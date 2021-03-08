import React, { useState, useEffect, useCallback } from 'react'
import jwtDecode from 'jwt-decode'
import {
    Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, Select, MenuItem, Typography, Avatar
} from "@material-ui/core"
import { useStyles } from './useStyles'
import { useDropzone } from 'react-dropzone'

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
import { updateUserApi, getAvatarApi, uploadAvatarApi } from '../../api/user'
import { getAccessTokenApi, logout } from '../../api/auth'

function ProfileForm(props) {
    const classes = useStyles()
    const { userData, open, close, setreloadProfile } = props
    const [institutionsList, setInstitutionsList] = useState([])

    const [inputs, setInputs] = useState({
        name: userData.name,
        lastname: userData.lastname,
        nickname: userData.nickname,
        email: userData.email,
        institution: userData.institution,
        school_grade: userData.school_grade,
        avatar: userData.avatar
    })
    //Estado para la foto de perfil
    const [avatar, setAvatar] = useState(null)

    //Validación de los imputs
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
        //si existe un avatar
        if (userData.avatar) {
            getAvatarApi(userData.avatar).then(response => {
                setAvatar(response)
            })
        } else {
            setAvatar(null)
        }

        //Traer institutciones
        getInstitutionsApi().then(response => {
            setInstitutionsList(response.institution)
        })
    }, [userData])

    //Traer el avatar si se sube uno nuevo
    useEffect(() => {
        if (avatar) {
            setInputs({ ...inputs, avatar: avatar.file })
        }
    }, [avatar])

    //Función para guardar los datos editados 
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

    //Función para validar los datos
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
        let userUpdate = inputs

        if (!name || !lastname || !nickname || userUpdate.institution === "" ||
            userUpdate.school_grade === "") {
            setMessageNotification("Todos los campos son requeridos")
            setOpenNotification(true)
            return

        }

        if (!email) {
            setMessageNotification("Ingrese un correo válido.")
            setOpenNotification(true)

            return
        }

        //si cambió la foto de perfil, lo actualiza
        if (typeof inputs.avatar === "object") {
            uploadAvatarApi(userUpdate.avatar, userData._id).then(response => {
                //Obtenemos el nuevo nombre del archivo subido
                userUpdate.avatar = response.avatarName

                //Actualiza los datos del usuario con el AVATAR
                updateUserApi(getAccessTokenApi(), userUpdate, userData._id).then(result => {
                    if (result.status === 0) {
                        setMessageNotification(result.message)
                        setOpenNotification(true)
                    } else {
                        //Recarga la pagina para visualizar el nuevo foto de perfil
                        window.location.reload()

                        //Si se modificó el correo o el nickname, cierra sesión
                        if (userUpdate.email !== jwtDecode(getAccessTokenApi()).email ||
                            userUpdate.nickname !== jwtDecode(getAccessTokenApi()).nickname) {
                            //cierra sesión
                            logout()
                        }
                    }
                })
            })
        } else {
            //Actualiza los datos del usuario SIN el avatar
            userUpdate.avatar = userData.avatar

            updateUserApi(getAccessTokenApi(), userUpdate, userData._id).then(result => {
                if (result.status === 0) {
                    setMessageNotification(result.message)
                    setOpenNotification(true)
                } else {
                    //Si se modificó el correo o el nickname, cierra sesión
                    if (userUpdate.email !== jwtDecode(getAccessTokenApi()).email ||
                        userUpdate.nickname !== jwtDecode(getAccessTokenApi()).nickname) {
                        //cierra sesión
                        logout()
                        //Recarga la pagina para redirigir al login
                        window.location.reload()
                    }

                    //Recarga la nueva info y cierra el modal
                    setreloadProfile(true)
                    close()
                }
            })
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

                <div style={{
                    display: 'none',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
                </div>

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

function UploadAvatar(props) {
    const { avatar, setAvatar, nickname } = props
    const [avatarUrl, setAvatarUrl] = useState(null)
    const classes = useStyles()

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview)
            } else {
                setAvatarUrl(avatar)
            }
        } else {
            setAvatarUrl(null)
        }
    }, [avatar])

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0]
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [setAvatar]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop: onDrop
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar src={null} className={classes.avatar} />
            ) : (
                <Avatar src={avatarUrl ? avatarUrl : null} className={classes.avatar} />
            )}
        </div>
    )
}

export default ProfileForm
