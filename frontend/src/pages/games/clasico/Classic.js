import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import { Grid, Typography, Paper, CircularProgress, Backdrop } from '@material-ui/core'
import clsx from 'clsx'

/**Componentes */
import DefaultAvatar from '../../../components/DefaultAvatar'

/**APIs */
import { getGameByPinApi } from '../../../api/game'
import Tile from '../../../components/game_items/Tile'

/**Images */
import challenge from '../../../assets/images/layouts/classic/challenge_icon.svg'
import event from '../../../assets/images/layouts/classic/random_event_icon.svg'
import random_exc from '../../../assets/images/layouts/classic/random_excercise_icon.svg'
import start from '../../../assets/images/layouts/classic/start_icon.svg'

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
            <div className={classes.stats}>
                <Paper><h1>XD</h1></Paper>
            </div>
            <div className={classes.players}>
                <Paper><h3>xd</h3></Paper>
            </div>
            <div className={classes.background}>
                <div className={classes.board}>
                    <Grid container className={classes.grid}>
                        {/**Fila 0 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={3} image={event} corner={game.board[24]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8} className={classes.centerTiles}>
                            <Tile type={0} info={game.board[23]} />
                            <Tile type={0} info={game.board[22]} />
                            <Tile type={0} info={game.board[21]} />
                            <Tile type={0} info={game.board[20]} />
                            <Tile type={0} info={game.board[19]} />
                            <Tile type={0} info={game.board[18]} />
                            <Tile type={0} info={game.board[17]} />
                            <Tile type={0} info={game.board[16]} />
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={3} image={challenge} corner={game.board[15]} />
                        </Grid>

                        {/**Fila 1 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={1} info={game.board[25]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}>
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={2} info={game.board[14]} />
                        </Grid>

                        {/**Fila 2 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={1} info={game.board[26]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={2} info={game.board[13]} />
                        </Grid>

                        {/**Fila 3 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={1} info={game.board[27]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={2} info={game.board[12]} />
                        </Grid>

                        {/**Fila 4 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={1} info={game.board[28]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={2} info={game.board[11]} />
                        </Grid>

                        {/**Fila 5 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={1} info={game.board[29]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={2} info={game.board[10]} />
                        </Grid>

                        {/**Fila 6 */}
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <Tile type={3} image={start} corner={game.board[0]} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8} className={classes.centerTiles}>
                            <Tile type={0} info={game.board[1]} />
                            <Tile type={0} info={game.board[2]} />
                            <Tile type={0} info={game.board[3]} />
                            <Tile type={0} info={game.board[4]} />
                            <Tile type={0} info={game.board[5]} />
                            <Tile type={0} info={game.board[6]} />
                            <Tile type={0} info={game.board[7]} />
                            <Tile type={0} info={game.board[8]} />
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
