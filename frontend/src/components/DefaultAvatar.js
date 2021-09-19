import React, { useState, useEffect } from 'react'
import { Avatar, CircularProgress } from "@material-ui/core"

/**APIs */
import { getUserByNicknameApi, getAvatarApi } from '../api/user'

function DefaultAvatar(props) {
    //Props
    const { nickname, size } = props
    const [avatarName, setavatarName] = useState('')
    const [avatarUrl, setavatarUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //Traigo el avatar del nickname
    useEffect(() => {
        getUserByNicknameApi(nickname).then(response => {
            if (response.user.avatar) {
                //Traigo el archivo
                getAvatarApi(response.user.avatar).then(response => {
                    //si no tiene avatar
                    if (response.status === 0) {
                        setavatarUrl(null)
                    } else {
                        setavatarUrl(response)
                    }
                })
            } else {
                setavatarName('')
            }

            //Detengo la carga
            setIsLoading(false)
        })

        return () => {
            setavatarName('')
            setavatarUrl(null)
        }
    }, [nickname])

    //Si el avatar está cargando
    if (isLoading && avatarName === "") {
        return <CircularProgress />
    }

    return (
        <Avatar
            src={avatarUrl}
            style={{ width: size, height: size, background: "#FFF" }}>
        </Avatar>
    )
}

export default DefaultAvatar
