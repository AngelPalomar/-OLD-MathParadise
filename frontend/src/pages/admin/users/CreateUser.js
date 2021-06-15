import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
    Grid, Typography, TextField, FormControl, InputLabel, Select,
    MenuItem, Paper, Divider, Button, FormControlLabel, Switch
} from '@material-ui/core'
import { useStyles } from '../useStyles'

/**Components */
import DefaultSnackbar from '../../../components/snackbars/DefaultSnackbar'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

/**APis */
import { getInstitutionsApi } from '../../../api/institution'
import { createUserApi } from '../../../api/user'

/**Utils */
import { grades } from '../../../utils/SelectArrays'
import {
    emailValidation,
    minLenghtValidation,
    nicknameValidation
} from '../../../utils/FormValidation'

function CreateUser() {
    const classes = useStyles()

    //Estado para la info del usuario
    const [inputs, setInputs] = useState({
        name: "",
        lastname: "",
        nickname: "",
        email: "",
        password: "",
        school_grade: 0,
        institution: "",
        role: "",
        active: false
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
        institution: false,
        school_grade: false,
        password: false,
        repeatPassword: false,
        role: false
    })

    //Estado par alas institut
    const [instData, setInstData] = useState([])
    //Estado para el snack
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    //Efecto que trae las instituciones
    useEffect(() => {
        getInstitutionsApi().then(response => {
            if (response.status === 1) {
                setInstData(response.institution)
            }
        })
    }, [])

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
        if (type === "password") {
            setformValid({ ...formValid, [name]: minLenghtValidation(value, 8) })
            setIsError({ ...isError, [name]: !minLenghtValidation(value, 8) })
        }
    }

    //Función que valida y sube todo al server
    const submitUser = (e) => {
        e.preventDefault()

        if (!formValid.name || !formValid.lastname || !formValid.nickname || !formValid.email
            || !formValid.password || inputs.institution === "" || inputs.school_grade === "" ||
            inputs.role === "") {
            setOpen(true)
            setMessage("Todos los campos son requeridos")
            return
        }

        //Guarda el usuario en el server
        createUserApi(inputs).then(response => {
            if (response.status === 0) {
                setOpen(true)
                setMessage(response.message)
            } else {
                setOpen(true)
                setMessage(response.message)

                //Redirige al menú
                window.location.href = "/admin/users"
            }
        })
    }

    return (
        <Fragment>
            <DefaultSnackbar
                open={open}
                handleClose={() => setOpen(false)}
                message={message} />
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                    <AddIcon fontSize="large" /> Añadir usuario
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
                                error={isError.email}
                                onChange={inputValidation}
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                type="password"
                                name="password"
                                label="*Contraseña (8 caracteres)"
                                variant="outlined"
                                error={isError.password}
                                onChange={inputValidation}
                                className={classes.textField} />
                        </Grid>
                        {/* <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField
                                type="password"
                                name="repeatPassword"
                                label="*Confirmar contraseña"
                                variant="outlined"
                                className={classes.textField} />
                        </Grid> */}
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel id="lbl_institution">Seleccione una institución</InputLabel>
                                <Select
                                    name="institution"
                                    labelId="lbl_institution"
                                    onChange={changeForm}
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
        </Fragment>
    )
}

export default CreateUser
