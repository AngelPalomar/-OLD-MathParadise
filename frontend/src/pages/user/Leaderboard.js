import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { Paper, Typography, Grid, Box } from '@material-ui/core'
import { MATH_COLORS, MATH_GRADIENTS } from '../../styles/MathColors'

/**Componentes */
import DefaultAvatar from '../../components/DefaultAvatar'

/**APIs */
import { getRushLeaderboardApi } from '../../api/user'

/**Imagenes */
//import classicIconWhite from '../../assets/images/icons/classic_icon_white.svg'
//import arcadeIconWhite from '../../assets/images/icons/arcade_icon_white.svg'
import rushIconWhite from '../../assets/images/icons/rush_icon_white.svg'
import leaderIcon from '../../assets/images/icons/leaderboard_icon.svg'
import GoldIcon from '../../assets/images/icons/1st_icon.svg'
import SilverIcon from '../../assets/images/icons/2nd_icon.svg'
import BronzeIcon from '../../assets/images/icons/3rd_icon.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        color: MATH_COLORS().math_disabled_label,
        marginBottom: theme.spacing(3),
        textAlign: 'center'
    },
    rush_board: {
        background: MATH_GRADIENTS().rush,
        padding: theme.spacing(2),
        color: '#FFF'
    },
    header_board: {
        display: 'block',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        alignContent: 'center'
    },
    icon: {
        width: '30px'
    },
    leader_icon: {
        width: '60px'
    },
    userPaperInfo: {
        padding: theme.spacing(1.5),
        marginBottom: theme.spacing(1)
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    medal: {
        width: '50px'
    },
    link: {
        textDecoration: 'none',
        color: MATH_COLORS().math_rush_base,
        '&:hover': {
            textDecoration: 'none',
            color: MATH_COLORS().math_rush_base,
        }
    },
    label: {
        color: MATH_COLORS().math_disabled_label
    },
    points: {
        color: MATH_COLORS().math_success
    }
}))

export default function Leaderboard() {
    const classes = useStyles()

    //Titulo del documento
    useEffect(() => {
        document.title = 'Clasificaciones - Math Paradise'
    }, [])

    const [rushTable, setRushTable] = useState([])

    useEffect(() => {
        getRushLeaderboardApi().then(response => {
            if (response.status === 1) {
                setRushTable(response.rush_board)
            }
        })
    }, [])

    return (
        <Paper className={classes.root}>
            <Box className={classes.header_board}>
                <img src={leaderIcon} className={classes.leader_icon} alt="rush_icon.svg" />
                <Typography variant="h4" className={classes.title}>Clasificación global</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item lg={4} md={6} sm={12} xs={12}>

                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <Paper className={classes.rush_board}>
                        <Box className={classes.header_board}>
                            <img src={rushIconWhite} className={classes.icon} alt="rush_icon.svg" />
                            <Typography variant="h6">Modo Rush</Typography>
                            <Typography varint="subtitle1">Top 10</Typography>
                        </Box>

                        <Box mt={2}>
                            {
                                rushTable.map((values, index) =>
                                    <Paper key={index} className={classes.userPaperInfo}>
                                        <Grid container spacing={2}>
                                            <Grid item lg={2} md={2} sm={2} xs={2} className={classes.avatar}>
                                                <DefaultAvatar nickname={values.nickname} large="sm" />
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
                <Grid item lg={4} md={6} sm={12} xs={12}>

                </Grid>
            </Grid>
        </Paper>
    )
}

