import React from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button
} from '@material-ui/core'

function Notification(props) {
    const { open, onClose, onAccept, title, children } = props
    return (
        <Dialog
            open={open}
            onClose={onClose}>
            <DialogTitle style={{ fontWeight: 'bold' }}>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>Cancelar</Button>
                <Button color="primary" onClick={onAccept}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Notification
