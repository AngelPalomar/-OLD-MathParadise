import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography, Paper, Grid, Box, CircularProgress, Button
} from '@material-ui/core'

/**Iconos */
import EditIcon from '@material-ui/icons/Edit';
import AvTimerIcon from '@material-ui/icons/AvTimer'; //admin
import PolicyIcon from '@material-ui/icons/Policy'; //mod
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'; //tutor
import SchoolIcon from '@material-ui/icons/School'; //student

/**Componentes */
import Error404 from '../Error404'
import PublicHeader from "../../components/PublicHeader"
import DefaultAvatar from "../../components/DefaultAvatar"
import ArcadeStats from '../../components/game_stats/ArcadeStats'
import ClassicStats from '../../components/game_stats/ClassicStats'
import RushStats from '../../components/game_stats/RushStats'

/**APIs */
import { getAccessTokenApi } from "../../api/auth"
import { getUserByNicknameApi } from "../../api/user"
import JwtDecode from 'jwt-decode';
import ProfileForm from '../../components/forms/ProfileForm';

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
        marginTop: theme.spacing(2)
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
    }
}))

function Profile(props) {
    const classes = useStyles();
    const { match: { params: { nickname } } } = props

    const [userData, setUserData] = useState(null)
    const [isFound, setIsFound] = useState(true)
    const [openProfileForm, setOpenProflieForm] = useState(false)

    useEffect(() => {
        document.title = nickname + ' - Math Paradise'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchGetUserByNickname = async () => {
            const result = await getUserByNicknameApi(nickname)

            if (!result.message) {
                const { user } = result
                setUserData(user)
            } else {
                if (result.message === "No se ha encontrado a ningun usuario.") {
                    setIsFound(false)
                }
            }

        }

        fetchGetUserByNickname()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Mostrar rol de usuario
    const renderRole = (key) => {
        switch (key) {
            case 'admin':
                return (
                    <span className={classes.alignIconRole}>
                        <AvTimerIcon />&nbsp;Administrador
                    </span>
                )

            case 'moderator':
                return (
                    <span className={classes.alignIconRole}>
                        <PolicyIcon />&nbsp;Moderador
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

    const handleCloseProfileForm = (params) => {
        setOpenProflieForm(false)
    }

    if (!isFound && !userData) {
        return (
            <Error404 />
        )
    } else {
        return (
            <>
                {!getAccessTokenApi() ? <PublicHeader /> : null}
                <Grid container spacing={2} className={!getAccessTokenApi() ? classes.root : null}>
                    <Grid item lg={4} md={3} sm={12} xs={12}>
                        <Paper className={classes.paperProfile}>
                            <Box>
                                {userData ? <DefaultAvatar nickname={userData.nickname} /> : <CircularProgress color="primary" />}
                            </Box>
                            <Box className={classes.boxInfo}>
                                <Typography variant="h5" className={classes.fullnameLabel}>
                                    {userData ? userData.name + " " + userData.lastname : <CircularProgress color="primary" />}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.nicknameLabel}>
                                    @{userData ? userData.nickname : <CircularProgress color="primary" />}
                                </Typography>
                                {
                                    getAccessTokenApi() && userData ?
                                        <Typography className={classes.role}>{renderRole(userData.role)}</Typography>
                                        : null
                                }
                                {
                                    getAccessTokenApi() && userData ?
                                        JwtDecode(getAccessTokenApi()).nickname === userData.nickname ?
                                            <>
                                                <ProfileForm userData={userData} open={openProfileForm} close={handleCloseProfileForm} />
                                                <Box className={classes.editProfileBtn}>
                                                    <Button
                                                        onClick={() => { setOpenProflieForm(true) }}
                                                        variant="contained"
                                                        color="default"
                                                        startIcon={<EditIcon />}>
                                                        Editar Perfil
                                                </Button>
                                                </Box> </> : null : null
                                }
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={8} md={9} sm={12} xs={12}>
                        <Paper className={classes.paperStats}>
                            <Typography variant="h5" className={classes.title}>Estadísticas de juego</Typography>
                            <Grid container spacing={1}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <ClassicStats nickname={nickname} />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <ArcadeStats nickname={nickname} />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <RushStats nickname={nickname} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default Profile
