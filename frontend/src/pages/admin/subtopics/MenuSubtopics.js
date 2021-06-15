import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles"
import {
    Button, Grid, Typography, Box
} from "@material-ui/core"

/**Componentes */
import SubtopicsTable from '../../../components/info_tables/SubtopicsTable'

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

function MenuSubtopics() {
    const classes = useStyles()

    React.useEffect(() => {
        document.title = 'Subtemas - Panel de administración | Math Paradise'
    }, [])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" className={classes.title}>
                        Gestión de Subtemas (Temas para modos de juego)
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Link to="/admin/subtopics/create" className={classes.link}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    className={classes.button}
                                >
                                    Crear Subtema
                                    </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <Box>
                        <SubtopicsTable />
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default MenuSubtopics
