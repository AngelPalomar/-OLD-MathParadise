import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles"
import {
    Button, Grid, Typography, Box
} from "@material-ui/core"

/**APIs */
import { getAccessTokenApi } from '../../../api/auth'

/**Components */
import InstitutionsTable from '../../../components/info_tables/InstitutionsTable'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#616161',
        marginBottom: theme.spacing(3)
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary
        }
    },
    button: {
        marginBottom: theme.spacing(1),
        width: '100%',
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        color: '#FFF'
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    }
}))

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
        <>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" className={classes.title}>
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
        </>
    )
}

export default Menu
