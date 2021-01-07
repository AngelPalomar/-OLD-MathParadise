import React from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { useStyles } from './useStyles'
import 'katex/dist/katex.min.css'
import { BlockMath } from "react-katex"
import clsx from 'clsx'

function Tile(props) {
    const { info, corner, type, image } = props
    const classes = useStyles()

    //Renderiza el tipo casilla que se le indique
    switch (type) {
        case 0:
            return (
                <div className={classes.tile} >
                    <Paper
                        className={clsx(classes.paperTile, classes.contentHorizontal)}
                        style={{
                            background: `linear-gradient(45deg, ${info.primaryColor}, ${info.secondaryColor}`,
                            color: '#FFF'
                        }}
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
                            className={clsx(classes.tile, classes.paperTile)}
                            style={{
                                background: `linear-gradient(-135deg, ${info.primaryColor}, ${info.secondaryColor}`,
                                color: '#FFF'
                            }}
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
                            className={clsx(classes.tile, classes.paperTile)}
                            style={{
                                background: `linear-gradient(-135deg, ${info.primaryColor}, ${info.secondaryColor}`,
                                color: '#FFF'
                            }}
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
                    <Typography className={classes.symbolSize}>{corner}</Typography>
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
}

export default Tile
