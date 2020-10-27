import React from 'react'
import {
    Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
    Slide, Box
} from '@material-ui/core'
import { useStyles } from './useStyles'

/**Imágenes */
import rushIcon from '../../assets/images/icons/rush_icon_1.svg'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function HowtoPlayRushMode(props) {
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

            <DialogTitle className={classes.title}>¿Cómo jugar en el Modo Rush?</DialogTitle>

            <DialogContent>
                <DialogContentText className={classes.textContent}>
                    Para jugar el Modo Rush, deberás contestas tantos
                    ejercicios matemáticos puedas en un plazo de un minuto.
                    <br />
                    <br />
                    En el centro encontrarás el indicador del nivel actual,
                    el número de ejercicio, la puntuación y el multiplicador.
                    <br />
                    <br />
                    Finalmente en el lado izquierdo tendrás el panel que muestra
                    el tema, el ejercicio correspondiente, un campo de texto, un botón
                    para responder y un cronómetro regresivo.
                    <br />
                    <br />
                    Cuando respondas un ejercicio y sea correcto, avanzarás al
                    siguiente tema y aumentará 5 segundos a tu cronómetro,
                    si respondes mal, quedarás estancado en ese
                    ejercicio hasta que ingreses la respuesta correcta.
                    <br />
                    Cuando completes los cuatro temas, regresarás al primero
                    pero aumentará tu nivel, aumentando así la dificultad de los
                    ejercicios.
                    <br />
                    <br />
                    Si contestas rápido muchos ejercicios, aumentarás tu acumulador
                    por cada ejercicio, si lo completas, tu multiplicador de puntos
                    aumentará por cada ejercicio, perderás tu racha en el acumulador
                    si dejas de contestar por 4 segundos, o si respondes mal.
                    <br />
                    <br />
                    Ganarás puntos por cada ejercicio contestado correctamente de
                    acuerdo a tu multiplicador (5 puntos &times; multiplicador)
                    <br />
                    <br />
                    La partida termina cuando el cronómetro llegue a cero.
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

export default HowtoPlayRushMode
