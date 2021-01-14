import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import { Grid, Typography, Paper, CircularProgress, Backdrop, Button, IconButton } from '@material-ui/core'
import { MATH_COLORS, MATH_GRADIENTS } from '../../../styles/MathColors'
import clsx from 'clsx'

/**Componentes */
import DefaultAvatar from '../../../components/DefaultAvatar'
import Tile from '../../../components/game_items/Tile'

/**Iconos */
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

/**APIs */
import { getGameByPinApi } from '../../../api/game'

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

    //Estado que guarda la información del juego
    const [game, setGame] = useState([])
    //Variable para pantalla de carga inicial
    const [openBackdrop] = useState(true)

    /**
     * Función inicial para traer los datos de la partida y actualizarlos constantemente
     * cada 2 segundos
     * 
     * Imprime los datos de la partida en la interfaz
     * 
     */
    useEffect(() => {
        //Impresión de info de la partida va dentro del intervalo
        setInterval(() => {
            getGameByPinApi(pin).then(response => {
                if (response.status === 0) {
                    window.location.href = "/home/play"
                } else {
                    if (response.game.status !== "in_game") {
                        window.location.href = "/home/play"
                    } else {
                        setGame(response.game)
                    }
                }
            })
        }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <div className={classes.playersLayer}>
                <Paper><h3>Avatar de jugadores</h3></Paper>
            </div>
            <div className={classes.uiLayer}>
                <Paper className={classes.scoresPaper}>
                    <Typography variant="h6" className={classes.scoreTitle}>
                        Puntuaciones
                    </Typography>
                    <div>
                        {
                            game.points_player_1 < game.points_player_2 ?
                                <div>
                                    <div className={classes.playerScore}>
                                        <div className={classes.playerNickname}>
                                            <DefaultAvatar large="xs" nickname={game.player2} color={1} />
                                            <Typography className={classes.nickname}>{game.player2}</Typography>
                                        </div>
                                        <Typography className={classes.pointsLabel}>{game.points_player_2}</Typography>
                                    </div>
                                    <div className={classes.playerScore}>
                                        <div className={classes.playerNickname}>
                                            <DefaultAvatar large="xs" nickname={game.player1} />
                                            <Typography className={classes.nickname}>{game.player1}</Typography>
                                        </div>
                                        <Typography className={classes.pointsLabel}>{game.points_player_1}</Typography>
                                    </div>
                                </div> :
                                <div>
                                    <div className={classes.playerScore}>
                                        <div className={classes.playerNickname}>
                                            <DefaultAvatar large="xs" nickname={game.player1} />
                                            <Typography className={classes.nickname}>{game.player1}</Typography>
                                        </div>
                                        <Typography className={classes.pointsLabel}>{game.points_player_1}</Typography>
                                    </div>
                                    <div className={classes.playerScore}>
                                        <div className={classes.playerNickname}>
                                            <DefaultAvatar large="xs" nickname={game.player2} color={1} />
                                            <Typography className={classes.nickname}>{game.player2}</Typography>
                                        </div>
                                        <Typography className={classes.pointsLabel}>{game.points_player_2}</Typography>
                                    </div>
                                </div>
                        }
                    </div>
                    <div>
                        <Typography className={classes.timeLabel}>Tiempo - 00:00</Typography>
                    </div>
                    {/*<div>
                        <Typography className={classes.difLabel}>
                            Dificultad: {game.difficulty === 'easy' ? 'Fácil' :
                                game.difficulty === 'normal' ? 'Normal' : game.difficulty ===
                                    'hard' ? 'Difícil' : 'Personalizada'}
                        </Typography>
                    </div>*/}
                    <div className={classes.pauseContainer}>
                        <IconButton className={classes.buttonPause} size="small">
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
                        <img src={dice1} alt="dice.svg" className={classes.diceImg} />
                        <Button className={classes.button} style={{ backgroundImage: MATH_GRADIENTS().default }} >TIRAR</Button>
                        <div className={classes.logoContainer}>
                            <CircularProgress className={classes.circularMess} size="2.5vh" />
                            <Typography className={classes.messageSize}>{game.player2} está contestando</Typography>
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
