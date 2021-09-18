import { makeStyles } from '@material-ui/core/styles'
import theme from '../../styles/MathThemes'

export const useStyles = makeStyles({
    tableHead: {
        fontWeight: 'bold'
    },
    deleteButton: {
        color: '#FFF',
        background: theme.palette.error.main,
        marginLeft: 20,
        '&:hover': {
            color: '#FFF',
            background: theme.palette.error.dark
        },
        width: 32,
        height: 32
    },
    modifyButton: {
        color: '#FFF',
        background: theme.palette.primary.main,
        '&:hover': {
            color: '#FFF',
            background: theme.palette.primary.dark
        },
        width: 32,
        height: 32
    }
})