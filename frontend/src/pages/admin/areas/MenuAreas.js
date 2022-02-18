import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import {
    Button, Grid, Typography, Box
} from "@material-ui/core"
import { useStyles } from '../useStyles';

/**Componentes */
import AreasTable from '../../../components/info_tables/AreasTable'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function MenuAreas() {
    const classes = useStyles()

    React.useEffect(() => {
        document.title = 'Areas - Panel de administración | Math Paradise'
    }, [])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" color='primary' gutterBottom>
                        Gestión de Areas
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Link to="/admin/areas/create" className={classes.link}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    className={classes.button}
                                >
                                    Crear Area
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <Box>
                        <AreasTable />
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default MenuAreas
