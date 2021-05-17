import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({

    rushIconBox: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
    },
    rushIcon: {
        width: '16%',
        margin: theme.spacing(2)
    },
    title: {
        textAlign: 'center'
    },
    textContent: {
        color: '#000'
    },
    titleContent: {
        textAlign: 'center',
        fontSize: '22px',
        color: '#000'
    }

}))