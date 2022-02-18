import React, { useState, useEffect } from "react"
import jwtDecode from 'jwt-decode'
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Grid,
    LinearProgress
} from "@material-ui/core"

/**APIs */
import { getAccessTokenApi } from '../../api/auth'
import { getUserByIdApi } from '../../api/user'

/**Componentes */
import UserCard from "../../components/UserCard"
import GameStats from "../../components/common/GameStats/GameStats"

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
    const [userData, setUserData] = useState({})
    const [isLoading, setisLoading] = useState(true)
    const id = jwtDecode(getAccessTokenApi()).id

    useEffect(() => {
        document.title = 'Menú principal - Math Paradise'

        //Trae datos del usuario
        getUserByIdApi(id).then(response => {
            setUserData(response.user)
            setisLoading(false)
        })
    }, [id])

    if (isLoading) {
        return <LinearProgress variant='indeterminate' />
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={5} lg={5}>
                    <UserCard name={userData.name} lastname={userData.lastname} nickname={userData.nickname} />
                </Grid>
            </Grid>

            <Typography className={classes.subtitle} variant="h6">Estadísticas de juego</Typography>

            <Grid container spacing={1} className={classes.stats}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GameStats gamemode='classic' stats={userData.classic} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GameStats gamemode='arcade' stats={userData.arcade} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <GameStats gamemode='rush' stats={userData.rush} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
