import React from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, IconButton, Button, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

/**APIS */
import { getAccessTokenApi } from "../api/auth"
import { logout } from "../api/auth";

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
    colorLabels: {
        color: '#616161'
    }
}));
function Header(props) {
    const classes = useStyles()

    return (
        <AppBar className={classes.appBar} color="inherit">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit"
                    aria-label="menu" onClick={() => props.OpenAction()}>
                    <MenuIcon color="primary" />
                </IconButton>
                <Typography variant="h5" color="primary" className={classes.title}>Inicio</Typography>
                <Link to={"/home/profile/" + jwtDecode(getAccessTokenApi()).nickname} className={classes.link}>
                    <Button color="inherit" startIcon={<AccountBoxIcon />} className={classes.colorLabels}>
                        <Typography>Mi perfil</Typography>
                    </Button>
                </Link>
                <Button color="inherit" startIcon={<PowerSettingsNewIcon />} className={classes.colorLabels}
                    onClick={() => { logout(); window.location.href = '/'; }}>
                    <Typography>Salir</Typography>
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header
