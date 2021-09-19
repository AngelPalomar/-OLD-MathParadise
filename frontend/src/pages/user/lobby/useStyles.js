import { makeStyles } from "@material-ui/core/styles"
import { MATH_GRADIENTS } from '../../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    classicBack: {
        background: MATH_GRADIENTS().classic,
    },
    arcadeBack: {
        background: MATH_GRADIENTS().arcade,
    },
    root: {
        color: "#FFF",
        overflow: "auto",
        position: "bottom",
        height: "100vh"
    },
    content: {
        margin: 'auto',
        padding: '50px 0',
        width: '65vw',
        height: '100%',
        textAlign: 'center'
    },
    paper: {
        padding: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    playerInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    playerLabel: {
        marginInline: '10px',
        fontSize: '24px'
    },
    vs: {
        color: theme.palette.error.dark,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '7vh'
    },
    infoLabel: {
        color: theme.palette.success.main,
        fontSize: '29px'
    },
    infoData: {
        fontWeight: 'bold'
    },
    infoBox: {
        marginTop: theme.spacing(2),
    },
    playButton: {
        color: '#FFF',
        background: MATH_GRADIENTS().default,
        fontSize: '5vh'
    }
}))