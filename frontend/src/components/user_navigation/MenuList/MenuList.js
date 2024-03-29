import React from 'react'
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core"
import useStyles from './useStyles';

/**APIS */
import { getAccessTokenApi } from "../../../api/auth"

/**Iconos */
import DashboardIcon from '@material-ui/icons/Dashboard'
import GamesIcon from '@material-ui/icons/Games'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
//import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
//import FunctionsIcon from '@material-ui/icons/Functions'
//import AccountBoxIcon from '@material-ui/icons/AccountBox'
//import SettingsIcon from '@material-ui/icons/Settings'
import AvTimerIcon from '@material-ui/icons/AvTimer'
import ViewStreamIcon from '@material-ui/icons/ViewStream'

function MenuList(props) {
    const classes = useStyles()
    const { url } = props

    return (
        <div className={classes.root}>
            <List component="nav">

                <Link to="/home" className={classes.link}>
                    <ListItem button onClick={props.close} selected={url === '/home' ? true : false}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tablero" />
                    </ListItem>
                </Link>

                <Link to="/home/play" className={classes.link}>
                    <ListItem button onClick={props.close} selected={url === '/home/play' ? true : false}>
                        <ListItemIcon>
                            <GamesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Jugar" />
                    </ListItem>
                </Link>

                <Link to="/home/leaderboard" className={classes.link}>
                    <ListItem button onClick={props.close} selected={url === '/home/leaderboard' ? true : false}>
                        <ListItemIcon>
                            <EmojiEventsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clasificación" />
                    </ListItem>
                </Link>

                <Link to="/home/history" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <ViewStreamIcon />
                        </ListItemIcon>
                        <ListItemText primary="Historial de partidas" />
                    </ListItem>
                </Link>

                {/**<Link to="/home/groups" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Grupos" />
                    </ListItem>
                </Link> */}

                {/**<Link to="/courses" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <FunctionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cursos de ayuda" />
                    </ListItem>
                </Link>*/}

                {/**<Link to="/config" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Configuración" />
                    </ListItem>
                </Link>*/}

                {jwtDecode(getAccessTokenApi()).role === 'admin' || jwtDecode(getAccessTokenApi()).role === 'moderator' ?
                    <div>
                        <Divider />
                        <Link to="/admin" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <AvTimerIcon />
                                </ListItemIcon>
                                <ListItemText primary="Panel de gestión" />
                            </ListItem>
                        </Link>
                    </div> : null
                }
            </List>
        </div>
    )
}

export default MenuList
