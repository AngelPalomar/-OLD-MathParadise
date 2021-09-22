import React, { Fragment } from 'react'
import {
    Typography,
    Paper,
    Box,
    Divider,
    Grid
} from "@material-ui/core"
import { useStyles } from './useStyles'

/**Images */
import ClassicSrc from '../../assets/images/icons/classic_icon_1.svg'
import ArcadeSrc from '../../assets/images/icons/arcade_icon_1.svg'
import RushSrc from '../../assets/images/icons/rush_icon_1.svg'

function GameStats(props) {
    const { stats, gamemode, summary } = props
    const classes = useStyles()

    return (
        <Fragment>
            {
                !summary ?
                    <Fragment>
                        <Paper className={classes.statsPaper} elevation={2}>
                            <Box className={classes.statsHeader}>
                                <img src={
                                    gamemode === 'classic' ? ClassicSrc :
                                        gamemode === 'arcade' ? ArcadeSrc :
                                            gamemode === 'rush' ? RushSrc : ClassicSrc}
                                    alt="classic_icon.svg"
                                    className={classes.imgGameMode} />
                                <Typography className={classes.statsTitle}>
                                    Modo {
                                        gamemode === 'classic' ? 'Clásico' :
                                            gamemode === 'arcade' ? 'Arcade' :
                                                gamemode === 'rush' ? 'Rush' : ' de juego'
                                    }
                                </Typography>
                            </Box>

                            <Divider className={classes.divider} />

                            <Box className={classes.statsInfo}>
                                <Box className={classes.statsElement}>
                                    <Typography variant="h6">Puntuación máxima</Typography>
                                    <Typography>{stats.points} pts</Typography>
                                </Box>
                                {
                                    gamemode !== 'rush' ?
                                        <Fragment>
                                            <Box className={classes.statsElement}>
                                                <Typography>Aciertos</Typography>
                                                <Typography>{stats.right_excercises}</Typography>
                                            </Box>
                                            <Box className={classes.statsElement}>
                                                <Typography>Errores</Typography>
                                                <Typography>{stats.mistakes}</Typography>
                                            </Box>
                                            <Box className={classes.statsElement}>
                                                <Typography>No. de victorias</Typography>
                                                <Typography>{stats.victories}</Typography>
                                            </Box>
                                            <Box className={classes.statsElement}>
                                                <Typography>No. de derrotas</Typography>
                                                <Typography>{stats.defeats}</Typography>
                                            </Box>
                                        </Fragment> :
                                        <Fragment>
                                            <Box className={classes.statsElement}>
                                                <Typography>Multiplicador máximo</Typography>
                                                <Typography>{stats.multiplier}</Typography>
                                            </Box>
                                            <Box className={classes.statsElement}>
                                                <Typography>Nivel máximo</Typography>
                                                <Typography>{stats.level}</Typography>
                                            </Box>
                                            <Box className={classes.statsElement}>
                                                <Typography>Ejercicios contestados</Typography>
                                                <Typography>{stats.excercises}</Typography>
                                            </Box>
                                        </Fragment>
                                }
                            </Box>
                        </Paper>
                    </Fragment> :
                    <Fragment>
                        <Paper className={classes.statsPaperSummary} elevation={2}>
                            <Grid container spacing={2} className={classes.statsElementSummary}>
                                <Grid item lg={6} md={6} sm={6} xs={6} className={classes.statsHeader}>
                                    <img src={
                                        gamemode === 'classic' ? ClassicSrc :
                                            gamemode === 'arcade' ? ArcadeSrc :
                                                gamemode === 'rush' ? RushSrc : ClassicSrc} alt="classic_icon.svg" className={classes.imgGameMode} />
                                    <Typography className={classes.statsTitle}>Modo {
                                        gamemode === 'classic' ? 'Clásico' :
                                            gamemode === 'arcade' ? 'Arcade' :
                                                gamemode === 'rush' ? 'Rush' : ' de juego'
                                    }</Typography>
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={6} className={classes.summaryPoints}>
                                    <Typography variant="subtitle2">Puntuación máxima</Typography>
                                    <Typography variant="h6">{stats.points} pts</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Fragment>
            }
        </Fragment>
    )
}

export default GameStats
