import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import { useStyles } from './useStyles'
import theme from '../../styles/MathThemes'

/**Images */
import classicImage from '../../assets/images/icons/classic_icon_1.svg'
import arcadeImage from '../../assets/images/icons/arcade_icon_1.svg'
import rushImage from '../../assets/images/icons/rush_icon_1.svg'

function GameHistoryCard(props) {
    const { historyData, key } = props
    const classes = useStyles()

    return (
        <Paper className={classes.paper} key={key}>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <div className={classes.gamemodeContainer}>
                        <img src={
                            historyData.gamemode === 'classic' ? classicImage :
                                historyData.gamemode === 'arcade' ? arcadeImage :
                                    historyData.gamemode === 'rush' ? rushImage : ' de juego'
                        } alt='gamemode_icon.svg' className={classes.gamemodeImage} />
                        <Typography>
                            Modo
                            {
                                historyData.gamemode === 'classic' ? ' Clásico' :
                                    historyData.gamemode === 'arcade' ? ' Arcade' :
                                        historyData.gamemode === 'rush' ? ' Rush' : ' de juego'
                            }
                        </Typography>
                    </div>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <div className={classes.pointsContainer}>
                        <Typography variant='h6'>Puntuación</Typography>
                        <Typography style={{ color: theme.palette.primary.main }}>
                            {historyData.points} pts
                        </Typography>
                    </div>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                    <div className={classes.resultContainer}>
                        <Typography variant='h6' style={{
                            color: historyData.result === 'victory' ? theme.palette.success.main :
                                historyData.result === 'defeat' ? theme.palette.error.main :
                                    historyData.result === 'draw' ? theme.palette.text.secondary : theme.palette.primary.main
                        }}>
                            {
                                historyData.result === 'victory' ? 'Victoria' :
                                    historyData.result === 'defeat' ? 'Derrota' :
                                        historyData.result === 'draw' ? 'Empate' : ''
                            }
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default GameHistoryCard
