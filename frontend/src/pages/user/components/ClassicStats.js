import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Paper,
    Grid,
} from "@material-ui/core"

import ClassicSrc from '../assets/classic_icon_1.svg'

const useStyles = makeStyles((theme) => ({
    statsPaper: {
        padding: theme.spacing(1)
    },

    statsInfo: {
        paddingTop: theme.spacing(2)
    }
}));

function ClassicStats() {
    const classes = useStyles();

    return (
        <Paper className={classes.statsPaper} elevation={2}>
            <Grid container spacing={1}>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <img src={ClassicSrc} alt="classic_icon.svg"></img>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                    <Typography variant="h6">Modo Clásico</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ClassicStats
