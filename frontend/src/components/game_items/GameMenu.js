import React from 'react'
import { useStyles } from './useStyles'
import {
    Dialog, DialogTitle, DialogContent, Slide, Button, Typography
} from '@material-ui/core'

/**Iconos */
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import ReplayIcon from '@material-ui/icons/Replay'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function GameMenu(props) {
    const cls = useStyles()
    const { open, handler, gamemode, difficulty, area } = props

    return (
        <Dialog
            open={open}
            onClose={handler}
            TransitionComponent={Transition}
            keepMounted>
            <DialogTitle className={cls.menuTitle}>Menú principal</DialogTitle>
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
                <div className={cls.menuPauseOptions}>
                    <Button className={cls.buttonBack}>
                        <ArrowBackIcon style={{ fontSize: 50 }} />
                    </Button>
                    <Button onClick={handler} className={cls.buttonResume} >
                        <PlayArrowIcon style={{ fontSize: 50 }} />
                    </Button>
                    <Button className={cls.buttonRestart}>
                        <ReplayIcon style={{ fontSize: 50 }} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GameMenu
