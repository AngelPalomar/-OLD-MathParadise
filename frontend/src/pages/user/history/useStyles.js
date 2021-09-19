import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    list: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
        width: '100%'
    }
}))