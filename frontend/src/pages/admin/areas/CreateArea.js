import React, { useState } from 'react'
import { useStyles } from '../useStyles'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField
} from "@material-ui/core"

/**Apis */
import { createAreaApi } from '../../../api/areas'

/**Components */
import DefaultSnackbar from '../../../components/snackbars/DefaultSnackbar'

/**Utils */
import { minLenghtValidation } from '../../../utils/FormValidation'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function CreateArea() {
    const classes = useStyles()

    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)

    //Cerrar notificación
    const handleCloseSnackbar = () => {
        setOpen(false)
    }

    //Cambio del formulario
    const changeForm = (e) => {
        setName(e.target.value)
    }

    //Submit del formulario
    const submitForm = (e) => {
        e.preventDefault()
        if (!minLenghtValidation(name, 1)) {
            setOpen(true)
            setMessage("Todos los campos son requeridos.")
        } else {
            //Crea el area llamando el API
            createAreaApi({ name: name }).then(response => {
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
                        <Grid item lg={12}>
                            <TextField
                                type="text"
                                name="name"
                                label="*Nombre del area"
                                variant="outlined"
                                className={classes.textField} />
                        </Grid>
                    </Grid>
                    <Box className={classes.formButtons}>
                        <Button onClick={() => { window.location.href = '/admin/areas' }} className={classes.cancelButton}>
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

export default CreateArea
