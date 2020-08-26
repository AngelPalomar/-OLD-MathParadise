import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Paper,
    Grid,
} from "@material-ui/core"

import RushSrc from '../assets/images/icons/rush_icon_1.svg'

const useStyles = makeStyles((theme) => ({
    statsPaper: {
        padding: theme.spacing(1)
    },

    statsInfo: {
        paddingTop: theme.spacing(2)
    }
}))

function RushStats() {
    const classes = useStyles();

    return (
        <Paper className={classes.statsPaper} elevation={2}>
            <Grid container spacing={1}>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <img src={RushSrc} alt="rush.svg"></img>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                    <Typography variant="h6">Modo Rush</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default RushStats
