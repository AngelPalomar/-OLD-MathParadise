import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Box,
    Grid,
    Paper,
    TextField,
    Button,
    LinearProgress,
    Backdrop,
    Container
} from "@material-ui/core"

/**Componentes */
import RushDialogSlide from './RushDialogSlide'
import CircularMultiplier from '../../../components/CircularMultiplier'
import RushResults from './RushResults'

//Musica y sonidos
import { rushTheme } from '../../../utils/Music'
import {
    startSound, boomSound, comboSound, gameoverSound,
    incorrectSound, correctSound, ticktockSound
} from '../../../utils/Sounds'

/**Imagenes */
import sumSrc from '../../../assets/images/layouts/suma_card.svg'
import resSrc from '../../../assets/images/layouts/resta_card.svg'
import mulSrc from '../../../assets/images/layouts/mult_card.svg'
import divSrc from '../../../assets/images/layouts/div_card.svg'
import rushIcon from '../../../assets/images/icons/rush_icon_white.svg'
import ok_icon from '../../../assets/images/icons/ok_icon.svg'
import x_icon from '../../../assets/images/icons/x_icon.svg'
import question_icon from '../../../assets/images/icons/question_icon.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    main: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        background: "linear-gradient(90deg, #00487C, #2A8EFF)",
        color: "#FFF",
        overflow: "auto",
        position: "bottom",
        height: "100vh"
    },
    content: {
        marginTop: theme.spacing(2),
        overflow: "auto",
        position: "top",
        height: "90vh"
    },
    topicCard: {
        width: "43%",
        margin: theme.spacing(1),
        marginBottom: theme.spacing(1.2)
    },
    selectedTopicCard: {
        width: "50%",
        margin: theme.spacing(1),
        marginBottom: theme.spacing(1.2)
    },
    stats: {
        color: "#F4F10F"
    },
    excercise: {
        color: "#00487C"
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: "100%",
        padding: theme.spacing(2),
        border: 0
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    button: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        textAlign: "center",
        width: "300px",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#FFF',
    },
    streakSeconds: {
        backgroundColor: '#FFF'
    },
    userAnswer: {
        fontSize: '25px'
    },
    resultIcon: {
        width: '10%',
        marginLeft: theme.spacing(2)
    },
}))

