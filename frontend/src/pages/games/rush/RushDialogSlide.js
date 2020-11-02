import React from 'react'
import {
    Button, Dialog, DialogActions, DialogContent, Box, Slide, Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { boomSound } from '../../../utils/Sounds'
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
    }
}))

function RushDialogSlide(props) {
    const classes = useStyles()
    /**Props */
    const { title, button1, start, children } = props

    const [open, setOpen] = React.useState(true)

    const handleClose = () => {
        start()
        setOpen(false)
        boomSound.play()
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">

                <Box className={classes.imageBox}>
                    <img src={rushLogo} alt='rush_icon' className={classes.image}></img>
                </Box>

                <Box className={classes.dialog}>
                    <Typography variant="h4" className={classes.title}>{title}</Typography>
                </Box>

                <DialogContent>
                    {children}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {button1}
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    );
}


export default RushDialogSlide