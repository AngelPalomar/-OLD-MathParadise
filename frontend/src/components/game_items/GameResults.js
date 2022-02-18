import React, { Fragment } from 'react'
import { useStyles } from './useStyles'
import { Howler } from 'howler'
import {
    Dialog, DialogActions, Button, Typography, Divider
} from '@material-ui/core'
import { UpTransition } from '../../styles/Transitions'
import theme from "../../styles/MathThemes"

/**Components */
import Avatar from '../../components/common/DefaultAvatar'

/**Sprites */
import olive from '../../assets/images/sprites/olive.svg'

/**API */
import { createHistoryApi } from '../../api/history'

const Transition = UpTransition

function GameResults(props) {
    const classes = useStyles()
    const { open, info, player1, player2, gamemode, isNewRecord, history } = props

    //Función para mostrar si es victoria o derrota
    function IsVictoryOrFailLabel() {
        if (info.currentPlayer === 1) {
            if (info.player1.pts > info.player2.pts) {
                return (
                    <Typography
                        style={{
                            fontSize: '3.5vh',
                            color: theme.palette.success.main,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                        ¡Victoria!
                    </Typography>
                )
            } else if (info.player1.pts < info.player2.pts) {
                return (
                    <Typography
                        style={{
                            fontSize: '3.5vh',
                            color: theme.palette.error.main,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                        ¡Derrota!
                    </Typography>
                )
            } else {
                return null
            }
        } else {
            if (info.player2.pts > info.player1.pts) {
                return (
                    <Typography
                        style={{
                            fontSize: '3.5vh',
                            color: theme.palette.success.main,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                        ¡Victoria!
                    </Typography>
                )
            } else if (info.player2.pts < info.player1.pts) {
                return (
                    <Typography
                        style={{
                            fontSize: '3.5vh',
                            color: theme.palette.error.main,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                        ¡Derrota!
                    </Typography>
                )
            } else {
                return null
            }
        }
    }

    //Función para guardar la partida en el registro
    const saveGame = () => {
        createHistoryApi(history).then()
        Howler.unload()
        window.location.href = '/home/play'
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            maxWidth="xs"
            fullWidth={true}>
            <div className={classes.resultsDialog}>
                <div>
                    <Typography className={classes.resultsTitle}>¡Juego terminado!</Typography>
                    <Typography className={classes.resultsSubTitle}>{
                        `Resultados - Modo ${gamemode === 'classic' ? 'Clásico' : 'Arcade'}`
                    }</Typography>
                </div>

                <div className={classes.avatarContainer}>
                    {
                        //Si no es empate, muestra el ganador
                        info.player1.pts === info.player2.pts ?
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <div style={{ marginRight: '10px' }}>
                                    <Avatar nickname={player1} size="9vh" fs="5vh" />
                                </div>
                                <div>
                                    <Avatar nickname={player2} size="9vh" fs="5vh" color={1} />
                                </div>
                            </div> :
                            <Fragment>
                                <div style={{ zIndex: '2000', position: 'absolute' }}>
                                    <img src={olive} style={{ width: '18vh' }} alt="olive.svg" />
                                </div>
                                <div style={{ zIndex: '1500', position: 'relative' }}>
                                    <Avatar nickname={
                                        info.player1.pts > info.player2.pts ?
                                            player1 : player2
                                    } size="14vh" fs="7vh" color={2} />
                                </div>
                            </Fragment>
                    }
                </div>
                <div>
                    <Typography className={classes.winnerPlayerLabel}>{
                        info.player1.pts === info.player2.pts ?
                            'Empate' : info.player1.pts > info.player2.pts ?
                                player1 : player2
                    }</Typography>
                    <Typography className={classes.winnerLabel}>{
                        info.player1.pts === info.player2.pts ?
                            'Ambos jugadores tienen la misma puntuación' : 'Ganador'
                    }</Typography>
                </div>

                <Divider className={classes.divider} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Avatar size="5vh" fs="3vh" nickname={
                        info.currentPlayer === 1 ? player1 : player2
                    } color={
                        info.currentPlayer === 1 ? 0 : 1
                    } />
                    <Typography className={classes.statsLabels} style={{
                        marginLeft: '5px',
                        color: '#000'
                    }}>
                        {`${info.currentPlayer === 1 ? player1 : player2}`}
                        <span style={{ color: theme.palette.disabled.dark }}> - Estadísicas</span>
                    </Typography>
                </div>
                <IsVictoryOrFailLabel />
                <div className={classes.statsContainer}>
                    <Typography className={classes.statsLabels}>
                        Puntos: <span style={{ color: theme.palette.primary.main }}>{
                            info.currentPlayer === 1 ? info.player1.pts : info.player2.pts
                        }</span> {
                            isNewRecord ?
                                <span style={{ color: '#f53f60' }}>
                                    ¡Nuevo Récord!
                                </span> : null
                        }
                    </Typography>
                    <Typography className={classes.statsLabels}>
                        Ejercicios resueltos: <span style={{ color: theme.palette.primary.main }}>{
                            info.currentPlayer === 1 ? info.player1.excer : info.player2.excer
                        }</span>
                    </Typography>
                    <Typography className={classes.statsLabels}>
                        Aciertos: <span style={{ color: theme.palette.primary.main }}>{
                            info.currentPlayer === 1 ? info.player1.correct : info.player2.correct
                        }</span>
                    </Typography>
                    <Typography className={classes.statsLabels}>
                        Errores: <span style={{ color: theme.palette.primary.main }}>{
                            info.currentPlayer === 1 ? info.player1.wrong : info.player2.wrong
                        }</span>
                    </Typography>
                </div>

                <DialogActions>
                    <Button
                        className={classes.acceptBtn}
                        onClick={saveGame}>
                        Aceptar
                    </Button>
                </DialogActions>
            </div>

        </Dialog>
    )
}

export default GameResults
