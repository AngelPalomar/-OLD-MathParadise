import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { BlockMath, InlineMath } from "react-katex"
import 'katex/dist/katex.min.css'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField, FormControl,
    Select, MenuItem, InputLabel
} from "@material-ui/core"

/**Icons */
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        padding: theme.spacing(2)
    },
    title: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        color: '#2A55FF',
        marginBottom: theme.spacing(2)
    },
    textCenter: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
    excerPreviewBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#616161',
        fontSize: '26px',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    optionsPreviewBox: {
        color: '#818181',
        fontSize: '18px',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    previewLabel: {
        color: '#00487C'
    },
    labelError: {
        color: '#FF0008'
    },
    formBox: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    formButtons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    okButton: {
        display: "flex",
        margin: "auto",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        textAlign: "center",
    },
    cancelButton: {
        display: "flex",
        margin: "auto",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #73000D, #FF0008)",
        textAlign: "center",
    },
    textField: {
        width: '100%'
    },
    form: {
        marginTop: theme.spacing(2)
    }
}))

function Create() {
    const classes = useStyles()

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
        difficulty: ""
    })

    //Cambio de valores de los states y formulario
    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(inputs)
    }

    return (
        <>

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
                        <span>
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
                                    className={classes.textField} />
                            </Grid>
                            <Grid item lg={4}>
                                {inputs.option_a !== "" && inputs.option_b !== "" && inputs.option_c !== "" && inputs.option_d !== "" ?
                                    <FormControl variant="outlined" className={classes.textField}>
                                        <InputLabel id="right_answer">Seleccione la respuesta correcta</InputLabel>
                                        <Select
                                            name="answer"
                                            labelId="right_answer"
                                            label="Seleccione la respuesta correcta"
                                            value={inputs.answer}
                                            onChange={changeForm} >

                                            <MenuItem value={inputs.option_a}>
                                                {inputs.option_a !== "" ?
                                                    <InlineMath math={inputs.option_a} /> :
                                                    <span>
                                                        Opción A
                                                    </span>
                                                }
                                            </MenuItem>
                                            <MenuItem value={inputs.option_b}>
                                                {inputs.option_b !== "" ?
                                                    <InlineMath math={inputs.option_b} /> :
                                                    <span>
                                                        Opción B
                                                    </span>
                                                }
                                            </MenuItem>
                                            <MenuItem value={inputs.option_c}>
                                                {inputs.option_c !== "" ?
                                                    <InlineMath math={inputs.option_c} /> :
                                                    <span>
                                                        Opción C
                                                    </span>
                                                }
                                            </MenuItem>
                                            <MenuItem value={inputs.option_d}>
                                                {inputs.option_d !== "" ?
                                                    <InlineMath math={inputs.option_d} /> :
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
                                    className={classes.textField} />
                            </Grid>
                            <Grid item lg={3}>
                                <TextField
                                    type="text"
                                    name="option_b"
                                    label="Ingrese la opción b"
                                    variant="outlined"
                                    className={classes.textField} />
                            </Grid>
                            <Grid item lg={3}>
                                <TextField
                                    type="text"
                                    name="option_c"
                                    label="Ingrese la opción c"
                                    variant="outlined"
                                    className={classes.textField} />
                            </Grid>
                            <Grid item lg={3}>
                                <TextField
                                    type="text"
                                    name="option_d"
                                    label="Ingrese la opción d"
                                    variant="outlined"
                                    className={classes.textField} />
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

                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box className={classes.formButtons}>
                            <Button type="submit" className={classes.okButton}>
                                Guardar ejercicio
                            </Button>
                            <Button onClick={() => { window.location.href = '/admin/excercises' }} className={classes.cancelButton}>
                                Cancelar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </>
    )
}

export default Create