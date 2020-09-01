import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: '#1a90ff'
    },
    top: {
        color: '#FFF',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}))

function CircularMultiplier(props) {
    const { value, size } = props
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={size}
                thickness={4}
                value={100}
            />
            <CircularProgress
                variant="static"
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={size}
                thickness={4}
                value={value}
            />
        </div>
    )
}

export default CircularMultiplier
