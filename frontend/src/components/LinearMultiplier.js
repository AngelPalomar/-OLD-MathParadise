import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 8,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: '#1a90ff',
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
}))(LinearProgress)

function LinearMultiplier(props) {
    const { val } = props
    return (
        <BorderLinearProgress variant="determinate" value={val} />
    )
}

export default LinearMultiplier
