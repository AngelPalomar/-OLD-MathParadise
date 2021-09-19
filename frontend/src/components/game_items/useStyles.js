import { makeStyles } from "@material-ui/core/styles"
import { MATH_GRADIENTS } from "../../styles/MathColors"

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
        color: theme.palette.rush.main,
        fontSize: '6vh'
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
        color: theme.palette.rush.dark
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
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    //Estilos del panel de ejercicios
    excDialog: {
        padding: theme.spacing(2)
    },
    topicLabel: {
        fontSize: '2.5vh',
        color: theme.palette.text.secondary
    },
    subtopicLabel: {
        fontSize: '7vh',
        textTransform: 'uppercase'
    },
    instrucLabel: {
        fontSize: '3vh',
    },
    ptsToWinLabel: {
        color: theme.palette.warning.main
    },
    excerciseLabel: {
        fontSize: '6vh',
        color: theme.palette.primary.dark
    },
    isTimeOverLabel: {
        color: theme.palette.rush.main,
        marginBlock: theme.spacing(4)
    },
    optionsLabelText: {
        fontSize: '3vh',
    },
    optionsPanel: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    idLabel: {
        color: theme.palette.text.secondary,
        fontSize: '2vh'
    },
    radioBtn: {
        color: theme.palette.primary.main,
        '&$checked': {
            color: theme.palette.primary.main
        }
    },
    clockContainer: {
        marginTop: '10px',
        marginBottom: '10px'
    },
    btnContainer: {
        marginTop: '10px',
        float: 'right'
    },
    resultContainer: {
        display: 'flex',
        flexDirection: 'row',
        //alignContent: 'center',
        justifyContent: 'center'
    },
    giveUpBtn: {
        color: '#FFF',
        background: theme.palette.event.main,
        paddingInline: theme.spacing(2)
    },
    acceptBtn: {
        color: '#FFF',
        background: MATH_GRADIENTS().default,
        paddingInline: theme.spacing(2)
    },
    disabledBtn: {
        color: '#FFF',
        background: MATH_GRADIENTS().disabled,
        paddingInline: theme.spacing(2)
    },
    answerBtn: {
        color: '#FFF',
        background: MATH_GRADIENTS().classic,
        paddingInline: theme.spacing(2)
    },
    imgIconResult: {
        width: '3.5vh',
        marginRight: '10px'
    },

    //Estilos del panel de Evento
    evtTitle: {
        color: theme.palette.event.main,
        fontSize: '5vh',
        textAlign: 'center'
    },
    evtInstruc: {
        color: theme.palette.text.secondary,
        fontSize: '3vh',
        textAlign: 'center'
    },
    cardContainer: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    eventCard: {
        background: theme.palette.event.main,
        border: 5,
        borderStyle: 'dotted',
        borderColor: '#FFF',
        padding: 20,
        color: '#FFF',
        textAlign: 'center',
        borderRadius: 10
    },
    drawBtnEventCont: {
        display: 'flex',
        justifyContent: 'center'
    },

    //Estilos del panel de resultados
    resultsDialog: {
        padding: theme.spacing(2)
    },
    resultsTitle: {
        color: '#2F3F3F',
        fontSize: '4.5vh',
        textAlign: 'center'
    },
    resultsSubTitle: {
        color: theme.palette.text.secondary,
        fontSize: '2.5vh',
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    avatarContainer: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBlock: theme.spacing(5)
    },
    winnerPlayerLabel: {
        color: '#4A4A4A',
        fontSize: '4vh',
        textAlign: 'center'
    },
    winnerLabel: {
        color: theme.palette.text.secondary,
        fontSize: '2.2vh',
        textAlign: 'center'
    },
    divider: {
        marginBlock: theme.spacing(1)
    },
    statsLabels: {
        fontSize: '3vh',
    },
    statsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2)
    },

    //Estilos para slots arcade
    slot: {
        flexDirection: 'column'
    },
    normalSlot: {
        color: "#FFF",
        width: '100%',
        height: '100%'
    }
}))