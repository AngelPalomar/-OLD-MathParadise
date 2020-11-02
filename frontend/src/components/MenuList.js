import React from 'react'
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core"

/**APIS */
import { getAccessTokenApi } from "../api/auth"

/**Iconos */
import DashboardIcon from '@material-ui/icons/Dashboard'
import GamesIcon from '@material-ui/icons/Games'
//import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
//import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
//import FunctionsIcon from '@material-ui/icons/Functions'
//import AccountBoxIcon from '@material-ui/icons/AccountBox'
//import SettingsIcon from '@material-ui/icons/Settings'
import AvTimerIcon from '@material-ui/icons/AvTimer'

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
                    <ListItem button onClick={props.close}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tablero" />
                    </ListItem>
                </Link>

                <Link to="/home/play" className={classes.link}>
                    <ListItem button onClick={props.close}>
                        <ListItemIcon>
                            <GamesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Jugar" />
                    </ListItem>
                </Link>

                {/**<Link to="/home/leaderboard" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <EmojiEventsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clasificación" />
                    </ListItem>
                </Link> */}

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
                                <ListItemText primary="Panel de adminstración" />
                            </ListItem>
                        </Link>
                    </div> : null
                }
            </List>
        </div>
    )
}

export default MenuList
