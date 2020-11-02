import { makeStyles } from "@material-ui/core/styles"
import { MATH_COLORS } from '../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    title: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        color: '#2A55FF',
        marginBottom: theme.spacing(2)
    },
    textCenter: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
    excerPreviewBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#616161',
        fontSize: '26px',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    optionsPreviewBox: {
        color: '#818181',
        fontSize: '18px',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    previewLabel: {
        color: MATH_COLORS().math_rush
    },
    labelError: {
        color: '#FF0008'
    },
    formBox: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    formButtons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    okButton: {
        display: "flex",
        margin: "auto",
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        color: "#FFFFFF",
        background: MATH_COLORS().math_blue,
        '&:hover': {
            background: MATH_COLORS().math_blue_dark
        },
        textAlign: "center",
    },
    cancelButton: {
        display: "flex",
        margin: "auto",
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        color: "#FFFFFF",
        background: MATH_COLORS().math_error,
        '&:hover': {
            background: MATH_COLORS().math_error_dark
        },
        textAlign: "center",
    },
    textField: {
        width: '100%'
    },
    form: {
        marginTop: theme.spacing(2)
    }
}))