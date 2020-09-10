import React, { useState, useEffect } from 'react'
import {
    Typography,
    Paper,
    Box,
    Divider
} from "@material-ui/core"
import { useStyles } from './useStyles'
import RushSrc from '../../assets/images/icons/rush_icon_1.svg'

/**APIs */
import { getUserApi } from "../../api/user"

function RushStats(props) {
    const { userData } = props
    const classes = useStyles()

    const [stats, setStats] = useState([])

    useEffect(() => {
        const fetchGetUser = async () => {
            const result = await getUserApi({ email: userData.email })

            if (!result.message) {
                setStats(result.user.stats.rush)
            }
        }
        fetchGetUser()
    })

    return (
        <Paper className={classes.statsPaper} elevation={2}>
            <Box className={classes.statsHeader}>
                <img src={RushSrc} alt="classic_icon.svg" className={classes.imgGameMode} />
                <Typography className={classes.statsTitle}>Modo Rush</Typography>
            </Box>

            <Divider />

            <Box className={classes.statsInfo}>
                <Box className={classes.statsElement}>
                    <Typography variant="h6">Puntuación máxima</Typography>
                    <Typography>{stats.points} pts</Typography>
                </Box>
                <Box className={classes.statsElement}>
                    <Typography>Máximo de ejercicios</Typography>
                    <Typography>{stats.excercises}</Typography>
                </Box>
                <Box className={classes.statsElement}>
                    <Typography>Nivel máximo</Typography>
                    <Typography>{stats.level}</Typography>
                </Box>
                <Box className={classes.statsElement}>
                    <Typography>Multiplicador máximo</Typography>
                    <Typography>{stats.multiplier}</Typography>
                </Box>
            </Box>

        </Paper>
    )
}

export default RushStats
