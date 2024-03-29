import React, { useState, useEffect, Fragment } from 'react'
import {
    Typography, Paper, Divider,
    CircularProgress, Button, Grid, Box,
    Dialog
} from '@material-ui/core'
import { Prompt, Redirect } from 'react-router-dom'
import { useStyles } from './useStyles'
import clsx from 'clsx'
import { lobbyTheme } from '../../../utils/Music'
import { joinSound } from '../../../utils/Sounds'

/**Componentes */
import DefaultAvatar from '../../../components/common/DefaultAvatar'
import Notification from '../../../components/common/Notification'

/**APIs */
import { createGameApi, deleteGameApi, getGameByPinApi, updateGameApi } from '../../../api/game'
import { getDefaultBoardApi } from '../../../api/boards'

//Utils
import useAuth from '../../../hooks/useAuth'

/**Imágenes */
import classicIcon from '../../../assets/images/icons/classic_icon_1.svg'
import arcadeIcon from '../../../assets/images/icons/arcade_icon_1.svg'

/**Icons */
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

function LobbyNew(props) {
    const classes = useStyles()
    const { user } = useAuth()

    if (!user) {
        window.location.href = "/login"
    }

    if (!props.location.gameProps) {
        window.location.href = "/home/play"
    }

    const { area, host, difficulty, gamemode, rounds } = props.location.gameProps
    const [game, setGame] = useState([])
    const [subtopics, setSubtopics] = useState([])
    const gameData = {
        host: host,
        gamemode: gamemode,
        difficulty: difficulty,
        area: area,
        rounds: rounds
    }
    const [openNotifi, setOpenNotifi] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)

    //Si el modo de juego es classic, el tablero es de 30 pos, si no, es arcade y es 22 
    let board = new Array(gameData.gamemode === "classic" ? 30 : 22)

    //Función para crear la partida en la base de datos
    useEffect(() => {
        //Carga y reproduce la música
        lobbyTheme.load()
        joinSound.load()
        lobbyTheme.stop()
        lobbyTheme.play()

        //Crea la prtida
        createGameApi(gameData).then(response => {
            if (response.status === 1) {
                setGame(response.game)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Función para verificar si el jugador 2 se unió
    useEffect(() => {
        if (game.player2 === "") {
            setInterval(() => {
                getGameByPinApi(game.pin).then(response => {
                    if (response.status === 1) {
                        //Guarda la nueva info de la partida
                        setGame(response.game)
                    }
                })
            }, 3000);
        } else {
            //Si ya se unió
            joinSound.play()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.player2])

    //Función para traer los subtemas
    useEffect(() => {
        if (game.area) {
            getDefaultBoardApi(game.area).then(response => {
                if (response.status === 1) {
                    setSubtopics(response.board)
                }
            })
        }
    }, [game.area])

    //Función para generar tablero y redirigir
    const startGame = () => {
        /**Genera tablero
         * 1. Llena un arreglo de con 26 posiciones de subtemas al azar
         * 2. guarda el tablero en la base de datos y cambia el estado de la partida a "in_game"
         * 3. redirige al tablero pasando el pin para que se busque en ese componente
         */

        // 1
        switch (gameData.gamemode) {
            //Generación del modo clásico
            case "classic":
                for (let index = 0; index < board.length; index++) {
                    switch (index) {
                        case 0: board[0] = "INICIO"
                            break
                        case 9: board[9] = "EXCER. RANDOM"
                            break
                        case 15: board[15] = "RETO"
                            break
                        case 24: board[24] = "EVENTO"
                            break
                        default: board[index] = subtopics[Math.floor(Math.random() * subtopics.length)]
                            break
                    }
                }
                break;

            //Generación del modo arcade
            case "arcade":
                for (let index = 0; index < board.length; index++) {
                    switch (index) {
                        case 0: board[0] = "+50 PTS"
                            break
                        case 5: board[5] = "EXCER. RANDOM"
                            break
                        case 11: board[11] = "-50 PTS"
                            break
                        case 16: board[16] = "RETO"
                            break
                        default: board[index] = subtopics[Math.floor(Math.random() * subtopics.length)]
                            break
                    }
                }
                break;

            default:
                break;
        }

        // 2
        updateGameApi({ board: board, status: "in_game" }, game.pin).then(response => {
            // 3
            if (response.status === 1) {
                //Redirige al modo de juego en cuestión
                switch (gameData.gamemode) {
                    case 'classic':
                        window.location.href = "/classic/" + game.pin
                        break

                    case 'arcade':
                        window.location.href = "/arcade/" + game.pin
                        break

                    default:
                        window.location.href = "/classic/" + game.pin
                        break
                }
            }
        })
    }

    //Función para borrar la partida si se cancela
    const deleteGame = () => {
        deleteGameApi(game.pin).then(response => {
            if (response.status === 1) {
                //Para la musica
                lobbyTheme.stop()
                lobbyTheme.unload()
                joinSound.unload()

                //Cancela la partida
                setIsCancelled(true)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    //Si se cancela la partida
    if (isCancelled) {
        return <Redirect to={"/home/play"} />
    }

    return (
        <div className={
            clsx(classes.root,
                gamemode === "classic" ? classes.classicBack :
                    gamemode === "arcade" ? classes.arcadeBack : null
            )
        }>
            <Notification
                open={openNotifi}
                onClose={() => setOpenNotifi(false)}
                onAccept={deleteGame}
                title='¿Deseas salir?'>
                <Typography>La partida se cancelará</Typography>
            </Notification>
            <Prompt
                message={(location, action) => {
                    if (action === "POP") {
                        setOpenNotifi(true)
                    }

                    return location.pathname.startsWith("/home") ? true : '¿Deseas salir?\nLa partida se eliminará.'
                }} />
            <Dialog
                className={classes.content}
                maxWidth='md'
                fullWidth
                open={true}>
                <Paper className={classes.paper}>
                    <img
                        src={
                            gamemode === "classic" ? classicIcon :
                                gamemode === "arcade" ? arcadeIcon : null
                        }
                        className={classes.gamemodeIcon}
                        alt="icon_game.svg"
                    />
                    <Typography variant="h4">Iniciando partida</Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="h6">Información</Typography>

                    <div className={classes.infoBox}>
                        <Typography className={classes.infoData}>
                            PIN de acceso: <code className={classes.infoLabel}>{game.pin}</code>
                        </Typography>
                        <Typography>¡Pasa este código a un amigo para empezar la partida!</Typography>
                    </div>

                    <Grid container spacing={3} alignContent="center" style={{ marginBlock: '25px' }}>
                        <Grid item lg={5} md={5} sm={12} xs={12}>
                            <div className={classes.playerInfo}>
                                <DefaultAvatar nickname={host} size="60px" fs="100%" />
                                <Typography className={classes.playerLabel}>{host}</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={2} md={2} sm={12} xs={12}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography className={classes.vs}>VS</Typography>
                                <div style={{ borderBottom: 1, borderColor: '#FF2942', borderStyle: 'solid' }}></div>
                            </div>
                        </Grid>
                        <Grid item lg={5} md={5} sm={12} xs={12}>
                            <div className={classes.playerInfo}>
                                {
                                    game.player2 === "" ?
                                        <Fragment>
                                            <CircularProgress />
                                            <Typography className={classes.playerLabel}>Esperando al jugador 2...</Typography>
                                        </Fragment> :
                                        <Fragment>
                                            <DefaultAvatar nickname={!game.player2 ? host : game.player2} size="60px" fs="28px" />
                                            <Typography className={classes.playerLabel}>{game.player2}</Typography>
                                        </Fragment>
                                }
                            </div>
                        </Grid>
                    </Grid>

                    {
                        game.player2 === "" ?
                            <Box>
                                <Typography>Esperando jugador 2...</Typography>
                                <Button onClick={() => setOpenNotifi(true)} color='primary' className={classes.cancelBtn}>
                                    Cancelar partida
                                </Button>
                            </Box> :
                            <Button
                                onClick={startGame}
                                startIcon={<PlayArrowIcon style={{ fontSize: 28 }} />}
                                className={classes.playButton}>
                                Jugar
                            </Button>
                    }
                </Paper>
            </Dialog>
        </div >
    )
}

export default LobbyNew
