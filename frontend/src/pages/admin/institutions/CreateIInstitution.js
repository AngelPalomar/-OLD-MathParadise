import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from '../useStyles'
import {
    Grid, Typography, Paper, Box, Divider, Button, TextField, FormControl,
    Select, MenuItem, InputLabel
} from "@material-ui/core"

/**COmponents */
import DefaultSnackbar from '../../../components/common/DefaultSnackbar'

/**APIs */
import { createInstitutionApi } from '../../../api/institution'

/**Utils */
import { institutionTypes } from '../../../utils/SelectArrays'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function CreateIInstitution() {
    const classes = useStyles()

    const [inputs, setInputs] = useState({
        name: '',
        abbrev: '',
        type: '',
        city: '',
        country: ''
    })
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)

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

    //Guardar los datos
    const createInstitution = () => {
        if (inputs.name.trim() === '' || inputs.abbrev.trim() === '' ||
            inputs.type.trim() === '' || inputs.city.trim() === '' || inputs.country.trim() === '') {
            setMessage("Todos los campos son requeridos.")
            setOpen(true)
        } else {
            createInstitutionApi(inputs).then(response => {
                if (response.status === 1) {
                    setMessage(response.message)
                    setOpen(true)

                    window.location.href = '/admin/institutions'
                } else {
                    setMessage(response.message)
                    setOpen(true)
                }
            })
        }
    }

    return (
        <Fragment>
            <DefaultSnackbar
                open={open}
                handleClose={() => setOpen(false)}
                message={message} />
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                    <AddIcon fontSize="large" /> Añadir institución educativa
                </Typography>
                <Divider />
                <form className={classes.formBox} onChange={changeForm}>
                    <Typography>*Todos los campos son requeridos</Typography>
                    <Grid container spacing={2} className={classes.form}>
                        <Grid item lg={6}>
                            <TextField
                                type="text"
                                name="name"
                                label="*Nombre de la institución"
                                variant="outlined"
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={3}>
                            <TextField
                                type="text"
                                name="abbrev"
                                label="*Abreviatura (Ejemplo: UTEQ)"
                                variant="outlined"
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={3}>
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel id="lbl_type">*Tipo</InputLabel>
                                <Select
                                    name="type"
                                    label="*Tipo"
                                    labelId="lbl_type"
                                    onChange={changeForm}>
                                    {institutionTypes.map((value, index) =>
                                        <MenuItem key={index} value={value.val}>{value.label}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6}>
                            <TextField
                                type="text"
                                name="city"
                                label="*Estado/Provincia"
                                variant="outlined"
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField
                                type="text"
                                name="country"
                                label="*País"
                                variant="outlined"
                                className={classes.textField} />
                        </Grid>
                    </Grid>
                    <Box className={classes.formButtons}>
                        <Link className={classes.link} to="/admin/institutions">
                            <Button className={classes.cancelButton}>
                                Cancelar
                            </Button>
                        </Link>
                        <Button onClick={createInstitution} className={classes.okButton}>
                            Guardar
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Fragment>
    )
}

export default CreateIInstitution
