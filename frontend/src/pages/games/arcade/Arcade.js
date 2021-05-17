import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import {
    Typography, Grid, Paper, IconButton, Button,
    useMediaQuery, Backdrop, CircularProgress
} from '@material-ui/core'
import { useStyles } from './useStyles'
import { MATH_GRADIENTS } from '../../../styles/MathColors'
import clsx from 'clsx'

/**Componentes */
import Slot from '../../../components/game_items/Slot'
import DefaultAvatar from '../../../components/DefaultAvatar'
import GameMenu from '../../../components/game_items/GameMenu'
import ExcercisePanel from '../../../components/game_items/ExcercisePanel'
import GameResults from '../../../components/game_items/GameResults'
import GameInfo from '../../../components/game_items/GameInfo'

/**APIs */
import { getGameByPinApi, updateGameApi } from '../../../api/game'
import { getAccessTokenApi } from '../../../api/auth'
import { getRandomExcerciseApi } from '../../../api/excercises'
import { getUserByNicknameApi, updateUserApi } from '../../../api/user'

//Images
import arcadeIcon from '../../../assets/images/icons/arcade_icon_white.svg'

/**Iconos */
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import CasinoIcon from '@material-ui/icons/Casino'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation'

//Musica y sonidos
import { arcadeTheme } from '../../../utils/Music'
import {
    startSound, drawSound, tileSound, turnSound,
    finishGameSound, spinSound
} from '../../../utils/Sounds'

function Arcade(props) {
    //Instacia de estilos
    const classes = useStyles()

    //Media Query CSS
    const matches = useMediaQuery('(orientation: landscape)');

    //Constante que guarda el pin de la URL
    const { match: { params: { pin } } } = props
    const player = jwtDecode(getAccessTokenApi()).nickname

    //Estado del menú
    const [openOptionMenu, setOpenOptionMenu] = useState(false)
    const [openExcPanel, setOpenExcPanel] = useState(false)
    const [openResults, setOpenResults] = useState(false)

    //Estado que guarda los datos del juego
    const [game, setGame] = useState([])
    const [board, setBoard] = useState([])
    const [oldStats, setOldStats] = useState([])
    const [isNewRecord, setIsNewRecord] = useState(false)
    const [gameLocal, setGameLocal] = useState({
        player1: {
            pts: 0,
            excer: 0,
            correct: 0,
            wrong: 0,
            rounds: 0
        },
        player2: {
            pts: 0,
            excer: 0,
            correct: 0,
            wrong: 0,
            rounds: 0
        },
        currentPlayer: 0,
        turn: '',
        /**
         * Fases (phase):
         * - draw: Es cuando el jugador puede mover su ficha
         * - rolling: Es cuando se está eligiendo un tema al azar
         * - answering: Es cuando el jugador está contestando
         * - waiting: Es cuando ya puede bajar del servidor
         */
        phase: 'draw',
        totalRounds: 0,
        message: '',
        status: 'in_game',
        area: '',
        difficulty: ''
    })

    //Estado que indica el slot seleccionado
    const [slotAcumulator, setSlotAcumulator] = useState(0)
    const [isRolling, setIsRolling] = useState(false)
    const [secondsCount, setSecondsCount] = useState(0)

    //Estado que guarda el ejercicio
    const [excercise, setExcercise] = useState({})

    //Efecto inicial para traer los datos
    useEffect(() => {
        //Función que trae los datos
        getGameByPinApi(pin).then(response => {
            if (response.status === 0) {
                window.location.href = "/home/play"
            } else {
                if (response.game.status !== "in_game") {
                    window.location.href = "/home/play"
                } else {
                    setGame(response.game)
                    setBoard(response.game.board)
                    /**
                     * Si el estado del juego está finalizado
                     * lo devuelve al menú
                     */
                    if (response.game.status === 'finished') {
                        window.location.href = '/home/play'
                        return
                    }

                    //Asigna el current player y el turno
                    if (response.game.host === player) {
                        setGameLocal({
                            ...gameLocal,
                            player1: {
                                ...gameLocal.player1,
                                pts: response.game.points_player_1,
                                rounds: response.game.rounds_player1
                            },
                            player2: {
                                ...gameLocal.player2,
                                pts: response.game.points_player_2,
                                rounds: response.game.rounds_player2
                            },
                            currentPlayer: 1,
                            turn: response.game.turn,
                            totalRounds: response.game.rounds,
                            area: response.game.area,
                            difficulty: response.game.difficulty
                        })
                    } else {
                        setGameLocal({
                            ...gameLocal,
                            player1: {
                                ...gameLocal.player1,
                                pts: response.game.points_player_1,
                                rounds: response.game.rounds_player1
                            },
                            player2: {
                                ...gameLocal.player2,
                                pts: response.game.points_player_2,
                                rounds: response.game.rounds_player2
                            },
                            currentPlayer: 2,
                            turn: response.game.turn,
                            totalRounds: response.game.rounds,
                            area: response.game.area,
                            difficulty: response.game.difficulty
                        })
                    }
                }
            }
        })

        //Función que trae las estadísticas antiguas
        getUserByNicknameApi(player).then(response => {
            setOldStats(response.user.arcade)
        })

        //Función para iniciar la música del juego
        arcadeTheme.load()
        startSound.load()
        drawSound.load()
        tileSound.load()
        spinSound.load()
        turnSound.load()
        finishGameSound.load()

        spinSound.volume(0.6)
        arcadeTheme.play()

        document.title = 'Modo Arcade - Math Paradise'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Efecto que actualiza el mensaje
    useEffect(() => {
        //Si tu turno, muestra mensaje
        if (gameLocal.turn === gameLocal.currentPlayer) {
            //Reproduce sonido de mi turno
            turnSound.play()
            setGameLocal({ ...gameLocal, message: '¡Es tu turno!' })
        } else {
            setGameLocal({
                ...gameLocal,
                message: `Es el turno de ${gameLocal.currentPlayer === 1 ? game.player2 : game.player1}`
            })
        }
    }, [gameLocal.turn, gameLocal.currentPlayer])

    //Función que empieza el roll del tablero
    const makeMove = () => {
        //Suena sonido
        drawSound.play()

        //Cambia de fase a rolling
        setGameLocal({ ...gameLocal, phase: 'rolling' })

        //Variable random del tiempo que va a girar (4 al 10)
        setSecondsCount(Math.floor(Math.random() * (11 - 4) + 4))

        //Empieza el roll del tablero
        setIsRolling(true)
    }

    //Efecto que acumula el contador de slots
    useEffect(() => {
        if (gameLocal.phase === 'rolling') {
            let t = null

            if (isRolling) {
                t = setInterval(() => {
                    setSlotAcumulator(slotAcumulator + 1)
                    spinSound.play()
                }, 50)
            } else if (!isRolling) {
                clearInterval(t)
            }

            return () => {
                clearInterval(t)
            }
        }
    }, [isRolling, slotAcumulator])

    //Efecto que detiene el roll y cambia de fase
    useEffect(() => {
        //Si el acumulador está activo
        if (isRolling) {
            setTimeout(() => {
                setSecondsCount(0)
                setIsRolling(false)

                //Suena sonido de seleccionado
                tileSound.play()

                //Cambia de fase de rolling a answering
                setGameLocal({ ...gameLocal, phase: 'answering' })
            }, secondsCount * 1000);
        }
    }, [isRolling])

    //Efecto que muestra el ejercicio o hace la acción del slot
    useEffect(() => {
        setTimeout(() => {
            if (gameLocal.phase === 'answering') {
                let slot = slotAcumulator % 22
                let randomSlot = 0

                //Elije una casilla al azar de ejercicio
                do {
                    //Elije una casilla al azar de la 0 a la 22 omitiendo lo del while
                    randomSlot = Math.floor(Math.random() * (22 - 1) + 1)
                } while ((randomSlot === 0) || (randomSlot === 5) ||
                (randomSlot === 11) || (randomSlot === 16));

                switch (slot) {
                    //+50 puntos
                    case 0:
                        saveResult(50)
                        break;
                    //Ejercicio reto
                    case 5:
                        getRandomExcerciseApi(
                            gameLocal.area,
                            board[randomSlot].name,
                            gameLocal.difficulty
                        ).then(response => {
                            setExcercise(response.excercise[0])
                        })

                        //Abrir panel de ejercicio
                        setOpenExcPanel(true)
                        break;
                    //-50 puntos
                    case 11:
                        saveResult(-50)
                        break;
                    //Ejercicio aleatorio
                    case 16:
                        getRandomExcerciseApi(
                            gameLocal.area,
                            board[randomSlot].name,
                            gameLocal.difficulty
                        ).then(response => {
                            setExcercise(response.excercise[0])
                        })

                        //Abrir panel de ejercicio
                        setOpenExcPanel(true)
                        break;
                    //Ejercicio default
                    default:
                        getRandomExcerciseApi(
                            gameLocal.area,
                            board[slot].name,
                            gameLocal.difficulty
                        ).then(response => {
                            setExcercise(response.excercise[0])
                        })

                        //Abrir panel de ejercicio
                        setOpenExcPanel(true)
                        break;
                }
            }
        }, 1000);
    }, [slotAcumulator, gameLocal.phase])

    //Función que guarda los puntos ganados
    const saveResult = (earnedPts) => {
        setOpenExcPanel(false)

        //Asigno puntos a jugador que corresponda
        if (gameLocal.currentPlayer === 1) {
            /**
             * Cambio el turno actual y cambio de fase
             * Sumo los puntos
             * Si los puntos es mayor que cero, es ejercicio correcto,
             * si no, es incorrecto
           * */
            setGameLocal({
                ...gameLocal,
                player1: {
                    ...gameLocal.player1,
                    pts: gameLocal.player1.pts + earnedPts,
                    rounds: gameLocal.player1.rounds + 1,
                    excer: gameLocal.player1.excer + 1,
                    correct: earnedPts > 0 ? gameLocal.player1.correct + 1 : gameLocal.player1.correct,
                    wrong: earnedPts <= 0 ? gameLocal.player1.wrong + 1 : gameLocal.player1.wrong
                },
                turn: gameLocal.turn === 1 ? 2 : 1,
                phase: 'waiting'
            })
        } else {
            setGameLocal({
                ...gameLocal,
                player2: {
                    ...gameLocal.player2,
                    pts: gameLocal.player2.pts + earnedPts,
                    rounds: gameLocal.player2.rounds + 1,
                    excer: gameLocal.player2.excer + 1,
                    correct: earnedPts > 0 ? gameLocal.player2.correct + 1 : gameLocal.player2.correct,
                    wrong: earnedPts <= 0 ? gameLocal.player2.wrong + 1 : gameLocal.player2.wrong
                },
                turn: gameLocal.turn === 1 ? 2 : 1,
                phase: 'waiting'
            })
        }

        //Actualiza el juego
        updateGame(earnedPts)
    }

    //Función que sube los datos al servidor
    const updateGame = (ePts) => {
        updateGameApi({
            points_player_1: gameLocal.currentPlayer === 1 ? gameLocal.player1.pts + ePts : gameLocal.player1.pts,
            points_player_2: gameLocal.currentPlayer === 2 ? gameLocal.player2.pts + ePts : gameLocal.player2.pts,
            rounds_player1: gameLocal.currentPlayer === 1 ? gameLocal.player1.rounds + 1 : gameLocal.player1.rounds,
            rounds_player2: gameLocal.currentPlayer === 2 ? gameLocal.player2.rounds + 1 : gameLocal.player2.rounds,
            turn: gameLocal.turn === 1 ? 2 : 1
        }, pin).then(response => {
            if (response.status === 1) {
                console.log("Partida subida.")
            }
        })
    }

    //Efecto que trae los datos cada 3 segundos
    useEffect(() => {
        let f
        if (gameLocal.turn != gameLocal.currentPlayer) {
            f = setInterval(() => {
                console.log("Obteniendo datos.")
                getGameByPinApi(pin).then(response => {
                    if (gameLocal.turn !== gameLocal.currentPlayer) {
                        setGameLocal({
                            ...gameLocal,
                            player1: {
                                ...gameLocal.player1,
                                pts: response.game.points_player_1,
                                rounds: response.game.rounds_player1
                            },
                            player2: {
                                ...gameLocal.player2,
                                pts: response.game.points_player_2,
                                rounds: response.game.rounds_player2
                            },
                            turn: response.game.turn,
                            status: response.game.status,
                            phase: gameLocal.turn !== response.game.turn ? 'draw' : 'waiting'
                        })
                    }
                })
            }, 3000);
        }
        return () => clearInterval(f)
    }, [gameLocal.turn, gameLocal.currentPlayer, gameLocal])

    //Efecto que detecta cuando se acaban los turno
    //Fin del juego
    useEffect(() => {
        if ((gameLocal.player1.rounds === gameLocal.totalRounds &&
            gameLocal.player2.rounds === gameLocal.totalRounds) &&
            gameLocal.totalRounds > 0) {

            //abre el panel de resultados
            setOpenResults(true)

            //Reproduce sonido
            finishGameSound.play()

            //Finaliza el juego
            updateGameApi({ status: 'finished' }, pin).then()

            //Objeto con las nuevas stats
            let newStats = {
                arcade: {
                    points: 0,
                    right_excercises: 0,
                    mistakes: 0,
                    victories: 0,
                    defeats: 0
                }
            }

            if (gameLocal.currentPlayer === 1) {

                newStats.arcade.points = gameLocal.player1.pts > oldStats.points ? gameLocal.player1.pts : oldStats.points
                newStats.arcade.right_excercises = oldStats.right_excercises + gameLocal.player1.correct
                newStats.arcade.mistakes = oldStats.mistakes + gameLocal.player1.wrong
                newStats.arcade.victories = gameLocal.player1.pts > gameLocal.player2.pts ? oldStats.victories + 1 : oldStats.victories
                newStats.arcade.defeats = gameLocal.player1.pts < gameLocal.player2.pts ? oldStats.defeats + 1 : oldStats.defeats

                //condición que indica si hay nuevo record en los puntos
                if (gameLocal.player1.pts > oldStats.points) {
                    setIsNewRecord(true)
                }

            } else if (gameLocal.currentPlayer === 2) {
                newStats.arcade.points = gameLocal.player2.pts > oldStats.points ? gameLocal.player2.pts : oldStats.points
                newStats.arcade.right_excercises = oldStats.right_excercises + gameLocal.player2.correct
                newStats.arcade.mistakes = oldStats.mistakes + gameLocal.player2.wrong
                newStats.arcade.victories = gameLocal.player2.pts > gameLocal.player1.pts ? oldStats.victories + 1 : oldStats.victories
                newStats.arcade.defeats = gameLocal.player2.pts < gameLocal.player1.pts ? oldStats.defeats + 1 : oldStats.defeats

                //condición que indica si hay nuevo record en los puntos
                if (gameLocal.player2.pts > oldStats.points) {
                    setIsNewRecord(true)
                }
            }

            //Actualiza las stats del jugador
            updateUserApi(
                getAccessTokenApi(),
                newStats,
                jwtDecode(getAccessTokenApi()).id
            ).then(response => {
                console.log(response.message)
            })
        }
    }, [gameLocal.player1.rounds, gameLocal.player2.rounds])


    //En lo que carga la petición, muestra un cargando...
    if (game.length === 0) {
        return (
            <div className={classes.background}>
                <Backdrop open={true} className={classes.loadingScreen}>
                    <CircularProgress color="inherit" />
                    <Typography variant="h5">Cargando tablero</Typography>
                </Backdrop>
            </div>
        )
    }

    return (
        <>
            <GameInfo
                title="Bienvenido al Modo Arcade"
                gameMode="arcade"
                introSound={startSound}>
                En este modo de juego deberás de responder ejercicios matemáticos al azar
                contra tu oponente, usa tus turnos y consigue más puntos para ganar.
            </GameInfo>
            <GameMenu
                open={openOptionMenu}
                handler={() => setOpenOptionMenu(!openOptionMenu)}
                gamemode={"arcade"}
                difficulty={"normal"} area={"Álgebra"} />
            <ExcercisePanel
                open={openExcPanel}
                excercise={excercise}
                saveResult={(ep) => saveResult(ep)}
                difficulty={game.difficulty}
                isChall={
                    //Si es reto (Es decir, si se responde mal, se bajan 10 puntos)
                    slotAcumulator % 22 === 16 ? true : false
                }
                isRand={
                    slotAcumulator % 22 === 5 ? true : false
                } />
            <GameResults
                open={openResults}
                info={gameLocal}
                player1={game.player1}
                player2={game.player2}
                gamemode="arcade"
                isNewRecord={isNewRecord} />
            {
                /**
                 * Si la orientación no es horizontal (landscape),
                 * muestra mensaje que se gire el dispositivo
                 */
                !matches ?
                    <div className={clsx(classes.verticalScreen, classes.background)}>
                        <Typography style={{
                            fontSize: '7vw'
                        }}>
                            Gire su dispositivo para poder visualizar el tablero
                        </Typography>
                        <ScreenRotationIcon style={{ fontSize: '7vw', marginTop: '10px' }} />
                    </div> :
                    <div className={classes.background}>
                        <Grid container spacing={2} className={classes.grid}>
                            <Grid item lg={5} md={5} sm={5} xs={5}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center'
                                }}>

                                    <div className={classes.logoContainer}>
                                        <img src={arcadeIcon} alt="arcade_icon.svg" className={classes.logo} />
                                        <Typography className={classes.LogoTitleSize}>Modo Arcade</Typography>
                                    </div>

                                    <Paper className={classes.scoresPaper}>
                                        <Typography variant="h6" className={classes.scoreTitle}>
                                            Puntuaciones
                                    </Typography>
                                        <div>
                                            <div>
                                                <div className={classes.playerScore}>
                                                    <div className={classes.playerNickname}>
                                                        <DefaultAvatar size="5vh" fs="3vh" nickname={game.player1} />
                                                        <Typography
                                                            className={classes.nickname}
                                                            style={player === game.player1 ? { fontWeight: 'bold' } : null}>{game.player1}</Typography>
                                                    </div>
                                                    <Typography className={classes.pointsLabel}>{gameLocal.player1.pts}</Typography>
                                                </div>
                                                <div className={classes.playerScore}>
                                                    <div className={classes.playerNickname}>
                                                        <DefaultAvatar size="5vh" fs="3vh" nickname={game.player2} color={1} />
                                                        <Typography
                                                            className={classes.nickname}
                                                            style={player === game.player2 ? { fontWeight: 'bold' } : null}>{game.player2}</Typography>
                                                    </div>
                                                    <Typography className={classes.pointsLabel}>{gameLocal.player2.pts}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Typography className={classes.roundTitle}>{`Turnos (${game.rounds})`}</Typography>
                                            <Typography className={classes.roundLabel}>
                                                {`${gameLocal.player1.rounds} - ${gameLocal.player2.rounds}`}
                                            </Typography>
                                        </div>
                                        <div className={classes.pauseContainer}>
                                            <IconButton className={classes.buttonPause} size="small" onClick={() => setOpenOptionMenu(!openOptionMenu)}>
                                                <MoreHorizIcon />
                                            </IconButton>
                                        </div>
                                    </Paper>

                                    <div
                                        className={classes.messageContainer}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                        <SpeakerNotesIcon className={classes.circularMess} style={{ fontSize: '3vh' }} />
                                        <Typography className={classes.messageSize}>{gameLocal.message}</Typography>
                                    </div>

                                    <Button
                                        style={{
                                            background: gameLocal.turn === gameLocal.currentPlayer ?
                                                MATH_GRADIENTS().default : MATH_GRADIENTS().disabled
                                        }}
                                        onClick={gameLocal.turn === gameLocal.currentPlayer ? makeMove : null}
                                        disabled={gameLocal.phase === 'answering' || gameLocal.phase === 'rolling' ? true : false}
                                        className={classes.tirarButton}
                                        startIcon={<CasinoIcon />}>
                                        TIRAR
                                </Button>
                                </div>
                            </Grid>
                            <Grid item lg={7} md={7} sm={7} xs={7}>
                                <Grid container className={classes.grid}>
                                    {/**0 */}
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 16 ? classes.selectedSlot : null)}>
                                            <Slot pos={16} type="RETO" isSelected={slotAcumulator % 22 === 16 ? true : false} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8} xs={8} className={classes.centerTiles}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 15 ? classes.selectedSlot : null)}>
                                            <Slot pos={15} type="normal" isSelected={slotAcumulator % 22 === 15 ? true : false} info={game.board[15]} />
                                        </div>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 14 ? classes.selectedSlot : null)}>
                                            <Slot pos={14} type="normal" isSelected={slotAcumulator % 22 === 14 ? true : false} info={game.board[14]} />
                                        </div>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 13 ? classes.selectedSlot : null)}>
                                            <Slot pos={13} type="normal" isSelected={slotAcumulator % 22 === 13 ? true : false} info={game.board[13]} />
                                        </div>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 12 ? classes.selectedSlot : null)}>
                                            <Slot pos={12} type="normal" isSelected={slotAcumulator % 22 === 12 ? true : false} info={game.board[12]} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 11 ? classes.selectedSlot : null)}>
                                            <Slot pos={11} type="-50 PTS" isSelected={slotAcumulator % 22 === 11 ? true : false} />
                                        </div>
                                    </Grid>

                                    {/**1 */}
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 17 ? classes.selectedSlot : null)}>
                                            <Slot pos={17} type="normal" isSelected={slotAcumulator % 22 === 17 ? true : false} info={game.board[17]} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 10 ? classes.selectedSlot : null)}>
                                            <Slot pos={10} type="normal" isSelected={slotAcumulator % 22 === 10 ? true : false} info={game.board[10]} />
                                        </div>
                                    </Grid>

                                    {/**2 */}
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 18 ? classes.selectedSlot : null)}>
                                            <Slot pos={18} type="normal" isSelected={slotAcumulator % 22 === 18 ? true : false} info={game.board[18]} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 9 ? classes.selectedSlot : null)}>
                                            <Slot pos={9} type="normal" isSelected={slotAcumulator % 22 === 9 ? true : false} info={game.board[9]} />
                                        </div>
                                    </Grid>

                                    {/**3 */}
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 19 ? classes.selectedSlot : null)}>
                                            <Slot pos={19} type="normal" isSelected={slotAcumulator % 22 === 19 ? true : false} info={game.board[19]} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 8 ? classes.selectedSlot : null)}>
                                            <Slot pos={8} type="normal" isSelected={slotAcumulator % 22 === 8 ? true : false} info={game.board[8]} />
                                        </div>
                                    </Grid>

                                    {/**4 */}
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 20 ? classes.selectedSlot : null)}>
                                            <Slot pos={20} type="normal" isSelected={slotAcumulator % 22 === 20 ? true : false} info={game.board[20]} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 7 ? classes.selectedSlot : null)}>
                                            <Slot pos={7} type="normal" isSelected={slotAcumulator % 22 === 7 ? true : false} info={game.board[7]} />
                                        </div>
                                    </Grid>

                                    {/**5 */}
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 21 ? classes.selectedSlot : null)}>
                                            <Slot pos={21} type="normal" isSelected={slotAcumulator % 22 === 21 ? true : false} info={game.board[21]} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div className={clsx(classes.slotContainer, slotAcumulator % 22 === 6 ? classes.selectedSlot : null)}>
                                            <Slot pos={6} type="normal" isSelected={slotAcumulator % 22 === 6 ? true : false} info={game.board[6]} />
                                        </div>
                                    </Grid>

                                    {/**6 */}
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div
                                            className={clsx(classes.slotContainer, slotAcumulator % 22 === 0 ? classes.selectedSlot : null)}>
                                            <Slot pos={0} type="+50 PTS" isSelected={slotAcumulator % 22 === 0 ? true : false} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8} xs={8} className={classes.centerTiles}>
                                        <div
                                            className={clsx(classes.slotContainer, slotAcumulator % 22 === 1 ? classes.selectedSlot : null)}>
                                            <Slot pos={1} type="normal" isSelected={slotAcumulator % 22 === 1 ? true : false} info={game.board[1]} />
                                        </div>
                                        <div
                                            className={clsx(classes.slotContainer, slotAcumulator % 22 === 2 ? classes.selectedSlot : null)}>
                                            <Slot pos={2} type="normal" isSelected={slotAcumulator % 22 === 2 ? true : false} info={game.board[2]} />
                                        </div>
                                        <div
                                            className={clsx(classes.slotContainer, slotAcumulator % 22 === 3 ? classes.selectedSlot : null)}>
                                            <Slot pos={3} type="normal" isSelected={slotAcumulator % 22 === 3 ? true : false} info={game.board[3]} />
                                        </div>
                                        <div
                                            className={clsx(classes.slotContainer, slotAcumulator % 22 === 4 ? classes.selectedSlot : null)}>
                                            <Slot pos={4} type="normal" isSelected={slotAcumulator % 22 === 4 ? true : false} info={game.board[4]} />
                                        </div>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                        <div
                                            className={clsx(classes.slotContainer, slotAcumulator % 22 === 5 ? classes.selectedSlot : null)}>
                                            <Slot pos={5} type="EXCER. RANDOM" isSelected={slotAcumulator % 22 === 5 ? true : false} />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
            }
        </>
    )
}

export default Arcade
