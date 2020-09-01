import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import {
    Button, Dialog, DialogActions, DialogContent, Box, Slide, Typography
} from "@material-ui/core"

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
    }
}))

function RushResults(props) {
    const classes = useStyles()
    /**Props */
    let { isOpen, title, level, exCount, points, button1 } = props

    const backToHome = () => {
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

                <Box className={classes.dialog}>
                    <Typography variant="h4" className={classes.title}>{title}</Typography>
                    <span className={classes.subtitle}>Resultados de juego</span>
                </Box>

                <DialogContent>
                    <Typography className={classes.stats}>Puntos: {points}</Typography>
                    <Typography className={classes.stats}>Ejercicios contestados: {exCount}</Typography>
                    <Typography className={classes.stats}>Nivel alcanzado: {level}</Typography>
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
