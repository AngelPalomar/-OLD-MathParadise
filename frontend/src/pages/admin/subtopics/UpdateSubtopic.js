import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from '../useStyles'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField, FormControl,
    Select, MenuItem, InputLabel, FormControlLabel, Switch, CircularProgress
} from "@material-ui/core"

import { BlockMath } from "react-katex"
import 'katex/dist/katex.min.css'

/**APIS */
import { getAreasApi } from '../../../api/areas'
import { getTopicsApi } from '../../../api/topics'
import { getSubtopicByIdApi, updateSubtopicApi } from '../../../api/subtopics'

/**Components */
import DefaultSnackbar from '../../../components/snackbars/DefaultSnackbar'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function UpdateSubtopic(props) {
    const classes = useStyles()
    //Traigo el id del documento
    const { match: { params: { id } } } = props

    const [areas, setAreas] = useState([])
    const [topics, setTopics] = useState([])
    const [inputs, setInputs] = useState({
        name: '',
        topic: '',
        area: '',
        displayLabel: '',
        symbol: '',
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
        //Areas
        getAreasApi().then(r => {
            if (r.status === 1) {
                setAreas(r.areas)
            }
        })

        //Traigo la info del subtema seleccionado
        getSubtopicByIdApi(id).then(response => {
            if (response.status === 1) {
                setInputs(response.subtopic)
                setIsLoading(false)
            } else {
                window.location.href = '/admin/subtopics'
            }
        })
    }, [])

    //Efecto que reacciona al area seleccionada y muestra los temas correspondiente
    useEffect(() => {
        //Topics
        getTopicsApi(`area=${inputs.area}`).then(r => {
            if (r.status === 1) {
                setTopics(r.topics)
            }
        })
    }, [inputs.area])

    //Cambio del form
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

    //Subir el formulrio
    const submitForm = (e) => {
        e.preventDefault()

        const { name, area, topic, displayLabel, symbol } = inputs
        if (name === '' || area === '' || topic === '' || displayLabel === '' ||
            symbol === '') {
            setMessage("Todos los campos son requeridos.")
            setOpen(true)
        } else {
            if (displayLabel.length > 12) {
                setMessage("El nombre de la casilla debe tener menos de 13 caracteres.")
                setOpen(true)
            } else {
                updateSubtopicApi(inputs, id).then(r => {
                    setMessage(r.message)
                    setOpen(true)
                    if (r.status === 1) {
                        window.location.href = '/admin/subtopics'
                    }
                })
            }
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
                    <AddIcon fontSize="large" /> Añadir subtema
            </Typography>
                <Divider />
                <form className={classes.formBox} onChange={changeForm} onSubmit={submitForm}>
                    <Typography>*Todos los campos son requeridos</Typography>
                    <Grid container spacing={2} className={classes.form}>
                        <Grid item lg={4}>
                            <TextField
                                type="text"
                                name="name"
                                label="*Nombre del subtema"
                                variant="outlined"
                                className={classes.textField}
                                value={inputs.name} />
                        </Grid>
                        <Grid item lg={4}>
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
                                            key={index}
                                            value={values.name}>
                                            {values.name}
                                        </MenuItem>
                                    )}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={4}>
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel id="lbl_topic">*Tema</InputLabel>
                                <Select
                                    name="topic"
                                    label="*Tema"
                                    labelId="lbl_topic"
                                    onChange={changeForm}
                                    value={inputs.topic}>

                                    {topics.map((values, index) =>
                                        <MenuItem
                                            style={{ color: !values.active ? 'red' : 'black' }}
                                            key={index}
                                            value={values.name}>
                                            {values.name}
                                        </MenuItem>
                                    )}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6}>
                            <TextField
                                type="text"
                                name="displayLabel"
                                label="*Nombre a mostrar en las casillas"
                                variant="outlined"
                                className={classes.textField}
                                value={inputs.displayLabel} />
                        </Grid>
                        <Grid item lg={4}>
                            <TextField
                                type="text"
                                name="symbol"
                                label="*Símbolo a mostrar en casillas"
                                variant="outlined"
                                className={classes.textField}
                                value={inputs.symbol} />
                        </Grid>
                        <Grid item lg={2}>
                            {
                                inputs.symbol !== '' ?
                                    <BlockMath
                                        math={inputs.symbol}
                                        renderError={() => {
                                            return <span className={classes.labelError}>
                                                *Use KATEX
                                            </span>
                                        }} /> : <span>Vista previa</span>
                            }
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
                        <Link className={classes.link} to="/admin/subtopics">
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

export default UpdateSubtopic
