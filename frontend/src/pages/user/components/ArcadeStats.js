import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Paper,
    Grid,
} from "@material-ui/core";

import ArcadeSrc from '../../../assets/images/icons/arcade_icon_1.svg'

const useStyles = makeStyles((theme) => ({
    statsPaper: {
        padding: theme.spacing(1)
    },

    statsInfo: {
        paddingTop: theme.spacing(2)
    }
}))

function ArcadeStats() {
    const classes = useStyles();

    return (
        <Paper className={classes.statsPaper} elevation={2}>
            <Grid container spacing={1}>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <img src={ArcadeSrc} alt="arc.svg"></img>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                    <Typography variant="h6">Modo Arcade</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ArcadeStats
