import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1.5),
        width: '60%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        marginBottom: theme.spacing(1),
        cursor: 'pointer'
    },
    gamemodeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    pointsContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    resultContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'end'
    },
    gamemodeImage: {
        width: '40px',
        marginRight: theme.spacing(2)
    }
}))