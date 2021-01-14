import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Typography } from "@material-ui/core"
import { MATH_GRADIENTS } from '../styles/MathColors'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    xsmall: {
        color: '#FFF',
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    small: {
        color: '#FFF',
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    large: {
        color: '#FFF',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    xlarge: {
        color: '#FFF',
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    gradientDefault: {
        background: MATH_GRADIENTS().default
    },
    gradient1: {
        background: MATH_GRADIENTS().error
    }
}))

function DefaultAvatar(props) {
    const classes = useStyles()

    //Props
    const { nickname, large, color } = props

    const [initialAvatar, setInitialAvatar] = useState('')
    useEffect(() => {
        let nick = String(nickname).toUpperCase()
        setInitialAvatar(nick.charAt(0))
    }, [nickname])

    return (
        <Avatar className={clsx(color === 1 ? classes.gradient1 : classes.gradientDefault,
            large === 'lg' ? classes.large : large === 'xs' ? classes.xsmall : large === 'sm' ? classes.small : classes.xlarge)}>
            <Typography variant={large === 'lg' ? 'h5' : large === 'xs' ? 'subtitle2' : large === 'sm' ? 'h5' : 'h3'}>
                {initialAvatar}
            </Typography>
        </ Avatar>
    )
}

export default DefaultAvatar
