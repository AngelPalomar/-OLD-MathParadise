import React, { useState, useEffect, Fragment } from 'react'
import {
    Typography,
    Paper,
    Box,
    Divider,
    Grid,
    CircularProgress
} from "@material-ui/core"
import { useStyles } from './useStyles'
import ClassicSrc from '../../assets/images/icons/classic_icon_1.svg'

/**APIs */
import { getUserByNicknameApi } from "../../api/user"

function ClassicStats(props) {
    const { nickname, summary } = props
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            {
                !summary ?
                    <Fragment>
                        <Paper className={classes.statsPaper} elevation={2}>
                            <Box className={classes.statsHeader}>
                                <img src={ClassicSrc} alt="classic_icon.svg" className={classes.imgGameMode} />
                                <Typography className={classes.statsTitle}>Modo Clásico</Typography>
                            </Box>

                            <Divider className={classes.divider} />

                            {
                                !stats ?
                                    <Box>
                                        <CircularProgress />
                                    </Box> :
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
                            }
                        </Paper>
                    </Fragment> :
                    <Fragment>
                        <Paper className={classes.statsPaperSummary} elevation={2}>
                            <Grid container spacing={2} className={classes.statsElementSummary}>
                                <Grid item lg={6} md={6} sm={6} xs={6} className={classes.statsHeader}>
                                    <img src={ClassicSrc} alt="classic_icon.svg" className={classes.imgGameMode} />
                                    <Typography className={classes.statsTitle}>Modo Clásico</Typography>
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={6} className={classes.summaryPoints}>
                                    <Typography variant="subtitle2">Puntuación máxima</Typography>
                                    {
                                        !stats ?
                                            <Box>
                                                <CircularProgress />
                                            </Box> :
                                            <Typography variant="h6">{stats ? stats.points : "0"} pts</Typography>
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Fragment>
            }
        </Fragment>
    )
}

export default ClassicStats
