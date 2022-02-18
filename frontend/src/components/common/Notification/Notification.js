import React from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button
} from '@material-ui/core'
import PropTypes from 'prop-types'

function Notification(props) {
    const { open, onClose, onAccept, title, children } = props
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={'sm'}>
            <DialogTitle style={{ fontWeight: 'bold' }}>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>Cancelar</Button>
                <Button color="primary" onClick={onAccept}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}

Notification.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onAccept: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.element
}

export default Notification
