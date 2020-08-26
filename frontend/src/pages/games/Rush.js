import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import {
    Typography,
    Box,
    Grid,
    Paper,
    TextField,
    Button,
    LinearProgress 
} from "@material-ui/core"

/**Imagenes */
import sumSrc from '../../assets/images/layouts/suma_card.svg'
import resSrc from '../../assets/images/layouts/resta_card.svg'
import mulSrc from '../../assets/images/layouts/mult_card.svg'
import divSrc from '../../assets/images/layouts/div_card.svg'
import rushIcon from '../../assets/images/icons/rush_icon_white.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    main: {
        padding: theme.spacing(2),
        background: "linear-gradient(90deg, #00487C, #2A8EFF)",
        color: "#FFF",
        overflow: "auto",
        position: "bottom",
        height: "100vh"
    },
    content: {
        marginTop: theme.spacing(2)
    },
    topicCard: {
        width: "90px",
        margin: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1.2
    },
    paper: {
        padding: theme.spacing(2),
        border: 0
    },
    button: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        textAlign: "center",
        width: "300px"
    },
}))

function Rush() {
    const classes = useStyles()

    return (
        <Box className={classes.main}>
            <Box>
                <Grid container spacing={1} className={classes.content}>
                    {/**Indicador de temas */}
                    <Grid item lg={2}>
                        <Box display="flex" justifyContent="center">
                            <img src={divSrc} alt="suma_card.svg" className={classes.topicCard} />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <img src={mulSrc} alt="suma_card.svg" className={classes.topicCard} />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <img src={resSrc} alt="suma_card.svg" className={classes.topicCard} />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <img src={sumSrc} alt="suma_card.svg" className={classes.topicCard} />
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
                            <Typography variant="h3">Nivel: <span>1</span></Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">Ejercicios contestados: <span>0</span></Typography>
                            <Typography variant="h5">Puntos: <span>0 pts</span></Typography>
                        </Box>
                    </Grid>
                    {/**Mutiplicador */}
                    {/**Panel donde se muestran las operaciones */}
                    <Grid item lg={6}>
                        <Paper className={classes.paper} fullwidth>
                            <Box mb={5}>
                                <Typography variant="h3">TEMA</Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography>Resuelve el siguiente ejercicio</Typography>
                            </Box>
                            <Box mb={14}>
                                <Typography variant="h4">Ejercicio + Ejercicio</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>Ingrese la respuesta</Typography>
                            </Box>
                            <Box mb={6} display="flex" justifyContent="center" className={classes.field}>
                                <TextField name="respuesta" label="Respuesta" variant="outlined" size="medium" />
                            </Box>
                            <Box mb={4} display="flex" justifyContent="center">
                                <Button size="large" variant="contained" className={classes.button}>
                                    <Typography variant="h5">Responder</Typography>
                                </Button>
                            </Box>
                            <Box>
                                <Typography>Tiempo: 00:00</Typography>
                                <LinearProgress variant="determinate" value={100}/>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Rush
