import React, { useState, useEffect } from 'react'
import { Typography, Paper, Divider, Grid, Box, CircularProgress, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import { MATH_COLORS, MATH_GRADIENTS } from '../styles/MathColors'

/**Componentes */
import DefaultAvatar from '../components/DefaultAvatar'

/**APIs */
import { createGameApi, getGameByPinApi } from '../api/game'
import { getAccessTokenApi } from '../api/auth'

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
    const gameData = {
        host: host,
        gamemode: gamemode,
        difficulty: difficulty,
        area: area,
        time: time
    }

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

    /**
     * TODO: Función del botón "Jugar" para generar el tablero y redirigir al modo de juego
     */

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Iniciando partida</Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="h6">Información</Typography>

                    <Box className={classes.infoBox}>
                        <Typography className={classes.infoData}>
                            PIN de acceso: <span className={classes.infoLabel}>{game.pin}</span>
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
                            <Button className={classes.playButton}>
                                <Typography variant="h6">¡Jugar!</Typography>
                            </Button>
                    }
                </Paper>
            </div>
        </div>
    )
}

export default Lobby
