import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Box,
    Grid,
    Paper,
    Button,
    InputLabel,
    FormControl,
    MenuItem,
    Select
} from "@material-ui/core"

import BookmarkIcon from '@material-ui/icons/Bookmark'
import HelpIcon from '@material-ui/icons/Help'

/**Imagenes */
import classicIconWhite from '../assets/classic_icon_white.svg'
import arcadeIconWhite from '../assets/arcade_icon_white.svg'
import rushIconWhite from '../assets/rush_icon_white.svg'
import playIconWhite from '../assets/play2_icon_white.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        padding: theme.spacing(2),
    },
    paperConfig: {
        padding: theme.spacing(2),
        background: "rgb(255, 255, 255)",
    },
    classicPaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #388659, #98CE00)"
    },
    classicInfo: {
        background: "linear-gradient(#2a9134, #2a9134)",
        color: "#FFFFFF"
    },
    ArcadePaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #6A041D, #FF006E)"
    },
    arcadeInfo: {
        background: "linear-gradient(#C80057, #C80057)",
        color: "#FFFFFF"
    },
    RushPaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #00487C, #2A8EFF)"
    },
    rushInfo: {
        background: "linear-gradient(#0063D3, #0063D3)",
        color: "#FFFFFF"
    },
    select: {
        backgroundColor: "#FFFFFF",
    },
    grid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    box: {
        marginTop: theme.spacing(2),
    },
    playButton: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)"
    }
}))

