import React, { useState, useEffect, Fragment } from 'react'
import { Howler } from 'howler'
import jwtDecode from "jwt-decode"
import {
    Typography, Box, Grid, Paper, TextField, Button, LinearProgress, Backdrop, Grow,
    Slide, Hidden
} from "@material-ui/core"
import { useStyles } from "./RushStyles"
import theme from '../../../styles/MathThemes'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReplayIcon from '@material-ui/icons/Replay'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'

/**APIs */
import { getAccessTokenApi } from "../../../api/auth"
import { getUserApi, updateUserApi } from "../../../api/user"

/**Componentes */
import RushDialogSlide from './RushDialogSlide'
import CircularMultiplier from '../../../components/game_items/CircularMultiplier'
import RushResults from './RushResults'

//Musica y sonidos
import { rushTheme } from '../../../utils/Music'
import {
    startSound, boomSound, comboSound, gameoverSound,
    incorrectSound, correctSound, ticktockSound
} from '../../../utils/Sounds'

/**Imagenes */
import sumSrc from '../../../assets/images/layouts/rush/suma_card.svg'
import resSrc from '../../../assets/images/layouts/rush/resta_card.svg'
import mulSrc from '../../../assets/images/layouts/rush/mult_card.svg'
import divSrc from '../../../assets/images/layouts/rush/div_card.svg'
import rushIcon from '../../../assets/images/icons/rush_icon_white.svg'
import ok_icon from '../../../assets/images/icons/ok_icon.svg'
import x_icon from '../../../assets/images/icons/x_icon.svg'
import question_icon from '../../../assets/images/icons/question_icon.svg'

