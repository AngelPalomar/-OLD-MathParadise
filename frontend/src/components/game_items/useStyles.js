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
        alignItems: 'center',
        //backgroundImage: `url(${"static/src/img/main.jpg"})`
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
    symbolPaper: {
        color: '#FFF',
        border: '1px solid white'
    },
    labelSize: {
        //fontSize: `calc(11px + (12 - 9) * ((100vw - 1000px) / (1600 - 300)))`,
        fontSize: `1.7vh`,
    },
    symbolSize: {
        //fontSize: `calc(10px + (12 - 10) * ((100vw - 500px) / (1600 - 300)))`,
        fontSize: `1.75vh`,
    },
    corner_tile: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#FFF',
        border: '2px white',
        borderStyle: 'dotted'
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
    },
    menuTitle: {
        textAlign: 'center',
        color: MATH_COLORS().math_rush
    },
    gameInfoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        fontSize: '2.5vh'
    },
    infoData: {
        color: MATH_COLORS().math_rush_base_dark
    },
    buttonBack: {
        padding: theme.spacing(1),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().default,
        textAlign: "center",
        margin: theme.spacing(2),
    },
    buttonResume: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().classic,
        textAlign: "center",
        margin: theme.spacing(2),
    },
    buttonRestart: {
        padding: theme.spacing(1),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().arcade,
        textAlign: "center",
        margin: theme.spacing(2),
    },
    menuPauseOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}))