import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Typography } from "@material-ui/core"
import { MATH_GRADIENTS } from '../styles/MathColors'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    default: {
        color: '#FFF'
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
    const { nickname, size, fs, color } = props

    const [initialAvatar, setInitialAvatar] = useState('')
    useEffect(() => {
        let nick = String(nickname).toUpperCase()
        setInitialAvatar(nick.charAt(0))
    }, [nickname])

    return (
        <Avatar
            className={clsx(color === 1 ? classes.gradient1 : classes.gradientDefault, classes.default)}
            style={{ width: size, height: size }}>
            <Typography style={{ fontSize: fs }}>
                {initialAvatar}
            </Typography>
        </ Avatar>
    )
}

export default DefaultAvatar
