import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import {
    Dialog, DialogContent, Slide, Button, Typography, Slider
} from '@material-ui/core'
import { Howler } from 'howler'

/**Iconos */
//import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
//import ReplayIcon from '@material-ui/icons/Replay'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function GameMenu(props) {
    const cls = useStyles()
    const { open, handler, gamemode, difficulty, area } = props

    /**Control del volumen */
    const [volume, setVolume] = useState(100)

    //Función para controlar el volumen
    const changeVolume = (event, newValue) => {
        setVolume(newValue)
    }

    useEffect(() => {
        Howler.volume(volume / 100)
    }, [volume])

    return (
        <Dialog
            open={open}
            onClose={handler}
            TransitionComponent={Transition}
            keepMounted>
            <div className={cls.excDialog}>
                <Typography className={cls.menuTitle}>Menú principal</Typography>
                <DialogContent>
                    <div className={cls.gameInfoContainer}>
                        <Typography>Modo de juego: <span className={cls.infoData}>{gamemode === 'classic' ? 'Clásico' : 'Arcade'}</span></Typography>
                        <Typography>
                            Dificultad: <span className={cls.infoData}>{difficulty === 'easy' ? 'Fácil' :
                                difficulty === 'normal' ? 'Normal' : difficulty ===
                                    'hard' ? 'Difícil' : 'Personalizada'}</span>
                        </Typography>
                        <Typography>Area: <span className={cls.infoData}>{area}</span></Typography>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        marginBlock: 10
                    }}>
                        <VolumeDown />
                        <Slider style={{
                            marginInline: 10
                        }}
                            value={volume}
                            onChange={changeVolume} />
                        <VolumeUp />
                    </div>
                    <div className={cls.menuPauseOptions}>
                        <Button onClick={handler} className={cls.buttonResume} >
                            <PlayArrowIcon style={{ fontSize: 50 }} />
                        </Button>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default GameMenu
