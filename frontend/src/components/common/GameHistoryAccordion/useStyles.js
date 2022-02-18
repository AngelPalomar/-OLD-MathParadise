import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    paper: {
        width: '60%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
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
    },
    detailsContainer: {
        width: '100%'
    },
    playersContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nicknameContainer: {
        textAlign: 'start',
        width: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        marginInline: theme.spacing(2)
    },
    points: {
        color: theme.palette.success.main,
        fontSize: 15
    },
    nickname: {
        fontSize: 16
    },
    enemyNicknameContainer: {
        textAlign: 'end',
        width: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        marginInline: theme.spacing(2)
    },
    avatar: {
        marginInline: theme.spacing(1)
    },
    vsLabel: {
        color: theme.palette.error.main,
        fontSize: 28
    },
    divider: {
        marginBlock: theme.spacing(2)
    },
    infoDetailsContainer: {
        textAlign: 'center'
    },
    numbers: {
        color: theme.palette.primary.main
    },
    gameDate: {
        color: theme.palette.text.secondary
    },
    multiplierContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    multiplierBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '72px',
        minHeight: '72px',
        border: '4px',
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '50%',
        marginBlock: theme.spacing(1)
    },
    multiplierLabel: {
        color: theme.palette.primary.main,
        fontSize: 24
    }
}))
