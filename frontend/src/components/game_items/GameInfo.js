import React, { Fragment } from 'react'
import {
    Button, Dialog, DialogActions, DialogContent, Box, Slide, Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import theme from '../../styles/MathThemes'
import { MATH_GRADIENTS } from '../../styles/MathColors'
//import { useStyles as generalStyles } from '../../components/game_items/useStyles'

import classicLogo from '../../assets/images/icons/classic_icon_1.svg'
import arcadeLogo from '../../assets/images/icons/arcade_icon_1.svg'
import rushLogo from '../../assets/images/icons/rush_icon_1.svg'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '6vh'
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
    btn: {
        color: '#FFF',
        paddingInline: theme.spacing(2)
    },
}))

function ClassicInfo(props) {
    const classes = useStyles()
    //const styles = generalStyles()
    /**Props */
    const { title, children, gameMode, introSound } = props

    const [open, setOpen] = React.useState(true)

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                onEnter={() => { introSound.play() }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">

                <Box className={classes.imageBox}>
                    <img src={gameMode === 'classic' ? classicLogo :
                        gameMode === 'arcade' ? arcadeLogo : rushLogo} alt='rush_icon' className={classes.image}></img>
                </Box>

                <Box className={classes.dialog}>
                    <Typography
                        style={{
                            color: gameMode === 'classic' ? theme.palette.classic.main :
                                gameMode === 'arcade' ? theme.palette.arcade.main : theme.palette.rush.main
                        }}
                        className={classes.title}>{title}</Typography>
                </Box>

                <DialogContent>
                    {children}
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleClose}
                        style={{
                            background: gameMode === 'classic' ? MATH_GRADIENTS().classic :
                                gameMode === 'arcade' ? MATH_GRADIENTS().arcade : MATH_GRADIENTS().rush
                        }}
                        className={classes.btn}>
                        Empezar
                    </Button>
                </DialogActions>

            </Dialog>
        </Fragment>
    );
}


export default ClassicInfo