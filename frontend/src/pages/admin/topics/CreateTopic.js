import React from 'react'
import { useStyles } from '../useStyles'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField, FormControl,
    Select, MenuItem, InputLabel
} from "@material-ui/core"

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function CreateTopic() {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
                <AddIcon fontSize="large" /> Añadir tema
            </Typography>
            <Divider />
            <form className={classes.formBox}>
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
                                labelId="lbl_area">

                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box className={classes.formButtons}>
                    <Button onClick={() => { window.location.href = '/admin/institutions' }} className={classes.cancelButton}>
                        Cancelar
                    </Button>
                    <Button className={classes.okButton}>
                        Guardar
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}

export default CreateTopic
