import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import {
    Button, Grid, Typography, Box
} from "@material-ui/core"
import { useStyles } from '../useStyles';

/**Componentes */
import SubtopicsTable from '../../../components/info_tables/SubtopicsTable'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function MenuSubtopics() {
    const classes = useStyles()

    React.useEffect(() => {
        document.title = 'Subtemas - Panel de administración | Math Paradise'
    }, [])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" color='primary' gutterBottom>
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
