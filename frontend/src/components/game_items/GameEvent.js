import React, { useState } from 'react'
import { useStyles } from './useStyles'
import {
    Dialog, Button, Typography
} from '@material-ui/core'
import { UpTransition } from '../../styles/Transitions'

/**Eventos */
import { events } from './events'

/**Iconos */
import PlayForWorkIcon from '@material-ui/icons/PlayForWork'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const Transition = UpTransition

function GameEvent(props) {
    const classes = useStyles()
    const { open, saveEvents } = props

    //Estado para menejar los eventos
    const [event, setEvent] = useState('¿?')

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onExit={() => { setEvent('¿?') }}>

            <div className={classes.excDialog}>
                <Typography className={classes.evtTitle}>Evento a la suerte</Typography>
                <Typography className={classes.evtInstruc}>
                    Presiona el botón para obtener obtener un evento aleatorio.
                </Typography>

                <div className={classes.cardContainer}>
                    <div className={classes.eventCard}>
                        <Typography style={{ fontSize: '3vh' }}>{event}</Typography>
                    </div>
                </div>

                <div className={classes.drawBtnEventCont}>
                    {
                        event === '¿?' ?
                            <Button
                                className={classes.answerBtn}
                                startIcon={<PlayForWorkIcon />}
                                onClick={() => {
                                    setEvent(events[Math.floor(Math.random() * events.length)])
                                }}>
                                Tirar
                            </Button> :
                            <Button
                                className={classes.acceptBtn}
                                startIcon={<CheckCircleIcon />}
                                onClick={() => { saveEvents(event) }}>
                                Aceptar
                            </Button>
                    }
                </div>
            </div>
        </Dialog>
    )
}

export default GameEvent
