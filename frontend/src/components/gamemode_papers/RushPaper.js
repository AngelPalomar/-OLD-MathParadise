import React, { useState, Fragment } from 'react'
import { Link } from "react-router-dom"
import { useStyles } from './useStyles'
import { Typography, Box, Grid, Paper, Button } from "@material-ui/core"

/**Componentes */
import HowtoPlayRushMode from '../game_information_slides/HowtoPlayRushMode'
import CompetenciesRushMode from '../game_information_slides/CompetenciesRushMode'

/**Iconos */
import BookmarkIcon from '@material-ui/icons/Bookmark'
import HelpIcon from '@material-ui/icons/Help'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

/**Imagenes */
import rushIconWhite from '../../assets/images/icons/rush_icon_white.svg'

function RushPaper() {
    const classes = useStyles()
    const [openHowTo, setOpenHowTo] = useState(false)
    const [openCompetencies, setOpenCompetencies] = useState(false)

    const handleCloseHowTo = () => {
        setOpenHowTo(false)
    }

    const handleCloseCompetencies = () => {
        setOpenCompetencies(false)
    }

    return (
        <Fragment>
            <HowtoPlayRushMode isOpen={openHowTo} handleOnClose={handleCloseHowTo} />
            <CompetenciesRushMode isOpen={openCompetencies} handleOnClose={handleCloseCompetencies} />
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
                    Resuelve cuantos ejercicios aritméticos puedas a contrarreloj por cada nivel.
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
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <Button
                                        onClick={() => { setOpenHowTo(true) }}
                                        className={classes.rushInfo}
                                        variant="contained"
                                        startIcon={<HelpIcon />}>
                                        ¿Cómo jugar?
                                    </Button>
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <Button
                                        onClick={() => { setOpenCompetencies(true) }}
                                        className={classes.rushInfo}
                                        variant="contained"
                                        startIcon={<BookmarkIcon />}>
                                        Competencias
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item lg={5} md={6} sm={12} xs={12}>
                        <Paper className={classes.paperConfig} elevation={0}>
                            <Typography>Presione JUGAR para empezar la partida</Typography>
                            <Box className={classes.box}>
                                <Link to="/rush" className={classes.link}>
                                    <Button startIcon={<PlayArrowIcon />} className={classes.playButton} size="large" variant="contained" fullWidth>
                                        Jugar
                                    </Button>
                                </Link>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Fragment>
    )
}

export default RushPaper