import React, { useEffect, Fragment } from 'react'
import { Link } from "react-router-dom";
import {
    Button,
    Grid,
    Typography,
} from "@material-ui/core"
import { useStyles } from '../useStyles';

/**Componentes */
import ExcercisesTable from '../../../components/info_tables/ExcercisesTable'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function Menu() {
    const classes = useStyles()

    useEffect(() => {
        document.title = 'Ejercicios - Panel de administración | Math Paradise'
    }, [])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" color='primary' gutterBottom>
                        Gestión de Ejercicios
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Link to="/admin/excercises/create" className={classes.link}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    className={classes.button}
                                >
                                    Agregar Ejercicio
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <ExcercisesTable />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Menu
