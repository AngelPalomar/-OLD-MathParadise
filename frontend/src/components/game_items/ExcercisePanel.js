import React, { useState } from 'react'
import { useStyles } from './useStyles'
import { withStyles } from "@material-ui/core/styles"
import { MATH_COLORS } from "../../styles/MathColors"
import {
    Dialog, DialogActions, Button, Typography, Radio, RadioGroup, FormControlLabel,
    LinearProgress
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles';

import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from "react-katex"
import { UpTransition } from '../../styles/Transitions'

/**Icons */
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const Transition = UpTransition

function ExcercisePanel(props) {
    const classes = useStyles()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    //Color de los radio btn
    const MathRadio = withStyles({
        root: {
            color: MATH_COLORS().math_disabled_dark,
            '&$checked': {
                color: MATH_COLORS().math_blue,
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    //Traigo las props
    const { open, answerExc, info, isChall } = props

    //Estados del usuario
    const [userAnswer, setUserAnswer] = useState('')

    //Función para cambiar el valor seleccionado
    const handleUserAnswerValue = (e) => {
        setUserAnswer(e.target.value)
    }

    if (!info) {
        return null
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            fullScreen={fullScreen}
            keepMounted
            maxWidth='md'
            fullWidth={true}>

            <div className={classes.excDialog}>
                <div>
                    <Typography className={classes.topicLabel}>
                        {`${info.area} - ${info.topic}`}
                    </Typography>
                    <Typography className={classes.subtopicLabel}>{info.name}</Typography>
                </div>
                <Typography className={classes.instrucLabel}>Resuelve el siguiente ejercicio:</Typography>
                <div>
                    <div className={classes.excerciseLabel}>
                        <BlockMath math="x+2=3x-\frac{x}{2}" />
                    </div>
                </div>
                <Typography className={classes.instrucLabel}>Seleccione la respuesta:</Typography>

                <RadioGroup className={classes.optionsPanel} value={userAnswer} onChange={handleUserAnswerValue}>
                    <FormControlLabel value="a" control={<MathRadio />} label={<InlineMath math="x=a" />} />
                    <FormControlLabel value="b" control={<MathRadio />} label={<InlineMath math="x=b" />} />
                    <FormControlLabel value="c" control={<MathRadio />} label={<InlineMath math="x=c" />} />
                    <FormControlLabel value="d" control={<MathRadio />} label={<InlineMath math="x=d" />} />
                </RadioGroup>

                <div className={classes.clockContainer}>
                    <Typography>Tiempo 00:00</Typography>
                    <LinearProgress variant="determinate" value={0} />
                </div>

                <DialogActions>
                    <Button
                        className={classes.giveUpBtn}
                        startIcon={<CancelIcon />}>
                        Rendirse
                    </Button>
                    <Button
                        className={classes.answerBtn}
                        startIcon={<CheckCircleIcon />}
                        onClick={answerExc}>
                        Contestar
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default ExcercisePanel
