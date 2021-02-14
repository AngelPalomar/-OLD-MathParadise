import React from 'react'
import {
    Button, Dialog, DialogActions, DialogContent, Box, Slide, Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { MATH_COLORS } from '../../../styles/MathColors'
import { useStyles as generalStyles } from '../../../components/game_items/useStyles'

import classicLogo from '../../../assets/images/icons/classic_icon_1.svg'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
    title: {
        color: MATH_COLORS().math_classic,
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
    }
}))

function ClassicInfo(props) {
    const classes = useStyles()
    const styles = generalStyles()
    /**Props */
    const { title, children, introSound } = props

    const [open, setOpen] = React.useState(true)

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                onEnter={() => { introSound.play() }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">

                <Box className={classes.imageBox}>
                    <img src={classicLogo} alt='rush_icon' className={classes.image}></img>
                </Box>

                <Box className={classes.dialog}>
                    <Typography className={classes.title}>{title}</Typography>
                </Box>

                <DialogContent>
                    {children}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} className={styles.answerBtn}>
                        Empezar
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    );
}


export default ClassicInfo