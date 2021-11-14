import React, { useState, useEffect, Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import {
    Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem,
    Typography, Avatar, CircularProgress, Box, LinearProgress
} from "@material-ui/core"
import { useStyles } from './useStyles'

/**Icons */
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/Save'

/**Components */
import DefaultSnackbar from '../snackbars/DefaultSnackbar'
import DefaultAvatar from '../DefaultAvatar'

/**Utils */
import { minLenghtValidation, emailValidation, nicknameValidation } from '../../utils/FormValidation'
import { grades } from '../../utils/SelectArrays'

/**APIs */
import { getInstitutionsApi } from '../../api/institution'
import { getUserByIdApi, updateUserApi, uploadAvatarApi } from '../../api/user'
import { getAccessTokenApi, logout } from '../../api/auth'
import { basePath, apiVersion } from '../../api/config'

function ProfileForm(props) {
    const classes = useStyles()
    const [institutionsList, setInstitutionsList] = useState([])
    const id = jwtDecode(getAccessTokenApi()).id;

    const [inputs, setInputs] = useState({})
    const [avatar, setAvatar] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
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
                school_grade: user.school_grade,
                avatar: user.avatar
            })

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

    if (isLoadingData) {
        return <LinearProgress variant='indeterminate' color='primary' />
    }

    return (
        <Fragment>
            <DefaultSnackbar message={messageNotification} open={openNotification} handleClose={() => setOpenNotification(false)} />
            <Box>
                <Box className={classes.container}>
                    <DefaultAvatar nickname={inputs.nickname} size={100} />
                    <input type='file' id='select-avatar' className={classes.inputFile} />
                    <label htmlFor='select-avatar' className={classes.selectImageLabel}>
                        <Typography>Cambiar avatar</Typography>
                    </label>
                    <Avatar style={{ width: 100, height: 100 }} />
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
                                name="nickname"
                                label="*Alias"
                                variant="outlined"
                                fullWidth
                                value={inputs.nickname} />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                type="email"
                                name="email"
                                label="*Correo electrónico"
                                variant="outlined"
                                fullWidth
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
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography className={classes.label}>*Si modifica el correo electrónico o el alias, se cerarrá la sesión.</Typography>
                        </Grid>
                    </Grid>

                    <Box marginTop={2}>
                        {
                            isLoading ?
                                <CircularProgress color='primary' variant='indeterminate' /> :
                                <Fragment>
                                    <Button
                                        className={classes.button}
                                        color='primary'
                                        variant='contained'
                                        startIcon={<SaveIcon />}>
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
export default ProfileForm
