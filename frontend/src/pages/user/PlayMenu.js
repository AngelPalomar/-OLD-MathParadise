import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Grid, Paper, Button } from "@material-ui/core"

/**Componentes */
import ArcadePaper from '../../components/gamemode_papers/ArcadePaper'
import ClassicPaper from '../../components/gamemode_papers/ClassicPaper'
import RushPaper from '../../components/gamemode_papers/RushPaper'

/**Colors */
import { MATH_GRADIENTS } from '../../styles/MathColors'

/**Imagenes */
import classicIconWhite from '../../assets/images/icons/classic_icon_white.svg'
import arcadeIconWhite from '../../assets/images/icons/arcade_icon_white.svg'
import rushIconWhite from '../../assets/images/icons/rush_icon_white.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        padding: theme.spacing(2),
    },
    classicPaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().classic
    },
    ArcadePaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().arcade
    },
    RushPaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().rush
    },
    disabled: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().disabled
    }
}))

function PlayMenu() {
    const classes = useStyles()
    const [game, setgame] = useState(<ClassicPaper />)

    useEffect(() => {
        document.title = 'Modos de juego - Math Paradise'
    }, [])

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
                        <Grid item lg={12} md={4} sm={6} xs={6}>
                            <Button style={{ height: '100%' }} onClick={() => changeGame('classic')} className={classes.classicPaper} size="large" variant="contained" fullWidth>
                                <Grid container spacing={2}>
                                    <Grid item lg={2} md={12} sm={12} xs={12}>
                                        <img style={{ width: 30, height: 30 }} src={classicIconWhite} alt="classic.svg"></img>
                                    </Grid>
                                    <Grid item lg={10} md={12} sm={12} xs={12}>
                                        <Typography variant="h5">Modo Clásico</Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>
                        <Grid item lg={12} md={4} sm={6} xs={6}>
                            <Button style={{ height: '100%' }} onClick={() => changeGame('arcade')} className={classes.ArcadePaper} size="large" variant="contained" fullWidth>
                                <Grid container spacing={2}>
                                    <Grid item lg={2} md={12} sm={12} xs={12}>
                                        <img style={{ width: 30, height: 30 }} src={arcadeIconWhite} alt="classic.svg" width="80%"></img>
                                    </Grid>
                                    <Grid item lg={10} md={12} sm={12} xs={12}>
                                        <Typography variant="h5">Modo Arcade</Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>
                        <Grid item lg={12} md={4} sm={6} xs={6}>
                            <Button style={{ height: '100%' }} onClick={() => changeGame('rush')} className={classes.RushPaper} size="large" variant="contained" fullWidth>
                                <Grid container spacing={2}>
                                    <Grid item lg={2} md={12} sm={12} xs={12}>
                                        <img style={{ width: 30, height: 30 }} src={rushIconWhite} alt="classic.svg" width="80%"></img>
                                    </Grid>
                                    <Grid item lg={10} md={12} sm={12} xs={12}>
                                        <Typography variant="h5">Modo Rush</Typography>
                                    </Grid>
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

export default PlayMenu
