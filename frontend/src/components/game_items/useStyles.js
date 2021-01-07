import { makeStyles } from "@material-ui/core/styles"
import { MATH_COLORS, MATH_GRADIENTS } from "../../styles/MathColors"

/**
 * font-size: calc([minimum size] + ([maximum size] - [minimum size]) * 
 * ((100vw - [minimum viewport width]) / ([maximum viewport width] -
 *  [minimum viewport width])));
 */

export const useStyles = makeStyles((theme) => ({
    tile: {
        height: '100%',
        width: '100%'
    },
    paperTile: {
        display: 'flex',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHorizontal: {
        height: '80%'
    },
    labelHorizontal: {
        height: '20%'
    },
    verticalLabelRight: {
        transform: 'rotate(90deg)'
    },
    verticalLabelLeft: {
        transform: 'rotate(-90deg)'
    },
    labelSize: {
        fontSize: `calc(11px + (12 - 9) * ((100vw - 1000px) / (1600 - 300)))`,
    },
    symbolSize: {
        fontSize: `calc(10px + (12 - 10) * ((100vw - 500px) / (1600 - 300)))`,
    },
    corner_tile: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#FFF'
    },
    start_tile: {
        borderRadius: '0 0 0 15px',
        background: MATH_GRADIENTS(90).start_tile
    },
    random_exc_tile: {
        borderRadius: '0 0 15px 0',
        background: MATH_GRADIENTS(90).random_exc_tile
    },
    challenge_tile: {
        borderRadius: '0 15px 0 0',
        background: MATH_GRADIENTS(90).challenge_tile
    },
    event_tile: {
        borderRadius: '15px 0 0 0',
        background: MATH_GRADIENTS(90).event_tile
    },
    image: {
        width: '6vh',
        marginBottom: theme.spacing(1)
    }
}))