import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import { withStyles } from "@material-ui/core/styles"
import { MATH_COLORS } from "../../styles/MathColors"
import {
    Dialog, DialogActions, Button, Typography, Radio, RadioGroup, FormControlLabel,
    LinearProgress, CircularProgress
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles';

import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from "react-katex"
import { UpTransition } from '../../styles/Transitions'

/**Icons */
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import correctIcon from '../../assets/images/icons/ok_icon.svg'
import errorIcon from '../../assets/images/icons/x_icon.svg'

/**Sonidos */
import { questionSound, correctSound, incorrectSound, gameoverSound } from '../../utils/Sounds'

const Transition = UpTransition

function ExcercisePanel(props) {
    //Traigo las props
    const { open, saveResult, excercise, isChall, difficulty } = props

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

    //Estados del cronometro
    const [seconds, setseconds] = useState(
        difficulty === 'easy' ? 30 :
            difficulty === 'normal' ? 15 :
                difficulty === 'hard' ? 45 : 30
    )
    const [minutes, setminutes] = useState(
        difficulty === 'easy' ? 1 :
            difficulty === 'normal' ? 1 :
                difficulty === 'hard' ? 0 : 1
    )
    const [staticSeconds] = useState(seconds)
    const [staticMinutes] = useState(minutes)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [clock, setclock] = useState(`0${minutes}:${seconds}`)

    //Estados del usuario
    const [earnedPoints, setEarnedPoints] = useState(0)
    const [ptsToWin, setPtsToWin] = useState(1000)
    const [userAnswer, setUserAnswer] = useState('')
    const [isAnswered, setIsAnswered] = useState(false)
    const [isTimeOver, setIsTimeOver] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [wasGiveUp, setWasGiveUp] = useState(false)

    /**
     * Función para el cronómetro regresivo
     */
    useEffect(() => {
        let c
        if (isTimeRunning) {
            c = setInterval(() => {
                setseconds(seconds - 1)
                if (seconds === 0) {
                    setseconds(59)
                    setminutes(minutes - 1)
                }

                setclock(seconds > 9 ? `0${minutes}:${seconds}` : `0${minutes}:0${seconds}`)
                //Dependiendiendo del tiempo usado, asigna puntos
                if ((staticMinutes * 60 + staticSeconds) - (minutes * 60 + seconds) <= 5) {
                    setPtsToWin(1000)
                } else {
                    if ((staticMinutes * 60 + staticSeconds) - (minutes * 60 + seconds) <= 15 &&
                        (staticMinutes * 60 + staticSeconds) - (minutes * 60 + seconds) > 5) {
                        setPtsToWin(500)
                    } else {
                        setPtsToWin(100)
                    }
                }
            }, !isChall ? 1000 : 500);
        } else if (!isTimeRunning && seconds !== 0 && minutes !== 0) {
            clearInterval(c)
        }

        //Cuando acaba el tiempo
        if (isTimeRunning && seconds < 0 && minutes === 0) {
            //Para el reloj
            setIsTimeRunning(false)
            setIsTimeOver(true)
            setIsCorrect(false)
            setIsAnswered(true)
            setEarnedPoints(!isChall ? 0 : -150)

            //Reproduce sonido
            gameoverSound.play()
        }

        return () => {
            clearInterval(c)
        }
    }, [seconds, minutes, clock, ptsToWin, isTimeRunning, isTimeOver])

    //Función para iniciar el reloj
    const startClock = () => {
        //Carga y Reproduce el sonido
        questionSound.load()
        correctSound.load()
        incorrectSound.load()
        gameoverSound.load()

        questionSound.play()

        //Reinicia el tiempo
        setseconds(
            difficulty === 'easy' ? 30 :
                difficulty === 'normal' ? 15 :
                    difficulty === 'hard' ? 45 : 30
        )
        setminutes(
            difficulty === 'easy' ? 1 :
                difficulty === 'normal' ? 1 :
                    difficulty === 'hard' ? 0 : 1
        )
        setIsTimeRunning(true)
    }

    //Función para cambiar el valor seleccionado
    const handleUserAnswerValue = (e) => {
        setUserAnswer(e.target.value)
    }

    /**
     * Función para contestar el ejercicio
     */
    const answerExcercise = () => {
        setIsTimeRunning(false)
        setIsAnswered(true)

        //Comparación
        //Si el ejercicio está bien
        if (userAnswer === excercise.answer) {
            setIsCorrect(true)
            setEarnedPoints(ptsToWin)

            //Reproduce sonido
            correctSound.play()
        } else {
            //No acertó
            setIsCorrect(false)
            //Si no es reto, no gana puntos
            if (!isChall) {
                //No ganó puntos
                setEarnedPoints(0)
            } else {
                //Pierde 50 puntos
                setEarnedPoints(-150)
            }

            //Reproduce sonido
            incorrectSound.play()
        }
    }

    //Función para resetear todo
    const resetDialog = () => {
        setminutes(0)
        setseconds(0)
        setIsAnswered(false)
        setIsTimeOver(false)
        setUserAnswer('')
        setEarnedPoints(0)
        setPtsToWin(1000)
        setWasGiveUp(false)
    }

    if (!excercise) {
        return null
    }

    return (
        <Dialog
            open={open}
            onEnter={startClock}
            onExited={resetDialog}
            TransitionComponent={Transition}
            fullScreen={fullScreen}
            maxWidth='md'
            fullWidth={true}>

            <div className={classes.excDialog}>
                {
                    !excercise.label ? <CircularProgress /> :
                        <>
                            <div>
                                <Typography className={classes.topicLabel}>
                                    {
                                        isChall ?
                                            <span style={{ color: MATH_COLORS().math_error }}>
                                                RETO:
                                            </span> : null
                                    }{` ${excercise.area} - ${excercise.topic}`}
                                </Typography>
                                <Typography className={classes.subtopicLabel}>{excercise.subtopic}</Typography>
                            </div>
                            <Typography className={classes.instrucLabel}>Resuelve el siguiente ejercicio:</Typography>
                            <div>
                                {
                                    /**
                                     * Si el tiempo no se ha acabado, muestra ejercicio,
                                     * de lo contrario muestra el mensaje de tiempo acabado
                                     */
                                    !isTimeOver ?
                                        <div className={classes.excerciseLabel}>
                                            <BlockMath math={`${excercise.label}=${isAnswered ? excercise.answer : ''}`} />
                                        </div> :
                                        <div className={classes.isTimeOverLabel}>
                                            <Typography style={{ fontSize: '5vh', textAlign: 'center' }}>El tiempo se ha acabado</Typography>
                                        </div>
                                }
                            </div>
                            <Typography className={classes.instrucLabel}>Seleccione la respuesta:</Typography>
                            <RadioGroup className={classes.optionsPanel} value={userAnswer} onChange={handleUserAnswerValue}>
                                <FormControlLabel value={excercise.option_a} control={<MathRadio disabled={isAnswered ? true : false} />} label={<InlineMath math={`${excercise.option_a}`} />} />
                                <FormControlLabel value={excercise.option_b} control={<MathRadio disabled={isAnswered ? true : false} />} label={<InlineMath math={`${excercise.option_b}`} />} />
                                <FormControlLabel value={excercise.option_c} control={<MathRadio disabled={isAnswered ? true : false} />} label={<InlineMath math={`${excercise.option_c}`} />} />
                                <FormControlLabel value={excercise.option_d} control={<MathRadio disabled={isAnswered ? true : false} />} label={<InlineMath math={`${excercise.option_d}`} />} />
                            </RadioGroup>
                            {
                                //Si no ha contestado
                                isAnswered && !wasGiveUp ?
                                    <div style={{ marginBlock: '5px' }}>
                                        {
                                            isCorrect ?
                                                <div className={classes.resultContainer}>
                                                    <img src={correctIcon} className={classes.imgIconResult} alt="result_icon.svg" />
                                                    <Typography style={{ color: MATH_COLORS().math_success }}>Respuesta correcta</Typography>
                                                    <Typography style={{ marginLeft: '5px' }}>¡Has ganado {earnedPoints} puntos!</Typography>
                                                </div> :
                                                <div className={classes.resultContainer}>
                                                    <img src={errorIcon} className={classes.imgIconResult} alt="result_icon.svg" />
                                                    <Typography style={{ color: MATH_COLORS().math_error }}>Respuesta incorrecta, la respuesta es: <InlineMath math={excercise.answer} /></Typography>
                                                </div>
                                        }
                                    </div> : null
                            }

                            <div className={classes.clockContainer}>
                                <Typography>Tiempo - {clock}</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    color={!isChall ? "primary" : "secondary"}
                                    value={((minutes * 60) + seconds) / (((staticMinutes * 60) + staticSeconds) / 100)} />
                            </div>

                            <DialogActions>
                                {
                                    /**
                                     * Si el jugador ya respondió o
                                     * el tiempo se acabó, muestra el botón ACEPTAR
                                     */
                                    !isAnswered && isTimeRunning ?
                                        <>
                                            <Button
                                                className={classes.giveUpBtn}
                                                startIcon={<CancelIcon />}
                                                onClick={() => {
                                                    setseconds(0)
                                                    setminutes(0)
                                                    setWasGiveUp(true)
                                                }}>
                                                Rendirse
                                            </Button>
                                            <Button
                                                className={classes.answerBtn}
                                                startIcon={<CheckCircleIcon />}
                                                onClick={answerExcercise}>
                                                {`Contestar +${ptsToWin} pts`}
                                            </Button>
                                        </> :
                                        <>
                                            {
                                                earnedPoints === 1000 ?
                                                    <Typography style={{
                                                        color: MATH_COLORS().math_disabled_label,
                                                        fontSize: '3vh'
                                                    }}>¡Has contestado en menos de 5 segundos!</Typography> :
                                                    earnedPoints === 500 ?
                                                        <Typography style={{
                                                            color: MATH_COLORS().math_disabled_label,
                                                            fontSize: '3vh'
                                                        }}>¡Has contestado en menos de 15 segundos!</Typography> :
                                                        earnedPoints === -150 ?
                                                            <Typography style={{
                                                                color: MATH_COLORS().math_error,
                                                                fontSize: '3vh'
                                                            }}>Pierdes 150 puntos</Typography> :
                                                            null
                                            }
                                            <Button
                                                className={classes.acceptBtn}
                                                startIcon={<CheckCircleIcon />}
                                                onClick={() => { saveResult(earnedPoints) }}>
                                                Aceptar
                                        </Button>
                                        </>
                                }
                            </DialogActions>
                            <Typography className={classes.idLabel}>ID: {excercise._id}</Typography>
                        </>
                }
            </div>
        </Dialog>
    )
}

export default ExcercisePanel
