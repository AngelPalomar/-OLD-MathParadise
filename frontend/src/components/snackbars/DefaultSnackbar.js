import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'

/**Icons */
import CloseIcon from '@material-ui/icons/Close'

function DefaultSnackbar(props) {
    const { message, open, handleClose } = props

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }>

        </Snackbar>
    )
}

export default DefaultSnackbar
