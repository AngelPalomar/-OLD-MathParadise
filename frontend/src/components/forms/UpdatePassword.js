import React, { useState, Fragment } from 'react';
import jwtDecode from 'jwt-decode';
import {
    Box, Grid, TextField, Button,
    CircularProgress, Typography
} from '@material-ui/core';
import { useStyles } from './useStyles';

/**COmponents */
import DefaultSnackbar from '../snackbars/DefaultSnackbar';

/**Icons */
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/Save'

/**API */
import { updatePasswordApi } from '../../api/user';
import { getAccessTokenApi } from '../../api/auth';
import { minLenghtValidation } from '../../utils/FormValidation';

function UpdatePassword() {

    const classes = useStyles();
    const id = jwtDecode(getAccessTokenApi()).id;
    const [inputs, setInputs] = useState({
        password: '',
        repeatPassword: '',
        oldPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    /**Actualiza la contraseña */
    const updatePassword = () => {
        //Validaciones
        if (!minLenghtValidation(inputs.password, 8)) {
            setMessage('La nueva contraseña debe ser tener al menos 8 caracteres.')
            setOpenSnack(true);
            return;
        }

        //Incia la carga
        setIsLoading(true);

        updatePasswordApi(inputs, id).then(response => {
            if (response.status === 1) {
                setMessage(response.message);
                setOpenSnack(true);
                setIsLoading(false);

                //Limpia los campos
                setInputs({
                    ...inputs,
                    password: '',
                    oldPassword: '',
                    repeatPassword: ''
                })
            } else {
                setMessage(response.message);
                setOpenSnack(true);
                setIsLoading(false);
            }
        })
    }

    return (
        <div>
            <DefaultSnackbar message={message} open={openSnack} handleClose={() => setOpenSnack(false)} />
            <Box>
                <Typography variant='h6' gutterBottom>Actualizar contraseña</Typography>
                <Grid container spacing={2}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            type="password"
                            name="oldPassword"
                            label="*Vieja contraseña"
                            variant="outlined"
                            value={inputs.oldPassword}
                            onChange={(e) => setInputs({ ...inputs, oldPassword: e.target.value })}
                            fullWidth />
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            type="password"
                            name="password"
                            label="*Nueva contraseña"
                            variant="outlined"
                            fullWidth
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            type="password"
                            name="repeatPassword"
                            label="*Confirmar vieja contraseña"
                            variant="outlined"
                            fullWidth
                            value={inputs.repeatPassword}
                            onChange={(e) => setInputs({ ...inputs, repeatPassword: e.target.value })} />
                    </Grid>
                </Grid>
                <Box marginTop={2}>
                    {
                        isLoading ?
                            <CircularProgress color='primary' variant='indeterminate' /> :
                            <Fragment>
                                <Button
                                    className={classes.button}
                                    color='primary'
                                    variant='contained'
                                    startIcon={<SaveIcon />}
                                    onClick={updatePassword}>
                                    Guardar
                                </Button>
                                <Button
                                    startIcon={<ClearIcon />}
                                    className={classes.cancelButton}>
                                    Cancelar
                                </Button>
                            </Fragment>
                    }
                </Box>
            </Box>
        </div>
    )
}

export default UpdatePassword;
