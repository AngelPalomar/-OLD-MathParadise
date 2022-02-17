import React from 'react'
import {
    Typography, Grid, Accordion, AccordionDetails, AccordionSummary,
    Divider
} from '@material-ui/core'
import { useStyles } from './useStyles'
import theme from '../../styles/MathThemes'

/**COmponents */
import DefaultAvatar from '../DefaultAvatar'

/**Images */
import classicImage from '../../assets/images/icons/classic_icon_1.svg'
import arcadeImage from '../../assets/images/icons/arcade_icon_1.svg'
import rushImage from '../../assets/images/icons/rush_icon_1.svg'

/**Utils */
import { es_DateName } from '../../utils/DateFormat'

function GameHistoryAccordion(props) {
    const { historyData } = props
    const classes = useStyles()

    return (
        <Accordion className={classes.paper}>
            <AccordionSummary>
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
            </AccordionSummary>
            <AccordionDetails>
                {
                    historyData.gamemode !== 'rush' ?
                        <div className={classes.detailsContainer}>
                            <div className={classes.playersContainer}>
                                <DefaultAvatar nickname={historyData.nickname} className={classes.avatar} />
                                <div className={classes.nicknameContainer}>
                                    <Typography variant='subtitle1'>{historyData.nickname}</Typography>
                                    <Typography className={classes.points}>{historyData.points}</Typography>
                                </div>
                                <Typography className={classes.vsLabel}>vs</Typography>
                                <div className={classes.enemyNicknameContainer}>
                                    <Typography variant='subtitle1'>{historyData.enemy_nickname}</Typography>
                                    <Typography className={classes.points}>{historyData.enemy_points}</Typography>
                                </div>
                                <DefaultAvatar nickname={historyData.enemy_nickname} className={classes.avatar} />
                            </div>
                            <Divider className={classes.divider} />
                            <div className={classes.infoDetailsContainer}>
                                <Typography>Materia - <span className={classes.numbers}>{historyData.area}</span></Typography>
                                <Typography>
                                    {historyData.difficulty === 'normal' ? 'Normal' :
                                        historyData.difficulty === 'easy' ? 'Fácil' :
                                            historyData.difficulty === 'hard' ? 'Difícil' : 'Ninguna'}
                                </Typography>
                                <Typography><span className={classes.numbers}>{historyData.rounds}</span> vueltas/turnos para ganar</Typography>
                                <Typography><span className={classes.numbers}>{historyData.excercises}</span> ejercicios</Typography>
                                <Typography><span className={classes.numbers}>{historyData.correct_excercises}</span> ejercicios correctos</Typography>
                                <Typography><span className={classes.numbers}>{historyData.wrong_excercises}</span> ejercicios incorrectos</Typography>
                                <Typography className={classes.gameDate}>{es_DateName(historyData.game_date)}</Typography>
                            </div>
                        </div> :
                        <div className={classes.detailsContainer}>
                            <div className={classes.multiplierContainer}>
                                <Typography>Multiplicador alcanzado</Typography>
                                <div className={classes.multiplierBox}>
                                    <Typography className={classes.multiplierLabel}>
                                        &times;{historyData.multiplier}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.infoDetailsContainer}>
                                <Typography><span className={classes.numbers}>{historyData.excercises}</span> ejercicios contestados</Typography>
                                <Typography>Nivel <span className={classes.numbers}>{historyData.level}</span> alcanzado</Typography>
                                <Typography className={classes.gameDate}>{es_DateName(historyData.game_date)}</Typography>
                            </div>
                        </div>
                }
            </AccordionDetails>
        </Accordion >
    )
}

export default GameHistoryAccordion
