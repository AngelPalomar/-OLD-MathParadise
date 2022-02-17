import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    header: {
        textAlign: 'center'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4)
    },
    noPlaysText: {
        fontWeight: 'bold'
    }
}))