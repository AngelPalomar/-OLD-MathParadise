import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { Paper, Typography, Grid, Box } from '@material-ui/core'
import { useStyles } from './useStyles'

/**Componentes */
import DefaultAvatar from '../../../components/common/DefaultAvatar'

/**APIs */
import { getRushLeaderboardApi, getClassicLeaderboardApi, getArcadeLeaderboardApi } from '../../../api/user'

/**Imagenes */
import classicIconWhite from '../../../assets/images/icons/classic_icon_white.svg'
import arcadeIconWhite from '../../../assets/images/icons/arcade_icon_white.svg'
import rushIconWhite from '../../../assets/images/icons/rush_icon_white.svg'
import leaderIcon from '../../../assets/images/icons/leaderboard_icon.svg'
import GoldIcon from '../../../assets/images/icons/1st_icon.svg'
import SilverIcon from '../../../assets/images/icons/2nd_icon.svg'
import BronzeIcon from '../../../assets/images/icons/3rd_icon.svg'

function Leaderboard() {
    const classes = useStyles()

    //Titulo del documento
    useEffect(() => {
        document.title = 'Clasificaciones - Math Paradise'

        getClassicLeaderboardApi().then(response => {
            if (response.status === 1) {
                setclassicTable(response.classic_board)
            }
        })

        getArcadeLeaderboardApi().then(response => {
            if (response.status === 1) {
                setArcadeTable(response.arcade_board)
                setIsLoading(false)
            }
        })

        getRushLeaderboardApi().then(response => {
            if (response.status === 1) {
                setRushTable(response.rush_board)
                setIsLoading(false)
            }
        })

        return () => {
            setRushTable([])
            setclassicTable([])
            setArcadeTable([])
        }
    }, [])

    //Variables para almacenar las respuestas
    const [rushTable, setRushTable] = useState([])
    const [classicTable, setclassicTable] = useState([])
    const [arcadeTable, setArcadeTable] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    if (isLoading) {
        return <LinearProgress variant='indeterminate' />
    }

    return (
        <Paper className={classes.root}>
            <Box className={classes.header_board}>
                <img src={leaderIcon} className={classes.leader_icon} alt="rush_icon.svg" />
                <Typography variant="h4" gutterBottom className={classes.title} color='primary'>
                    Clasificación global
                </Typography>
                <Typography>
                    Ve el top 10 de jugadores de todos los modos de juego.
                </Typography>
            </Box>
            <Grid container spacing={2} className={classes.grid}>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <Paper className={classes.classic_board}>
                        <Box className={classes.header_board}>
                            <img src={classicIconWhite} className={classes.classic_icon} alt="rush_icon.svg" />
                            <Typography variant="h6">Modo Clásico</Typography>
                            <Typography varint="subtitle1">Top 10</Typography>
                        </Box>

                        <Box mt={2}>
                            {
                                classicTable.map((values, index) =>
                                    <Paper key={index} className={classes.userPaperInfo}>
                                        <Grid container spacing={2}>
                                            <Grid item lg={2} md={2} sm={2} xs={2} className={classes.avatar}>
                                                <DefaultAvatar nickname={values.nickname} size="40px" fs="100%" />
                                            </Grid>
                                            <Grid item lg={7} md={7} sm={7} xs={7} >
                                                <Box>
                                                    <Link className={classes.link} to={"/home/profile/@" + values.nickname}>
                                                        <Typography>{values.nickname}</Typography>
                                                    </Link>
                                                    <Typography variant="subtitle2">Puntos: <span className={classes.points}>{values.classic.points}</span></Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={3} xs={3} className={classes.avatar}>
                                                {
                                                    index < 3 ?
                                                        <img src={
                                                            index === 0 ? GoldIcon : index === 1 ? SilverIcon : index === 2 ? BronzeIcon : null
                                                        } className={classes.medal} alt="medal.svg" /> :
                                                        <Typography>{index + 1}</Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <Paper className={classes.arcade_board}>
                        <Box className={classes.header_board}>
                            <img src={arcadeIconWhite} className={classes.classic_icon} alt="rush_icon.svg" />
                            <Typography variant="h6">Modo Arcade</Typography>
                            <Typography varint="subtitle1">Top 10</Typography>
                        </Box>

                        <Box mt={2}>
                            {
                                arcadeTable.map((values, index) =>
                                    <Paper key={index} className={classes.userPaperInfo}>
                                        <Grid container spacing={2}>
                                            <Grid item lg={2} md={2} sm={2} xs={2} className={classes.avatar}>
                                                <DefaultAvatar nickname={values.nickname} size="40px" fs="100%" />
                                            </Grid>
                                            <Grid item lg={7} md={7} sm={7} xs={7} >
                                                <Box>
                                                    <Link className={classes.link} to={"/home/profile/@" + values.nickname}>
                                                        <Typography>{values.nickname}</Typography>
                                                    </Link>
                                                    <Typography variant="subtitle2">Puntos: <span className={classes.points}>{values.arcade.points}</span></Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={3} xs={3} className={classes.avatar}>
                                                {
                                                    index < 3 ?
                                                        <img src={
                                                            index === 0 ? GoldIcon : index === 1 ? SilverIcon : index === 2 ? BronzeIcon : null
                                                        } className={classes.medal} alt="medal.svg" /> :
                                                        <Typography>{index + 1}</Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <Paper className={classes.rush_board}>
                        <Box className={classes.header_board}>
                            <img src={rushIconWhite} className={classes.rush_icon} alt="rush_icon.svg" />
                            <Typography variant="h6">Modo Rush</Typography>
                            <Typography varint="subtitle1">Top 10</Typography>
                        </Box>

                        <Box mt={2}>
                            {
                                rushTable.map((values, index) =>
                                    <Paper key={index} className={classes.userPaperInfo}>
                                        <Grid container spacing={2}>
                                            <Grid item lg={2} md={2} sm={2} xs={2} className={classes.avatar}>
                                                <DefaultAvatar nickname={values.nickname} size="40px" fs="100%" />
                                            </Grid>
                                            <Grid item lg={7} md={7} sm={7} xs={7} >
                                                <Box>
                                                    <Link className={classes.link} to={"/home/profile/@" + values.nickname}>
                                                        <Typography>{values.nickname}</Typography>
                                                    </Link>
                                                    <Typography variant="subtitle2">Puntos: <span className={classes.points}>{values.rush.points}</span></Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={3} xs={3} className={classes.avatar}>
                                                {
                                                    index < 3 ?
                                                        <img src={
                                                            index === 0 ? GoldIcon : index === 1 ? SilverIcon : index === 2 ? BronzeIcon : null
                                                        } className={classes.medal} alt="medal.svg" /> :
                                                        <Typography>{index + 1}</Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Leaderboard

