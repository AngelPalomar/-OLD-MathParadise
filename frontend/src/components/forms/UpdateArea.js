import React from 'react'
import {
    TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, Select, MenuItem, Typography
} from "@material-ui/core"
import { useStyles } from './useStyles'

function UpdateArea(props) {
    const { open, handler, values } = props

    if (!values) {
        return null
    }

    return (
        <Dialog
            open={open}
            onClose={handler}
            keepMounted>
            <DialogTitle>Modificar area</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        type="text"
                        name="name"
                        label="*Nombre del area"
                        variant="outlined"
                        defaultValue={values.name} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handler}>Cancelar</Button>
                <Button>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateArea
