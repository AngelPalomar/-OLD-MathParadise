import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { useSpring, animated } from 'react-spring'
import { useStyles } from './useStyles'
import { Grid, Typography, Paper, IconButton, Backdrop, CircularProgress, Button } from '@material-ui/core'
import { MATH_GRADIENTS } from '../../../styles/MathColors'

/**Componentes */
import DefaultAvatar from '../../../components/DefaultAvatar'
import Tile from '../../../components/game_items/Tile'
import GameMenu from '../../../components/game_items/GameMenu'
import ExcercisePanel from '../../../components/game_items/ExcercisePanel'
import GameEvent from '../../../components/game_items/GameEvent'
import GameResults from '../../../components/game_items/GameResults'

/**APIs */
import { getGameByPinApi, updateGameApi } from '../../../api/game'
import { getAccessTokenApi } from '../../../api/auth'
import { getRandomExcerciseApi } from '../../../api/excercises'
import { getUserByNicknameApi, updateUserApi } from '../../../api/user'

/**Iconos */
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import CasinoIcon from '@material-ui/icons/Casino'

/**Otros */
import { posPlayer1, posPlayer2 } from './TilePositions'

//Musica y sonidos
import { classicTheme } from '../../../utils/Music'
import { startSound } from '../../../utils/Sounds'

/**Images */
import classicIcon from '../../../assets/images/icons/classic_icon_white.svg'
import challenge from '../../../assets/images/layouts/classic/challenge_icon.svg'
import event from '../../../assets/images/layouts/classic/random_event_icon.svg'
import random_exc from '../../../assets/images/layouts/classic/random_excercise_icon.svg'
import start from '../../../assets/images/layouts/classic/start_icon.svg'
import dice1 from '../../../assets/images/layouts/classic/dice/dice_side1.svg'
import dice2 from '../../../assets/images/layouts/classic/dice/dice_side2.svg'
import dice3 from '../../../assets/images/layouts/classic/dice/dice_side3.svg'
import dice4 from '../../../assets/images/layouts/classic/dice/dice_side4.svg'
import dice5 from '../../../assets/images/layouts/classic/dice/dice_side5.svg'
import dice6 from '../../../assets/images/layouts/classic/dice/dice_side6.svg'

