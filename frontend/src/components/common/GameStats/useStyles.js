import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
    statsPaperSummary: {
        padding: theme.spacing(2)
    },
    statsPaper: {
        padding: theme.spacing(2),
        height: 'auto',
        minHeight: '280px'
    },
    imgGameMode: {
        width: '8vh'
    },
    statsHeader: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    statsElement: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsElementSummary: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    statsTitle: {
        fontSize: '22px',
        textAlign: 'center'
    },
    summaryPoints: {
        textAlign: 'center'
    }
}))