import React from 'react'
import { Howler } from 'howler'
import { makeStyles } from "@material-ui/core/styles"
import {
    Button, Dialog, DialogActions, DialogContent, Box, Slide, Typography
} from "@material-ui/core"

import rushLogo from '../../../assets/images/icons/rush_icon_1.svg'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#00487C'
    },
    subtitle: {
        color: '#222222'
    },
    stats: {
        fontSize: '20px'
    },
    dialog: {
        textAlign: 'center',
        padding: theme.spacing(3),
    },
    imageBox: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(3),
    },
    image: {
        width: '12vh'
    },
    recordLabel: {
        color: '#F75C5C',
        fontWeight: 'bold',
        marginTop: theme.spacing(2)
    },
}))

function RushResults(props) {
    const classes = useStyles()
    /**Props */
    let { isOpen, isNewRecord, title, level, exCount, points, multiplier, button1 } = props

    const backToHome = () => {
        Howler.stop()
        window.location.href = '/home/play'
    }

    return (
        <>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">

                <Box className={classes.imageBox}>
                    <img src={rushLogo} alt='rush_icon' className={classes.image}></img>
                </Box>

                <Box className={classes.dialog}>
                    <Typography variant="h4" className={classes.title}>{title}</Typography>
                    <span className={classes.subtitle}>Resultados de juego</span>
                    {isNewRecord ? <Typography variant="h5" className={classes.recordLabel}>¡Nuevo Récord!</Typography> : null}
                </Box>

                <DialogContent>
                    <Typography className={classes.stats}>
                        Puntos:<span className={classes.title}> {points}</span>
                    </Typography>
                    <Typography className={classes.stats}>
                        Ejercicios contestados:<span className={classes.title}> {exCount}</span>
                    </Typography>
                    <Typography className={classes.stats}>
                        Nivel alcanzado: <span className={classes.title}> {level}</span>
                    </Typography>
                    <Typography className={classes.stats}>
                        Multiplicador alcanzado: <span className={classes.title}> &times;{multiplier}</span>
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={backToHome} color="primary">
                        {button1}
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default RushResults
