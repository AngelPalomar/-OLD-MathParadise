import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Grid
} from "@material-ui/core"

/**Componentes */
import Avatar from "../../components/Avatar"
import ClassicStats from "../../components/ClassicStats"
import ArcadeStats from "../../components/ArcadeStats"
import RushStats from "../../components/RushStats"

const useStyles = makeStyles((theme) => ({
    subtitle: {
        paddingTop: theme.spacing(3),
    },

    stats: {
        paddingTop: theme.spacing(1),
    }
}))

function Dashboard() {
    const classes = useStyles()

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={9} sm={6} md={4} lg={4}>
                    <Avatar />
                </Grid>
            </Grid>

            <Typography className={classes.subtitle} variant="h6">Estadísticas de juego</Typography>

            <Grid container spacing={1} className={classes.stats}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <ClassicStats />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <ArcadeStats />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <RushStats />
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
