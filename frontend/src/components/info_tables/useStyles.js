import { makeStyles } from '@material-ui/core/styles'
import { MATH_COLORS } from '../../styles/MathColors'

export const useStyles = makeStyles({
    tableHead: {
        fontWeight: 'bold'
    },
    deleteButton: {
        color: '#FFF',
        background: MATH_COLORS().math_error,
        marginLeft: 20,
        '&:hover': {
            color: '#FFF',
            background: MATH_COLORS().math_error_dark
        },
        width: 32,
        height: 32
    },
    modifyButton: {
        color: '#FFF',
        background: MATH_COLORS().math_rush_base,
        '&:hover': {
            color: '#FFF',
            background: MATH_COLORS().math_rush_base_dark
        },
        width: 32,
        height: 32
    }
})