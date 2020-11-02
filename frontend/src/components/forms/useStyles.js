import { makeStyles } from "@material-ui/core/styles"

/**Colors */
import { MATH_COLORS } from '../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    button: {
        background: MATH_COLORS().math_blue,
        color: '#FFF',
        '&:hover': {
            background: MATH_COLORS().math_blue_dark,
        }
    },
    cancelButton: {
        background: MATH_COLORS().math_error,
        color: '#FFF',
        '&:hover': {
            background: MATH_COLORS().math_error_dark,
        }
    },
    select: {
        width: '100%'
    },
    label: {
        color: MATH_COLORS().math_blue
    }
}))