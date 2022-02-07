import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useStyles } from './useStyles'
import {
    Typography, Box, Grid, Paper, Button, InputLabel, FormControl,
    MenuItem, Select, TextField, CircularProgress, Backdrop, LinearProgress
} from "@material-ui/core"

/**API */
import { getAccessTokenApi } from '../../api/auth'
import { getAreasApi } from '../../api/areas'
import { getGameByPinApi, joinGameApi } from '../../api/game'

/**Iconos */
//import BookmarkIcon from '@material-ui/icons/Bookmark'
import HelpIcon from '@material-ui/icons/Help'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

/**Imagenes */
import classicIconWhite from '../../assets/images/icons/classic_icon_white.svg'

/**Components */
import DefaultSnackbar from '../snackbars/DefaultSnackbar'
import HowtoPlayClassicMode from '../game_information_slides/HowtoPlayClassicMode'

function ClassicPaper() {
    const classes = useStyles()

    const [areas, setAreas] = useState([])
    const [inputs, setInputs] = useState({
        host: jwtDecode(getAccessTokenApi()).nickname,
        gamemode: "classic",
        difficulty: "normal",
        area: "Álgebra",
        rounds: 1,
        board: "default"
    })
    const [pin, setPin] = useState("")
    //Datos para visuales
    const [message, setMessage] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [blockJoinbutton, setblockJoinbutton] = useState(false)
    const [openHowTo, setOpenHowTo] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    //Datos de partida buscada
    const [gameJoined, setGameJoined] = useState([])

    //Función para traer las materias
    useEffect(() => {
        getAreasApi().then(response => {
            if (response.status === 1) {
                setAreas(response.areas)
                setIsLoading(false)
            }
        })
    }, [])

    //Función que guarda los datos
    const handleInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    //Función que guarda el pin
    const handlePin = (e) => {
        setPin(e.target.value)
    }

    //Función para buscar la partida
    const joinGameAndFind = () => {
        if (pin.trim() !== "") {
            //Saco el modo de juego
            let pinMode = pin.charAt(0)
            if (pinMode !== 'C') {
                setOpenSnackbar(true)
                setMessage("Esta pin no corresponde a este modo de juego.\nIntenta en otro")
            } else {
                getGameByPinApi(pin).then(response => {
                    //Si no se encuentra la partida
                    if (response.status === 0) {
                        //Mensaje de la respuesta
                        setOpenSnackbar(true)
                        setMessage(response.message)
                    } else {
                        if (response.game.status !== "in_lobby" || response.game.player2 !== "") {
                            setOpenSnackbar(true)
                            setMessage("Esta partida está en juego o fue finalizada.")
                        } else {
                            //Abre el backdrop
                            setblockJoinbutton(true)

                            //Guarda la partida buscada
                            setGameJoined(response.game)

                            //Actualiza el jugador 2
                            joinPlayer()
                        }
                    }
                })
            }
        }
    }

    //Función para actualizar el jugador 2
    /**
     * Función para verificar si el backdrop está activo y busca la partida en busca
     * de que se cambie de estado de "in_lobby" a "in_game", si cambia, redirige al tablero
     * con el pin
     * */
    const joinPlayer = () => {
        joinGameApi(
            { player2: jwtDecode(getAccessTokenApi()).nickname },
            pin).then(response => {
                setOpenBackdrop(true)
                //Si se activa el backdrop
                setInterval(() => {
                    getGameByPinApi(pin).then(response => {
                        if (response.status === 1 && response.game.status === "in_game") {
                            window.location.href = "/classic/" + pin
                        }
                    })
                }, 2000);
            })
    }

    return (
        <Fragment>
            <HowtoPlayClassicMode isOpen={openHowTo} handleOnClose={() => setOpenHowTo(false)} />
            <Backdrop className={classes.backdrop} open={openBackdrop} >
                <Typography variant="h4" style={{ textAlign: 'center' }}>
                    Esperando a que se inicie la partida
                </Typography>
                <Typography variant='h5' gutterBottom>Anfitrión: {gameJoined.host}</Typography>
                <CircularProgress className={classes.circularJoin} />
            </Backdrop>
            <DefaultSnackbar
                open={openSnackbar}
                message={message}
                handleClose={() => setOpenSnackbar(false)}
            />
            <Paper className={classes.classicPaper} color="primary" elevation={2}>
                <Grid container spacing={2}>
                    <Grid item lg={1} md={1} sm={2} xs={2}>
                        <img src={classicIconWhite} alt="classic.svg"></img>
                    </Grid>
                    <Grid item lg={11} md={11} sm={10} xs={10}>
                        <Typography variant="h4">Modo Clásico</Typography>
                    </Grid>
                </Grid>
                <br />
                <Typography>
                    Compite contra un amigo en este tablero y consigue
                    muchos puntos respondiendo todos los ejercicios matemáticos que puedas.
                </Typography>
                <br />
                <form onChange={handleInputs}>
                    <Grid container spacing={2}>
                        <Grid item lg={7} md={6} sm={12} xs={12}>
                            <Paper className={classes.paperConfig} elevation={0}>
                                <Typography variant="h6">Configuración de la partida</Typography>
                                <Grid container spacing={2} className={classes.grid}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        {
                                            isLoading ? <LinearProgress variant='indeterminate' /> :
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel id="materia">Materia</InputLabel>
                                                    <Select
                                                        name="area"
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={inputs.area}
                                                        onChange={handleInputs}
                                                        label="Materia"
                                                        className={classes.select}>

                                                        {areas.map((values, index) => (
                                                            values.active ?
                                                                <MenuItem key={index} value={values.name}>{values.name}</MenuItem> : null
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                        }
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <FormControl variant="outlined" fullWidth color="primary">
                                            <InputLabel id="dificultad">Dificultad</InputLabel>
                                            <Select
                                                name="difficulty"
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={inputs.difficulty}
                                                onChange={handleInputs}
                                                label="Dificultad"
                                                className={classes.select}>

                                                {/* <MenuItem value={"easy"}>Fácil</MenuItem> */}
                                                <MenuItem value={"normal"}>Normal</MenuItem>
                                                {/* <MenuItem value={"hard"}>Difícil</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="materia">Vueltas al tablero</InputLabel>
                                            <Select
                                                name="rounds"
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={inputs.rounds}
                                                onChange={handleInputs}
                                                label="Vueltas al tablero"
                                                className={classes.select}>

                                                <MenuItem value={1}>1 vuelta</MenuItem>
                                                <MenuItem value={3}>3 vueltas</MenuItem>
                                                <MenuItem value={5}>5 vueltas</MenuItem>
                                                <MenuItem value={7}>7 vueltas</MenuItem>
                                                <MenuItem value={10}>10 vueltas</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <FormControl variant="outlined" fullWidth color="primary">
                                            <InputLabel id="dificultad">Tablero</InputLabel>
                                            <Select
                                                name="board"
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={inputs.board}
                                                onChange={handleInputs}
                                                label="Tablero"
                                                className={classes.select}>

                                                <MenuItem value={"default"} title="Tablero generado aleatoriamente.">Por defecto</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Typography variant="h6">Información</Typography>
                                <Grid container spacing={2} className={classes.grid}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Button
                                            className={classes.classicInfo}
                                            variant="contained"
                                            startIcon={<HelpIcon />}
                                            fullWidth
                                            onClick={() => setOpenHowTo(true)}>
                                            ¿Cómo jugar?
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Paper>
                        </Grid>
                        <Grid item lg={5} md={6} sm={12} xs={12}>
                            <Paper className={classes.paperConfig} elevation={0}>
                                <Typography>Presione JUGAR para crear la partida</Typography>
                                {
                                    isLoading ?
                                        <LinearProgress variant='indeterminated' color='primary' /> :
                                        <Box className={classes.box}>
                                            <Link to={{
                                                pathname: '/lobby',
                                                gameProps: inputs
                                            }} className={classes.link}>
                                                <Button startIcon={<PlayArrowIcon />} className={classes.playButton} size="large" variant="contained" fullWidth>
                                                    Jugar
                                                </Button>
                                            </Link>
                                        </Box>
                                }
                            </Paper>
                            <Paper className={classes.paperConfig} elevation={0}>
                                <Typography className={classes.title}>Unirse a partida</Typography>
                                <TextField
                                    type="text"
                                    name="pin"
                                    variant="outlined"
                                    label="Ingrese PIN"
                                    onChange={handlePin}
                                    className={classes.pinInput} />

                                <Box className={classes.box}>
                                    <Button
                                        className={classes.joinButton}
                                        variant="contained"
                                        disabled={blockJoinbutton}
                                        onClick={joinGameAndFind}
                                        fullWidth>
                                        {
                                            !blockJoinbutton ? "Unirse" : <CircularProgress className={classes.circularJoin} />
                                        }
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Fragment>
    )
}

export default ClassicPaper