function Classic(props) {
    //Clases de estilo
    const classes = useStyles()
    //Constante que guarda el pin de la URL
    const { match: { params: { pin } } } = props
    const player = jwtDecode(getAccessTokenApi()).nickname

    //Estado que guarda todos los datos de la partida local
    const [gameLocal, setGameLocal] = useState({
        player1: {
            pts: 0,
            sum_dice: 0,
            pos: 0,
            excer: 0,
            correct: 0,
            wrong: 0,
            rounds: 0
        },

        player2: {
            pts: 0,
            sum_dice: 0,
            pos: 0,
            excer: 0,
            correct: 0,
            wrong: 0,
            rounds: 0
        },
        currentPlayer: 0,
        currentPos: 0,
        turn: '',
        /**
         * Fases (phase):
         * - draw: Es cuando el jugador puede mover su ficha
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
    //Estdos que guardan las stats del jugador
    const [oldStats, setOldStats] = useState([])
    const [isNewRecord, setIsNewRecord] = useState(false)

    //Estado que guarda la información del juego
    const [game, setGame] = useState([])
    const [board, setBoard] = useState([])
    const [excercise, setExcercise] = useState([])

    //Estado que guarda la menu del juego
    const [openMenu, setOpenMenu] = useState(false)
    const [openExcPanel, setOpenExcPanel] = useState(false)
    const [openEventPanel, setopenEventPanel] = useState(false)
    const [openResultsPanel, setOpenResultsPanel] = useState(false)

    //Estados locales
    //Sumatoria de dados para calcular el No de casilla
    const [dice, setDice] = useState(0)

    //Hooks de animaciones de los jugadores
    const moveP1 = useSpring({
        config: { tension: 400 },
        marginLeft: posPlayer1[gameLocal.player1.sum_dice % 30].left,
        marginTop: posPlayer1[gameLocal.player1.sum_dice % 30].top
    })

    const moveP2 = useSpring({
        config: { tension: 400 },
        marginLeft: posPlayer2[gameLocal.player2.sum_dice % 30].left,
        marginTop: posPlayer2[gameLocal.player2.sum_dice % 30].top
    })
    //Hooks y estado del dado
    const [flipDice, setFlipDice] = useState(false)
    const diceRotate = useSpring({
        config: { mass: 5, tension: 750, friction: 50 },
        transform: `perspective(600px) rotateX(${flipDice ? 180 : 0}deg)`,
        marginBottom: '10px'
    })

    //Efecto inicial para traer los datos
    useEffect(() => {
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
                                sum_dice: response.game.box_player_1,
                                pos: response.game.box_player_1 % 30,
                                rounds: response.game.rounds_player1
                            },
                            player2: {
                                ...gameLocal.player2,
                                pts: response.game.points_player_2,
                                sum_dice: response.game.box_player_2,
                                pos: response.game.box_player_2 % 30,
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
                                sum_dice: response.game.box_player_1,
                                pos: response.game.box_player_1 % 30,
                                rounds: response.game.rounds_player1
                            },
                            player2: {
                                ...gameLocal.player2,
                                pts: response.game.points_player_2,
                                sum_dice: response.game.box_player_2,
                                pos: response.game.box_player_2 % 30,
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

        getUserByNicknameApi(player).then(response => {
            setOldStats(response.user.classic)
        })

        document.title = 'Modo Clásico - Math Paradise'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Efecto que suma el dado al contador para mover la ficha
    /**
     * Solo mueve la ficha del jugador local,
     * asigna la posición local de acuerdo al mod del tablero
     */
    useEffect(() => {
        gameLocal.turn === 1 ?
            setGameLocal({
                ...gameLocal,
                player1: {
                    ...gameLocal.player1,
                    sum_dice: gameLocal.player1.sum_dice + dice,
                    pos: (gameLocal.player1.sum_dice + dice) % 30
                },
                currentPos: (gameLocal.player1.sum_dice + dice) % 30
            }) :
            setGameLocal({
                ...gameLocal, player2: {
                    ...gameLocal.player2,
                    sum_dice: gameLocal.player2.sum_dice + dice,
                    pos: (gameLocal.player2.sum_dice + dice) % 30
                },
                currentPos: (gameLocal.player2.sum_dice + dice) % 30
            })
    }, [dice])

    //Funmción para girar el dado
    const rollDice = () => {
        let rand

        //Si el valor generado es igual al anterior, lo vuelve a generar
        do {
            rand = Math.floor((Math.random() * 6) + 1)
        } while (dice === rand);

        //Gira el dado
        setFlipDice(!flipDice)
        //Asigna aleatorio al dado
        setDice(rand)
        //Cambia de fase de contestar
        setGameLocal({ ...gameLocal, phase: 'answering' })
    }

    //Función para avanzar casillas personalizas
    // --- TESTEAR ---
    //TODO: Quitar luego
    /*const addDiceNumber = (n) => {
        //Gira el dado
        setFlipDice(!flipDice)
        //Asigna aleatorio al dado
        setDice(n)
        //Cambia de fase de contestar
        setGameLocal({ ...gameLocal, phase: 'answering' })
    }*/

    //Efecto que reacciona a las posiciones para mostrar ejercicio
    /**
     * Solo mostrará el ejercicio de la posición del jugador
     * actual (currentPlayer) si la fase está en contestando
     */
    useEffect(() => {
        setTimeout(() => {
            if (gameLocal.phase === 'answering') {
                //si la casilla es diferente a las esquinas (Inicio y random)
                if (gameLocal.currentPos !== 0 && gameLocal.currentPos !== 24) {
                    /**
                     * Trae un ejercicio aleatorio del servidor
                     * Parámetros: 
                     * - Area (Materia)
                     * - Posición actual (Subtema)
                     * - Dificultad
                     */
                    getRandomExcerciseApi(
                        gameLocal.area,
                        board[gameLocal.currentPos === 9 || gameLocal.currentPos === 15 ?
                            //manda del tablero, una posición random con tema
                            Math.floor(Math.random() * 8) + 1 :
                            //Manda el ejercicio en la posición actual
                            gameLocal.currentPos].name,
                        gameLocal.difficulty).then(r => {
                            setExcercise(r.excercise[0])
                        })

                    //Abre panel de ejercicios
                    setOpenExcPanel(true)
                } else {
                    //Casilla inicio
                    if (gameLocal.currentPos === 0) {
                        //Suma 20 puntos por dar una vuelta completa
                        if (gameLocal.currentPlayer === 1) {
                            setGameLocal({
                                ...gameLocal,
                                player1: {
                                    ...gameLocal.player1,
                                    pts: gameLocal.player1.pts + 20
                                },
                                turn: 2,
                                phase: 'waiting'
                            })
                        } else {
                            setGameLocal({
                                ...gameLocal,
                                player2: {
                                    ...gameLocal.player2,
                                    pts: gameLocal.player2.pts + 20
                                },
                                turn: 1,
                                phase: 'waiting'
                            })
                        }

                        //Cambia de turno
                        updateGame(20)
                    }

                    //Casilla de evento random
                    if (gameLocal.currentPos === 24) {
                        //Abre el panel del ejercicio
                        setopenEventPanel(true)
                    }
                }
            }
        }, 1000);
    }, [
        gameLocal.currentPlayer,
        gameLocal.turn,
        gameLocal.currentPos
    ])

    //Efecto que suma el número de vueltas
    useEffect(() => {
        //vueltas del jugador 1
        /**
         * Ciclo for que se detiene hasta el No de vueltas elegidas.
         * Condiciona si, la sumatoria de dados ha llegado a 30 mult. por el indice y
         * sus vueltas son iguales a sus rondas - 1, entonces, asigna el valor de i
         * a la vuelta.
         * --- El ciclo ya no aumentará vueltas si ya las alcanzó ---
         */
        for (let i = 1; i <= gameLocal.totalRounds; i++) {
            if (gameLocal.player1.sum_dice >= 30 * i && gameLocal.player1.rounds === i - 1) {
                setGameLocal({
                    ...gameLocal, player1: {
                        ...gameLocal.player1,
                        rounds: i
                    }
                })
                //Rompre el ciclo
                break
            }
        }

        //vueltas del jugador 2 (Mismo algoritmo para el jugador 2)
        for (let i = 1; i <= gameLocal.totalRounds; i++) {
            if (gameLocal.player2.sum_dice >= 30 * i && gameLocal.player2.rounds === i - 1) {
                setGameLocal({
                    ...gameLocal, player2: {
                        ...gameLocal.player2,
                        rounds: i
                    }
                })
                break
            }
        }
    }, [gameLocal.player1.sum_dice, gameLocal.player2.sum_dice])

    //Efecto que detecta las vueltas de los dos jugadores
    /**
     * SI LOS DOS JUGADORES YA ALCANZARON LAS VUELTAS,
     * EL JUEGO SE TERMINA
     */
    useEffect(() => {
        if ((gameLocal.player1.rounds === gameLocal.totalRounds &&
            gameLocal.player2.rounds === gameLocal.totalRounds) &&
            gameLocal.totalRounds > 0) {
            //Finaliza el juego
            updateGameApi({ status: 'finished' }, pin).then()

            let newStats = {
                classic: {
                    points: 0,
                    right_excercises: 0,
                    mistakes: 0,
                    victories: 0,
                    defeats: 0
                }
            }

            if (gameLocal.currentPlayer === 1) {

                newStats.classic.points = gameLocal.player1.pts > oldStats.points ? gameLocal.player1.pts : oldStats.points
                newStats.classic.right_excercises = oldStats.right_excercises + gameLocal.player1.correct
                newStats.classic.mistakes = oldStats.mistakes + gameLocal.player1.wrong
                newStats.classic.victories = gameLocal.player1.pts > gameLocal.player2.pts ? oldStats.victories + 1 : oldStats.victories
                newStats.classic.defeats = gameLocal.player1.pts < gameLocal.player2.pts ? oldStats.defeats + 1 : oldStats.defeats

                //condición que indica si hay nuevo record en los puntos
                if (gameLocal.player1.pts > oldStats.points) {
                    setIsNewRecord(true)
                }

            } else if (gameLocal.currentPlayer === 2) {
                newStats.classic.points = gameLocal.player2.pts > oldStats.points ? gameLocal.player2.pts : oldStats.points
                newStats.classic.right_excercises = oldStats.right_excercises + gameLocal.player2.correct
                newStats.classic.mistakes = oldStats.mistakes + gameLocal.player2.wrong
                newStats.classic.victories = gameLocal.player2.pts > gameLocal.player1.pts ? oldStats.victories + 1 : oldStats.victories
                newStats.classic.defeats = gameLocal.player2.pts < gameLocal.player1.pts ? oldStats.defeats + 1 : oldStats.defeats

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

            //cierra todos los paneles
            setOpenExcPanel(false)
            setopenEventPanel(false)
            setOpenMenu(false)

            //Actualiza la partida
            updateGame(0, 0)

            //Abre el panel de resultados
            setOpenResultsPanel(true)
        }
    }, [
        gameLocal.player1.rounds,
        gameLocal.player2.rounds,
        gameLocal.player1.pts,
        gameLocal.player2.pts,
        openExcPanel,
        openEventPanel,
        openMenu,
        oldStats,
        isNewRecord
    ])

    //Efecto para bajar la partida si el turno es del otro jugador
    /**
     * Traerá datos del servidor cada 3 segundos y verificará que 
     * si el turno es igual, actualizará los datos locales
     */
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
                                sum_dice: response.game.box_player_1,
                                pos: response.game.box_player_1 % 30,
                                rounds: response.game.rounds_player1
                            },
                            player2: {
                                ...gameLocal.player2,
                                pts: response.game.points_player_2,
                                sum_dice: response.game.box_player_2,
                                pos: response.game.box_player_2 % 30,
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

    //Función para cerrar el panel de ejercicio y contestar el ejercicio
    //Esta función cambia la fase a esperando y cambia el turno 
    const saveResult = (earnedPts) => {
        //Cierro el panel de ejercicios
        setOpenExcPanel(!openExcPanel)

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
                    excer: gameLocal.player2.excer + 1,
                    correct: earnedPts > 0 ? gameLocal.player2.correct + 1 : gameLocal.player2.correct,
                    wrong: earnedPts <= 0 ? gameLocal.player2.wrong + 1 : gameLocal.player2.wrong
                },
                turn: gameLocal.turn === 1 ? 2 : 1,
                phase: 'waiting'
            })
        }

        //Subo al servidor los resultados locales
        updateGame(earnedPts)
    }

    //Función para guardar los datos del evento
    const saveEvent = (event) => {
        //Cierra el panel de evento
        setopenEventPanel(!openEventPanel)

        switch (event) {
            //Disminuye una casilla
            case '-1 casillas': {
                if (gameLocal.currentPlayer === 1) {
                    setGameLocal({
                        ...gameLocal,
                        player1: {
                            ...gameLocal.player1,
                            sum_dice: gameLocal.player1.sum_dice - 1
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                } else {
                    setGameLocal({
                        ...gameLocal,
                        player2: {
                            ...gameLocal.player2,
                            sum_dice: gameLocal.player2.sum_dice - 1
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                }

                //Actualiza la partida
                updateGame(0, -1)
            }
                break;

            //Disminuye tres casilla
            case '-3 casillas': {
                if (gameLocal.currentPlayer === 1) {
                    setGameLocal({
                        ...gameLocal,
                        player1: {
                            ...gameLocal.player1,
                            sum_dice: gameLocal.player1.sum_dice - 3
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                } else {
                    setGameLocal({
                        ...gameLocal,
                        player2: {
                            ...gameLocal.player2,
                            sum_dice: gameLocal.player2.sum_dice - 3
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                }

                //Actualiza la partida
                updateGame(0, -3)
            }
                break;

            case '-5 casillas': {
                if (gameLocal.currentPlayer === 1) {
                    setGameLocal({
                        ...gameLocal, player1: {
                            ...gameLocal.player1,
                            sum_dice: gameLocal.player1.sum_dice - 5
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                } else {
                    setGameLocal({
                        ...gameLocal,
                        player2: {
                            ...gameLocal.player2,
                            sum_dice: gameLocal.player2.sum_dice - 5
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                }

                //Actualiza la partida
                updateGame(0, -5)
            }
                break;

            case '+2 casillas': {
                if (gameLocal.currentPlayer === 1) {
                    setGameLocal({
                        ...gameLocal, player1: {
                            ...gameLocal.player1,
                            sum_dice: gameLocal.player1.sum_dice + 2
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                } else {
                    setGameLocal({
                        ...gameLocal,
                        player2: {
                            ...gameLocal.player2,
                            sum_dice: gameLocal.player2.sum_dice + 2
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                }

                //Actualiza la partida
                updateGame(0, 2)
            }
                break;

            case '+3 casillas': {
                if (gameLocal.currentPlayer === 1) {
                    setGameLocal({
                        ...gameLocal, player1: {
                            ...gameLocal.player1,
                            sum_dice: gameLocal.player1.sum_dice + 3
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                } else {
                    setGameLocal({
                        ...gameLocal,
                        player2: {
                            ...gameLocal.player2,
                            sum_dice: gameLocal.player2.sum_dice + 3
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                }

                //Actualiza la partida
                updateGame(0, 3)
            }
                break;

            case 'Ejercicio Aleatorio': {

                getRandomExcerciseApi(
                    gameLocal.area,
                    board[Math.floor(Math.random() * (16 - 24) + 24)].name,
                    gameLocal.difficulty).then(r => {
                        setExcercise(r.excercise[0])
                    })

                /**
                 * Abre el panel de ejercicios
                 * el ejercicio lo dará aleatorio
                 */
                setOpenExcPanel(true)
            }
                break;

            case '-5 puntos': {
                if (gameLocal.currentPlayer === 1) {
                    setGameLocal({
                        ...gameLocal, player1: {
                            ...gameLocal.player1,
                            pts: gameLocal.player1.pts - 5
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                } else {
                    setGameLocal({
                        ...gameLocal,
                        player2: {
                            ...gameLocal.player2,
                            pts: gameLocal.player2.sum_dice - 5
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                }

                //Actualiza la partida
                updateGame(-5, 0)
            }
                break;

            case '-10 puntos': {
                if (gameLocal.currentPlayer === 1) {
                    setGameLocal({
                        ...gameLocal, player1: {
                            ...gameLocal.player1,
                            pts: gameLocal.player1.pts - 10
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                } else {
                    setGameLocal({
                        ...gameLocal,
                        player2: {
                            ...gameLocal.player2,
                            pts: gameLocal.player2.sum_dice - 10
                        },
                        turn: gameLocal.turn === 1 ? 2 : 1,
                        phase: 'waiting'
                    })
                }

                //Actualiza la partida
                updateGame(-10, 0)
            }
                break;

            case 'Tira otra vez': {
                setGameLocal({
                    ...gameLocal,
                    phase: 'draw'
                })
            }
                break;

            default:
                break;
        }
    }

    /**
     * Función que sube los datos locales al servidor
     */
    const updateGame = (ePts, pos = 0) => {
        updateGameApi({
            points_player_1: gameLocal.currentPlayer === 1 ? gameLocal.player1.pts + ePts : gameLocal.player1.pts,
            box_player_1: gameLocal.currentPlayer === 1 ? gameLocal.player1.sum_dice + pos : gameLocal.player1.sum_dice,
            points_player_2: gameLocal.currentPlayer === 2 ? gameLocal.player2.pts + ePts : gameLocal.player2.pts,
            box_player_2: gameLocal.currentPlayer === 2 ? gameLocal.player2.sum_dice + pos : gameLocal.player2.sum_dice,
            rounds_player1: gameLocal.player1.rounds,
            rounds_player2: gameLocal.player2.rounds,
            turn: gameLocal.turn === 1 ? 2 : 1
        }, pin).then(response => {
            if (response.status === 1) {
                console.log("Partida subida.")
            }
        })
    }

    //Función que genera un número aleatorio al dado
    const randomDiceNumber = () => {
        return <img src={
            dice === 1 ? dice1 :
                dice === 2 ? dice2 :
                    dice === 3 ? dice3 :
                        dice === 4 ? dice4 :
                            dice === 5 ? dice5 :
                                dice === 6 ? dice6 : dice1
        } alt="dice.svg" className={classes.diceImg} />
    }

    //Efecto que actualiza el mensaje
    useEffect(() => {
        //Si tu turno, muestra mensaje
        if (gameLocal.turn === gameLocal.currentPlayer) {
            setGameLocal({ ...gameLocal, message: '¡Es tu turno!' })
        } else {
            setGameLocal({
                ...gameLocal,
                message: `Es el turno de ${gameLocal.currentPlayer === 1 ? game.player2 : game.player1}`
            })
        }
    }, [gameLocal.turn, gameLocal.currentPlayer])

    //Función para abir y cerrar el menú
    const menuHandler = () => {
        setOpenMenu(!openMenu)
    }

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
            <GameMenu
                open={openMenu}
                handler={menuHandler}
                gamemode={game.gamemode}
                difficulty={game.difficulty} area={game.area} />
            <ExcercisePanel
                open={openExcPanel}
                saveResult={saveResult}
                difficulty={game.difficulty}
                excercise={excercise}
                isChall={
                    //Si es reto (Es decir, si se responde mal, se bajan 10 puntos)
                    gameLocal.currentPos === 15 ? true : false
                } />
            <GameEvent
                open={openEventPanel}
                saveEvents={saveEvent} />
            <GameResults
                open={openResultsPanel}
                info={gameLocal}
                player1={game.player1}
                player2={game.player2}
                gamemode="classic"
                isNewRecord={isNewRecord} />
            <div className={classes.player1Layer}>
                <animated.div style={moveP1}>
                    <DefaultAvatar nickname={game.player1}
                        size="7vh" fs="5vh" />
                </animated.div>
            </div>
            <div className={classes.player2Layer}>
                <animated.div style={moveP2}>
                    <DefaultAvatar nickname={game.player2}
                        size="7vh" fs="5vh"
                        color={1} />
                </animated.div>
            </div>
            <div className={classes.uiLayer}>
                <Paper className={classes.scoresPaper}>
                    <Typography variant="h6" className={classes.scoreTitle}>
                        Puntuaciones
                    </Typography>
                    <div>
                        <div>
                            {
                                gameLocal.player2.pts < gameLocal.player1.pts ?
                                    <>
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
                                    </> :
                                    <>
                                        <div className={classes.playerScore}>
                                            <div className={classes.playerNickname}>
                                                <DefaultAvatar size="5vh" fs="3vh" nickname={game.player2} color={1} />
                                                <Typography
                                                    className={classes.nickname}
                                                    style={player === game.player2 ? { fontWeight: 'bold' } : null}>{game.player2}</Typography>
                                            </div>
                                            <Typography className={classes.pointsLabel}>{gameLocal.player2.pts}</Typography>
                                        </div>
                                        <div className={classes.playerScore}>
                                            <div className={classes.playerNickname}>
                                                <DefaultAvatar size="5vh" fs="3vh" nickname={game.player1} />
                                                <Typography
                                                    className={classes.nickname}
                                                    style={player === game.player1 ? { fontWeight: 'bold' } : null}>{game.player1}</Typography>
                                            </div>
                                            <Typography className={classes.pointsLabel}>{gameLocal.player1.pts}</Typography>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    <div>
                        <Typography className={classes.roundTitle}>{`Vueltas (${game.rounds})`}</Typography>
                        <Typography className={classes.roundLabel}>
                            {`${gameLocal.player1.rounds} - ${gameLocal.player2.rounds}`}
                        </Typography>
                    </div>
                    <div className={classes.pauseContainer}>
                        <IconButton className={classes.buttonPause} size="small" onClick={menuHandler}>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                </Paper>
                <div>
                    <div className={classes.diceContainer}>
                        <div className={classes.logoContainer}>
                            <img src={classicIcon} alt="classic_icon.svg" className={classes.logo} />
                            <Typography className={classes.LogoDiceSize}>Modo Clásico</Typography>
                        </div>
                        <animated.div style={diceRotate}>
                            {randomDiceNumber()}
                        </animated.div>
                        <Button
                            className={classes.button}
                            startIcon={<CasinoIcon />}
                            style={
                                gameLocal.turn === gameLocal.currentPlayer ?
                                    { background: MATH_GRADIENTS().default } :
                                    { background: MATH_GRADIENTS().disabled }}
                            onClick={gameLocal.turn === gameLocal.currentPlayer ? rollDice : null}
                            disabled={gameLocal.phase === 'answering' ? true : false}>
                            TIRAR
                        </Button>
                        <div className={classes.logoContainer}>
                            <SpeakerNotesIcon className={classes.circularMess} size="2.5vh" />
                            <Typography className={classes.messageSize}>{gameLocal.message}</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.background}>
                <div className={classes.board}>
                    <Grid container className={classes.grid}>
                        {/**Fila 0 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={24} type={3} image={event} corner={game.board[24]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8} className={classes.centerTiles}>
                            <Tile pos={23} type={0} info={game.board[23]} />
                            <Tile pos={22} type={0} info={game.board[22]} />
                            <Tile pos={21} type={0} info={game.board[21]} />
                            <Tile pos={20} type={0} info={game.board[20]} />
                            <Tile pos={19} type={0} info={game.board[19]} />
                            <Tile pos={18} type={0} info={game.board[18]} />
                            <Tile pos={17} type={0} info={game.board[17]} />
                            <Tile pos={16} type={0} info={game.board[16]} />
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={15} type={3} image={challenge} corner={game.board[15]} />
                        </Grid>

                        {/**Fila 1 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={25} type={1} info={game.board[25]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={14} type={2} info={game.board[14]} />
                        </Grid>

                        {/**Fila 2 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={26} type={1} info={game.board[26]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={13} type={2} info={game.board[13]} />
                        </Grid>

                        {/**Fila 3 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={27} type={1} info={game.board[27]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={12} type={2} info={game.board[12]} />
                        </Grid>

                        {/**Fila 4 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={28} type={1} info={game.board[28]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={11} type={2} info={game.board[11]} />
                        </Grid>

                        {/**Fila 5 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={29} type={1} info={game.board[29]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={10} type={2} info={game.board[10]} />
                        </Grid>

                        {/**Fila 6 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile pos={0} type={3} image={start} corner={game.board[0]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8} className={classes.centerTiles}>
                            <Tile pos={1} type={0} info={game.board[1]} />
                            <Tile pos={2} type={0} info={game.board[2]} />
                            <Tile pos={3} type={0} info={game.board[3]} />
                            <Tile pos={4} type={0} info={game.board[4]} />
                            <Tile pos={5} type={0} info={game.board[5]} />
                            <Tile pos={6} type={0} info={game.board[6]} />
                            <Tile pos={7} type={0} info={game.board[7]} />
                            <Tile pos={8} type={0} info={game.board[8]} />
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={3} image={random_exc} corner={game.board[9]} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default Classic
