import { makeStyles } from "@material-ui/core/styles"
import { MATH_COLORS, MATH_GRADIENTS } from '../../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    main: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
        background: MATH_GRADIENTS().classic,
        color: "#FFF",
        overflow: "auto",
        position: "bottom",
        height: "100vh"
    },
    board: {
        zIndex: theme.zIndex.drawer + 0,
        margin: 'auto',
        padding: '5% 0',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        alignItems: 'center',
    },
}))