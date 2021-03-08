import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles"
import {
    Button,
    Grid,
    Typography,
} from "@material-ui/core"

/**Componentes */
import UsersTable from '../../../components/info_tables/UsersTable'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

/**APIs */
import { getAccessTokenApi } from '../../../api/auth'

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
        document.title = 'Usuarios - Panel de administración | Math Paradise'
    }, [])

    if (role !== 'admin') {
        return <Redirect to="/admin" />
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" className={classes.title}>
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
        </>
    )
}

export default Menu
