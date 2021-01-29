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

/**APIs */
import { getGameByPinApi, updateGameApi } from '../../../api/game'
import { getAccessTokenApi } from '../../../api/auth'

/**Iconos */
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'

/**Otros */
import { posPlayer1, posPlayer2 } from './TilePositions'

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
            wrong: 0
        },

        player2: {
            pts: 0,
            sum_dice: 0,
            pos: 0,
            excer: 0,
            correct: 0,
            wrong: 0
        },

        /**
         * Fases (phase):
         * - draw: tirar
         * - answering: contestando
         * - waiting: esperando 
         */

        currentPlayer: 0,
        turn: '',
        phase: 'draw',
        message: '',
        status: 'in_game'
    })

    //Estado que guarda la información del juego
    const [game, setGame] = useState([])
    const [board, setBoard] = useState([])

    //Estado que guarda la información del juego
    const [openMenu, setOpenMenu] = useState(false)

    //Estados locales
    //Sumatoria de dados para calcular el No de casilla
    const [dice, setDice] = useState(0)
    //Variables para el tiempo
    const [clock, setClock] = useState("00:00")
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    //Hooks de animaciones
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

    const [flipDice, setFlipDice] = useState(false)
    const diceRotate = useSpring({
        config: { mass: 5, tension: 750, friction: 50 },
        transform: `perspective(600px) rotateX(${flipDice ? 180 : 0}deg)`,
        marginBottom: '10px'
    })

    //Función para traer los datos
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

                    //Asigna el current player y el turno
                    if (response.game.host === player) {
                        setGameLocal({
                            ...gameLocal,
                            currentPlayer: 1,
                            turn: response.game.turn
                        })
                    } else {
                        setGameLocal({
                            ...gameLocal,
                            currentPlayer: 2,
                            turn: response.game.turn
                        })
                    }
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Efecto para el cronómetro
    useEffect(() => {
        const c = setInterval(() => {
            setSeconds(seconds + 1)

            if (seconds === 59) {
                setSeconds(0)
                setMinutes(minutes + 1)
            }

            setClock(
                seconds < 10 && minutes < 10 ? `0${minutes}:0${seconds}` :
                    seconds < 10 && minutes >= 10 ? `${minutes}:0${seconds}` :
                        seconds >= 10 && minutes < 10 ? `0${minutes}:${seconds}` :
                            `${minutes}:${seconds}`
            )
        }, 1000)

        //Limpia el cronometro
        return () => {
            clearInterval(c)
        }
    }, [seconds, minutes, clock])

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

    //Efecto que suma el dado al contador para mover la ficha
    useEffect(() => {
        gameLocal.turn === 1 ?
            setGameLocal({
                ...gameLocal,
                player1: {
                    ...gameLocal.player1,
                    sum_dice: gameLocal.player1.sum_dice + dice,
                    pos: (gameLocal.player1.sum_dice + dice) % 30
                }
            }) :
            setGameLocal({
                ...gameLocal, player2: {
                    ...gameLocal.player2,
                    sum_dice: gameLocal.player2.sum_dice + dice,
                    pos: ((gameLocal.player2.sum_dice + dice)) % 30
                }
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
        //Hace el movimiento
    }

    /**
     * TODO: Función para actualizar los datos una vez que se haya acabado de
     * contestar
     * 
     * updateGameApi({
                    turn: gameLocal.turn === 1 ? 2 : 1,
                    points_player_1: gameLocal.player1.pts,
                    box_player_1: gameLocal.player1.sum_dice,
                    points_player_2: gameLocal.player2.pts,
                    box_player_2: gameLocal.player2.sum_dice,
                }, pin).then(response => {
                    if (response.status === 1) {
                        setTimeout(() => {
                            setGameLocal({
                                ...gameLocal,
                                turn: gameLocal.turn === 1 ? 2 : 1
                            })
                        }, 1000);
                    }
                })
     */

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
                            },
                            player2: {
                                ...gameLocal.player2,
                                pts: response.game.points_player_2,
                                sum_dice: response.game.box_player_2,
                                pos: response.game.box_player_2 % 30,
                            },
                            turn: response.game.turn,
                            status: response.game.status
                        })
                    }
                })
            }, 3000);
        }
        return () => clearInterval(f)
    }, [gameLocal.turn, gameLocal.currentPlayer, gameLocal])

    //Efecto que reacciona a las posiciones para mostrar ejercicio
    /**
     * Solo mostrará el ejercicio de la posición del jugador
     * actual (currentPlayer)
     */
    useEffect(() => {
        setTimeout(() => {
            if (gameLocal.currentPlayer === gameLocal.turn) {
                if (gameLocal.turn === 1) {
                    console.log(board[gameLocal.player1.pos])
                } else {
                    console.log(board[gameLocal.player2.pos])
                }
            }
        }, 1000);
    }, [
        gameLocal.currentPlayer,
        gameLocal.turn,
        gameLocal.player1.pos,
        gameLocal.player2.pos
    ])

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
                        <Typography className={classes.timeLabel}>Tiempo - {clock}</Typography>
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
                            style={
                                gameLocal.turn === gameLocal.currentPlayer ?
                                    { background: MATH_GRADIENTS().default } :
                                    { background: MATH_GRADIENTS().disabled }}
                            onClick={gameLocal.turn === gameLocal.currentPlayer ? rollDice : null}>
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