function Rush() {
    const classes = useStyles()
    //Estilos
    const [backdropOpen, setBackdropOpen] = React.useState(false)
    const [resultsOpen, setResultsOpen] = useState(false)
    const [isErrorInput, setisErrorInput] = useState(false)
    const [srcResult, setSrcResult] = useState(question_icon)
    const [topicCard, setTopicCard] = useState({
        suma: classes.selectedTopicCard,
        resta: classes.topicCard,
        mult: classes.topicCard,
        div: classes.topicCard
    })

    const [seconds, setSeconds] = useState(60)
    const [minutes] = useState(1)
    const [isActiveTimer, setIsActiveTimer] = useState(false)
    const [regressiveCount, setRegressiveCount] = useState(3)
    const [isActiveRegressive, setIsActiveRegressive] = useState(false)
    const [topic, setTopic] = useState('SUMA')
    const [level, setLevel] = useState(1)
    const [streak, setStreak] = useState(0)
    const [streakSeconds, setStreakSeconds] = useState(5)
    const [isActiveStreak, setIsActiveStreak] = useState(false)
    const [excerciseCount, setExcerciseCount] = useState(0)
    const [points, setPoints] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [excersice, setExcersice] = useState('Ejercicio')
    const [userAnswer, setUserAnswer] = useState(0)
    const [answer, setAnswer] = useState(0)

    useEffect(() => {
        //Carga de sonidos
        rushTheme.load()
        comboSound.load()
        boomSound.load()
        startSound.load()
        gameoverSound.load()
        correctSound.load()
        incorrectSound.load()
        ticktockSound.load()

        startSound.play()
    }, [])

    useEffect(() => {
        if (regressiveCount >= 0 && regressiveCount !== 3) {
            boomSound.play()
        }
    }, [regressiveCount])

    //Generación de ejercicios
    useEffect(() => {
        const { exc, ans } = generateExcercise(topic, level)
        setExcersice(exc)
        setAnswer(Math.floor(ans))

    }, [topic, level])

    const start = () => {
        setBackdropOpen(true)
        setIsActiveRegressive(true)
    }

    //Cuenta regresiva
    useEffect(() => {
        let t = null
        if (isActiveRegressive) {
            t = setInterval(() => {
                setRegressiveCount(regressiveCount - 1)
            }, 600);
        } else if (!isActiveRegressive && regressiveCount !== 0) {
            clearInterval(t)
        }

        //cuando acabe la cuenta regresiva
        if (isActiveRegressive && regressiveCount === 0) {
            setTimeout(() => {
                setIsActiveRegressive(false)
                setBackdropOpen(false)
                setIsActiveTimer(true)
            }, 1000);
        }

        return () => {
            clearInterval(t)
        }
    }, [isActiveRegressive, regressiveCount])

    //Temporizador
    useEffect(() => {
        let t = null
        if (isActiveTimer) {
            t = setInterval(() => {
                setSeconds(seconds - 1)
            }, 1000)
        } else if (!isActiveTimer && seconds !== 0) {
            clearInterval(t)
        }

        //Cuando se acaba el tiempo
        if (isActiveTimer && seconds === 0) {
            setIsActiveTimer(false)
            setResultsOpen(true)
            rushTheme.volume(0.3)
            gameoverSound.play()
        }

        return () => {
            clearInterval(t)
        }
    }, [isActiveTimer, seconds])

    //temporizador del streak
    useEffect(() => {
        let t = null
        if (isActiveStreak) {
            t = setInterval(() => {
                setStreakSeconds(streakSeconds - 1)
            }, 1000)
        } else if (!isActiveStreak && streakSeconds !== 0) {
            clearInterval(t)
        }
        //cuando se acaba el tiempo (cuando el jugador no contesta en 4 segs)
        if (isActiveStreak && streakSeconds === 0) {
            setIsActiveStreak(false)
            setStreak(0)
        }

        return () => {
            clearInterval(t)
        }
    }, [isActiveStreak, streakSeconds])

    //Si quedan menos de 10 segundos, suena el tick tock
    useEffect(() => {
        if (seconds === 9) {
            ticktockSound.play()
        } else if (seconds >= 10) {
            ticktockSound.stop()
        } else if (seconds === 0) {
            ticktockSound.stop()
        }
    }, [seconds])

    //Verificación de la respuesta
    const checkAnswer = (e) => {
        e.preventDefault()

        //Error
        if (userAnswer !== answer) {
            setisErrorInput(true)
            setSrcResult(x_icon)

            incorrectSound.play()
            if (streakSeconds !== 0) {
                setStreakSeconds(streakSeconds - 1)
            }
        } else {
            //correct
            setSrcResult(ok_icon)
            setisErrorInput(false)
            //resetea la respuesta introducida

            correctSound.play()
            //Aumenta 10 segundos al cronómetro y 5 segundos al streak
            setSeconds(seconds + 10)
            setStreakSeconds(5)
            if (seconds > 50) {
                setSeconds(60)
            }

            //Activa el contador de racha
            setIsActiveStreak(true)
            //volumen del sonido del combo
            if (streak === 60) {
                comboSound.volume(0.3)
                comboSound.play()
            } else {
                if (streak === 80) {
                    comboSound.volume(0.6)
                } else {
                    if (streak === 100) {
                        comboSound.volume(1)
                    }
                }
            }

            //si el streak es 80, lo setea a 100 y aumenta uno al multiplicador
            if (streak >= 80) {
                setStreak(100)
                setMultiplier(multiplier + 1)
                comboSound.play()
            } else {
                //de lo contrario, aumenta 20
                setStreak(streak + 20)
            }

            setExcerciseCount(excerciseCount + 1)
            if (topic !== 'DIVISIÓN') {
                //Si completó un tema
                if (topic === 'SUMA') {
                    setTopic('RESTA')
                    setTopicCard({
                        ...topicCard,
                        ['suma']: classes.topicCard,
                        ['resta']: classes.selectedTopicCard
                    })
                } else {
                    if (topic === 'RESTA') {
                        setTopic('MULTIPLICACIÓN')
                        setTopicCard({
                            ...topicCard,
                            ['resta']: classes.topicCard,
                            ['mult']: classes.selectedTopicCard
                        })
                    } else {
                        if (topic === 'MULTIPLICACIÓN') {
                            setTopic('DIVISIÓN')
                            setTopicCard({
                                ...topicCard,
                                ['mult']: classes.topicCard,
                                ['div']: classes.selectedTopicCard
                            })
                        }
                    }
                }
            } else {
                //Si es división y se completó el nivel
                setTopic('SUMA')
                setTopicCard({
                    ...topicCard,
                    ['div']: classes.topicCard,
                    ['suma']: classes.selectedTopicCard
                })
                setLevel(level + 1)
            }

            setPoints(points + (5 * multiplier))
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setUserAnswer(parseInt(e.target.value))
    }

    return (
        <>
            <RushDialogSlide
                title="Bienvenido al modo Rush"
                description="En este modo de juego deberás de acumular cuantos puntos puedas
                en un minuto; ganarás más puntos si contestas rápido."
                button1="Empezar"
                start={start} />

            <RushResults
                isOpen={resultsOpen}
                title="¡El tiempo se ha acabado!"
                level={level}
                exCount={excerciseCount}
                points={points}
                button1="Aceptar" />

            <Backdrop className={classes.backdrop} open={backdropOpen}>
                <Typography variant="h1">{regressiveCount <= 0 ? '¡A jugar!' : regressiveCount}</Typography>
            </Backdrop>

            <Box className={classes.main}>
                <Box>
                    <Grid container spacing={1} className={classes.content}>
                        {/**Indicador de temas */}
                        <Grid item lg={2}>
                            <Box display="flex" justifyContent="left">
                                <img src={divSrc} alt="suma_card.svg" className={topicCard.div} />
                            </Box>
                            <Box display="flex" justifyContent="left">
                                <img src={mulSrc} alt="suma_card.svg" className={topicCard.mult} />
                            </Box>
                            <Box display="flex" justifyContent="left">
                                <img src={resSrc} alt="suma_card.svg" className={topicCard.resta} />
                            </Box>
                            <Box display="flex" justifyContent="left">
                                <img src={sumSrc} alt="suma_card.svg" className={topicCard.suma} />
                            </Box>
                        </Grid>
                        {/**Estadísticas */}
                        <Grid item lg={4}>
                            <Box mb={5} >
                                <Grid container spacing={2} >
                                    <Grid item>
                                        <img src={rushIcon} alt="rush_icon_white.svg" width="33px" />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h4">Modo Rush</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="h3">Nivel: <span className={classes.stats}>{level}</span> </Typography>
                            </Box>
                            <Box mb={5}>
                                <Typography variant="h5">Ejercicios contestados: <span className={classes.stats}>{excerciseCount}</span></Typography>
                                <Typography variant="h5">Puntos: <span className={classes.stats}>{points}</span> pts</Typography>
                            </Box>

                            <Grid container spacing={5} direction="row" justify="center" alignItems="center">
                                <Grid item lg={2}>
                                    <Box position="relative" display="inline-flex">
                                        <CircularMultiplier value={streak} size={70} />
                                        <Box
                                            top={0}
                                            left={0}
                                            bottom={0}
                                            right={0}
                                            position="absolute"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography variant="h5">×{multiplier}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item lg={10}>
                                    <Typography variant="h5">MULTIPLICADOR</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/**Panel donde se muestran las operaciones */}
                        <Grid item lg={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h3">{topic}</Typography>
                                <Typography>Resuelve el siguiente ejercicio</Typography>
                                <Typography variant="h3"><span className={classes.excercise}>{excersice}</span></Typography>
                                <Typography>Ingrese la respuesta</Typography>
                                <form onChange={handleChange} onSubmit={checkAnswer}>
                                    <Box className={classes.form}>
                                        <Box className={classes.input}>
                                            <TextField type="number" name="userAnswer" label="Respuesta" variant="outlined" error={isErrorInput} fullWidth />
                                            <img src={srcResult} alt='' className={classes.resultIcon} />
                                        </Box>
                                        <Button type="submit" size="large" variant="contained" className={classes.button}>
                                            <Typography variant="h5">Responder</Typography>
                                        </Button>
                                    </Box>
                                </form>
                                <Typography variant="h6">Tiempo: 0{seconds === 60 ? minutes : '0'}:{seconds === 60 ? '00' : seconds === 0 ? '00' : seconds < 10 ? '0' + seconds : seconds}</Typography>
                                <LinearProgress variant="determinate" value={seconds / .60} />

                            </Paper>

                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

function generateExcercise(topic, level) {
    let a = 0, b = 0, c = 0, d = 0, ans = 0, exc = ''

    switch (topic) {
        case 'SUMA':
            if (level <= 5) {
                a = Math.floor(Math.random() * 14) + 2
                b = Math.floor(Math.random() * 10) + 4

                exc = a + ' + ' + b
            } else if (level <= 10) {
                a = Math.floor(Math.random() * 20) + 5
                b = Math.floor(Math.random() * 16) + 7

                exc = a + ' + ' + b
            }
            ans = a + b + c + d

            break;

        case 'RESTA':
            if (level <= 5) {
                a = Math.floor(Math.random() * 10) + 3
                b = Math.floor(Math.random() * 5) + 2

                exc = a + ' - ' + b
            } else if (level <= 10) {
                a = Math.floor(Math.random() * 20) + 10
                b = Math.floor(Math.random() * 15) + 2

                exc = a + ' - ' + b
            }
            ans = a - b - c - d

            break;

        case 'MULTIPLICACIÓN':
            if (level <= 5) {
                a = Math.floor(Math.random() * 10) + 1
                b = Math.floor(Math.random() * 9) + 2

                exc = a + ' × ' + b
                ans = a * b
            }

            break;

        case 'DIVISIÓN':
            if (level <= 5) {
                a = Math.floor(Math.random() * 16) + 8
                b = Math.floor(Math.random() * 9) + 1

                exc = a + ' ÷ ' + b
                ans = a / b
            }
            break;
    }

    return { exc, ans }
}

export default Rush