function Rush(props) {
    if (!getAccessTokenApi()) {
        window.location.href = '/login'
    }

    const classes = useStyles()

    //Datos usuario
    const [userData] = useState(jwtDecode(getAccessTokenApi()))
    const [prevStats, setPrevStats] = useState(null)
    const [history, setHistory] = useState({})
    const [isNewRecordPoints, setisNewRecordPoints] = useState(false)
    const [isNewRecordLevel, setisNewRecordLevel] = useState(false)
    const [isNewRecordMultiplier, setisNewRecordMultiplier] = useState(false)
    const [isNewRecordExcercises, setisNewRecordExcercises] = useState(false)

    //Estilos
    const [backdropOpen, setBackdropOpen] = React.useState(false)
    const [resultsOpen, setResultsOpen] = useState(false)
    const [pauseOpen, setpauseOpen] = useState(false)
    const [isErrorInput, setisErrorInput] = useState(false)
    const [srcResult, setSrcResult] = useState(question_icon)
    const [zoomPoints, setZoomPoints] = useState(false)
    const [plusZoomMultiplier, setZoomPlusMultiplier] = useState(false)
    const [comboSlide, setComboSlide] = useState(false)
    const [topicCard, setTopicCard] = useState({
        suma: classes.selectedTopicCard,
        resta: classes.topicCard,
        mult: classes.topicCard,
        div: classes.topicCard
    })

    //Elementos del juego
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
    const [combo, setCombo] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [excersice, setExcersice] = useState('Ejercicio')
    const [userAnswer, setUserAnswer] = useState(0)
    const [answer, setAnswer] = useState(0)

    //Carga de sonidos y título del documento
    useEffect(() => {
        rushTheme.load()
        comboSound.load()
        boomSound.load()
        startSound.load()
        gameoverSound.load()
        correctSound.load()
        incorrectSound.load()
        ticktockSound.load()

        rushTheme.play()
        rushTheme.rate(1)
        startSound.play()

        document.title = 'Modo Rush - Math Paradise'
    }, [])

    //Sonido de cuenta regresiva
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

    //Empieza partida
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
            }, 400);
        } else if (!isActiveRegressive && regressiveCount !== 0) {
            clearInterval(t)
        }

        //cuando acabe la cuenta regresiva
        if (isActiveRegressive && regressiveCount === 0) {
            setTimeout(() => {
                setIsActiveRegressive(false)
                setBackdropOpen(false)
                setIsActiveTimer(true)
            }, 600);
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

            //Obtener estadísticas previas del usuario
            getUserApi(getAccessTokenApi(), userData.id).then(response => {
                setPrevStats(response.user.rush)
            })

            let gameHistory = {
                nickname: userData.nickname,
                enemy_nickname: '',
                gamemode: 'rush',
                area: 'Aritmética',
                difficulty: 'normal',
                points: points,
                enemy_points: 0,
                result: 'none',
                excercises: excerciseCount,
                correct_excercises: 0,
                wrong_excercises: 0,
                multiplier: multiplier,
                level: level,
                rounds: 0
            }

            //Guarda el registro de la partida
            setHistory(gameHistory)
        }

        return () => {
            clearInterval(t)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActiveTimer, seconds, userData.id, prevStats, excerciseCount, level, multiplier, points])

    //Comparar estadísticas cuando acabe el juego
    useEffect(() => {
        if (prevStats) {
            const compareStats = () => {
                let p, e, l, m

                if (points > prevStats.points) {
                    p = points
                    setisNewRecordPoints(true)
                } else {
                    p = prevStats.points
                }

                if (excerciseCount > prevStats.excercises) {
                    e = excerciseCount
                    setisNewRecordExcercises(true)
                } else {
                    e = prevStats.excercises
                }

                if (level > prevStats.level) {
                    l = level
                    setisNewRecordLevel(true)
                } else {
                    l = prevStats.level
                }

                if (multiplier > prevStats.multiplier) {
                    m = multiplier
                    setisNewRecordMultiplier(true)
                } else {
                    m = prevStats.multiplier
                }

                const rushData = {
                    rush: {
                        points: p,
                        excercises: e,
                        level: l,
                        multiplier: m
                    }
                }

                updateUserApi(getAccessTokenApi(), rushData, userData.id)
            }

            compareStats()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevStats])

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
            setZoomPlusMultiplier(false)
            setStreak(0)

            setComboSlide(false)
            setTimeout(() => {
                setCombo(0)
            }, 2000);
        }

        return () => {
            clearInterval(t)
        }
    }, [isActiveStreak, streakSeconds, combo, comboSlide])

    //Si quedan menos de 10 segundos, suena el tick tock
    useEffect(() => {
        if (seconds === 9) {
            ticktockSound.pause()
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
            //mostrar puntos
            handleZoomPoints()

            setTimeout(() => {
                handleZoomPoints()
            }, 2000);

            //correct
            setSrcResult(ok_icon)
            setisErrorInput(false)

            //resetea la respuesta introducida
            resetForm()

            correctSound.play()
            //Aumenta 5 segundos al cronómetro y 5 segundos al streak
            setSeconds(seconds + 5)
            setStreakSeconds(5)
            if (seconds > 50) {
                setSeconds(60)
            }

            //Activa el contador de racha
            setIsActiveStreak(true)
            //volumen del sonido del combo
            if (streak === 60) {
                comboSound.rate(0.8)
                comboSound.play()
            } else {
                if (streak === 80) {
                    comboSound.rate(0.9)
                } else {
                    if (streak === 100) {
                        comboSound.rate(1.05)
                    }
                }
            }

            //si el streak es 80, lo setea a 100 y aumenta uno al multiplicador
            if (streak >= 80) {
                setStreak(100)
                setMultiplier(multiplier + 1)
                setZoomPlusMultiplier(true)
                setTimeout(() => {
                    setZoomPlusMultiplier(false)
                }, 1000)

                //Combo
                setCombo(combo + 1)
                setComboSlide(true)

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
                        suma: classes.topicCard,
                        resta: classes.selectedTopicCard
                    })
                } else {
                    if (topic === 'RESTA') {
                        setTopic('MULTIPLICACIÓN')
                        setTopicCard({
                            ...topicCard,
                            resta: classes.topicCard,
                            mult: classes.selectedTopicCard
                        })
                    } else {
                        if (topic === 'MULTIPLICACIÓN') {
                            setTopic('DIVISIÓN')
                            setTopicCard({
                                ...topicCard,
                                mult: classes.topicCard,
                                div: classes.selectedTopicCard
                            })
                        }
                    }
                }
            } else {
                //Si es división y se completó el nivel
                setTopic('SUMA')
                setTopicCard({
                    ...topicCard,
                    div: classes.topicCard,
                    suma: classes.selectedTopicCard
                })
                setLevel(level + 1)
            }

            setPoints(points + (5 * multiplier))
        }
    }

    //Velocidad del tema principal
    useEffect(() => {
        if (level <= 10) {
            rushTheme.rate(1)
        } else {
            if (level <= 20) {
                rushTheme.rate(1.05)
            } else {
                if (level <= 30) {
                    rushTheme.rate(1.1)
                } else {
                    rushTheme.rate(1.2)
                }
            }
        }
    }, [level])

    //Bajar volumen en pause
    useEffect(() => {
        if (pauseOpen === true) {
            rushTheme.volume(0.4)
        } else {
            rushTheme.volume(1)
        }
    }, [pauseOpen])

    //Zoom de los puntos
    const handleZoomPoints = () => {
        setZoomPoints((prev) => !prev)
    }

    //Para pausar la partida
    const pause = () => {
        setpauseOpen(!pauseOpen)
        setIsActiveTimer(!isActiveTimer)
    }

    //Reiniciar la partida
    const restart = () => {
        window.location.reload()
    }

    //Volver al menu
    const backToHome = () => {
        Howler.stop()
        window.location.href = '/home/play'
    }

    //Cambio del formulario
    const handleChange = (e) => {
        e.preventDefault()
        setUserAnswer(parseInt(e.target.value))
    }

    //Limpiar formulario
    const resetForm = (params) => {
        document.getElementById("answer-form").reset()
    }

    return (
        <Fragment>
            <RushDialogSlide
                title="Bienvenido al modo Rush"
                button1="Empezar"
                start={start} >
                En este modo de juego deberás de acumular cuantos puntos puedas
                en un minuto; ganarás más puntos si contestas rápido.
            </RushDialogSlide>

            <RushResults
                isOpen={resultsOpen}
                title="¡El tiempo se ha acabado!"
                level={level}
                exCount={excerciseCount}
                points={points}
                multiplier={multiplier}
                button1="Aceptar"
                user={userData}
                isNewRecordPoints={isNewRecordPoints}
                isNewRecordExcercises={isNewRecordExcercises}
                isNewRecordLevel={isNewRecordLevel}
                isNewRecordMultiplier={isNewRecordMultiplier}
                history={history} />

            <Backdrop className={classes.backdrop} open={pauseOpen}>
                <Paper className={classes.paperPause}>
                    <Box className={classes.menuPause}>
                        <Typography variant="h2" className={classes.excercise}>Menú principal</Typography>
                        <Typography>Opciones</Typography>
                        <Box className={classes.menuPauseOptions}>
                            <Button onClick={backToHome} className={classes.buttonBack}>
                                <ArrowBackIcon style={{ fontSize: 50 }} />
                            </Button>
                            <Button onClick={pause} className={classes.buttonResume} >
                                <PlayArrowIcon style={{ fontSize: 50 }} />
                            </Button>
                            <Button onClick={restart} className={classes.buttonRestart}>
                                <ReplayIcon style={{ fontSize: 50 }} />
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Backdrop>

            <Backdrop className={classes.backdrop} open={backdropOpen}>
                <Typography variant="h1">{regressiveCount <= 0 ? '¡A jugar!' : regressiveCount}</Typography>
            </Backdrop>

            <Box className={classes.main}>
                <Box>
                    <Grid container spacing={1} className={classes.content}>
                        {/**Indicador de temas */}
                        <Hidden mdDown>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <Box className={classes.topicCardContainer}>
                                    <img src={divSrc} alt="suma_card.svg" className={topicCard.div} />
                                    <img src={mulSrc} alt="suma_card.svg" className={topicCard.mult} />
                                    <img src={resSrc} alt="suma_card.svg" className={topicCard.resta} />
                                    <img src={sumSrc} alt="suma_card.svg" className={topicCard.suma} />
                                </Box>
                            </Grid>
                        </Hidden>
                        {/**Estadísticas */}
                        <Hidden smDown>
                            <Grid item xl={4} lg={4} md={6} sm={6}>
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
                                    <Typography variant="h5">
                                        Puntos: <span className={classes.stats}>{points}</span> pts
                                        <Grow in={zoomPoints} timeout={800}>
                                            <span className={classes.pointPlus}> + {5 * multiplier} puntos!</span>
                                        </Grow>
                                    </Typography>
                                </Box>
                                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                                    <Grid item lg={2} md={3} sm={4}>

                                        <Box position="relative" display="inline-flex">
                                            <CircularMultiplier value={streak} size={65} />
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
                                                <Typography variant="h5">&times;{multiplier}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={10} md={9} sm={8}>
                                        <Typography variant="h5" className={streakSeconds <= 3 ? streakSeconds % 2 !== 0 ? classes.stats : null : null}>
                                            Multiplicador
                                            <Grow in={plusZoomMultiplier} timeout={800}>
                                                <span className={classes.pointPlus}> + 1 </span>
                                            </Grow>
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box mt={4}>
                                    <Button variant="contained" onClick={pause} className={classes.buttonPause} startIcon={<PauseIcon />}>
                                        Pausa
                                    </Button>
                                </Box>

                                <Box mt={3} className={classes.comboBox}>
                                    <Slide direction="up" in={comboSlide} mountOnEnter unmountOnExit>
                                        <Typography variant="h3" className={classes.comboPlus}>Combo &times;{combo}</Typography>
                                    </Slide>
                                </Box>
                            </Grid>
                        </Hidden>

                        {/**Panel donde se muestran las operaciones */}
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Paper className={classes.paper}>
                                <Typography className={classes.titleAndExcerciseSize}>{topic}</Typography>
                                <Typography>Resuelve el siguiente ejercicio</Typography>
                                <Typography className={classes.titleAndExcerciseSize}><span className={classes.excercise}>{excersice}</span></Typography>
                                <Typography>Ingrese la respuesta</Typography>
                                <form id="answer-form" onChange={handleChange} onSubmit={checkAnswer}>
                                    <Box className={classes.form}>
                                        <Box className={classes.input}>
                                            <TextField name="userAnswer" label="Respuesta" variant="outlined" error={isErrorInput} fullWidth />
                                            <img src={srcResult} alt='' className={classes.resultIcon} />
                                        </Box>
                                        <Button type="submit" size="large" variant="contained" className={classes.button}>
                                            <Typography variant="h5">Responder</Typography>
                                        </Button>
                                    </Box>
                                </form>
                                {/**Estadísticas en breakpoint MD hacia arriba */}
                                <Hidden mdUp>
                                    <Grid container>
                                        <Grid item md={3} sm={3} xs={6}>
                                            <Typography className={classes.statsMedium}>Nivel: <span className={classes.statsMediumLabels}>{level}</span></Typography>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={6}>
                                            <Typography className={classes.statsMedium}>Ejercicios: <span className={classes.statsMediumLabels}>{excerciseCount}</span> </Typography>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={6}>
                                            <Typography className={classes.statsMedium}>
                                                Puntos: <span className={classes.statsMediumLabels}>{points}</span>
                                                <Grow in={zoomPoints} timeout={800}>
                                                    <span className={classes.segsPlus}> + {5 * multiplier}</span>
                                                </Grow>
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={6}>
                                            <Typography className={classes.statsMedium}>
                                                Multiplicador: <span className={classes.statsMediumLabels}>&times;{multiplier}</span>
                                                <Grow in={plusZoomMultiplier} timeout={800}>
                                                    <span className={classes.segsPlus}> + 1 </span>
                                                </Grow>
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <Typography className={classes.statsMedium}>Combo: <span className={classes.statsComboMediumLabels}>&times;{combo}</span></Typography>
                                        </Grid>
                                    </Grid>
                                </Hidden>
                                <Box>
                                    <Typography variant="h6" style={{ color: seconds <= 9 ? theme.palette.error.main : theme.palette.text.primary }} >
                                        Tiempo: 0{seconds === 60 ? minutes : '0'}:{seconds === 60 ? '00' : seconds === 0 ? '00' : seconds < 10 ? '0' + seconds : seconds}
                                        <Grow in={zoomPoints} timeout={800}>
                                            <span className={classes.segsPlus}> + 5 segundos</span>
                                        </Grow>
                                    </Typography>
                                    <LinearProgress variant="determinate" value={seconds / .60} />
                                </Box>
                                <Hidden mdUp>
                                    <Button variant="contained" onClick={pause} className={classes.buttonPause} startIcon={<PauseIcon />}>
                                        Pausa
                                    </Button>
                                </Hidden>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Fragment>
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
            } else if (level <= 15) {
                a = Math.floor(Math.random() * 10) + 2
                b = Math.floor(Math.random() * 15) + 1
                c = Math.floor(Math.random() * 19) + 11

                exc = a + ' + ' + b + ' + ' + c
            } else if (level <= 20) {
                a = Math.floor(Math.random() * 30) + 12
                b = Math.floor(Math.random() * 40) + 14
                c = Math.floor(Math.random() * 32) + 9

                exc = a + ' + ' + b + ' + ' + c
            } else if (level <= 25) {
                a = Math.floor(Math.random() * 132) + 101
                b = Math.floor(Math.random() * 117) + 53
                c = Math.floor(Math.random() * 101) + 83

                exc = a + ' + ' + b + ' + ' + c
            } else if (level <= 30) {
                a = Math.floor(Math.random() * 132) + 101
                b = Math.floor(Math.random() * 117) + 53
                c = Math.floor(Math.random() * 101) + 83
                d = Math.floor(Math.random() * 172) + 120

                exc = a + ' + ' + b + ' + ' + c + ' + ' + d
            } else if (level <= 40) {
                a = Math.floor(Math.random() * 1100) + 300
                b = Math.floor(Math.random() * 900) + 200
                c = Math.floor(Math.random() * 1200) + 400
                d = Math.floor(Math.random() * 400) + 200

                exc = a + ' + ' + b + ' + ' + c + ' + ' + d
            } else {
                a = Math.floor(Math.random() * 5000) + 1000
                b = Math.floor(Math.random() * 2000) + 800
                c = Math.floor(Math.random() * 1300) + 700
                d = Math.floor(Math.random() * 1000) + 500

                exc = a + ' + ' + b + ' + ' + c + ' + ' + d
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
            } else if (level <= 15) {
                a = Math.floor(Math.random() * 35) + 10
                b = Math.floor(Math.random() * 15) + 5

                exc = a + ' - ' + b
            } else if (level <= 20) {
                a = Math.floor(Math.random() * 25) + 15
                b = Math.floor(Math.random() * 35) + 14
                c = Math.floor(Math.random() * 32) + 9

                exc = a + ' - ' + b + ' - ' + c
            } else if (level <= 25) {
                a = Math.floor(Math.random() * 95) + 50
                b = Math.floor(Math.random() * 40) + 20
                c = Math.floor(Math.random() * 30) + 14

                exc = a + ' - ' + b + ' - ' + c
            } else if (level <= 30) {
                a = Math.floor(Math.random() * 95) + 50
                b = Math.floor(Math.random() * 40) + 20
                c = Math.floor(Math.random() * 30) + 14
                c = Math.floor(Math.random() * 20) + 10

                exc = a + ' - ' + b + ' - ' + c + ' - ' + d
            } else if (level <= 40) {
                a = Math.floor(Math.random() * 500) + 200
                b = Math.floor(Math.random() * 100) + 30
                c = Math.floor(Math.random() * 60) + 20
                c = Math.floor(Math.random() * 30) + 10

                exc = a + ' - ' + b + ' - ' + c + ' - ' + d
            } else {
                a = Math.floor(Math.random() * 1000) + 600
                b = Math.floor(Math.random() * 200) + 30
                c = Math.floor(Math.random() * 100) + 20
                c = Math.floor(Math.random() * 50) + 10

                exc = a + ' - ' + b + ' - ' + c + ' - ' + d
            }

            ans = a - b - c - d

            break;

        case 'MULTIPLICACIÓN':
            if (level <= 5) {
                a = Math.floor(Math.random() * 10) + 1
                b = Math.floor(Math.random() * 9) + 2

                exc = a + ' × ' + b
                ans = a * b
            } else if (level <= 10) {
                a = Math.floor(Math.random() * 12) + 3
                b = Math.floor(Math.random() * 9) + 4

                exc = a + ' × ' + b
                ans = a * b
            } else if (level <= 15) {
                a = Math.floor(Math.random() * 13) + 6
                b = Math.floor(Math.random() * 9) + 2

                exc = a + ' × ' + b
                ans = a * b
            } else if (level <= 20) {
                a = Math.floor(Math.random() * 16) + 8
                b = Math.floor(Math.random() * 15) + 4

                exc = a + ' × ' + b
                ans = a * b
            } else if (level <= 25) {
                a = Math.floor(Math.random() * 10) + 2
                b = Math.floor(Math.random() * 12) + 2
                c = Math.floor(Math.random() * 9) + 3

                exc = a + ' × ' + b + ' × ' + c
                ans = a * b * c
            } else if (level <= 30) {
                a = Math.floor(Math.random() * 14) + 6
                b = Math.floor(Math.random() * 10) + 2
                c = Math.floor(Math.random() * 12) + 5

                exc = a + ' × ' + b + ' × ' + c
                ans = a * b * c
            } else if (level <= 40) {
                a = Math.floor(Math.random() * 22) + 15
                b = Math.floor(Math.random() * 15) + 6
                c = Math.floor(Math.random() * 12) + 5

                exc = a + ' × ' + b + ' × ' + c
                ans = a * b * c
            } else {
                a = Math.floor(Math.random() * 60) + 30
                b = Math.floor(Math.random() * 32) + 15
                c = Math.floor(Math.random() * 56) + 40

                exc = a + ' × ' + b + ' × ' + c
                ans = a * b * c
            }

            break;

        case 'DIVISIÓN':
            if (level <= 5) {
                a = Math.floor(Math.random() * 16) + 8
                b = Math.floor(Math.random() * 9) + 1
            } else if (level <= 10) {
                a = Math.floor(Math.random() * 24) + 8
                b = Math.floor(Math.random() * 9) + 4
            } else if (level <= 15) {
                a = Math.floor(Math.random() * 40) + 9
                b = Math.floor(Math.random() * 16) + 4
            } else if (level <= 20) {
                a = Math.floor(Math.random() * 55) + 40
                b = Math.floor(Math.random() * 20) + 4
            } else if (level <= 25) {
                a = Math.floor(Math.random() * 100) + 60
                b = Math.floor(Math.random() * 40) + 20
            } else if (level <= 30) {
                a = Math.floor(Math.random() * 168) + 101
                b = Math.floor(Math.random() * 44) + 20
            } else if (level <= 40) {
                a = Math.floor(Math.random() * 220) + 170
                b = Math.floor(Math.random() * 60) + 24
            } else {
                a = Math.floor(Math.random() * 300) + 226
                b = Math.floor(Math.random() * 80) + 56
            }

            if (a > b) {
                exc = a + ' ÷ ' + b
                ans = a / b
            } else {
                exc = b + ' ÷ ' + a
                ans = b / a
            }
            break;
        default:
            exc = null
            ans = null
            break;
    }

    return { exc, ans }
}

export default Rush
