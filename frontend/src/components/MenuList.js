import React from 'react'
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core"

/**APIS */
import { getAccessTokenApi } from "../api/auth"

import DashboardIcon from '@material-ui/icons/Dashboard'
import GamesIcon from '@material-ui/icons/Games'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import FunctionsIcon from '@material-ui/icons/Functions'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary
        }
    }
}));

function MenuList(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <List component="nav">

                <Link to="/home" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tablero" />
                    </ListItem>
                </Link>

                <Link to="/home/play" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <GamesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Jugar" />
                    </ListItem>
                </Link>

                <Link to="/home/leaderboard" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <EmojiEventsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clasificación" />
                    </ListItem>
                </Link>

                <Link to="/home/groups" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Grupos" />
                    </ListItem>
                </Link>

                <Divider />

                <Link to={"/home/profile/" + jwtDecode(getAccessTokenApi()).nickname} className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mi perfil" />
                    </ListItem>
                </Link>

                <Link to="/courses" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <FunctionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cursos de ayuda" />
                    </ListItem>
                </Link>

                <Link to="/config" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Configuración" />
                    </ListItem>
                </Link>
            </List>
        </div>
    )
}

export default MenuList
