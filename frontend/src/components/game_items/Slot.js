import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { useStyles } from './useStyles'
import clsx from 'clsx'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'
import { MATH_GRADIENTS } from '../../styles/MathColors'

/**Images */
//import arcadeIcon from '../../assets/images/icons/arcade_icon_white.svg'
import challenge from '../../assets/images/layouts/classic/challenge_icon.svg'
import random_exc from '../../assets/images/layouts/classic/random_excercise_icon.svg'

function Slot(props) {
    const { pos, type, info, isSelected } = props
    const classes = useStyles()

    switch (type) {
        default:
        case "normal":
            return (
                <Paper
                    elevation={3}
                    style={{ background: !isSelected ? colorSlot(pos) : MATH_GRADIENTS().winner }}
                    className={clsx(classes.normalSlot, classes.paperTile, classes.slot)}>
                    <div className={classes.symbolSize}>
                        <BlockMath math={`${info.symbol}`} />
                    </div>
                    <Typography className={classes.symbolSize}>{info.displayLabel}</Typography>
                </Paper>
            )
        case "+50 PTS":
            return (
                <Paper
                    style={{ background: !isSelected ? MATH_GRADIENTS().event_tile : MATH_GRADIENTS(180).winner }}
                    className={clsx(classes.normalSlot, classes.paperTile, classes.slot)}>
                    <Typography style={{ fontSize: '2vh' }}>+50 Puntos</Typography>
                </Paper>
            )

        case "EXCER. RANDOM":
            return (
                <Paper
                    style={{ background: !isSelected ? MATH_GRADIENTS().random_exc_tile : MATH_GRADIENTS().winner }}
                    className={clsx(classes.normalSlot, classes.paperTile, classes.slot)}>
                    <img src={random_exc} style={{ marginBottom: '5px', height: '3.5vh' }} alt="corner_tile.svg" />
                    <Typography style={{ fontSize: '1.5vh' }}>EXCER. RANDOM</Typography>
                </Paper>
            )

        case "-50 PTS":
            return (
                <Paper
                    style={{ background: !isSelected ? MATH_GRADIENTS().event_tile : MATH_GRADIENTS().winner }}
                    className={clsx(classes.normalSlot, classes.paperTile, classes.slot)}>
                    <Typography style={{ fontSize: '2vh' }}>-50 Puntos</Typography>
                </Paper>
            )

        case "RETO":
            return (
                <Paper
                    style={{ background: !isSelected ? MATH_GRADIENTS().challenge_tile : MATH_GRADIENTS().winner }}
                    className={clsx(classes.normalSlot, classes.paperTile, classes.slot)}>
                    <img src={challenge} style={{ marginBottom: '5px', height: '3.5vh' }} alt="corner_tile.svg" />
                    <Typography style={{ fontSize: '2vh' }}>RETO</Typography>
                </Paper>
            )
    }

    function colorSlot(pos) {
        return pos % 2 === 0 ? '#FF1279' : '#FF378D'
    }
}

export default Slot
