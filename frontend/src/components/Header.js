import React from 'react'
import jwtDecode from 'jwt-decode';
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button } from "@material-ui/core";
import clsx from 'clsx'

/**Componentes */
import UserAvatar from './DefaultAvatar'

/**Iconos */
import MenuIcon from '@material-ui/icons/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

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
    },
    alignIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    logoutLabel: {
        color: '#FF0008'
    },
    basicLabel: {
        color: '#616161'
    }
}))

function Header(props) {
    const { title } = props
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar className={classes.appBar} color="inherit">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit"
                    aria-label="menu" onClick={() => props.OpenAction()}>
                    <MenuIcon color="primary" />
                </IconButton>
                <Typography variant="h5" color="primary" className={classes.title}>
                    {title === '/admin' ? 'Panel de administración' : 'Inicio'}
                </Typography>

                <a href={"/home/profile/@" + jwtDecode(getAccessTokenApi()).nickname} className={classes.link}>
                    <Button>
                        <UserAvatar size="35px" fs="100%" nickname={jwtDecode(getAccessTokenApi()).nickname} />
                    &nbsp;
                    {jwtDecode(getAccessTokenApi()).nickname}
                    </Button>
                </a>

                <IconButton onClick={handleMenu}>
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}>

                    <a href={"/home/profile/@" + jwtDecode(getAccessTokenApi()).nickname} className={classes.link}>
                        <MenuItem onClick={handleClose} className={clsx(classes.alignIcon, classes.basicLabel)}>
                            <AccountBoxIcon /> &nbsp; Mi perfil
                        </MenuItem>
                    </a>

                    <MenuItem
                        onClick={() => { logout(); window.location.href = '/'; }}>
                        <div className={clsx(classes.alignIcon, classes.logoutLabel)}>
                            <PowerSettingsNewIcon /> &nbsp; Salir
                        </div>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar >
    )
}

export default Header
