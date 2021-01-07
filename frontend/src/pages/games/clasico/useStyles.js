import { makeStyles } from "@material-ui/core/styles"
import { MATH_COLORS, MATH_GRADIENTS } from '../../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    background: {
        paddingTop: theme.spacing(1.3),
        paddingLeft: theme.spacing(1.3),
        paddingRight: theme.spacing(1.3),
        background: MATH_GRADIENTS().classic,
        overflow: "auto",
        position: "bottom",
        height: "100vh"
    },
    loadingScreen: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column'
    },
    grid: {
        height: '100%'
    },
    board: {
        width: '100%',
        height: '97%',
        zIndex: theme.zIndex.drawer + 1,
    },
    stats: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 2,
    },
    players: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 3,
    },
    centerTiles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
}))