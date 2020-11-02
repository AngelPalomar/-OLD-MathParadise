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

function CompetenciesRushMode(props) {
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

            <DialogTitle className={classes.title}>Competencias a desarrollar</DialogTitle>

            <DialogContent>
                <DialogContentText className={classes.textContent}>
                    <span className={classes.titleContent}>Aritmética</span>
                    <br />
                    Suma
                    <br />
                    Resta
                    <br />
                    Multiplicación
                    <br />
                    División
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

export default CompetenciesRushMode
