import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    main: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        background: "linear-gradient(90deg, #00487C, #2A8EFF)",
        color: "#FFF",
        overflow: "auto",
        position: "bottom",
        height: "100vh"
    },
    content: {
        marginTop: theme.spacing(2),
        overflow: "auto",
        position: "top",
        height: "90vh"
    },
    topicCard: {
        width: "43%",
        margin: theme.spacing(1),
        marginBottom: theme.spacing(1.2)
    },
    selectedTopicCard: {
        width: "50%",
        margin: theme.spacing(1),
        marginBottom: theme.spacing(1.2)
    },
    multiplierContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    stats: {
        color: "#F4F10F"
    },
    excercise: {
        color: "#00487C"
    },
    pointPlus: {
        color: '#6DFE5A'
    },
    segsPlus: {
        color: '#00B76F'
    },
    comboPlus: {
        color: '#F8D65B',
        textShadow: '2px 2px #CFAC2E',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    comboBox: {
        transform: 'rotate(-20deg)'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: "100%",
        padding: theme.spacing(2),
        border: 0
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    button: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        textAlign: "center",
        width: "300px",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    buttonBack: {
        padding: theme.spacing(1),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        textAlign: "center",
        margin: theme.spacing(2),
    },
    buttonResume: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #388659, #98CE00)",
        textAlign: "center",
        margin: theme.spacing(2),
    },
    buttonRestart: {
        padding: theme.spacing(1),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #6A041D, #FF006E)",
        textAlign: "center",
        margin: theme.spacing(2),
    },
    buttonPause: {
        color: "#000",
        background: "#FAFAFA",
        textAlign: "center"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#FFF',
    },
    streakSeconds: {
        backgroundColor: '#FFF'
    },
    userAnswer: {
        fontSize: '25px'
    },
    resultIcon: {
        width: '10%',
        marginLeft: theme.spacing(2)
    },
    menuPause: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuPauseOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paperPause: {
        padding: theme.spacing(5)
    }
}))