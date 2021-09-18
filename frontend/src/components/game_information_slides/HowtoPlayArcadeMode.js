import React from 'react'
import {
    Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
    Slide, Box
} from '@material-ui/core'
import { useStyles } from './useStyles'

/**Imágenes */
import rushIcon from '../../assets/images/icons/arcade_icon_1.svg'
import theme from '../../styles/MathThemes'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function HowtoPlayArcadeMode(props) {
    const classes = useStyles()
    const { isOpen, handleOnClose } = props

    return (
        <Dialog
            open={isOpen}
            keepMounted
            TransitionComponent={Transition}
            onClose={handleOnClose}>

            <Box className={classes.rushIconBox}>
                <img src={rushIcon} alt="rush_icon" className={classes.rushIcon} />
            </Box>

            <DialogTitle
                style={{ color: theme.palette.primary.main }}
                className={classes.title}>¿Cómo jugar en el Modo Arcade?</DialogTitle>

            <DialogContent>
                <DialogContentText className={classes.textContent}>
                    Para jugar el Modo Arcade, deberás obtener más puntos
                    que tu oponente, contestando ejercicios aleatorios.
                    <br />
                    <br />
                    En la parte izquierda un panel donde se visualizarán tus
                    puntos junto a los de tu contrincante.
                    <br />
                    <br />
                    Finalmente en la parte inferior, econtrarás un contador de
                    turnos, el numero de la izquierda son del jugador 1 (creador de la partida)
                    y los de la derecha, los del jugador 2 (contrincante).
                    <br />
                    <br />
                    Al dar al botón (Tirar), empezará a seleccionarse una casilla al azar
                    de todo el tablero, el tiempo de giro es aleatorio.
                    <br />
                    <br />
                    Al caer en una casilla, arrojará un ejercicio de opción múltiple
                    del tema de la casilla.
                    <br />
                    <br />
                    Hay varios tipos de casillas, las casillas de las esquinas son especiales,
                    y las demás, son solo casillas de ejercicios.
                    <br />
                    <br />
                    Al visualizar el ejercicio, este te mostrará el subtema, el ejercicio
                    y cuatro opciones, dependiendo de la dificultad, tendrás un tiempo
                    límite para contestarlo.
                    <br />
                    <br />
                    <span style={{ fontWeight: 'bold' }}>TIPOS DE CASILLA</span>
                    <br />
                    <br />
                    - Normal: Te mostrará un ejercicio dependiendo de su tema.
                    <br />
                    - Ejercicio Random: Te mostrará un ejercicio aleatorio.
                    <br />
                    - Reto: Mostrará un ejercicio al azar, pero el cronómetro irá el doble de
                    rápido, si lo contestas de forma errónea, te bajará 150 puntos.
                    <br />
                    <br />
                    Para ganar puntos, obtendrás 1000 puntos si contestas en menos de 5 segundos,
                    500 en menos de 15 segundos, y 100 puntos, si contestas correctamente, no
                    obtendrás puntos si contestas mal.
                    <br />
                    <br />
                    El juego termina cuando los dos jugadores completan sus turnos seleccionados.
                    <br />
                    <br />
                    <span style={{ fontWeight: 'bold' }}>
                        GANA EL JUGADOR QUE TENGA MÁS PUNTOS.
                    </span>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleOnClose} color="primary">
                    Aceptar
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default HowtoPlayArcadeMode
