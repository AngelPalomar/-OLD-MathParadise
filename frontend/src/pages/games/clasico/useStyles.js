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
    playersLayer: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 2,
    },
    uiLayer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 3,
        top: '21%',
        left: '18%',
        fontSize: '1.75vh'
    },
    scoresPaper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '51vh',
        margin: '10px',
        padding: theme.spacing(1.5)
    },
    scoreTitle: {
        textAlign: 'center',
        fontSize: '3.2vh',
        marginBottom: theme.spacing(1.5)
    },
    playerNickname: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerScore: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1.3)
    },
    nickname: {
        marginLeft: theme.spacing(1),
        fontSize: '2.3vh'
    },
    pointsLabel: {
        color: MATH_COLORS().math_success,
        marginLeft: theme.spacing(3),
        fontWeight: 'bold',
        fontSize: '2.3vh'
    },
    timeLabel: {
        textAlign: 'center',
        color: MATH_COLORS().math_rush_base,
        fontSize: '3vh'
    },
    difLabel: {
        textAlign: 'center',
        color: MATH_COLORS().math_rush,
        fontSize: '3vh'
    },
    centerTiles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    diceContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'space-between',
        margin: '10px'
    },
    diceImg: {
        width: '15vh',
        marginBottom: '10px'
    },
    button: {
        color: '#FFF',
        width: '15vh',
        fontSize: '2.3vh',
        marginBottom: '15px'
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#FFF',
        marginBottom: '15px'
    },
    logo: {
        width: '7vh',
        marginRight: '10px'
    },
    LogoDiceSize: {
        fontSize: '4vh'
    },
    circularMess: {
        color: '#FFF',
        marginRight: '10px'
    },
    messageSize: {
        fontSize: '2.5vh'
    },
    pauseContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5px'
    },
    buttonPause: {
        color: "#FFF",
        background: MATH_COLORS().math_disabled,
        '&:hover': {
            background: MATH_COLORS().math_disabled_label,
        },
        textAlign: "center"
    },
}))