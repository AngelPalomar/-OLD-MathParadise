import React, { useState, useEffect } from "react"
import jwtDecode from 'jwt-decode'
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Grid
} from "@material-ui/core"

/**APIs */
import { getAccessTokenApi } from '../../api/auth'

/**Componentes */
import Avatar from "../../components/Avatar"
import ClassicStats from "../../components/game_stats/ClassicStats"
import ArcadeStats from "../../components/game_stats/ArcadeStats"
import RushStats from "../../components/game_stats/RushStats"

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
    const [userData] = useState(jwtDecode(getAccessTokenApi()))

    useEffect(() => {
        document.title = 'Menú principal - Math Paradise'
    }, [])

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={5} lg={5}>
                    <Avatar name={userData.name} lastname={userData.lastname} nickname={userData.nickname} />
                </Grid>
            </Grid>

            <Typography className={classes.subtitle} variant="h6">Estadísticas de juego</Typography>

            <Grid container spacing={1} className={classes.stats}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <ClassicStats userData={userData} token={getAccessTokenApi()} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <ArcadeStats userData={userData} token={getAccessTokenApi()} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <RushStats userData={userData} token={getAccessTokenApi()} />
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
