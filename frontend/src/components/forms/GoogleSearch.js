import React, { useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
    Button, TextField
} from '@material-ui/core'

function GoogleSearch(props) {
    const { open, handleClose } = props;
    const [query, setQuery] = useState('');

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Buscar</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ingrese texto para buscar en la web.
                </DialogContentText>
                <TextField
                    label='Buscar'
                    fullWidth
                    variant='outlined'
                    onChange={(e) => setQuery(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Cancelar
                </Button>
                <a href={`https://www.google.com/search?q=${query}`} target="_blank" rel="noopener noreferrer">
                    <Button color='primary'>
                        Buscar
                    </Button>
                </a>
            </DialogActions>
        </Dialog>
    )
}

export default GoogleSearch