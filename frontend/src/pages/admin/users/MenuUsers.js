import React, { useEffect, Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import { Link, Redirect } from "react-router-dom";
import {
    Button,
    Grid,
    Typography,
} from "@material-ui/core"
import { useStyles } from '../useStyles';

/**Componentes */
import UsersTable from '../../../components/info_tables/UsersTable'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

/**APIs */
import { getAccessTokenApi } from '../../../api/auth'

function Menu() {
    const classes = useStyles()
    const { role } = jwtDecode(getAccessTokenApi())

    useEffect(() => {
        document.title = 'Usuarios - Panel de administración | Math Paradise'
    }, [])

    if (role !== 'admin') {
        return <Redirect to="/admin" />
    }

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" gutterBottom color='primary'>
                        Gestión de Usuarios
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Link to="/admin/users/create" className={classes.link}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    className={classes.button}
                                >
                                    Agregar Usuario
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <UsersTable />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Menu
