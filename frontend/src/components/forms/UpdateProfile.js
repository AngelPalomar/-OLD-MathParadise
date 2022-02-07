import React, { useState, useEffect, Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import {
    Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem,
    Avatar, CircularProgress, Box, LinearProgress, Typography
} from "@material-ui/core"
import { useStyles } from './useStyles'

/**Icons */
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/Save'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

/**Components */
import DefaultSnackbar from '../snackbars/DefaultSnackbar'
import DefaultAvatar from '../DefaultAvatar'

/**Utils */
import { minLenghtValidation } from '../../utils/FormValidation'
import { grades } from '../../utils/SelectArrays'

/**APIs */
import { getInstitutionsApi } from '../../api/institution'
import { getUserByIdApi, updateUserApi, uploadAvatarApi } from '../../api/user'
import { getAccessTokenApi } from '../../api/auth'

function UpdateProfile(props) {
    const classes = useStyles()
    const [institutionsList, setInstitutionsList] = useState([])
    const id = jwtDecode(getAccessTokenApi()).id;

    const [inputs, setInputs] = useState({})
    const [oldAvatar, setOldAvatar] = useState('');
    const [newAvatar, setNewAvatar] = useState(new Blob())
    const [changedAvatar, setChangedAvatar] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(true)

    //Snackbar
    const [messageNotification, setMessageNotification] = useState('')
    const [openNotification, setOpenNotification] = useState(false)

    useEffect(() => {
        getUserByIdApi(id).then(response => {
            const user = response.user

            setInputs({
                name: user.name,
                lastname: user.lastname,
                nickname: user.nickname,
                email: user.email,
                institution: user.institution,
                school_grade: user.school_grade
            })
            setOldAvatar(user.nickname);

            //Para la carga
            setIsLoadingData(false)
        })

        //Traer institutciones
        getInstitutionsApi().then(response => {
            setInstitutionsList(response.institution)
        })
    }, [id])

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

    /**Subir imagen */
    const onChangeImage = (e) => {
        let fileName = "";
        let extension = "";
        fileName = e.target.files[0].name;
        extension = fileName.split('.').pop();

        if (extension === 'jpg' || extension === 'png') {
            setNewAvatar(e.target.files[0]);
            setChangedAvatar(true);
        } else {
            setMessageNotification('Solo se aceptan imágenes con el formato .png o .jpg');
            setOpenNotification(true);
        }
    }

    //Actualizar perfil
    const updateProfile = () => {
        //Validaciones
        if (!minLenghtValidation(inputs.name, 1)) {
            setMessageNotification('Ingrese un nombre');
            setOpenNotification(true);
            return;
        }

        if (!minLenghtValidation(inputs.lastname, 1)) {
            setMessageNotification('Ingrese un apellido.');
            setOpenNotification(true);
            return;
        }

        //Inicia carga
        setIsUpdating(true);

        //Si subio imagen
        if (changedAvatar) {
            uploadAvatarApi(newAvatar, id).then(response => {
                if (response.status === 1) {
                    updateUserApi(getAccessTokenApi(), inputs, id).then(response => {
                        if (response.status === 1) {
                            setMessageNotification(response.message);
                            setOpenNotification(true);
                            setIsUpdating(false);
                        } else {
                            setMessageNotification(response.message);
                            setOpenNotification(true);
                            setIsUpdating(false);
                        }
                    })
                } else {
                    setMessageNotification('Error al subir la imagen, intente de nuevo.');
                    setOpenNotification(true);
                    setIsUpdating(false);
                }
            })
        } else {
            updateUserApi(getAccessTokenApi(), inputs, id).then(response => {
                if (response.status === 1) {
                    setMessageNotification(response.message);
                    setOpenNotification(true);
                    setIsUpdating(false);
                } else {
                    setMessageNotification(response.message);
                    setOpenNotification(true);
                    setIsUpdating(false);
                }
            })
        }
    }

    if (isLoadingData) {
        return <LinearProgress variant='indeterminate' color='primary' />
    }

    return (
        <Fragment>
            <DefaultSnackbar message={messageNotification} open={openNotification} handleClose={() => setOpenNotification(false)} />
            <Box>
                <Typography variant='h6' gutterBottom>Editar perfil</Typography>
                <Box className={classes.container}>
                    <DefaultAvatar nickname={oldAvatar} size={100} />
                    <input
                        type='file'
                        id='select-avatar'
                        className={classes.inputFile}
                        multiple={false}
                        accept="image/*"
                        onChange={onChangeImage} />
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.selectAvatarBtn}
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => { document.getElementById('select-avatar').click() }}>
                        Cambiar avatar
                    </Button>
                    <div onClick={() => { document.getElementById('select-avatar').click() }}>
                        <Avatar
                            style={{ width: 100, height: 100 }}
                            src={URL.createObjectURL(newAvatar)} />
                    </div>

                </Box>
                <form onChange={changeForm}>
                    <Grid container spacing={2}>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                type="text"
                                name="name"
                                label="*Nombres"
                                variant="outlined"
                                fullWidth
                                value={inputs.name} />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                type="text"
                                name="lastname"
                                label="*Apellidos"
                                variant="outlined"
                                fullWidth
                                value={inputs.lastname} />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                type="text"
                                label="*Alias"
                                variant="outlined"
                                fullWidth
                                disabled
                                value={inputs.nickname} />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                type="email"
                                label="*Correo electrónico"
                                variant="outlined"
                                fullWidth
                                disabled
                                value={inputs.email} />
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
                    </Grid>

                    <Box marginTop={2}>
                        {
                            isUpdating ?
                                <CircularProgress color='primary' variant='indeterminate' /> :
                                <Fragment>
                                    <Button
                                        className={classes.button}
                                        color='primary'
                                        variant='contained'
                                        startIcon={<SaveIcon />}
                                        onClick={updateProfile}>
                                        Guardar
                                    </Button>
                                    <Button
                                        startIcon={<ClearIcon />}
                                        className={classes.cancelButton}>
                                        Cancelar
                                    </Button>
                                </Fragment>
                        }
                    </Box>
                </form>
            </Box>
        </Fragment>
    )
}
export default UpdateProfile
