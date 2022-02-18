import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
    },
    title: {
        flexGrow: 2,
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary,
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    alignIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    logoutLabel: {
        color: theme.palette.error.main
    },
    basicLabel: {
        color: theme.palette.primary.main
    }
}))

export default useStyles;