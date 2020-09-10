import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
    statsPaper: {
        padding: theme.spacing(2),
        height: '280px'
    },
    imgGameMode: {
        width: '8vh'
    },
    statsHeader: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(1)
    },
    statsElement: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsInfo: {
        marginTop: theme.spacing(1)
    },
    statsTitle: {
        fontSize: '22px'
    }
}))