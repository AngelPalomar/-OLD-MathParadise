import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography, Paper, Grid, Box, Button, LinearProgress
} from '@material-ui/core'

/**Iconos */
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings'; //mod
import PolicyIcon from '@material-ui/icons/Policy'; //admin
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'; //tutor
import SchoolIcon from '@material-ui/icons/School'; //student

/**Componentes */
import Error404 from '../Error404'
import PublicHeader from "../../components/PublicHeader"
import DefaultAvatar from "../../components/DefaultAvatar"
import GameStats from '../../components/game_stats/GameStats'

/**APIs */
import { getAccessTokenApi } from "../../api/auth"
import { getUserByNicknameApi } from "../../api/user"
import JwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '100%'
    },
    paperStats: {
        padding: theme.spacing(2),
        height: '100%'
    },
    paperProfile: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(2),
    },
    boxInfo: {
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    fullnameLabel: {
        textAlign: 'center'
    },
    nicknameLabel: {
        color: '#5F5F5F',
        textAlign: 'center'
    },
    editProfileBtn: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(2)
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    role: {
        display: 'flex',
        justifyContent: 'center',
        color: '#3A3D3A',
        margin: theme.spacing(1)
    },
    alignIconRole: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        background: theme.palette.primary.main,
        color: '#FFF',
        '&:hover': {
            background: theme.palette.primary.dark,
        }
    },
}))

function Profile(props) {
    const classes = useStyles();
    const { match: { params: { nickname } } } = props

    const [userData, setUserData] = useState(null)
    const [isFound, setIsFound] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        document.title = nickname + ' - Math Paradise'

        getUserByNicknameApi(nickname).then(response => {
            if (!response.message) {
                const { user } = response
                setUserData(user)
                setIsLoading(false)
            } else {
                if (response.message === "No se ha encontrado a ningun usuario.") {
                    setIsFound(false)
                    setIsLoading(false)
                }
            }
        })
    }, [nickname])

    //Mostrar rol de usuario
    const renderRole = (key) => {
        switch (key) {
            case 'admin':
                return (
                    <span className={classes.alignIconRole}>
                        <PolicyIcon />&nbsp;Administrador
                    </span>
                )

            case 'moderator':
                return (
                    <span className={classes.alignIconRole}>
                        <SettingsIcon />&nbsp;Moderador
                    </span>
                )

            case 'tutor':
                return (
                    <span className={classes.alignIconRole}>
                        <AssignmentIndIcon />&nbsp;Tutor
                    </span>
                )

            case 'student':
                return (
                    <span className={classes.alignIconRole}>
                        <SchoolIcon />&nbsp;Estudiante
                    </span>
                )

            default:
                return 'Tipo de usuario'
        }
    }

    if (isLoading) {
        return <LinearProgress variant='indeterminate' />
    }

    if (!isFound && !userData) {
        return (
            <Error404 />
        )
    }

    return (
        <Fragment>
            {!getAccessTokenApi() ? <PublicHeader /> : null}
            <Grid container spacing={2} className={!getAccessTokenApi() ? classes.root : null}>
                <Grid item lg={4} md={3} sm={12} xs={12}>
                    <Paper className={classes.paperProfile}>
                        <Box>
                            <DefaultAvatar nickname={userData.nickname} size="120px" fs="8vh" />
                        </Box>
                        <Box className={classes.boxInfo}>
                            <Typography variant="h5" className={classes.fullnameLabel}>
                                {userData.name + " " + userData.lastname}
                            </Typography>
                            <Typography variant="subtitle1" className={classes.nicknameLabel}>
                                @{userData.nickname}
                            </Typography>
                            {
                                getAccessTokenApi() ?
                                    <Typography className={classes.role}>{renderRole(userData.role)}</Typography>
                                    : null
                            }
                            {
                                getAccessTokenApi() ?
                                    <Typography className={classes.role}>{userData.institution}</Typography>
                                    : null
                            }
                            {
                                getAccessTokenApi() ?
                                    JwtDecode(getAccessTokenApi()).nickname === userData.nickname ?
                                        <Box className={classes.editProfileBtn}>
                                            <Link to='/home/settings'>
                                                <Button
                                                    variant="contained"
                                                    className={classes.button}
                                                    startIcon={<EditIcon />}>
                                                    Editar Perfil
                                                </Button>
                                            </Link>
                                        </Box> : null : null
                            }
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={8} md={9} sm={12} xs={12}>
                    <Paper className={classes.paperStats}>
                        <Typography variant="h5" className={classes.title}>Puntuaciones</Typography>
                        <Grid container spacing={1}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <GameStats gamemode='classic' summary stats={userData.classic} />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <GameStats gamemode='arcade' summary stats={userData.arcade} />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <GameStats gamemode='rush' summary stats={userData.rush} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Profile
