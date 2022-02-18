import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
    Grid, Typography, TextField, FormControl, InputLabel, Select,
    MenuItem, Paper, Divider, Button, FormControlLabel, Switch, CircularProgress
} from '@material-ui/core'
import { useStyles } from '../useStyles'

/**Components */
import DefaultSnackbar from '../../../components/common/DefaultSnackbar'
import GameStats from '../../../components/common/GameHistoryAccordion'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

/**APis */
import { getInstitutionsApi } from '../../../api/institution'
import { getUserByIdApi, /* getUserByNicknameApi, */ updateFullUserApi } from '../../../api/user'

/**Utils */
import { grades } from '../../../utils/SelectArrays'
import {
    emailValidation,
    minLenghtValidation,
    nicknameValidation
} from '../../../utils/FormValidation'


function UpdateUser(props) {
    const classes = useStyles()

    //Traigo el id del documento
    const { match: { params: { id } } } = props

    const [isLoading, setIsLoading] = useState(true)

    //Estado para la info del usuario
    const [inputs, setInputs] = useState({
        name: "",
        lastname: "",
        nickname: "",
        email: "",
        password: "",
        repeatPassword: "",
        school_grade: 0,
        institution: "",
        role: "",
        active: false
    })
    const [idUser, setIdUser] = useState("")
    //Contornos de error de los campos
    const [isError, setIsError] = useState({
        name: false,
        lastname: false,
        nickname: false,
        email: false
    })

    //Validación de los campos
    const [formValid, setformValid] = useState({
        name: true,
        lastname: true,
        nickname: true,
        email: true,
        institution: true,
        school_grade: true,
        role: true
    })

    //Estado par alas institut
    const [instData, setInstData] = useState([])
    //Estado para el snack
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    //Efecto que trae las instituciones y el usuario
    useEffect(() => {
        getUserByIdApi(id).then(response => {
            const { user } = response

            setInputs({
                name: user.name,
                lastname: user.lastname,
                nickname: user.nickname,
                email: user.email,
                password: "",
                repeatPassword: "",
                school_grade: user.school_grade,
                institution: user.institution,
                role: user.role,
                active: user.active,
                classic: user.classic,
                arcade: user.arcade,
                rush: user.rush
            })

            setIdUser(user._id)
            setIsLoading(false)

        }).catch(error => {
            console.log(error)
            window.location.href = "/admin/users"
        })

        getInstitutionsApi().then(response => {
            if (response.status === 1) {
                setInstData(response.institution)
            }
        })
    }, [id])

    //Función que guarda los datos en el estado
    const changeForm = (e) => {
        if (e.target.type === 'checkbox') {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
    }

    //Función que valida
    const inputValidation = (e) => {
        const { type, name, value } = e.target

        /**Validaciones */
        if (type === "text" && name !== "nickname") {
            setformValid({ ...formValid, [name]: minLenghtValidation(value, 1) })
        }
        if (name === "nickname") {
            setformValid({ ...formValid, nickname: nicknameValidation(e.target) })
            setIsError({ ...isError, nickname: !nicknameValidation(e.target) })
        }
        if (type === "email") {
            setformValid({ ...formValid, [name]: emailValidation(e.target) })
            setIsError({ ...isError, [name]: !emailValidation(e.target) })
        }
    }

    //Función que valida y sube todo al server
    const submitUser = (e) => {
        e.preventDefault()

        if (!formValid.name || !formValid.lastname || !formValid.nickname || !formValid.email
            || inputs.institution === "" || inputs.school_grade === "" ||
            inputs.role === "") {
            setOpen(true)
            setMessage("Todos los campos son requeridos")
            return
        }

        //Valida la contraseña si se ingresó
        if (inputs.password !== "" || inputs.repeatPassword !== "") {
            if (!minLenghtValidation(inputs.password, 8)) {
                setOpen(true)
                setMessage("La contraseña debe tener al menos 8 caracteres")
                return
            }

            if (inputs.password !== inputs.repeatPassword) {
                setOpen(true)
                setMessage("Las contraseñas deben coincidir")
                return
            }
        }

        //elimina la repetaPassword
        delete inputs.repeatPassword

        //Actualiza el usuario
        updateFullUserApi(inputs, idUser).then(response => {
            setOpen(true)
            setMessage(response.message)

            if (response.status === 1) {
                window.location.href = "/admin/users"
            }
        })
    }

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <Fragment>
            <DefaultSnackbar
                open={open}
                handleClose={() => setOpen(false)}
                message={message} />
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                    <AddIcon fontSize="large" /> Modificar usuario
                </Typography>
                <Divider />
                <form onChange={changeForm} onSubmit={submitUser} className={classes.formBox}>
                    <Typography>*Todos los campos son requeridos</Typography>
                    <Grid container spacing={2} className={classes.form}>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                type="text"
                                name="name"
                                label="*Nombres(s)"
                                variant="outlined"
                                value={inputs.name}
                                error={isError.name}
                                onChange={inputValidation}
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                type="text"
                                name="lastname"
                                label="*Apellido(s)"
                                variant="outlined"
                                value={inputs.lastname}
                                error={isError.lastname}
                                onChange={inputValidation}
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                type="text"
                                name="nickname"
                                label="*Alias (Ejemplo: axe_123)"
                                variant="outlined"
                                value={inputs.nickname}
                                error={isError.nickname}
                                onChange={inputValidation}
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                type="email"
                                name="email"
                                label="*Correo electrónico"
                                variant="outlined"
                                value={inputs.email}
                                error={isError.email}
                                onChange={inputValidation}
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField
                                type="password"
                                name="password"
                                label="Nueva contraseña"
                                variant="filled"
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField
                                type="password"
                                name="repeatPassword"
                                label="*Confirm. nueva contraseña"
                                variant="filled"
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel id="lbl_institution">Seleccione una institución</InputLabel>
                                <Select
                                    name="institution"
                                    labelId="lbl_institution"
                                    onChange={changeForm}
                                    value={inputs.institution}
                                    label="Seleccione una institución">

                                    <MenuItem key="" value="Ninguna">Ninguna</MenuItem>

                                    {instData.map((values, index) =>
                                        <MenuItem key={index} value={values.name}>{values.name}</MenuItem>
                                    )}

                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel id="lbl_school_grade">Año / Semestre / Cuatrimestre</InputLabel>
                                <Select
                                    name="school_grade"
                                    labelId="lbl_school_grade"
                                    onChange={changeForm}
                                    value={inputs.school_grade}
                                    label="Año / Semestre / Cuatrimestre">

                                    <MenuItem key="" value="Ninguno">Ninguno</MenuItem>

                                    {grades.map((values, index) =>
                                        <MenuItem key={index} value={values.val}>{values.name}</MenuItem>
                                    )}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel id="lbl_role">Tipo de usuario</InputLabel>
                                <Select
                                    name="role"
                                    labelId="lbl_role"
                                    onChange={changeForm}
                                    value={inputs.role}
                                    label="Tipo de usuario">

                                    <MenuItem value="admin">Administrador</MenuItem>
                                    <MenuItem value="moderator">Moderador</MenuItem>
                                    <MenuItem value="tutor">Tutor</MenuItem>
                                    <MenuItem value="student">Estudiante</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControlLabel
                                label="Estado (Activo / Inactivo)"
                                className={classes.textField}
                                control={
                                    <Switch
                                        checked={inputs.active}
                                        name="active" />
                                } />
                        </Grid>
                    </Grid >
                    <div className={classes.formButtons}>
                        <Link className={classes.link} to="/admin/users">
                            <Button className={classes.cancelButton}>
                                Cancelar
                            </Button>
                        </Link>
                        <Button type="submit" className={classes.okButton}>
                            Guardar
                        </Button>
                    </div>
                </form >
            </Paper >
            <Grid container spacing={1} style={{ marginBlock: 10 }}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GameStats gamemode='classic' stats={inputs.classic} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GameStats gamemode='arcade' stats={inputs.arcade} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GameStats gamemode='rush' stats={inputs.rush} />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default UpdateUser
