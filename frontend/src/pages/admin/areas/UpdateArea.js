import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from '../useStyles'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField, Switch, FormControlLabel, CircularProgress
} from "@material-ui/core"

/**Apis */
import { updateAreaApi, getAreaByIdApi } from '../../../api/areas'

/**Components */
import DefaultSnackbar from '../../../components/snackbars/DefaultSnackbar'

/**Utils */
import { minLenghtValidation } from '../../../utils/FormValidation'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function UpdateArea(props) {
    const classes = useStyles()
    //Traigo el id del documento
    const { match: { params: { id } } } = props

    const [inputs, setInputs] = useState({
        name: '',
        active: false
    })

    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    //guardo los datos en un estado
    useEffect(() => {
        getAreaByIdApi(id).then(response => {
            if (response.status === 1) {
                setInputs(response.area)
                setIsLoading(false)
            } else {
                window.location.href = "/admin/areas"
            }
        })
    }, [])

    //Cerrar notificación
    const handleCloseSnackbar = () => {
        setOpen(false)
    }

    //Cambio del formulario
    const changeForm = (e) => {
        if (e.target.type === 'checkbox') {
            setInputs({
                ...inputs,
                active: e.target.checked
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
    }

    //Submit del formulario
    const submitForm = (e) => {
        e.preventDefault()
        if (!minLenghtValidation(inputs.name, 1)) {
            setOpen(true)
            setMessage("Todos los campos son requeridos.")
        } else {
            //Actualiza el area llamando el API
            updateAreaApi(inputs, id).then(response => {
                if (response.status === 0) {
                    setOpen(true)
                    setMessage(response.message)
                } else {
                    setOpen(true)
                    setMessage(response.message)

                    window.location.href = "/admin/areas"
                }
            })
        }
    }

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <>
            <DefaultSnackbar
                open={open}
                handleClose={handleCloseSnackbar}
                message={message} />
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                    <AddIcon fontSize="large" /> Añadir area (Materia)
            </Typography>
                <Divider />
                <form onChange={changeForm} onSubmit={submitForm} className={classes.formBox}>
                    <Typography>*Todos los campos son requeridos</Typography>
                    <Grid container spacing={2} className={classes.form}>
                        <Grid item lg={8}>
                            <TextField
                                type="text"
                                name="name"
                                label="*Nombre del area"
                                variant="outlined"
                                className={classes.textField}
                                value={inputs.name} />
                        </Grid>
                        <Grid item lg={4}>
                            <FormControlLabel label="Estado (Habilitado / deshabilitado)" control={
                                <Switch
                                    //checked={inputs.active}
                                    checked={inputs.active}
                                    name="active" />
                            } />
                        </Grid>
                    </Grid>
                    <Box className={classes.formButtons}>
                        <Link className={classes.link} to="/admin/areas">
                            <Button className={classes.cancelButton}>
                                Cancelar
                            </Button>
                        </Link>
                        <Button type="submit" className={classes.okButton}>
                            Guardar
                    </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default UpdateArea