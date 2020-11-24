import React, { useState } from 'react'
import { useStyles } from './useStyles'
import {
    Typography, Box, Grid, Paper, Button, InputLabel, FormControl,
    MenuItem, Select
} from "@material-ui/core"

/**Iconos */
import BookmarkIcon from '@material-ui/icons/Bookmark'
import HelpIcon from '@material-ui/icons/Help'

/**Imagenes */
import classicIconWhite from '../../assets/images/icons/classic_icon_white.svg'
import playIconWhite from '../../assets/images/icons/play2_icon_white.svg'

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
                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                <Button className={classes.classicInfo} variant="contained" startIcon={<HelpIcon />} fullWidth>¿Cómo jugar?</Button>
                            </Grid>
                            <Grid item lg={6} md={12} sm={12} xs={12}>
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

export default ClassicPaper