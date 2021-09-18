import React from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { useStyles } from './useStyles'
import 'katex/dist/katex.min.css'
import { BlockMath } from "react-katex"
import clsx from 'clsx'
//import { MATH_COLORS } from "../../styles/MathColors"

function Tile(props) {
    const { pos, info, corner, type, image } = props
    const classes = useStyles()

    //Renderiza el tipo casilla que se le indique
    switch (type) {
        case 0:
            return (
                <div className={classes.tile} >
                    <Paper
                        className={clsx(classes.paperTile, classes.contentHorizontal, classes.symbolPaper)}
                        style={{ background: colorTile(pos) }}
                        square>
                        <div className={classes.symbolSize}>
                            <BlockMath math={info.symbol} />
                        </div>
                    </Paper>
                    <Paper className={clsx(classes.paperTile, classes.labelHorizontal)} square>
                        <Typography className={classes.labelSize}>
                            {info.displayLabel}
                        </Typography>
                    </Paper>
                </div>
            )
        case 1:
            return (
                <Grid container className={classes.tile}>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                        <Paper
                            className={clsx(classes.tile, classes.paperTile, classes.symbolPaper)}
                            style={{ background: colorTile(pos) }}
                            square>
                            <div className={classes.symbolSize}>
                                <BlockMath math={info.symbol} />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                        <Paper className={clsx(classes.tile, classes.paperTile)} square>
                            <Typography className={clsx(classes.labelSize, classes.verticalLabelLeft)}>
                                {info.displayLabel}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )
        case 2:
            return (
                <Grid container className={classes.tile}>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                        <Paper className={clsx(classes.tile, classes.paperTile)} square>
                            <Typography className={clsx(classes.labelSize, classes.verticalLabelRight)}>
                                {info.displayLabel}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                        <Paper
                            className={clsx(classes.tile, classes.paperTile, classes.symbolPaper)}
                            style={{ background: colorTile(pos) }}
                            square>
                            <div className={classes.symbolSize}>
                                <BlockMath math={info.symbol} />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            )
        case 3:
            return (
                <div className={clsx(classes.tile, classes.corner_tile, colorCorner(corner))}>
                    <img src={image} className={classes.image} alt="corner_tile.svg" />
                    <Typography className={classes.labelSize}>{corner}</Typography>
                </div >
            )
        default:
            return null
    }

    /**Función que renderiza la clase de acuerdo al tipo de casilla de las esquinas */
    function colorCorner(corner) {
        switch (corner) {
            case "INICIO":
                return classes.start_tile

            case "EXCER. RANDOM":
                return classes.random_exc_tile

            case "RETO":
                return classes.challenge_tile

            case "EVENTO":
                return classes.event_tile

            default:
                return null
        }
    }

    function colorTile(pos) {
        if ((pos > 0 && pos < 5) || (pos > 26 && pos <= 29)) {
            return pos % 2 === 0 ? '#D4145A' : '#B4114D'
        } else if ((pos > 4 && pos < 9) || (pos > 9 && pos < 12)) {
            return pos % 2 === 0 ? '#006837' : '#47C740'
        } else if ((pos > 11 && pos < 15) || (pos > 15 && pos < 20)) {
            return pos % 2 === 0 ? '#2A7BD1' : '#2A97D1'
        } else {
            return pos % 2 === 0 ? '#1E003C' : '#2F005F'
        }
    }
}

export default Tile
