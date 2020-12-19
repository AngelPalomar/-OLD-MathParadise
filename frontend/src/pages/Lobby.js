import React, { useState, useEffect } from 'react'
import { Typography, Paper, Divider, Box, CircularProgress, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import { MATH_COLORS, MATH_GRADIENTS } from '../styles/MathColors'

/**Componentes */
import DefaultAvatar from '../components/DefaultAvatar'

/**APIs */
import { createGameApi, getGameByPinApi, updateGameApi } from '../api/game'
import { getAccessTokenApi } from '../api/auth'
import { getDefaultClassicBoardApi } from '../api/boards'

const useStyles = makeStyles((theme) => ({
    root: {
        background: MATH_GRADIENTS().default,
        color: "#FFF",
        overflow: "auto",
        position: "bottom",
        height: "100vh"
    },
    content: {
        margin: 'auto',
        padding: '70px 0',
        width: '60%',
        height: '100%',
        textAlign: 'center'
    },
    paper: {
        padding: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    playerInfo: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'left',
        alignItems: 'center',
    },
    vs: {
        color: MATH_COLORS().math_error_dark
    },
    infoLabel: {
        color: MATH_COLORS().math_success,
        fontSize: '24px'
    },
    infoData: {
        fontWeight: 'bold'
    },
    infoBox: {
        marginTop: theme.spacing(2),
    },
    playButton: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().default,
        textAlign: "center"
    }
}))

function Lobby(props) {
    if (!getAccessTokenApi()) {
        window.location.href = "/login"
    }

    if (!props.location.gameProps) {
        window.location.href = "/home/play"
    }

    const classes = useStyles()
    const { area, host, difficulty, gamemode, time } = props.location.gameProps
    const [game, setGame] = useState([])
    const [subtopics, setSubtopics] = useState([])
    const gameData = {
        host: host,
        gamemode: gamemode,
        difficulty: difficulty,
        area: area,
        time: time
    }
    let board = new Array(30)

    //Función para crear la partida en la base de datos
    useEffect(() => {
        createGameApi(gameData).then(response => {
            if (response.status === 1) {
                setGame(response.game)
            }
        })
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
        }
    }, [game.player2])

    //Función para traer los subtemas
    useEffect(() => {
        if (game.area) {
            getDefaultClassicBoardApi(game.area).then(response => {
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

        // 2
        updateGameApi({ board: board, status: "in_game" }, game.pin).then(response => {
            // 3
            if (response.status === 1) {
                //Redirige al modo de juego en cuestión
                switch (gameData.gamemode) {
                    case 'classic':
                        window.location.href = "/classic/" + game.pin
                        break

                    default:
                        window.location.href = "/classic/" + game.pin
                        break
                }
            }
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Iniciando partida</Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="h6">Información</Typography>

                    <Box className={classes.infoBox}>
                        <Typography className={classes.infoData}>
                            PIN de acceso: <code className={classes.infoLabel}>{game.pin}</code>
                        </Typography>
                        <Typography>¡Pasa este código a un amigo para empezar la partida!</Typography>
                    </Box>

                    <Box className={classes.playerInfo}>
                        <DefaultAvatar nickname={host} large="lg" />
                        <Typography variant="h5">{host}</Typography>
                        <Typography variant="h5" className={classes.vs}>vs</Typography>
                        <Typography variant="h5">{
                            game.player2 === "" ? "Jugador 2..." : game.player2
                        }</Typography>
                        {
                            game.player2 === "" ? <CircularProgress /> : <DefaultAvatar large="lg" nickname={game.player2} />
                        }
                    </Box>

                    {
                        game.player2 === "" ?
                            <Typography>Esperando jugador 2...</Typography> :
                            <Button onClick={startGame} className={classes.playButton}>
                                <Typography variant="h6">¡Jugar!</Typography>
                            </Button>
                    }
                </Paper>
            </div>
        </div>
    )
}

export default Lobby
