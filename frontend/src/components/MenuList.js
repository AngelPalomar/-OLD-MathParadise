import React from 'react'

import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core"

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
}));

function MenuList() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tablero" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <GamesIcon />                        
                    </ListItemIcon>
                    <ListItemText primary="Jugar" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <EmojiEventsIcon />                       
                    </ListItemIcon>
                    <ListItemText primary="Clasificación" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleAltIcon />                       
                    </ListItemIcon>
                    <ListItemText primary="Grupos" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <FunctionsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cursos de ayuda" />
                </ListItem>

                <Divider />

                <ListItem button>
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mi perfil" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Configuración" />
                </ListItem>
            </List>
        </div>
    )
}

export default MenuList
