import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(4)
    },
    cancelButton: {
        background: theme.palette.error.main,
        color: '#FFF',
        '&:hover': {
            background: theme.palette.error.dark,
        }
    },
    select: {
        width: '100%'
    },
    label: {
        color: theme.palette.primary.main
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        border: 2,
        borderStyle: 'dashed',
        borderColor: theme.palette.disabled.dark,
        borderRadius: '100px'
    },
    button: {
        marginRight: theme.spacing(2)
    },
    inputFile: {
        display: 'none'
    },
    selectAvatarBtn: {
        marginInline: theme.spacing(2)
    }
}))