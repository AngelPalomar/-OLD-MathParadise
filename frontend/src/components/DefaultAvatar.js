import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Avatar, CircularProgress, Typography } from "@material-ui/core"
import { MATH_GRADIENTS } from '../styles/MathColors'
import clsx from 'clsx'

/**APIs */
import { getUserByNicknameApi, getAvatarApi } from '../api/user'

const useStyles = makeStyles((theme) => ({
    default: {
        color: '#FFF'
    },
    gradientDefault: {
        background: MATH_GRADIENTS().default
    },
    gradient1: {
        background: MATH_GRADIENTS().error
    },
    gradient2: {
        background: MATH_GRADIENTS().winner
    }
}))

function DefaultAvatar(props) {
    const classes = useStyles()

    //Props
    const { nickname, size, fs, color } = props

    const [initialAvatar, setInitialAvatar] = useState('')
    const [avatarName, setavatarName] = useState('')
    const [avatarUrl, setavatarUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //Traigo el avatar del nickname
    useEffect(() => {
        getUserByNicknameApi(nickname).then(response => {
            if (response.user.avatar) {
                setavatarName(response.user.avatar)
            } else {
                setavatarName('')
            }

            //Detengo la carga
            setIsLoading(false)
        })
    }, [])

    //Traigo el archivo
    useEffect(() => {
        getAvatarApi(avatarName).then(response => {
            //si no tiene avatar
            if (response.status === 0) {
                setavatarUrl(null)
            } else {
                setavatarUrl(response)
            }
        })
    }, [avatarName])

    useEffect(() => {
        let nick = String(nickname).toUpperCase()
        setInitialAvatar(nick.charAt(0))
    }, [nickname])

    //Si el avatar está cargando
    if (isLoading && avatarName === "") {
        return <CircularProgress />
    }

    return (
        <>
            {
                avatarName === "" ?
                    <Avatar
                        className={clsx(
                            color === 1 ? classes.gradient1 :
                                color === 2 ? classes.gradient2 :
                                    classes.gradientDefault, classes.default
                        )}
                        style={{ width: size, height: size }}>
                        <Typography style={{ fontSize: fs }}>
                            {initialAvatar}
                        </Typography>
                    </Avatar> :
                    <Avatar
                        src={avatarUrl}
                        style={{ width: size, height: size, background: "#FFF" }}>
                    </Avatar>
            }
        </>
    )
}

export default DefaultAvatar
