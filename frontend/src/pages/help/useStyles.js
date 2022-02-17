import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    heading: {
        flexBasis: '40%',
        flexShrink: 0,
        color: theme.palette.primary.main
    },
    secondaryHeading: {
        color: theme.palette.text.secondary,
    },
    accordionContainer: {
        marginBlock: theme.spacing(5)
    },
    subtitle: {
        fontWeight: 'bold'
    },
    accordionDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        width: '65vw',
        borderRadius: 10,
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
        marginBlock: theme.spacing(3),
        alignSelf: 'center'
    },
    divider: {
        marginBottom: theme.spacing(3)
    }
}))