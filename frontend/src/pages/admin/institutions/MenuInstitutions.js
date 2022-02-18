import React, { useEffect, Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import { Link, Redirect } from "react-router-dom";
import {
    Button, Grid, Typography, Box
} from "@material-ui/core"
import { useStyles } from '../useStyles';

/**APIs */
import { getAccessTokenApi } from '../../../api/auth'

/**Components */
import InstitutionsTable from '../../../components/info_tables/InstitutionsTable'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function Menu() {
    const classes = useStyles()
    const { role } = jwtDecode(getAccessTokenApi())

    useEffect(() => {
        document.title = 'Instituciones - Panel de administración | Math Paradise'
    }, [])

    if (role !== 'admin') {
        return <Redirect to="/admin" />
    }

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" color='primary' gutterBottom>
                        Gestión de Instituciones
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Link to="/admin/institutions/create" className={classes.link}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    className={classes.button}
                                >
                                    Agregar Institución
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <Box>
                        <InstitutionsTable />
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Menu
