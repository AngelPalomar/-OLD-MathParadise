import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import { Grid, Typography } from '@material-ui/core'

/**APIs */
import { getGameByPinApi } from '../../../api/game'

function Classic(props) {
    //Clases de estilo
    const classes = useStyles()
    //Constante que guarda el pin de la URL
    const { match: { params: { pin } } } = props

    //Estado que guarda la información del juego
    const [game, setGame] = useState([])

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

    return (
        <div className={classes.main}>
            <div className={classes.board}>
                Tablero
            </div>
        </div>
    )
}

export default Classic
