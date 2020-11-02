import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    main: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
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
        [theme.breakpoints.down('sm')]: {
            height: "95vh"
        },
        [theme.breakpoints.up('md')]: {
            height: "97vh"
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            height: "93vh"
        },
        [theme.breakpoints.down('md')]: {
            height: "100%"
        },
        [theme.breakpoints.up('md')]: {
            height: "86vh"
        },
        padding: theme.spacing(2),
    },
    topicCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            height: "93vh"
        },
        [theme.breakpoints.up('md')]: {
            height: "86vh"
        },
        border: 0
    },
    topicCard: {
        [theme.breakpoints.up('md')]: {
            width: "43%",
        },
        [theme.breakpoints.up('lg')]: {
            width: "46%",
        },
        margin: theme.spacing(0),
        marginBottom: theme.spacing(1.2)
    },
    selectedTopicCard: {
        [theme.breakpoints.up('lg')]: {
            width: "55%",
        },
        margin: theme.spacing(0),
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
        [theme.breakpoints.down('sm')]: {
            width: "150px"
        },
        [theme.breakpoints.up('md')]: {
            width: "200px"
        },
        [theme.breakpoints.up('lg')]: {
            width: "300px"
        },
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
    },
    titleAndExcerciseSize: {
        [theme.breakpoints.down('xs')]: {
            fontSize: "34px"
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "44px"
        },
    },
    statsMedium: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    statsMediumLabels: {
        color: "#00487C"
    },
    statsComboMediumLabels: {
        color: "#f53f60"
    },
}))