import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Paper, Box } from "@material-ui/core"

/**Componentes */
import DefaultAvatar from "../../components/DefaultAvatar"
import ProfileForm from '../../components/ProfileForm'

/**APIs */
import { getAccessTokenApi } from '../../api/auth'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3)
    },
    userBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    userTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: theme.spacing(1)
    },
    userDataBox: {
        marginTop: theme.spacing(2)
    },
    userInfoLabels: {
        fontWeight: 'bold'
    },
    userDataTitle: {
        marginBottom: theme.spacing(2)
    }
}))

function Profile() {
    const classes = useStyles()

    const [userData] = useState(jwtDecode(getAccessTokenApi()))

    useEffect(() => {
        document.title = 'Mi perfil - Math Paradise'
    }, [])

    return (
        <>
            <Paper className={classes.paper}>
                <Box className={classes.userBox}>
                    <DefaultAvatar nickname={userData.nickname} large="xl" />
                    <Box className={classes.userTitle}>
                        <Typography variant="h5">{userData.name + ' ' + userData.lastname}</Typography>
                        <Typography>@{userData.nickname}</Typography>
                    </Box>
                </Box>
                <Box className={classes.userDataBox}>
                    <Typography variant="h5" className={classes.userDataTitle}>Mis datos</Typography>
                    <ProfileForm userData={userData} />
                </Box>
            </Paper>
        </>
    )
}

export default Profile

