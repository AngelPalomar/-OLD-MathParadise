import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from '../useStyles'
import { BlockMath, InlineMath } from "react-katex"
import 'katex/dist/katex.min.css'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField, FormControl,
    Select, MenuItem, InputLabel, FormControlLabel, Switch, CircularProgress
} from "@material-ui/core"

/**Conts */
import { difficulties } from '../../../utils/SelectArrays'

/**APIS */
import { getAreasApi } from '../../../api/areas'
import { getTopicsApi } from '../../../api/topics'
import { getTSubtopicsApi } from '../../../api/subtopics'
import { getExcerciseByIdApi, updateExcercise } from '../../../api/excercises'

/**Components */
import DefaultSnackbar from '../../../components/snackbars/DefaultSnackbar'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function UpdateExcercise(props) {
    const classes = useStyles()
    //Traigo el id del documento
    const { match: { params: { id } } } = props

    const [areas, setAreas] = useState([])
    const [topics, setTopics] = useState([])
    const [subtopics, setSubtopics] = useState([])

    const [inputs, setInputs] = useState({
        label: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        answer: "",
        area: "",
        topic: "",
        subtopic: "",
        difficulty: "",
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

        //Traigo la info del ejercicio a editar
        getExcerciseByIdApi(id).then(response => {
            if (response.status === 1) {
                setInputs(response.excercise)
                setIsLoading(false)
            } else {
                window.location.href = '/admin/excercises'
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

    //Efecto que reacciona al area seleccionada y muestra los temas correspondiente
    useEffect(() => {
        //Topics
        getTSubtopicsApi(`area=${inputs.area}&topic=${inputs.topic}`).then(r => {
            if (r.status === 1) {
                setSubtopics(r.subtopics)
            }
        })
    }, [inputs.area, inputs.topic])

    //Cambio de valores de los states y formulario
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

    const submit = (e) => {
        e.preventDefault()

        const { label, option_a, option_b, option_c, option_d, answer, area, topic,
            subtopic, difficulty } = inputs

        if (label === "" || option_a === "" || option_b === "" || option_c === "" ||
            option_d === "" || answer === "" || area === "" || topic === "" ||
            subtopic === "" || difficulty === "") {
            setMessage("Todos los campos son requeridos")
            setOpen(true)
        } else {
            updateExcercise(inputs, id).then(r => {
                if (r.status === 1) {
                    setMessage(r.message)
                    setOpen(true)

                    window.location.href = "/admin/excercises"
                } else {
                    setMessage(r.message)
                    setOpen(true)
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
                    <AddIcon fontSize="large" /> Añadir ejercicio
                </Typography>
                <Divider />
                <Box className={classes.excerPreviewBox}>
                    {inputs.label !== "" ?
                        <Box>
                            <BlockMath math={inputs.label} renderError={(error) => { return <span className={classes.labelError}>Error: función desconocida o incompleta.</span> }} />
                            <Typography className={classes.previewLabel}>Ejercicio principal</Typography>
                        </Box> :
                        <span className={classes.previewLabel}>
                            Escriba el ejercicio en funciones KaTex en el campo inferior
                        </span>
                    }
                </Box>
                <Box className={classes.optionsPreviewBox}>
                    <Grid container spacing={1} >
                        <Grid item lg={3} className={classes.textCenter}>
                            {inputs.option_a !== "" ?
                                <Box>
                                    <BlockMath math={inputs.option_a} />
                                    <Typography className={classes.previewLabel}>Opción A</Typography>
                                </Box> :
                                <span>
                                    Escriba la opción [a] en funciones KaTex
                                </span>
                            }
                        </Grid>
                        <Grid item lg={3} className={classes.textCenter}>
                            {inputs.option_b !== "" ?
                                <Box>
                                    <BlockMath math={inputs.option_b} />
                                    <Typography className={classes.previewLabel}>Opción B</Typography>
                                </Box> :
                                <span>
                                    Escriba la opción [b] en funciones KaTex
                                </span>
                            }
                        </Grid>
                        <Grid item lg={3} className={classes.textCenter}>
                            {inputs.option_c !== "" ?
                                <Box>
                                    <BlockMath math={inputs.option_c} />
                                    <Typography className={classes.previewLabel}>Opción C</Typography>
                                </Box> :
                                <span>
                                    Escriba la opción [c] en funciones KaTex
                                </span>
                            }
                        </Grid>
                        <Grid item lg={3} className={classes.textCenter}>
                            {inputs.option_d !== "" ?
                                <Box>
                                    <BlockMath math={inputs.option_d} />
                                    <Typography className={classes.previewLabel}>Opción D</Typography>
                                </Box> :
                                <span>
                                    Escriba la opción [d] en funciones KaTex
                                </span>
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Box className={classes.formBox}>
                    <form onChange={changeForm} onSubmit={submit}>
                        <Typography>Todos los campos son requeridos</Typography>
                        <Grid container spacing={2} className={classes.form}>
                            <Grid item lg={8}>
                                <TextField
                                    type="text"
                                    name="label"
                                    label="Ingrese el ejercicio principal (use funciones KaTex)"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={inputs.label} />
                            </Grid>
                            <Grid item lg={4}>
                                {inputs.option_a !== "" && inputs.option_b !== "" && inputs.option_c !== "" && inputs.option_d !== "" ?
                                    <FormControl variant="outlined" className={classes.textField}>
                                        <InputLabel id="right_answer">Seleccione la respuesta correcta</InputLabel>
                                        <Select
                                            name="answer"
                                            labelId="right_answer"
                                            label="Seleccione la respuesta correcta"
                                            onChange={changeForm}
                                            value={inputs.answer}>

                                            <MenuItem value={inputs.option_a}>
                                                {inputs.option_a !== "" ?
                                                    <InlineMath math={`a)\\; ${inputs.option_a}`} /> :
                                                    <span>
                                                        Opción A
                                                    </span>
                                                }
                                            </MenuItem>
                                            <MenuItem value={inputs.option_b}>
                                                {inputs.option_b !== "" ?
                                                    <InlineMath math={`b)\\; ${inputs.option_b}`} /> :
                                                    <span>
                                                        Opción B
                                                    </span>
                                                }
                                            </MenuItem>
                                            <MenuItem value={inputs.option_c}>
                                                {inputs.option_c !== "" ?
                                                    <InlineMath math={`c)\\; ${inputs.option_c}`} /> :
                                                    <span>
                                                        Opción C
                                                    </span>
                                                }
                                            </MenuItem>
                                            <MenuItem value={inputs.option_d}>
                                                {inputs.option_d !== "" ?
                                                    <InlineMath math={`d)\\; ${inputs.option_d}`} /> :
                                                    <span>
                                                        Opción D
                                                    </span>
                                                }
                                            </MenuItem>
                                        </Select>
                                    </FormControl> : null
                                }
                            </Grid>
                            <Grid item lg={3}>
                                <TextField
                                    type="text"
                                    name="option_a"
                                    label="Ingrese la opción a"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={inputs.option_a} />
                            </Grid>
                            <Grid item lg={3}>
                                <TextField
                                    type="text"
                                    name="option_b"
                                    label="Ingrese la opción b"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={inputs.option_b} />
                            </Grid>
                            <Grid item lg={3}>
                                <TextField
                                    type="text"
                                    name="option_c"
                                    label="Ingrese la opción c"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={inputs.option_c} />
                            </Grid>
                            <Grid item lg={3}>
                                <TextField
                                    type="text"
                                    name="option_d"
                                    label="Ingrese la opción d"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={inputs.option_d} />
                            </Grid>
                            <Grid item lg={3}>
                                <FormControl variant="outlined" className={classes.textField}>
                                    <InputLabel id="lbl_area">Seleccione el área</InputLabel>
                                    <Select
                                        name="area"
                                        labelId="lbl_area"
                                        label="Seleccione el área"
                                        value={inputs.area}
                                        onChange={changeForm}>


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
                            <Grid item lg={3}>
                                <FormControl variant="outlined" className={classes.textField}>
                                    <InputLabel id="lbl_topic">Seleccione el tema</InputLabel>
                                    <Select
                                        name="topic"
                                        labelId="lbl_topic"
                                        label="Seleccione el tema"
                                        value={inputs.topic}
                                        onChange={changeForm}>

                                        {topics.map((values, index) =>
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
                                <FormControl variant="outlined" className={classes.textField}>
                                    <InputLabel id="lbl_subtopic">Seleccione el subtema</InputLabel>
                                    <Select
                                        name="subtopic"
                                        labelId="lbl_subtopic"
                                        label="Seleccione el subtema"
                                        value={inputs.subtopic}
                                        onChange={changeForm}>

                                        {subtopics.map((values, index) =>
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
                                <FormControl variant="outlined" className={classes.textField}>
                                    <InputLabel id="lbl_dif">Seleccione la dificultad</InputLabel>
                                    <Select
                                        name="difficulty"
                                        labelId="lbl_dif"
                                        label="Seleccione la dificultad"
                                        value={inputs.difficulty}
                                        onChange={changeForm}>

                                        {difficulties.map((values, index) =>
                                            <MenuItem key={index} value={values.val}>{values.name}</MenuItem>
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
                            <Link className={classes.link} to="/admin/excercises">
                                <Button className={classes.cancelButton}>
                                    Cancelar
                            </Button>
                            </Link>
                            <Button type="submit" className={classes.okButton}>
                                Guardar ejercicio
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </>
    )
}

export default UpdateExcercise
