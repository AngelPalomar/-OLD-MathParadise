import React, { useState, useEffect } from 'react'
import {
    Typography,
    Paper,
    Box,
    Divider,
    Grid
} from "@material-ui/core";
import { useStyles } from './useStyles'
import ArcadeSrc from '../../assets/images/icons/arcade_icon_1.svg'

/**APIs */
import { getUserByNicknameApi } from "../../api/user"

function ArcadeStats(props) {
    const { nickname, summary } = props
    const classes = useStyles()

    const [stats, setStats] = useState(null)

    useEffect(() => {
        const fetchGetUser = async () => {
            const result = await getUserByNicknameApi(nickname)

            if (!result.message) {
                setStats(result.user.arcade)
            }
        }

        fetchGetUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                !summary ?
                    <>
                        <Paper className={classes.statsPaper} elevation={2}>
                            <Box className={classes.statsHeader}>
                                <img src={ArcadeSrc} alt="classic_icon.svg" className={classes.imgGameMode} />
                                <Typography className={classes.statsTitle}>Modo Arcade</Typography>
                            </Box>

                            <Divider className={classes.divider} />

                            <Box>
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
                    </> :
                    <>
                        <Paper className={classes.statsPaperSummary} elevation={2}>
                            <Grid container spacing={2} className={classes.statsElementSummary}>
                                <Grid item lg={6} md={6} sm={6} xs={6} className={classes.statsHeader}>
                                    <img src={ArcadeSrc} alt="classic_icon.svg" className={classes.imgGameMode} />
                                    <Typography className={classes.statsTitle}>Modo Clásico</Typography>
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={6} className={classes.summaryPoints}>
                                    <Typography variant="subtitle2">Puntuación máxima</Typography>
                                    <Typography variant="h6">{stats ? stats.points : "0"} pts</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
            }
        </>
    )
}

export default ArcadeStats
