import { makeStyles } from '@material-ui/core'
import theme from '../../../styles/MathThemes'
import { MATH_GRADIENTS } from '../../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    background: {
        paddingTop: theme.spacing(1.3),
        paddingLeft: theme.spacing(1.3),
        paddingRight: theme.spacing(1.3),
        background: MATH_GRADIENTS(-45).arcade,
        overflow: "auto",
        position: "bottom",
        height: "100vh"
    },
    verticalScreen: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        textAlign: 'center',
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 6,
        width: '100vw'
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
    centerTiles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    slotContainer: {
        height: '100%',
        width: '100%',
        padding: '.5vh',
        margin: 1
    },
    selectedSlot: {
        //border: '.7vh dotted #FFF',
        borderRadius: '1vh',
        padding: 0,
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#FFF',
        marginBottom: '2vh',
        alignSelf: 'center'
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#FFF',
        marginBlock: '2vh',
        alignSelf: 'center'
    },
    logo: {
        width: '7vh',
        marginRight: '10px'
    },
    LogoTitleSize: {
        fontSize: '3.2vh'
    },
    scoresPaper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '90%',
        height: '51vh',
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
        color: theme.palette.success.main,
        marginLeft: theme.spacing(3),
        fontWeight: 'bold',
        fontSize: '2.3vh'
    },
    roundTitle: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontSize: '3vh'
    },
    roundLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
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
        background: theme.palette.disabled.main,
        '&:hover': {
            background: theme.palette.disabled.dark,
        },
        textAlign: "center"
    },
    circularMess: {
        color: '#FFF',
        marginRight: '1vh'
    },
    messageSize: {
        fontSize: '2.5vh'
    },
    tirarButton: {
        height: 50,
        width: '50%',
        alignSelf: 'center',
        color: "#FFF"
    }
}))