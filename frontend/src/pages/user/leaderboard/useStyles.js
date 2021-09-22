import { makeStyles } from '@material-ui/core'
import { MATH_GRADIENTS } from '../../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: 'center'
    },
    grid: {
        marginTop: theme.spacing(2)
    },
    rush_board: {
        background: MATH_GRADIENTS().rush,
        padding: theme.spacing(2),
        color: '#FFF'
    },
    classic_board: {
        background: MATH_GRADIENTS().classic,
        padding: theme.spacing(2),
        color: '#FFF'
    },
    arcade_board: {
        background: MATH_GRADIENTS().arcade,
        padding: theme.spacing(2),
        color: '#FFF'
    },
    header_board: {
        display: 'block',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        alignContent: 'center'
    },
    classic_icon: {
        width: '42px'
    },
    rush_icon: {
        width: '30px'
    },
    leader_icon: {
        width: '60px'
    },
    userPaperInfo: {
        padding: theme.spacing(1.5),
        marginBottom: theme.spacing(1)
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    medal: {
        width: '50px'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.rush.main,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.rush.dark,
        }
    },
    label: {
        color: theme.palette.text.secondary
    },
    points: {
        color: theme.palette.success.main
    }
}))