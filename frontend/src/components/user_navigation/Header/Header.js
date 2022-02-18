import React from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button } from "@material-ui/core";
import clsx from 'clsx'
import useStyles from './useStyles';
/**Componentes */
import UserAvatar from '../../common/DefaultAvatar'
//import GoogleSearch from '../forms/GoogleSearch';

/**Iconos */
import MenuIcon from '@material-ui/icons/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SettingsIcon from '@material-ui/icons/Settings'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
//import SearchIcon from '@material-ui/icons/Search';

/**APIS */
import { getAccessTokenApi } from "../../../api/auth"
import { logout } from "../../../api/auth";

function Header(props) {
    const { title } = props
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    //const [openSearch, setOpenSearch] = React.useState(false)
    const open = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar className={classes.appBar} color="inherit">
            {/* <GoogleSearch open={openSearch} handleClose={() => setOpenSearch(false)} /> */}
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit"
                    aria-label="menu" onClick={() => props.OpenAction()}>
                    <MenuIcon color="primary" />
                </IconButton>
                <Typography variant="h5" color="primary" className={classes.title}>
                    {title === '/admin' ? 'Panel de administración' : 'Inicio'}
                </Typography>

                <Link to={"/home/profile/@" + jwtDecode(getAccessTokenApi()).nickname} className={classes.link}>
                    <Button>
                        <UserAvatar size="35px" fs="100%" nickname={jwtDecode(getAccessTokenApi()).nickname} />
                        &nbsp;
                        {jwtDecode(getAccessTokenApi()).nickname}
                    </Button>
                </Link>

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

                    <Link to={"/home/profile/@" + jwtDecode(getAccessTokenApi()).nickname} className={classes.link}>
                        <MenuItem onClick={handleClose} className={clsx(classes.alignIcon)}>
                            <AccountBoxIcon /> &nbsp; Mi perfil
                        </MenuItem>
                    </Link>

                    <Link to={"/home/settings"} className={classes.link}>
                        <MenuItem onClick={handleClose} className={clsx(classes.alignIcon)}>
                            <SettingsIcon /> &nbsp; Configuración
                        </MenuItem>
                    </Link>

                    {/* <MenuItem onClick={() => setOpenSearch(true)} className={clsx(classes.alignIcon)}>
                        <SearchIcon /> &nbsp; Buscar
                    </MenuItem> */}

                    <MenuItem
                        onClick={() => { logout(); window.location.href = '/'; }}>
                        <div className={clsx(classes.alignIcon)}>
                            <PowerSettingsNewIcon /> &nbsp; Salir
                        </div>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar >
    )
}

export default Header