function GameSelector() {
    const [game, setgame] = useState(<ClassicPaper />)
    const classes = useStyles()

    const changeGame = (game) => {
        switch (game) {
            case 'classic':
                setgame(<ClassicPaper />)
                break;
            case 'arcade':
                setgame(<ArcadePaper />)
                break;
            case 'rush':
                setgame(<RushPaper />)
                break;
            default:
                setgame(<ClassicPaper />)
                break;
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item lg={4} md={12}>
                <Paper className={classes.paper} elevation={2}>
                    <Typography variant="h5">Seleccione un modo de juego</Typography>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={6} xs={6}>
                            <Button onClick={() => changeGame('classic')} className={classes.classicPaper} size="large" variant="contained" fullWidth>
                                <Grid item lg={1} md={1} sm={2} xs={2}>
                                    <img src={classicIconWhite} alt="classic.svg"></img>
                                </Grid>
                                <Grid item lg={11} md={11} sm={10} xs={10}>
                                    <Typography variant="h5">Modo Clásico</Typography>
                                </Grid>
                            </Button>
                        </Grid>
                        <Grid item lg={12} md={12} sm={6} xs={6}>
                            <Button onClick={() => changeGame('arcade')} className={classes.ArcadePaper} size="large" variant="contained" fullWidth>
                                <Grid item lg={1} md={1} sm={2} xs={2}>
                                    <img src={arcadeIconWhite} alt="classic.svg"></img>
                                </Grid>
                                <Grid item lg={11} md={11} sm={10} xs={10}>
                                    <Typography variant="h5">Modo Arcade</Typography>
                                </Grid>
                            </Button>
                        </Grid>
                        <Grid item lg={12} md={12} sm={6} xs={6}>
                            <Button onClick={() => changeGame('rush')} className={classes.RushPaper} size="large" variant="contained" fullWidth>
                                <Grid item lg={1} md={1} sm={2} xs={2}>
                                    <img src={rushIconWhite} alt="classic.svg" width="80%"></img>
                                </Grid>
                                <Grid item lg={11} md={11} sm={10} xs={10}>
                                    <Typography variant="h5">Modo Rush</Typography>
                                </Grid>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item lg={8} md={12}>
                {game}
            </Grid>
        </Grid>
    )
}

function ClassicPaper() {
    const classes = useStyles()

    const [materia, setmateria] = React.useState("algebra")
    const [dificultad, setDificultad] = useState("normal")
    const [tiempo, setTiempo] = useState(7)
    const [modo, setModo] = useState("multijugador")

    const handleChangeMateria = (event) => {
        setmateria(event.target.value)
    }
    const handleChangeDificultad = (event) => {
        setDificultad(event.target.value)
    }
    const handleChangeTiempo = (event) => {
        setTiempo(event.target.value)
    }
    const handleChangeModo = (event) => {
        setModo(event.target.value)
    }

    return (
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
            <Grid container spacing={2}>
                <Grid item lg={7} md={6} sm={12} xs={12}>
                    <Paper className={classes.paperConfig} elevation={0}>
                        <Typography variant="h6">Configuración de la partida</Typography>
                        <Grid container spacing={2} className={classes.grid}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="materia">Materia</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={materia}
                                        onChange={handleChangeMateria}
                                        label="Materia"
                                        className={classes.select}>

                                        <MenuItem value={"algebra"}>Álgebra</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" fullWidth color="primary">
                                    <InputLabel id="dificultad">Dificultad</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={dificultad}
                                        onChange={handleChangeDificultad}
                                        label="Dificultad"
                                        className={classes.select}>

                                        <MenuItem value={"facil"}>Fácil</MenuItem>
                                        <MenuItem value={"normal"}>Normal</MenuItem>
                                        <MenuItem value={"dificil"}>Difícil</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="materia">Tiempo de partida</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={tiempo}
                                        onChange={handleChangeTiempo}
                                        label="Tiempo de partida"
                                        className={classes.select}>

                                        <MenuItem value={5}>5:00 minutos</MenuItem>
                                        <MenuItem value={7}>7:00 minutos</MenuItem>
                                        <MenuItem value={10}>10:00 minutos</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" fullWidth color="primary">
                                    <InputLabel id="dificultad">Modo de juego</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={modo}
                                        onChange={handleChangeModo}
                                        label="Modo de juego"
                                        className={classes.select}>

                                        <MenuItem value={"multijugador"}>Multijugador</MenuItem>
                                        <MenuItem value={"un_jugador"}>Un jugador</MenuItem>
                                        <MenuItem value={"multijugador_local"}>Multijugador local</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">Información</Typography>
                        <Grid container spacing={2} className={classes.grid}>
                            <Grid item lg={6} md={12} sm={12}>
                                <Button className={classes.classicInfo} variant="contained" startIcon={<HelpIcon />} fullWidth>¿Cómo jugar?</Button>
                            </Grid>
                            <Grid item lg={6} md={12} sm={12}>
                                <Button className={classes.classicInfo} variant="contained" startIcon={<BookmarkIcon />} fullWidth>Competencias</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item lg={5} md={6} sm={12} xs={12}>
                    <Paper className={classes.paperConfig} elevation={0}>
                        <Typography>Presione JUGAR para empezar la partida</Typography>
                        <Box className={classes.box}>
                            <Button className={classes.playButton} size="large" variant="contained" fullWidth>
                                <Grid item lg={1} md={1} sm={2} xs={2}>
                                    <img src={playIconWhite} alt="classic.svg"></img>
                                </Grid>
                                <Grid item lg={11} md={11} sm={10} xs={10}>
                                    <Typography variant="h5">Jugar</Typography>
                                </Grid>
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}

function ArcadePaper() {
    const classes = useStyles()

    const [materia, setmateria] = React.useState("algebra")
    const [dificultad, setDificultad] = useState("normal")
    const [tiempo, setTiempo] = useState(7)
    const [modo, setModo] = useState("multijugador")

    const handleChangeMateria = (event) => {
        setmateria(event.target.value)
    }
    const handleChangeDificultad = (event) => {
        setDificultad(event.target.value)
    }
    const handleChangeTiempo = (event) => {
        setTiempo(event.target.value)
    }
    const handleChangeModo = (event) => {
        setModo(event.target.value)
    }

    return (
        <Paper className={classes.ArcadePaper} color="primary" elevation={2}>
            <Grid container spacing={2}>
                <Grid item lg={1} md={1} sm={2} xs={2}>
                    <img src={arcadeIconWhite} alt="classic.svg"></img>
                </Grid>
                <Grid item lg={11} md={11} sm={10} xs={10}>
                    <Typography variant="h4">Modo Arcade</Typography>
                </Grid>
            </Grid>
            <br />
            <Typography>
                Pon a prueba tu suerte desafiando a un compañero y envuélvete en este divertido
                modo de juego estilo "Arcade".
            </Typography>
            <br />
            <Grid container spacing={2}>
                <Grid item lg={7} md={6} sm={12} xs={12}>
                    <Paper className={classes.paperConfig} elevation={0}>
                        <Typography variant="h6">Configuración de la partida</Typography>
                        <Grid container spacing={2} className={classes.grid}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="materia">Materia</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={materia}
                                        onChange={handleChangeMateria}
                                        label="Materia"
                                        className={classes.select}>

                                        <MenuItem value={"algebra"}>Álgebra</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" fullWidth color="primary">
                                    <InputLabel id="dificultad">Dificultad</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={dificultad}
                                        onChange={handleChangeDificultad}
                                        label="Dificultad"
                                        className={classes.select}>

                                        <MenuItem value={"facil"}>Fácil</MenuItem>
                                        <MenuItem value={"normal"}>Normal</MenuItem>
                                        <MenuItem value={"dificil"}>Difícil</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="materia">Tiempo de partida</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={tiempo}
                                        onChange={handleChangeTiempo}
                                        label="Tiempo de partida"
                                        className={classes.select}>

                                        <MenuItem value={5}>5:00 minutos</MenuItem>
                                        <MenuItem value={7}>7:00 minutos</MenuItem>
                                        <MenuItem value={10}>10:00 minutos</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl variant="outlined" fullWidth color="primary">
                                    <InputLabel id="dificultad">Modo de juego</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={modo}
                                        onChange={handleChangeModo}
                                        label="Modo de juego"
                                        className={classes.select}>

                                        <MenuItem value={"multijugador"}>Multijugador</MenuItem>
                                        <MenuItem value={"un_jugador"}>Un jugador</MenuItem>
                                        <MenuItem value={"multijugador_local"}>Multijugador local</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">Información</Typography>
                        <Grid container spacing={2} className={classes.grid}>
                            <Grid item lg={6} md={12} sm={12}>
                                <Button className={classes.arcadeInfo} variant="contained" startIcon={<HelpIcon />} fullWidth>¿Cómo jugar?</Button>
                            </Grid>
                            <Grid item lg={6} md={12} sm={12}>
                                <Button className={classes.arcadeInfo} variant="contained" startIcon={<BookmarkIcon />} fullWidth>Competencias</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item lg={5} md={6} sm={12} xs={12}>
                    <Paper className={classes.paperConfig} elevation={0}>
                        <Typography>Presione JUGAR para empezar la partida</Typography>
                        <Box className={classes.box}>
                            <Button className={classes.playButton} size="large" variant="contained" fullWidth>
                                <Grid item lg={1} md={1} sm={2} xs={2}>
                                    <img src={playIconWhite} alt="classic.svg"></img>
                                </Grid>
                                <Grid item lg={11} md={11} sm={10} xs={10}>
                                    <Typography variant="h5">Jugar</Typography>
                                </Grid>
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}

function RushPaper() {
    const classes = useStyles()

    const [materia, setmateria] = React.useState("algebra")
    const [dificultad, setDificultad] = useState("normal")
    const [tiempo, setTiempo] = useState(7)
    const [modo, setModo] = useState("multijugador")

    const handleChangeMateria = (event) => {
        setmateria(event.target.value)
    }
    const handleChangeDificultad = (event) => {
        setDificultad(event.target.value)
    }
    const handleChangeTiempo = (event) => {
        setTiempo(event.target.value)
    }
    const handleChangeModo = (event) => {
        setModo(event.target.value)
    }

    return (
        <Paper className={classes.RushPaper} color="primary" elevation={2}>
            <Grid container spacing={2}>
                <Grid item lg={1} md={1} sm={2} xs={2}>
                    <img src={rushIconWhite} alt="classic.svg" width="70%"></img>
                </Grid>
                <Grid item lg={11} md={11} sm={10} xs={10}>
                    <Typography variant="h4">Modo Rush</Typography>
                </Grid>
            </Grid>
            <br />
            <Typography>
                Resuelve cuantos ejercicios aritméticos puedas a contrareloj por cada nivel.
                ¿Serás capaz de romper tu record?
            </Typography>
            <br />
            <Grid container spacing={2}>
                <Grid item lg={7} md={6} sm={12} xs={12}>
                    <Paper className={classes.paperConfig} elevation={0}>
                        <Typography variant="h6">Configuración de la partida</Typography>
                        <br />
                        <Typography>El modo Rush no tiene configuración personalizada</Typography>
                        <br />
                        <Typography variant="h6">Información</Typography>
                        <Grid container spacing={2} className={classes.grid}>
                            <Grid item lg={6} md={12} sm={12}>
                                <Button className={classes.rushInfo} variant="contained" startIcon={<HelpIcon />} fullWidth>¿Cómo jugar?</Button>
                            </Grid>
                            <Grid item lg={6} md={12} sm={12}>
                                <Button className={classes.rushInfo} variant="contained" startIcon={<BookmarkIcon />} fullWidth>Competencias</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item lg={5} md={6} sm={12} xs={12}>
                    <Paper className={classes.paperConfig} elevation={0}>
                        <Typography>Presione JUGAR para empezar la partida</Typography>
                        <Box className={classes.box}>
                            <Button className={classes.playButton} size="large" variant="contained" fullWidth>
                                <Grid item lg={1} md={1} sm={2} xs={2}>
                                    <img src={playIconWhite} alt="classic.svg"></img>
                                </Grid>
                                <Grid item lg={11} md={11} sm={10} xs={10}>
                                    <Typography variant="h5">Jugar</Typography>
                                </Grid>
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default GameSelector
