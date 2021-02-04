import React, { useState, useEffect } from 'react'
import { useStyles } from '../useStyles'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField, FormControl,
    Select, MenuItem, InputLabel
} from "@material-ui/core"

/**APIS */
import { getAreasApi } from '../../../api/areas'
import { createTopicApi } from '../../../api/topics'

/**Components */
import DefaultSnackbar from '../../../components/snackbars/DefaultSnackbar'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function CreateTopic() {
    const classes = useStyles()
    const [areas, setAreas] = useState([])
    const [inputs, setInputs] = useState({
        name: '',
        area: ''
    })
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)

    //Cerrar notificación
    const handleCloseSnackbar = () => {
        setOpen(false)
    }

    useEffect(() => {
        getAreasApi().then(r => {
            if (r.status === 1) {
                setAreas(r.areas)
            }
        })
    }, [])

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        console.log(inputs)

        if (inputs.name !== '' && inputs.area !== '') {
            createTopicApi(inputs).then(r => {
                setOpen(true)
                setMessage(r.message)
                if (r.status === 1) {
                    window.location.href = '/admin/topics'
                }
            })
        } else {
            setOpen(true)
            setMessage('todos los campos son requeridos')
        }
    }

    return (
        <>
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
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={6}>
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel id="lbl_area">*Area</InputLabel>
                                <Select
                                    name="area"
                                    label="*Area"
                                    labelId="lbl_area"
                                    onChange={changeForm}>

                                    {areas.map((values, index) =>
                                        <MenuItem key={index} value={values.name}>{values.name}</MenuItem>
                                    )}

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box className={classes.formButtons}>
                        <Button onClick={() => { window.location.href = '/admin/institutions' }} className={classes.cancelButton}>
                            Cancelar
                    </Button>
                        <Button type="submit" className={classes.okButton}>
                            Guardar
                    </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default CreateTopic
