import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    xsmall: {
        color: '#FFF',
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    large: {
        color: '#FFF',
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    xlarge: {
        color: '#FFF',
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        width: theme.spacing(12),
        height: theme.spacing(12),
    }
}))

function DefaultAvatar(props) {
    const classes = useStyles()

    //Props
    const { nickname, large } = props

    const [initialAvatar, setInitialAvatar] = useState('')
    useEffect(() => {
        let nick = String(nickname).toUpperCase()
        setInitialAvatar(nick.charAt(1))
    }, [nickname])

    return (
        <Avatar className={large === 'lg' ? classes.large : large === 'xs' ? classes.xsmall : classes.xlarge}>
            <Typography variant={large === 'lg' ? 'h5' : large === 'xs' ? 'subtitle2' : 'h3'}>
                {initialAvatar}
            </Typography>
        </ Avatar>
    )
}

export default DefaultAvatar
