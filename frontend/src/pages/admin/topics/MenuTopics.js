import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import {
    Button, Grid, Typography, Box
} from "@material-ui/core"
import { useStyles } from '../useStyles';

/**Compod */
import TopicsTable from '../../../components/info_tables/TopicsTable'

/**Icons */
import AddIcon from '@material-ui/icons/Add'

function MenuTopics() {
    const classes = useStyles()

    React.useEffect(() => {
        document.title = 'Temas - Panel de administración | Math Paradise'
    }, [])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" color='primary' gutterBottom>
                        Gestión de Temas
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={3}>
                            <Link to="/admin/topics/create" className={classes.link}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    className={classes.button}
                                >
                                    Crear Tema
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={12}>
                    <Box>
                        <TopicsTable />
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default MenuTopics
