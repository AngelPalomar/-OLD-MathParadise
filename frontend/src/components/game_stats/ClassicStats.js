import React, { useState, useEffect } from 'react'
import {
    Typography,
    Paper,
    Box,
    Divider
} from "@material-ui/core"
import { useStyles } from './useStyles'
import ClassicSrc from '../../assets/images/icons/classic_icon_1.svg'

/**APIs */
import { getUserByNicknameApi } from "../../api/user"

function ClassicStats(props) {
    const { nickname } = props
    const classes = useStyles()

    const [stats, setStats] = useState(null)

    useEffect(() => {
        const fetchGetUser = async () => {
            const result = await getUserByNicknameApi(nickname)

            if (!result.message) {
                setStats(result.user.classic)
            }
        }
        fetchGetUser()
    }, [])

    return (
        <Paper className={classes.statsPaper} elevation={2}>
            <Box className={classes.statsHeader}>
                <img src={ClassicSrc} alt="classic_icon.svg" className={classes.imgGameMode} />
                <Typography className={classes.statsTitle}>Modo Clásico</Typography>
            </Box>

            <Divider />

            <Box className={classes.statsInfo}>
                <Box className={classes.statsElement}>
                    <Typography variant="h6">Puntuación máxima</Typography>
                    <Typography>{stats ? stats.points : "0"} pts</Typography>
                </Box>
                <Box className={classes.statsElement}>
                    <Typography>Aciertos</Typography>
                    <Typography>{stats ? stats.right_excercises : "0"}</Typography>
                </Box>
                <Box className={classes.statsElement}>
                    <Typography>Errores</Typography>
                    <Typography>{stats ? stats.mistakes : "0"}</Typography>
                </Box>
                <Box className={classes.statsElement}>
                    <Typography>No. de victorias</Typography>
                    <Typography>{stats ? stats.victories : "0"}</Typography>
                </Box>
                <Box className={classes.statsElement}>
                    <Typography>No. de derrotas</Typography>
                    <Typography>{stats ? stats.defeats : "0"}</Typography>
                </Box>
            </Box>

        </Paper>
    )
}

export default ClassicStats
