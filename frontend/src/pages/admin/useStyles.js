import { makeStyles } from "@material-ui/core/styles"
import { MATH_GRADIENTS } from '../../styles/MathColors'

export const useStyles = makeStyles((theme) => ({
    //Menu
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary
        }
    },
    button: {
        marginBottom: theme.spacing(1),
        width: '100%',
        background: MATH_GRADIENTS().default,
        color: '#FFF'
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },

    paper: {
        padding: theme.spacing(2)
    },
    title: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        color: theme.palette.primary.main,
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
        color: theme.palette.rush.main
    },
    labelError: {
        color: theme.palette.error.main
    },
    formBox: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    formButtons: {
        display: 'flex',
        justifyItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        background: theme.palette.primary.main,
        '&:hover': {
            background: theme.palette.primary.dark
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
        background: theme.palette.error.main,
        '&:hover': {
            background: theme.palette.error.dark
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