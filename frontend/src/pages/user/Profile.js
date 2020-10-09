import React, { useState, useEffect } from 'react'
import moduleName from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography, Paper, Grid, Box, CircularProgress, Button
} from '@material-ui/core'

/**Iconos */
import EditIcon from '@material-ui/icons/Edit';

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

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    paperStats: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        height: '100%'
    },
    paperProfile: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    },
    boxInfo: {
        marginTop: theme.spacing(2)
    },
    nicknameLabel: {
        color: '#5F5F5F'
    },
    editProfileBtn: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(2)
    },
    title: {
        marginBottom: theme.spacing(2)
    }
}))

function Profile(props) {
    const classes = useStyles();
    const { match: { params: { nickname } } } = props

    const [userData, setUserData] = useState(null)
    const [isFound, setIsFound] = useState(true)

    useEffect(() => {
        const fetchGetUserByNickname = async () => {
            const result = await getUserByNicknameApi(nickname)

            if (!result.message) {
                const { user } = result
                setUserData(user)
            } else {
                if (result.message == "No se ha encontrado a ningun usuario.") {
                    setIsFound(false)
                }
            }

        }

        fetchGetUserByNickname()
    }, [])

    if (!isFound && !userData) {
        return (
            <Error404 />
        )
    } else {
        return (
            <>
                {!getAccessTokenApi() ? <PublicHeader /> : null}
                <Grid container spacing={0} className={!getAccessTokenApi() ? classes.root : null}>
                    <Grid item lg={4} md={3} sm={12} xs={12}>
                        <Paper className={classes.paperProfile}>
                            <Box>
                                {userData ? <DefaultAvatar nickname={userData.nickname} /> : <CircularProgress color="primary" />}
                            </Box>
                            <Box className={classes.boxInfo}>
                                <Typography variant="h5">
                                    {userData ? userData.name + " " + userData.lastname : <CircularProgress color="primary" />}
                                </Typography>
                                <Typography className={classes.nicknameLabel}>
                                    {userData ? userData.nickname : <CircularProgress color="primary" />}
                                </Typography>
                                {getAccessTokenApi() && userData ?
                                    JwtDecode(getAccessTokenApi()).nickname === userData.nickname ?
                                        <Box className={classes.editProfileBtn}>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                startIcon={<EditIcon />}>
                                                Editar Perfil
                                        </Button>
                                        </Box> : null : null}
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={8} md={9} sm={12} xs={12}>
                        <Paper className={classes.paperStats}>
                            <Typography variant="h5" className={classes.title}>Estadísticas de juego</Typography>
                            <Grid container spacing={1}>
                                <Grid item lg={6} md={6}>
                                    <ClassicStats nickname={nickname} />
                                </Grid>
                                <Grid item lg={6} md={6}>
                                    <ArcadeStats nickname={nickname} />
                                </Grid>
                                <Grid item lg={6} md={6}>
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
