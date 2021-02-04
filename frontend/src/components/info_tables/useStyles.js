import { makeStyles } from '@material-ui/core/styles'
import { MATH_COLORS } from '../../styles/MathColors'

export const useStyles = makeStyles({
    tableHead: {
        fontWeight: 'bold'
    },
    deleteButton: {
        color: '#FFF',
        background: MATH_COLORS().math_error,
        marginRight: '10px',
        '&:hover': {
            color: '#FFF',
            background: MATH_COLORS().math_error_dark
        }
    },
    modifyButton: {
        color: '#FFF',
        background: MATH_COLORS().math_rush_base,
        '&:hover': {
            color: '#FFF',
            background: MATH_COLORS().math_rush_base_dark
        }
    }
})