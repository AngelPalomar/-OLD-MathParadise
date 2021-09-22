import { makeStyles } from "@material-ui/core/styles"
import { MATH_GRADIENTS } from '../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        padding: theme.spacing(2),
    },
    paperConfig: {
        padding: theme.spacing(2),
        background: "rgb(255, 255, 255)",
        marginBottom: theme.spacing(2)
    },
    classicPaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().classic
    },
    classicInfo: {
        width: '100%',
        background: theme.palette.classic.main,
        color: "#FFFFFF",
        '&:hover': {
            background: theme.palette.classic.dark
        }
    },
    ArcadePaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().arcade
    },
    arcadeInfo: {
        width: '100%',
        background: theme.palette.arcade.main,
        color: "#FFFFFF",
        '&:hover': {
            background: theme.palette.arcade.dark
        }
    },
    RushPaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().rush
    },
    rushInfo: {
        width: '100%',
        background: theme.palette.rush.main,
        color: "#FFFFFF",
        '&:hover': {
            background: theme.palette.rush.dark
        }
    },
    disabled: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().disabled
    },
    select: {
        backgroundColor: "#FFFFFF",
    },
    grid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    box: {
        marginTop: theme.spacing(2),
    },
    playButton: {
        color: "#FFFFFF",
        background: MATH_GRADIENTS().default,
        textAlign: "center",
        fontSize: 20
    },
    joinButton: {
        padding: theme.spacing(1),
        color: "#FFFFFF",
        background: MATH_GRADIENTS().event_tile,
        textAlign: "center"
    },
    pinInput: {
        width: '100%'
    },
    title: {
        marginBottom: theme.spacing(1)
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary
        }
    },
    circularJoin: {
        color: '#FFF'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        alignItems: 'center',
    }
}))