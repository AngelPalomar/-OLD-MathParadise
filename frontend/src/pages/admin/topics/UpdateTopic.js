import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from '../useStyles'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField, FormControl,
    Select, MenuItem, InputLabel, FormControlLabel, Switch, CircularProgress
} from "@material-ui/core"

/**APIS */
import { getAreasApi } from '../../../api/areas'
import { getTopicByIdApi, updateTopicApi } from '../../../api/topics'

/**Components */
import DefaultSnackbar from '../../../components/snackbars/DefaultSnackbar'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function UpdateTopic(props) {
    const classes = useStyles()
    //Traigo el id del documento
    const { match: { params: { id } } } = props

    const [areas, setAreas] = useState([])
    const [inputs, setInputs] = useState({
        name: '',
        area: '',
        active: false
    })

    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    //Cerrar notificación
    const handleCloseSnackbar = () => {
        setOpen(false)
    }

    useEffect(() => {
        //Traigo las areas para que sean seleccionadas
        getAreasApi().then(r => {
            if (r.status === 1) {
                setAreas(r.areas)
            }
        })

        //Traigo el tema seleccionado de la tabla
        getTopicByIdApi(id).then(response => {
            if (response.status === 1) {
                setInputs(response.topic)
                setIsLoading(false)
            } else {
                window.location.href = "/admin/topics"
            }
        })
    }, [id])

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

    const submitForm = (e) => {
        e.preventDefault()

        if (inputs.name !== '' && inputs.area !== '') {
            updateTopicApi(inputs, id).then(r => {
                setOpen(true)
                setMessage(r.message)
                if (r.status === 1) {
                    setOpen(true)
                    setMessage(r.message)
                    window.location.href = '/admin/topics'
                }
            })
        } else {
            setOpen(true)
            setMessage('todos los campos son requeridos')
        }
    }

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <Fragment>
            <DefaultSnackbar
                open={open}
                handleClose={handleCloseSnackbar}
                message={message} />
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                    <AddIcon fontSize="large" /> Añadir tema
                </Typography>
                <Divider />
                <form className={classes.formBox} onChange={changeForm} onSubmit={submitForm}>
                    <Typography>*Todos los campos son requeridos</Typography>
                    <Grid container spacing={2} className={classes.form}>
                        <Grid item lg={6}>
                            <TextField
                                type="text"
                                name="name"
                                label="*Nombre del tema"
                                variant="outlined"
                                className={classes.textField}
                                value={inputs.name} />
                        </Grid>
                        <Grid item lg={6}>
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel id="lbl_area">*Area</InputLabel>
                                <Select
                                    name="area"
                                    label="*Area"
                                    labelId="lbl_area"
                                    onChange={changeForm}
                                    value={inputs.area}>

                                    {areas.map((values, index) =>
                                        <MenuItem
                                            style={{ color: !values.active ? 'red' : 'black' }}
                                            key={index} value={values.name}>
                                            {values.name}
                                        </MenuItem>
                                    )}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6}>
                            <FormControlLabel label="Estado (Habilitado / deshabilitado)" control={
                                <Switch
                                    checked={inputs.active}
                                    name="active" />
                            } />
                        </Grid>
                    </Grid>
                    <Box className={classes.formButtons}>
                        <Link className={classes.link} to="/admin/topics">
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
        </Fragment>
    )
}

export default UpdateTopic
